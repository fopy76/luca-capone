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
    <section id="my-story" className="py-20 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md ring-2 ring-accent/30 mb-6">
              <Image
                src="/images/luca-profile.png"
                alt="Luca Capone"
                width={180}
                height={180}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-text tracking-tight text-center">
              My Story
            </h2>
          </div>

          <p className="text-lg md:text-xl font-medium text-text leading-snug mb-6">
            Italian Army Special Ops. UN security across four continents. Two kids. One full-time job. Started coding at 48.
          </p>

          <p className="text-[17px] text-text-secondary leading-[1.7] mb-5">
            I&apos;m Luca. I&apos;ve spent 25+ years in international security. Nine of them as a Captain in the Italian Army Special Operations Forces, deployed to Bosnia, Iraq, and Afghanistan. Then humanitarian security with the UN system took me from South Sudan to Pakistan to Somalia, with field missions across another ten countries. These days I run security programs for a European institution.
          </p>

          <p className="text-[17px] text-text-secondary leading-[1.7] mb-5">
            In March 2025 I opened Cursor for the first time. Something had changed. AI had finally made it possible for a non-technical person to ship real software.
          </p>

          <p className="text-[17px] text-text-secondary leading-[1.7] mb-5">
            In my 25 years in security, I&apos;ve watched three technology shifts land: the internet, mobile, and the cloud. Every time, half my peers said &ldquo;I&apos;m fine with what I have.&rdquo; The curious ones are mostly still here.
          </p>

          <blockquote className="border-l-[3px] border-accent pl-5 py-2 my-6">
            <p className="font-grotesk text-lg md:text-xl font-medium text-text leading-[1.4] tracking-tight">
              &ldquo;25 years of pattern recognition is screaming at me that this shift is bigger than the previous three combined. Sitting it out is not a neutral choice.&rdquo;
            </p>
          </blockquote>

          <p className="text-[17px] text-text-secondary leading-[1.7] mb-5">
            I build between 9 and 11 PM on weeknights, on Saturday mornings when the house is quiet, and on lunch breaks that aren&apos;t meetings. Claude Code is my primary tool. Cursor shows up occasionally. The approach is vibe coding: describe what you want, ship it, iterate.
          </p>

          <p className="text-[17px] text-text-secondary leading-[1.7] mb-8">
            If a 49-year-old Italian guy with a full-time job, two kids, and zero CS background can build AI products in the margins of his life, what&apos;s your excuse? That&apos;s what Second-Act Builders is about. Welcome.
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
