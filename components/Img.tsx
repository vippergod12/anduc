import type { CSSProperties } from 'react'

interface ImgProps {
  src?: string | null
  alt: string
  className?: string
  style?: CSSProperties
  loading?: 'lazy' | 'eager'
}

/**
 * Ảnh có khung trống thay thế.
 * - Có `src` → hiển thị <img> như bình thường.
 * - `src` rỗng ("") → hiển thị khung placeholder cùng kích thước.
 *
 * Gợi ý: bỏ ảnh vào /public/images rồi điền "/images/ten-anh.jpg" trong file JSON.
 */
export default function Img({ src, alt, className, style, loading = 'lazy' }: ImgProps) {
  if (src) {
    return <img src={src} alt={alt} className={className} style={style} loading={loading} />
  }

  return (
    <div
      role="img"
      aria-label={alt || 'Ảnh trống'}
      className={['img-ph', className].filter(Boolean).join(' ')}
      style={style}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="9" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3.5 17.5 9 12.5l4 3.5 3-2.5 4.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
