"use client";
import { useState } from "react";
import { Camera, MessageCircle, History, Shield, Flag, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes"; // For theme management

// Feature data array - contains all feature information
const features = [
  {
    title: "Image Scan",
    description: "Upload or drag & drop an image for AI-powered Kito detection.",
    icon: <Camera />,
  },
  {
    title: "Chat Transcript Scan",
    description: "Paste or upload a chat transcript and analyze potential threats.",
    icon: <MessageCircle />,
  },
  {
    title: "History & Feedback",
    description: "View past scans and provide feedback for AI improvements.",
    icon: <History />,
  },
  {
    title: "Kito Awareness",
    description: "Learn about common Kito tactics and how to stay safe.",
    icon: <Shield />,
  },
  {
    title: "Report a Kito",
    description: "Report suspicious individuals to help protect others.",
    icon: <Flag />,
  },
];

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation for children
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Features = () => {
  const { theme } = useTheme(); 

  // Determine theme-based classes
  const getThemeClasses = () => {
    const isDark = theme === "dark";
    return {
      sectionBg: isDark ? "bg-gray-900" : "bg-gray-50",
      textColor: isDark ? "text-white" : "text-gray-800",
      featureCard: isDark ? "bg-white/10" : "bg-white",
      featureText: isDark ? "text-gray-300" : "text-gray-600",
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <section
      id="features"
      className={`scroll-mt-16 px-6 md:px-8 lg:px-16 xl:px-24 py-16 ${themeClasses.sectionBg} ${themeClasses.textColor}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-10"
      >
        Features
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`p-6 ${themeClasses.featureCard} flex flex-col items-start backdrop-blur-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105`}
          >
            <div className="p-3 text-white dark:text-teal-400 mb-4 bg-teal-500 dark:bg-teal-100/10 rounded-md ">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className={themeClasses.featureText}>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
};

export default Features;