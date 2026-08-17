import { MetadataRoute } from 'next'
import { nowLastUpdated } from '@/lib/now'
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
  ]
}
