'use client';

import { useState } from 'react';
import axios from 'axios';
import { User, ChevronLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import InputField from '../../components/ui/InputField';
import PasswordField from '../../components/ui/PasswordField';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const response = await axios.post(
        'https://kitodeck-be-5cal.onrender.com/api/signup/',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 201) {
        toast.success('Account created successfully! Please log in.', {
          position: 'top-center',
          autoClose: 2000,
          theme: theme === 'dark' ? 'dark' : 'light',
        });

        setTimeout(() => router.push('/auth/login'), 1500);
      }
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        const { data } = error.response;
        const newErrors = {};

        if (data.username) newErrors.username = data.username[0];
        if (data.email) newErrors.email = data.email[0];
        if (data.password) newErrors.password = data.password[0];

        setErrors(prev => ({ ...prev, ...newErrors }));

        toast.error(data?.detail || 'Please fix the errors in the form', {
          position: 'top-center',
          theme: theme === 'dark' ? 'dark' : 'light',
        });
      } else {
        toast.error('Network or server error. Please try again.', {
          position: 'top-center',
          theme: theme === 'dark' ? 'dark' : 'light',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800 sm:dark:bg-gray-900 transition-colors duration-200">
      <ToastContainer />
      
      <button
        className="absolute top-8 left-6 p-2 rounded-lg border border-gray-600 dark:border-white hover:border-teal-600 hover:bg-teal-600 hover:text-white transition-colors duration-300 ease-in-out"
        onClick={() => router.back()}
      >
        <ChevronLeft className="inline-block" /> Back
      </button>

      <div className="container mx-auto px-4 py-28 sm:py-12">
        <div className="max-w-xl mx-auto">
          <div className="text-left sm:text-center mb-4 px-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Join our community today
            </p>
          </div>

          <div className="md:bg-white dark:bg-gray-800 sm:shadow-lg rounded-2xl p-2 md:p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputField
                id="username"
                name="username"
                icon={<User />}
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                placeholder="john_doe"
              />

              <InputField
                id="email"
                name="email"
                type="email"
                icon={<Mail />}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="your@email.com"
              />

              <PasswordField
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
              />

              <PasswordField
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="••••••••"
                show={showConfirmPassword}
                toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
