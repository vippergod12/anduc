import Link from 'next/link'
import type { HomeData } from '@/lib/types'
import Img from '@/components/Img'
import RichText from '@/components/RichText'

export default function Hero({ data }: { data: HomeData['hero'] }) {
  // Ảnh nền: data/home.json → hero.image (để "" sẽ hiện khung trống)
  const image = data.image

  return (
    <section className="hero">
      <div className="hero-bg">
        <Img src={image} alt="" loading="eager" />
      </div>

      <div className="container">
        <div className="hero-content">
          <span className="hero-eyebrow">{data.eyebrow}</span>
          <h1>
            <RichText text={data.title} emStyle={null} />
          </h1>
          <p className="hero-lead">{data.lead}</p>

          <div className="hero-actions">
            <Link href={data.primaryCta.href} className="btn btn-gold btn-arrow">
              {data.primaryCta.label}
            </Link>
            <Link
              href={data.secondaryCta.href}
              className="btn btn-outline"
              style={{ color: 'var(--cream-50)', borderColor: 'rgba(255,255,255,.3)' }}
            >
              {data.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-meta">
        {data.stats.map((s, i) => (
          <div key={i}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
