export default function Marquee({ items }: { items: string[] }) {
  const list = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {list.map((it, i) => (
          <span key={i}>{it}</span>
        ))}
      </div>
    </div>
  )
}
