"use client"

import { motion } from "framer-motion"
import { Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer id="connect" className="py-16 bg-foreground text-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-grotesk text-2xl md:text-3xl font-bold mb-4"
        >
          Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-background/75 mb-8 max-w-md mx-auto"
        >
          I&apos;m always open to connecting with fellow builders and creators. Find me on my socials or drop a line.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8"
        >
          <a
            href="mailto:hello@lucacapone.io"
            className="flex items-center gap-3 text-background/80 hover:text-accent transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground rounded-sm px-2 py-1"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span>hello@lucacapone.io</span>
          </a>
          <a
            href="https://x.com/LucaCaponeX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-background/80 hover:text-accent transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground rounded-sm px-2 py-1"
          >
            <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span>@LucaCaponeX</span>
          </a>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-background/20">
          <p className="text-background/60 text-sm">
            © 2026 Luca Capone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
