// Single source of truth for FAQ content.
//
// answerText is the canonical plain-text answer, consumed by the FAQPage
// JSON-LD and llms.txt. answerNode is the same answer rendered with links for
// the on-page accordion (omit it when the answer has no links).
//
// RULE: answerText must read identically to answerNode. Schema and llms.txt
// must always match the visible copy — search engines and AI crawlers
// cross-check them, and mismatches cost trust and rich-result eligibility.
import type { ReactNode } from "react"
import { AGE, PRODUCTS } from "./site"

export type Faq = {
  question: string
  answerText: string
  answerNode?: ReactNode
}

// Card link for a product (App Store for PairHabit, website otherwise).
function productHref(name: string): string {
  const p = PRODUCTS.find((x) => x.name === name)
  return p ? (p.cardUrl ?? p.url) : "https://lucacapone.io"
}

function FaqLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover"
    >
      {children}
    </a>
  )
}

export const FAQS: Faq[] = [
  {
    question: "Who is Luca Capone?",
    answerText: `I'm a ${AGE}-year-old non-technical founder based in Luxembourg and Rome. 25+ years in international security, nine of them as a Captain in the Italian Army Special Operations Forces (Bosnia, Iraq, Afghanistan), then humanitarian security with the UN system across another ten countries. These days I run security programs for a European institution and ship AI products in life's margins. I write the Second-Act Builders newsletter on Substack, every other Thursday.`,
  },
  {
    question: "What does Second-Act Builders mean?",
    answerText:
      "It's about 40+ professionals building AI products alongside full-time careers and families. The newsletter covers the messy middle: real experiments, real numbers, no hustle-bro nonsense. Free forever.",
  },
  {
    question: "What products have you shipped?",
    answerText:
      "Six products so far. Launched: BurnoutRadar (10-dimension burnout assessment with AI recovery plans) and PairHabit (couples habit tracker). Live on web: Kikko (AI parenting assistant, iOS app in the works). In beta: BizarreChat (AI chat with celebrities and historical figures). On the waitlist: MemoPod (family memory preservation) and Fatto (next in the build-in-public cycle).",
    answerNode: (
      <>
        {"Six products so far. Launched: "}
        <FaqLink href={productHref("BurnoutRadar")}>BurnoutRadar</FaqLink>
        {" (10-dimension burnout assessment with AI recovery plans) and "}
        <FaqLink href={productHref("PairHabit")}>PairHabit</FaqLink>
        {" (couples habit tracker). Live on web: "}
        <FaqLink href={productHref("Kikko")}>Kikko</FaqLink>
        {" (AI parenting assistant, iOS app in the works). In beta: "}
        <FaqLink href={productHref("BizarreChat")}>BizarreChat</FaqLink>
        {" (AI chat with celebrities and historical figures). On the waitlist: "}
        <FaqLink href={productHref("MemoPod")}>MemoPod</FaqLink>
        {" and "}
        <FaqLink href={productHref("Fatto")}>Fatto</FaqLink>
        {"."}
      </>
    ),
  },
  {
    question: "When did you start coding?",
    answerText:
      "March 2025, at 49, with zero CS background. I opened Cursor for the first time because AI had finally made it possible for a non-technical person to ship real software.",
  },
  {
    question: "What tools do you use to build?",
    answerText:
      "Claude Code is my primary tool; Cursor shows up occasionally. For web: Next.js, Supabase, Vercel. For mobile: React Native for current apps, Swift/SwiftUI for new iOS-native builds. Stripe for payments. The approach is vibe coding: describe what you want, ship it, iterate.",
  },
  {
    question: "Where are you based?",
    answerText: "Luxembourg and Rome.",
  },
  {
    question: "Can a non-technical person really build an app with AI?",
    answerText:
      "Yes — I'm the proof, six times over. I started in March 2025 with zero CS background and have shipped BurnoutRadar, PairHabit, and Kikko, with more on the way. AI tools like Claude Code handle the syntax; you bring the judgment, taste, and stubbornness.",
    answerNode: (
      <>
        {"Yes — I'm the proof, six times over. I started in March 2025 with zero CS background and have shipped "}
        <FaqLink href={productHref("BurnoutRadar")}>BurnoutRadar</FaqLink>
        {", "}
        <FaqLink href={productHref("PairHabit")}>PairHabit</FaqLink>
        {", and "}
        <FaqLink href={productHref("Kikko")}>Kikko</FaqLink>
        {", with more on the way. AI tools like Claude Code handle the syntax; you bring the judgment, taste, and stubbornness."}
      </>
    ),
  },
  {
    question: "What is vibe coding?",
    answerText:
      "Vibe coding is building software by describing what you want in plain language and letting an AI coding tool like Claude Code write the actual code. You review, test, and steer instead of typing syntax. It's how I've shipped six products since March 2025 without a CS background.",
  },
  {
    question: `Is ${AGE} too old to learn to code or start building software?`,
    answerText:
      "No. I started at 49 and shipped my first product within months. Age brings domain knowledge, judgment, and follow-through — the things AI can't supply. The syntax, which used to take years to learn, is now the easy part. Starting late is an edge, not a handicap.",
  },
  {
    question: "How long does it take to build an app with AI?",
    answerText:
      "Weeks of evenings, not years — but not a weekend either. Working two hours on weeknights plus Saturday mornings, a real product takes me a few weeks to reach launch, and longer to polish. Anyone promising a serious app in a day is selling something.",
  },
  {
    question: "How do you find time to build with a full-time job and kids?",
    answerText:
      "Fixed windows, not stolen ones: 9 to 11 PM on weeknights, Saturday mornings when the house is quiet, and lunch breaks that aren't meetings. The margins are enough if you show up consistently — that's the whole premise of Second-Act Builders.",
  },
]
