import { packages, business } from '../data/business.js'
import { useReveal } from '../hooks.js'

function PackageCard({ pkg, index }) {
  const [ref, visible] = useReveal({ threshold: 0.1 })
  const waLink = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    `Hi Shubham CCTV, I am interested in the ${pkg.name} package (${pkg.cameras}). Please share details.`,
  )}`

  return (
    <article
      ref={ref}
      className={`pkg reveal${visible ? ' is-in' : ''}${pkg.best ? ' pkg--best' : ''}`}
      style={{ transitionDelay: `${index * 0.09}s` }}
    >
      {pkg.best && (
        <div className="pkg__flag mono">
          <span className="dot-live" /> Most chosen
        </div>
      )}
      <div className="pkg__head">
        <span className="pkg__code mono">{pkg.code}</span>
        <span className="pkg__cam mono">{pkg.cameras}</span>
      </div>

      <h3 className="pkg__name display">{pkg.name}</h3>

      <div className="pkg__price">
        <span className="pkg__amount display">{pkg.price}</span>
        <span className="pkg__note mono">{pkg.note}</span>
      </div>

      <ul className="pkg__list">
        {pkg.includes.map((inc) => (
          <li key={inc}>
            <span className="pkg__tick" aria-hidden="true">
              ✓
            </span>
            {inc}
          </li>
        ))}
      </ul>

      <a className="pkg__cta" href={waLink} target="_blank" rel="noreferrer">
        <span>Enquire on WhatsApp</span>
        <span aria-hidden="true">→</span>
      </a>
    </article>
  )
}

export default function Packages() {
  return (
    <section className="section section--packages" id="packages">
      <div className="shell">
        <header className="section-head">
          <div>
            <span className="eyebrow">// 02 — Ready kits</span>
          </div>
          <div>
            <h2 className="section-title">
              Starter <em>packages</em>
            </h2>
            <p className="section-lede" style={{ marginTop: '1.5rem' }}>
              Ready-to-install kits for the three most common sites in Hoshiarpur — a home, a shop
              and a small business. Every package includes cameras, recorder, storage, wiring,
              casing and mobile setup. Prices are indicative; final quote follows the free site
              survey.
            </p>
          </div>
        </header>

        <div className="pkg__grid">
          {packages.map((p, i) => (
            <PackageCard key={p.code} pkg={p} index={i} />
          ))}
        </div>

        <p className="pkg__disclaimer mono">
          Need 16, 24 or 32 channels, or a custom site with long cable runs? We build those too —
          call{' '}
          <a href={`tel:${business.phones[0].replace(/\s/g, '')}`}>{business.phones[0]}</a> for a
          written quote.
        </p>
      </div>
    </section>
  )
}
