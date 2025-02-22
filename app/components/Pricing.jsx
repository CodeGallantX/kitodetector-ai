"use client";
import { motion } from "framer-motion";

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
            "Help Center and Docs"
        ]
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
        ]
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
            "Help Center and Docs"
        ]
    }
];

const Pricing = () => {
    return (
        <div id="pricing" className="relative px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-900 min-h-screen text-white py-14 z-20">
            {/* Background Blurry Blobs */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <motion.div
                    className="absolute w-[250px] h-[250px] bg-teal-500 rounded-full filter blur-3xl opacity-50 bottom-24 right-0"
                    animate={{
                        x: ["-20%", "10%", "-10%"],
                        y: ["0%", "30%", "-10%"],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-[200px] h-[200px] bg-purple-500 rounded-full filter blur-3xl opacity-50 top-14 left-10"
                    animate={{
                        x: ["20%", "-10%", "15%"],
                        y: ["10%", "-15%", "10%"],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-[220px] h-[220px] bg-pink-500 rounded-full filter blur-3xl opacity-50 top-1/2 left-1/3"
                    animate={{
                        x: ["-10%", "15%", "-10%"],
                        y: ["-10%", "20%", "-10%"],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <h1 className="text-center text-4xl font-bold">Pricing</h1>
            <p className="text-center text-lg mt-2">Below are our pricing plans</p>
            
            {/* Pricing Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-8 justify-center z-10">
                {pricingPlans.map((plan, index) => (
                    <motion.div 
                        key={index} 
                        className="bg-gray-700 px-6 py-8 rounded-xl w-full max-w-sm cursor-default"
                        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-center mb-2">{plan.name}</h2>
                            <p className="text-center text-lg font-semibold text-teal-400">{plan.price}</p>
                            <ul className="mt-4 space-y-2">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="text-lg text-left">{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
