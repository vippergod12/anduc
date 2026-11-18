import type { Metadata } from 'next'
import { ADDRESS, EMAIL, HOTLINE, ZALO_URL } from '@/lib/seo/siteConfig'
import { contact, site } from '@/lib/data'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: contact.header.lead,
}

const labelStyle = {
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  marginBottom: 4,
}

// Nội dung trang: data/contact.json (+ thông tin liên hệ trong data/site.json)
export default function ContactPage() {
  const { header, formTitle, infoTitle, zaloLabel, promo, form } = contact
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
          <div className="story-grid" style={{ alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ marginBottom: 24 }}>{formTitle}</h2>
              <ContactForm form={form} />
            </div>

            <div>
              <div className="card" style={{ padding: 28, marginBottom: 16, background: 'var(--surface)' }}>
                <h3 style={{ marginBottom: 16 }}>{infoTitle}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <div className="muted" style={labelStyle}>
                      Văn phòng
                    </div>
                    <strong>{ADDRESS}</strong>
                  </div>
                  <div>
                    <div className="muted" style={labelStyle}>
                      Hotline
                    </div>
                    <a href={`tel:${HOTLINE}`} style={{ color: 'var(--ink-900)', fontWeight: 600 }}>
                      {HOTLINE}
                    </a>
                  </div>
                  <div>
                    <div className="muted" style={labelStyle}>
                      Email
                    </div>
                    <a href={`mailto:${EMAIL}`} style={{ color: 'var(--ink-900)', fontWeight: 600 }}>
                      {EMAIL}
                    </a>
                  </div>
                  <div>
                    <div className="muted" style={labelStyle}>
                      Giờ làm việc
                    </div>
                    <strong>{site.contact.workingHours}</strong>
                  </div>
                </div>
                <a
                  className="btn btn-gold"
                  style={{ width: '100%', marginTop: 20 }}
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener"
                >
                  {zaloLabel}
                </a>
              </div>

              <div
                className="card"
                style={{ background: 'var(--ink-900)', color: 'var(--cream-100)', padding: 28, border: 'none' }}
              >
                <h3 style={{ color: 'var(--cream-50)', marginBottom: 12 }}>{promo.title}</h3>
                <p style={{ color: 'rgba(251,248,242,.78)', fontSize: 14.5 }}>{promo.text}</p>
                <ul style={{ paddingLeft: 18, color: 'rgba(251,248,242,.78)', fontSize: 14 }}>
                  {promo.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
