"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FAQS } from "@/lib/faqs"

// FAQ content lives in src/lib/faqs.tsx (single source of truth shared with
// the FAQPage JSON-LD in HomeSchema and the /llms.txt route).
export default function FAQSection() {
  return (
    <section
      id="faq"
      className="py-20 bg-muted border-t border-border scroll-mt-16"
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
            {FAQS.map((faq) => (
              <li key={faq.question}>
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
                    <div>{faq.answerNode ?? faq.answerText}</div>
                    {faq.noteSlug && (
                      <p className="mt-3 text-sm font-medium">
                        <Link
                          href={`/field-notes/${faq.noteSlug}`}
                          className="text-text underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover"
                        >
                          Full field note →
                        </Link>
                      </p>
                    )}
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
