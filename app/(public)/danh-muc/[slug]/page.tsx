import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getProjects, getCategories } from '@/lib/data'
import { SITE_URL } from '@/lib/seo/siteConfig'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import ProjectCard from '@/components/ProjectCard'
import PillarIcon from '@/components/PillarIcon'

type Params = { params: { slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const c = getCategoryBySlug(params.slug)
  if (!c) return { title: 'Không tìm thấy lĩnh vực' }
  return {
    title: `Lĩnh vực ${c.name}`,
    description: c.description,
    alternates: { canonical: `${SITE_URL}/danh-muc/${c.slug}` },
  }
}

// Trang lĩnh vực — nội dung: data/categories.json + dự án có category_id tương ứng
export default function CategoryPage({ params }: Params) {
  const c = getCategoryBySlug(params.slug)
  if (!c) notFound()

  const projects = getProjects({ category: c.slug })
  const categories = getCategories()

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Trang chủ', url: SITE_URL },
    { name: 'Dự án', url: `${SITE_URL}/du-an` },
    { name: c.name, url: `${SITE_URL}/danh-muc/${c.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="page-header" style={{ position: 'relative', overflow: 'hidden' }}>
        {c.image_url && (
          <img
            src={c.image_url}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }}
          />
        )}
        <div className="container" style={{ position: 'relative' }}>
          <span className="focus-icon focus-icon--static">
            <PillarIcon name={c.icon} size={26} />
          </span>
          <span className="eyebrow" style={{ display: 'flex', marginTop: 16 }}>
            Lĩnh vực · {c.en}
          </span>
          <h1>{c.name}</h1>
          <p>{c.description}</p>
          {c.tags.length > 0 && (
            <ul className="tag-row">
              {c.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <section className="section-tight">
        <div className="container">
          <div className="filter-bar">
            <Link href="/du-an">Tất cả</Link>
            {categories.map((cc) => (
              <Link key={cc.id} href={`/danh-muc/${cc.slug}`} className={cc.slug === c.slug ? 'active' : ''}>
                {cc.name}
              </Link>
            ))}
          </div>

          {projects.length === 0 ? (
            <div className="empty">
              <strong>Chưa có dự án trong lĩnh vực này</strong>
              Thêm dự án có <code>category_id: {c.id}</code> vào <code>data/projects.json</code>, hoặc{' '}
              <Link href="/du-an" style={{ color: 'var(--gold-600)' }}>
                xem tất cả dự án
              </Link>
              .
            </div>
          ) : (
            <div className="grid grid-3 m-list">
              {projects.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
