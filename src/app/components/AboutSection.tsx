"use client"

import { useState } from "react"
import Image from "next/image"

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-16 text-gray-900">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center">
            <Image
              src="/images/luca-profile.png"
              alt="Professional headshot of Luca Capone"
              width={300}
              height={300}
              className="rounded-full shadow-lg"
              priority
            />
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              I&apos;m a Gen X founder who decided that being &quot;non-technical&quot; wasn&apos;t going to stop me from building in the AI
              era. After decades in traditional business, I discovered that the barriers to creating digital products
              have never been lower. Now I&apos;m proving that experience, creativity, and determination matter more than
              coding skills when it comes to shipping AI-powered products that solve real problems.
            </p>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-semibold transition-colors duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-2"
              style={{ color: "#2563EB" }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#1E40AF"}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = "#2563EB"}
              aria-expanded={isExpanded}
              aria-controls="full-story"
            >
              <span className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              {isExpanded ? "Hide Full Story" : "Read My Full Story"}
            </button>

            <div
              id="full-story"
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-8 pt-6 border-t border-gray-200">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">
                    The Catalyst
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    The moment I realized that AI tools could bridge the gap between ideas and execution, everything
                    changed. I didn&apos;t need to learn to code—I needed to learn to think like a builder and leverage the
                    incredible tools available today.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">
                    The Journey
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    From struggling with basic technical concepts to shipping my first AI product in months, not years.
                    I&apos;ve documented every failure, breakthrough, and lesson learned along the way, proving that the path
                    to building is more accessible than ever.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">
                    The Mission
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    To inspire other Gen X entrepreneurs and non-technical founders that it&apos;s never too late to start
                    building. Age brings wisdom, perspective, and problem-solving skills that can&apos;t be taught—combine
                    that with AI tools, and you have a powerful formula for success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
