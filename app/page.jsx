import Header from "@/app/components/Header"
import Hero from "@/app/components/Hero"
import Features from "@/app/components/Features"
import Pricing from "@/app/components/Pricing"
import FAQ from "@/app/components/FAQs"
import HelpCentre from "@/app/components/HelpCentre"
import ScrollToTop from "@/app/components/ScrollToTop"
import Footer from "@/app/components/Footer"

const App = () => {
    return (
        <div>
            <Header />
            <Hero />
            <Features />
            <Pricing />
            <FAQ />
            <ScrollToTop />
            <HelpCentre />
            <Footer />
        </div>
    )
}

export default App;