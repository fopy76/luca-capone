import { AGE, NEWSLETTER } from "@/lib/site"

export default function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="py-20 bg-bg-subtle border-y border-border scroll-mt-16"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-grotesk text-3xl md:text-5xl font-bold text-text mb-4 tracking-tight">
          Second-Act Builders, every other Thursday.
        </h2>
        <p className="text-base md:text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
          The messy middle of building AI products at {AGE}. Real experiments,
          real numbers, no hustle-bro nonsense. Free forever.
        </p>

        <div className="max-w-md mx-auto bg-background border border-border-strong rounded-lg shadow-sm p-4">
          <iframe
            src="https://secondactbuilders.substack.com/embed"
            width="100%"
            height="120"
            style={{
              border: "none",
              background: "transparent",
            }}
            frameBorder="0"
            scrolling="no"
            title="Subscribe to Second-Act Builders"
          />
        </div>

        {/* Crawlable fallback: the iframe is invisible to non-JS crawlers. */}
        <p className="text-sm text-text-secondary mt-4">
          Or subscribe directly on{" "}
          <a
            href={NEWSLETTER.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover"
          >
            Substack
          </a>
          .
        </p>

        <p className="text-sm text-text-muted mt-6">
          Field report every other Thursday. No spam. Unsubscribe in one click.
        </p>
      </div>
    </section>
  )
}
