"use client";
import { useState } from 'react';

const faqs = [
  {
    question: "What is KitoDeck AI?",
    answer: "KitoDeck AI helps you identify and avoid Kito predators using AI-powered analysis",
  },
  {
    question: "How does the image scan work?",
    answer: "You upload an image and our system compares it with known Kito suspects.",
  },
  {
    question: "What is included in the free plan?",
    answer: "The free plan includes limited scans with no 24/7 support.",
  },
]


const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-900 py-14 px-6 md:px-8 lg:px-16 xl:px-24">
            <h2 className="text-4xl font-bold mb-10 text-center">FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-10">
                {faqs.map((faq, index) => (
                    <div key={index}>
                        <button
                            onClick={() => toggleFaq(index)}
                            className={`w-full text-left py-4 px-6 rounded-full font-bold transition-all duration-300 ${activeIndex === index
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-white text-gray-900'
                                }`}
                        >
                            <span>{faq.question}</span>
                            <svg id="plus" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" 
                            className={`float-right transition-all duration-500 ease ${activeIndex === index
                                    ? 'fill-white rotate-[225deg]'
                                    : 'fill-teal-600'
                                }`} 
                            viewBox="0 0 256 256">
                                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                            </svg>
                        </button>
                        {activeIndex === index && (
                            <div className="relative text-sm font-serif -z-10 -top-6 px-6 pb-4 pt-12 text-gray-700 bg-white rounded-b-2xl">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
