"use client"

import { motion } from "framer-motion"

type FAQ = {
  question: string
  answer: React.ReactNode
}

const faqs: FAQ[] = [
  {
    question: "Who is Luca Capone?",
    answer: (
      <>
        I&apos;m a 49-year-old non-technical founder based in Luxembourg and Rome. 25+ years in international security, nine of them as a Captain in the Italian Army Special Operations Forces (Bosnia, Iraq, Afghanistan), then humanitarian security with the UN system across another ten countries. These days I run security programs for a European institution and ship AI products in life&apos;s margins. I write the weekly Second-Act Builders newsletter on Substack.
      </>
    ),
  },
  {
    question: "What does Second-Act Builders mean?",
    answer: (
      <>
        It&apos;s about 40+ professionals building AI products alongside full-time careers and families. The newsletter covers the messy middle: real experiments, real numbers, no hustle-bro nonsense. Free forever.
      </>
    ),
  },
  {
    question: "What products have you shipped?",
    answer: (
      <>
        Six products so far. Launched:{" "}
        <a
          href="https://www.burnoutradar.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover"
        >
          BurnoutRadar
        </a>{" "}
        (10-dimension burnout assessment with AI recovery plans). In beta:{" "}
        <a
          href="https://www.pairhabit.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover"
        >
          PairHabit
        </a>{" "}
        (couples habit tracker) and{" "}
        <a
          href="https://www.bizarrechat.app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover"
        >
          BizarreChat
        </a>{" "}
        (AI chat with celebrities and historical figures). On the waitlist:{" "}
        <a
          href="https://www.memopod.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover"
        >
          MemoPod
        </a>
        ,{" "}
        <a
          href="https://www.kikko.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover"
        >
          Kikko
        </a>
        , and Fatto.
      </>
    ),
  },
  {
    question: "When did you start coding?",
    answer: (
      <>
        March 2025, at 48, with zero CS background. I opened Cursor for the first time because AI had finally made it possible for a non-technical person to ship real software.
      </>
    ),
  },
  {
    question: "What tools do you use to build?",
    answer: (
      <>
        Claude Code is my primary tool; Cursor shows up occasionally. For web: Next.js, Supabase, Vercel. For mobile: React Native for current apps, Swift/SwiftUI for new iOS-native builds. Stripe for payments. The approach is vibe coding: describe what you want, ship it, iterate.
      </>
    ),
  },
  {
    question: "Where are you based?",
    answer: <>Luxembourg and Rome.</>,
  },
]

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="py-20 bg-muted border-t border-border"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-grotesk text-3xl md:text-5xl font-bold text-center mb-4 text-text tracking-tight">
            Frequently asked
          </h2>
          <p className="text-base md:text-lg text-text-secondary text-center mb-12 max-w-xl mx-auto">
            Short answers to what people actually want to know.
          </p>

          <ul className="space-y-3">
            {faqs.map((faq, index) => (
              <li key={index}>
                <details className="group bg-card border border-border rounded-lg overflow-hidden transition-colors hover:border-border-strong">
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-grotesk font-bold text-base md:text-lg text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset">
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 text-text-secondary transition-transform duration-200 group-open:rotate-45 text-2xl leading-none"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1 text-[17px] text-text-secondary leading-[1.7]">
                    {faq.answer}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
