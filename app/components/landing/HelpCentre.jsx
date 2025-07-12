"use client";
import { FaShieldAlt, FaUsers, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "next-themes"; // For theme handling

// Help topics data array - contains all the information for each help section
const helpTopics = [
  {
    title: "Kito Awareness",
    description: "Learn how to identify and report Kito activities to keep yourself safe online.",
    icon: <FaShieldAlt className="text-teal-400 text-4xl" />,
  },
  {
    title: "KlickCircle",
    description: "A secure community to discuss experiences and share scam prevention strategies.",
    icon: <FaUsers className="text-teal-400 text-4xl" />,
  },
  {
    title: "Twinningle",
    description: "A database of reported Kito cases and AI-powered scam detection tools.",
    icon: <FaSearch className="text-teal-400 text-4xl" />,
  },
];

// Animation variants for framer-motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger animation for child elements
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5, // Smooth transition duration
    },
  },
};

const HelpCenter = () => {
  const { theme } = useTheme(); // Access current theme 

  // Determine background and text colors based on theme
  const sectionClasses = theme === "dark" 
    ? "bg-gray-900 text-white" 
    : "bg-gray-50 text-gray-900";
  
  const cardClasses = theme === "dark" 
    ? "bg-gray-800 text-white" 
    : "bg-white text-gray-800 border border-gray-200";

  return (
    <section 
      id="helpCenter" 
      className={`${sectionClasses} py-16 px-6 md:px-12 lg:px-20 transition-colors duration-300`}
    >
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Animated heading */}
        <motion.h2 
          className="text-4xl font-bold mb-6"
          variants={itemVariants}
        >
          Help Center
        </motion.h2>
        
        {/* Animated description */}
        <motion.p 
          className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          variants={itemVariants}
        >
          Get support and resources for Kito Awareness, KlickCircle, and Twinningle.
        </motion.p>
      </motion.div>

      {/* Animated cards container */}
      <motion.div 
        className="mt-10 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {helpTopics.map((topic, index) => (
          <motion.div 
            key={index} 
            className={`${cardClasses} p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300`}
            variants={itemVariants}
            whileHover={{ y: -5 }} // Lift effect on hover
          >
            <div className="mb-4 flex justify-center">{topic.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              {topic.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HelpCenter;