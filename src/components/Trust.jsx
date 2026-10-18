import { useState } from 'react'
import { reviews, faqs, business } from '../data/business.js'
import { useReveal } from '../hooks.js'

function ReviewCard({ r, i }) {
  const [ref, visible] = useReveal({ threshold: 0.12 })
  return (
    <figure
      ref={ref}
      className={`rev reveal${visible ? ' is-in' : ''}`}
      style={{ transitionDelay: `${i * 0.07}s` }}
    >
      <div className="rev__stars" aria-label="5 out of 5">
        {'★★★★★'.split('').map((s, k) => (
          <span key={k}>{s}</span>
        ))}
      </div>
      <blockquote className="rev__quote">{r.quote}</blockquote>
      <figcaption className="rev__by">
        <span className="rev__avatar display">{r.name.charAt(0)}</span>
        <span>
          <strong>{r.name}</strong>
          <em className="mono">{r.role}</em>
        </span>
      </figcaption>
    </figure>
  )
}

function Faq({ q, a, i }) {
  const [open, setOpen] = useState(i === 0)
  return (
    <div className={`faq${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="faq__q"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="faq__id mono">{String(i + 1).padStart(2, '0')}</span>
        <span className="faq__text">{q}</span>
        <span className="faq__sign" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <div className="faq__a" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function Trust() {
  const [ref, visible] = useReveal({ threshold: 0.08 })

  return (
    <section className="section trust" id="reviews">
      <div className="shell">
        <header className="section-head">
          <div>
            <span className="eyebrow">// 05 — Track record</span>
          </div>
          <div>
            <h2 className="section-title">
              Rated <em>{business.rating}★</em> by neighbours
            </h2>
            <p className="section-lede" style={{ marginTop: '1.5rem' }}>
              {business.ratingCount} online ratings across Google and local listings, from homes,
              shops and factories around Hoshiarpur.
            </p>
          </div>
        </header>

        <div className="rev__grid">
          {reviews.map((r, i) => (
            <ReviewCard key={r.name} r={r} i={i} />
          ))}
        </div>

        <div className="trust__split">
          <div className="faqs">
            <span className="eyebrow">// Straight answers</span>
            <h3 className="trust__sub display">Before you book</h3>
            <div className="faqs__list">
              {faqs.map((f, i) => (
                <Faq key={f.q} q={f.q} a={f.a} i={i} />
              ))}
            </div>
          </div>

          <aside className="assure" ref={ref}>
            <span className="eyebrow">// Assurance</span>
            <h3 className="trust__sub display">Why people call us back</h3>
            <ul className="assure__list">
              {[
                ['Genuine stock only', 'Sealed boxes, proper bill, full brand warranty on every camera and recorder.'],
                ['Neat, concealed work', 'Casing and cable routing that does not turn your walls into a wiring mess.'],
                ['Same-number service', 'The person who installed it is the person who answers when you call.'],
                ['Fair, written pricing', 'Itemised quote before work starts. No mid-job additions.'],
                ['Local since 2014', 'A shop in your city, not a call centre in another state.'],
              ].map(([t, d]) => (
                <li key={t}>
                  <span className="assure__tick" aria-hidden="true">✓</span>
                  <span>
                    <strong>{t}</strong>
                    <em>{d}</em>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
