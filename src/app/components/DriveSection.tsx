"use client"

import { useEffect, useState, useRef } from "react"

export default function DriveSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 200)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const drives = [
    {
      number: "01",
      title: "Curiosity",
      description: "The spark that turns &apos;what if&apos; into &apos;let&apos;s find out&apos;"
    },
    {
      number: "02", 
      title: "Motivation",
      description: "The fuel that transforms ideas into shipped products"
    },
    {
      number: "03",
      title: "Learning",
      description: "The bridge between who I was and who I&apos;m becoming"
    },
    {
      number: "04",
      title: "Change",
      description: "The courage to reinvent at any age"
    }
  ]

  return (
    <section 
      id="drives" 
      className="py-16 md:py-16"
      style={{ backgroundColor: "#F9FAFB" }}
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className={`text-2xl md:text-4xl font-semibold text-center mb-16 text-gray-900 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          What Drives Me
        </h2>

        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {drives.map((drive) => (
            <div 
              key={drive.number}
              className="text-center p-6"
            >
              <div 
                className="text-2xl font-semibold mb-3"
                style={{ color: "#4CAF50" }}
              >
                {drive.number}
              </div>
              <h3 className="text-lg md:text-lg font-semibold mb-2 text-gray-900">
                {drive.title}
              </h3>
              <p className="text-sm md:text-sm text-gray-600">
                {drive.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}