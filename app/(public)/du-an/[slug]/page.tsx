import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getRelatedProjects, getAllProjectSlugs } from '@/lib/data'
import { SITE_NAME, SITE_URL } from '@/lib/seo/siteConfig'
import { breadcrumbJsonLd, projectJsonLd } from '@/lib/seo/jsonld'
import { zaloLinkFor, zaloMessageForProject } from '@/lib/utils/zalo'
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
  const desc = p.short_desc || `${p.name} — ${SITE_NAME}`
  return {
    title: p.name,
    description: desc,
    alternates: { canonical: `${SITE_URL}/du-an/${p.slug}` },
    openGraph: {
      title: p.name,
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

  const info = [
    { label: 'Lĩnh vực', value: p.category_name || '' },
    { label: 'Trạng thái', value: p.status },
    ...p.facts,
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
          {p.category_name && <span className="style">{p.category_name}</span>}
          <h1>{p.name}</h1>
          <div className="meta">
            {p.status && (
              <div>
                <b>Trạng thái</b>
                {p.status}
              </div>
            )}
            {p.facts.slice(0, 3).map((f) => (
              <div key={f.label}>
                <b>{f.label}</b>
                {f.value}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-grid">
            <div className="detail-body">
              <span className="eyebrow">Tổng quan dự án</span>
              <p style={{ marginTop: 16 }}>{p.long_desc || p.short_desc}</p>

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

              {p.sections.map((s) => (
                <div key={s.title}>
                  <h3>{s.title}</h3>
                  {s.text && <p>{s.text}</p>}
                  {s.items.length > 0 && (
                    <ul className="highlights-list">
                      {s.items.map((it, i) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {p.gallery.length > 0 && (
                <>
                  <h3>Hình ảnh dự án</h3>
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
                Tư vấn về dự án này
              </a>
              <Link href="/lien-he" className="btn btn-outline" style={{ width: '100%', marginTop: 10 }}>
                Đặt lịch tư vấn
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
                <span className="eyebrow">Cùng lĩnh vực</span>
                <h2 className="section-title">Dự án liên quan</h2>
              </div>
              <Link href="/du-an" className="btn btn-outline btn-arrow">
                Xem tất cả
              </Link>
            </div>
            <div className="grid grid-3 m-list">
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
