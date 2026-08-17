import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 text-center">
          <p className="inline-block px-3 py-1 rounded-full bg-accent-subtle text-on-accent text-xs font-semibold uppercase tracking-wider mb-6">
            404
          </p>
          <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-text mb-4 tracking-tight">
            Page not found
          </h1>
          <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
            This page doesn&apos;t exist — or it shipped, broke, and got rolled
            back. Either way, the good stuff is a click away.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-accent text-on-accent font-semibold px-6 py-3 rounded-md text-base shadow-sm hover:bg-accent-hover hover:shadow-md motion-safe:hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
            >
              Back to the homepage
            </Link>
            <Link
              href="/now"
              className="inline-flex items-center justify-center bg-background text-text border-2 border-accent font-semibold px-6 py-3 rounded-md text-base hover:bg-accent-subtle motion-safe:hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
            >
              See what I&apos;m doing now
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
