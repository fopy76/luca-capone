import { AGE, PRODUCT_SUMMARY } from "@/lib/site"

// Server component on purpose: the hero carries the page's H1 and primary
// copy, so it must reach crawlers as plain, visible HTML with real anchor
// links. The entrance animation is pure CSS (.hero-reveal in globals.css).
export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[80vh] flex items-center justify-center bg-background scroll-mt-16"
    >
      <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <span
          className="hero-reveal inline-block px-3 py-1 rounded-full bg-accent-subtle text-on-accent text-xs font-semibold uppercase tracking-wider mb-6"
          style={{ animationDelay: "0.1s" }}
        >
          Second-Act Builders
        </span>

        <h1
          className="hero-reveal font-grotesk text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-text text-balance"
          style={{ animationDelay: "0.2s" }}
        >
          I&apos;m Luca Capone. I build AI products in the margins of a
          full-time job and two kids.
        </h1>

        <p
          className="hero-reveal text-lg md:text-xl mb-10 text-text-secondary max-w-xl mx-auto"
          style={{ animationDelay: "0.4s" }}
        >
          {AGE}, based in Luxembourg and Rome. Started coding in March 2025
          with zero CS background — everything since is vibe coded with Claude
          Code. {PRODUCT_SUMMARY}
        </p>

        <div
          className="hero-reveal flex flex-col sm:flex-row justify-center gap-4"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#newsletter"
            className="inline-flex items-center justify-center bg-accent text-on-accent font-semibold px-8 py-4 rounded-md text-base md:text-lg shadow-sm hover:bg-accent-hover hover:shadow-md motion-safe:hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
          >
            Get the field report
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center bg-background text-text border-2 border-accent font-semibold px-8 py-4 rounded-md text-base md:text-lg hover:bg-accent-subtle motion-safe:hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
          >
            See the products
          </a>
        </div>

        <p
          className="hero-reveal text-sm text-text-muted mt-6"
          style={{ animationDelay: "0.8s" }}
        >
          Field report every other Thursday. No spam. Unsubscribe in one click.
        </p>
      </div>
    </section>
  )
}
