"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Preloader = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3500); // Load for 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative min-h-screen bg-gray-900 text-white flex justify-center items-center">
            {loading ? (
                // Spinner
                <motion.div
                    className="w-14 h-14 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
            ) : (
                // Content fades in after 3 seconds
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
