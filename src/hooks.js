import { useEffect, useRef, useState } from 'react'

export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    let done = false
    const show = () => {
      if (done) return
      done = true
      setVisible(true)
      observer.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }

    // Jumping straight past a section (nav anchors, restored scroll
    // position, deep links) never renders an intersecting frame, so
    // IntersectionObserver alone would leave those blocks invisible
    // forever. This also fires for anything already scrolled past.
    const check = () => {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.92) show()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) show()
      },
      { threshold, rootMargin },
    )
    observer.observe(node)
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    check()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [threshold, rootMargin])

  return [ref, visible]
}

export function useScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    let raf = 0
    // Writing the scale straight to the node keeps a scroll from
    // re-rendering the header (and its links) on every frame.
    const apply = () => {
      raf = 0
      const height = document.documentElement.scrollHeight - window.innerHeight
      const p = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0
      node.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return ref
}

export function useClock(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })
  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (event) => setMatches(event.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])
  return matches
}
