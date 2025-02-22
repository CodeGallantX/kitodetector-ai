"use client"
import { useState } from 'react';
import Link from 'next/link';
import { HiMenuAlt4 } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import ThemeToggle from "./ThemeToggle"

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <header className="px-6 md:px-8 lg:px-16 xl:px-24">
                <div className="z-30 px-6 lg:px-10 py-4 md:py-6 fixed backdrop-blur-md w-11/12 lg:5/6 left-1/2 -translate-x-1/2 light:bg-white/30 dark:bg-gray-800/30 top-6 rounded-full flex flex-row items-center justify-between ">
                    <h1 href="/" className="text-2xl md:text-3xl font-bold text-white font-outfit">
                        Kito Deck AI
                    </h1>

                    <nav className="hidden lg:flex items-center gap-8 font-medium text-white">
                        <Link href="/">Home</Link>
                        <Link href="#about">About</Link>
                        <Link href="#features">Features</Link>
                        <Link href="#pricing">Pricing</Link>
                        <Link href="#helpCenter">Help Center</Link>
                        <Link href="#contact">Contact</Link>
                    </nav>
                    <div className="flex items-center justify-center">
                        <ThemeToggle />
                    <Link
                        href="/auth/signup"
                        className="hidden lg:block bg-teal-500 text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition"
                    >
                        Get Started
                    </Link>
                    </div>

                    <div className="lg:hidden flex items-center justify-center">
                    <ThemeToggle />
                    <button onClick={toggleSidebar} className="text-3xl text-white">
                        <HiMenuAlt4 />
                    </button>
                    </div>
                </div>
                {/* Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
                        onClick={toggleSidebar}
                    ></div>
                )}

                <div
                    className={`fixed inset-0 z-50 light:bg-gray-900/80 dark:bg-white/30 text-white flex flex-col items-center justify-center transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                        } transition-transform duration-300 ease-in-out`}
                >
                    <button onClick={toggleSidebar} className="absolute top-6 right-6 text-white text-3xl">
                        <IoMdClose />
                    </button>
                    <nav className="flex flex-col items-center space-y-8 text-lg">
                        <Link href="#about" onClick={toggleSidebar} className="hover:text-teal-500">
                            About
                        </Link>
                        <Link href="#features" onClick={toggleSidebar} className="hover:text-teal-500">
                            Features
                        </Link>
                        <Link href="#pricing" onClick={toggleSidebar} className="hover:text-teal-500">
                            Pricing
                        </Link>
                        <Link href="#contact" onClick={toggleSidebar} className="hover:text-teal-500">
                            Contact
                        </Link>
                        <Link href="#help-center" onClick={toggleSidebar} className="hover:text-teal-500">
                            Help Center
                        </Link>
                        <Link
                            href="/login"
                            className="bg-teal-500 text-white px-6 py-3 rounded-full hover:scale-105 transition"
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