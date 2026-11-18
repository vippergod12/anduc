'use client'

import { useState } from 'react'
import type { ModelsData } from '@/lib/types'

type Layer = ModelsData['iceberg']['layers'][number]

// Hình tảng băng (viewBox 600×500), mặt nước ở y = 110
const SHAPES: Record<string, string> = {
  // Thân — phần nổi
  than: '300,22 336,52 358,80 380,110 220,110 240,80 262,50',
  // Tâm — phần chìm lớn nhất
  tam: '220,110 380,110 440,158 498,238 478,330 132,330 116,240 160,158',
  // Trí — phần sâu nhất
  tri: '132,330 478,330 440,400 382,458 318,490 258,470 190,410',
}
const FILL: Record<string, string> = { than: '#f4fbfe', tam: '#8cc3d9', tri: '#3d7c9a' }
// Vị trí đường chỉ dẫn (y) cho từng tầng
const LABEL_Y: Record<string, number> = { than: 70, tam: 225, tri: 405 }

/** Mô hình Tảng băng trôi Thân – Tâm – Trí (data/models.json → iceberg) */
export default function Iceberg({ layers, hint }: { layers: Layer[]; hint: string }) {
  const [active, setActive] = useState(layers[0]?.id ?? '')

  return (
    <div className="mh-split">
      <figure className="mh-figure mh-iceberg" aria-hidden="true">
        <svg viewBox="0 0 600 500" role="presentation">
          <defs>
            <linearGradient id="mh-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fdfbf6" />
              <stop offset="1" stopColor="#e9f3f6" />
            </linearGradient>
            <linearGradient id="mh-sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#bfe0ea" />
              <stop offset="0.55" stopColor="#2d6f8c" />
              <stop offset="1" stopColor="#0f3247" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="600" height="110" fill="url(#mh-sky)" />
          <rect x="0" y="110" width="600" height="390" fill="url(#mh-sea)" />
          {/* gợn sóng mặt nước */}
          <path d="M0 110 Q 30 104 60 110 T 120 110 T 180 110 T 240 110 T 300 110 T 360 110 T 420 110 T 480 110 T 540 110 T 600 110" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />

          {layers.map((l) => (
            <g
              key={l.id}
              className={`mh-layer ${active === l.id ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(l.id)}
              onClick={() => setActive(l.id)}
            >
              <polygon
                points={SHAPES[l.id] ?? ''}
                fill={FILL[l.id] ?? '#cfe6ee'}
                fillOpacity={l.id === 'than' ? 1 : 0.88}
                stroke="#ffffff"
                strokeOpacity="0.85"
                strokeWidth="2"
              />
              {/* đường chỉ dẫn + nhãn */}
              <line x1={l.id === 'than' ? 360 : 470} y1={LABEL_Y[l.id]} x2="512" y2={LABEL_Y[l.id]} className="mh-leader" />
              <circle cx={l.id === 'than' ? 360 : 470} cy={LABEL_Y[l.id]} r="5" className="mh-leader-dot" />
              <text x="520" y={(LABEL_Y[l.id] ?? 0) + 6} className="mh-label">
                {l.name}
              </text>
              <text x="300" y={l.id === 'than' ? 96 : l.id === 'tam' ? 236 : 418} textAnchor="middle" className="mh-percent">
                {l.percent}%
              </text>
            </g>
          ))}
        </svg>
      </figure>

      <div>
        <p className="mh-hint">{hint}</p>
        <ul className="mh-list">
          {layers.map((l) => {
            const on = active === l.id
            return (
              <li key={l.id} className={on ? 'is-active' : ''}>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`mh-layer-${l.id}`}
                  onMouseEnter={() => setActive(l.id)}
                  onFocus={() => setActive(l.id)}
                  onClick={() => setActive(l.id)}
                >
                  <span className="mh-list-swatch" style={{ background: FILL[l.id] }} />
                  <span className="mh-list-name">{l.name}</span>
                  <span className="mh-list-meta">
                    {l.level} · {l.nature}
                  </span>
                  <span className="mh-list-percent">{l.percent}%</span>
                </button>
                <div id={`mh-layer-${l.id}`} className="mh-list-body">
                  <div>
                    <div className="mh-bar" aria-hidden="true">
                      <span style={{ width: `${l.percent}%`, background: FILL[l.id] }} />
                    </div>
                    <p>{l.desc}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
