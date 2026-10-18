import { process, coverage } from '../data/business.js'
import { useReveal } from '../hooks.js'

function Step({ item, index }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`step reveal${visible ? ' is-in' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="step__num display">{item.step}</div>
      <div className="step__rail" aria-hidden="true">
        <span className="step__node" />
      </div>
      <div className="step__body">
        <h3 className="step__title display">{item.title}</h3>
        <p className="step__text">{item.body}</p>
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="shell">
        <header className="section-head">
          <div>
            <span className="eyebrow">// 04 — How it works</span>
          </div>
          <div>
            <h2 className="section-title">
              Four steps, <em>no surprises</em>
            </h2>
            <p className="section-lede" style={{ marginTop: '1.5rem' }}>
              Most homes and shops are surveyed, quoted and installed within three days of the
              first call.
            </p>
          </div>
        </header>

        <div className="steps">
          {process.map((p, i) => (
            <Step key={p.step} item={p} index={i} />
          ))}
        </div>

        <div className="coverage">
          <div className="coverage__head">
            <span className="eyebrow">// Service area</span>
            <h3 className="coverage__title display">
              Hoshiarpur first — <em>and all around it</em>
            </h3>
          </div>
          <ul className="coverage__list">
            {coverage.map((c, i) => (
              <li key={c} style={{ '--i': i }}>
                <span className="coverage__pin" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <p className="coverage__note mono">
            Outside this list? Call and ask — we travel for larger installations.
          </p>
        </div>
      </div>
    </section>
  )
}
