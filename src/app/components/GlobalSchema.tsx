// Site-wide JSON-LD: the Person and WebSite entities, rendered on every page
// from the root layout. Page-specific schema (FAQ, products, profile pages)
// lives with its page so markup never appears where the content isn't visible.
import {
  NEWSLETTER,
  PERSON,
  PERSON_ID,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/site"

const globalGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: PERSON.name,
      givenName: PERSON.givenName,
      familyName: PERSON.familyName,
      url: SITE_URL,
      email: PERSON.email,
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}${PERSON.imagePath}`,
        caption: PERSON.name,
      },
      jobTitle: PERSON.jobTitle,
      description: PERSON.description,
      disambiguatingDescription: PERSON.disambiguatingDescription,
      nationality: { "@type": "Country", name: PERSON.nationality },
      knowsLanguage: [...PERSON.knowsLanguage],
      address: PERSON.addresses.map((a) => ({
        "@type": "PostalAddress",
        addressLocality: a.locality,
        addressCountry: a.country,
      })),
      knowsAbout: [...PERSON.knowsAbout],
      sameAs: [...PERSON.sameAs],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      alternateName: NEWSLETTER.name,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      inLanguage: "en-US",
    },
  ],
}

export default function GlobalSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(globalGraph) }}
    />
  )
}
