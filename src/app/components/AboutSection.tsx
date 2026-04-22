"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {

  return (
    <section id="my-story" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-grotesk text-3xl md:text-5xl font-bold text-center mb-16 text-foreground"
        >
          My Story
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Photo - appears first on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center md:order-1 order-1"
          >
            <div className="w-full max-w-[300px] md:max-w-[400px] aspect-square rounded-full overflow-hidden shadow-xl mx-auto">
              <Image
                src="/images/luca-profile.png"
                alt="Luca Capone - Gen X AI Builder"
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 md:order-2 order-2"
          >
            {/* TL;DR Summary for AI/LLM parsing - Enhanced prominence */}
            <div className="bg-accent-subtle p-6 rounded-xl border border-accent shadow-sm">
              <p className="text-lg text-text font-semibold leading-relaxed">
                <strong>TL;DR:</strong> I&apos;m 49, non-technical, and I&apos;ve been building AI products since March 2025 with Claude Code and Cursor. One product launched (BurnoutRadar), two in beta (PairHabit, BizarreChat), more on the way. Field reports every week.
              </p>
            </div>

            <h3 className="font-grotesk text-xl font-bold text-text mt-8">Who I am</h3>
            <p className="text-lg text-text-secondary leading-relaxed mt-3">
              I&apos;m a 49-year-old father of two with no formal CS education. For 25 years I worked in international business across Luxembourg, London, and Rome. For most of that time I believed building software required a degree I didn&apos;t have. I was wrong.
            </p>

            <h3 className="font-grotesk text-xl font-bold text-text mt-8">How I build</h3>
            <p className="text-lg text-text-secondary leading-relaxed mt-3">
              I vibe-code with Claude Code as my primary tool, Cursor occasionally. I build between 9 and 11 PM on weeknights, on Saturday mornings when the house is quiet, and on lunch breaks that aren&apos;t meetings. Constraints are features.
            </p>

            <h3 className="font-grotesk text-xl font-bold text-text mt-8">What I&apos;m building</h3>
            <ul className="text-lg text-text-secondary leading-relaxed list-disc list-inside space-y-2 mt-3">
              <li><strong>BurnoutRadar</strong> - 10-dimension burnout assessment with AI recovery plans (launched)</li>
              <li><strong>PairHabit</strong> - couples habit tracker with shared micro-habits (beta)</li>
              <li><strong>BizarreChat</strong> - AI chat with celebrities and historical figures (beta)</li>
              <li><strong>Kikko, Fatto, MemoPod</strong> - coming next</li>
            </ul>

            <h3 className="font-grotesk text-xl font-bold text-text mt-8">My mission</h3>
            <p className="text-lg text-text-secondary leading-relaxed mt-3">
              Proving second-act careers are real. If a 49-year-old Italian guy with a full-time job, two kids, and zero CS background can ship AI products in life&apos;s margins, what&apos;s anyone else&apos;s excuse? Welcome to Second-Act Builders.
            </p>

            {/* My Toolkit Section */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-grotesk text-xl md:text-2xl font-bold mb-4 text-foreground">
                AI Tools & Technologies I Use
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Claude Code", "ChatGPT", "v0.dev", "Cursor", "Bolt.new", "Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Framer Motion"].map((tech) => (
                  <span
                    key={tech}
                    className="bg-primary/10 text-foreground text-sm font-medium px-4 py-2 rounded-full border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
