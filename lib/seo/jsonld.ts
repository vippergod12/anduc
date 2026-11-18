import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, ADDRESS, EMAIL, HOTLINE } from './siteConfig'
import type { Project } from '@/lib/types'

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: EMAIL,
    telephone: HOTLINE,
    address: { '@type': 'PostalAddress', streetAddress: ADDRESS, addressCountry: 'VN' },
    logo: `${SITE_URL}/favicon.svg`,
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'vi-VN',
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function projectJsonLd(p: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.name,
    url: `${SITE_URL}/du-an/${p.slug}`,
    description: p.short_desc || p.long_desc || p.name,
    image: [p.cover_image, ...(p.gallery || [])].filter(Boolean),
    creator: { '@id': `${SITE_URL}/#organization` },
    keywords: [p.category_name, p.status].filter(Boolean).join(', '),
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}
