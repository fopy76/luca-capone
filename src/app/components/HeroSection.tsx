"use client"

import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 64 // Height of fixed navigation
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const scrollToPortfolio = () => scrollToSection("products")
  const scrollToNewsletter = () => scrollToSection("newsletter")

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center" style={{backgroundColor: "#2563EB"}}>
      <div className="text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main headline with staggered animation */}
        <h1 
          className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-700 ease-out ${
            isLoaded 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          Gen X. Non-technical.<br />
          Building & shipping AI<br />
          products anyway.
        </h1>

        {/* Subheadline with animation */}
        <p 
          className={`text-lg md:text-xl mb-12 text-blue-100 max-w-4xl mx-auto transition-all duration-700 ease-out ${
            isLoaded 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          Proving that age and technical skills are no longer barriers to building in the AI era
        </p>

        {/* CTA Buttons with animation */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ease-out ${
            isLoaded 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <button
            onClick={scrollToNewsletter}
            className="text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-lg transform hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "#4CAF50" }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = "#388E3C"}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = "#4CAF50"}
          >
            Join the Build Log
          </button>

          <button
            onClick={scrollToPortfolio}
            className="text-white font-medium flex items-center gap-2 transition-colors duration-200 text-lg"
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#4CAF50"}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = "white"}
          >
            See What I&apos;m Building ↓
          </button>
        </div>

      </div>
    </section>
  )
}
