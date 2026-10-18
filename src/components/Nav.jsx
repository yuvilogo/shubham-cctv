import { useEffect, useState } from 'react'
import { business } from '../data/business.js'
import { useClock, useScrollProgress } from '../hooks.js'

const LINKS = [
  { href: '#services', label: 'Services', id: '01' },
  { href: '#packages', label: 'Packages', id: '02' },
  { href: '#feeds', label: 'Live', id: '03' },
  { href: '#process', label: 'Process', id: '04' },
  { href: '#contact', label: 'Contact', id: '05' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const progressRef = useScrollProgress()
  const now = useClock(30000)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const time = now.toLocaleTimeString('en-IN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <>
      <header className={`nav${solid ? ' is-solid' : ''}`}>
        <div className="nav__bar shell">
          <a className="nav__brand" href="#top" onClick={() => setOpen(false)}>
            <span className="nav__mark" />
            <span className="nav__wordmark">
              SHUBHAM<span>CCTV</span>
            </span>
            <span className="nav__sub mono">HOSHIARPUR · PB</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">
                <span className="nav__link-id mono">{l.id}</span>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav__right">
            <div className="nav__status mono">
              <span className="dot-live" />
              <span>REC</span>
              <span className="nav__time">{time}</span>
            </div>
            <a className="btn nav__cta" href={`tel:${business.phones[0].replace(/\s/g, '')}`}>
              <span>Call now</span>
            </a>
            <button
              className="nav__burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className="nav__progress">
          <span ref={progressRef} />
        </div>
      </header>

      <div className={`menu${open ? ' is-open' : ''}`}>
        <div className="menu__inner shell">
          <span className="eyebrow">// Navigation</span>
          <nav className="menu__list">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="menu__item"
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${0.06 * i + 0.08}s` }}
              >
                <span className="mono">{l.id}</span>
                <span className="display">{l.label}</span>
              </a>
            ))}
          </nav>
          <div className="menu__foot">
            {business.phones.map((p) => (
              <a key={p} className="mono" href={`tel:${p.replace(/\s/g, '')}`}>
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
