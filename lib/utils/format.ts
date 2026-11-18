export function formatArea(sqm?: number | null): string {
  if (!sqm) return ''
  return `${sqm} m²`
}

export function formatYear(y?: number | null): string {
  if (!y) return ''
  return `${y}`
}
