"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  name: string
  tagline: string
  features: string[]
  url: string
  category?: string
  ctaText?: string
  icon?: string
}

export default function PortfolioSection() {
  const products: Product[] = [
    {
      name: "BurnoutRadar",
      tagline: "Science-backed burnout assessment for founders and builders who can't afford to crash.",
      features: ["10-Dimension Assessment", "AI Recovery Plans", "Progress Tracking"],
      url: "https://www.burnoutradar.com",
      category: "Web App",
      ctaText: "Try It Free",
      icon: "/images/burnoutradar_icon.png",
    },
    {
      name: "Peakblox",
      tagline: "AI-powered time blocking for ambitious solopreneurs and side hustlers.",
      features: ["AI Time Blocking", "Smart Scheduling", "Productivity Analytics"],
      url: "https://www.peakblox.ai",
      category: "SaaS",
      icon: "/images/peakblox_icon.png",
    },
    {
      name: "Kikko",
      tagline: "AI-powered assistant that helps parents manage children's schedules and school communication.",
      features: ["Smart scheduling", "AI chat assistant", "School coordination"],
      url: "https://www.kikko.ai",
      category: "Mobile App",
      ctaText: "Join the Waiting List",
      icon: "/images/kikko_icon.png",
    },
    {
      name: "AidLoom",
      tagline: "Candidate-first cockpit for discovering and managing UN/INGO job opportunities.",
      features: ["Job search & tracking", "AI-powered tailoring", "International careers"],
      url: "https://aidloom.vercel.app/",
      category: "Web Platform",
      ctaText: "Join the Waiting List",
    },
    {
      name: "BizarreChat",
      tagline: "Generate hilarious AI conversations between celebrities, historical figures, and fictional characters in seconds.",
      features: ["AI Content Creation", "Social Media", "Entertainment"],
      url: "https://www.bizarrechat.app",
      category: "Mobile App",
      ctaText: "Check It Out",
      icon: "/images/bizarrechat_icon.png",
    },
  ]

  return (
    <section id="products" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-grotesk text-3xl md:text-5xl font-bold text-center mb-16 text-foreground">
          My Products
        </h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className={`${index === 0 || index === 3 ? "lg:col-span-2" : ""}`}
            >
              <Card className="h-full flex flex-col relative">
                <CardHeader>
                  {product.icon && (
                    <div className="absolute top-4 right-4 w-12 h-12">
                      <Image
                        src={product.icon}
                        alt={`${product.name} icon`}
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                  {product.category && (
                    <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3 w-fit">
                      {product.category}
                    </div>
                  )}
                  <CardTitle className="font-grotesk text-2xl">{product.name}</CardTitle>
                  <CardDescription className="text-base mt-2">{product.tagline}</CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full border border-border"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => window.open(product.url, '_blank')}
                  >
                    {product.ctaText || "Learn More"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
