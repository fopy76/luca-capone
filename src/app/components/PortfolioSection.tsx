"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

type ProductStatus = "launched" | "beta" | "waitlist"

interface Product {
  name: string
  tagline: string
  status: ProductStatus
  statusLabel: string
  features: string[]
  ctaText: string
  url: string
  external: boolean
  icon?: string
  iconInitial?: string
}

const products: Product[] = [
  {
    name: "BurnoutRadar",
    tagline: "10-dimension burnout assessment with AI recovery plans. $19 one-time Pro.",
    status: "launched",
    statusLabel: "Launched",
    features: ["Free + Pro", "AI-powered", "Instant"],
    ctaText: "Try it free",
    url: "https://www.burnoutradar.com",
    external: true,
    icon: "/images/burnoutradar_icon.png",
  },
  {
    name: "PairHabit",
    tagline: "Couples habit tracker with shared micro-habits and reward stakes.",
    status: "beta",
    statusLabel: "Beta",
    features: ["iOS", "For couples"],
    ctaText: "Join the beta",
    url: "#newsletter",
    external: false,
    iconInitial: "P",
  },
  {
    name: "BizarreChat",
    tagline: "AI chat with celebrities and historical figures. Genuinely weird on purpose.",
    status: "beta",
    statusLabel: "Beta",
    features: ["iOS", "AI"],
    ctaText: "Try the beta",
    url: "https://www.bizarrechat.app",
    external: true,
    icon: "/images/bizarrechat_icon.png",
  },
  {
    name: "MemoPod",
    tagline: "Family memory preservation: voice, photo, video, text.",
    status: "waitlist",
    statusLabel: "Waitlist",
    features: ["Family"],
    ctaText: "See what's coming",
    url: "#newsletter",
    external: false,
    iconInitial: "M",
  },
  {
    name: "Kikko",
    tagline: "AI parenting assistant for schedules and school communication.",
    status: "waitlist",
    statusLabel: "Waitlist",
    features: ["Family"],
    ctaText: "Join the waitlist",
    url: "#newsletter",
    external: false,
    icon: "/images/kikko_icon.png",
  },
  {
    name: "Fatto",
    tagline: "Coming soon. Next in line for the build-in-public cycle.",
    status: "waitlist",
    statusLabel: "Waitlist",
    features: ["Planning"],
    ctaText: "Join the waitlist",
    url: "#newsletter",
    external: false,
    iconInitial: "F",
  },
]

const statusBadgeClass: Record<ProductStatus, string> = {
  launched: "bg-[#DCFCE7] text-[#166534]",
  beta: "bg-accent-subtle text-on-accent",
  waitlist: "bg-bg-muted text-text-secondary",
}

function ProductCardInner({ product }: { product: Product }) {
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadgeClass[product.status]}`}
        >
          {product.statusLabel}
        </span>
        <div className="w-12 h-12 flex-shrink-0">
          {product.icon ? (
            <Image
              src={product.icon}
              alt=""
              width={48}
              height={48}
              className="rounded-lg"
            />
          ) : product.iconInitial ? (
            <div
              className="w-12 h-12 rounded-lg bg-accent-subtle text-on-accent flex items-center justify-center font-grotesk font-bold text-xl"
              aria-hidden="true"
            >
              {product.iconInitial}
            </div>
          ) : null}
        </div>
      </div>

      <h3 className="font-grotesk text-2xl font-bold text-text mb-2">
        {product.name}
      </h3>

      <p className="text-base text-text-secondary mb-4 leading-relaxed">
        {product.tagline}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {product.features.map((feature) => (
          <span
            key={feature}
            className="inline-block bg-bg-muted text-text-secondary text-xs font-medium px-2 py-0.5 rounded-sm"
          >
            {feature}
          </span>
        ))}
      </div>

      <span className="inline-flex items-center gap-1 text-text font-semibold text-sm group-hover:text-accent-hover transition-colors mt-auto">
        {product.ctaText}
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </span>
    </>
  )
}

export default function PortfolioSection() {
  return (
    <section id="products" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-grotesk text-3xl md:text-5xl font-bold text-center mb-4 text-text">
          Shipped and shipping
        </h2>
        <p className="text-base md:text-lg text-text-secondary text-center mb-16 max-w-xl mx-auto">
          Status over platform. What&apos;s live, in beta, and on the way.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const linkClass =
              "group block h-full flex flex-col bg-card border border-border rounded-lg p-6 shadow-sm transition-all duration-200 motion-safe:hover:-translate-y-1 hover:shadow-md hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"

            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="h-full"
              >
                {product.external ? (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    aria-label={`${product.name}: ${product.ctaText}`}
                  >
                    <ProductCardInner product={product} />
                  </a>
                ) : (
                  <a
                    href={product.url}
                    className={linkClass}
                    aria-label={`${product.name}: ${product.ctaText}`}
                  >
                    <ProductCardInner product={product} />
                  </a>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
