"use client"

import { useState } from "react"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!EMAIL_REGEX.test(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      // Submit directly to Substack
      const response = await fetch("https://thebuildlog.substack.com/api/v1/free", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          redirect: false
        })
      })

      if (response.ok) {
        setStatus("success")
        setMessage("Successfully subscribed to The Build Log!")
        setEmail("")
      } else {
        throw new Error("Subscription failed")
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <section id="newsletter" className="py-20" style={{backgroundColor: "#2563EB"}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          The Build Log
        </h2>
        <p className="text-lg md:text-xl mb-8 text-blue-100">
          Raw, unfiltered updates from a Gen X founder building AI products
        </p>

        {/* Custom Form with Direct Substack Integration */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-brand-green focus:outline-none transition-all duration-200 text-base bg-white"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="font-semibold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-white whitespace-nowrap"
              style={{ 
                backgroundColor: status === "loading" ? "#4CAF50AA" : "#4CAF50",
                cursor: status === "loading" ? "not-allowed" : "pointer"
              }}
              onMouseEnter={(e) => {
                if (status !== "loading") {
                  (e.target as HTMLElement).style.backgroundColor = "#388E3C"
                }
              }}
              onMouseLeave={(e) => {
                if (status !== "loading") {
                  (e.target as HTMLElement).style.backgroundColor = "#4CAF50"
                }
              }}
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
        </form>

        {message && (
          <div
            className={`mb-4 p-4 rounded-lg transition-all duration-500 transform ${
              status === "success" 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-red-100 text-red-800 border border-red-200"
            } animate-in slide-in-from-top-2 fade-in`}
          >
            <div className="flex items-center justify-center gap-2">
              {status === "success" ? (
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}

        <p className="text-sm text-blue-200">
          No spam, ever. Unsubscribe anytime. I respect your privacy and will only send valuable updates about the
          building journey.
        </p>
      </div>
    </section>
  )
}
