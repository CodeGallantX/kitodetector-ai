"use client";
import { useState } from "react";
import { FaCamera, FaComments, FaHistory, FaShieldAlt, FaFlag } from "react-icons/fa";

const features = [
  {
    title: "Image Scan",
    description: "Upload an image to check for Kito suspects using AI analysis.",
    icon: <FaCamera />,
  },
  {
    title: "Chat Transcript Scan",
    description: "Paste a chat transcript and analyze it for potential threats.",
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleChatAnalyze = () => {
    if (chatText.trim() === "") return;
    alert("Chat analyzed: No threats detected! ✅");
  };

  return (
    <section className="px-6 md:px-8 lg:px-16 xl:px-24 py-16 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105">
            <div className="text-3xl text-teal-400 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Image Upload & Chat Scan Simulation */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Image Scan Simulation</h3>
          <input type="file" onChange={handleImageUpload} className="mb-4" />
          {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="mt-4 rounded-lg w-full max-h-64 object-cover" />}
        </div>

        <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Chat Transcript Scan</h3>
          <textarea
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 text-white outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="Paste chat transcript here..."
          />
          <button onClick={handleChatAnalyze} className="mt-4 bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 ">
            Analyze Chat
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
