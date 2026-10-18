import { Suspense, lazy, useEffect, useState } from 'react'
import { business, stats } from '../data/business.js'

// three.js is ~1 MB of the bundle and nothing above the fold needs it,
// so it loads as a separate chunk after the copy has painted.
const Hero3D = lazy(() => import('./Hero3D.jsx'))

export default function Hero() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 140)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero__canvas">
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </div>

      <div className="hero__grid-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={`hero__overlay shell${ready ? ' is-ready' : ''}`}>
        <div className="hero__top">
          <span className="tag">
            <span className="dot-live" />
            Camera 01 · Live
          </span>
          <span className="tag hero__coords mono">
            {business.coords.lat.toFixed(4)}° N / {business.coords.lng.toFixed(4)}° E
          </span>
        </div>

        <div className="hero__center">
          <p className="hero__eyebrow eyebrow">
            // {business.city}, {business.region} — since {business.since}
          </p>
          <h1 className="hero__title display">
            <span className="hero__line" style={{ '--d': '0.05s' }}>
              Eyes that{' '}
            </span>
            <span className="hero__line hero__line--accent" style={{ '--d': '0.16s' }}>
              never blink.
            </span>
          </h1>
          <p className="hero__lede" style={{ '--d': '0.34s' }}>
            CCTV cameras, DVR &amp; NVR systems — sold, installed and serviced across Hoshiarpur
            and Punjab. Genuine brands, concealed wiring, and a picture you can trust at 3&nbsp;a.m.
          </p>
          <div className="hero__actions" style={{ '--d': '0.46s' }}>
            <a
              className="btn"
              href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                'Hi Shubham CCTV, I would like a free site survey for CCTV installation.',
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <span>Get free site survey</span>
              <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn--ghost" href="#packages">
              <span>View packages</span>
            </a>
          </div>
        </div>

        <div className="hero__bottom">
          <div className="hero__stats">
            {stats.map((s, i) => (
              <div className="hero__stat" key={s.label} style={{ '--d': `${0.6 + i * 0.08}s` }}>
                <span className="hero__stat-v display">{s.value}</span>
                <span className="hero__stat-l mono">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="hero__scroll mono">
            <span>Scroll to survey</span>
            <span className="hero__scroll-rail" />
          </div>
        </div>
      </div>

      <div className="hero__vignette" aria-hidden="true" />
    </section>
  )
}
