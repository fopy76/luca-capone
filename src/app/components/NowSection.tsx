"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { nowTeaserItems, nowLastUpdated, nowLastUpdatedDisplay } from "@/lib/now"

export default function NowSection() {
  return (
    <section
      id="now"
      aria-labelledby="now-heading"
      className="py-20 bg-bg-subtle border-t border-border scroll-mt-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="now-heading"
            className="font-grotesk text-3xl md:text-5xl font-bold text-center mb-4 text-text tracking-tight"
          >
            What I&apos;m doing now
          </h2>
          <p className="text-base md:text-lg text-text-secondary text-center mb-12 max-w-xl mx-auto">
            The current snapshot. Updated{" "}
            <time dateTime={nowLastUpdated}>{nowLastUpdatedDisplay}</time>.
          </p>
        </motion.div>

        <div className="space-y-4">
          {nowTeaserItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex items-start gap-4 bg-card border border-border rounded-lg p-6 shadow-sm"
            >
              <span className="flex-shrink-0 bg-accent-subtle text-on-accent text-xs font-semibold px-3 py-1 rounded-full mt-0.5">
                {item.label}
              </span>
              <p className="text-[17px] text-text-secondary leading-[1.7]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/now"
            className="inline-flex items-center gap-2 bg-accent text-on-accent font-semibold text-sm px-5 py-3 rounded-md hover:bg-accent-hover motion-safe:hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
          >
            Read the full now page
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
