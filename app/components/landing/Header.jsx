"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from 'next-themes';

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme, setTheme } = useTheme(); // Get current theme and setter function

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="w-full">
            <header className="w-full">
                {/* Main Navigation Bar */}
                <div className="z-30 px-6 lg:px-10 py-4 md:py-6 fixed backdrop-blur-md w-11/12 lg:w-11/12 left-1/2 -translate-x-1/2 bg-white/30 dark:bg-gray-800/30 top-6 rounded-full flex flex-row items-center justify-between border border-white/20 dark:border-gray-600/20 shadow-sm">
                    {/* Logo */}
                    <Link href="/" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-outfit">
                        KitoDeck AI
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-900 dark:text-white">
                        <Link href="/" className="hover:text-teal-500 transition-colors">Home</Link>
                        <Link href="#about" className="hover:text-teal-500 transition-colors">About</Link>
                        <Link href="#features" className="hover:text-teal-500 transition-colors">Features</Link>
                        <Link href="#pricing" className="hover:text-teal-500 transition-colors">Pricing</Link>
                        <Link href="#faqs" className="hover:text-teal-500 transition-colors">FAQs</Link>
                        <Link href="#helpCenter" className="hover:text-teal-500 transition-colors">Help Center</Link>
                    </nav>

                    <div className="flex items-center justify-center gap-4">
                        {/* Theme Toggle - Desktop */}
                        <button 
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="hidden lg:block p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg text-teal-500 dark:text-teal-300 hover:scale-110 transition-transform"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        
                        <Link
                            href="/auth/signup"
                            className="hidden lg:block bg-teal-500 text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition hover:bg-teal-600"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center justify-center gap-4">
                        {/* Theme Toggle - Mobile */}
                        <button 
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg text-teal-500 dark:text-teal-300 hover:scale-110 transition-transform"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button 
                            onClick={toggleSidebar} 
                            className="text-3xl text-gray-900 dark:text-white"
                            aria-label="Open menu"
                        >
                            <Menu />
                        </button>
                    </div>
                </div>

                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Mobile Sidebar Content */}
                <div
                    className={`fixed top-0 right-0 w-4/5 max-w-md h-full z-50 bg-white dark:bg-gray-800 flex flex-col items-center justify-center transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out shadow-2xl`}
                >
                    <button 
                        onClick={toggleSidebar} 
                        className="absolute top-6 right-6 text-gray-900 dark:text-white text-3xl"
                        aria-label="Close menu"
                    >
                        <X />
                    </button>
                    
                    <nav className="flex flex-col items-center space-y-8 text-lg w-full px-6">
                        <Link 
                            href="/" 
                            onClick={toggleSidebar} 
                            className="w-full text-center py-3 text-gray-900 dark:text-white hover:text-teal-500 transition-colors"
                        >
                            Home
                        </Link>
                        <Link 
                            href="#about" 
                            onClick={toggleSidebar} 
                            className="w-full text-center py-3 text-gray-900 dark:text-white hover:text-teal-500 transition-colors"
                        >
                            About
                        </Link>
                        <Link 
                            href="#features" 
                            onClick={toggleSidebar} 
                            className="w-full text-center py-3 text-gray-900 dark:text-white hover:text-teal-500 transition-colors"
                        >
                            Features
                        </Link>
                        <Link 
                            href="#pricing" 
                            onClick={toggleSidebar} 
                            className="w-full text-center py-3 text-gray-900 dark:text-white hover:text-teal-500 transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link 
                            href="#helpCenter" 
                            onClick={toggleSidebar} 
                            className="w-full text-center py-3 text-gray-900 dark:text-white hover:text-teal-500 transition-colors"
                        >
                            Help Center
                        </Link>
                        <Link 
                            href="#contact" 
                            onClick={toggleSidebar} 
                            className="w-full text-center py-3 text-gray-900 dark:text-white hover:text-teal-500 transition-colors"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="w-full text-center bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-colors mt-4"
                            onClick={toggleSidebar}
                        >
                            Get Started
                        </Link>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;