import siteJson from '@/data/site.json'
import type { CSSProperties } from 'react'

export default function LogoMark({
  accentColor,
  subColor,
}: {
  accentColor?: string
  subColor?: string
}) {
  const { logo } = siteJson
  // Dấu cách cuối trong logo.text (vd "AN ") được đổi thành khoảng hẹp cố định,
  // tránh bị letter-spacing của .logo kéo giãn
  const spaced = logo.text.endsWith(" ")
  const accent: CSSProperties = {
    ...(accentColor ? { color: accentColor } : {}),
    ...(spaced ? { marginLeft: "0.22em" } : {}),
  }
  const sub: CSSProperties | undefined = subColor ? { color: subColor } : undefined
  return (
    <>
      <span>
        {logo.text.trimEnd()}
        <b style={accent}>{logo.accent}</b>
      </span>
      <small style={sub}>{logo.sub}</small>
    </>
  )
}
