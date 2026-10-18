import { useEffect, useState } from 'react'
import FeedCanvas from './FeedCanvas.jsx'
import { useClock } from '../hooks.js'

const CHANNELS = [
  { ch: 'CH-01', name: 'Main Gate', mode: 'COLOR / IR 30M', variant: 0 },
  { ch: 'CH-02', name: 'Billing Counter', mode: 'AUDIO / 2.4MP', variant: 1 },
  { ch: 'CH-03', name: 'Stock Room', mode: 'COLOR NIGHT', variant: 2 },
  { ch: 'CH-04', name: 'Rear Yard', mode: 'IR 50M', variant: 3 },
]

export default function FeedWall() {
  const now = useClock(1000)
  const [focus, setFocus] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setFocus((f) => (f + 1) % CHANNELS.length), 4200)
    const t = setTimeout(() => setMounted(true), 120)
    return () => {
      clearInterval(id)
      clearTimeout(t)
    }
  }, [])

  const stamp = now.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <section className="section feeds" id="feeds">
      <div className="shell">
        <header className="section-head">
          <div>
            <span className="eyebrow">// 03 — Output</span>
          </div>
          <div>
            <h2 className="section-title">
              What you actually <em>see</em>
            </h2>
            <p className="section-lede" style={{ marginTop: '1.5rem' }}>
              This is the view your recorder gives you — four channels, live, from your phone or the
              DVR monitor. Day colour, full-colour night vision, or infrared when the lights are
              out. Click a channel to bring it full frame.
            </p>
          </div>
        </header>

        <div className={`wall${mounted ? ' is-in' : ''}`}>
          <div className="wall__bar">
            <div className="wall__bar-l mono">
              <span className="dot-live" />
              DVR-01 · LIVE VIEW
            </div>
            <div className="wall__bar-c mono">4 CH · 1080N · H.265</div>
            <div className="wall__bar-r mono">{stamp}</div>
          </div>

          <div className="wall__grid">
            {CHANNELS.map((c, i) => (
              <button
                key={c.ch}
                type="button"
                className={`feed${focus === i ? ' is-focus' : ''}`}
                onClick={() => setFocus(i)}
                style={{ transitionDelay: `${i * 0.08}s` }}
                aria-label={`Focus ${c.name}`}
              >
                <FeedCanvas variant={c.variant} active />
                <span className="feed__hud feed__hud--tl mono">
                  {c.ch} <b>{c.name}</b>
                </span>
                <span className="feed__hud feed__hud--tr mono">
                  <span className="feed__rec">
                    <i />
                    REC
                  </span>
                </span>
                <span className="feed__hud feed__hud--bl mono">{stamp}</span>
                <span className="feed__hud feed__hud--br mono">{c.mode}</span>
                <span className="feed__corner tl" />
                <span className="feed__corner tr" />
                <span className="feed__corner bl" />
                <span className="feed__corner br" />
              </button>
            ))}
          </div>

          <div className="wall__foot mono">
            <span>Playback: 18 days retained · 1 TB HDD</span>
            <span>Motion alerts → phone push notification</span>
            <span>Remote: Android / iOS / Web</span>
          </div>
        </div>
      </div>
    </section>
  )
}
