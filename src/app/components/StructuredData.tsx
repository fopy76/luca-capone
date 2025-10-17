export default function StructuredData() {
  // Person Schema - tells AI/search engines about Luca Capone
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Luca Capone",
    "url": "https://lucacapone.io",
    "email": "hello@lucacapone.io",
    "jobTitle": "AI Product Builder & Founder",
    "description": "Gen X non-technical founder building AI products at 48. Creator of Peakblox, Kikko, AidLoom, and BizarreChat. Proving that age and coding skills are no longer barriers in the AI era.",
    "knowsAbout": [
      "AI Product Development",
      "No-Code Development",
      "AI-First Development",
      "Entrepreneurship",
      "Product Management",
      "SaaS Development",
      "AI Tools"
    ],
    "sameAs": [
      "https://x.com/LucaCaponeX",
      "https://secondactbuilders.substack.com"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Independent"
    }
  }

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Luca Capone - Gen X AI Builder",
    "url": "https://lucacapone.io",
    "description": "Personal website of Luca Capone, Gen X AI builder creating products without coding. Building Peakblox, Kikko, AidLoom, and BizarreChat using AI tools.",
    "author": {
      "@type": "Person",
      "name": "Luca Capone"
    },
    "inLanguage": "en-US"
  }

  // Products Schema - helps AI understand the portfolio
  const productsSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Peakblox",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "description": "AI-powered time blocking for ambitious solopreneurs and side hustlers. Features AI time blocking, smart scheduling, and productivity analytics.",
      "url": "https://www.peakblox.ai",
      "offers": {
        "@type": "Offer",
        "category": "SaaS"
      },
      "creator": {
        "@type": "Person",
        "name": "Luca Capone"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Kikko",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "iOS, Android",
      "description": "AI-powered assistant that helps parents manage children's schedules and school communication. Features smart scheduling, AI chat assistant, and school coordination.",
      "url": "https://www.kikko.ai",
      "offers": {
        "@type": "Offer",
        "category": "Mobile App"
      },
      "creator": {
        "@type": "Person",
        "name": "Luca Capone"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "AidLoom",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Candidate-first cockpit for discovering and managing UN/INGO job opportunities. Features job search & tracking, AI-powered tailoring, and international careers support.",
      "url": "https://aidloom.vercel.app",
      "offers": {
        "@type": "Offer",
        "category": "Web Platform"
      },
      "creator": {
        "@type": "Person",
        "name": "Luca Capone"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "BizarreChat",
      "applicationCategory": "EntertainmentApplication",
      "operatingSystem": "iOS, Android",
      "description": "Generate hilarious AI conversations between celebrities, historical figures, and fictional characters in seconds. AI content creation for social media and entertainment.",
      "url": "https://www.bizarrechat.app",
      "offers": {
        "@type": "Offer",
        "category": "Mobile App"
      },
      "creator": {
        "@type": "Person",
        "name": "Luca Capone"
      }
    }
  ]

  // Combine all schemas
  const allSchemas = [personSchema, websiteSchema, ...productsSchema]

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
