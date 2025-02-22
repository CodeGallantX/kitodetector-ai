import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">KitoDeck AI</h2>
          <p className="text-gray-400">
            AI-powered protection against online Kito predators. Scan images, analyze chats, and stay safe.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="text-gray-300 hover:text-teal-400 transition">Home</Link></li>
            <li><Link href="#" className="text-gray-300 hover:text-teal-400 transition">Features</Link></li>
            <li><Link href="#" className="text-gray-300 hover:text-teal-400 transition">FAQ</Link></li>
            <li><Link href="#" className="text-gray-300 hover:text-teal-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="p-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-teal-600 transition">
              <FaFacebookF />
            </Link>
            <Link href="#" className="p-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-teal-600 transition">
              <FaTwitter />
            </Link>
            <Link href="#" className="p-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-teal-600 transition">
              <FaInstagram />
            </Link>
            <Link href="#" className="p-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-teal-600 transition">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} KitoDeck AI. All rights reserved.
      </div>
    </footer>
  );
};


export default Footer;