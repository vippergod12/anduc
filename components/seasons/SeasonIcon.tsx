export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter']

/** Icon nhỏ cho từng mùa — dùng currentColor để đổi màu theo CSS */
export default function SeasonIcon({ season, size = 20 }: { season: Season; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: false,
  } as const

  switch (season) {
    case 'spring':
      // Hoa 5 cánh (mai / đào)
      return (
        <svg {...common} fill="currentColor">
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse key={deg} cx="12" cy="6.6" rx="3.4" ry="4.6" transform={`rotate(${deg} 12 12)`} opacity="0.9" />
          ))}
          <circle cx="12" cy="12" r="2.4" fill="#fff" opacity="0.85" />
        </svg>
      )
    case 'summer':
      // Mặt trời
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <path key={deg} d="M12 2.5v2.6" transform={`rotate(${deg} 12 12)`} />
          ))}
        </svg>
      )
    case 'autumn':
      // Chiếc lá
      return (
        <svg {...common} fill="currentColor">
          <path d="M19.5 4.5C12 4 5.5 8 5 15.5c-.1 1.4.2 2.7.6 3.6.9-3.8 3.6-7.3 7.4-9.3-3 2.4-5.2 5.6-6 9.4 1 .5 2.2.7 3.5.6 7.2-.6 10-7.8 9-15.3Z" />
        </svg>
      )
    case 'winter':
      // Bông tuyết
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          {[0, 60, 120].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 12 12)`}>
              <path d="M12 2.5v19" />
              <path d="M9.4 4.6 12 6.8l2.6-2.2M9.4 19.4 12 17.2l2.6 2.2" />
            </g>
          ))}
        </svg>
      )
  }
}
