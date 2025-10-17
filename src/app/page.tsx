import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import PortfolioSection from './components/PortfolioSection'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import StructuredData from './components/StructuredData'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData />
      <Navigation />
      <main>
        <HeroSection />
        <PortfolioSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
