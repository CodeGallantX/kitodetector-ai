"use client"
import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Check scroll position and direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      
      // Show button when scrolled past 300px
      setIsVisible(currentScrollTop > 300);
      
      // Determine scroll direction
      if (currentScrollTop > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollDirection === "up" ? scrollToTop : scrollToBottom}
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all z-30 ${
            isDark
              ? "bg-gray-800/50 backdrop-blur-lg border border-gray-700 hover:bg-gray-700"
              : "bg-white/50 backdrop-blur-lg border border-gray-200 hover:bg-gray-100"
          }`}
        >
          {scrollDirection === "up" ? (
            <ChevronUp className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`} />
          ) : (
            <ChevronDown className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`} />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
