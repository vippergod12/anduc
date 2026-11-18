import { Fragment } from 'react'
import type { Metadata } from 'next'
import { ADDRESS, EMAIL, PHONES, ZALO_URL, telHref } from '@/lib/seo/siteConfig'
import { contact } from '@/lib/data'
import Img from '@/components/Img'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: contact.header.lead,
}

/** Giá trị của từng dòng thông tin — lấy từ data/site.json → contact */
function renderValue(type: string) {
  switch (type) {
    case 'address':
      return ADDRESS
    case 'phone':
      return PHONES.map((p, i) => (
        <Fragment key={p}>
          {i > 0 && ' – '}
          <a href={telHref(p)}>{p}</a>
        </Fragment>
      ))
    case 'email':
      return <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    default:
      return null
  }
}

// Nội dung trang: data/contact.json (+ thông tin liên hệ trong data/site.json)
export default function ContactPage() {
  const { header, formTitle, info, zaloLabel, promo, form } = contact
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
                <h3 style={{ marginBottom: 20 }}>{info.title}</h3>
                <ul className="contact-info">
                  {info.items.map((item) => (
                    <li key={item.type}>
                      <Img src={item.icon} alt={item.label} className="contact-info-icon" />
                      <div>
                        <strong>{item.label}</strong>
                        <span>{renderValue(item.type)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
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
