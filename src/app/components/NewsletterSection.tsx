export default function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="py-20 bg-bg-subtle border-y border-border"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-grotesk text-3xl md:text-5xl font-bold text-text mb-4 tracking-tight">
          Second-Act Builders, weekly.
        </h2>
        <p className="text-base md:text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
          The messy middle of building AI products at 49. Real experiments, real numbers, no hustle-bro nonsense. Free forever.
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

        <p className="text-sm text-text-muted mt-6">
          Weekly field report. No spam. Unsubscribe in one click.
        </p>
      </div>
    </section>
  )
}
