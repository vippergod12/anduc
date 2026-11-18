'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import SeasonIcon, { type Season } from './SeasonIcon'

/**
 * Hiệu ứng bốn mùa khi cuộn trang.
 *
 * Cách dùng: đặt các <section data-season="spring|summer|autumn|winter" data-season-theme="...">
 * trong một phần tử cha có thuộc tính data-season-root, rồi render <SeasonEffects /> một lần.
 *
 * - Xuân: hoa mai, hoa đào   - Hạ: cánh phượng, bằng lăng
 * - Thu: lá vàng             - Đông: tuyết nhẹ
 *
 * Hoa/lá rơi nhẹ liên tục và rơi nhiều hơn khi người dùng cuộn.
 * Tôn trọng "prefers-reduced-motion" (mặc định tắt) và có nút bật/tắt.
 */

const LABELS: Record<Season, string> = {
  spring: 'Mùa Xuân',
  summer: 'Mùa Hạ',
  autumn: 'Mùa Thu',
  winter: 'Mùa Đông',
}
const STORAGE_KEY = 'anduc-season-fx'
const SPRITE = 64 // kích thước sprite gốc (px)

// ----------------------------------------------------------------
// Vẽ sprite
// ----------------------------------------------------------------
type Draw = (ctx: CanvasRenderingContext2D, s: number) => void

function sprite(draw: Draw): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = c.height = SPRITE
  const ctx = c.getContext('2d')
  if (ctx) {
    ctx.translate(SPRITE / 2, SPRITE / 2)
    draw(ctx, SPRITE)
  }
  return c
}

/** Hoa 5 cánh. notch = cánh có khía (hoa đào) */
const flower =
  (petal: string, petalEdge: string, center: string, notch: boolean): Draw =>
  (ctx, s) => {
    for (let i = 0; i < 5; i++) {
      ctx.save()
      ctx.rotate((i * Math.PI * 2) / 5)
      const g = ctx.createRadialGradient(0, -s * 0.08, 1, 0, -s * 0.2, s * 0.24)
      g.addColorStop(0, petal)
      g.addColorStop(1, petalEdge)
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.ellipse(0, -s * 0.19, s * 0.13, s * 0.19, 0, 0, Math.PI * 2)
      ctx.fill()
      if (notch) {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.beginPath()
        ctx.arc(0, -s * 0.385, s * 0.04, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalCompositeOperation = 'source-over'
      }
      ctx.restore()
    }
    ctx.fillStyle = center
    ctx.beginPath()
    ctx.arc(0, 0, s * 0.07, 0, Math.PI * 2)
    ctx.fill()
    // nhị hoa
    ctx.fillStyle = 'rgba(160, 80, 20, 0.85)'
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI * 2) / 8
      ctx.beginPath()
      ctx.arc(Math.cos(a) * s * 0.11, Math.sin(a) * s * 0.11, s * 0.017, 0, Math.PI * 2)
      ctx.fill()
    }
  }

/** Một cánh hoa rời */
const petal =
  (inner: string, outer: string, w = 0.16, h = 0.3): Draw =>
  (ctx, s) => {
    const g = ctx.createLinearGradient(0, -s * h, 0, s * h)
    g.addColorStop(0, outer)
    g.addColorStop(0.5, inner)
    g.addColorStop(1, outer)
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.moveTo(0, -s * h)
    ctx.bezierCurveTo(s * w * 1.6, -s * h * 0.6, s * w * 1.2, s * h * 0.7, 0, s * h)
    ctx.bezierCurveTo(-s * w * 1.2, s * h * 0.7, -s * w * 1.6, -s * h * 0.6, 0, -s * h)
    ctx.fill()
  }

/** Lá thu có gân */
const leaf =
  (fill: string, vein: string): Draw =>
  (ctx, s) => {
    const h = s * 0.36
    ctx.fillStyle = fill
    ctx.beginPath()
    ctx.moveTo(0, -h)
    ctx.bezierCurveTo(s * 0.3, -h * 0.5, s * 0.26, h * 0.55, 0, h * 0.82)
    ctx.bezierCurveTo(-s * 0.26, h * 0.55, -s * 0.3, -h * 0.5, 0, -h)
    ctx.fill()
    ctx.strokeStyle = vein
    ctx.lineWidth = s * 0.025
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(0, -h * 0.85)
    ctx.lineTo(0, h * 1.05) // gân chính + cuống
    for (let i = -2; i <= 2; i++) {
      const y = i * h * 0.25
      ctx.moveTo(0, y)
      ctx.lineTo(s * 0.13, y - h * 0.18)
      ctx.moveTo(0, y)
      ctx.lineTo(-s * 0.13, y - h * 0.18)
    }
    ctx.stroke()
  }

/** Hạt tuyết tròn mềm */
const snowDot: Draw = (ctx, s) => {
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.22)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.55, 'rgba(240,246,252,0.85)')
  g.addColorStop(1, 'rgba(200,215,232,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(0, 0, s * 0.22, 0, Math.PI * 2)
  ctx.fill()
}

/** Bông tuyết 6 cánh */
const snowFlake: Draw = (ctx, s) => {
  ctx.strokeStyle = 'rgba(255,255,255,0.95)'
  ctx.shadowColor = 'rgba(110,140,175,0.6)'
  ctx.shadowBlur = s * 0.05
  ctx.lineWidth = s * 0.035
  ctx.lineCap = 'round'
  for (let i = 0; i < 6; i++) {
    ctx.save()
    ctx.rotate((i * Math.PI) / 3)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -s * 0.36)
    ctx.moveTo(0, -s * 0.2)
    ctx.lineTo(s * 0.08, -s * 0.28)
    ctx.moveTo(0, -s * 0.2)
    ctx.lineTo(-s * 0.08, -s * 0.28)
    ctx.stroke()
    ctx.restore()
  }
}

// ----------------------------------------------------------------
// Cấu hình từng mùa
// ----------------------------------------------------------------
interface SeasonConfig {
  sprites: { draw: Draw; weight: number; scale: [number, number] }[]
  vy: [number, number]
  sway: [number, number]
  spin: number
  flutter: boolean
  /** hệ số rơi khi cuộn (càng lớn càng nhiều) */
  scrollBoost: number
}

const CONFIG: Record<Season, SeasonConfig> = {
  spring: {
    sprites: [
      { draw: flower('#ffe27a', '#f4b400', '#ffcf3d', false), weight: 3, scale: [0.42, 0.62] }, // mai
      { draw: flower('#ffe3ea', '#f39bb3', '#e2557c', true), weight: 3, scale: [0.42, 0.62] }, // đào
      { draw: petal('#ffd84d', '#f2ad00'), weight: 2, scale: [0.3, 0.45] },
      { draw: petal('#ffd6e0', '#f08fab'), weight: 2, scale: [0.3, 0.45] },
    ],
    vy: [0.55, 1.15],
    sway: [0.5, 1.3],
    spin: 0.025,
    flutter: true,
    scrollBoost: 1,
  },
  summer: {
    sprites: [
      { draw: petal('#ff6a3d', '#d8261b', 0.2, 0.28), weight: 4, scale: [0.36, 0.55] }, // phượng
      { draw: petal('#ffb347', '#e0461f', 0.2, 0.28), weight: 2, scale: [0.34, 0.5] }, // cánh phượng có vệt vàng
      { draw: petal('#c9a2f0', '#8357c5', 0.2, 0.26), weight: 2, scale: [0.34, 0.5] }, // bằng lăng
    ],
    vy: [0.7, 1.4],
    sway: [0.4, 1.1],
    spin: 0.03,
    flutter: true,
    scrollBoost: 1,
  },
  autumn: {
    sprites: [
      { draw: leaf('#e0a43a', '#a86a15'), weight: 3, scale: [0.45, 0.7] },
      { draw: leaf('#d4692a', '#8e3d10'), weight: 3, scale: [0.45, 0.7] },
      { draw: leaf('#c9a227', '#7d6411'), weight: 2, scale: [0.4, 0.6] },
      { draw: leaf('#a8452a', '#6d2510'), weight: 1, scale: [0.4, 0.6] },
    ],
    vy: [0.8, 1.6],
    sway: [0.9, 2.0],
    spin: 0.04,
    flutter: true,
    scrollBoost: 0.9,
  },
  winter: {
    sprites: [
      { draw: snowDot, weight: 6, scale: [0.18, 0.4] },
      { draw: snowFlake, weight: 2, scale: [0.3, 0.45] },
    ],
    vy: [0.35, 0.9],
    sway: [0.3, 0.8],
    spin: 0.01,
    flutter: false,
    scrollBoost: 1.3,
  },
}

interface Particle {
  x: number
  y: number
  vy: number
  sway: number
  phase: number
  rot: number
  vr: number
  flip: number
  vflip: number
  scale: number
  depth: number
  age: number
  img: HTMLCanvasElement
  flutter: boolean
}

const rand = (a: number, b: number) => a + Math.random() * (b - a)

// ----------------------------------------------------------------
// Component
// ----------------------------------------------------------------
export default function SeasonEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)
  const [season, setSeason] = useState<Season>('spring')
  const [theme, setTheme] = useState('')
  const seasonRef = useRef<Season>('spring')

  // Khởi tạo: đọc lựa chọn đã lưu, mặc định tắt nếu người dùng giảm chuyển động
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let saved: string | null = null
    try {
      saved = window.localStorage.getItem(STORAGE_KEY)
    } catch {}
    setEnabled(saved ? saved === 'on' : !reduced)
    setReady(true)
  }, [])

  // Theo dõi mùa hiện tại + hiệu ứng "hiện dần" nội dung
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-season-root]')
    if (!root) return
    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-season]'))

    const detect = () => {
      const mid = window.innerHeight * 0.45
      let current = sections[0]
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= mid) current = s
      }
      if (!current) return
      const next = current.dataset.season as Season
      seasonRef.current = next
      setSeason(next)
      setTheme(current.dataset.seasonTheme || '')
      root.dataset.activeSeason = next
    }
    detect()

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        detect()
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Nội dung hiện dần khi cuộn tới (bỏ qua nếu giảm chuyển động)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let io: IntersectionObserver | null = null
    if (!reduced && 'IntersectionObserver' in window) {
      root.classList.add('ab-anim')
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('is-in')
              io?.unobserve(e.target)
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      )
      root.querySelectorAll('.ab-reveal').forEach((el) => io?.observe(el))
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      io?.disconnect()
      root.classList.remove('ab-anim')
    }
  }, [])

  // Vòng lặp vẽ hoa / lá / tuyết
  useEffect(() => {
    const canvas = canvasRef.current
    if (!enabled || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Tạo sprite một lần
    const sprites = Object.fromEntries(
      (Object.keys(CONFIG) as Season[]).map((k) => [
        k,
        CONFIG[k].sprites.map((sp) => ({ ...sp, img: sprite(sp.draw) })),
      ])
    ) as Record<Season, (SeasonConfig['sprites'][number] & { img: HTMLCanvasElement })[]>

    let w = 0
    let h = 0
    let dpr = 1
    // Đo theo kích thước hiển thị thật của canvas (tránh hình bị kéo giãn
    // khi cửa sổ / thanh địa chỉ trên điện thoại thay đổi kích thước)
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth || window.innerWidth
      h = canvas.clientHeight || window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    ro?.observe(canvas)

    const particles: Particle[] = []
    const maxParticles = () => (w < 640 ? 28 : 56)

    const spawn = (fromTop: boolean) => {
      if (particles.length >= maxParticles()) return
      const s = seasonRef.current
      const cfg = CONFIG[s]
      const list = sprites[s]
      const total = list.reduce((n, sp) => n + sp.weight, 0)
      let r = Math.random() * total
      const pick = list.find((sp) => (r -= sp.weight) < 0) ?? list[0]
      const depth = rand(0.55, 1) // gần/xa → to/nhỏ, nhanh/chậm
      particles.push({
        x: rand(-20, w + 20),
        y: fromTop ? rand(-60, -20) : rand(-40, h * 0.55),
        vy: rand(cfg.vy[0], cfg.vy[1]) * depth,
        sway: rand(cfg.sway[0], cfg.sway[1]),
        phase: rand(0, Math.PI * 2),
        rot: rand(0, Math.PI * 2),
        vr: rand(-cfg.spin, cfg.spin),
        flip: rand(0, Math.PI * 2),
        vflip: rand(0.02, 0.05),
        scale: rand(pick.scale[0], pick.scale[1]) * depth,
        depth,
        age: fromTop ? 30 : 0,
        img: pick.img,
        flutter: cfg.flutter,
      })
    }

    let lastScroll = window.scrollY
    let scrollShift = 0
    let scrollSpawn = 0
    const onScroll = () => {
      const y = window.scrollY
      const d = y - lastScroll
      lastScroll = y
      scrollShift -= d * 0.22 // trôi nhẹ theo hướng cuộn (parallax)
      scrollSpawn += (Math.min(Math.abs(d), 220) / 70) * CONFIG[seasonRef.current].scrollBoost
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)

    // Rải sẵn vài hạt để trang không trống lúc đầu
    for (let i = 0; i < 10; i++) spawn(false)

    let raf = 0
    let last = performance.now()
    let ambient = 0
    const frame = (t: number) => {
      const dt = Math.min(50, t - last) / 16.67
      last = t

      ambient += dt * 0.022 // ~1.3 hạt/giây khi đứng yên
      while (ambient >= 1) {
        spawn(true)
        ambient -= 1
      }
      const n = Math.min(Math.floor(scrollSpawn), 4)
      for (let i = 0; i < n; i++) spawn(false)
      scrollSpawn = Math.max(0, scrollSpawn - n)
      const shift = scrollShift
      scrollShift = 0

      ctx.clearRect(0, 0, w, h)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.age += dt
        p.phase += 0.02 * dt
        p.rot += p.vr * dt
        p.flip += p.vflip * dt
        p.x += Math.sin(p.phase) * p.sway * 0.6 * dt
        p.y += p.vy * dt + shift * p.depth

        if (p.y > h + 60 || p.y < -140 || p.x < -80 || p.x > w + 80) {
          particles.splice(i, 1)
          continue
        }

        const size = SPRITE * p.scale
        ctx.save()
        ctx.globalAlpha = Math.min(1, p.age / 30) * (0.55 + p.depth * 0.4)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        if (p.flutter) ctx.scale(Math.max(0.25, Math.abs(Math.cos(p.flip))), 1)
        ctx.drawImage(p.img, -size / 2, -size / 2, size, size)
        ctx.restore()
      }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start())
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      ctx.clearRect(0, 0, w, h)
    }
  }, [enabled])

  const toggle = () => {
    setEnabled((on) => {
      const next = !on
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
      } catch {}
      return next
    })
  }

  // Render thẳng vào <body>: lớp bọc .page-transition có transform,
  // nếu để bên trong thì position: fixed sẽ bám theo lớp bọc thay vì màn hình.
  if (!ready) return null

  return createPortal(
    <>
      <canvas ref={canvasRef} className="season-fx-canvas" aria-hidden="true" hidden={!enabled} />
      <div className={`season-fx-ui season-${season}`}>
        <span className="season-fx-now">
          <SeasonIcon season={season} size={18} />
          <span>
            {LABELS[season]}
            {theme && <span className="season-fx-theme"> · {theme}</span>}
          </span>
        </span>
        <button type="button" onClick={toggle} aria-pressed={enabled} className="season-fx-toggle">
          {enabled ? 'Tắt hiệu ứng' : 'Bật hiệu ứng'}
        </button>
      </div>
    </>,
    document.body
  )
}
