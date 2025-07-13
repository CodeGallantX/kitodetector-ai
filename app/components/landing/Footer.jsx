"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const { theme } = useTheme();

  const footerClasses = {
    container: theme === "dark" 
      ? "bg-gray-900 text-gray-300" 
      : "bg-gray-50 text-gray-600",
    link: theme === "dark"
      ? "text-gray-300 hover:text-white"
      : "text-gray-600 hover:text-gray-900",
    border: theme === "dark"
      ? "border-gray-700"
      : "border-gray-200"
  };

  return (
    <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${footerClasses.container}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">KitoDetector AI</h3>
            <p className="mb-4">
              Advanced AI-powered image analysis and detection platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={footerClasses.link}>
                <Github size={20} />
              </a>
              <a href="#" className={footerClasses.link}>
                <Twitter size={20} />
              </a>
              <a href="#" className={footerClasses.link}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className={footerClasses.link}>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={footerClasses.link}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className={footerClasses.link}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className={footerClasses.link}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className={footerClasses.link}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={footerClasses.link}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${footerClasses.border}`}>
          <p className="text-center">
            © {new Date().getFullYear()} KitoDetector AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;