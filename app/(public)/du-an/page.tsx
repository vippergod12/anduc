import Link from 'next/link'
import type { Metadata } from 'next'
import { getCategories, getProjects } from '@/lib/data'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Dự án',
  description:
    'Các dự án và đề án An Đức đầu tư, nghiên cứu và phát triển trong ba lĩnh vực: sức khỏe & y tế, du lịch nghỉ dưỡng, nông nghiệp xanh.',
}

interface PageProps {
  searchParams: { category?: string; q?: string }
}

export default function ProjectsPage({ searchParams }: PageProps) {
  const activeCat = searchParams.category || ''
  const q = searchParams.q || ''
  const categories = getCategories()
  const projects = getProjects({ category: activeCat, q })

  return (
    <>
      <div className="page-header">
        <div className="container">
          <span className="eyebrow">Năng lực & dự án</span>
          <h1>Dự án</h1>
          <p>
            Các dự án và đề án An Đức đầu tư, nghiên cứu và phát triển — từ tổ hợp Medicoast tiên
            phong đến các mô hình sinh thái đang triển khai.
          </p>
        </div>
      </div>

      <section className="section-tight">
        <div className="container">
          <form className="filter-search" method="GET" action="/du-an" role="search">
            {activeCat && <input type="hidden" name="category" value={activeCat} />}
            <input
              type="search"
              name="q"
              aria-label="Tìm dự án"
              placeholder="Tìm dự án..."
              defaultValue={q}
            />
            <button type="submit" className="btn btn-primary">
              Tìm
            </button>
          </form>

          <div className="filter-bar">
            <Link href="/du-an" className={!activeCat ? 'active' : ''}>
              Tất cả
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/du-an?category=${c.slug}`}
                className={activeCat === c.slug ? 'active' : ''}
              >
                {c.name}
                <span style={{ opacity: 0.6, marginLeft: 6 }}>({c.product_count ?? 0})</span>
              </Link>
            ))}
          </div>

          {projects.length === 0 ? (
            <div className="empty">
              <strong>Không tìm thấy dự án phù hợp</strong>
              Vui lòng thử từ khóa khác hoặc{' '}
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
