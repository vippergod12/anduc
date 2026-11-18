import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 560 }}>
        <span className="eyebrow" style={{ justifyContent: 'center' }}>
          404
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}>Không tìm thấy trang</h1>
        <p style={{ color: 'var(--ink-600)' }}>
          Trang bạn truy cập có thể đã bị xoá, đổi đường dẫn hoặc chưa từng tồn tại.
        </p>
        <Link href="/" className="btn btn-primary btn-arrow" style={{ marginTop: 16 }}>
          Quay về trang chủ
        </Link>
      </div>
    </section>
  )
}
