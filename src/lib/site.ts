// Single source of truth for site-wide facts: identity, titles, products,
// newsletter, social profiles. Every surface that states a fact (page copy,
// JSON-LD schema, llms.txt, manifest, sitemap, metadata) imports from here so
// the same fact can never drift across surfaces again.
//
// Plain data only (no JSX) so this file is importable from server components,
// client components, route handlers, and metadata files alike.

export const SITE_URL = "https://lucacapone.io"

// Bump on Luca's birthday: every age reference on the site derives from this.
export const AGE = 50

export const SITE_NAME = "Luca Capone - Second-Act Builders"
export const SITE_TITLE = `Luca Capone — Non-Technical Founder Building AI Products at ${AGE}`
export const SITE_DESCRIPTION = `I'm Luca, ${AGE}. Non-technical founder vibe coding AI products in life's margins. Six products, honest numbers, built in public. Field report every other Thursday.`

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
  description: `Luca Capone is a ${AGE}-year-old non-technical founder who started coding in March 2025 and ships AI products in life's margins. Creator of BurnoutRadar, PairHabit, Kikko, and BizarreChat, with MemoPod and Fatto in the pipeline. Based in Luxembourg and Rome.`,
  // Distinguishes this Luca Capone from unrelated academics with the same name.
  disambiguatingDescription:
    "Italian non-technical founder and second-act builder — former Italian Army Special Operations captain and UN humanitarian security professional who started coding in March 2025 at 49 and builds AI products with Claude Code.",
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
  icon?: string
  iconInitial?: string
}

export const PRODUCTS: Product[] = [
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
    icon: "/images/burnoutradar_icon.png",
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
    iconInitial: "P",
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
    icon: "/images/bizarrechat_icon.png",
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
    iconInitial: "M",
  },
  {
    name: "Kikko",
    tagline:
      "AI parenting assistant for schedules and school communication. iOS app in the works.",
    status: "launched",
    statusLabel: "Live on Web",
    features: ["Web", "Family"],
    ctaText: "Try Kikko",
    url: "https://www.kikko.ai/",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offerCategory: "Web App",
    llmsCategory: "Lifestyle (Web; iOS in development)",
    icon: "/images/kikko_icon.png",
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
    iconInitial: "F",
  },
]

const launchedCount = PRODUCTS.filter((p) => p.status === "launched").length
const betaCount = PRODUCTS.filter((p) => p.status === "beta").length
const waitlistCount = PRODUCTS.filter((p) => p.status === "waitlist").length

// "Six products: three launched, one in beta, two on the way." — derived so
// the counts can never disagree with the PRODUCTS list above.
const countWords = ["zero", "one", "two", "three", "four", "five", "six"]
export const PRODUCT_SUMMARY = `Six products: ${countWords[launchedCount]} launched, ${countWords[betaCount]} in beta, ${countWords[waitlistCount]} on the way.`

export const CREDIBILITY_ITEMS = [
  "Building since March 2025",
  `${launchedCount} launched, ${betaCount} in beta, ${waitlistCount} on the way`,
  "Shared openly on X, LinkedIn, Substack",
]
