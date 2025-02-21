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
        <div id="pricing" className="px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-900 min-h-screen text-white py-14">
            <h1 className="text-center text-4xl font-bold">Pricing</h1>
            <p className="text-center text-lg mt-2">Below are our pricing plans</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-8 justify-center">
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