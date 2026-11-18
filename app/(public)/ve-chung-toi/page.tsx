import type { Metadata } from 'next'
import Link from 'next/link'
import { about } from '@/lib/data'
import Img from '@/components/Img'
import RichText from '@/components/RichText'

export const metadata: Metadata = {
  title: 'Về chúng tôi',
  description: about.header.lead,
}

// Nội dung trang: data/about.json
export default function AboutPage() {
  const { header, story, values, team } = about
  return (
    <>
      <div className="page-header">
        <div className="container">
          <span className="eyebrow">{header.eyebrow}</span>
          <h1>{header.title}</h1>
          {header.lead && <p>{header.lead}</p>}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="story-grid">
            <div className="story-image">
              <Img src={story.image} alt={story.eyebrow} />
            </div>
            <div>
              <span className="eyebrow">{story.eyebrow}</span>
              <h2 className="section-title">
                <RichText text={story.title} />
              </h2>
              {story.paragraphs.map((para, i) => (
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
              <Link href={story.cta.href} className="btn btn-primary btn-arrow" style={{ marginTop: 16 }}>
                {story.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream-100)' }}>
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">{values.eyebrow}</span>
            <h2 className="section-title">
              <RichText text={values.title} />
            </h2>
          </div>
          <div className="grid grid-4">
            {values.items.map((v, i) => (
              <div
                key={i}
                className="card"
                style={{ padding: 28, textAlign: 'center', background: 'var(--surface)' }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'var(--cream-200)',
                    color: 'var(--gold-600)',
                    fontFamily: 'var(--font-num)',
                    fontSize: 20,
                    fontWeight: 600,
                    fontVariantNumeric: 'lining-nums tabular-nums',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ color: 'var(--ink-600)', fontSize: 14, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">{team.eyebrow}</span>
            <h2 className="section-title">
              <RichText text={team.title} />
            </h2>
          </div>
          <div className="grid grid-4">
            {team.members.map((t, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 16px',
                    maxWidth: 220,
                    border: '4px solid var(--cream-100)',
                  }}
                >
                  <Img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    margin: '0 0 4px',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                  }}
                >
                  {t.name}
                </h3>
                <span style={{ color: 'var(--gold-600)', fontSize: 13, letterSpacing: '0.06em' }}>
                  {t.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
