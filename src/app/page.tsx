import HeroSection from './components/HeroSection'
import CredibilityStrip from './components/CredibilityStrip'
import AboutSection from './components/AboutSection'
import PortfolioSection from './components/PortfolioSection'
import NowSection from './components/NowSection'
import FAQSection from './components/FAQSection'
import NewsletterSection from './components/NewsletterSection'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomeSchema from './components/HomeSchema'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HomeSchema />
      <Navigation />
      <main>
        <HeroSection />
        <CredibilityStrip />
        <PortfolioSection />
        <AboutSection />
        <NowSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
