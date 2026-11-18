import type { HomeData } from '@/lib/types'
import RichText from '@/components/RichText'

export default function Process({ data }: { data: HomeData['process'] }) {
  return (
    <section className="section" style={{ background: 'var(--ink-900)', color: 'var(--cream-100)' }}>
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow" style={{ color: 'var(--gold-300)' }}>
            {data.eyebrow}
          </span>
          <h2 className="section-title" style={{ color: 'var(--cream-50)' }}>
            <RichText text={data.title} emStyle={{ fontStyle: 'italic', color: 'var(--gold-300)' }} />
          </h2>
          {data.lead && (
            <p className="section-lead" style={{ color: 'rgba(251,248,242,.7)' }}>
              {data.lead}
            </p>
          )}
        </div>

        <div className="process-grid">
          {data.steps.map((s) => (
            <div
              key={s.num}
              className="process-step"
              style={{
                background: 'rgba(255,255,255,.04)',
                borderColor: 'rgba(255,255,255,.08)',
                color: 'var(--cream-100)',
              }}
            >
              <div className="step-num" style={{ color: 'var(--gold-300)' }}>
                {s.num}
              </div>
              <h3 style={{ color: 'var(--cream-50)' }}>{s.title}</h3>
              <p style={{ color: 'rgba(251,248,242,.7)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
