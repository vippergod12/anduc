import Link from 'next/link'
import { SITE_NAME, SITE_DESCRIPTION, ADDRESS, EMAIL, HOTLINE, ZALO_URL } from '@/lib/seo/siteConfig'
import { getCategories, services, site } from '@/lib/data'
import LogoMark from '@/components/Logo'

export default function Footer() {
  const year = new Date().getFullYear()
  const serviceLinks = services.packs.map((p) => ({
    href: `/dich-vu#${p.id}`,
    label: p.title.replace(/^\d+\s*—\s*/, ''),
  }))
  const spaceLinks = getCategories()
    .slice(0, 5)
    .map((c) => ({ href: `/danh-muc/${c.slug}`, label: c.name }))

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="brand">
            <div className="logo" style={{ color: 'var(--cream-50)', marginBottom: 18 }}>
              <LogoMark accentColor="var(--gold-300)" subColor="var(--cream-200)" />
            </div>
            <p>{SITE_DESCRIPTION}</p>

            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              <a className="btn btn-gold btn-sm" href={ZALO_URL} target="_blank" rel="noopener">
                {site.footer.zaloButton}
              </a>
              <a
                className="btn btn-outline btn-sm"
                href={`tel:${HOTLINE}`}
                style={{ color: 'var(--cream-50)', borderColor: 'rgba(255,255,255,.2)' }}
              >
                {site.footer.callPrefix} {HOTLINE}
              </a>
            </div>
          </div>

          <div>
            <h4>{site.footer.servicesTitle}</h4>
            <ul>
              {serviceLinks.slice(0, 5).map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{site.footer.spacesTitle}</h4>
            <ul>
              {spaceLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{site.footer.contactTitle}</h4>
            <ul>
              <li>{ADDRESS}</li>
              <li>
                <a href={`tel:${HOTLINE}`}>{HOTLINE}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <a href={ZALO_URL} target="_blank" rel="noopener">
                  Chat Zalo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {SITE_NAME}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
