'use client';

import Link from 'next/link';
import { Moon, Sun, LogOut, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Header({ user, mobileMenuOpen, setMobileMenuOpen, handleSignOut, isLoggingOut }) {
  const { theme, setTheme } = useTheme();
  const avatarLetter = user?.username?.charAt(0)?.toUpperCase() || 'U';

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md bg-white dark:bg-gray-800"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
          KitoDeck
        </Link>
        
        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline text-gray-700 dark:text-gray-300 text-sm md:text-base">
            Welcome, <span className="font-medium">{user.username}</span>
          </span>
          
          {/* User avatar */}
          <div className="relative inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 font-medium">
            {avatarLetter}
            <span className="absolute bottom-0 right-0 block h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800"></span>
          </div>

          {/* Theme toggle */}
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

          {/* Logout button */}
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
      </div>
    </header>
  );
}