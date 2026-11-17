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
  (kept for its preflight; the design itself is plain CSS, see "Design system")
- @vercel/analytics. No animation, icon or component library: motion is CSS
  plus a few small client components.
- Design: "Margins, Living Ink". A paper page with a narrow text block between
  two hairlines and handwritten notes in the margins. Fraunces (display),
  Newsreader (text), Caveat (handwriting), IBM Plex Mono (labels). Paper
  `#FBFAF7`, ink `#131729`, highlighter yellow `#FACF39`, red pencil `#C4281C`,
  blue pen `#1E3E9E`.
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

## Canonical facts (as of 2026-11)

Seven products: Starvling (launched 2026-09-08, closed 2026-09-22 when its kill
rule fired; starvling.com stays up; `site.ts` still counts it as launched and
carries the closing date and the numbers), BurnoutRadar (launched),
PairHabit (launched, App Store), Kikko (launched, on the App Store since
2026-09 and live on web — "AI family assistant"), BizarreChat (beta), MemoPod (waitlist),
Fatto (waitlist).
Started coding March 2025 at 49, with zero CS background. Based in Luxembourg and Rome.
Builds with Claude Code (primary) + Cursor; "vibe coding".

## SEO conventions

- Page-specific JSON-LD lives with its page, never in the root layout (FAQ/product
  markup must not render on pages where the content isn't visible).
- Hero and primary copy are server-rendered with real `<a href>` links. The hero
  entrance is CSS only and the headline is readable at first paint: it starts
  as pale pencil and is inked in, never from opacity 0. Never gate copy behind
  JS state (see the reveal rule under "Design system").
- OG/Twitter images come from the file-convention `opengraph-image.tsx` files — do not
  add manual `images` entries to metadata.
- A page that states its own `openGraph` in its metadata drops the image of the
  segment above it. That is why every field note has its own
  `opengraph-image.tsx` (see "Share images").
- `public/robots.txt` allowlists AI crawlers (GPTBot, ClaudeBot, PerplexityBot, …) —
  keep it that way.

## Design system (Margins, Living Ink)

Where things live:

- `src/app/styles/margins.css` is the whole design: tokens, type, the three
  column leaf, every component, the other pages, reduced motion and focus. It
  is plain CSS, imported unlayered after Tailwind in `globals.css`, so it wins
  over the preflight. In this file a prefixed declaration goes before the
  standard one, because the CSS optimiser keeps only the last of a pair.
- `src/app/components/InkDefs.tsx` holds the SVG filters (`#rough`, `#boil1` to
  `#boil3`) and the few CSS rules that point at them. It renders once, from the
  root layout.
- `src/app/components/InkEffects.tsx` is the scroll reveal and the "boil" (the
  drawn layer is retraced about six times a second and rests while the page
  scrolls). Mount it once on any page that uses `data-ink`.
- `src/app/components/ink.tsx` has the shared pieces: `Hand` and `Written`
  (handwriting), `MarginArrow`, `CtaArrow`, `GoArrow`. The two short date
  formats (`stampDate`, `shortDate`) are in `src/lib/dates.ts`.
- `Plate.tsx` is the moving drawing (fig. 2), `LiveClock.tsx` the two time
  dependent pieces of the hero, `SubstackEmbed.tsx` the signup form.
- Drawings are in `public/margins/`: `marks/` (one per product), `doodles/`,
  the plate poster and its two video loops. They are AI generated and the
  footer says so.
- Fonts are declared in `src/app/layout.tsx`. Three of the files are in
  `src/app/fonts/`. See "Fonts" below before touching either.

Rules:

- Copy is never hidden by default. The server sends every word and every
  drawing in its final, visible state. `.ink-wait` (the "not drawn yet" state)
  is added by `InkEffects` after hydration, and only to elements still below
  the viewport. First screen entrances are CSS animations and need no script.
  The headline, the paragraph under it and the links start visible (pale) and
  are inked in. The hero margin notes and the live clock line are the
  exception: they fade in from nothing about a second and a half after load.
  Never add a rule that hides copy until a script runs.
- Words that animate one by one (the headline, every handwritten note) are
  inline blocks, and VoiceOver stops on each inline block. So they are hidden
  from screen readers and the sentence is given once, whole. `Written` does
  this itself with a visually hidden copy of its text. The hero `<h1>` does it
  with `aria-label`, which means the headline is typed twice in
  `HeroSection.tsx` (`HEADLINE` and the words): change both together.
- A product's status wording comes from `productStatus()` and
  `productClosed()` in `site.ts`. The home page stamps use them and so does
  `llms.txt`, so what is stamped is what is listed.
- The home page uses the narrow text block (`.leaf`). Every other page uses the
  wider reading block (`.leaf.inner`) and passes `inner` to `<Footer />`. Every
  page has `<main id="main">`, the target of the skip link.
- Italic display type uses `--f-display-i` and upright display type uses
  `--f-display`. They are two separate families cut from Fraunces, and neither
  has the other's style. A rule that sets `font-style: italic` on display type
  must also set the family, or the browser slants the upright face itself.
- Images go through `next/image` with real `width` and `height` and a `sizes`
  that matches the slot (its CSS width at each breakpoint). Decorative drawings
  get `alt=""`. `next.config.ts` adds the widths 160 and 192 to Next's list,
  so a small drawing on a 2x or 3x phone does not jump from 128 to 256.
- Product margin notes (`note` in `PRODUCTS`) must stay true when `/now`
  changes. Say what the product is or what already happened, never what this
  week is for. Nothing regenerates them.
- There are no handwritten notes on `/now`. Its copy changes weekly.
- The weeknight build window lives in `site.ts` (`DAY_PLAN`, `MARGIN_HOURS`,
  `MARGIN_OPENS`). The planner, the plate caption, the margin notes and the
  live line in the hero all derive from it. Three places still type "9 to 11
  PM" by hand and have to be changed with it: the My Story paragraph in
  `AboutSection.tsx`, the "How do you find time" answer in `faqs.tsx` (which
  is also the FAQ schema), and the field note prose.
- The handwritten note beside the home Now teaser must stay evergreen too.
  The teaser is rewritten weekly and nothing rewrites the note.
- The circled labels on the home Now teaser come from `nowTeaserItems` and may
  be any wording or length.

Fonts:

- Font bytes decide the Lighthouse score here. This was measured on a local
  production build (`npm run build`, `npm run start`, Lighthouse 12, mobile):
  its simulated phone counts every file that finishes before the first paint
  against LCP, at about 7 ms per KB, whether or not that paint needed it. So
  each file carries only what the design uses, and they load in three stages.
  In November 2026 every page type scored 92 for performance that way, with
  LCP near 3.4 s, and performance falls under 90 at about 3.7 s. One more font
  file in front of the first paint is enough to lose it, so measure again
  after touching fonts. (The old design, one font file, scored 93 on the home
  page and 98 on the others in the same test.)
- Preloaded on every page: Fraunces italic, Newsreader and IBM Plex Mono
  regular, the faces of every headline, paragraph and label. `/now` and the
  field notes also show upright Fraunces on their first screen (entry names,
  the opening paragraph of a note). It is not preloaded, so on a first visit
  those lines appear in the stand in and then swap.
- Loaded when a page first lays out text in them: Fraunces upright and IBM
  Plex Mono medium.
- Never preloaded: Caveat. On the home page it and Fraunces upright are held
  back, because there they only show below the first screen or fade in a
  second after load. Inside `.late` (the home `<main>` and its colophon) text
  in those two faces is set in a resized local font until the first paint is
  on screen. Then `FACES_AFTER_PAINT` in `layout.tsx` puts `.faces` on
  `<html>` and both files load. The CSS is under "Faces that can wait" in
  `margins.css`, with its own release after three seconds. Nothing is held
  without JavaScript, under reduced motion or in print. Never put `.late`
  around text in either face that is visible on a first screen at load.
- `src/app/fonts/` holds three files cut from Google's latin files with
  fonttools. Same glyphs and same outlines, less of the design space:
  `fraunces-italic-latin.woff2` has optical size 9 to 144 and weight 320 to
  500. `fraunces-latin.woff2` has optical size 9 to 144 and weight 300 to 500.
  `newsreader-latin.woff2` has optical size 6 to 19.2 and weight 400 to 700,
  upright only. A weight or a size outside those ranges is clamped without
  any warning, so widen the file before using one. Letters outside Google's
  latin set (Polish, Czech, Turkish and Vietnamese ones, for example) fall
  back to the system serif in these three faces.
- To rebuild a file, start from the latin woff2 that `next/font/google`
  downloads for the family with `axes: ["opsz"]` and run fonttools on it:
  `fonttools varLib.instancer in.woff2 opsz=6:18:19.2 wght=400:400:700 -o
  newsreader-latin.woff2`. The italic takes `opsz=9:144:144 wght=320:320:500`
  and the upright takes `wght=300:300:500`. The middle number is where the
  file rests. next/font sizes the stand in face from that instance, which is
  why the italic rests at its display cut (the headline) and Newsreader at 18
  (the paragraph under it).
- `src/app/fonts/og/` holds seven TTF files that only the share images use
  (see "Share images"). The image renderer rejects woff2 and does not
  understand variable fonts, so these are fixed cuts of the same fonts, made
  with fonttools in two steps: `fonttools varLib.instancer in.woff2 opsz=144
  wght=340 -o cut.woff2`, then `fonttools ttLib.woff2 decompress cut.woff2 -o
  fraunces-italic-display.ttf`. Four come from the files beside them:
  `fraunces-italic-display.ttf` (opsz 144, wght 340, the headlines),
  `fraunces-italic-text.ttf` (opsz 30, wght 420), `fraunces-upright.ttf`
  (opsz 36, wght 420) and `newsreader.ttf` (opsz 19.2, wght 400). Three come
  from the latin woff2 files `next/font/google` leaves in
  `.next/static/media/` after a build: `caveat.ttf` (wght 500), and
  `plex-mono-regular.ttf` and `plex-mono-medium.ttf`, which are only
  decompressed. None of them is sent to a browser, so they cost nothing in
  Lighthouse. The four licences are the `OFL-*.txt` files in
  `src/app/fonts/`.
- IBM Plex Mono is used without the stand in next/font generates for it
  (`--font-plex-mono-face`). A system monospace has the same advance width
  and matches it better. Its two weights are two `IBM_Plex_Mono` calls that
  Turbopack gives one family name, which is what lets `font-weight: 500` find
  the medium file. If the bundler ever changes, check the built CSS for two
  `@font-face` blocks named `IBM Plex Mono`.

To add a product: add it to `PRODUCTS` in `site.ts` with a `mark`
(`{ src, width, height }`). Put the drawing in `public/margins/marks/` as a
transparent WebP about 440px on its long side, drawn in the same pen as the
others. Optionally give it one evergreen `note`. The home page row, the schema,
`llms.txt` and the counts follow from the list. A product that was closed in
public can also carry `launchedOn`, `closedOn` and a `postmortem`.

To add a field note: add its entry to `FIELD_NOTES` in `field-notes.ts`
(with its `highlight`), create `src/app/field-notes/<slug>/page.tsx` like its
siblings, and copy a sibling's `opengraph-image.tsx` into the folder with the
new slug. The index, the home page teaser, the sitemap, `llms.txt` and the
share image follow from the entry.

## Share images

The Open Graph and Twitter cards are drawn in the Margins look by `next/og`,
at build time, 1200 by 630 px. There is one `opengraph-image.tsx` per page:
home, `/now`, `/field-notes`, and one in each note folder.

- `src/app/og/kit.tsx` has the shared pieces (the paper and its hairlines,
  mono labels, the swipe, handwriting, pen strokes, the stamp, the running
  head) and `render()`. `src/app/og/headline.tsx` sets a headline with a
  swipe in it, line by line. `src/app/og/note.tsx` draws the card of a field
  note.
- Each card is the first screen of its page in small, and reads its words
  from the files the page reads: `site.ts`, `now.ts`, `field-notes.ts`. The
  one exception is the home card, which types the hero sentence a third time
  (`PHRASES` in `src/app/opengraph-image.tsx`): change it with the two in
  `HeroSection.tsx`. The `/now` card redraws itself from `now.ts` (the date,
  the first one-liner, the names in the first block), so look at it after an
  update that changes the shape of either.
- `next/og` is not a browser. It lays out with flexbox and absolute
  positions only, it needs `display: flex` on any box with more than one
  child, and it stops on a style whose value is `undefined`. It takes TTF,
  OTF or WOFF fonts, one fixed style per file. So the cards have their own
  font files in `src/app/fonts/og/` (see "Fonts") and none of
  `styles/margins.css` applies to them.
- No em dash or en dash is drawn on a card. The copy has none, and as a net
  under that, `render()` sets one that slips through as a comma, or as "to"
  between two numbers (never as a hyphen). There is no handwriting on the
  `/now` card, for the same reason as on the page. Nothing that matters goes in the bottom left corner,
  where X lays the site's address over a shared image.
- A field note's card needs two things. `highlight` in its entry in
  `field-notes.ts`: the words the swipe goes over, which must be in the title
  as written or the build stops. And an `opengraph-image.tsx` in its folder:
  copy a sibling's and change the slug. Without that file the note is shared
  with no image at all.
- A card's address is its page's address plus `/opengraph-image`. The
  `og:image` and `twitter:image` tags add `?` and 16 characters after it: a
  hash Next makes from the `opengraph-image.tsx` file itself, not from the
  picture, so it stays the same when only the words on the card change. The
  address answers with or without it. Each note's Article schema
  (`noteSchema()` in `note-components.tsx`) names the address without it.
- To look at a card, run `npm run dev` and open `/opengraph-image`,
  `/now/opengraph-image`, `/field-notes/opengraph-image` or
  `/field-notes/<slug>/opengraph-image`. After an edit in `src/app/og/`, load
  it twice: the first answer can still be the old drawing.
- To check every page at once: `node scripts/check-share-images.mjs` asks the
  live site, and `node scripts/check-share-images.mjs http://localhost:3000`
  asks a local `npm run build` and `npm run start`. It reads the pages from
  `/sitemap.xml` and wants, on each, one `og:image` and one `twitter:image`
  with width, height, type and alt text, an absolute address that answers
  200 with no redirect as a 1200 by 630 PNG, and on a note the same image in
  the Article schema. Run it after anything that touches metadata, and after
  adding a page.

## Commands

`npm run dev` (Turbopack) · `npm run build` · `npm run start` · `npm run lint`

## Quality bar

Lighthouse SEO 100 / Performance 90+, WCAG 2.1 AA, mobile-first, keyboard navigable.
Verify after SEO-relevant changes: build passes, `curl` the four generated routes, and
confirm every FAQPage answer and product tagline appears verbatim in the page HTML.
