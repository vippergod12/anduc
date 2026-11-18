import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/siteConfig'
import { getCategories, getAllProjectSlugs } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/du-an`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/dich-vu`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/ve-chung-toi`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/lien-he`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
  const cats: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${SITE_URL}/danh-muc/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
  const projs: MetadataRoute.Sitemap = getAllProjectSlugs().map((s) => ({
    url: `${SITE_URL}/du-an/${s}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  return [...staticUrls, ...cats, ...projs]
}
