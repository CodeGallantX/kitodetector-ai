"use client";
import { FaShieldAlt, FaUsers, FaSearch } from "react-icons/fa";

const helpTopics = [
  {
    title: "Kito Awareness",
    description: "Learn how to identify and report Kito activities to keep yourself safe online.",
    icon: <FaShieldAlt className="text-teal-400 text-4xl" />,
  },
  {
    title: "KlickCircle",
    description: "A secure community to discuss experiences and share scam prevention strategies.",
    icon: <FaUsers className="text-blue-400 text-4xl" />,
  },
  {
    title: "Twinningle",
    description: "A database of reported Kito cases and AI-powered scam detection tools.",
    icon: <FaSearch className="text-yellow-400 text-4xl" />,
  },
];

const HelpCenter = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Help Center</h2>
        <p className="text-lg text-gray-300">
          Get support and resources for Kito Awareness, KlickCircle, and Twinningle.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {helpTopics.map((topic, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <div className="mb-4 flex justify-center">{topic.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
            <p className="text-gray-300">{topic.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HelpCenter;
