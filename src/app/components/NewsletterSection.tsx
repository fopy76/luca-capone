"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"

// Types for API response
interface NewsletterResponse {
  success: boolean
  message: string
  data?: {
    subscriberCount?: number
  }
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormData = {
  email: string
}

export default function NewsletterSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus("loading")
    setMessage("")

    try {
      // Redirect to Substack subscription page
      const substackUrl = "https://thebuildlog.substack.com"
      const subscribeUrl = `${substackUrl}/subscribe?email=${encodeURIComponent(data.email.trim())}`
      
      // Open Substack subscription in new tab
      window.open(subscribeUrl, '_blank')
      
      setStatus("success")
      setMessage("Redirecting to Substack to complete your subscription...")
      reset() // Clear form on success
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setStatus("error")
      setMessage("Something went wrong. Please try again later.")
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

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              {...register("email", {
                required: "Please enter your email address",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email address"
                },
                maxLength: {
                  value: 254,
                  message: "Email address is too long"
                }
              })}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:outline-none transition-all duration-200 text-base ${
                errors.email || status === "error" 
                  ? "focus:ring-red-400 bg-red-50" 
                  : "focus:ring-brand-green bg-white"
              }`}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || status === "loading"}
              className="font-semibold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-white whitespace-nowrap"
              style={{ 
                backgroundColor: isSubmitting || status === "loading" ? "#4CAF50AA" : "#4CAF50",
                cursor: isSubmitting || status === "loading" ? "not-allowed" : "pointer"
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && status !== "loading") {
                  (e.target as HTMLElement).style.backgroundColor = "#388E3C"
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting && status !== "loading") {
                  (e.target as HTMLElement).style.backgroundColor = "#4CAF50"
                }
              }}
            >
              {isSubmitting || status === "loading" ? (
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
                  Joining...
                </>
              ) : (
                "Join"
              )}
            </button>
          </div>
          {errors.email && (
            <p className="text-red-100 text-sm mt-2 text-left">{errors.email.message}</p>
          )}
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
