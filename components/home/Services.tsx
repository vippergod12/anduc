import Link from 'next/link'
import type { HomeData } from '@/lib/types'
import RichText from '@/components/RichText'

export default function Services({ data }: { data: HomeData['services'] }) {
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

        <div className="services-grid">
          {data.items.map((s) => (
            <Link key={s.num} href={s.href} className="service-item">
              <div className="service-num">— {s.num}</div>
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
