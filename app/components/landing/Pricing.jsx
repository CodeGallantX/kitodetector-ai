"use client";

import PricingCard from "@/app/components/ui/PricingCard";

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
      "Help Center and Docs",
    ],
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
      "No Kito Conversation Analyzer",
    ],
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
      "3 Days Free Trial",
      "No Kito Conversation Analyzer",
    ],
  },
];



const Pricing = () => {
  return (
    <section id="pricing" className="bg-white dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Find the perfect fit for your protection and start scanning smarter.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isPopular={index === 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
