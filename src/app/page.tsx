import HeroSection from './components/HeroSection'
import DriveSection from './components/DriveSection'
import AboutSection from './components/AboutSection'
import PortfolioSection from './components/PortfolioSection'
import NewsletterSection from './components/NewsletterSection'
import SocialProofSection from './components/SocialProofSection'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <DriveSection />
        <AboutSection />
        <PortfolioSection />
        <SocialProofSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
