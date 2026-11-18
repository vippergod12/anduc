import Link from 'next/link'
import type { HomeData } from '@/lib/types'
import Img from '@/components/Img'
import RichText from '@/components/RichText'

export default function Story({ data }: { data: HomeData['story'] }) {
  return (
    <section className="section story">
      <div className="container">
        <div className="story-grid">
          <div className="story-image">
            <Img src={data.image} alt={data.eyebrow} />
          </div>

          <div>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className="section-title">
              <RichText text={data.title} />
            </h2>
            {data.paragraphs.map((para, i) => (
              <p
                key={i}
                style={
                  i === 0
                    ? { color: 'var(--ink-700)', fontSize: '1.05rem' }
                    : { color: 'var(--ink-600)' }
                }
              >
                <RichText text={para} emStyle={null} />
              </p>
            ))}

            <div className="story-stats">
              {data.stats.map((s, i) => (
                <div key={i}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href={data.primaryCta.href} className="btn btn-primary btn-arrow">
                {data.primaryCta.label}
              </Link>
              <Link href={data.secondaryCta.href} className="btn btn-ghost">
                {data.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
