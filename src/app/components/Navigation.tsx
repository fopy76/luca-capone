"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Two kinds of nav items: "section" scrolls to an anchor on the home page
// (falling back to a /#id link on other routes), "route" links to a page.
type MenuItem =
  | { kind: "section"; label: string; id: string }
  | { kind: "route"; label: string; href: string }

const menuItems: MenuItem[] = [
  { kind: "section", label: "Products", id: "products" },
  { kind: "section", label: "My Story", id: "my-story" },
  { kind: "route", label: "Now", href: "/now" },
  { kind: "section", label: "FAQ", id: "faq" },
  { kind: "section", label: "Newsletter", id: "newsletter" },
]

const activeTrackedSections = ["hero", "products", "my-story", "faq", "newsletter"]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      if (!isHome) {
        setActiveSection("")
        return
      }

      let current = ""
      for (const section of activeTrackedSections) {
        const element = document.getElementById(section)
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

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHome])

  // Section links are plain <a href="#…"> anchors so crawlers see real,
  // followable links; CSS `scroll-behavior: smooth` + per-section
  // `scroll-mt-16` reproduce the old JS scrolling exactly.
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const menuItemClass = (isActive: boolean, variant: "desktop" | "mobile") =>
    variant === "desktop"
      ? `text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm px-1 py-1 ${
          isActive ? "text-text" : "text-text-secondary hover:text-text"
        }`
      : `block w-full text-left px-4 py-3 text-base font-medium rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          isActive
            ? "text-text bg-bg-subtle"
            : "text-text-secondary hover:text-text hover:bg-bg-subtle"
        }`

  const renderMenuItem = (item: MenuItem, variant: "desktop" | "mobile") => {
    if (item.kind === "route") {
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={closeMobileMenu}
          className={menuItemClass(pathname === item.href, variant)}
          style={variant === "mobile" ? { minHeight: "44px" } : undefined}
        >
          {item.label}
        </Link>
      )
    }
    if (isHome) {
      return (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={closeMobileMenu}
          className={menuItemClass(activeSection === item.id, variant)}
          style={variant === "mobile" ? { minHeight: "44px" } : undefined}
        >
          {item.label}
        </a>
      )
    }
    return (
      <Link
        key={item.id}
        href={`/#${item.id}`}
        onClick={closeMobileMenu}
        className={menuItemClass(false, variant)}
        style={variant === "mobile" ? { minHeight: "44px" } : undefined}
      >
        {item.label}
      </Link>
    )
  }

  const logoContent = (
    <>
      <span className="font-grotesk font-bold">Luca</span>
      <span className="font-grotesk font-normal ml-1">Capone</span>
    </>
  )
  const logoClass =
    "transition-all duration-300 text-xl md:text-2xl text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"

  const desktopSubscribeClass =
    "bg-accent text-on-accent px-5 py-2 rounded-md text-sm font-semibold hover:bg-accent-hover motion-safe:hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
  const mobileSubscribeClass =
    "w-full bg-accent text-on-accent px-4 py-3 rounded-md text-base font-semibold hover:bg-accent-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            {isHome ? (
              <a
                href="#hero"
                onClick={closeMobileMenu}
                className={logoClass}
                aria-label="Back to top"
              >
                {logoContent}
              </a>
            ) : (
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={logoClass}
                aria-label="Back to home"
              >
                {logoContent}
              </Link>
            )}
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => renderMenuItem(item, "desktop"))}
              {isHome ? (
                <a
                  href="#newsletter"
                  className={`${desktopSubscribeClass} inline-flex items-center justify-center`}
                >
                  Subscribe
                </a>
              ) : (
                <Link href="/#newsletter" className={desktopSubscribeClass}>
                  Subscribe
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-11 h-11 text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="absolute inset-0 m-auto w-6 h-6">
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

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-md border-t border-border">
            <div className="px-4 py-6 space-y-2">
              {menuItems.map((item) => renderMenuItem(item, "mobile"))}
              {isHome ? (
                <a
                  href="#newsletter"
                  onClick={closeMobileMenu}
                  className={`${mobileSubscribeClass} block text-center`}
                  style={{ minHeight: "44px" }}
                >
                  Subscribe
                </a>
              ) : (
                <Link
                  href="/#newsletter"
                  onClick={closeMobileMenu}
                  className={`${mobileSubscribeClass} block text-center`}
                  style={{ minHeight: "44px" }}
                >
                  Subscribe
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}
