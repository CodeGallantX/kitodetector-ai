"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const helpTopics = [
  {
    title: "Kito Awareness",
    content:
      "Stay informed on Kito scams, tactics, and prevention methods. Learn how to stay safe online and avoid predators.",
  },
  {
    title: "KlickCircle",
    content:
      "A community-driven feature to share reports and experiences with others for collective safety.",
  },
  {
    title: "Twinningle",
    content:
      "A tool that scans chat transcripts and interactions to identify red flags in conversations.",
  },
];

const HelpCentre = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-900 text-white py-14 px-6 md:px-8 lg:px-16 xl:px-24">
      <h2 className="text-4xl font-bold text-center mb-10">Help Center</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {helpTopics.map((topic, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-lg p-5 rounded-lg">
            <button
              onClick={() => toggleDropdown(index)}
              className="w-full flex justify-between items-center text-lg font-semibold text-white hover:text-teal-400 transition"
            >
              {topic.title}
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180 text-teal-400" : "text-white"
                }`}
              />
            </button>
            {activeIndex === index && (
              <p className="mt-3 text-gray-300">{topic.content}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HelpCentre;
