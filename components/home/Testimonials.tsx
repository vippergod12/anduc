import type { HomeData } from '@/lib/types'
import RichText from '@/components/RichText'

export default function Testimonials({ data }: { data: HomeData['testimonials'] }) {
  return (
    <section className="section" style={{ background: 'var(--cream-100)' }}>
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className="section-title">
            <RichText text={data.title} />
          </h2>
        </div>

        <div className="grid grid-3">
          {data.items.map((t, i) => (
            <div key={i} className="card" style={{ padding: 32 }}>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 72,
                  fontWeight: 600,
                  lineHeight: 0.5,
                  color: 'var(--gold-400)',
                  marginBottom: 12,
                }}
              >
                “
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  color: 'var(--ink-800)',
                  fontSize: '1.08rem',
                  lineHeight: 1.65,
                  margin: '8px 0 24px',
                }}
              >
                {t.quote}
              </p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                <strong style={{ display: 'block', color: 'var(--ink-900)' }}>{t.name}</strong>
                <span style={{ color: 'var(--ink-500)', fontSize: 13 }}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
