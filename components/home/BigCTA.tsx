import Link from 'next/link'
import { ZALO_URL } from '@/lib/seo/siteConfig'
import type { HomeData } from '@/lib/types'
import RichText from '@/components/RichText'

export default function BigCTA({ data }: { data: HomeData['cta'] }) {
  return (
    <section className="section">
      <div className="container">
        <div className="big-cta">
          <span
            className="hero-eyebrow"
            style={{ color: 'var(--gold-300)', justifyContent: 'center' }}
          >
            {data.eyebrow}
          </span>
          <h2>
            <RichText text={data.title} emStyle={{ fontStyle: 'italic', color: 'var(--gold-300)' }} />
          </h2>
          <p>{data.text}</p>
          <div className="actions">
            <Link href={data.primaryCta.href} className="btn btn-gold btn-arrow">
              {data.primaryCta.label}
            </Link>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-outline"
              style={{ color: 'var(--cream-50)', borderColor: 'rgba(255,255,255,.3)' }}
            >
              {data.zaloLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
