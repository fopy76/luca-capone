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
            <Image
              src="/images/luca-profile.png"
              alt="Luca Capone - Gen X AI Builder"
              width={400}
              height={400}
              className="rounded-full shadow-xl"
              priority
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 md:order-2 order-2"
          >
            <p className="text-lg text-foreground/80 leading-relaxed">
              As a Gen X father of two, my life is busy. For years, I believed that building software was a world reserved for people with computer science degrees. I was wrong.
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed">
              The rise of AI tools opened a door I never thought I could walk through. I started exploring, driven by a simple curiosity to solve problems I saw around me. This website and the products on it are the result of that journey. They are proof that with passion and the right tools, anyone—regardless of age or background—can build the future. My goal is to inspire other non-tech folks to take that leap.
            </p>

            {/* My Toolkit Section */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-grotesk text-xl md:text-2xl font-bold mb-4 text-foreground">
                My Toolkit
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Claude AI", "Vercel"].map((tech) => (
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
