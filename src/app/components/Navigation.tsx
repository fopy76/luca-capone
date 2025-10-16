"use client"

import { useState, useEffect } from "react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      // Changed trigger to 100px as per spec
      setIsScrolled(window.scrollY > 100)
      
      // Active section detection
      const sections = ["hero", "products", "my-story", "connect"]
      let current = ""

      for (const section of sections) {
        const element = document.getElementById(section === "hero" ? "" : section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section
            break
          }
        }
      }
      
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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

      setIsMobileMenuOpen(false) // Close mobile menu after selection
    }
  }

  const menuItems = [
    { label: "Products", id: "products" },
    { label: "My Story", id: "my-story" },
    { label: "Newsletter", id: "connect" },
    { label: "Connect", id: "connect" }
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 shadow-lg backdrop-blur-md" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("")}
              className={`transition-all duration-300 ${
                isScrolled
                  ? "text-xl md:text-2xl text-foreground"
                  : "text-2xl md:text-3xl text-foreground"
              }`}
            >
              <span className="font-grotesk font-bold">Luca</span>
              <span className="font-grotesk font-normal ml-1">Capone</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 ${
                    isScrolled ? "text-foreground/70 hover:text-foreground" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("products")}
                className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
              >
                Explore Products
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-6 h-6 text-foreground"
              aria-label="Toggle menu"
            >
              {/* Hamburger icon */}
              <div className="absolute inset-0">
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-opacity duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-border">
            <div className="px-4 py-6 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 ${
                    activeSection === item.id ? "text-foreground bg-muted" : ""
                  }`}
                  style={{ minHeight: "44px" }} // Accessibility: 44px touch target
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("products")}
                className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg text-base font-semibold hover:bg-primary/90 transition-all duration-200"
                style={{ minHeight: "44px" }}
              >
                Explore Products
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  )
}
