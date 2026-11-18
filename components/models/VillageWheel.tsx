'use client'

import { useState } from 'react'
import type { ModelsData } from '@/lib/types'

type Stage = ModelsData['village']['stages'][number]

const CX = 250
const CY = 250
const R_OUT = 222
const R_IN = 112
const R_MID = (R_OUT + R_IN) / 2
const COLORS = ['#2f6b57', '#3d8b74', '#b9964a', '#1f4c40']

/** Góc 0° ở đỉnh, chiều kim đồng hồ */
function pt(deg: number, r: number) {
  const a = (deg * Math.PI) / 180
  return `${(CX + r * Math.sin(a)).toFixed(2)},${(CY - r * Math.cos(a)).toFixed(2)}`
}

/** Một cung có mũi tên ở cuối (thể hiện vòng tuần hoàn) */
function segment(a0: number, a1: number) {
  const s = a0 + 2
  const e = a1 - 6
  return [
    `M ${pt(s, R_OUT)}`,
    `A ${R_OUT} ${R_OUT} 0 0 1 ${pt(e, R_OUT)}`,
    `L ${pt(e + 7, R_MID)}`,
    `L ${pt(e, R_IN)}`,
    `A ${R_IN} ${R_IN} 0 0 0 ${pt(s, R_IN)}`,
    `L ${pt(s + 7, R_MID)}`,
    'Z',
  ].join(' ')
}

/** Mô hình Làng sinh thái lõi — vòng đời tuần hoàn (data/models.json → village) */
export default function VillageWheel({ stages, center, hint }: { stages: Stage[]; center: string; hint: string }) {
  const [active, setActive] = useState(stages[0]?.id ?? '')
  const step = 360 / Math.max(stages.length, 1)
  const centerWords = center.split(' ')
  const half = Math.ceil(centerWords.length / 2)

  return (
    <div className="mh-split mh-split--reverse">
      <figure className="mh-figure mh-wheel" aria-hidden="true">
        <svg viewBox="0 0 500 500" role="presentation">
          <circle cx={CX} cy={CY} r={R_OUT + 14} fill="#f1efe6" />
          {stages.map((s, i) => {
            const a0 = i * step
            const mid = a0 + step / 2
            const [lx, ly] = pt(mid, R_MID).split(',').map(Number)
            const on = active === s.id
            return (
              <g
                key={s.id}
                className={`mh-seg ${on ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(s.id)}
                onClick={() => setActive(s.id)}
              >
                <path d={segment(a0, a0 + step)} fill={COLORS[i % COLORS.length]} />
                <text x={lx} y={ly - 4} textAnchor="middle" className="mh-seg-name">
                  {s.name}
                </text>
                <text x={lx} y={ly + 16} textAnchor="middle" className="mh-seg-group">
                  {s.group}
                </text>
              </g>
            )
          })}
          <circle cx={CX} cy={CY} r={R_IN - 14} fill="#173d33" />
          <circle cx={CX} cy={CY} r={R_IN - 22} fill="none" stroke="#d6b889" strokeOpacity="0.6" />
          <text x={CX} y={CY - 6} textAnchor="middle" className="mh-center">
            {centerWords.slice(0, half).join(' ')}
          </text>
          <text x={CX} y={CY + 20} textAnchor="middle" className="mh-center">
            {centerWords.slice(half).join(' ')}
          </text>
        </svg>
      </figure>

      <div>
        <p className="mh-hint">{hint}</p>
        <ol className="mh-list mh-list--stages">
          {stages.map((s, i) => {
            const on = active === s.id
            return (
              <li key={s.id} className={on ? 'is-active' : ''}>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`mh-stage-${s.id}`}
                  onMouseEnter={() => setActive(s.id)}
                  onFocus={() => setActive(s.id)}
                  onClick={() => setActive(s.id)}
                >
                  <span className="mh-list-swatch" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="mh-list-name">{s.name}</span>
                  <span className="mh-list-meta">{s.group}</span>
                  <span className="mh-list-percent">{String(i + 1).padStart(2, '0')}</span>
                </button>
                <div id={`mh-stage-${s.id}`} className="mh-list-body">
                  <div>
                    <p>{s.desc}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
