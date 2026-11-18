import type { Metadata } from 'next'
import Link from 'next/link'
import { ZALO_URL } from '@/lib/seo/siteConfig'
import { services } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Dịch vụ',
  description: services.header.lead,
}

// Nội dung trang: data/services.json
export default function ServicesPage() {
  const { header, packs, note, primaryCta, zaloLabel } = services
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
          <div className="grid grid-3">
            {packs.map((p) => (
              <div key={p.id} id={p.id} className="card" style={{ padding: 32 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <h3 style={{ margin: 0 }}>{p.title}</h3>
                  <span className="pill pill-gold">{p.price}</span>
                </div>
                <p style={{ color: 'var(--ink-600)', fontSize: 14.5, marginBottom: 18 }}>{p.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {p.items.map((it, i) => (
                    <li
                      key={i}
                      style={{
                        padding: '8px 0',
                        borderTop: '1px dashed var(--border)',
                        color: 'var(--ink-700)',
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: 'var(--gold-600)', marginRight: 8 }}>✦</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 56 }}>
            {note && (
              <p className="muted" style={{ fontSize: 14, marginBottom: 16 }}>
                {note}
              </p>
            )}
            <div style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href={primaryCta.href} className="btn btn-primary btn-arrow">
                {primaryCta.label}
              </Link>
              <a href={ZALO_URL} target="_blank" rel="noopener" className="btn btn-outline">
                {zaloLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
