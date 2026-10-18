import { services } from '../data/business.js'
import { useReveal } from '../hooks.js'

function ServiceRow({ item, index }) {
  const [ref, visible] = useReveal()
  return (
    <article
      ref={ref}
      className={`srv reveal${visible ? ' is-in' : ''}`}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <div className="srv__id mono">
        <span>{item.id}</span>
        <span className="srv__rec">
          <span className="dot-live" /> REC
        </span>
      </div>
      <div className="srv__body">
        <h3 className="srv__title display">{item.title}</h3>
        <p className="srv__text">{item.body}</p>
        <ul className="srv__points">
          {item.points.map((p) => (
            <li key={p} className="mono">
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="srv__index display" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>
    </article>
  )
}

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="shell">
        <header className="section-head">
          <div>
            <span className="eyebrow">// 01 — Capabilities</span>
            <div className="hud-corner tl" />
          </div>
          <div>
            <h2 className="section-title">
              What we <em>do</em>
            </h2>
            <p className="section-lede" style={{ marginTop: '1.5rem' }}>
              One team from the first site visit to the fifth year of service. We sell the
              hardware, run the cable, configure the recorder, set up your phone — and pick up the
              call when something needs attention.
            </p>
          </div>
        </header>

        <div className="srv__list">
          {services.map((s, i) => (
            <ServiceRow key={s.id} item={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
