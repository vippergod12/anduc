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
  const accent: CSSProperties | undefined = accentColor ? { color: accentColor } : undefined
  const sub: CSSProperties | undefined = subColor ? { color: subColor } : undefined
  return (
    <>
      <span>
        {logo.text}
        <b style={accent}>{logo.accent}</b>
      </span>
      <small style={sub}>{logo.sub}</small>
    </>
  )
}
