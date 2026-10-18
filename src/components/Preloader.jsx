import { useEffect, useState } from 'react'

const LINES = [
  'INITIALISING OPTICS',
  'CALIBRATING IR ARRAY',
  'LINKING DVR CHANNELS',
  'MOUNTING FEEDS 01—04',
  'SIGNAL LOCKED',
]

export default function Preloader({ onDone }) {
  const [step, setStep] = useState(0)
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 2100
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setPct(Math.round(eased * 100))
      setStep(Math.min(LINES.length - 1, Math.floor(eased * LINES.length)))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setGone(true)
          onDone?.()
        }, 320)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  if (gone) return null

  return (
    <div className={`preloader${pct === 100 ? ' is-done' : ''}`} aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__brand">
          <span className="preloader__mark" />
          <span className="preloader__name display">
            SHUBHAM<span>CCTV</span>
          </span>
        </div>

        <div className="preloader__log mono">
          {LINES.map((line, i) => (
            <div key={line} className={i <= step ? 'on' : ''}>
              <span className="preloader__caret">›</span> {line}
              {i < step && <span className="preloader__ok"> OK</span>}
            </div>
          ))}
        </div>

        <div className="preloader__bar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="preloader__pct mono">{String(pct).padStart(3, '0')}%</div>
      </div>
    </div>
  )
}
