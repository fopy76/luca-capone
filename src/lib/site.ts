// Single source of truth for site-wide facts: identity, titles, products,
// newsletter, social profiles. Every surface that states a fact (page copy,
// JSON-LD schema, llms.txt, manifest, sitemap, metadata) imports from here so
// the same fact can never drift across surfaces again.
//
// Plain data only (no JSX) so this file is importable from server components,
// client components, route handlers, and metadata files alike.
import { stampDate } from "./dates"

export const SITE_URL = "https://lucacapone.io"

// Bump on Luca's birthday: every age reference on the site derives from this.
export const AGE = 50

export const SITE_NAME = "Luca Capone - Second-Act Builders"
export const SITE_TITLE = `Luca Capone — Non-Technical Founder Building AI Products at ${AGE}`
export const SITE_DESCRIPTION = `I'm Luca, ${AGE}. Non-technical founder vibe coding AI products in life's margins. Seven products, honest numbers, built in public. Field report every other Thursday.`

export const TWITTER_HANDLE = "@LucaCaponeX"
export const EMAIL = "hello@lucacapone.io"

// Stable JSON-LD node identities, referenced across schema scripts so every
// page links back to the same Person and WebSite entities.
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const NEWSLETTER = {
  name: "Second-Act Builders",
  url: "https://secondactbuilders.substack.com",
  cadence: "Every other Thursday",
} as const

export const KEYWORDS = [
  "Second-Act Builders",
  "Second-Act Builders newsletter",
  "AI builder",
  "non-technical founder",
  "AI products",
  "vibe coding",
  "second-act career",
  "building with AI",
  "Claude Code",
  "Gen X founder",
  "solopreneur AI",
  `started coding at ${AGE}`,
  "build an app without coding",
  "AI side projects",
  "Starvling",
  "BurnoutRadar",
  "PairHabit",
  "BizarreChat",
  "MemoPod",
  "Kikko",
  "Fatto",
]

export const PERSON = {
  name: "Luca Capone",
  givenName: "Luca",
  familyName: "Capone",
  jobTitle: "AI Product Builder & Founder",
  email: EMAIL,
  imagePath: "/images/luca-profile.jpg",
  nationality: "Italy",
  knowsLanguage: ["it", "en"],
  description: `Luca Capone is a ${AGE}-year-old non-technical founder who started coding in March 2025 and ships AI products in life's margins. Creator of Starvling, BurnoutRadar, PairHabit, Kikko, and BizarreChat, with MemoPod and Fatto in the pipeline. Based in Luxembourg and Rome.`,
  // Distinguishes this Luca Capone from unrelated academics with the same name.
  disambiguatingDescription:
    "Italian non-technical founder and second-act builder, a former Italian Army Special Operations captain and UN humanitarian security professional who started coding in March 2025 at 49 and builds AI products with Claude Code.",
  addresses: [
    { locality: "Luxembourg", country: "LU" },
    { locality: "Rome", country: "IT" },
  ],
  knowsAbout: [
    "AI Product Development",
    "No-Code Development",
    "AI-First Development",
    "Entrepreneurship",
    "Product Management",
    "SaaS Development",
    "AI Tools",
    "Claude Code",
    "Vibe Coding",
    "Build in Public",
    "Generative AI",
  ],
  sameAs: [
    "https://x.com/LucaCaponeX",
    "https://www.linkedin.com/in/luca76/",
    "https://www.youtube.com/@LucaCaponeYT",
    "https://www.instagram.com/lucacapone.builds/",
    "https://www.reddit.com/user/LucaCapone/",
    "https://secondactbuilders.substack.com",
  ],
} as const

export type ProductStatus = "launched" | "beta" | "waitlist"

// The one-pen drawing shown beside a product's name on the home page.
export type ProductMark = {
  // Path under /public (the drawings live in /margins/marks/).
  src: string
  // Intrinsic pixel size of the file. next/image needs it and the drawings
  // are not square.
  width: number
  height: number
}

// What happened to a product that was closed in public. Every figure here is
// a dated, permanent fact, so it lives beside the product instead of in the
// /now snapshot, which is rewritten weekly.
export type ProductPostmortem = {
  // Pencilled under the call to action.
  aside: string
  // Red margin note beside the status stamps.
  verdict: string
  // The numbers the kill rule was judged on, in display order.
  stats: { value: string; label: string }[]
  // Red note under the numbers.
  aftermath: string
}

export type Product = {
  name: string
  // The one canonical one-liner: portfolio card, JSON-LD description, and
  // llms.txt all render this exact string.
  tagline: string
  status: ProductStatus
  statusLabel: string
  features: string[]
  ctaText: string
  // Canonical product URL (JSON-LD url, llms.txt URL line).
  url: string
  // Where the portfolio card links, when different from the canonical URL.
  cardUrl?: string
  appStoreUrl?: string
  applicationCategory: string
  operatingSystem: string
  offerCategory: string
  offerPrice?: string
  offerPriceCurrency?: string
  // Human-readable category line for llms.txt.
  llmsCategory: string
  mark: ProductMark
  // One handwritten margin note beside the status stamp. Keep it evergreen:
  // nothing regenerates it, so it must stay true when /now changes. Say what
  // the product is or what already happened, never what "this stretch" is for.
  note?: string
  // ISO dates. When present they are printed on the status stamps.
  launchedOn?: string
  closedOn?: string
  postmortem?: ProductPostmortem
}

export const PRODUCTS: Product[] = [
  {
    name: "Starvling",
    tagline:
      "A launch directory where every product is a pixel creature kept alive by real people's daily feeds, or it starves into a public graveyard. Rank can't be bought.",
    status: "launched",
    statusLabel: "Launched",
    features: ["Web", "For makers"],
    ctaText: "See who's still alive",
    url: "https://starvling.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offerCategory: "Free",
    llmsCategory: "Launch directory (Web)",
    mark: { src: "/margins/marks/starvling.webp", width: 440, height: 360 },
    launchedOn: "2026-09-08",
    closedOn: "2026-09-22",
    postmortem: {
      aside: "nobody. all fifteen starved. go look anyway.",
      verdict:
        "The kill rule fired. I wrote it before launch: a decision date and the numbers that would make me stop. So I stopped.",
      stats: [
        { value: "297", label: "feeds" },
        { value: "15", label: "listings, all starved by Sep 16" },
        { value: "0", label: "people who paid" },
      ],
      aftermath:
        "The site stays up: directory, graveyard, every tombstone. The failure got the same airtime the launch did.",
    },
  },
  {
    name: "BurnoutRadar",
    tagline:
      "10-dimension burnout assessment with AI recovery plans. $19 one-time Pro.",
    status: "launched",
    statusLabel: "Launched",
    features: ["Free + Pro", "AI-powered", "Instant"],
    ctaText: "Try it free",
    url: "https://www.burnoutradar.com",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offerCategory: "Freemium",
    offerPrice: "0",
    offerPriceCurrency: "USD",
    llmsCategory: "Health / Productivity (Web)",
    mark: { src: "/margins/marks/burnoutradar.webp", width: 419, height: 440 },
    note: "free to try. the result is instant.",
  },
  {
    name: "PairHabit",
    tagline: "Couples habit tracker with shared micro-habits and reward stakes.",
    status: "launched",
    statusLabel: "Launched",
    features: ["iOS", "For couples"],
    ctaText: "Get it on the App Store",
    url: "https://www.pairhabit.app/",
    cardUrl: "https://apps.apple.com/app/id6759855681",
    appStoreUrl: "https://apps.apple.com/app/id6759855681",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS",
    offerCategory: "Mobile App",
    llmsCategory: "Lifestyle (iOS)",
    mark: { src: "/margins/marks/pairhabit.webp", width: 348, height: 440 },
    note: "still the product I've launched the most.",
  },
  {
    name: "BizarreChat",
    tagline:
      "AI chat with celebrities and historical figures. Genuinely weird on purpose.",
    status: "beta",
    statusLabel: "Beta",
    features: ["iOS", "AI"],
    ctaText: "Try the beta",
    url: "https://www.bizarrechat.app",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "iOS",
    offerCategory: "Mobile App",
    llmsCategory: "Entertainment (iOS)",
    mark: { src: "/margins/marks/bizarrechat.webp", width: 440, height: 348 },
    note: "stet. the weird stays in.",
  },
  {
    name: "MemoPod",
    tagline: "Family memory preservation: voice, photo, video, text.",
    status: "waitlist",
    statusLabel: "Waitlist",
    features: ["Family"],
    ctaText: "See what's coming",
    url: "https://www.memopod.app/",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web, iOS",
    offerCategory: "Waitlist",
    llmsCategory: "Lifestyle (Web, iOS)",
    mark: { src: "/margins/marks/memopod.webp", width: 422, height: 440 },
    note: "not yet. it's on the way.",
  },
  {
    name: "Kikko",
    tagline:
      "AI family assistant for schedules and school communication. On the App Store and live on the web.",
    status: "launched",
    statusLabel: "Web + iOS",
    features: ["iOS", "Web", "Family"],
    ctaText: "Try Kikko",
    url: "https://www.kikko.ai/",
    appStoreUrl:
      "https://apps.apple.com/us/app/kikko-ai-family-assistant/id6789952071",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web, iOS",
    offerCategory: "Web & Mobile App",
    llmsCategory: "Lifestyle (Web, iOS)",
    mark: { src: "/margins/marks/kikko.webp", width: 440, height: 424 },
    note: "web since July. App Store since September.",
  },
  {
    name: "Fatto",
    tagline:
      "Landing page live, waitlist open. Next in the build-in-public cycle.",
    status: "waitlist",
    statusLabel: "Waitlist",
    features: ["Waitlist"],
    ctaText: "Join the waitlist",
    url: "https://getfatto.com",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offerCategory: "Waitlist",
    llmsCategory: "Lifestyle (Web)",
    mark: { src: "/margins/marks/fatto.webp", width: 440, height: 405 },
    note: "next up.",
  },
]

const STATUS_WORDS: Record<ProductStatus, string> = {
  launched: "Launched",
  beta: "Beta",
  waitlist: "Waitlist",
}

// A product's status in words: "Launched", "Launched · Web + iOS",
// "Launched 8 Sep 2026". The home page stamps exactly this and llms.txt
// lists it, so the two can't drift.
export function productStatus(product: Product): string {
  const word = STATUS_WORDS[product.status]
  const label =
    product.statusLabel === word ? word : `${word} · ${product.statusLabel}`
  return product.launchedOn ? `${label} ${stampDate(product.launchedOn)}` : label
}

// "Closed 22 Sep 2026" for a product that was closed in public, else null.
// Stamped beside the status on the home page and listed in llms.txt.
export function productClosed(product: Product): string | null {
  return product.closedOn ? `Closed ${stampDate(product.closedOn)}` : null
}

const launchedCount = PRODUCTS.filter((p) => p.status === "launched").length
const betaCount = PRODUCTS.filter((p) => p.status === "beta").length
const waitlistCount = PRODUCTS.filter((p) => p.status === "waitlist").length

// "Seven products: four launched, one in beta, two on the way." — the total
// and the per-status counts are all derived so they can never disagree with
// the PRODUCTS list above.
const countWords = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten",
]
// Small numbers as words ("seven"), so copy that counts something can derive
// the count instead of typing it.
export function countWord(n: number): string {
  return countWords[n] ?? String(n)
}
const totalWord = countWord(PRODUCTS.length)
export const PRODUCT_SUMMARY = `${totalWord.charAt(0).toUpperCase()}${totalWord.slice(1)} products: ${countWords[launchedCount]} launched, ${countWords[betaCount]} in beta, ${countWords[waitlistCount]} on the way.`

export const CREDIBILITY_ITEMS = [
  "Building since March 2025",
  `${launchedCount} launched, ${betaCount} in beta, ${waitlistCount} on the way`,
  "Shared openly on X, LinkedIn, Substack",
]

// The weeknight build window, on a 24-hour clock. Every "9 to 11 PM" on the
// home page (planner, plate caption, margin notes, the live line) derives
// from these two numbers.
const MARGIN_START = 21
const MARGIN_END = 23
const hour12 = (hour: number): number => (hour % 12 === 0 ? 12 : hour % 12)
// "9 to 11 PM"
export const MARGIN_HOURS = `${hour12(MARGIN_START)} to ${hour12(MARGIN_END)} PM`
// "9 PM"
export const MARGIN_OPENS = `${hour12(MARGIN_START)} PM`

// The day the home page planner draws (fig. 1), in decimal hours. The margin
// and the three windows are the facts (they match the My Story copy and the
// "How do you find time" FAQ); the job and kids bars are drawn roughly, with
// faded ends, and say only that those hours are taken.
export const DAY_PLAN = {
  firstHour: 7,
  lastHour: 23,
  // One time zone covers both cities.
  timeZone: "Europe/Luxembourg",
  job: { label: "full-time job", start: 8.2, end: 18.6 },
  kids: {
    label: "two kids",
    spans: [
      { start: 7, end: 8.5 },
      { start: 18.2, end: 20.9 },
    ],
  },
  margin: { label: "the margin", start: MARGIN_START, end: MARGIN_END },
  // Margin notes, placed beside the hours they are about. `bracket` draws a
  // brace over the span; without it an arrow points at the start.
  windows: [
    {
      note: "Saturday mornings, when the house is quiet.",
      start: 7.15,
      end: 10.3,
      bracket: true,
    },
    {
      note: "lunch breaks that aren't meetings.",
      start: 12.25,
      end: 14,
      bracket: true,
    },
    {
      note: `weeknights, ${MARGIN_HOURS}. This is where I build.`,
      start: MARGIN_START + 0.05,
      end: MARGIN_END,
      bracket: false,
    },
  ],
  // Whole-hour bounds the live line in the hero uses to say whose turn it is.
  clock: { jobStart: 8, jobEnd: 18, saturdayStart: 7, saturdayEnd: 12 },
} as const
