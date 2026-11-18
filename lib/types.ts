// =====================================================
// Kiểu dữ liệu cho các file JSON trong /data
// Thêm trường mới vào JSON → thêm vào interface tương ứng ở đây.
// =====================================================

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  /** Để "" để hiển thị khung ảnh trống */
  image_url: string | null
  sort_order: number
  /** Tự tính từ projects.json, không cần khai báo trong JSON */
  product_count?: number
}

export interface Project {
  id: number
  name: string
  slug: string
  category_id: number
  /** Tự gắn từ categories.json */
  category_slug?: string
  category_name?: string
  style: string | null
  location: string | null
  area_sqm: number | null
  year_completed: number | null
  budget_label: string | null
  short_desc: string | null
  long_desc: string | null
  /** Để "" để hiển thị khung ảnh trống */
  cover_image: string
  gallery: string[]
  highlights: string[]
  is_featured: boolean
  is_hero: boolean
  sort_order: number
}

export interface LinkItem {
  label: string
  href: string
}

export interface Stat {
  value: string
  label: string
}

export interface SectionHead {
  eyebrow: string
  /** Hỗ trợ *chữ nghiêng nhấn* và \n để xuống dòng */
  title: string
  lead?: string
}

export interface SiteData {
  name: string
  tagline: string
  description: string
  url: string
  logo: { text: string; accent: string; sub: string }
  contact: {
    zaloPhone: string
    zaloUrl: string
    hotline: string
    email: string
    address: string
    workingHours: string
  }
  zaloProjectMessage: string
  nav: LinkItem[]
  navCta: { secondary: string; primary: string }
  footer: {
    servicesTitle: string
    spacesTitle: string
    contactTitle: string
    zaloButton: string
    callPrefix: string
  }
}

export interface HomeData {
  hero: {
    eyebrow: string
    title: string
    lead: string
    image: string
    primaryCta: LinkItem
    secondaryCta: LinkItem
    stats: Stat[]
  }
  marquee: string[]
  services: SectionHead & {
    cta: LinkItem
    items: { num: string; title: string; desc: string; href: string }[]
  }
  categories: SectionHead & { countSuffix: string }
  featured: SectionHead & { cta: LinkItem; limit: number }
  story: SectionHead & {
    image: string
    paragraphs: string[]
    stats: Stat[]
    primaryCta: LinkItem
    secondaryCta: LinkItem
  }
  process: SectionHead & {
    steps: { num: string; title: string; desc: string }[]
  }
  testimonials: SectionHead & {
    items: { quote: string; name: string; role: string }[]
  }
  cta: SectionHead & {
    text: string
    primaryCta: LinkItem
    zaloLabel: string
  }
}

export interface ServicesData {
  header: SectionHead
  packs: { id: string; title: string; price: string; desc: string; items: string[] }[]
  note: string
  primaryCta: LinkItem
  zaloLabel: string
}

export interface AboutData {
  header: SectionHead
  story: SectionHead & { image: string; paragraphs: string[]; cta: LinkItem }
  values: SectionHead & { items: { title: string; desc: string }[] }
  team: SectionHead & { members: { name: string; role: string; img: string }[] }
}

export interface ContactData {
  header: SectionHead
  formTitle: string
  infoTitle: string
  zaloLabel: string
  promo: { title: string; text: string; items: string[] }
  form: {
    spaceTypes: string[]
    styles: string[]
    submitLabel: string
    note: string
    successTitle: string
    successText: string
    zaloGreeting: string
  }
}
