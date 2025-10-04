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

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main headline with staggered animation */}
        <h1
          className={`font-grotesk text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground transition-all duration-700 ease-out ${
            isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          Building software with soul,<br />
          powered by curiosity.
        </h1>

        {/* Subheadline with animation */}
        <p
          className={`font-sans text-lg md:text-xl mb-12 text-muted-foreground max-w-4xl mx-auto transition-all duration-700 ease-out ${
            isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          I'm a Gen X father of two with no formal tech background, proving that anyone can learn to build meaningful products with today's AI tools. This is my journey.
        </p>

        {/* CTA Button with animation */}
        <div
          className={`flex justify-center transition-all duration-700 ease-out ${
            isLoaded
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <button
            onClick={scrollToPortfolio}
            className="bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-lg transform hover:scale-105 hover:bg-primary/90 shadow-md hover:shadow-xl"
          >
            See My Products
          </button>
        </div>

      </div>
    </section>
  )
}
