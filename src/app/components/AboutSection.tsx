"use client"

import { motion } from "framer-motion"
import Image from "next/image"

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
    <section id="my-story" className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md mb-8">
            <Image
              src="/images/luca-profile.png"
              alt="Luca Capone"
              width={200}
              height={200}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <h2 className="font-grotesk text-3xl md:text-5xl font-bold text-text text-center tracking-tight">
            My Story
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6"
        >
          {/* TL;DR Summary — retained for AI/LLM parsing and fast scanning */}
          <div className="bg-accent-subtle p-5 rounded-lg border border-accent text-text">
            <p className="text-base leading-relaxed">
              <strong>TL;DR:</strong> I&apos;m 49, non-technical, building AI products since March 2025 with Claude Code and Cursor. BurnoutRadar launched, PairHabit and BizarreChat in beta, more on the way. Field reports every week.
            </p>
          </div>

          <p className="text-lg md:text-xl font-semibold text-text leading-snug">
            Twenty-five years in international business. Two kids. One full-time job. Started coding at 48.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            I spent a quarter-century in financial services and consulting across Luxembourg, London, and Rome. In March 2025, I opened Claude Code for the first time. Something had changed: AI finally made it possible for non-technical people to ship real software.
          </p>

          <blockquote className="border-l-4 border-accent pl-6 py-1 my-2">
            <p className="font-grotesk text-xl md:text-2xl font-medium text-text leading-snug tracking-tight">
              Constraints are features. A full-time job and two kids force you to ship the smallest useful thing, fast.
            </p>
          </blockquote>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            I build between 9 and 11 PM on weeknights, on Saturday mornings when the house is quiet, and on lunch breaks that aren&apos;t meetings. Claude Code is my primary tool, Cursor shows up occasionally. The whole approach is vibe coding: describe what you want, ship it, iterate.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            If a 49-year-old Italian guy with a full-time job, two kids, and zero CS background can ship AI products in the margins of his life, what&apos;s anyone else&apos;s excuse? That&apos;s what Second-Act Builders is about. Welcome.
          </p>

          <div className="pt-4">
            <button
              onClick={scrollToNewsletter}
              className="inline-flex items-center gap-2 bg-accent text-on-accent font-semibold px-6 py-3 rounded-md hover:bg-accent-hover motion-safe:hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
            >
              Get the weekly field report
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
