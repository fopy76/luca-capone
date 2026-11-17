import HeroSection from './components/HeroSection'
import Plate from './components/Plate'
import AboutSection from './components/AboutSection'
import PortfolioSection from './components/PortfolioSection'
import NowSection from './components/NowSection'
import FieldNotesSection from './components/FieldNotesSection'
import FAQSection from './components/FAQSection'
import NewsletterSection from './components/NewsletterSection'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomeSchema from './components/HomeSchema'
import InkEffects from './components/InkEffects'

// The home page is one manuscript leaf (.leaf): a narrow text block between
// two hairlines, with the margins either side doing the talking. The layout
// and every reveal are in styles/margins.css.
//
// .late on <main> and on the colophon: two of the faces this page uses never
// show on its first screen at first paint. Upright Fraunces starts at the
// products, and the handwriting is either further down or fades in a second
// after load. Both are held back until that paint is on screen (see "Faces
// that can wait" in styles/margins.css).
export default function Home() {
  return (
    <>
      <HomeSchema />
      <Navigation />
      <main id="main" className="late">
        <div className="leaf">
          <span className="read" aria-hidden="true" />
          <HeroSection />
          <Plate />
          <PortfolioSection />
          <AboutSection />
          <NowSection />
          <FieldNotesSection />
          <FAQSection />
          <NewsletterSection />
        </div>
      </main>
      <Footer late />
      <InkEffects />
    </>
  )
}
