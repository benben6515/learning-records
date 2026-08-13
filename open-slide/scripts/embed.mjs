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
//   2. <BrowserRouter basename=...>      — ensure routes resolve under /slides/.
//                                          @open-slide/core >= 1.18 sets this
//                                          itself from import.meta.env.BASE_URL,
//                                          so no patch is needed there. For
//                                          older core, a build-time transform
//                                          injects it into app.tsx.
//
// The router transform is applied only when the core doesn't already provide a
// basename; it does not touch node_modules (survives reinstalls) but couples to
// open-slide's app entry shape — see dev/docs/slides.md. The script reports
// which path it took, and warns only if it can't find <BrowserRouter> at all.
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

// Ensure <BrowserRouter> carries a basename so routes resolve under /slides/.
// Newer @open-slide/core (>= 1.18) sets it natively; older core needs a patch.
let routerState = 'missing' // 'native' | 'patched' | 'missing'
cfg.plugins = [
  ...(Array.isArray(cfg.plugins) ? cfg.plugins : []),
  {
    name: 'open-slide:router-basename',
    enforce: 'pre',
    transform(code, id) {
      // Scope to the core's app entry — posix path on this host.
      if (!id.includes('@open-slide/core') || !id.endsWith('/app.tsx'))
        return null
      // Core already wires up a basename — nothing to do.
      if (/<BrowserRouter\s+basename=/.test(code)) {
        routerState = 'native'
        return null
      }
      // Older core: inject the basename.
      if (code.includes('<BrowserRouter>')) {
        routerState = 'patched'
        return {
          code: code.replace(
            '<BrowserRouter>',
            '<BrowserRouter basename={import.meta.env.BASE_URL}>',
          ),
          map: null,
        }
      }
      return null
    },
  },
]

await build(cfg)

if (routerState === 'native')
  console.log('[embed] router basename: provided natively by @open-slide/core')
else if (routerState === 'patched')
  console.log('[embed] router basename: patched into @open-slide/core app.tsx')
else
  console.warn(
    '\n[embed] WARNING: <BrowserRouter> not found in @open-slide/core app.tsx '
    + '(neither native nor patchable). Client routing under /slides/ will '
    + 'likely 404. open-slide may have changed its app entry; update this '
    + 'script.\n',
  )
