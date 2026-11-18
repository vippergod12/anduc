import Link from 'next/link'
import type { HomeData, ServiceGroup } from '@/lib/types'
import RichText from '@/components/RichText'

/** 4 nhóm dịch vụ (bảng 2×2) — nội dung: data/services.json → groups */
export default function Services({ data, groups }: { data: HomeData['services']; groups: ServiceGroup[] }) {
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

        <div className="services-grid services-grid--2">
          {groups.map((s) => (
            <Link key={s.id} href={`/dich-vu#${s.id}`} className="service-item">
              <div className="service-num">{s.num}.</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
