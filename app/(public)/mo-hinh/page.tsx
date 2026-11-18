import type { Metadata } from 'next'
import { models } from '@/lib/data'
import RichText from '@/components/RichText'
import CtaBlock from '@/components/CtaBlock'
import Iceberg from '@/components/models/Iceberg'
import VillageWheel from '@/components/models/VillageWheel'
import './mo-hinh.css'

export const metadata: Metadata = {
  title: 'Mô hình & triết lý',
  description: models.header.lead,
}

// Nội dung trang: data/models.json
export default function ModelsPage() {
  const { header, iceberg, village } = models

  return (
    <>
      <div className="page-header">
        <div className="container">
          <span className="eyebrow">{header.eyebrow}</span>
          <h1>{header.title}</h1>
          {header.lead && <p>{header.lead}</p>}
        </div>
      </div>

      {/* Mô hình 1 — Tảng băng trôi */}
      <section className="section mh-section" aria-labelledby="mh-iceberg-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{iceberg.eyebrow}</span>
            <h2 id="mh-iceberg-title" className="section-title">
              <RichText text={iceberg.title} />
            </h2>
            {iceberg.lead && <p className="section-lead">{iceberg.lead}</p>}
          </div>

          <Iceberg layers={iceberg.layers} hint={iceberg.hint} />

          <blockquote className="mh-banner">
            <p>“{iceberg.banner}”</p>
            <footer>{iceberg.bannerSub}</footer>
          </blockquote>
        </div>
      </section>

      {/* Mô hình 2 — Làng sinh thái lõi */}
      <section className="section mh-section mh-section--alt" aria-labelledby="mh-village-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{village.eyebrow}</span>
            <h2 id="mh-village-title" className="section-title">
              <RichText text={village.title} />
            </h2>
            {village.lead && <p className="section-lead">{village.lead}</p>}
          </div>

          <VillageWheel stages={village.stages} center={village.center} hint={village.hint} />
        </div>
      </section>

      <CtaBlock />
    </>
  )
}
