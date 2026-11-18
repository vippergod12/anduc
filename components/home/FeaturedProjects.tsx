import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import RichText from '@/components/RichText'
import type { HomeData, Project } from '@/lib/types'

export default function FeaturedProjects({
  data,
  projects,
}: {
  data: HomeData['featured']
  projects: Project[]
}) {
  if (!projects.length) return null
  return (
    <section className="section">
      <div className="container">
        <div className="section-head section-head--row">
          <div>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className="section-title">
              <RichText text={data.title} />
            </h2>
          </div>
          <Link href={data.cta.href} className="btn btn-outline btn-arrow">
            {data.cta.label}
          </Link>
        </div>

        <div className="grid grid-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
