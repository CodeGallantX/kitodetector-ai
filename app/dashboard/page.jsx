'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '@/components/dashboard/Header';
import ProfileSection from '@/components/dashboard/ProfileSection';
import ImageScan from '@/components/dashboard/ImageScan';
import ChatScan from '@/components/dashboard/ChatScan';
import Navigation from '@/components/dashboard/Navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
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
        // Verify token validity by fetching user details
        const response = await axios.get('https://kitodeck-be-5cal.onrender.com/api/user/details/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        setUser(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          // Try to refresh token
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
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
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

  if (!user) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer position="top-right" />
      
      <Header user={user} onSignOut={handleSignOut} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="flex-1">
            {activeTab === 'profile' && <ProfileSection user={user} />}
            {activeTab === 'image-scan' && <ImageScan />}
            {activeTab === 'chat-scan' && <ChatScan />}
          </main>
        </div>
      </div>
    </div>
  );
}