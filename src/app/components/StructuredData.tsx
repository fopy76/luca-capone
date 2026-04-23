const SITE_URL = "https://lucacapone.io"

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Luca Capone",
  "url": SITE_URL,
  "email": "hello@lucacapone.io",
  "jobTitle": "AI Product Builder & Founder",
  "description":
    "Luca Capone is a 49-year-old non-technical founder who started coding in March 2025 and ships AI products in life's margins. Creator of BurnoutRadar, PairHabit, and BizarreChat, with MemoPod, Kikko, and Fatto in the pipeline. Based in Luxembourg and Rome.",
  "address": [
    {
      "@type": "PostalAddress",
      "addressLocality": "Luxembourg",
      "addressCountry": "LU",
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "Rome",
      "addressCountry": "IT",
    },
  ],
  "knowsAbout": [
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
  "sameAs": [
    "https://x.com/LucaCaponeX",
    "https://www.linkedin.com/in/luca76/",
    "https://www.youtube.com/@LucaCaponeYT",
    "https://www.instagram.com/lucacapone.builds/",
    "https://www.reddit.com/user/LucaCapone/",
    "https://secondactbuilders.substack.com",
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Independent",
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Luca Capone - Second-Act Builders",
  "url": SITE_URL,
  "description":
    "I'm Luca, 49. Building AI products in life's margins with no CS background. Field reports, playbooks, and honest numbers for 40+ professionals.",
  "author": {
    "@type": "Person",
    "name": "Luca Capone",
    "url": SITE_URL,
  },
  "inLanguage": "en-US",
}

const productsSchema = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BurnoutRadar",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "description":
      "10-dimension burnout assessment with AI recovery plans. $19 one-time Pro.",
    "url": "https://www.burnoutradar.com",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "category": "Freemium",
    },
    "creator": {
      "@type": "Person",
      "name": "Luca Capone",
      "url": SITE_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PairHabit",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "iOS",
    "description":
      "Couples habit tracker with shared micro-habits and reward stakes.",
    "url": "https://www.pairhabit.app/",
    "offers": {
      "@type": "Offer",
      "category": "Mobile App",
    },
    "creator": {
      "@type": "Person",
      "name": "Luca Capone",
      "url": SITE_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BizarreChat",
    "applicationCategory": "EntertainmentApplication",
    "operatingSystem": "iOS",
    "description":
      "AI chat with celebrities and historical figures. Genuinely weird on purpose.",
    "url": "https://www.bizarrechat.app",
    "offers": {
      "@type": "Offer",
      "category": "Mobile App",
    },
    "creator": {
      "@type": "Person",
      "name": "Luca Capone",
      "url": SITE_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MemoPod",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web, iOS",
    "description":
      "Family memory preservation: voice, photo, video, text.",
    "url": "https://www.memopod.app/",
    "offers": {
      "@type": "Offer",
      "category": "Waitlist",
    },
    "creator": {
      "@type": "Person",
      "name": "Luca Capone",
      "url": SITE_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Kikko",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "iOS, Android",
    "description":
      "AI parenting assistant for schedules and school communication.",
    "url": "https://www.kikko.ai/",
    "offers": {
      "@type": "Offer",
      "category": "Waitlist",
    },
    "creator": {
      "@type": "Person",
      "name": "Luca Capone",
      "url": SITE_URL,
    },
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Luca Capone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Luca Capone is a 49-year-old non-technical founder based in Luxembourg and Rome. He spent 25+ years in international security, including nine years as a Captain in the Italian Army Special Operations Forces and humanitarian security roles with the UN system across four continents. He started coding in March 2025 and now ships AI products in the margins of a full-time job, writing the weekly Second-Act Builders newsletter on Substack.",
      },
    },
    {
      "@type": "Question",
      "name": "What does Second-Act Builders mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Second-Act Builders is about 40+ professionals building AI products alongside full-time careers and families. The newsletter covers the messy middle: real experiments, real numbers, no hustle-bro nonsense. Free forever.",
      },
    },
    {
      "@type": "Question",
      "name": "What products have you shipped?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Six products so far. Launched: BurnoutRadar (10-dimension burnout assessment with AI recovery plans). In beta: PairHabit (couples habit tracker) and BizarreChat (AI chat with celebrities and historical figures). On the waitlist: MemoPod (family memory preservation), Kikko (AI parenting assistant), and Fatto (next in the build-in-public cycle).",
      },
    },
    {
      "@type": "Question",
      "name": "When did you start coding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "March 2025, at 48, with zero CS background. Luca opened Cursor for the first time because AI had finally made it possible for a non-technical person to ship real software.",
      },
    },
    {
      "@type": "Question",
      "name": "What tools do you use to build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Claude Code is the primary tool, with Cursor occasionally. For web: Next.js, Supabase, and Vercel. For mobile: React Native for current apps and Swift/SwiftUI for new iOS-native builds. Stripe for payments. The approach is vibe coding: describe what you want, ship it, iterate.",
      },
    },
    {
      "@type": "Question",
      "name": "Where are you based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Luxembourg and Rome.",
      },
    },
  ],
}

const allSchemas = [personSchema, websiteSchema, ...productsSchema, faqSchema]

export default function StructuredData() {
  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
