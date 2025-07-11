"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const Preloader = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000); // Updated to 5 seconds as per requirement

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white/50'} backdrop-blur-sm z-50`}>
            {loading ? (
                <div className="h-screen flex flex-col justify-center items-center">
                    <motion.div
                        className={`w-16 h-16 border-4 ${
                            theme === 'dark' ? 'border-teal-400 border-t-transparent' : 'border-blue-500 border-t-transparent'
                        } rounded-full animate-spin`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    {/* <motion.p
                        className={`mt-4 text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Loading KitoDeck AI...
                    </motion.p> */}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                >
                    {children}
                </motion.div>
            )}
        </div>
    );
};

export default Preloader;
