import { useState } from 'react'
import { business } from '../data/business.js'
import { useReveal } from '../hooks.js'

const INTENTS = [
  'New CCTV installation',
  'Repair / service existing setup',
  'AMC (annual maintenance)',
  'Shift existing system',
  'Upgrade to IP / NVR',
]

export default function Contact() {
  const [intent, setIntent] = useState(INTENTS[0])
  const [name, setName] = useState('')
  const [place, setPlace] = useState('')
  const [note, setNote] = useState('')
  const [ref, visible] = useReveal({ threshold: 0.08 })

  const message = encodeURIComponent(
    `Hi Shubham CCTV,\n\nName: ${name || '—'}\nLocation: ${place || '—'}\nRequirement: ${intent}\nDetails: ${
      note || '—'
    }\n\nPlease share a quote.`,
  )
  const wa = `https://wa.me/${business.whatsapp}?text=${message}`

  return (
    <section className="section contact" id="contact">
      <div className="shell">
        <header className="section-head">
          <div>
            <span className="eyebrow">// 06 — Get in touch</span>
          </div>
          <div>
            <h2 className="section-title">
              Book your <em>free survey</em>
            </h2>
            <p className="section-lede" style={{ marginTop: '1.5rem' }}>
              Tell us the site and what you want covered. We will visit, mark camera positions and
              give you a written quote — free, no obligation.
            </p>
          </div>
        </header>

        <div className="contact__grid">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault()
              window.open(wa, '_blank', 'noopener')
            }}
          >
            <div className="form__row">
              <label className="field">
                <span className="mono">Your name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                />
              </label>
              <label className="field">
                <span className="mono">Area / city</span>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="e.g. Model Town, Hoshiarpur"
                />
              </label>
            </div>

            <div className="field">
              <span className="mono">What do you need?</span>
              <div className="chips">
                {INTENTS.map((it) => (
                  <button
                    key={it}
                    type="button"
                    className={`chip${intent === it ? ' is-on' : ''}`}
                    onClick={() => setIntent(it)}
                  >
                    {it}
                  </button>
                ))}
              </div>
            </div>

            <label className="field">
              <span className="mono">Details (cameras, rooms, budget)</span>
              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. 4 cameras for a shop, need night vision and mobile viewing"
              />
            </label>

            <div className="form__actions">
              <button className="btn" type="submit">
                <span>Send on WhatsApp</span>
                <span aria-hidden="true">→</span>
              </button>
              <a
                className="btn btn--ghost"
                href={`tel:${business.phones[0].replace(/\s/g, '')}`}
              >
                <span>Or call {business.phones[0]}</span>
              </a>
            </div>
            <p className="form__hint mono">
              Opens WhatsApp with your details pre-filled. No data is stored on this site.
            </p>
          </form>

          <aside className="contact__side" ref={ref}>
            <div className={`card reveal${visible ? ' is-in' : ''}`}>
              <span className="eyebrow">Direct lines</span>
              {business.phones.map((p) => (
                <a key={p} className="contact__phone" href={`tel:${p.replace(/\s/g, '')}`}>
                  <span className="mono">{p}</span>
                  <span className="contact__phone-go" aria-hidden="true">↗</span>
                </a>
              ))}
              <a
                className="contact__wa"
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>WhatsApp chat</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                className="contact__ig mono"
                href={business.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram — recent installations ↗
              </a>
            </div>

            <div className={`card reveal${visible ? ' is-in' : ''}`} style={{ transitionDelay: '0.1s' }}>
              <span className="eyebrow">Opening hours</span>
              <ul className="hours">
                {business.hours.map((h) => (
                  <li key={h.day}>
                    <span>{h.day}</span>
                    <em className="mono">{h.time}</em>
                  </li>
                ))}
              </ul>
            </div>

            {business.stores.map((s, i) => (
              <div
                className={`card reveal${visible ? ' is-in' : ''}`}
                key={s.label}
                style={{ transitionDelay: `${0.16 + i * 0.08}s` }}
              >
                <span className="eyebrow">{s.label}</span>
                <address className="addr">
                  {s.lines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </address>
                <a className="contact__map mono" href={s.map} target="_blank" rel="noreferrer">
                  Open in Google Maps ↗
                </a>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  )
}
