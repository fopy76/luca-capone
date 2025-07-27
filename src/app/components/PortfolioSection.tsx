"use client"

import { motion } from "framer-motion"

interface Product {
  name: string
  description: string
  status: "Live" | "Beta" | "Coming Soon"
  metrics?: string
  featured?: boolean
}

export default function PortfolioSection() {
  const products: Product[] = [
    {
      name: "Vibe Coding",
      description:
        "An AI-powered coding companion that helps non-technical founders understand and build with code through natural language interactions.",
      status: "Live",
      metrics: "500+ users",
    },
    {
      name: "Build Log AI",
      description:
        "Automated newsletter generation tool that transforms development updates into engaging content for founders and builders.",
      status: "Beta",
      metrics: "50+ beta users",
    },
    {
      name: "Founder Insights",
      description:
        "AI-driven analytics platform that provides actionable insights for non-technical founders building digital products.",
      status: "Coming Soon",
    },
    {
      name: "No-Code Validator",
      description:
        "Market validation tool that helps entrepreneurs test ideas quickly without technical implementation.",
      status: "Live",
      metrics: "200+ validations",
    },
    {
      name: "AI Product Roadmap",
      description:
        "Strategic planning tool that helps founders prioritize features and plan product development using AI recommendations.",
      status: "Beta",
    },
    {
      name: "GenX Builder Community",
      description:
        "Platform connecting experienced entrepreneurs who are building with AI tools and sharing knowledge.",
      status: "Coming Soon",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "text-white"
      case "Beta":
        return "text-white"
      case "Coming Soon":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Live":
        return { backgroundColor: "#4CAF50" } // Green
      case "Beta":
        return { backgroundColor: "#2563EB" } // Blue
      case "Coming Soon":
        return {}
      default:
        return {}
    }
  }

  const getButtonAction = (status: string) => {
    switch (status) {
      case "Live":
        return "Try It Now"
      case "Beta":
        return "Join Beta"
      case "Coming Soon":
        return "Get Notified"
      default:
        return "Learn More"
    }
  }

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-16 text-gray-900">
          What I&apos;m Building
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 ${
                product.featured ? "ring-2 ring-accent" : ""
              }`}
            >
              {product.featured && (
                <div className="bg-accent text-white text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
                  Featured
                </div>
              )}

              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">
                {product.name}
              </h3>
              
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-6">
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
                  style={getStatusStyle(product.status)}
                >
                  {product.status}
                </span>
                {product.metrics && (
                  <span className="text-sm text-gray-600 font-medium">
                    {product.metrics}
                  </span>
                )}
              </div>

              <button 
                className="w-full text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style={{ backgroundColor: "#2563EB" }}
                            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = "#1E40AF"}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = "#2563EB"}
                type="button"
              >
                {getButtonAction(product.status)}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
