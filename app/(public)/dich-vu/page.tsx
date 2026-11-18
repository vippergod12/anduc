import type { Metadata } from 'next'
import Link from 'next/link'
import { home, services } from '@/lib/data'
import RichText from '@/components/RichText'
import CtaBlock from '@/components/CtaBlock'

export const metadata: Metadata = {
  title: 'Dịch vụ tư vấn',
  description: services.header.lead,
}

// Nội dung trang: data/services.json (lộ trình dùng chung với data/home.json → process)
export default function ServicesPage() {
  const { header, lines, groups, roadmap, deliverables } = services
  const steps = home.process.steps

  return (
    <>
      <div className="page-header">
        <div className="container">
          <span className="eyebrow">{header.eyebrow}</span>
          <h1>{header.title}</h1>
          {header.lead && <p>{header.lead}</p>}
        </div>
      </div>

      {/* Hai mảng tư vấn */}
      <section className="section-tight">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 20 }}>
            {lines.eyebrow}
          </p>
          <div className="grid grid-2 svc-lines">
            {lines.items.map((l) => (
              <Link key={l.title} href={l.href} className="svc-line">
                <h2>{l.title}</h2>
                <p>{l.desc}</p>
                <span className="svc-line-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 nhóm dịch vụ */}
      <section className="section-tight">
        <div className="container">
          <ol className="svc-groups">
            {groups.map((g) => (
              <li key={g.id} id={g.id} className="svc-group">
                <span className="svc-group-num">{g.num}</span>
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Lộ trình hợp tác */}
      <section className="section" style={{ background: 'var(--cream-100)' }}>
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">{roadmap.eyebrow}</span>
            <h2 className="section-title">
              <RichText text={roadmap.title} />
            </h2>
          </div>
          <ol className="svc-roadmap">
            {steps.map((s, i) => (
              <li key={s.num}>
                <span className="svc-roadmap-dot" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="svc-roadmap-step">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sản phẩm bàn giao */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">{deliverables.eyebrow}</span>
            <h2 className="section-title">
              <RichText text={deliverables.title} />
            </h2>
          </div>
          <div className="grid grid-3">
            {deliverables.items.map((d, i) => (
              <div key={d.title} className="card svc-deliverable">
                <span className="svc-deliverable-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{d.title}</h3>
                {d.desc && <p>{d.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  )
}
