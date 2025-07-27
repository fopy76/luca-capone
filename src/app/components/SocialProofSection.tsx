"use client"

import { motion } from "framer-motion"

export default function SocialProofSection() {
  const metrics = [
    {
      number: "6",
      label: "Products Shipped",
      description: "From idea to launch",
    },
    {
      number: "1,200+",
      label: "Newsletter Subscribers",
      description: "Growing community",
    },
    {
      number: "18",
      label: "Months Building",
      description: "And counting",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index} 
              className="text-center p-8 bg-gray-50 rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div 
                className="text-4xl font-bold text-primary mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              >
                {metric.number}
              </motion.div>
              <div className="text-xl font-semibold text-gray-900 mb-2">{metric.label}</div>
              <div className="text-gray-600">{metric.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
