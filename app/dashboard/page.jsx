'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/app/components/dashboard/Header';
import ProfileSection from '@/app/components/dashboard/ProfileSection';
import ChatScan from '@/app/components/dashboard/ChatScan';
import Navigation from '@/app/components/dashboard/Navigation';
import ImageScan from '@/app/components/dashboard/ImageScan';
import Preloader from '../components/ui/Preloader';

export default function DashboardPage() {
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

      localStorage.clear();
      router.push('/auth/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout properly');
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
      <ToastContainer position="top-right" theme="dark" />
      
      <Header 
        user={user} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        handleSignOut={handleSignOut}
        isLoggingOut={isLoggingOut}
      />

      <div className="pt-20 pb-6 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
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