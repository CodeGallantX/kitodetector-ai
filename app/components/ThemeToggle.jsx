"use client";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("dark");

    // Load saved theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        document.documentElement.classList.add(savedTheme);
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        
        // Update the HTML tag to reflect theme
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    };

    return (
        <button 
            onClick={toggleTheme} 
            className="p-3 transition-all duration-300"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? <FaSun className="text-gray-900 text-xl" /> : <FaMoon className="text-teal-500 text-xl" />}
        </button>
    );
};

export default ThemeToggle;
