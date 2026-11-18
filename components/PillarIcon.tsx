/**
 * Icon cho 3 trụ cột / lĩnh vực (data/categories.json → icon)
 * - health:      thập tự y tế kết hợp khung kiến trúc
 * - tourism:     hoa sen chữa lành
 * - agriculture: mầm cây sinh thái
 */
export default function PillarIcon({ name, size = 28 }: { name: string; size?: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  }

  switch (name) {
    case 'health':
      return (
        <svg {...props}>
          <path d="M3 10.5 12 4l9 6.5" />
          <path d="M5 9.2V20h14V9.2" />
          <path d="M10.75 11.5h2.5v2.25h2.25v2.5h-2.25v2.25h-2.5v-2.25H8.5v-2.5h2.25z" />
        </svg>
      )
    case 'tourism':
      return (
        <svg {...props}>
          <path d="M12 5.5c2 2.2 2.9 4.6 2.9 6.9S13.7 16.8 12 18c-1.7-1.2-2.9-3.3-2.9-5.6S10 7.7 12 5.5z" />
          <path d="M12 18c-3.7 0-6.8-1.9-8.2-5.2 2.7-.4 5.3.4 6.8 2.3" />
          <path d="M12 18c3.7 0 6.8-1.9 8.2-5.2-2.7-.4-5.3.4-6.8 2.3" />
          <path d="M5.5 20.5h13" />
        </svg>
      )
    case 'agriculture':
      return (
        <svg {...props}>
          <path d="M12 20.5v-8.5" />
          <path d="M12 12c0-3.3-2.7-6-6-6 0 3.3 2.7 6 6 6z" />
          <path d="M12 14.5c0-3.9 3.1-7 7-7 0 3.9-3.1 7-7 7z" />
          <path d="M6.5 20.5h11" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
  }
}
