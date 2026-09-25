# DESIGN — `s/` Course Workspaces

> Shared design system for every course under `s/` (backend-dev, english,
> loop-engineering, matt-pocock-skills, scifi-terminal). Read this before
> creating a new course or editing an existing one, so every course reads
> as part of one family: same theme mechanics, same responsive rules,
> same component vocabulary.

## Course Anatomy

```
s/<course>/
├── index.html              # landing: lead paragraph + entries cards
├── MISSION.md  RESOURCES.md  GLOSSARY.md  NOTES.md
├── assets/
│   ├── style.css           # single shared stylesheet (styles.css on older courses)
│   ├── theme.js            # page runtime: theme + reading progress
│   ├── quiz.js             # MC quiz behaviour (courses with quizzes)
│   ├── checklist.js        # interactive checklists (optional)
│   └── highlight.js        # tiny code highlighter (optional)
├── lessons/        lessons-tw/       # EN + zh-Hant lesson pairs
└── reference/      reference-tw/     # EN + zh-Hant reference sheets
```

- Bilingual by convention: `lessons/` ↔ `lessons-tw/` mirror each other,
  same filenames, cross-linked from `index.html` entries cards.
- **Self-contained**: a course must render correctly with only its own
  directory. Never reference another course's assets.

## The One-Script Contract

Every page loads exactly one runtime in `<head>` — **not deferred**, so the
theme applies before first paint:

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="assets/style.css">   <!-- ../assets/ from subdirs -->
<script src="assets/theme.js"></script>
```

`assets/theme.js` is the shared page runtime and must provide all five
features (copy this file from an existing course; only the KEY differs):

1. **Theme** — read `localStorage`, default to **dark**, set
   `data-theme` on `<html>`, inject the ☀/☾ toggle button
   (inline SVG, never text glyphs — glyphs drift off-centre with
   font/emoji fallback metrics).
2. **Reading progress** — inject `.progress-bar` (fixed top, `scaleX`
   driven by scroll, hidden on non-scrollable pages and in print).
3. **Code copy buttons** — wrap every `<pre>` in `.pre-wrap`, add a
   hover `.copy-btn` (clipboard API with `execCommand` fallback).
4. **Section anchors** — `h2`/`h3` direct children of `.sheet` /
   `.container` get slug ids + hover `#` anchor links (CJK-safe slugs).
5. **TOC scroll-spy + keyboard navigation** — pages with ≥3 `h2`s get
   a fixed `.toc` "On this page" nav (viewport ≥75rem only); ←/→ keys
   jump to prev/next lesson, with the order derived from the course
   TOC (`0000-table-of-contents.html` in the same directory), so
   footers don't need prev/next links.

Each course owns a distinct localStorage key so choices don't collide:

| Course | Key |
|---|---|
| english | `en-theme` |
| backend-dev | `bd-theme` |
| scifi-terminal | `st-theme` |
| loop-engineering | `le-theme` |
| matt-pocock-skills | `mp-theme` |

New course → new key (course initials + `-theme`).

## Theme Token Contract

Two layers, no exceptions — **never hardcode colours**:

```css
:root { /* LIGHT — also the fallback + print base */ }
:root[data-theme="dark"] { /* DARK — the default via theme.js */ }
@media print { /* force light */ }
```

- The light palette is derived from each course's print palette; the
  print block stays the last word (always light, ink-saving).
- Every semantic token needs a value in BOTH layers, even if unused
  yet (`--highlight`).
- `--accent-fill` (container-family) pairs with **white text** on solid
  buttons; `--accent` is for text/links/borders. Check contrast in both
  themes before adding a token.

### Token families

Two layout families exist. Pick one per course and stay consistent:

| | sheet family (english, backend-dev, scifi-terminal) | container family (loop-engineering, matt-pocock-skills) |
|---|---|---|
| Shell | `.sheet`, `max-width: var(--measure)` 38rem | `.container`, max-width 680px (`.wide` 860px) |
| Base size | `body { font-size: 19px }` | `html { font-size: 17px }` |
| Surface tokens | `--surface`, `--surface-hover` | `--paper-edge`, `--quiz-bg`, `--code-bg` |
| Extra semantics | `--warm*`, `--ok*`, `--bad*` | `--warn*`, `--note*`, `--correct`, `--incorrect`, `--accent-fill` |
| Fonts | `"Iowan Old Style"/Palatino` serif stack | `"Iowan Old Style"/Charter` serif stack |

## Responsive Rules (single breakpoint)

One breakpoint, `@media (max-width: 48rem)`, appended before the print
block. Contents per family:

```css
/* sheet family */                     /* container family */
body { font-size: 17px }               html { font-size: 16px }
.sheet { padding: 2.5rem 1.1rem 4rem } .container { padding: 2.5rem 1.1rem 4rem }
h1 { font-size: 1.7rem }               h1 { font-size: 1.7rem }
h2 { font-size: 1.3rem }               h2 { font-size: 1.3rem }
.lead { font-size: 1.08rem }           .subtitle { font-size: 1rem }
```

Plus, in both families:

- **Tables**: `table { display: block; overflow-x: auto; }` and
  `th, td { min-width: 6rem; }` so columns never crush to one
  character per line. ⚠️ Do NOT put `min-width` on the table itself —
  a `display: block` table with `min-width` escapes its parent and
  overflows the body.
- **`.flow` stage diagrams**: shrink padding and add vertical margin
  (`.flow .stage { margin: 0.25rem 0 }`) so wrapped rows don't touch.
- **Inline code** (scifi-style `white-space: nowrap`): switch to
  `white-space: normal; overflow-wrap: anywhere` on mobile, but keep
  `pre code` at `white-space: pre`.
- Quiz option padding tightens one notch.
- `.entries` / `.lang-grid` cards are already responsive
  (`flex-wrap` / `auto-fit minmax`) — don't add rules.

## Component Vocabulary

Shared class contract — same class = same behaviour in every course:

- `.kicker` / `.eyebrow` — top metadata line
- `.lead`, `.subtitle` — opening matter
- `.callout` (+ `.note` / `.warn` / `.accent` variants), `.task` — asides
- `.checklist` — interactive checklist (assets/checklist.js)
- `.quiz` — MC quiz (assets/quiz.js); feedback colours are semantic
  tokens only
- `.entries` — index cards (flex-wrap, 14rem basis)
- `.lang-grid` — landing language picker (auto-fit grid)
- `.flow` — pure-CSS pipeline diagrams (`.stage`, `.arrow`, `.branch`)
- `.ref` — reference-doc density: `.ref .card`, `.ref table`
- `.card` — bordered surface panel (index/TOC sections)
- `.footer`, `.nav-next` / `.footer .next` — footer + next-lesson link
- `.theme-toggle`, `.progress-bar` — injected by theme.js, restyled
  per family but same class names
- `.pre-wrap` / `.copy-btn` — code block wrapper + copy button
- `.anchor` — hover `#` link inside section headings
- `.toc` — scroll-spy "On this page" nav (≥75rem viewports only)

## Print

Always light, regardless of chosen theme. Hide chrome, save ink:

```css
@media print {
  :root, :root[data-theme="dark"] { /* light tokens */ }
  .theme-toggle, .progress-bar { display: none; }
  /* break-inside: avoid on callouts, quiz, tables */
}
```

## Authoring Checklist (new course)

1. Copy a course whose layout family fits; rename the localStorage key.
2. Derive light tokens first, then dark; both layers complete.
3. Wire the one-script contract into every page (viewport + css + theme.js).
4. Lesson skeleton: `.kicker` → `.back-nav` (↑ 目錄) → `h1` → `.subtitle`
   → content (callouts, quiz, checklist) → `hr.rule` → `.footer` with
   `.nav-next`.
5. Add the RWD block before print; check a lesson at 390px: no body
   overflow, tables scroll, first column ≥ 6rem.
6. Verify: dark default, toggle remembers across pages, progress bar
   moves and hides on short pages, copy button works, ←/→ jumps
   between lessons, TOC appears on ≥3-section lessons at wide
   viewports, print preview is light.

## Reduced Motion

Every stylesheet ends with a `prefers-reduced-motion: reduce` block that
neutralises transitions/animations. New animated UI must rely on
`transition`/`animation` (not JS-driven motion) so this override keeps
working.
