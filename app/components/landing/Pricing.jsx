"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
// import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const pricingPlans = [
    {
        name: "Free",
        price: "$0 / month",
        features: [
            "Image Scan (10 scans/month)",
            "Chat Transcript (10 scans/month)",
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
            "Chat Transcript (20 scans/month)",
            "History and Feedback",
            "Kito Awareness",
            "Report a Kito",
            "No API Access",
            "No Kito GPT Model Access",
            "Community Support",
            "Help Center and Docs",
            "No 24/7 Support",
            "No Kito Conversation Analyzer"
        ]
    },
    {
        name: "Premium",
        price: "$5.99 / month",
        features: [
            "Image Scan (1000 scans/month)",
            "Chat Transcript (500 scans/month)",
            "History and Feedback",
            "Kito Awareness",
            "Report a Kito",
            "API Access (Limited)",
            "Access to Kito GPT Model (Limited)",
            "24/7 Support - Live Chat (Limited)",
            "3 days Free Trial",
            "No Kito Conversation Analyzer"
        ]
    }
];

const PricingCard = ({ plan, isPopular }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative p-6 rounded-2xl ${
                isDark
                    ? "bg-gray-800/50 backdrop-blur-lg border border-gray-700"
                    : "bg-white/50 backdrop-blur-lg border border-gray-200"
            } ${isPopular ? "ring-2 ring-teal-500" : ""}`}
        >
            {isPopular && (
                <span className="absolute -top-2 right-4 bg-teal-500 text-white px-3 py-1 text-sm rounded-full">
                    Popular
                </span>
            )}
            <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {plan.name}
            </h3>
            <p className={`mt-2 text-3xl font-bold ${isDark ? "text-teal-400" : "text-blue-600"}`}>
                {plan.price}
            </p>
            <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => {
                    const isNegative = feature.startsWith("No ");
                    return (
                        <li key={index} className="flex items-center space-x-3">
                            {isNegative ? (
                                // <XMarkIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                                <p className="h-5 w-5 text-red-500 flex-shrink-0">Yes</p>
                            ) : (
                                // <CheckIcon className="h-5 w-5 text-teal-500 flex-shrink-0" />
                                <p className="h-5 w-5 text-teal-500 flex-shrink-0">No</p>
                                // <p className="h-5 w-5 text-red-500 flex-shrink-0">Yes</p>
                            )}
                            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                                {feature}
                            </span>
                        </li>
                    );
                })}
            </ul>
            <button
                className={`mt-8 w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    isPopular
                        ? "bg-teal-500 text-white hover:bg-teal-600"
                        : isDark
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
            >
                Get Started
            </button>
        </motion.div>
    );
};

const Pricing = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">Choose Your Plan</h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Select the perfect plan for your needs and start protecting yourself today.
                    </p>
                </div>
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard
                            key={plan.name}
                            plan={plan}
                            isPopular={index === 2} // Premium plan is popular
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;