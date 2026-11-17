// Shared scaffolding for /field-notes pages: typography, the note layout with
// per-note Article + BreadcrumbList JSON-LD, the newsletter slip, and related
// links. Server components only: note prose must reach crawlers as plain
// HTML, never gated behind JS.
//
// A note is a reading page (see "a field note" in styles/margins.css). Its
// body is a flat run of <Lede>, <H2>, <P> and <UL>; the stylesheet puts each
// paragraph in the text block and hangs each H2 in the left margin beside the
// paragraph that follows it. Nothing in the body animates.
import type { ReactNode } from "react"
import Link from "next/link"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import InkEffects from "../components/InkEffects"
import { CtaArrow } from "../components/ink"
import { FIELD_NOTES, type FieldNote } from "@/lib/field-notes"
import { NEWSLETTER, PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/site"

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>
}

// Opening paragraph: the direct answer, set in the display face.
export function Lede({ children }: { children: ReactNode }) {
  return <p className="answer">{children}</p>
}

export function H2({ children }: { children: ReactNode }) {
  return <h2>{children}</h2>
}

export function UL({ children }: { children: ReactNode }) {
  return <ul>{children}</ul>
}

// A link inside the prose, in pen.
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
      className="pen"
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
        // The note's share image (its opengraph-image.tsx). The og:image tag
        // carries a build hash after it; the address serves the same file.
        image: `${url}/opengraph-image`,
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(noteSchema(note)) }}
      />
      <Navigation />
      <main id="main">
        <article className="leaf inner">
          <span className="read" aria-hidden="true" />
          <header className="grid page-head note-head">
            <nav aria-label="Breadcrumb" className="ml crumb">
              <Link href="/field-notes">← Field notes</Link>
            </nav>
            <div className="tb">
              <h1>{note.title}</h1>
              <p className="mono byline">
                By{" "}
                <Link href="/#my-story" rel="author">
                  Luca Capone
                </Link>{" "}
                · Updated{" "}
                <time dateTime={note.dateModified}>
                  {note.dateModifiedDisplay}
                </time>
              </p>
            </div>
          </header>

          <div className="note-body">{children}</div>

          <div className="grid note-slip-row">
            <div className="wide">
              <aside className="slip note-slip">
                <svg
                  className="scissors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="6" cy="7" r="2.6" />
                  <circle cx="6" cy="17" r="2.6" />
                  <path d="M8.2 8.4 20 17M8.2 15.6 20 7" />
                </svg>
                <h2>Get the field report</h2>
                <p>
                  Everything on this page comes from the build log, not theory.
                  The full version (real experiments, real numbers, no
                  hustle-bro nonsense) lands every other Thursday in{" "}
                  <NoteLink href={NEWSLETTER.url} external>
                    Second-Act Builders
                  </NoteLink>
                  . Free forever.
                </p>
                <div className="acts">
                  <a
                    className="cta"
                    href={NEWSLETTER.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subscribe on Substack
                    <CtaArrow />
                  </a>
                </div>
              </aside>
            </div>
          </div>

          <section className="note-body more">
            <h2>More field notes</h2>
            <ul className="reading">
              {related.map((n) => (
                <li key={n.slug}>
                  <Link href={`/field-notes/${n.slug}`}>
                    <span className="t">
                      <span>{n.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <Footer inner />
      <InkEffects />
    </>
  )
}
