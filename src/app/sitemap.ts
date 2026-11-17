import { MetadataRoute } from 'next'
import { nowLastUpdated } from '@/lib/now'
import { FIELD_NOTES } from '@/lib/field-notes'
import { homeLastModified, notesLastModified } from '@/lib/freshness'
import { SITE_URL } from '@/lib/site'

// lastModified is the day a page's content last changed (src/lib/freshness.ts),
// not the day of the deploy: search engines stop trusting a lastmod that moves
// on every build.

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  return [
    {
      url: baseUrl,
      lastModified: new Date(homeLastModified),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/now`,
      lastModified: new Date(nowLastUpdated),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/field-notes`,
      lastModified: new Date(notesLastModified),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...FIELD_NOTES.map((note) => ({
      url: `${baseUrl}/field-notes/${note.slug}`,
      lastModified: new Date(note.dateModified),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
