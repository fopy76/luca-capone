# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Personal site for **Luca Capone** at **lucacapone.io** — brand: **Second-Act Builders**.
Positioning: 50-year-old non-technical founder (ex-Army Special Ops, UN security) who
started coding in March 2025 and ships AI products in life's margins. Newsletter:
Second-Act Builders on Substack (secondactbuilders.substack.com), every other Thursday.
Voice: honest, anti-guru, "no hustle-bro nonsense". Primary goal: newsletter signups.

⚠️ `docs/` (PRD, UX spec, architecture) describes a **dead earlier brand** ("The Build
Log", Poppins, blue/green, Next 14). It is historical reference only — never copy
branding, copy, or specs from it. The live site is the truth.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4
- framer-motion (below-fold reveals), lucide-react, @vercel/analytics
- Design: Space Grotesk headings, system-ui body, accent yellow `#FACF39`, ink `#1A1A1A`
- Deployed on Vercel. Routes: `/`, `/now`, `/field-notes` + 5 evergreen note
  pages (plus generated `/sitemap.xml`, `/robots.txt`, `/llms.txt`,
  `/manifest.webmanifest`, OG images).

## Source-of-truth rule (important)

**Every fact about Luca or the products lives in one place and is imported everywhere:**

- `src/lib/site.ts` — identity (PERSON), AGE, titles/descriptions, PRODUCTS (name,
  canonical tagline, status, URLs), PRODUCT_SUMMARY, CREDIBILITY_ITEMS, keywords,
  newsletter, schema @ids.
- `src/lib/faqs.tsx` — all FAQ content. `answerText` (plain text) feeds the FAQPage
  JSON-LD and `/llms.txt`; `answerNode` (JSX with links) feeds the visible accordion.
  **They must read identically.**
- `src/lib/now.ts` — the /now snapshot (bump `nowLastUpdated` on every edit).
- `src/lib/field-notes.ts` — /field-notes registry (slugs, titles, descriptions,
  dates; bump `dateModified` when a note's prose changes). Note prose lives in
  `src/app/field-notes/<slug>/page.tsx`; facts in prose follow site.ts canon.
  Voice: first person, concrete, anti-guru — never generic AI-sounding filler.

Consumers: page components, `GlobalSchema.tsx` (Person + WebSite, site-wide),
`HomeSchema.tsx` (ProfilePage + FAQPage + products + newsletter, homepage only),
`app/llms.txt/route.ts`, `app/manifest.ts`, `app/sitemap.ts`, `app/layout.tsx` metadata.

**Never hardcode a fact (age, product status, counts, URLs) in a component — import
it.** Schema and llms.txt must always match visible copy; search engines and AI
crawlers cross-check. Bump `AGE` in site.ts on Luca's birthday — everything derives.

## Canonical facts (as of 2026-08)

Six products: BurnoutRadar (launched), PairHabit (launched, App Store), Kikko
(launched, live on web), BizarreChat (beta), MemoPod (waitlist), Fatto (waitlist).
Started coding March 2025 at 49, with zero CS background. Based in Luxembourg and Rome.
Builds with Claude Code (primary) + Cursor; "vibe coding".

## SEO conventions

- Page-specific JSON-LD lives with its page, never in the root layout (FAQ/product
  markup must not render on pages where the content isn't visible).
- Hero and primary copy are server-rendered with real `<a href>` links; the hero
  entrance animation is CSS-only (`.hero-reveal`) — never gate copy behind JS state.
- OG/Twitter images come from the file-convention `opengraph-image.tsx` files — do not
  add manual `images` entries to metadata.
- `public/robots.txt` allowlists AI crawlers (GPTBot, ClaudeBot, PerplexityBot, …) —
  keep it that way.

## Commands

`npm run dev` (Turbopack) · `npm run build` · `npm run start` · `npm run lint`

## Quality bar

Lighthouse SEO 100 / Performance 90+, WCAG 2.1 AA, mobile-first, keyboard navigable.
Verify after SEO-relevant changes: build passes, `curl` the four generated routes, and
confirm every FAQPage answer and product tagline appears verbatim in the page HTML.
