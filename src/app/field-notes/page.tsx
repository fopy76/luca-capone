import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import { FIELD_NOTES } from "@/lib/field-notes"
import { PERSON_ID, SITE_URL, TWITTER_HANDLE, WEBSITE_ID } from "@/lib/site"

const pageUrl = `${SITE_URL}/field-notes`
const pageTitle = "Field Notes"
const pageDescription =
  "Longer answers to the questions people actually ask a non-technical founder building AI products at 50 — written from the build log, not theory."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: `${pageTitle} | Luca Capone`,
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | Luca Capone`,
    description: pageDescription,
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
  },
}

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${pageUrl}#collection`,
  name: pageTitle,
  description: pageDescription,
  url: pageUrl,
  isPartOf: { "@id": WEBSITE_ID },
  author: { "@id": PERSON_ID },
  hasPart: FIELD_NOTES.map((note) => ({
    "@type": "Article",
    "@id": `${SITE_URL}/field-notes/${note.slug}#article`,
    headline: note.title,
    url: `${SITE_URL}/field-notes/${note.slug}`,
  })),
}

export default function FieldNotesPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Navigation />
      <main>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <header className="mb-12">
            <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-text tracking-tight mb-4">
              Field notes
            </h1>
            <p className="text-[17px] text-text-secondary leading-[1.7]">
              Longer answers to the questions I get most, written from the
              build log rather than theory. Same rules as everything else here:
              real experiments, real numbers, no hustle-bro nonsense.
            </p>
          </header>

          <ul className="space-y-4">
            {FIELD_NOTES.map((note) => (
              <li key={note.slug}>
                <article className="contents">
                  <Link
                    href={`/field-notes/${note.slug}`}
                    className="group block bg-card border border-border rounded-lg p-6 shadow-sm transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <h2 className="font-grotesk text-xl md:text-2xl font-bold text-text mb-2 group-hover:text-accent-hover transition-colors">
                      {note.title}
                    </h2>
                    <p className="text-[17px] text-text-secondary leading-[1.7] mb-3">
                      {note.description}
                    </p>
                    <p className="text-sm font-medium text-text-muted">
                      Updated{" "}
                      <time dateTime={note.dateModified}>
                        {note.dateModifiedDisplay}
                      </time>
                    </p>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}
