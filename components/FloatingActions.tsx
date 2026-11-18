import { ZALO_URL, HOTLINE } from '@/lib/seo/siteConfig'

export default function FloatingActions() {
  return (
    <div className="floating" aria-label="Liên hệ nhanh">
      <a href={ZALO_URL} target="_blank" rel="noopener" className="zalo" aria-label="Chat Zalo">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 5.94 2 10.7c0 2.74 1.5 5.18 3.86 6.78L4.7 21l4.07-2.07c1 .25 2.07.4 3.23.4 5.52 0 10-3.94 10-8.7C22 5.94 17.52 2 12 2z" />
        </svg>
      </a>
      <a href={`tel:${HOTLINE}`} className="phone" aria-label="Gọi điện">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.16.39 2.4.6 3.66.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.21 2.5.6 3.66a1 1 0 0 1-.25 1.05l-2.23 2.08z" />
        </svg>
      </a>
    </div>
  )
}
