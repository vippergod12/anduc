import Link from 'next/link'
import type { Category, HomeData } from '@/lib/types'
import Img from '@/components/Img'
import PillarIcon from '@/components/PillarIcon'
import RichText from '@/components/RichText'

/** "Lĩnh vực trọng tâm" — 3 lĩnh vực từ data/categories.json */
export default function FocusAreas({ data, categories }: { data: HomeData['focus']; categories: Category[] }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head section-head--row">
          <div>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className="section-title">
              <RichText text={data.title} />
            </h2>
            {data.lead && <p className="section-lead">{data.lead}</p>}
          </div>
          <Link href={data.cta.href} className="btn btn-outline btn-arrow">
            {data.cta.label}
          </Link>
        </div>

        <div className="grid grid-3 m-carousel">
          {categories.map((c) => (
            <Link key={c.id} href={`/danh-muc/${c.slug}`} className="focus-card">
              <div className="focus-thumb">
                <Img src={c.image_url} alt={c.name} />
                <span className="focus-icon">
                  <PillarIcon name={c.icon} size={24} />
                </span>
              </div>
              <div className="focus-body">
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <span className="focus-more">
                  {data.detailLabel} <span aria-hidden="true">›</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
