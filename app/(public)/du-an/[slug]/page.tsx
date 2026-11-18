import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getRelatedProjects, getAllProjectSlugs } from '@/lib/data'
import { SITE_NAME, SITE_URL } from '@/lib/seo/siteConfig'
import { breadcrumbJsonLd, projectJsonLd } from '@/lib/seo/jsonld'
import { zaloLinkFor, zaloMessageForProject } from '@/lib/utils/zalo'
import { formatArea, formatYear } from '@/lib/utils/format'
import ProjectCard from '@/components/ProjectCard'
import Img from '@/components/Img'

type Params = { params: { slug: string } }

// Chỉ build các slug có trong data/projects.json; slug khác → 404
export const dynamicParams = false

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const p = getProjectBySlug(params.slug)
  if (!p) return { title: 'Không tìm thấy dự án' }
  const title = `${p.name}${p.style ? ` — ${p.style}` : ''}`
  const desc = p.short_desc || p.long_desc?.slice(0, 160) || `${p.name} — ${SITE_NAME}`
  return {
    title,
    description: desc,
    alternates: { canonical: `${SITE_URL}/du-an/${p.slug}` },
    openGraph: {
      title,
      description: desc,
      type: 'article',
      url: `${SITE_URL}/du-an/${p.slug}`,
      images: p.cover_image ? [{ url: p.cover_image }] : undefined,
    },
  }
}

export default function ProjectDetail({ params }: Params) {
  const p = getProjectBySlug(params.slug)
  if (!p) notFound()

  const related = getRelatedProjects(p, 3)

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Trang chủ', url: SITE_URL },
    { name: 'Dự án', url: `${SITE_URL}/du-an` },
    { name: p.name, url: `${SITE_URL}/du-an/${p.slug}` },
  ])

  const info: { label: string; value: string }[] = [
    { label: 'Loại không gian', value: p.category_name || '' },
    { label: 'Phong cách', value: p.style || '' },
    { label: 'Diện tích', value: formatArea(p.area_sqm) },
    { label: 'Năm', value: formatYear(p.year_completed) },
    { label: 'Vị trí', value: p.location || '' },
    { label: 'Ngân sách', value: p.budget_label || '' },
  ].filter((i) => i.value)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(p)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="detail-hero">
        <Img src={p.cover_image} alt={p.name} loading="eager" />
        <div className="container">
          {p.style && <span className="style">{p.style}</span>}
          <h1>{p.name}</h1>
          <div className="meta">
            {p.location && (
              <div>
                <b>Vị trí</b>
                {p.location}
              </div>
            )}
            {p.area_sqm ? (
              <div>
                <b>Diện tích</b>
                {formatArea(p.area_sqm)}
              </div>
            ) : null}
            {p.year_completed ? (
              <div>
                <b>Năm hoàn thành</b>
                {formatYear(p.year_completed)}
              </div>
            ) : null}
            {p.budget_label && (
              <div>
                <b>Ngân sách</b>
                {p.budget_label}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-grid">
            <div className="detail-body">
              <span className="eyebrow">Lorem ipsum</span>
              <h2 style={{ marginTop: 12 }}>Lorem ipsum dolor sit amet</h2>
              <p>{p.long_desc || p.short_desc}</p>

              {p.highlights.length > 0 && (
                <>
                  <h3>Điểm nhấn nổi bật</h3>
                  <ul className="highlights-list">
                    {p.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </>
              )}

              {p.gallery.length > 0 && (
                <>
                  <h3>Album ảnh dự án</h3>
                  <div className="gallery-grid">
                    {p.gallery.map((src, i) => (
                      <Img key={i} src={src} alt={`${p.name} - ảnh ${i + 1}`} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <aside className="detail-aside">
              <h3>Thông tin dự án</h3>
              <ul>
                {info.map((i) => (
                  <li key={i.label}>
                    <span>{i.label}</span>
                    <b style={{ textAlign: 'right' }}>{i.value}</b>
                  </li>
                ))}
              </ul>

              <a
                className="btn btn-gold"
                style={{ width: '100%' }}
                href={zaloLinkFor(zaloMessageForProject(p.name))}
                target="_blank"
                rel="noopener"
              >
                Tư vấn dự án này
              </a>
              <Link href="/lien-he" className="btn btn-outline" style={{ width: '100%', marginTop: 10 }}>
                Liên hệ
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-tight" style={{ background: 'var(--cream-100)' }}>
          <div className="container">
            <div className="section-head section-head--row">
              <div>
                <span className="eyebrow">Có thể bạn quan tâm</span>
                <h2 className="section-title">Dự án liên quan</h2>
              </div>
              <Link href="/du-an" className="btn btn-outline btn-arrow">
                Xem tất cả
              </Link>
            </div>
            <div className="grid grid-3">
              {related.map((r) => (
                <ProjectCard key={r.id} p={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
