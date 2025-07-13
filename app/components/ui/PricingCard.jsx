import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { CheckCircle, XCircle } from "lucide-react";

const PricingCard = ({ plan, isPopular }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`relative p-6 rounded-2xl shadow-lg transition-all duration-300 ${
        isDark
          ? "bg-gray-800/60 border border-gray-700 text-gray-200"
          : "bg-white/70 border border-gray-200 text-gray-800"
      } ${isPopular ? "ring-2 ring-teal-500 scale-[1.02]" : ""}`}
    >
      {isPopular && (
        <span className="absolute -top-3 right-36 bg-teal-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-semibold">{plan.name}</h3>
      <p
        className={`mt-2 text-3xl font-bold ${
          isDark ? "text-teal-400" : "text-teal-600"
        }`}
      >
        {plan.price}
      </p>
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, index) => {
          const isNegative = feature.startsWith("No ");
          const label = isNegative ? feature.replace("No ", "") : feature;

          return (
            <li key={index} className="flex items-start gap-3">
              {isNegative ? (
                <XCircle className="text-red-500 w-5 h-5 mt-1" />
              ) : (
                <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
              )}
              <span
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
      <button
        className={`mt-8 w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
          isPopular
            ? "bg-teal-600 text-white hover:bg-teal-700"
            : isDark
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
      >
        Get Started
      </button>
    </motion.div>
  );
};

export default PricingCard;