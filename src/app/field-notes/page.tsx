import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import InkEffects from "../components/InkEffects"
import { Hand } from "../components/ink"
import { FIELD_NOTES, FIELD_NOTES_ASIDE } from "@/lib/field-notes"
import { AGE, PERSON_ID, SITE_URL, TWITTER_HANDLE, WEBSITE_ID } from "@/lib/site"

const pageUrl = `${SITE_URL}/field-notes`
const pageTitle = "Field Notes"
// The <title>. pageTitle stays the short name used on share cards and in the schema.
const documentTitle = "Field Notes: building AI products without a tech background"
const pageDescription = `Longer answers to the questions people actually ask a non-technical founder building AI products at ${AGE}, written from the build log, not theory.`

export const metadata: Metadata = {
  title: { absolute: documentTitle },
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Navigation />
      <main id="main">
        <div className="leaf inner">
          <div className="grid page-head sec last">
            <header className="ml side-head" data-ink="">
              <h1>Field notes</h1>
              <Hand text={FIELD_NOTES_ASIDE} />
              <Image
                className="doodle boil d-notebook"
                src="/margins/doodles/notebook.webp"
                alt=""
                width={510}
                height={289}
                sizes="(max-width: 1039px) 120px, 156px"
              />
            </header>
            <div className="tb">
              <p className="standfirst">
                Longer answers to the questions I get most, written from the
                build log rather than theory. Same rules as everything else here:
                real experiments, real numbers, no hustle-bro nonsense.
              </p>
              <ol className="notes-index">
                {FIELD_NOTES.map((note) => (
                  <li key={note.slug}>
                    <article>
                      <h2>
                        <Link href={`/field-notes/${note.slug}`}>
                          <span>{note.title}</span>
                        </Link>
                      </h2>
                      <p>{note.description}</p>
                      <p className="mono">
                        Updated{" "}
                        <time dateTime={note.dateModified}>
                          {note.dateModifiedDisplay}
                        </time>
                      </p>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
      {/* late: the colophon's lockup is the only upright Fraunces on this page, and on all but the tallest screens it is below the first one */}
      <Footer inner late />
      <InkEffects />
    </>
  )
}
