"use client"

import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[80vh] flex items-center justify-center bg-background"
    >
      <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <span
          className={`inline-block px-3 py-1 rounded-full bg-accent-subtle text-on-accent text-xs font-semibold uppercase tracking-wider mb-6 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          Second-Act Builders
        </span>

        <h1
          className={`font-grotesk text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-text text-balance transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          I build AI products in the margins of a full-time job and two kids.
        </h1>

        <p
          className={`text-lg md:text-xl mb-10 text-text-secondary max-w-xl mx-auto transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          I&apos;m Luca, 49. Started coding in March 2025 with zero CS background. Three products so far, and I send a field report every week.
        </p>

        <div
          className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <button
            onClick={() => scrollToSection("connect")}
            className="bg-accent text-on-accent font-semibold px-8 py-4 rounded-md text-base md:text-lg shadow-sm hover:bg-accent-hover hover:shadow-md motion-safe:hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
          >
            Get the weekly field report
          </button>
          <button
            onClick={() => scrollToSection("products")}
            className="bg-background text-text border-2 border-accent font-semibold px-8 py-4 rounded-md text-base md:text-lg hover:bg-accent-subtle motion-safe:hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
          >
            See the products
          </button>
        </div>

        <p
          className={`text-sm text-text-muted mt-6 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "0.8s" }}
        >
          Weekly field report. No spam. Unsubscribe in one click.
        </p>
      </div>
    </section>
  )
}
