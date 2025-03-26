"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes"; // For theme management

// FAQ data array - contains all questions and answers
const faqs = [
  { question: "What is KitoDeck AI?", answer: "KitoDeck AI helps you identify and avoid Kito predators using AI-powered analysis." },
  { question: "How does the image scan work?", answer: "You upload an image and our system compares it with known Kito suspects." },
  { question: "What is included in the free plan?", answer: "The free plan includes limited scans with no 24/7 support." },
  { question: "How accurate is KitoDeck AI?", answer: "Our AI has a high accuracy rate based on verified reports and data analysis." },
  { question: "Can I report a suspected predator?", answer: "Yes, you can report suspects through our platform for review." },
  { question: "Is my data secure?", answer: "Yes, we use encryption and follow strict security protocols to protect user data." },
  { question: "Do you support multiple languages?", answer: "Currently, we support English, but more languages will be added soon." },
  { question: "How can I get premium support?", answer: "Premium users get 24/7 priority support and faster scan results." },
  { question: "Can I use KitoDeck AI on my phone?", answer: "Yes, our platform is mobile-friendly and works on all devices." },
  { question: "What happens if an image scan fails?", answer: "If a scan fails, try uploading a clearer image or contact support." },
  { question: "Are there any legal concerns with using KitoDeck AI?", answer: "Our platform follows all legal regulations and data protection laws." },
  { question: "Can businesses use KitoDeck AI?", answer: "Yes, we offer enterprise solutions for businesses looking to integrate our AI." },
  { question: "How often is your database updated?", answer: "Our database is updated regularly with verified reports and AI improvements." }
];

// Animation variants for consistent motion effects
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation for each FAQ item
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

const answerVariants = {
  open: { 
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  closed: { 
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { theme } = useTheme(); // Access current theme

  // Toggle FAQ item expansion
  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Theme-based styling
  const getThemeClasses = () => {
    const isDark = theme === "dark";
    return {
      sectionBg: isDark ? "bg-gray-900" : "bg-gray-50",
      textColor: isDark ? "text-white" : "text-gray-800",
      questionButton: isDark 
        ? "bg-gray-800 hover:bg-gray-700 text-white" 
        : "bg-white hover:bg-gray-100 text-gray-900",
      activeQuestion: isDark 
        ? "bg-teal-600 text-white" 
        : "bg-teal-500 text-white",
      answerBg: isDark 
        ? "bg-gray-800 text-gray-300" 
        : "bg-white text-gray-700",
      chevronColor: isDark 
        ? "text-white" 
        : "text-teal-600",
      borderColor: isDark 
        ? "border-gray-700" 
        : "border-gray-200"
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`py-14 px-6 md:px-8 lg:px-16 xl:px-24 ${themeClasses.sectionBg}`}
    >
      {/* Animated title with scroll trigger */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`text-4xl font-bold mb-10 text-center ${themeClasses.textColor}`}
      >
        Frequently Asked Questions
      </motion.h2>

      {/* FAQ grid with staggered animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-4"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="w-full overflow-hidden rounded-xl shadow-md"
          >
            {/* Question Button with hover effects */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleFaq(index)}
              className={`w-full text-left py-4 px-6 flex justify-between items-center rounded-xl font-medium transition-all duration-300 border ${themeClasses.borderColor} ${
                activeIndex === index 
                  ? themeClasses.activeQuestion 
                  : themeClasses.questionButton
              }`}
            >
              <span className="text-left">{faq.question}</span>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  activeIndex === index 
                    ? "rotate-180" 
                    : ""
                } ${themeClasses.chevronColor}`}
              />
            </motion.button>

            {/* Animated answer section */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={answerVariants}
                  className={`${themeClasses.answerBg} rounded-b-xl border ${themeClasses.borderColor} border-t-0`}
                >
                  <div className="p-6">
                    <p>{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FAQ;