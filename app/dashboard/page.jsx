'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from 'next-themes';
import { FaChevronLeft, FaMoon, FaSun } from 'react-icons/fa6';
import Header from '../components/dashboard/Header';
import ProfileSection from '../components/dashboard/ProfileSection';
import ChatScan from '../components/dashboard/ChatScan';
import Navigation from '../components/dashboard/Navigation';
import ImageScanner from '../components/ImageScanner';
import axios from 'axios';

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const userData = localStorage.getItem('user');
      const accessToken = localStorage.getItem('access_token');

      if (!userData || !accessToken) {
        router.push('/auth/login');
        return;
      }

      try {
        const response = await axios.get('https://kitodeck-be-5cal.onrender.com/api/user/details/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        setUser(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            const refreshResponse = await axios.post(
              'https://kitodeck-be-5cal.onrender.com/api/token/refresh/',
              { refresh: refreshToken }
            );

            localStorage.setItem('access_token', refreshResponse.data.access);
            const userResponse = await axios.get('https://kitodeck-be-5cal.onrender.com/api/user/details/', {
              headers: {
                'Authorization': `Bearer ${refreshResponse.data.access}`
              }
            });

            setUser(userResponse.data);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            localStorage.clear();
            router.push('/auth/login');
          }
        } else {
          console.error('Failed to fetch user details:', error);
          toast.error('Failed to load user data');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSignOut = () => {
    localStorage.clear();
    router.push('/auth/login');
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer position="top-right" />

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg border border-gray-300 dark:border-white hover:border-teal-600 hover:bg-teal-600 hover:text-white transition-colors duration-300 ease-in-out"
        >
          {theme === 'dark' ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
        </button>
      </div>

      <Header user={user} onSignOut={handleSignOut} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="flex-1">
            {activeTab === 'profile' && <ProfileSection user={user} />}
            {activeTab === 'image-scan' && <ImageScanner />}
            {activeTab === 'chat-scan' && <ChatScan />}
          </main>
        </div>
      </div>
    </div>
  );
}
