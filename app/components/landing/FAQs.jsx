"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// Updated FAQ data array
const faqs = [
  { 
    question: "What is KitoDeck AI?", 
    answer: "KitoDeck AI helps you identify and avoid kito predators using AI-powered analysis. Our platform uses advanced machine learning to detect potential threats and protect users from online predators." 
  },
  { 
    question: "How does the image scan work?", 
    answer: "You upload an image, and our system compares it with known kito suspects using facial recognition and pattern matching. The AI analyzes various features to determine potential matches and provides a detailed report." 
  },
  { 
    question: "What is included in the free plan?", 
    answer: "The free plan includes limited scans (10 per month), basic chat transcript analysis, access to our knowledge base, and community support. It's a great way to try out our service." 
  },
  { 
    question: "How accurate is the AI detection?", 
    answer: "Our AI has been trained on extensive datasets and has an accuracy rate of over 95%. However, we always recommend using it as a tool alongside your own judgment." 
  },
  { 
    question: "Can I use KitoDeck AI on mobile devices?", 
    answer: "Yes, our platform is fully responsive and works on all devices including smartphones and tablets. You can access all features through our mobile-friendly interface." 
  },
  { 
    question: "What happens to my uploaded images?", 
    answer: "Your privacy is our priority. Images are processed securely and deleted immediately after analysis. We never store or share your data with third parties." 
  },
  { 
    question: "How do I report a suspected predator?", 
    answer: "You can use our reporting feature to submit details about suspicious individuals. Our team reviews all reports and takes appropriate action while maintaining confidentiality." 
  },
  { 
    question: "What payment methods do you accept?", 
    answer: "We accept all major credit cards, PayPal, and various other payment methods. All transactions are secure and encrypted." 
  },
  { 
    question: "Can I cancel my subscription anytime?", 
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period." 
  },
  { 
    question: "Do you offer refunds?", 
    answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, you can request a full refund within this period." 
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Frequently Asked Questions</h2>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Find answers to common questions about KitoDeck AI
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden ${
                isDark
                  ? "bg-gray-800/50 backdrop-blur-lg border border-gray-700"
                  : "bg-white/50 backdrop-blur-lg border border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-6 py-4 text-left flex justify-between items-center ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="w-5 h-5" />
                ) : (
                  <FaChevronDown className="w-5 h-5" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`px-6 pb-4 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;