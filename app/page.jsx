import Preloader from "./components/Preloader"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Pricing from "./components/Pricing"
import FAQ from "./components/FAQs"
import HelpCentre from "./components/HelpCentre"
import ScrollToTop from "./components/ScrollToTop"
import Footer from "./components/Footer"

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