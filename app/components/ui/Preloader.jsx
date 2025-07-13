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
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 ${
          theme === "dark" ? "bg-gray-900" : "bg-white/50"
        } backdrop-blur-sm z-50`}
      >
        <div className="h-screen flex flex-col justify-center items-center">
          <motion.div
            className={`w-16 h-16 border-4 ${
              theme === "dark"
                ? "border-teal-400 border-t-transparent"
                : "border-teal-500 border-t-transparent"
            } rounded-full animate-spin`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  }

  // Only render children when loading is done (avoids hydration mismatch)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default Preloader;
