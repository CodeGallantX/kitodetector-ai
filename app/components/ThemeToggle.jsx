"use client";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? <FaSun className="text-yellow-500 text-xl" /> : <FaMoon className="text-gray-700 text-xl" />}
        </button>
    );
};

export default ThemeToggle;
