# DESIGN — `index.html` Landing Page

> Design reference for the `learning.benben.me` landing page (`/index.html`).
> Read this before editing the page so new content stays on-system.

## Basis

**Inspired by [Raycast](https://www.raycast.com)**'s marketing design language.
Canonical source-of-truth spec:
`~/ai/skills/awesome-design-md/design-md/raycast/DESIGN.md`

One-sentence ethos: **a single continuous dark mode that reads like an extended
developer-tool screenshot — pure-near-black canvas, hairline borders, surface
ladder for depth (no drop shadows), Inter with the `ss03` stylistic set, and a
white CTA as the only bright surface.**

## Constraints (do not break)

- **Dark-only.** No light variant.
- **No drop shadows.** Depth comes from the surface-color ladder (`canvas` →
  `surface` → `surface-elevated` → `surface-card`).
- **White (`#fff`) is the brand action color**, used sparingly — at most one
  solid bright surface per viewport.
- **Inter + `ss03`.** The alternate single-story `g` is the signature; without
  it the type reads as plain Inter. The feature flag is set on `body`.
- **Hairline borders** (`#242728`) carry every card edge.
- **Card radius clusters at 10px** (`--r-lg`); buttons/inputs at 8px (`--r-md`).

## Tokens (as used in `index.html`)

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#07080a` | Page background |
| `--surface` | `#0d0d0d` | Default card background |
| `--surface-elevated` | `#101111` | Card hover fill, ghost button |
| `--surface-card` | `#121212` | Icon tile fill |
| `--hairline` | `#242728` | 1px card borders |
| `--hairline-soft` | `rgba(255,255,255,0.08)` | Faint dividers |
| `--hairline-strong` | `rgba(255,255,255,0.16)` | Hover borders |
| `--ink` | `#f4f4f6` | Headlines |
| `--body` | `#cdcdcd` | Paragraph text |
| `--mute` | `#9c9c9d` | Metadata, host paths |
| `--ash` | `#6a6b6c` | Eyebrow slashes, lowest-emphasis |
| `--on-dark` | `#ffffff` | Hovered/active text |
| `--r-md` | `8px` | Buttons, icon tiles |
| `--r-lg` | `10px` | Cards |

Typography: **Inter** (Google Fonts) at 400 / 500 / 600 with
`font-feature-settings: "calt","kern","liga","ss03"` on `body`. Mono accents
(eyebrows, host paths) use `ui-monospace, SF Mono, JetBrains Mono, Menlo`.

## Layout structure

```
<header.nav>        sticky, 56px, backdrop-blur, hairline bottom border
  wordmark (left) → https://benben.me
  GitHub link (right) → repo
<main>
  <section.hero>    centered, ~104px top padding
    eyebrow pill    // LEARNING RECORDS
    h1.display      "Benben"  (clamp 40→72px, 600)
    p.subtitle      "Software developer. · Always learning."
  <div.cards>       2-col grid (→1-col <680px), 12px gap
    <a.card> × N
<footer>            hairline top, © + tagline
```

## Component anatomy — `.card` (horizontal, compact)

```
<a.card href="…">
  <div.card-icon>      38px tile, surface-card + hairline, holds an inline SVG
    <svg> … </svg>
  </div>
  <div.card-body>       min-width:0; flex:1
    <h2.card-title>     16px / 600 / ink
    <p.card-desc>       13.5px / 1.5 / body
    <p.card-host>       mono 11.5px / mute  (optional)
  </div>
</a>
```

Card chrome: `background: var(--surface)`, `border: 1px solid var(--hairline)`,
`border-radius: var(--r-lg)`, `padding: 16px 18px`.
Hover → `background: var(--surface-elevated)`, `border-color: var(--hairline-strong)`.
No shadow, no transform (per system).

## How to add a new card

1. Pick an **inline SVG icon** (~18px, `fill="currentColor"` or stroke-based).
   Wrap it in `<div class="card-icon">…</div>`.
2. Copy the `.card` block above, set `href`, fill `.card-title` + `.card-desc`.
   Add `.card-host` only if the destination URL is worth showing.
3. Drop it inside `<div class="cards">`. The 2-col grid lays it out
   automatically; rows fill top-to-bottom, left-to-right.
4. Keep one idea per card. If a section grows past ~6 cards, introduce a
   `<p class="section-label">// SECTION NAME</p>` label above a new `.cards`
   block and split content by category (Courses / Languages / Tools / Research).

## Responsive

| Width | Behavior |
|---|---|
| ≥ 681px | 2-column card grid, full nav |
| ≤ 680px | Cards stack 1-column; hero padding shrinks; footer centers |

`prefers-reduced-motion` disables all transitions.

## Decisions

- **Single file, no build.** CSS + SVG inlined; Inter from Google Fonts. Works
  directly on GitHub Pages (`.nojekyll` present).
- **Horizontal cards** (icon left, content right) chosen over vertical for
  density — minimizes vertical footprint so many cards fit as the site grows.
- **Wordmark links to `benben.me`** (personal brand hub), not the repo.
- Host path shown in mono under each card as a subtle provenance cue.
