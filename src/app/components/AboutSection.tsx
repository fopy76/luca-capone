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
            <div className="bg-primary/10 p-6 rounded-xl border-2 border-primary/30 shadow-sm">
              <p className="text-lg text-foreground font-semibold leading-relaxed">
                <strong className="text-primary">TL;DR:</strong> Gen X father building AI products at age 48 with zero coding background. Creator of Peakblox, Kikko, AidLoom, and BizarreChat using AI tools like Claude Code, ChatGPT, v0.dev, and Cursor. Proving age and technical skills are not barriers in the AI era.
              </p>
            </div>

            <h3 className="font-grotesk text-xl font-bold text-foreground mt-8">Who I Am</h3>
            <p className="text-lg text-foreground/80 leading-relaxed mt-3">
              I'm a 48-year-old Gen X father of two with no formal computer science education or coding background. For years, I believed building software required a CS degree. I was wrong.
            </p>

            <h3 className="font-grotesk text-xl font-bold text-foreground mt-8">How I Build</h3>
            <p className="text-lg text-foreground/80 leading-relaxed mt-3">
              I build AI products using no-code and AI-first development tools. Using Claude Code, ChatGPT, v0.dev, Cursor, and Bolt.new, I've created four AI products without writing code from scratch. Each product solves real problems I've encountered.
            </p>

            <h3 className="font-grotesk text-xl font-bold text-foreground mt-8">What I'm Building</h3>
            <ul className="text-lg text-foreground/80 leading-relaxed list-disc list-inside space-y-2 mt-3">
              <li><strong>Peakblox</strong> - AI-powered time blocking SaaS for solopreneurs</li>
              <li><strong>Kikko</strong> - AI assistant helping parents manage school schedules</li>
              <li><strong>AidLoom</strong> - Job discovery platform for UN/INGO careers</li>
              <li><strong>BizarreChat</strong> - AI conversation generator for entertainment</li>
            </ul>

            <h3 className="font-grotesk text-xl font-bold text-foreground mt-8">My Mission</h3>
            <p className="text-lg text-foreground/80 leading-relaxed mt-3">
              Proving that second-act careers are possible. Inspiring Gen X professionals and non-technical people to build with AI tools. Showing that age 48 is not too late to start building technology products.
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
