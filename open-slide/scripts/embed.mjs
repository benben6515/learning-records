// Builds the open-slide SPA for embedding into the `dev` site at /slides/.
//
// Why this exists instead of the stock `open-slide build`:
//   `open-slide build` produces a root-deployed SPA (asset URLs are absolute
//   `/assets/...`, and react-router's <BrowserRouter> has no basename). Neither
//   `base` nor a router basename is exposed via open-slide.config.ts, and the
//   generated Vite config sets `configFile: false`, so a user vite.config is
//   ignored. To host the app under the sub-path /slides/ we instead reuse
//   open-slide's own config factory (`createViteConfig`) and apply two tweaks:
//
//   1. base: '/slides/'                  — relocate every asset URL under /slides/
//   2. <BrowserRouter basename=...>      — patch the core's app entry at build
//                                          time so routes resolve under /slides/
//
// The router patch is a *build-time source transform*, re-applied on every
// build. It does not touch node_modules, so it survives reinstalls, but it does
// couple us to open-slide's internal app entry shape — see dev/docs/slides.md.
// If a future @open-slide/core release renames/restructures app.tsx the patch
// silently no-ops and this script prints a warning (routing will then 404, easy
// to catch in QA).
//
// Run from the open-slide project root (the npm script `embed` does that).

import { build } from 'vite'
import { createViteConfig } from '@open-slide/core/vite'

const BASE = '/slides/'

const cfg = await createViteConfig({
  userCwd: process.cwd(),
  mode: 'build',
})

// Relocate the whole app under /slides/.
cfg.base = BASE

// Inject a basename onto <BrowserRouter> in the core's app entry.
let patchedRouter = false
cfg.plugins = [
  ...(Array.isArray(cfg.plugins) ? cfg.plugins : []),
  {
    name: 'open-slide:router-basename',
    enforce: 'pre',
    transform(code, id) {
      // Scope to the core's app entry — posix path on this host.
      if (!id.includes('@open-slide/core') || !id.endsWith('/app.tsx'))
        return null
      if (!code.includes('<BrowserRouter>'))
        return null
      patchedRouter = true
      return {
        code: code.replace(
          '<BrowserRouter>',
          '<BrowserRouter basename={import.meta.env.BASE_URL}>',
        ),
        map: null,
      }
    },
  },
]

await build(cfg)

if (!patchedRouter) {
  console.warn(
    '\n[embed] WARNING: <BrowserRouter> basename patch did not apply — '
    + 'no match found in @open-slide/core .../app.tsx. Client routing under '
    + '/slides/ will likely 404. open-slide may have changed its app entry; '
    + 'update this script.\n',
  )
}
