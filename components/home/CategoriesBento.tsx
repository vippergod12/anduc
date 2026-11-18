import Link from 'next/link'
import type { Category, HomeData } from '@/lib/types'
import Img from '@/components/Img'
import RichText from '@/components/RichText'

export default function CategoriesBento({
  data,
  categories,
}: {
  data: HomeData['categories']
  categories: Category[]
}) {
  const top5 = categories.slice(0, 5)
  const cls = ['b-1', 'b-2', 'b-3', 'b-4', 'b-5']

  return (
    <section className="section" style={{ background: 'var(--cream-100)' }}>
      <div className="container">
        <div className="section-head section-head--row">
          <div>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className="section-title">
              <RichText text={data.title} />
            </h2>
            {data.lead && <p className="section-lead">{data.lead}</p>}
          </div>
        </div>

        <div className="bento">
          {top5.map((c, i) => (
            <Link key={c.id} href={`/danh-muc/${c.slug}`} className={cls[i]}>
              <Img src={c.image_url} alt={c.name} />
              <div className="meta">
                <span>
                  {c.product_count ?? 0} {data.countSuffix}
                </span>
                <strong>{c.name}</strong>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
