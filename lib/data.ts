// =====================================================
// Lớp đọc dữ liệu — toàn bộ lấy từ file JSON trong /data.
// Sau này muốn đổi sang database/API chỉ cần sửa file này,
// các trang & component giữ nguyên.
// =====================================================
import categoriesJson from '@/data/categories.json'
import projectsJson from '@/data/projects.json'
import siteJson from '@/data/site.json'
import homeJson from '@/data/home.json'
import servicesJson from '@/data/services.json'
import aboutJson from '@/data/about.json'
import contactJson from '@/data/contact.json'
import modelsJson from '@/data/models.json'
import type {
  AboutData,
  Category,
  ContactData,
  HomeData,
  ModelsData,
  Project,
  ServicesData,
  SiteData,
} from '@/lib/types'

export const site: SiteData = siteJson
export const home: HomeData = homeJson
export const services: ServicesData = servicesJson
export const about: AboutData = aboutJson
export const contact: ContactData = contactJson
export const models: ModelsData = modelsJson

const rawCategories: Category[] = categoriesJson
const rawProjects: Project[] = projectsJson

const bySortOrder = <T extends { sort_order: number; id: number }>(a: T, b: T) =>
  a.sort_order - b.sort_order || a.id - b.id

function withCategory(p: Project): Project {
  const c = rawCategories.find((cat) => cat.id === p.category_id)
  return { ...p, category_slug: c?.slug, category_name: c?.name }
}

const allProjects: Project[] = [...rawProjects].sort(bySortOrder).map(withCategory)

// =====================================================
// LĨNH VỰC (categories)
// =====================================================
export function getCategories(): Category[] {
  return [...rawCategories].sort(bySortOrder).map((c) => ({
    ...c,
    product_count: rawProjects.filter((p) => p.category_id === c.id).length,
  }))
}

export function getCategoryBySlug(slug: string): Category | null {
  return getCategories().find((c) => c.slug === slug) ?? null
}

// =====================================================
// DỰ ÁN
// =====================================================
export function getProjects(opts?: { category?: string; q?: string }): Project[] {
  const cat = opts?.category?.trim()
  const q = opts?.q?.trim().toLowerCase()

  return allProjects.filter((p) => {
    if (cat && p.category_slug !== cat) return false
    if (q) {
      const haystack = [p.name, p.short_desc, p.status, p.category_name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}

export function getProjectBySlug(slug: string): Project | null {
  return allProjects.find((p) => p.slug === slug) ?? null
}

export function getFeaturedProjects(limit = 6): Project[] {
  return allProjects.filter((p) => p.is_featured).slice(0, limit)
}

export function getRelatedProjects(p: Project, limit = 3): Project[] {
  return allProjects.filter((r) => r.id !== p.id && r.category_id === p.category_id).slice(0, limit)
}

export function getAllProjectSlugs(): string[] {
  return allProjects.map((p) => p.slug)
}
