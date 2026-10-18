import { business, coverage } from '../data/business.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__wordmark display">
              SHUBHAM<span>CCTV</span>
            </span>
            <p className="footer__tag mono">{business.legalLine}</p>
            <p className="footer__blurb">
              Independent CCTV retailer, installer and service provider based in Hoshiarpur,
              Punjab. Cameras, DVR &amp; NVR systems for homes, shops, schools, godowns and
              factories — supplied, installed and maintained by one local team.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <div>
              <span className="eyebrow">Explore</span>
              <a href="#services">Services</a>
              <a href="#packages">Packages</a>
              <a href="#feeds">Live view</a>
              <a href="#process">Process</a>
              <a href="#reviews">Reviews</a>
            </div>
            <div>
              <span className="eyebrow">Contact</span>
              {business.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>
                  {p}
                </a>
              ))}
              <a href={business.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </nav>
        </div>

        <div className="footer__areas">
          <span className="eyebrow">Serving</span>
          <p className="mono">{coverage.join(' · ')}</p>
        </div>

        <div className="footer__bottom mono">
          <span>
            © {year} {business.name}, {business.city} — {business.region}
          </span>
          <span className="footer__lat">
            {business.coords.lat.toFixed(4)}° N, {business.coords.lng.toFixed(4)}° E
          </span>
          <span className="footer__rec">
            <span className="dot-live" /> All systems nominal
          </span>
        </div>
      </div>
    </footer>
  )
}
