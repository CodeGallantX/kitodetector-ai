"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { FaImage, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import ImageScanner from '@/app/components/ImageScanner';
// import axios from 'axios';

// // API configuration
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://kitodeck-be.onrender.com/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add a request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error('Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('Response error:', error.response?.data || error.message);
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/auth/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default function DashboardPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('scanner');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        const response = await api.get('/auth/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        if (error.response?.status === 401) {
          router.push('/auth/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Welcome, {user?.username || 'User'}
          </h1>
          <button
            onClick={handleLogout}
            className={`flex items-center px-4 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            } shadow-sm`}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'scanner'
                ? theme === 'dark'
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-500 text-white'
                : theme === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            } shadow-sm`}
          >
            <FaImage className="mr-2" />
            Image Scanner
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'history'
                ? theme === 'dark'
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-500 text-white'
                : theme === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            } shadow-sm`}
          >
            <FaHistory className="mr-2" />
            Scan History
          </button>
        </div>

        <div className={`rounded-lg p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-sm`}>
          {activeTab === 'scanner' ? (
            <ImageScanner />
          ) : (
            <div className={`text-center py-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <p>Your scan history will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}