import Link from 'next/link'
import type { Project } from '@/lib/types'
import { formatArea, formatYear } from '@/lib/utils/format'
import Img from '@/components/Img'

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/du-an/${p.slug}`} className="project-card" aria-label={p.name}>
      <div className="project-thumb">
        <Img src={p.cover_image} alt={p.name} />
        {p.is_featured && <span className="project-badge">Nổi bật</span>}
      </div>
      <div className="project-info">
        {p.style && <span className="style">{p.style}</span>}
        <h3>{p.name}</h3>
        {p.short_desc && <p className="desc">{p.short_desc}</p>}

        <div className="project-meta">
          {p.area_sqm ? (
            <span>
              Diện tích <b>{formatArea(p.area_sqm)}</b>
            </span>
          ) : null}
          {p.year_completed ? (
            <span>
              Năm <b>{formatYear(p.year_completed)}</b>
            </span>
          ) : null}
          {p.location ? <span title={p.location}>📍 {p.location.split(',')[0]}</span> : null}
        </div>
      </div>
    </Link>
  )
}
