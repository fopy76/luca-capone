import HeroSection from './components/HeroSection'
import CredibilityStrip from './components/CredibilityStrip'
import AboutSection from './components/AboutSection'
import PortfolioSection from './components/PortfolioSection'
import FAQSection from './components/FAQSection'
import NewsletterSection from './components/NewsletterSection'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <CredibilityStrip />
        <PortfolioSection />
        <AboutSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
