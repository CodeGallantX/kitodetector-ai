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

const Features = () => {
    return (
        <div id="#pricing" className="px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-900 min-h-screen text-white">
            <div>Pricing</div>
            {pricingPlans.map((plans, index) =>
                <div key={index} className="flex flex-col items-start justify-center rounded-md bg-gray-700 border border-gray-600 px-2 py-4">
                    <div className="">
                        <h2>{plans.name}</h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Features;