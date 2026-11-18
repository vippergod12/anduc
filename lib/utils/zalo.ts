import { ZALO_PHONE, ZALO_URL } from '@/lib/seo/siteConfig'
import siteJson from '@/data/site.json'
import type { SiteData } from '@/lib/types'

// Import thẳng JSON (không qua lib/data) để component client không phải tải toàn bộ dữ liệu
const site: SiteData = siteJson

export function zaloLinkFor(message?: string): string {
  if (!message) return ZALO_URL
  const phone = ZALO_PHONE.replace(/[^0-9]/g, '')
  return `https://zalo.me/${phone}?body=${encodeURIComponent(message)}`
}

export function zaloMessageForProject(name: string): string {
  return site.zaloProjectMessage.replace('{name}', name)
}
