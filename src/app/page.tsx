import HeroSection from './components/HeroSection'
import CredibilityStrip from './components/CredibilityStrip'
import AboutSection from './components/AboutSection'
import PortfolioSection from './components/PortfolioSection'
import NewsletterSection from './components/NewsletterSection'
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
        <CredibilityStrip />
        <PortfolioSection />
        <AboutSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
