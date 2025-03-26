"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Pricing plans data structure
const pricingPlans = [
  {
    name: "Free",
    price: "$0 / month",
    features: [
      "Image Scan (10 scans/month)",
      "Chat Transcripts (10 scans/month)",
      "History and Feedback",
      "Kito Awareness",
      "Report a Kito",
      "No 24/7 Support",
      "Community Support",
      "Help Center and Docs",
    ],
  },
  {
    name: "Starter",
    price: "$3.99 / month",
    features: [
      "Image Scan (50 scans/month)",
      "Chat Transcripts (20 scans/month)",
      "History and Feedback",
      "Kito Awareness",
      "Report a Kito",
      "No API Access",
      "No Kito GPT Model Access",
      "Community Support",
      "Help Center and Docs",
      "No 24/7 Support",
      "No Kito Conversion",
    ],
  },
  {
    name: "Premium",
    price: "$5.99 / month",
    features: [
      "Image Scan (1000 scans/month)",
      "Chat Transcripts (500 scans/month)",
      "History and Feedback",
      "Kito Awareness",
      "Report a Kito",
      "API Access (Limited)",
      "No 24/7 Support",
      "Community Support",
      "Help Center and Docs",
    ],
  },
];

const Pricing = () => {
  // Intersection Observer hooks for scroll animations
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [subtitleRef, subtitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      id="pricing"
      className="relative px-6 md:px-8 lg:px-16 xl:px-24 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white py-14 z-20"
    >
      {/* Background Blurry Blobs - Animated floating circles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Teal blob - bottom right */}
        <motion.div
          className="absolute w-[250px] h-[250px] bg-teal-400 dark:bg-teal-500 rounded-full filter blur-3xl opacity-30 dark:opacity-50 bottom-24 right-0"
          animate={{
            x: ["-20%", "10%", "-10%"],
            y: ["0%", "30%", "-10%"],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Purple blob - top left */}
        <motion.div
          className="absolute w-[200px] h-[200px] bg-purple-400 dark:bg-purple-500 rounded-full filter blur-3xl opacity-30 dark:opacity-50 top-14 left-10"
          animate={{
            x: ["20%", "-10%", "15%"],
            y: ["10%", "-15%", "10%"],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Pink blob - middle */}
        <motion.div
          className="absolute w-[220px] h-[220px] bg-pink-400 dark:bg-pink-500 rounded-full filter blur-3xl opacity-30 dark:opacity-50 top-1/2 left-1/3"
          animate={{
            x: ["-10%", "15%", "-10%"],
            y: ["-10%", "20%", "-10%"],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Section Title - Animated on scroll */}
      <motion.h1
        ref={titleRef}
        className="text-center text-4xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Pricing
      </motion.h1>

      {/* Subtitle - Animated on scroll with delay */}
      <motion.p
        ref={subtitleRef}
        className="text-center text-lg mt-2 text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={subtitleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Below are our pricing plans
      </motion.p>

      {/* Pricing Cards Grid - Staggered animations */}
      <motion.div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-8 justify-center z-10"
        initial="hidden"
        animate={cardsInView ? "visible" : {}}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 dark:bg-gray-700 px-6 py-8 rounded-xl w-full max-w-sm cursor-default shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col justify-center h-full">
              {/* Plan Name */}
              <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
                {plan.name}
              </h2>
              
              {/* Price - Accent colored */}
              <p className="text-center text-lg font-semibold text-teal-500 dark:text-teal-400">
                {plan.price}
              </p>
              
              {/* Features List */}
              <ul className="mt-6 space-y-3 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-gray-700 dark:text-gray-300"
                  >
                    <span className="mr-2 text-teal-500">•</span>
                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button - Animated on hover */}
              <motion.button
                className={`mt-8 w-full py-3 rounded-lg font-medium transition-colors ${
                  index === 1
                    ? "bg-teal-500 hover:bg-teal-600 text-white" // Highlight middle plan
                    : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {index === 1 ? "Get Started" : "Choose Plan"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Pricing;