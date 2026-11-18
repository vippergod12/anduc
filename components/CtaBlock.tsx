import Link from 'next/link'
import { HOTLINE, telHref } from '@/lib/seo/siteConfig'
import { site } from '@/lib/data'
import RichText from '@/components/RichText'

/** Khối "Hợp tác đầu tư" dùng chung — nội dung: data/site.json → cta */
export default function CtaBlock() {
  const { cta } = site
  return (
    <section className="section">
      <div className="container">
        <div className="big-cta">
          <span className="hero-eyebrow" style={{ color: 'var(--gold-300)', justifyContent: 'center' }}>
            {cta.eyebrow}
          </span>
          <h2>
            <RichText text={cta.title} emStyle={{ fontStyle: 'italic', color: 'var(--gold-300)' }} />
          </h2>
          <p>{cta.text}</p>
          <div className="actions">
            <Link href={cta.primary.href} className="btn btn-gold btn-arrow">
              {cta.primary.label}
            </Link>
            <a
              href={telHref(HOTLINE)}
              className="btn btn-outline"
              style={{ color: 'var(--cream-50)', borderColor: 'rgba(255,255,255,.3)' }}
            >
              {cta.hotlineLabel}: {HOTLINE}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
