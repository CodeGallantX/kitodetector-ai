"use client";
import { useState } from "react";
import { FaCamera, FaComments, FaHistory, FaShieldAlt, FaFlag, FaUpload } from "react-icons/fa";

const features = [
  {
    title: "Image Scan",
    description: "Upload or drag & drop an image for AI-powered Kito detection.",
    icon: <FaCamera />,
  },
  {
    title: "Chat Transcript Scan",
    description: "Paste or upload a chat transcript and analyze potential threats.",
    icon: <FaComments />,
  },
  {
    title: "History & Feedback",
    description: "View past scans and provide feedback for AI improvements.",
    icon: <FaHistory />,
  },
  {
    title: "Kito Awareness",
    description: "Learn about common Kito tactics and how to stay safe.",
    icon: <FaShieldAlt />,
  },
  {
    title: "Report a Kito",
    description: "Report suspicious individuals to help protect others.",
    icon: <FaFlag />,
  },
];

const Features = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [chatText, setChatText] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleChatAnalyze = () => {
    if (chatText.trim() === "") return;
    alert("Chat analyzed: No threats detected! ✅");
  };

  return (
    <section id="features" className="px-6 md:px-8 lg:px-16 xl:px-24 py-16 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 light:bg-gray-800 yydark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105">
            <div className="text-3xl text-teal-400 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Image Upload & Chat Scan Simulation */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Scan */}
        <div className="p-6 light:bg-gray-800 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Image Scan</h3>
          <div
            className={`border-2 border-dashed p-6 rounded-lg text-center ${
              dragging ? "border-teal-400 light:bg-gray-100 dark:bg-gray-800" : "light:bg-gray-200 dark:border-gray-600"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FaUpload className="text-4xl light:text-gray-500 dark:text-gray-400 mx-auto mb-3" />
            <p className="text-gray-300">Drag & Drop an image here</p>
            <input type="file" onChange={handleImageUpload} className="hidden" id="fileInput" />
            <label
              htmlFor="fileInput"
              className="block mt-3 cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Upload Image
            </label>
          </div>
          {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="mt-4 rounded-lg w-full max-h-64 object-cover" />}
        </div>

        {/* Chat Transcript Scan */}
        <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Chat Transcript Scan</h3>
          <textarea
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 text-white outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="Paste chat transcript here..."
          />
          <input
            type="file"
            className="mt-3 block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700"
            accept=".txt"
            onChange={(e) => {
              const reader = new FileReader();
              reader.onload = (ev) => setChatText(ev.target.result);
              reader.readAsText(e.target.files[0]);
            }}
          />
          <button onClick={handleChatAnalyze} className="mt-4 bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700">
            Analyze Chat
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
