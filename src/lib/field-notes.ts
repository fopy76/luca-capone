// Single source of truth for the /field-notes section: slugs, titles,
// descriptions, and dates. Consumed by the note pages, the /field-notes
// index, the homepage FieldNotesSection teaser, sitemap.ts, the llms.txt
// route, and each note's Article JSON-LD.
// The prose itself lives in each page component; facts inside the prose
// follow the same canon as src/lib/site.ts.
//
// Bump dateModified (and dateModifiedDisplay) whenever a note's content
// changes — it feeds the sitemap and the Article schema.

import { AGE } from "./site"

export type FieldNote = {
  slug: string
  // H1 and metadata title (the "%s | Luca Capone" template appends the name).
  title: string
  // Meta description, index-card blurb, and Article schema description.
  description: string
  datePublished: string
  dateModified: string
  dateModifiedDisplay: string
}

export const FIELD_NOTES: FieldNote[] = [
  {
    slug: "build-an-app-without-coding",
    title: "Can a non-technical person really build an app with AI?",
    description:
      "A straight answer from someone doing it: six products shipped since March 2025 with zero CS background. What AI actually handles, what stays on your plate, and how to start.",
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    dateModifiedDisplay: "August 17, 2026",
  },
  {
    slug: "what-is-vibe-coding",
    title: "What is vibe coding?",
    description:
      "Vibe coding explained by someone who ships with it every night: the loop, the tools, what it is not, and where it breaks.",
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    dateModifiedDisplay: "August 17, 2026",
  },
  {
    slug: "too-old-to-learn-to-code",
    title: `Is ${AGE} too old to learn to code?`,
    description:
      "I started at 49 with no CS background and shipped my first product within months. What age costs, what it buys you, and why the real barrier isn't ability.",
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    dateModifiedDisplay: "August 17, 2026",
  },
  {
    slug: "how-long-does-it-take-to-build-an-app-with-ai",
    title: "How long does it take to build an app with AI?",
    description:
      "Where the time goes when you build with AI: what a working version takes, why the last 20 percent eats the calendar, and what the app-in-a-day claims leave out.",
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    dateModifiedDisplay: "August 17, 2026",
  },
  {
    slug: "build-a-side-project-with-a-full-time-job",
    title: "How to build a side project with a full-time job (and kids)",
    description:
      "The system behind six shipped products: fixed windows instead of stolen hours, ruthless scope, and consistency math that beats motivation.",
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    dateModifiedDisplay: "August 17, 2026",
  },
]

export function getNote(slug: string): FieldNote {
  const note = FIELD_NOTES.find((n) => n.slug === slug)
  if (!note) {
    throw new Error(`Unknown field note slug: ${slug}`)
  }
  return note
}
