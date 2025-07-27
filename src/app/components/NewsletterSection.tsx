"use client"

export default function NewsletterSection() {
  return (
    <section id="newsletter" className="py-20" style={{backgroundColor: "#2563EB"}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          The Build Log
        </h2>
        <p className="text-lg md:text-xl mb-8 text-blue-100">
          Raw, unfiltered updates from a Gen X founder building AI products
        </p>

        {/* Substack Embed - Minimal Height with Poppins Font */}
        <div className="max-w-md mx-auto mb-6">
          <iframe 
            src="https://thebuildlog.substack.com/embed" 
            width="100%" 
            height="120" 
            style={{
              border: "none",
              background: "transparent",
              borderRadius: "12px",
              fontFamily: "Poppins, sans-serif"
            }}
            frameBorder="0" 
            scrolling="no"
            title="Subscribe to The Build Log"
          />
        </div>

        <p className="text-sm text-blue-200">
          No spam, ever. Unsubscribe anytime. I respect your privacy and will only send valuable updates about the
          building journey.
        </p>
      </div>
    </section>
  )
}
