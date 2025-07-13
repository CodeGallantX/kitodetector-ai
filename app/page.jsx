import Preloader from "@/app/components/ui/Preloader"
import ScrollToTop from "@/app/components/ui/ScrollToTop"
import Header from "@/app/components/landing/Header"
import Hero from "@/app/components/landing/Hero"
import Features from "@/app/components/landing/Features"
import Pricing from "@/app/components/landing/Pricing"
import FAQ from "@/app/components/landing/FAQs"
import HelpCentre from "@/app/components/landing/HelpCentre"
import Footer from "@/app/components/landing/Footer"
const App = () => {
    return (
        <Preloader>
            <Header />
            <Hero />
            <Features />
            <Pricing />
            <FAQ />
            <ScrollToTop />
            <HelpCentre />
            <Footer />
        </Preloader>
    )
}

export default App;