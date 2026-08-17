import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import {
  nowBlocks,
  nowLastUpdated,
  nowLastUpdatedDisplay,
} from "@/lib/now"
import { PERSON_ID, SITE_URL, TWITTER_HANDLE, WEBSITE_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: "Now",
  description: `What Luca Capone is building, creating, and learning right now. A living snapshot, updated ${nowLastUpdatedDisplay}.`,
  keywords: [
    "now page",
    "what Luca Capone is doing now",
    "building AI products",
    "second-act builder",
    "PairHabit",
    "Kikko",
  ],
  alternates: { canonical: `${SITE_URL}/now` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/now`,
    title: "What Luca Capone is doing now",
    description:
      "What Luca Capone is building, creating, and learning right now.",
  },
  // Explicit twitter block so /now gets its own card (title + per-route
  // twitter-image) instead of inheriting the homepage's wholesale.
  twitter: {
    card: "summary_large_image",
    title: "What Luca Capone is doing now",
    description:
      "What Luca Capone is building, creating, and learning right now.",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
  },
}

// ProfilePage schema for /now: gives search engines and AI crawlers an
// explicit freshness signal (dateModified) tied to the content file.
// mainEntity/isPartOf reference the canonical Person and WebSite nodes
// emitted site-wide by GlobalSchema.
const nowPageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "name": "What Luca Capone is doing now",
  "url": `${SITE_URL}/now`,
  "dateModified": nowLastUpdated,
  "description":
    "A living snapshot of what Luca Capone is building, creating, and learning right now.",
  "mainEntity": { "@id": PERSON_ID },
  "isPartOf": { "@id": WEBSITE_ID },
}

export default function NowPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nowPageSchema) }}
      />
      <Navigation />
      <main>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <header className="mb-14">
            <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-text tracking-tight mb-4">
              What I&apos;m doing now
            </h1>
            <p className="text-sm font-medium text-text-muted mb-6">
              Updated <time dateTime={nowLastUpdated}>{nowLastUpdatedDisplay}</time>{" "}
              · Luxembourg / Rome
            </p>
            <p className="text-[17px] text-text-secondary leading-[1.7]">
              A living snapshot of what I&apos;m building, creating, and
              learning right now — updated whenever my focus genuinely changes.
            </p>
          </header>

          {nowBlocks.map((block) => (
            <section
              key={block.id}
              aria-labelledby={`now-${block.id}`}
              className="border-t border-border pt-10 mb-12"
            >
              <h2
                id={`now-${block.id}`}
                className="font-grotesk text-2xl md:text-3xl font-bold text-text tracking-tight mb-6"
              >
                {block.heading}
              </h2>
              <ul className="space-y-6">
                {block.items.map((item) => (
                  <li key={item.title}>
                    <h3 className="font-grotesk text-lg font-bold text-text mb-1">
                      {item.href ? (
                        <a
                          href={item.href}
                          {...(item.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover transition-colors"
                        >
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </h3>
                    <p className="text-[17px] text-text-secondary leading-[1.7]">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="border-t border-border pt-10">
            <p className="text-[17px] text-text-secondary leading-[1.7] mb-8">
              This is a{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover"
              >
                now page
              </a>
              . If you want the full story behind it, it lands in your inbox
              every other Thursday.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 bg-accent text-on-accent font-semibold text-sm px-5 py-3 rounded-md hover:bg-accent-hover motion-safe:hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
            >
              Subscribe to Second-Act Builders
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
