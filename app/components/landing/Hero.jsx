'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Hero = () => {
  const { theme, setTheme } = useTheme();

  return (
    <section className="py-40 bg-gray-50 dark:bg-gray-900 min-h-screen px-6 md:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
      {/* Background Blurry Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[300px] h-[300px] bg-teal-500 dark:bg-teal-600 rounded-full filter blur-3xl opacity-30 dark:opacity-20"
          initial={{ x: "-30%", y: "-20%", scale: 1 }}
          animate={{ 
            x: ["-30%", "-10%", "-20%", "-30%"],
            y: ["-20%", "10%", "-10%", "-20%"],
            scale: [1, 1.2, 1.1, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-[200px] h-[200px] bg-purple-500 dark:bg-purple-600 rounded-full filter blur-3xl opacity-30 dark:opacity-20 bottom-14 right-10"
          initial={{ x: "30%", y: "20%", scale: 1 }}
          animate={{ 
            x: ["30%", "10%", "25%", "30%"],
            y: ["20%", "-15%", "25%", "20%"],
            scale: [1, 1.3, 1.2, 1]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute w-[250px] h-[250px] bg-blue-500 dark:bg-blue-600 rounded-full filter blur-3xl opacity-20 dark:opacity-15 top-1/2 left-1/4"
          initial={{ x: "-50%", y: "-50%", scale: 1 }}
          animate={{ 
            x: ["-50%", "-60%", "-40%", "-50%"],
            y: ["-50%", "-40%", "-60%", "-50%"],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left"
        >
          <motion.h1 
            className="text-4xl sm:text-6xl font-bold mb-6 mt-4 text-gray-900 dark:text-white w-full max-w-md md:max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to KitoDeck AI – Identify and Avoid Kito Predators
          </motion.h1>
          
          <motion.p
            className="text-xl sm:text-2xl mb-8 max-w-xl text-gray-700 dark:text-gray-300 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            KitoDeck AI uses advanced AI to detect and prevent Kito threats, keeping you safe through smart analysis and real-time alerts.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/auth/signup"
              className="inline-block bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 px-8 py-4 rounded-full text-lg text-white font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-teal-500/30 dark:hover:shadow-teal-600/30"
            >
              Sign Up for Free
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;