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
]

const Pricing = () => {
    return (
        <div id="pricing" className="relative px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-900 min-h-screen text-white py-14">
            {/* Background Blurry Blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute w-[300px] h-[300px] bg-teal-500 rounded-full filter blur-3xl opacity-50 right-0"
                    initial={{ x: "-30%", y: "-20%", scale: 1 }}
                    animate={{ x: ["-20%", "10%", "-10%"], y: ["0%", "30%", "-10%"], scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                    className="absolute w-[200px] h-[200px] bg-purple-500 rounded-full filter blur-3xl opacity-50 bottom-10 left-10"
                    initial={{ x: "30%", y: "20%", scale: 1 }}
                    animate={{ x: ["20%", "-10%", "15%"], y: ["10%", "-15%", "10%"], scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                    className="absolute w-[250px] h-[250px] bg-pink-600 rounded-full filter blur-3xl opacity-50 top-0 left-0 hidden"
                initial={{ x: "-20%", y: "30%", scale: 1 }}
                animate={{ x: ["-15%", "15%", "-10%"], y: ["30%", "10%", "20%"], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <h1 className="text-center text-4xl font-bold">Pricing</h1>
            <p className="text-center text-lg mt-2">Below are our pricing plans</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-8 justify-center z-10">
                {pricingPlans.map((plans, index) =>
                    <div key={index} className="bg-gray-700 px-6
                     py-8 rounded-xl w-full max-w-sm hover:bg-teal-600 transition-all duration-300 ease-in-out cursor-default">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-center mb-2">{plans.name}</h2>
                            {plans.features.map((features, idx) =>
                                <ul key={idx}>
                                    <li className="text-lg text-left">{features}</li>
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Pricing;