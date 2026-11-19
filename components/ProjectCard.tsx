import Link from 'next/link'
import type { Project } from '@/lib/types'
import Img from '@/components/Img'

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/du-an/${p.slug}`} className="project-card" aria-label={p.name}>
      <div className="project-thumb">
        <Img src={p.cover_image} alt={p.name} />
        {p.status && <span className="project-badge">{p.status}</span>}
      </div>
      <div className="project-info">
        {p.category_name && <span className="style">{p.category_name}</span>}
        <h3>{p.name}</h3>
        {p.short_desc && <p className="desc">{p.short_desc}</p>}
        {/* Chỉ hiện ở dạng danh sách trên mobile (badge trên ảnh bị ẩn) */}
        {p.status && <span className="project-status">{p.status}</span>}
      </div>
    </Link>
  )
}
