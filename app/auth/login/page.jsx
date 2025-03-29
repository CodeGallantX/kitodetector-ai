'use client';

import { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaChevronLeft } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useTheme } from 'next-themes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function LoginPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:8000/api/auth/login', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { data } = response;

        // Store user data and token
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        toast.success('Login successful!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme === 'dark' ? 'dark' : 'light',
        });

        // Redirect to dashboard after successful login
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);

      } catch (error) {
        console.error('Login error:', error);
        const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme === 'dark' ? 'dark' : 'light',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Theme-based styles
  const containerBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900';
  const dividerColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const dividerTextBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';

  return (
    <div className={`relative min-h-screen ${containerBg} flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300`}>
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
      
      <button 
        className={`absolute top-8 left-6 p-2 rounded-lg border ${theme === 'dark' ? 'border-gray-600 hover:border-teal-500' : 'border-gray-300 hover:border-teal-600'} hover:bg-teal-600 transition-colors duration-300 ease-in-out ${textColor}`}
        onClick={() => router.back()}
      >
        <FaChevronLeft className="inline-block"/> 
        Back
      </button>
      
      <div className="w-full sm:mx-auto sm:w-full sm:max-w-md px-6 sm:ox-0">
        <h2 className={`mt-6 text-left sm:text-center text-3xl font-extrabold ${textColor}`}>
          Welcome Back! <br />Sign in to continue
        </h2>
      </div>

      <div className="mt-8 px-6 sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg">
        <div className={`${cardBg} py-8 px-4 shadow sm:rounded-2xl sm:px-10 transition-colors duration-300 ${theme === 'dark' ? 'shadow-lg' : 'shadow-sm'}`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${secondaryTextColor}`}>
                Email address
              </label>
              <fieldset className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 ${inputBg} border ${errors.email ? 'border-red-300' : borderColor} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                />
              </fieldset>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${secondaryTextColor}`}>
                Password
              </label>
              <fieldset className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 ${inputBg} border ${errors.password ? 'border-red-300' : borderColor} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 sm:text-sm`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`${theme === 'dark' ? 'text-gray-300 hover:text-gray-100' : 'text-gray-400 hover:text-gray-500'} focus:outline-none`}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </fieldset>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={`h-4 w-4 text-teal-600 focus:ring-teal-500 ${borderColor} rounded`}
                />
                <label htmlFor="remember-me" className={`ml-2 block text-sm ${textColor}`}>
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-teal-500 hover:text-teal-400">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <span className="h-3 w-3 p-2 border-b-2 border-b-white animate-spin rounded-full mr-2"></span>
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${dividerColor}`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${dividerTextBg} ${secondaryTextColor}`}>
                  Don't have an account?{' '}
                  <Link href="/auth/signup" className="font-medium text-teal-500 hover:text-teal-400">
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}