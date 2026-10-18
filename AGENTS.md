# Shubham CCTV — marketing site

Production marketing site for **Shubham CCTV** (CCTV sales, installation & service),
Vishwakarma Chowk, Premgarh Road, Hoshiarpur, Punjab 146001.

## Stack

React 18 + Vite 5, `@react-three/fiber` / `drei` / `three` for the 3D hero,
plain CSS (`src/index.css` for tokens + primitives, `src/sections.css` for sections).
No CSS framework, no animation library.

## Commands

```bash
npm run dev      # vite dev server on 0.0.0.0:12000
npm run build    # production build to dist/
npm run preview  # serve dist/ on 0.0.0.0:4173
npm run serve    # serve dist/ on 0.0.0.0:12000 (the exposed work host)
npm run deploy   # build, then serve dist/ on 0.0.0.0:12000
```

## Deployment

The site is a static SPA, so `dist/` is the deployable artefact — any static
host works.

**Current deployment:** the built site is served on port 12000, which is
published as `https://work-1-yjkiawyvlkqnpnko.prod-runtime.all-hands.dev/`.
Restart it detached so it survives the session:

```bash
cd /workspace/project
npm run build
setsid nohup npx vite preview --host 0.0.0.0 --port 12000 > /tmp/preview.log 2>&1 < /dev/null &
```

Note: `npx vite preview` is fine for a preview but is not a hardened server.
For real hosting put `dist/` behind nginx/Caddy or a CDN, and add the SPA
fallback `try_files $uri /index.html` (there is only one route, but direct
hits on `/anything` should still render the app).

**Hosts not available in this environment:** there are no Vercel, Netlify or
Cloudflare credentials, and the GitHub token cannot create repositories
(`Resource not accessible by integration`), so a GitHub Pages or Vercel
deploy has to be done by the account owner.

## Layout

- `src/data/business.js` — **single source of truth** for all business facts
  (phones, addresses, hours, services, packages, reviews, FAQs, coverage area).
  Edit copy here, not in components.
- `src/hooks.js` — `useReveal`, `useScrollProgress`, `useClock`, `useMediaQuery`.
- `src/components/` — `Nav`, `Hero`, `Hero3D`, `CCTVModel`, `ScanCone`,
  `BrandMarquee`, `Services`, `Packages`, `FeedWall`, `FeedCanvas`, `Process`,
  `Trust`, `Contact`, `Footer`, `Preloader`.
- `public/favicon.svg` — inline lens mark.

Section anchors: `#top`, `#services`, `#packages`, `#feeds`, `#process`,
`#reviews`, `#contact`.

## Gotchas

- **Never put `overflow-x: hidden` on `body`.** It makes `<body>` a scroll
  container, and fragment navigation then scrolls `body` (which cannot scroll)
  instead of the viewport — every nav link silently stops working. Use
  `overflow-x: clip`, which contains stray wide elements without that effect.
- `.section` carries `scroll-margin-top: 92px` to clear the fixed 76px nav.
  Keep these in sync if the nav height changes.
- `Hero3D` is `lazy()`-loaded on purpose: three.js is ~900 kB and must not
  block first paint. Keep the main chunk small; `chunkSizeWarningLimit` in
  `vite.config.js` is raised to allow the intentional 3D chunk.
- `FeedCanvas` pauses its rAF loop via `IntersectionObserver` when scrolled
  out of view — four always-on canvases drain phone batteries.
- `scroll-behavior: smooth` is set globally and disabled under
  `prefers-reduced-motion`. Under software rendering (headless SwiftShader)
  smooth scrolls take ~1.5 s, so **scroll tests must poll until `scrollY`
  settles** rather than using a fixed delay.
- Nav breakpoints: burger below 1024px, desktop links at ≥1024px,
  status clock ≥1180px, call CTA ≥760px.
