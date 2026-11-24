import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import InkEffects from "../components/InkEffects"
import { CtaArrow, GoArrow } from "../components/ink"
import {
  nowBlocks,
  nowLastUpdated,
  nowLastUpdatedDisplay,
  type NowBlock,
  type NowItem,
} from "@/lib/now"
import { AGE, PERSON_ID, SITE_URL, TWITTER_HANDLE, WEBSITE_ID } from "@/lib/site"

export const metadata: Metadata = {
  // Absolute: the "%s | Luca Capone" template would say the name twice.
  title: { absolute: "Now: what Luca Capone is building, writing and learning" },
  description: `What Luca Capone, a non-technical founder building AI products at ${AGE}, is building, creating, and learning right now. A living snapshot, updated ${nowLastUpdatedDisplay}.`,
  keywords: [
    "now page",
    "what Luca Capone is doing now",
    "building AI products",
    "second-act builder",
    "Starvling",
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

// A small drawing beside two of the blocks. Decoration only (alt=""), and
// keyed by block id, so a block that disappears from now.ts takes its drawing
// with it. There are no handwritten notes on this page on purpose: its copy
// changes weekly and nothing would rewrite a note to match.
const BLOCK_DRAWINGS: Partial<
  Record<NowBlock["id"], { src: string; width: number; height: number; kind: string; sizes: string }>
> = {
  reading: {
    src: "/margins/doodles/notebook.webp",
    width: 510,
    height: 289,
    kind: "notebook",
    sizes: "(max-width: 1039px) 112px, 140px",
  },
  "open-to": {
    src: "/margins/doodles/envelope.webp",
    width: 375,
    height: 285,
    kind: "envelope",
    sizes: "(max-width: 1039px) 84px, 104px",
  },
}

// An entry's title: plain text, or a link with the arrow when now.ts gives it
// somewhere to go (a product, a profile, a page here, a mailto).
function EntryTitle({ item }: { item: NowItem }) {
  if (!item.href) return <>{item.title}</>
  if (item.href.startsWith("/")) {
    return (
      <Link href={item.href}>
        {item.title}
        <GoArrow />
      </Link>
    )
  }
  return (
    <a
      href={item.href}
      {...(item.external
        ? {
            target: "_blank",
            rel: item.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer",
          }
        : {})}
    >
      {item.title}
      <GoArrow />
    </a>
  )
}

export default function NowPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nowPageSchema) }}
      />
      <Navigation />
      <main id="main">
        <div className="leaf inner">
          <header className="grid page-head roomy">
            <div className="ml side-head hang" data-ink="">
              <h1>What I'm doing now</h1>
              <Image
                className="doodle boil d-side pins"
                src="/margins/doodles/pins.webp"
                alt=""
                width={465}
                height={210}
                sizes="(max-width: 1039px) 104px, 136px"
              />
            </div>
            <div className="tb">
              <p className="mono">
                Updated <time dateTime={nowLastUpdated}>{nowLastUpdatedDisplay}</time>{" "}
                · Luxembourg / Rome
              </p>
              <p className="standfirst">
                A living snapshot of what I'm building, creating, and learning
                right now, updated whenever my focus genuinely changes.
              </p>
            </div>
          </header>

          {nowBlocks.map((block) => {
            const drawing = BLOCK_DRAWINGS[block.id]
            return (
              <section
                key={block.id}
                aria-labelledby={`now-${block.id}`}
                className="sec tight"
              >
                <div className="grid">
                  <div className="ml side-head" data-ink="">
                    <h2 id={`now-${block.id}`} className="minor">
                      {block.heading}
                    </h2>
                    {drawing && (
                      <Image
                        className={`doodle boil d-side ${drawing.kind}`}
                        src={drawing.src}
                        alt=""
                        width={drawing.width}
                        height={drawing.height}
                        sizes={drawing.sizes}
                      />
                    )}
                  </div>
                  <div className="tb">
                    <ul className="entries">
                      {block.items.map((item) => (
                        <li key={item.title}>
                          <h3>
                            <EntryTitle item={item} />
                          </h3>
                          <p>{item.description}</p>
                        </li>
                      ))}
                    </ul>
                    {block.note && <p className="mono block-note">{block.note}</p>}
                  </div>
                </div>
              </section>
            )
          })}

          <section className="sec tight last">
            <div className="grid">
              <div className="tb">
                <p className="standfirst">
                  This is a{" "}
                  <a
                    href="https://nownownow.com/about"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    now page
                  </a>
                  . If you want the full story behind it, it lands in your inbox
                  every other Thursday.
                </p>
                <div className="acts">
                  <Link className="cta" href="/#newsletter">
                    {/* One span, so a narrow phone can wrap the label
                        without splitting the newsletter's name. */}
                    <span>
                      Subscribe to <span className="nb">Second-Act Builders</span>
                    </span>
                    <CtaArrow />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer inner />
      <InkEffects />
    </>
  )
}
