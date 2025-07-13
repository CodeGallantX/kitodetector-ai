'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from 'next-themes';
import { Moon, Sun, LogOut, Menu, X } from 'lucide-react';
import Header from '@/app/components/dashboard/Header';
import ProfileSection from '@/app/components/dashboard/ProfileSection';
import ChatScan from '@/app/components/dashboard/ChatScan';
import Navigation from '@/app/components/dashboard/Navigation';
import ImageScan from '@/app/components/dashboard/ImageScan';
import Preloader from '../components/ui/Preloader';

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) {
      router.push('/auth/login');
      return;
    }

    const fetchUser = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://kitodeck-be-5cal.onrender.com/api/user/details/');
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const userData = JSON.parse(xhr.responseText);
            setUser(userData);
            setLoading(false);
          } else if (xhr.status === 401) {
            refreshAccessToken();
          } else {
            toast.error('Failed to load user data');
            setLoading(false);
          }
        }
      };
      xhr.send();
    };

    const refreshAccessToken = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://kitodeck-be-5cal.onrender.com/api/token/refresh/');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            localStorage.setItem('access_token', data.access);
            fetchUser(); 
          } else {
            localStorage.clear();
            router.push('/auth/login');
          }
        }
      };
      xhr.send(JSON.stringify({ refresh: refreshToken }));
    };

    fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      // Call logout endpoint
      const response = await fetch('https://kitodeck-be-5cal.onrender.com/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ refresh_token: refreshToken })
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear local storage
      localStorage.clear();
      
      // Redirect to login
      router.push('/auth/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout properly');
      // Fallback - clear storage and redirect even if API fails
      localStorage.clear();
      router.push('/auth/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return <Preloader />;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ToastContainer position="top-right" theme={theme} />

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Theme toggle and logout */}
      <div className="fixed top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-colors duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
        <button
          onClick={handleSignOut}
          disabled={isLoggingOut}
          className={`p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors duration-300 ${
            isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Sign out"
        >
          {isLoggingOut ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            <LogOut className="h-5 w-5" />
          )}
        </button>
      </div>

      <Header user={user} />

      <div className="pt-20 pb-8 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
          {/* Navigation - hidden on mobile when menu is closed */}
          <div 
            className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block fixed md:static inset-0 z-10 md:z-auto bg-white dark:bg-gray-800 md:bg-transparent pt-20 md:pt-0`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div 
              className="w-64 md:w-48 h-full md:h-auto p-4 md:p-0 bg-white dark:bg-gray-800 md:bg-transparent shadow-lg md:shadow-none"
              onClick={(e) => e.stopPropagation()}
            >
              <Navigation 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onSignOut={handleSignOut}
              />
            </div>
          </div>

          {/* Main content */}
          <main className="w-full">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-200">
              {activeTab === 'profile' && <ProfileSection user={user} />}
              {activeTab === 'image-scan' && <ImageScan />}
              {activeTab === 'chat-scan' && <ChatScan />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}