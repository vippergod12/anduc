import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getProjects, getCategories } from '@/lib/data'
import { SITE_NAME, SITE_URL } from '@/lib/seo/siteConfig'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import ProjectCard from '@/components/ProjectCard'

type Params = { params: { slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const c = getCategoryBySlug(params.slug)
  if (!c) return { title: 'Không tìm thấy danh mục' }
  return {
    title: c.name,
    description: c.description || `${c.name} — ${SITE_NAME}`,
    alternates: { canonical: `${SITE_URL}/danh-muc/${c.slug}` },
  }
}

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
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.15,
            }}
          />
        )}
        <div className="container" style={{ position: 'relative' }}>
          <span className="eyebrow">Danh mục</span>
          <h1>{c.name}</h1>
          {c.description && <p>{c.description}</p>}
        </div>
      </div>

      <section className="section-tight">
        <div className="container">
          <div className="filter-bar">
            <Link href="/du-an">Tất cả</Link>
            {categories.map((cc) => (
              <Link
                key={cc.id}
                href={`/danh-muc/${cc.slug}`}
                className={cc.slug === c.slug ? 'active' : ''}
              >
                {cc.name}
              </Link>
            ))}
          </div>

          {projects.length === 0 ? (
            <div className="empty">
              <strong>Chưa có dự án nào trong danh mục này</strong>
              Thêm dự án có <code>category_id: {c.id}</code> vào <code>data/projects.json</code>, hoặc{' '}
              <Link href="/du-an" style={{ color: 'var(--gold-600)' }}>
                xem tất cả dự án
              </Link>
              .
            </div>
          ) : (
            <div className="grid grid-3">
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
