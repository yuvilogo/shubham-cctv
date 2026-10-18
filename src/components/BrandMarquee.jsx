import { brands } from '../data/business.js'

export default function BrandMarquee() {
  const row = [...brands, ...brands]
  return (
    <section className="marquee" aria-label="Brands we supply and install">
      <div className="marquee__label mono">
        <span className="dot-live" />
        Authorised supply &amp; installation
      </div>
      <div className="marquee__viewport">
        <div className="marquee__track">
          {row.map((b, i) => (
            <span className="marquee__item" key={`${b}-${i}`}>
              {b}
              <i aria-hidden="true">✳</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
