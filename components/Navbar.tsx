'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { HOTLINE, NAV_LINKS, SITE_NAME, ZALO_URL, telHref } from '@/lib/seo/siteConfig'
import siteJson from '@/data/site.json'
import LogoMark from '@/components/Logo'

export default function Navbar() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const { navCta } = siteJson

  useEffect(() => setMounted(true), [])

  // Đóng menu khi chuyển trang
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Khoá cuộn trang + ẩn nút nổi khi menu mở; Esc để đóng; quản lý focus
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.body.classList.toggle('menu-open', open)
    if (!open) return

    // Đưa focus vào khung menu (không vào link đầu để tránh viền focus trông như "đang chọn")
    menuRef.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }, [open])

  // Đóng menu nếu xoay/phóng màn hình lên khổ desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

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

  // Menu di động render thẳng vào <body>: .navbar có backdrop-filter nên
  // position: fixed bên trong sẽ bị giới hạn trong khung navbar.
  const mobileMenu = (
    <div
      id="mobile-menu"
      ref={menuRef}
      className={`mobile-menu ${open ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu điều hướng"
      tabIndex={-1}
    >
      <nav className="mobile-menu-nav" aria-label="Điều hướng chính">
        <ol>
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} style={{ '--i': i } as React.CSSProperties}>
              <Link
                href={l.href}
                className={isActive(l.href) ? 'active' : ''}
                aria-current={isActive(l.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-menu-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{l.label}</span>
                <span className="mobile-menu-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mobile-menu-foot">
        <Link href="/lien-he" className="btn btn-gold" onClick={() => setOpen(false)}>
          {navCta.primary}
        </Link>
        <div className="mobile-menu-row">
          <a className="btn btn-outline" href={ZALO_URL} target="_blank" rel="noopener">
            {navCta.secondary}
          </a>
          <a className="btn btn-outline" href={telHref(HOTLINE)}>
            Gọi {HOTLINE}
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${open ? 'menu-is-open' : ''}`}>
      <div className="container navbar-inner">
        <Link href="/" className="logo" aria-label={SITE_NAME}>
          <LogoMark />
        </Link>

        <nav aria-label="Điều hướng chính">
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={isActive(l.href) ? 'active' : ''}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                >
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
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
              {open ? (
                <path d="M3 1 L17 13 M3 13 L17 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

      {mounted && createPortal(mobileMenu, document.body)}
    </header>
  )
}
