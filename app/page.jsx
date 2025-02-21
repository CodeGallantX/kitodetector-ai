import Header from "@/app/components/Header"
import Hero from "@/app/components/Hero"
import Pricing from "@/app/components/Pricing"
// import Features from "@/app/components/KeyFeatures"
import Footer from "@/app/components/Footer"

const App = () => {
    return (
        <div>
            <Header />
            <Hero />
            {/* <Features /> */}
            <Pricing />
            <Footer />
        </div>
    )
}

export default App;