"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const faqs = [
  { question: "What is KitoDeck AI?", answer: "KitoDeck AI helps you identify and avoid Kito predators using AI-powered analysis." },
  { question: "How does the image scan work?", answer: "You upload an image and our system compares it with known Kito suspects." },
  { question: "What is included in the free plan?", answer: "The free plan includes limited scans with no 24/7 support." },
  { question: "How accurate is KitoDeck AI?", answer: "Our AI has a high accuracy rate based on verified reports and data analysis." },
  { question: "Can I report a suspected predator?", answer: "Yes, you can report suspects through our platform for review." },
  { question: "Is my data secure?", answer: "Yes, we use encryption and follow strict security protocols to protect user data." },
  { question: "Do you support multiple languages?", answer: "Currently, we support English, but more languages will be added soon." },
  { question: "How can I get premium support?", answer: "Premium users get 24/7 priority support and faster scan results." },
  { question: "Can I use KitoDeck AI on my phone?", answer: "Yes, our platform is mobile-friendly and works on all devices." },
  { question: "What happens if an image scan fails?", answer: "If a scan fails, try uploading a clearer image or contact support." },
  { question: "Are there any legal concerns with using KitoDeck AI?", answer: "Our platform follows all legal regulations and data protection laws." },
  { question: "Can businesses use KitoDeck AI?", answer: "Yes, we offer enterprise solutions for businesses looking to integrate our AI." },
  { question: "How often is your database updated?", answer: "Our database is updated regularly with verified reports and AI improvements." }
];


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0); // First question is open

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 py-14 px-6 md:px-8 lg:px-16 xl:px-24">
      <h2 className="text-4xl font-bold mb-10 text-center text-white">FAQ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="w-full">
            <button
              onClick={() => toggleFaq(index)}
              className={`w-full text-left py-4 px-6 flex justify-between items-center rounded-xl font-bold transition-all duration-300 ${
                activeIndex === index ? "bg-teal-600 text-white z-10" : "bg-gray-100 text-gray-900"
              }`}
            >
              <span>{faq.question}</span>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180 text-white" : "text-teal-600"
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? "h-full max-h-56 pt-10 -translate-y-6 opacity-100 py-4 px-6 bg-white rounded-b-xl" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
