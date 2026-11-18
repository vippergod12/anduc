'use client'

import { useState } from 'react'
import { zaloLinkFor } from '@/lib/utils/zalo'
import type { ContactData } from '@/lib/types'

export default function ContactForm({ form }: { form: ContactData['form'] }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState(form.spaceTypes[0] ?? '')
  const [style, setStyle] = useState('')
  const [area, setArea] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `${form.zaloGreeting}
- Họ tên: ${name}
- SĐT: ${phone}
- Email: ${email}
- Loại không gian: ${type}
- Phong cách: ${style}
- Diện tích: ${area} m²
- Yêu cầu: ${message}`
    window.open(zaloLinkFor(body), '_blank')
    setSent(true)
  }

  if (sent) {
    return (
      <div className="card" style={{ padding: 32, background: 'var(--cream-100)', borderColor: 'var(--gold-300)' }}>
        <h3>{form.successTitle}</h3>
        <p style={{ color: 'var(--ink-700)' }}>{form.successText}</p>
        <button className="btn btn-outline" onClick={() => setSent(false)}>
          Gửi yêu cầu khác
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-name">Họ và tên *</label>
          <input id="cf-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Lorem Ipsum" />
        </div>
        <div className="form-field">
          <label htmlFor="cf-phone">Số điện thoại *</label>
          <input
            id="cf-phone"
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0900 000 000"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="lorem@ipsum.com"
          />
        </div>
        <div className="form-field">
          <label htmlFor="cf-type">Loại không gian</label>
          <select id="cf-type" value={type} onChange={(e) => setType(e.target.value)}>
            {form.spaceTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-area">Diện tích (m²)</label>
          <input id="cf-area" type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="80" />
        </div>
        <div className="form-field">
          <label htmlFor="cf-style">Phong cách yêu thích</label>
          <select id="cf-style" value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="">— Chọn phong cách —</option>
            {form.styles.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-field" style={{ marginBottom: 16 }}>
        <label htmlFor="cf-message">Mô tả chi tiết yêu cầu</label>
        <textarea
          id="cf-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Lorem ipsum dolor sit amet..."
        />
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        {form.submitLabel}
      </button>
      {form.note && (
        <p className="muted" style={{ fontSize: 12, marginTop: 12, textAlign: 'center' }}>
          {form.note}
        </p>
      )}
    </form>
  )
}
