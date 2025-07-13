'use client';

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from '../../components/ui/InputField';
import PasswordField from '../../components/ui/PasswordField';

export default function LoginPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://kitodeck-be-5cal.onrender.com/api/login/', true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          setIsLoading(false);
          if (xhr.status === 200) {
            const { access, refresh } = JSON.parse(xhr.responseText);

            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('user', JSON.stringify({ email: formData.email }));

            toast.success('Login successful! Redirecting...', {
              position: 'top-center',
              autoClose: 2000,
              theme: theme === 'dark' ? 'dark' : 'light',
            });

            setTimeout(() => router.push('/dashboard'), 2000);
          } else {
            let message = 'Login failed. Please try again.';
            try {
              const response = JSON.parse(xhr.responseText);
              if (xhr.status === 401) message = response.detail || 'Invalid email or password';
              else if (xhr.status === 400) {
                if (response.email) setErrors((prev) => ({ ...prev, email: response.email[0] }));
                if (response.password) setErrors((prev) => ({ ...prev, password: response.password[0] }));
                message = 'Please fix the errors in the form';
              } else if (xhr.status === 500) {
                message = 'Server error. Please try again later.';
              }
            } catch (_) {}

            toast.error(message, {
              position: 'top-center',
              autoClose: 5000,
              theme: theme === 'dark' ? 'dark' : 'light',
            });
          }
        }
      };

      xhr.send(JSON.stringify({ email: formData.email, password: formData.password }));
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      toast.error('An unexpected error occurred. Please try again.', {
        position: 'top-center',
        autoClose: 5000,
        theme: theme === 'dark' ? 'dark' : 'light',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />

      <button
        className="absolute top-8 left-6 p-2 rounded-lg border border-gray-300 dark:border-white hover:border-teal-600 hover:bg-teal-600 hover:text-white transition-colors duration-300 ease-in-out"
        onClick={() => router.back()}
      >
        <ChevronLeft className="inline-block" /> Back
      </button>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Sign in to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-md sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              type="email"
            />

            <PasswordField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-teal-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                  Remember me
                </span>
              </label>

              <div className="text-sm leading-5">
                <Link href="/auth/forgot-password" className="font-medium text-teal-600 hover:text-teal-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-teal-600 hover:text-teal-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
