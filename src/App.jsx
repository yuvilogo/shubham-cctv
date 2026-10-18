import { useState } from 'react'
import Preloader from './components/Preloader.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import BrandMarquee from './components/BrandMarquee.jsx'
import Services from './components/Services.jsx'
import Packages from './components/Packages.jsx'
import FeedWall from './components/FeedWall.jsx'
import Process from './components/Process.jsx'
import Trust from './components/Trust.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      <Preloader onDone={() => setBooted(true)} />
      <Nav />
      <main className={booted ? 'is-booted' : ''}>
        <Hero />
        <BrandMarquee />
        <Services />
        <Packages />
        <FeedWall />
        <Process />
        <Trust />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
