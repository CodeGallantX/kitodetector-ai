'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
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

    const fetchUser = async () => {
      try {
        const response = await axios.get('https://kitodeck-be-5cal.onrender.com/api/user/details/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401) {
          refreshAccessToken();
        } else {
          toast.error('Failed to load user data');
          setLoading(false);
        }
      }
    };

    const refreshAccessToken = async () => {
      try {
        const response = await axios.post(
          'https://kitodeck-be-5cal.onrender.com/api/token/refresh/',
          { refresh: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const newAccess = response.data.access;
        localStorage.setItem('access_token', newAccess);
        await fetchUser();
      } catch (error) {
        localStorage.clear();
        router.push('/auth/login');
      }
    };

    fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      await axios.post(
        'https://kitodeck-be-5cal.onrender.com/api/logout/',
        { refresh_token: refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      localStorage.clear();
      toast.success('Logged out successfully');
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout properly');
      localStorage.clear();
      router.push('/auth/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) return <Preloader />;
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
