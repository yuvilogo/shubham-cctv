import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages project sites are served from /<repo>/, so the asset base
  // must match or every /assets/... URL 404s. The Pages workflow sets
  // VITE_BASE to /<repo>/; local dev and custom domains fall back to '/'.
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  build: {
    // the 3D hero is intentionally a large lazy chunk; it never blocks first paint
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: '0.0.0.0',
    port: 12000,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
})
