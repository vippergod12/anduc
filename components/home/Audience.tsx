import type { HomeData } from '@/lib/types'
import RichText from '@/components/RichText'

/** "Chuyên môn của chúng tôi dành cho ai" — grid 3 khối nổi */
export default function Audience({ data }: { data: HomeData['audience'] }) {
  return (
    <section className="section" style={{ background: 'var(--cream-100)' }}>
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className="section-title">
            <RichText text={data.title} />
          </h2>
          {data.lead && <p className="section-lead">{data.lead}</p>}
        </div>

        <ol className="audience-grid">
          {data.items.map((it, i) => (
            <li key={it.title} className="audience-card">
              <span className="audience-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
