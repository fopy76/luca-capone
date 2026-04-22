"use client"

import { motion } from "framer-motion"

export default function AboutSection() {
  const scrollToNewsletter = () => {
    const element = document.getElementById("newsletter")
    if (element) {
      const navHeight = 64
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  return (
    <section id="my-story" className="py-20 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-text mb-6 tracking-tight">
            My Story
          </h2>

          <p className="text-lg md:text-xl font-medium text-text leading-snug mb-6">
            Twenty-five years in international business. Two kids. One full-time job. Started coding at 48.
          </p>

          <p className="text-[17px] text-text-secondary leading-[1.7] mb-5">
            I&apos;m Luca. I spent a quarter-century in financial services and consulting across Luxembourg, London, and Rome. In March 2025, I opened Claude Code for the first time. Something had changed: AI finally made it possible for non-technical people to ship real software.
          </p>

          <blockquote className="border-l-[3px] border-accent pl-5 py-2 my-6">
            <p className="font-grotesk text-lg md:text-xl font-medium text-text leading-[1.4] tracking-tight">
              &ldquo;Constraints are features. A full-time job and two kids force you to ship the smallest useful thing, fast.&rdquo;
            </p>
          </blockquote>

          <p className="text-[17px] text-text-secondary leading-[1.7] mb-5">
            I build between 9 and 11 PM on weeknights, on Saturday mornings when the house is quiet, and on lunch breaks that aren&apos;t meetings. Claude Code is my primary tool, Cursor shows up occasionally. The whole approach is vibe coding: describe what you want, ship it, iterate.
          </p>

          <p className="text-[17px] text-text-secondary leading-[1.7] mb-8">
            If a 49-year-old Italian guy with a full-time job, two kids, and zero CS background can ship AI products in the margins of his life, what&apos;s anyone else&apos;s excuse? That&apos;s what Second-Act Builders is about. Welcome.
          </p>

          <button
            onClick={scrollToNewsletter}
            className="inline-flex items-center gap-2 bg-accent text-on-accent font-semibold text-sm px-5 py-3 rounded-md hover:bg-accent-hover motion-safe:hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
          >
            Get the weekly field report
          </button>
        </motion.div>
      </div>
    </section>
  )
}
