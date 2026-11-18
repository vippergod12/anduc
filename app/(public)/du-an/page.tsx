import Link from 'next/link'
import type { Metadata } from 'next'
import { getCategories, getProjects } from '@/lib/data'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Dự án',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
          <span className="eyebrow">Lorem ipsum</span>
          <h1>Lorem ipsum dolor sit</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <section className="section-tight">
        <div className="container">
          <form className="filter-search" method="GET" action="/du-an">
            {activeCat && <input type="hidden" name="category" value={activeCat} />}
            <input
              type="search"
              name="q"
              placeholder="Tìm theo tên dự án, vị trí, phong cách..."
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
              <strong>Chưa có dự án nào</strong>
              Vui lòng thử bộ lọc khác hoặc{' '}
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
