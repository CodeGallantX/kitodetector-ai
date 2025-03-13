import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="py-40 light:bg-gray-50 dark:bg-gray-900 min-h-screen px-6 md:px-8 lg:px-16 xl:px-24 relative overflow-hidden">

      {/* Background Blurry Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[300px] h-[300px] bg-teal-500 rounded-full filter blur-3xl opacity-50"
        initial={{ x: "-30%", y: "-20%", scale: 1 }}
        animate={{ x: ["-20%", "10%", "-10%"], y: ["0%", "30%", "-10%"], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[200px] h-[200px] bg-purple-500 rounded-full filter blur-3xl opacity-50 bottom-14 right-10"
        initial={{ x: "30%", y: "20%", scale: 1 }}
        animate={{ x: ["20%", "-10%", "15%"], y: ["10%", "-15%", "10%"], scale: [1, 1.3, 1] }}
        transition={{ duration:4 , repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="z-10 flex flex-col items-center lg:items-start justify-center text-center lg:text-left"
      >
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 mt-4 text-white z-10 w-full max-w-md md:max-w-2xl">
          Welcome to KitoDeck AI – Identify and Avoid Kito Predators
        </h1>
        <p className="text-xl sm:text-2xl mb-8 max-w-xl text-white z-10 opacity-90">
          KitoDeck AI uses advanced AI to detect and prevent Kito threats, keeping you safe through smart analysis and real-time alerts.
        </p>

        {/* CTA Button */}
        <Link
          href="/auth/signup"
          className="bg-teal-500 px-8 py-4 rounded-full text-lg text-white transition transform hover:scale-105 z-10"
        >
          Sign Up for Free
        </Link>
      </motion.div>
    </section>
  );
}

export default Hero;