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
  // const [uploadedImage, setUploadedImage] = useState(null);
  // const [chatText, setChatText] = useState("");
  // const [dragging, setDragging] = useState(false);
  const { theme } = useTheme(); 

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     setUploadedImage(URL.createObjectURL(file));
  //   }
  // };

  // // Handle image drop on drag and drop area
  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setDragging(false);
  //   const file = e.dataTransfer.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     setUploadedImage(URL.createObjectURL(file));
  //   }
  // };

  // // Visual feedback during drag over
  // const handleDragOver = (e) => {
  //   e.preventDefault();
  //   setDragging(true);
  // };

  // // Reset drag state when leaving drop area
  // const handleDragLeave = () => setDragging(false);

  // // Simple analysis of chat text (placeholder functionality)
  // const handleChatAnalyze = () => {
  //   if (chatText.trim() === "") {
  //     alert("Please enter some text to analyze");
  //     return;
  //   }
  //   alert("Chat analyzed: No threats detected! ✅");
  // };

  // Determine theme-based classes
  const getThemeClasses = () => {
    const isDark = theme === "dark";
    return {
      sectionBg: isDark ? "bg-gray-900" : "bg-gray-50",
      textColor: isDark ? "text-white" : "text-gray-800",
      featureCard: isDark ? "bg-white/10" : "bg-white",
      featureText: isDark ? "text-gray-300" : "text-gray-600",
      // dropZone: isDark
      //   ? dragging
      //     ? "border-teal-400 bg-gray-800"
      //     : "border-gray-600"
      //   : dragging
      //   ? "border-teal-400 bg-gray-100"
      //   : "border-gray-300",
      // uploadIcon: isDark ? "text-gray-400" : "text-gray-500",
      // textArea: isDark ? "bg-gray-800" : "bg-white border border-gray-300",
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <section
      id="features"
      className={`px-6 md:px-8 lg:px-16 xl:px-24 py-16 ${themeClasses.sectionBg} ${themeClasses.textColor}`}
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
            className={`p-6 ${themeClasses.featureCard} backdrop-blur-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105`}
          >
            <div className="text-3xl text-teal-400 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className={themeClasses.featureText}>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className={`p-6 ${themeClasses.featureCard} backdrop-blur-lg rounded-2xl shadow-lg`}>
          <h3 className="text-xl font-semibold mb-4">Image Scan</h3>
          <div
            className={`border-2 border-dashed p-6 rounded-lg text-center ${themeClasses.dropZone}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className={`text-4xl ${themeClasses.uploadIcon} mx-auto mb-3`} />
            <p className={themeClasses.featureText}>Drag & Drop an image here</p>
            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
              id="fileInput"
              accept="image/*"
            />
            <label
              htmlFor="fileInput"
              className="block mt-3 cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Upload Image
            </label>
          </div>
          {uploadedImage && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={uploadedImage}
              alt="Uploaded preview"
              className="mt-4 rounded-lg w-full max-h-64 object-cover"
            />
          )}
        </div>

        <div className={`p-6 ${themeClasses.featureCard} backdrop-blur-lg rounded-2xl shadow-lg`}>
          <h3 className="text-xl font-semibold mb-4">Chat Transcript Scan</h3>
          <textarea
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            className={`w-full p-2 rounded-md ${themeClasses.textArea} ${themeClasses.textColor} outline-none focus:ring-1 focus:ring-teal-500 transition-all duration-300 ease-in-out`}
            placeholder="Paste chat transcript here..."
            rows="5"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleChatAnalyze}
            className="mt-4 bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 text-white"
          >
            Analyze Chat
          </motion.button>
        </div>
      </motion.div> */}
    </section>
  );
};

export default Features;