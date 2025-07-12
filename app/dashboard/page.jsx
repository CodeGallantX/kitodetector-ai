'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa6';
import Header from '../components/dashboard/Header';
import ProfileSection from '../components/dashboard/ProfileSection';
import ChatScan from '../components/dashboard/ChatScan';
import Navigation from '../components/dashboard/Navigation';
import ImageScanner from '../components/ImageScanner';

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) {
      router.push('/auth/login');
      return;
    }

    // Request user profile
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
            // Token expired or invalid
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
            fetchUser(); // Retry after refreshing
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
