'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_LINKS, SITE_NAME, ZALO_URL } from '@/lib/seo/siteConfig'
import siteJson from '@/data/site.json'
import LogoMark from '@/components/Logo'

export default function Navbar() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { navCta } = siteJson

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link href="/" className="logo" aria-label={SITE_NAME}>
          <LogoMark />
        </Link>

        <nav>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={isActive(l.href) ? 'active' : ''}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-cta">
          <a className="btn btn-outline btn-sm" href={ZALO_URL} target="_blank" rel="noopener">
            {navCta.secondary}
          </a>
          <Link href="/lien-he" className="btn btn-primary btn-sm always-show">
            {navCta.primary}
          </Link>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen((s) => !s)}
            aria-label="Mở menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              {open ? (
                <path
                  d="M2 2 L18 12 M2 12 L18 2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path d="M2 1 H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M2 7 H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M2 13 H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a className="btn btn-outline" href={ZALO_URL} target="_blank" rel="noopener">
            {navCta.secondary}
          </a>
          <Link href="/lien-he" className="btn btn-primary">
            {navCta.primary}
          </Link>
        </div>
      </div>
    </header>
  )
}
