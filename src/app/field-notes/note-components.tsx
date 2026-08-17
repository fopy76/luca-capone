// Shared scaffolding for /field-notes pages: typography, the note layout with
// per-note Article + BreadcrumbList JSON-LD, the newsletter CTA, and related
// links. Server components only — note prose must reach crawlers as plain
// HTML, never gated behind JS.
import type { ReactNode } from "react"
import Link from "next/link"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import { FIELD_NOTES, type FieldNote } from "@/lib/field-notes"
import { NEWSLETTER, PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/site"

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[17px] text-text-secondary leading-[1.7] mb-5">
      {children}
    </p>
  )
}

// Opening paragraph: the direct answer, visually weighted like the About lede.
export function Lede({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg md:text-xl font-medium text-text leading-snug mb-8">
      {children}
    </p>
  )
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-grotesk text-2xl md:text-3xl font-bold text-text tracking-tight mt-12 mb-5">
      {children}
    </h2>
  )
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc pl-5 space-y-3 mb-5 text-[17px] text-text-secondary leading-[1.7]">
      {children}
    </ul>
  )
}

export function NoteLink({
  href,
  children,
  external,
}: {
  href: string
  children: ReactNode
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover"
    >
      {children}
    </a>
  )
}

function noteSchema(note: FieldNote) {
  const url = `${SITE_URL}/field-notes/${note.slug}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: note.title,
        description: note.description,
        url,
        mainEntityOfPage: url,
        datePublished: note.datePublished,
        dateModified: note.dateModified,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Field notes",
            item: `${SITE_URL}/field-notes`,
          },
          { "@type": "ListItem", position: 3, name: note.title },
        ],
      },
    ],
  }
}

export function NoteLayout({
  note,
  children,
}: {
  note: FieldNote
  children: ReactNode
}) {
  const related = FIELD_NOTES.filter((n) => n.slug !== note.slug)

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(noteSchema(note)) }}
      />
      <Navigation />
      <main>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <header className="mb-10">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium">
              <Link
                href="/field-notes"
                className="text-text-muted hover:text-text transition-colors"
              >
                ← Field notes
              </Link>
            </nav>
            <h1 className="font-grotesk text-3xl md:text-5xl font-bold text-text tracking-tight text-balance mb-4">
              {note.title}
            </h1>
            <p className="text-sm font-medium text-text-muted">
              By Luca Capone · Updated{" "}
              <time dateTime={note.dateModified}>
                {note.dateModifiedDisplay}
              </time>
            </p>
          </header>

          {children}

          <aside className="mt-14 bg-bg-subtle border border-border rounded-lg p-6 md:p-8">
            <h2 className="font-grotesk text-xl md:text-2xl font-bold text-text tracking-tight mb-3">
              Get the field report
            </h2>
            <p className="text-[17px] text-text-secondary leading-[1.7] mb-5">
              Everything on this page comes from the build log, not theory. The
              full version — real experiments, real numbers, no hustle-bro
              nonsense — lands every other Thursday in{" "}
              <NoteLink href={NEWSLETTER.url} external>
                Second-Act Builders
              </NoteLink>
              . Free forever.
            </p>
            <a
              href={NEWSLETTER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-accent text-on-accent font-semibold text-sm px-5 py-3 rounded-md hover:bg-accent-hover motion-safe:hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
            >
              Subscribe on Substack
            </a>
          </aside>

          <section className="mt-14 border-t border-border pt-10">
            <h2 className="font-grotesk text-xl md:text-2xl font-bold text-text tracking-tight mb-5">
              More field notes
            </h2>
            <ul className="space-y-3">
              {related.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/field-notes/${n.slug}`}
                    className="text-[17px] font-medium text-text underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover"
                  >
                    {n.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}
