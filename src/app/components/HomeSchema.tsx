// Homepage-only JSON-LD: ProfilePage, FAQPage, the six products, and the
// newsletter. Rendered from src/app/page.tsx so this markup appears ONLY where
// the matching content is visible (Google requires FAQ markup to match
// on-page content; /now must not carry it).
//
// FAQ answers and product descriptions are mapped straight from the same
// modules that render the visible sections, so schema/content parity holds by
// construction.
import { FAQS } from "@/lib/faqs"
import {
  NEWSLETTER,
  PERSON_ID,
  PRODUCTS,
  SITE_TITLE,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/site"

const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: SITE_TITLE,
      mainEntity: { "@id": PERSON_ID },
      isPartOf: { "@id": WEBSITE_ID },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answerText },
      })),
    },
    ...PRODUCTS.map((product) => ({
      "@type": "SoftwareApplication",
      name: product.name,
      applicationCategory: product.applicationCategory,
      operatingSystem: product.operatingSystem,
      description: product.tagline,
      url: product.url,
      ...(product.appStoreUrl ? { installUrl: product.appStoreUrl } : {}),
      offers: {
        "@type": "Offer",
        category: product.offerCategory,
        ...(product.offerPrice
          ? {
              price: product.offerPrice,
              priceCurrency: product.offerPriceCurrency,
            }
          : {}),
      },
      creator: { "@id": PERSON_ID },
    })),
    {
      "@type": "Periodical",
      name: NEWSLETTER.name,
      url: NEWSLETTER.url,
      author: { "@id": PERSON_ID },
      inLanguage: "en-US",
    },
  ],
}

export default function HomeSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(homeGraph) }}
    />
  )
}
