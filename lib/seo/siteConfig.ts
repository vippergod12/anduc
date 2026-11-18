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
/** Danh sách số điện thoại (data/site.json → contact.phones) */
export const PHONES: string[] = process.env.NEXT_PUBLIC_HOTLINE
  ? [process.env.NEXT_PUBLIC_HOTLINE]
  : site.contact.phones
/** Số chính — dùng cho nút "Gọi" */
export const HOTLINE = PHONES[0] ?? ''
/** "0913 840 828" → "tel:0913840828" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^0-9+]/g, '')}`
/** Danh sách email (data/site.json → contact.emails); email đầu là email chính */
export const EMAILS: string[] = process.env.NEXT_PUBLIC_EMAIL
  ? [process.env.NEXT_PUBLIC_EMAIL]
  : site.contact.emails
export const EMAIL = EMAILS[0] ?? ''
export const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS || site.contact.address

export const NAV_LINKS = site.nav
