import { memo, useEffect, useRef } from 'react'

const PALETTES = [
  // daytime colour, cyan tint
  {
    sky: ['#2a4a63', '#16283a'],
    ground: ['#101c26', '#070d13'],
    figure: '#05080c',
    tint: 'rgba(90,210,255,0.30)',
    grid: 'rgba(160,230,255,0.20)',
  },
  // shop interior, warm
  {
    sky: ['#4a3a2a', '#2a1f16'],
    ground: ['#1a1209', '#0b0805'],
    figure: '#0a0705',
    tint: 'rgba(255,190,90,0.32)',
    grid: 'rgba(255,220,160,0.18)',
  },
  // full-colour night, green
  {
    sky: ['#1e4436', '#0d241c'],
    ground: ['#0a1a13', '#040a08'],
    figure: '#040a07',
    tint: 'rgba(80,255,160,0.30)',
    grid: 'rgba(140,255,200,0.18)',
  },
  // IR monochrome, grey/blue
  {
    sky: ['#3a4048', '#20242a'],
    ground: ['#14171c', '#080a0d'],
    figure: '#05070a',
    tint: 'rgba(220,235,255,0.28)',
    grid: 'rgba(220,235,255,0.16)',
  },
]

/**
 * Renders a synthetic surveillance feed: a lit scene with drifting
 * figures, motion bloom, IR grain, a rolling scan bar and vignette.
 * Purely generated — no video files, so it stays weightless.
 */
export default memo(function FeedCanvas({ variant = 0, active = true }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf
    let w = 0
    let h = 0
    let dpr = 1
    // Sky, ground, silhouettes, grid, scanlines and vignette never change
    // between frames. Painting them once into an offscreen layer and
    // blitting it is far cheaper than re-allocating six gradients and
    // stroking the grid on every tick of every tile.
    let base = null

    const pal = PALETTES[variant % PALETTES.length]
    const horizon = 0.58

    const figures = Array.from({ length: 2 + (variant % 3) }, (_, i) => ({
      x: (i * 0.37 + 0.15) % 1,
      speed: (0.03 + Math.random() * 0.03) * (i % 2 ? 1 : -1),
      scale: 0.55 + (i % 3) * 0.22,
      bob: Math.random() * Math.PI * 2,
    }))

    const blocks = Array.from({ length: 6 }, (_, i) => ({
      x: 0.04 + i * 0.16,
      w: 0.08 + ((i * 7) % 5) * 0.02,
      h: 0.1 + ((i * 3) % 4) * 0.06,
    }))

    const paintBase = () => {
      const off = document.createElement('canvas')
      off.width = canvas.width
      off.height = canvas.height
      const c = off.getContext('2d')
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      const hy = h * horizon

      const sky = c.createLinearGradient(0, 0, 0, hy)
      sky.addColorStop(0, pal.sky[0])
      sky.addColorStop(1, pal.sky[1])
      c.fillStyle = sky
      c.fillRect(0, 0, w, hy)

      const grd = c.createLinearGradient(0, hy, 0, h)
      grd.addColorStop(0, pal.ground[0])
      grd.addColorStop(1, pal.ground[1])
      c.fillStyle = grd
      c.fillRect(0, hy, w, h - hy)

      blocks.forEach((b) => {
        const bh = b.h * h
        c.fillStyle = 'rgba(0,0,0,0.35)'
        c.fillRect(b.x * w, hy - bh, b.w * w, bh)
        c.strokeStyle = pal.grid
        c.lineWidth = 1
        c.strokeRect(b.x * w, hy - bh, b.w * w, bh)
      })

      c.strokeStyle = pal.grid
      c.lineWidth = 1
      for (let i = 0; i <= 10; i += 1) {
        const gx = (i / 10) * w
        c.beginPath()
        c.moveTo(w / 2 + (gx - w / 2) * 0.12, hy)
        c.lineTo(gx, h)
        c.stroke()
      }
      for (let i = 1; i <= 5; i += 1) {
        const gy = hy + (h - hy) * (i / 5) ** 1.7
        c.beginPath()
        c.moveTo(0, gy)
        c.lineTo(w, gy)
        c.stroke()
      }

      c.strokeStyle = 'rgba(255,255,255,0.22)'
      c.beginPath()
      c.moveTo(0, hy)
      c.lineTo(w, hy)
      c.stroke()

      c.fillStyle = 'rgba(0,0,0,0.1)'
      for (let y = 0; y < h; y += 3) c.fillRect(0, y, w, 1)

      const v = c.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.22,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.72,
      )
      v.addColorStop(0, 'rgba(0,0,0,0)')
      v.addColorStop(1, 'rgba(0,0,0,0.6)')
      c.fillStyle = v
      c.fillRect(0, 0, w, h)

      base = off
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = Math.max(1, Math.floor(rect.width))
      h = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paintBase()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Four feeds animate at once; stopping the ones scrolled out of view
    // keeps the section from burning a phone's battery.
    let onScreen = true
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
      },
      { rootMargin: '120px' },
    )
    io.observe(canvas)

    const FRAME = 1000 / 30
    let last = 0

    const draw = (t) => {
      raf = requestAnimationFrame(draw)
      if (!active || !onScreen || !base) return
      if (t - last < FRAME) return
      last = t
      const time = t / 1000
      const hy = h * horizon

      ctx.drawImage(base, 0, 0, w, h)

      figures.forEach((f) => {
        f.x += f.speed / 30
        if (f.x > 1.12) f.x = -0.12
        if (f.x < -0.12) f.x = 1.12
        const bob = Math.sin(time * 5.5 + f.bob) * 0.008
        const fh = h * 0.3 * f.scale
        const fx = f.x * w
        const fy = hy + h * 0.14 * f.scale + bob * h

        // motion bloom
        ctx.fillStyle = pal.tint
        ctx.beginPath()
        ctx.ellipse(fx, fy - fh * 0.55, fh * 0.36, fh * 0.75, 0, 0, Math.PI * 2)
        ctx.fill()

        // body silhouette
        ctx.fillStyle = pal.figure
        ctx.beginPath()
        ctx.ellipse(fx, fy - fh * 0.93, fh * 0.13, fh * 0.15, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillRect(fx - fh * 0.11, fy - fh * 0.8, fh * 0.22, fh * 0.62)
        ctx.fillRect(fx - fh * 0.16, fy - fh * 0.76, fh * 0.1, fh * 0.42)
        ctx.fillRect(fx + fh * 0.06, fy - fh * 0.76, fh * 0.1, fh * 0.42)

        // motion detection box
        const bx = fx - fh * 0.22
        const by = fy - fh * 1.1
        ctx.strokeStyle = 'rgba(57,255,136,0.85)'
        ctx.lineWidth = 1.5
        ctx.strokeRect(bx, by, fh * 0.44, fh * 1.2)
      })

      // rolling scan bar
      const barY = ((time * 0.18) % 1) * h
      const barG = ctx.createLinearGradient(0, barY - 30, 0, barY + 30)
      barG.addColorStop(0, 'rgba(255,255,255,0)')
      barG.addColorStop(0.5, 'rgba(255,255,255,0.09)')
      barG.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = barG
      ctx.fillRect(0, barY - 30, w, 60)

      // grain
      const grainCount = Math.floor((w * h) / 2600)
      for (let i = 0; i < grainCount; i += 1) {
        const gx = Math.random() * w
        const gy = Math.random() * h
        ctx.fillStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.05})`
        ctx.fillRect(gx, gy, 1, 1)
      }
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      base = null
    }
  }, [variant, active])

  return <canvas ref={ref} className="feed__canvas" aria-hidden="true" />
})
