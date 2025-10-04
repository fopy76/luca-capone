"use client"

import { motion } from "framer-motion"
import { Twitter, Github, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer id="connect" className="py-20 bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-grotesk text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Connect & Subscribe
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Connect - Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-grotesk text-2xl font-bold mb-4">Connect</h3>
            <p className="text-background/80 mb-6">
              I&apos;m always open to connecting with fellow builders and creators. Find me on my socials.
            </p>
            <div className="flex flex-col space-y-4">
              <a
                href="https://twitter.com/lucacapone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-background/80 hover:text-primary transition-colors duration-200 group"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Twitter/X</span>
              </a>
              <a
                href="https://github.com/lucacapone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-background/80 hover:text-primary transition-colors duration-200 group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/lucacapone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-background/80 hover:text-primary transition-colors duration-200 group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-grotesk text-2xl font-bold mb-4">Join My Newsletter</h3>
            <p className="text-background/80 mb-6">
              Follow my journey, get insights on building with AI, and be the first to know about new products.
            </p>

            {/* Substack Embed */}
            <div className="mb-4">
              <iframe
                src="https://thebuildlog.substack.com/embed"
                width="100%"
                height="120"
                style={{
                  border: "none",
                  background: "transparent",
                  borderRadius: "12px",
                  fontFamily: "Satoshi, sans-serif"
                }}
                frameBorder="0"
                scrolling="no"
                title="Subscribe to The Build Log"
              />
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-background/20 text-center">
          <p className="text-background/60 text-sm">
            © 2025 Luca Capone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
