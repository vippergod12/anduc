import type { Metadata } from 'next'
import Link from 'next/link'
import { about, getCategories, site } from '@/lib/data'
import { HOTLINE, telHref } from '@/lib/seo/siteConfig'
import Img from '@/components/Img'
import RichText from '@/components/RichText'
import PillarIcon from '@/components/PillarIcon'
import SeasonEffects from '@/components/seasons/SeasonEffects'
import SeasonIcon, { type Season } from '@/components/seasons/SeasonIcon'
import type { SeasonHead } from '@/lib/types'
import './about.css'

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: about.hero.subtitle,
}

const ANCHORS: Record<Season, string> = {
  spring: 'mua-xuan',
  summer: 'mua-ha',
  autumn: 'mua-thu',
  winter: 'mua-dong',
}

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

/** Phần đầu mỗi mùa: nhãn mùa + tiêu đề + mô tả */
function SeasonHeader({ season, index, head }: { season: Season; index: number; head: SeasonHead }) {
  return (
    <header className="ab-season-head ab-reveal">
      <span className="ab-badge">
        <SeasonIcon season={season} size={18} />
        <span>
          {head.label} · {head.eyebrow || head.theme}
        </span>
        <span className="ab-badge-num">{String(index).padStart(2, '0')} / 04</span>
      </span>
      <h2 id={`${ANCHORS[season]}-title`}>
        <RichText text={head.title} emStyle={null} />
      </h2>
      {head.lead && <p className="ab-lead">{head.lead}</p>}
    </header>
  )
}

// Nội dung trang: data/about.json (+ categories.json cho Ba trụ cột, site.json → cta)
export default function AboutPage() {
  const { hero, spring, summer, autumn, winter, partners } = about
  const pillars = getCategories()
  const { cta } = site
  const journey: { season: Season; head: SeasonHead }[] = [
    { season: 'spring', head: { ...spring, theme: 'Câu chuyện & đội ngũ' } },
    { season: 'summer', head: { ...summer, theme: 'Ba trụ cột cốt lõi' } },
    { season: 'autumn', head: { ...autumn, theme: 'Giá trị' } },
    { season: 'winter', head: { ...winter, theme: 'Đồng hành toàn diện' } },
  ]

  return (
    <div className="ab-page" data-season-root>
      <SeasonEffects />

      {/* ============ HERO ============ */}
      <section
        className="ab-hero season-spring"
        data-season="spring"
        data-season-theme="Giới thiệu"
        aria-labelledby="ab-title"
      >
        <div className="container">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="ab-title">
            <RichText text={hero.title} emStyle={null} />
          </h1>
          <p className="ab-hero-sub">{hero.subtitle}</p>
          <p className="ab-hero-lead">{hero.lead}</p>

          <dl className="ab-facts">
            {hero.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <nav className="ab-journey" aria-label={hero.journeyTitle}>
            <p className="ab-journey-title">{hero.journeyTitle}</p>
            <ol>
              {journey.map(({ season, head }, i) => (
                <li key={season}>
                  <a href={`#${ANCHORS[season]}`} className={`ab-journey-item season-${season}`}>
                    <span className="ab-journey-icon">
                      <SeasonIcon season={season} size={20} />
                    </span>
                    <span className="ab-journey-text">
                      <strong>{head.label}</strong>
                      <span>{head.theme}</span>
                    </span>
                    <span className="ab-journey-num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* ============ XUÂN — Câu chuyện & Đội ngũ ============ */}
      <section
        id={ANCHORS.spring}
        className="ab-season season-spring"
        data-season="spring"
        data-season-theme={spring.theme}
        aria-labelledby={`${ANCHORS.spring}-title`}
      >
        <div className="container">
          <span className="ab-badge ab-reveal">
            <SeasonIcon season="spring" size={18} />
            <span>
              {spring.label} · {spring.theme}
            </span>
            <span className="ab-badge-num">01 / 04</span>
          </span>

          <div className="ab-story">
            <h2 id={`${ANCHORS.spring}-title`} className="ab-story-title ab-reveal">
              <RichText text={spring.title} emStyle={null} />
            </h2>
            <div className="ab-story-body ab-reveal" style={delay(120)}>
              {spring.paragraphs.map((p, i) => (
                <p key={i}>
                  <RichText text={p} emStyle={null} />
                </p>
              ))}
            </div>
          </div>

          <figure className="ab-wide-media ab-reveal">
            <Img src={spring.image} alt="Hình ảnh An Đức" />
          </figure>

          <div className="ab-team">
            <div className="ab-team-head ab-reveal">
              <p className="ab-kicker">{spring.team.eyebrow}</p>
              <h3>{spring.team.title}</h3>
              <p className="ab-muted">{spring.team.text}</p>
            </div>
            <ul className="ab-team-list" aria-label={spring.team.eyebrow}>
              {spring.team.members.map((m, i) => (
                <li key={i} className="ab-member ab-reveal" style={delay(i * 80)}>
                  <div className="ab-member-photo">
                    <Img src={m.img} alt={m.name} />
                  </div>
                  <strong>{m.name}</strong>
                  <span className="ab-member-role">{m.role}</span>
                  <p>{m.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ HẠ — Ba trụ cột cốt lõi ============ */}
      <section
        id={ANCHORS.summer}
        className="ab-season season-summer"
        data-season="summer"
        data-season-theme={summer.theme}
        aria-labelledby={`${ANCHORS.summer}-title`}
      >
        <div className="container">
          <SeasonHeader season="summer" index={2} head={summer} />

          <ul className="ab-pillars-grid">
            {pillars.map((p, i) => (
              <li key={p.id} className="ab-pillar ab-reveal" style={delay(i * 100)}>
                <span className="ab-pillar-icon">
                  <PillarIcon name={p.icon} size={30} />
                </span>
                <span className="ab-pillar-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>
                  {p.name}
                  <span lang="en">{p.en}</span>
                </h3>
                <p>{p.description}</p>
                <ul className="ab-pillar-tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <Link href={`/danh-muc/${p.slug}`} className="ab-pillar-link">
                  {summer.detailLabel} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ THU — Giá trị ============ */}
      <section
        id={ANCHORS.autumn}
        className="ab-season season-autumn"
        data-season="autumn"
        data-season-theme={autumn.theme}
        aria-labelledby={`${ANCHORS.autumn}-title`}
      >
        <div className="container">
          <SeasonHeader season="autumn" index={3} head={autumn} />

          <ol className="ab-zlist">
            {autumn.values.map((v) => (
              <li key={v.num} className="ab-zrow ab-reveal">
                <figure className="ab-zmedia">
                  <Img src={v.image} alt={v.imageAlt} />
                  {!v.image && <figcaption>Gợi ý ảnh: {v.imageAlt}</figcaption>}
                </figure>
                <div className="ab-ztext">
                  <span className="ab-znum">{v.num}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                  <blockquote>“{v.quote}”</blockquote>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ ĐÔNG — Đồng hành toàn diện ============ */}
      <section
        id={ANCHORS.winter}
        className="ab-season season-winter"
        data-season="winter"
        data-season-theme={winter.theme}
        aria-labelledby={`${ANCHORS.winter}-title`}
      >
        <div className="container">
          <SeasonHeader season="winter" index={4} head={winter} />

          <ol className="ab-path">
            {winter.steps.map((s, i) => (
              <li key={s.num} className="ab-path-step ab-reveal" style={delay(i * 60)}>
                <span className="ab-path-dot" aria-hidden="true">
                  {s.num}
                </span>
                <div className="ab-path-card">
                  <span className="ab-path-label">Chặng {s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ ĐỐI TÁC + CTA — mùa xuân mới ============ */}
      <section
        className="ab-partners season-spring"
        data-season="spring"
        data-season-theme="Một mùa xuân mới"
        aria-labelledby="ab-partners-title"
      >
        <div className="container">
          <div className="ab-partners-head ab-reveal">
            <span className="ab-badge">
              <SeasonIcon season="spring" size={18} />
              <span>{partners.eyebrow}</span>
            </span>
            <h2 id="ab-partners-title">
              <RichText text={partners.title} emStyle={null} />
            </h2>
          </div>

          {partners.groups.map((g) => (
            <div key={g.label} className="ab-partner-group ab-reveal">
              <h3>{g.label}</h3>
              <ul className="ab-partner-list">
                {g.items.map((p) => {
                  const inner = (
                    <>
                      <span className="ab-partner-logo">
                        {p.logo ? <img src={p.logo} alt="" loading="lazy" /> : <Img src="" alt="" />}
                      </span>
                      <span className="ab-partner-name">{p.name}</span>
                      {p.en && (
                        <span className="ab-partner-en" lang="en">
                          {p.en}
                        </span>
                      )}
                    </>
                  )
                  return (
                    <li key={p.name}>
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noopener" className="ab-partner">
                          {inner}
                        </a>
                      ) : (
                        <div className="ab-partner">{inner}</div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          <div className="ab-cta ab-reveal">
            <p className="ab-kicker">{cta.eyebrow}</p>
            <h2>
              <RichText text={cta.title} emStyle={null} />
            </h2>
            <p>{cta.text}</p>
            <div className="ab-cta-actions">
              <Link href={cta.primary.href} className="btn btn-primary btn-arrow">
                {cta.primary.label}
              </Link>
              <a href={telHref(HOTLINE)} className="btn btn-outline">
                {cta.hotlineLabel}: {HOTLINE}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
