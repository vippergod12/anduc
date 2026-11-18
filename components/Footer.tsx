import Link from 'next/link'
import { EMAILS, HOTLINE, PHONES, ZALO_URL, telHref } from '@/lib/seo/siteConfig'
import { getCategories, site } from '@/lib/data'
import LogoMark from '@/components/Logo'

// Nội dung footer: data/site.json → footer, contact
export default function Footer() {
  const { footer } = site
  const focusLinks = getCategories().map((c) => ({ href: `/danh-muc/${c.slug}`, label: c.name }))

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="brand">
            <div className="logo" style={{ color: 'var(--cream-50)', marginBottom: 18 }}>
              <LogoMark accentColor="var(--gold-300)" subColor="var(--cream-200)" />
            </div>
            <p style={{ fontWeight: 600, color: 'var(--cream-50)', letterSpacing: '0.04em', marginBottom: 8 }}>
              {footer.title}
            </p>
            {footer.lines.map((line) => (
              <p key={line} style={{ margin: '0 0 4px' }}>
                {line}
              </p>
            ))}

            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              <a className="btn btn-gold btn-sm" href={ZALO_URL} target="_blank" rel="noopener">
                {footer.zaloButton}
              </a>
              <a
                className="btn btn-outline btn-sm"
                href={telHref(HOTLINE)}
                style={{ color: 'var(--cream-50)', borderColor: 'rgba(255,255,255,.2)' }}
              >
                {footer.callPrefix} {HOTLINE}
              </a>
            </div>
          </div>

          <div>
            <h4>{footer.companyTitle}</h4>
            <ul>
              {footer.companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{footer.focusTitle}</h4>
            <ul>
              {focusLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{footer.contactTitle}</h4>
            <ul>
              <li>{site.contact.person}</li>
              <li>{site.contact.address}</li>
              {PHONES.map((p) => (
                <li key={p}>
                  <a href={telHref(p)}>{p}</a>
                </li>
              ))}
              {EMAILS.map((e) => (
                <li key={e}>
                  <a href={`mailto:${e}`}>{e}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {footer.copyright}
          </span>
        </div>
      </div>
    </footer>
  )
}
