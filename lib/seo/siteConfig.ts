import siteJson from '@/data/site.json'
import type { SiteData } from '@/lib/types'

// Import thẳng JSON (không qua lib/data) để component client không phải tải toàn bộ dữ liệu
const site: SiteData = siteJson

// Biến môi trường (nếu có) sẽ ghi đè giá trị trong data/site.json
export const SITE_NAME = site.name
export const SITE_TAGLINE = site.tagline
export const SITE_DESCRIPTION = site.description

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, '')

export const ZALO_PHONE = process.env.NEXT_PUBLIC_ZALO_PHONE || site.contact.zaloPhone
export const ZALO_URL =
  process.env.NEXT_PUBLIC_ZALO_URL ||
  site.contact.zaloUrl ||
  `https://zalo.me/${ZALO_PHONE.replace(/[^0-9]/g, '')}`
export const HOTLINE = process.env.NEXT_PUBLIC_HOTLINE || site.contact.hotline
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL || site.contact.email
export const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS || site.contact.address

export const NAV_LINKS = site.nav
