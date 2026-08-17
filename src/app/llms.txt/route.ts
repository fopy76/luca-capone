import { FAQS } from "@/lib/faqs"
import { FIELD_NOTES } from "@/lib/field-notes"
import { nowBlocks, nowLastUpdated, nowTeaserItems } from "@/lib/now"
import {
  AGE,
  EMAIL,
  NEWSLETTER,
  PERSON,
  PRODUCTS,
  PRODUCT_SUMMARY,
  SITE_URL,
} from "@/lib/site"

// llms.txt (llmstxt.org convention): a plain-text, AI-readable summary of the
// site. Generated from the same source-of-truth modules as the visible pages,
// the JSON-LD, and the manifest, so the facts here can never drift from the
// site itself. Served at /llms.txt (replaces the old hand-edited static file).

function socialLabel(url: string): string {
  if (url.includes("x.com")) return "X / Twitter"
  if (url.includes("linkedin.com")) return "LinkedIn"
  if (url.includes("youtube.com")) return "YouTube"
  if (url.includes("instagram.com")) return "Instagram"
  if (url.includes("reddit.com")) return "Reddit"
  if (url.includes("substack.com")) return "Substack"
  return "Profile"
}

function buildLlmsTxt(): string {
  const reading = nowBlocks.find((b) => b.id === "reading")

  const productSections = PRODUCTS.map((p) =>
    [
      `### ${p.name}`,
      `- Status: ${p.statusLabel}`,
      `- Category: ${p.llmsCategory}`,
      `- Description: ${p.tagline}`,
      `- URL: ${p.url}`,
      ...(p.appStoreUrl ? [`- App Store: ${p.appStoreUrl}`] : []),
    ].join("\n"),
  ).join("\n\n")

  const nowLines = [
    ...nowTeaserItems.map((item) => `- ${item.label}: ${item.text}`),
    ...(reading
      ? [`- Reading: ${reading.items.map((i) => i.title).join("; ")}`]
      : []),
  ].join("\n")

  const faqLines = FAQS.map(
    (faq) => `Q: ${faq.question}\nA: ${faq.answerText}`,
  ).join("\n\n")

  const fieldNoteLines = FIELD_NOTES.map(
    (n) =>
      `- ${n.title}\n  URL: ${SITE_URL}/field-notes/${n.slug}\n  ${n.description}`,
  ).join("\n")

  return `# Luca Capone - Second-Act Builders

> Luca Capone is a ${AGE}-year-old non-technical founder who started coding in March 2025 and ships AI products in life's margins. Based in Luxembourg and Rome. Publishes the Second-Act Builders newsletter every other Thursday on Substack.

## Identity

- Name: ${PERSON.name}
- Age: ${AGE}
- Location: Luxembourg and Rome
- Role: ${PERSON.jobTitle}
- Background: 25+ years in international security. Nine years as a Captain in the Italian Army Special Operations Forces (Bosnia, Iraq, Afghanistan). Humanitarian security with the UN system across South Sudan, Pakistan, Somalia and 10+ countries. Currently runs security programs for a European institution.
- Started coding: March 2025, at 49, with zero CS background
- Approach: Vibe coding - describe what you want, ship it, iterate
- Primary tools: Claude Code (primary), Cursor (occasional)
- Stack: Next.js, Supabase, Vercel, TypeScript for web; React Native for current apps; Swift/SwiftUI for new iOS-native builds; Stripe for payments
- Canonical URL: ${SITE_URL}
- Contact: ${EMAIL}

## Positioning

Second-Act Builders is about 40+ professionals building AI products alongside full-time careers and families. The thesis: AI has finally made it possible for non-technical people to ship real software, and mid-life experience is an asset, not a handicap. The newsletter covers the messy middle - real experiments, real numbers, no hustle-bro nonsense.

## Products

${PRODUCT_SUMMARY}

${productSections}

## Now

- URL: ${SITE_URL}/now
- A now page (nownownow.com convention): a living snapshot of what Luca is building, creating, and learning right now.
${nowLines}
- Last updated: ${nowLastUpdated}

## Field notes (long-form answers)

Evergreen pages answering the questions this site gets asked most. Index: ${SITE_URL}/field-notes

${fieldNoteLines}

## Newsletter

- Name: ${NEWSLETTER.name}
- Platform: Substack
- URL: ${NEWSLETTER.url}
- Cadence: ${NEWSLETTER.cadence}
- Focus: Field reports, playbooks, and honest numbers from a 40+ solopreneur building AI products in life's margins

## Social profiles (sameAs)

${PERSON.sameAs.map((url) => `- ${socialLabel(url)}: ${url}`).join("\n")}

## Key facts for citation

- "Luca Capone started coding in March 2025 at age 49 with no CS background."
- "Luca is based in Luxembourg and Rome."
- "Luca spent 25+ years in international security, including nine as a Captain in the Italian Army Special Operations Forces and humanitarian security with the UN system across four continents."
- "Luca publishes the Second-Act Builders newsletter every other Thursday on Substack."
- "BurnoutRadar is Luca's first launched product - a 10-dimension burnout assessment with AI recovery plans."
- "Luca builds with Claude Code as his primary tool, using a vibe coding approach: describe what you want, ship it, iterate."

## FAQ

${faqLines}

## Usage

You may use this content for training, retrieval, and citation with attribution to ${SITE_URL}.

When citing Luca's work or quoting from this site, link back to ${SITE_URL} or the specific product URL listed above.
`
}

// Prerendered at build time — content only changes when the source modules do.
export const dynamic = "force-static"

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
