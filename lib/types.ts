// =====================================================
// Kiểu dữ liệu cho các file JSON trong /data
// Thêm trường mới vào JSON → thêm vào interface tương ứng ở đây.
// Chuỗi tiêu đề hỗ trợ *chữ nhấn* và \n (xuống dòng) — xem components/RichText.tsx
// =====================================================

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
  title: string
  lead?: string
}

/** Lĩnh vực trọng tâm — cũng là "Ba trụ cột cốt lõi" (data/categories.json) */
export interface Category {
  id: number
  name: string
  en: string
  slug: string
  /** 'health' | 'tourism' | 'agriculture' — xem components/PillarIcon.tsx */
  icon: string
  description: string
  tags: string[]
  /** Để "" để hiển thị khung ảnh trống */
  image_url: string
  sort_order: number
  /** Tự tính từ projects.json */
  product_count?: number
}

/** Dự án (data/projects.json) */
export interface Project {
  id: number
  name: string
  slug: string
  category_id: number
  /** Tự gắn từ categories.json */
  category_slug?: string
  category_name?: string
  /** Vd: "Từ năm 2002", "Đang triển khai", "Đang phát triển" */
  status: string
  short_desc: string
  long_desc: string
  /** Để "" để hiển thị khung ảnh trống */
  cover_image: string
  gallery: string[]
  /** Thông tin nhanh hiển thị ở khung bên phải trang chi tiết */
  facts: { label: string; value: string }[]
  highlights: string[]
  /** Các mục nội dung thêm trên trang chi tiết */
  sections: { title: string; text: string; items: string[] }[]
  is_featured: boolean
  sort_order: number
}

export interface SiteData {
  name: string
  legalName: string
  tagline: string
  description: string
  url: string
  logo: { text: string; accent: string; sub: string }
  contact: {
    person: string
    zaloPhone: string
    zaloUrl: string
    /** Số đầu tiên là số chính (nút Gọi, nút nổi) */
    phones: string[]
    /** Email đầu tiên là email chính */
    emails: string[]
    address: string
  }
  zaloProjectMessage: string
  nav: LinkItem[]
  navCta: { secondary: string; primary: string }
  footer: {
    title: string
    lines: string[]
    companyTitle: string
    companyLinks: LinkItem[]
    focusTitle: string
    contactTitle: string
    zaloButton: string
    callPrefix: string
    copyright: string
  }
  /** Khối "Hợp tác đầu tư" dùng chung (trang chủ, giới thiệu, dịch vụ, mô hình) */
  cta: SectionHead & {
    text: string
    primary: LinkItem
    hotlineLabel: string
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
  about: SectionHead & {
    image: string
    paragraphs: string[]
    stats: Stat[]
    primaryCta: LinkItem
    secondaryCta: LinkItem
  }
  audience: SectionHead & { items: { title: string; desc: string }[] }
  services: SectionHead & { cta: LinkItem }
  focus: SectionHead & { cta: LinkItem; detailLabel: string }
  process: SectionHead & { steps: { num: string; title: string; desc: string }[] }
  featured: SectionHead & { cta: LinkItem; limit: number }
}

export interface ServiceGroup {
  id: string
  num: string
  title: string
  desc: string
}

export interface ServicesData {
  header: SectionHead
  lines: { eyebrow: string; items: { title: string; desc: string; href: string }[] }
  groups: ServiceGroup[]
  roadmap: SectionHead
  deliverables: SectionHead & { items: { title: string; desc: string }[] }
}

/** Thông tin chung của một "mùa" trên trang Giới thiệu */
export interface SeasonHead {
  label: string
  theme: string
  title: string
  eyebrow?: string
  lead?: string
}

export interface Partner {
  name: string
  en: string
  url: string
  logo: string
}

export interface AboutData {
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    lead: string
    image: string
    facts: Stat[]
    journeyTitle: string
  }
  spring: SeasonHead & {
    image: string
    paragraphs: string[]
    team: {
      eyebrow: string
      title: string
      text: string
      members: { name: string; role: string; desc: string; img: string }[]
    }
  }
  summer: SeasonHead & { detailLabel: string }
  autumn: SeasonHead & {
    values: {
      num: string
      title: string
      desc: string
      quote: string
      image: string
      imageAlt: string
    }[]
  }
  winter: SeasonHead & { steps: { num: string; title: string; desc: string }[] }
  partners: SectionHead & { groups: { label: string; items: Partner[] }[] }
}

export interface ModelsData {
  header: SectionHead
  iceberg: SectionHead & {
    hint: string
    layers: { id: string; name: string; percent: number; level: string; nature: string; desc: string }[]
    banner: string
    bannerSub: string
  }
  village: SectionHead & {
    hint: string
    center: string
    stages: { id: string; name: string; group: string; desc: string }[]
  }
}

export interface FormField {
  label: string
  placeholder: string
}

export interface ContactData {
  header: SectionHead
  formTitle: string
  info: {
    title: string
    /** Giá trị lấy từ data/site.json → contact theo `type`; `icon` để "" sẽ hiện ô xám */
    items: { type: string /* 'address' | 'phone' | 'email' */; label: string; icon: string }[]
  }
  zaloLabel: string
  promo: { title: string; text: string; items: string[] }
  form: {
    fields: {
      name: FormField
      phone: FormField
      email: FormField
      channel: FormField & { options: string[] }
      message: FormField
    }
    submitLabel: string
    note: string
    successTitle: string
    successText: string
    resetLabel: string
    zaloGreeting: string
  }
}
