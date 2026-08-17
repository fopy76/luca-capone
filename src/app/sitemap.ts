import { MetadataRoute } from 'next'
import { nowLastUpdated } from '@/lib/now'
import { FIELD_NOTES } from '@/lib/field-notes'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
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
      lastModified: new Date(
        FIELD_NOTES.map((n) => n.dateModified)
          .sort()
          .at(-1) ?? nowLastUpdated,
      ),
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
