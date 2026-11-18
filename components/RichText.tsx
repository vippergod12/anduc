import { Fragment, type CSSProperties } from 'react'

const DEFAULT_EM: CSSProperties = { fontStyle: 'italic', color: 'var(--gold-600)' }

/**
 * Hiển thị chuỗi từ JSON với 2 cú pháp đơn giản:
 * - `*chữ nhấn*`  → <em> (in nghiêng, màu vàng)
 * - `\n`          → xuống dòng (<br />)
 *
 * `emStyle = null` để dùng style <em> mặc định của CSS (vd: hero).
 */
export default function RichText({
  text,
  emStyle = DEFAULT_EM,
}: {
  text: string
  emStyle?: CSSProperties | null
}) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(/(\*[^*]+\*)/g).map((part, pi) =>
            part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
              <em key={pi} style={emStyle ?? undefined}>
                {part.slice(1, -1)}
              </em>
            ) : (
              <Fragment key={pi}>{part}</Fragment>
            )
          )}
        </Fragment>
      ))}
    </>
  )
}
