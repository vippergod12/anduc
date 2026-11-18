'use client'

import { useState } from 'react'
import { zaloLinkFor } from '@/lib/utils/zalo'
import type { ContactData } from '@/lib/types'

// Nhãn, placeholder, lựa chọn: data/contact.json → form
export default function ContactForm({ form }: { form: ContactData['form'] }) {
  const f = form.fields
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [channel, setChannel] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const lines = [
      form.zaloGreeting,
      `- Họ tên: ${name}`,
      `- SĐT: ${phone}`,
      email && `- Email: ${email}`,
      channel && `- ${f.channel.label}: ${channel}`,
      message && `- Nội dung: ${message}`,
    ].filter(Boolean)
    window.open(zaloLinkFor(lines.join('\n')), '_blank')
    setSent(true)
  }

  if (sent) {
    return (
      <div className="card" style={{ padding: 32, background: 'var(--cream-100)', borderColor: 'var(--gold-300)' }}>
        <h3>{form.successTitle}</h3>
        <p style={{ color: 'var(--ink-700)' }}>{form.successText}</p>
        <button className="btn btn-outline" onClick={() => setSent(false)}>
          {form.resetLabel}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-name">{f.name.label}</label>
          <input
            id="cf-name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={f.name.placeholder}
          />
        </div>
        <div className="form-field">
          <label htmlFor="cf-phone">{f.phone.label}</label>
          <input
            id="cf-phone"
            required
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={f.phone.placeholder}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-email">{f.email.label}</label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={f.email.placeholder}
          />
        </div>
        <div className="form-field">
          <label htmlFor="cf-channel">{f.channel.label}</label>
          <select id="cf-channel" value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="">{f.channel.placeholder}</option>
            {f.channel.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-field" style={{ marginBottom: 16 }}>
        <label htmlFor="cf-message">{f.message.label}</label>
        <textarea
          id="cf-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={f.message.placeholder}
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
