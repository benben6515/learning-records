# DESIGN.md — EPICS Portal (`epics/index.html`)

> Design system for the **world-of-myth portal** — the front door to the
> nine reading-path sub-sites: `greek-epics`, `mesopotamian-epics`, `norse-mythology`,
> `persian-shahnameh`, `indian-epics`, `arthurian-cycle`, `kalevala`, `celtic-irish`,
> and `east-asian`.
> Read this before touching `index.html`. It is the single source of truth for how
> the portal looks and feels. The three sub-sites keep their own palettes; this
> document governs only the **unified entry page** and any future portal-level chrome.

---

## 1 · Visual Theme & Atmosphere

**Mood:** an **illuminated atlas of myth** — aged parchment, gold-leaf accents, sepia ink.
The feel of a medieval manuscript that has catalogued the world's stories. Warm, paper,
hand-touched — *not* a dark screen.

**Why parchment:** the portal is the parent of the nine reading-path sub-sites, most of
which are warm parchment/sand surfaces. A parchment portal makes the whole family belong
together; those that keep a darker theme (`norse-mythology`, `east-asian`) do so only
*inside their own sub-site*, by design.

**Philosophy:** the portal is an index, not a content page. It must orient instantly
(sticky nav, numbered sections), stay calm (generous negative space, one accent), and
let each of the three cultures wear its own colour *only inside its own card*.
The unifying voice is **aged gold** — the gold-leaf of an illuminated manuscript, the one
material all three mythologies treasured.

**Density:** medium-low. One job per section. No section competes with another.

**Voice:** editorial, literary, bilingual (EN primary / 繁體中文 secondary). Serif prose,
monospace labels. No emojis. Never.

**Inspiration anchors:** a medieval bestiary / Book of Hours · WIRED broadsheet density ·
Linear precision (borrowed as discipline, never as dark theme).

---

## 2 · Color Palette & Roles

All colours are semantic CSS custom properties. Use the token, never the hex.

### Base surfaces (warm parchment canvas)
| Token | Hex | Role |
|---|---|---|
| `--paper` | `#f3e9d2` | page canvas (base manuscript page) |
| `--paper-2` | `#ead9b8` | warm lift, hero glow, section bands |
| `--paper-3` | `#dcc796` | deeper aged band, table header |
| `--paper-edge` | `#c4a86a` | foxed / burnt edge, deepest vignette |
| `--surface` | `rgba(90,60,20,0.045)` | card / panel fill (rest) |
| `--surface-hi` | `rgba(90,60,20,0.08)` | card fill (hover / active) |

### Borders & dividers
| Token | Hex | Role |
|---|---|---|
| `--border` | `rgba(90,60,20,0.20)` | default hairline |
| `--border-hi` | `rgba(90,60,20,0.34)` | emphasized edge, dashed "future" cards |

### Text (sepia ink)
| Token | Hex | Role |
|---|---|---|
| `--ink` | `#2a1810` | primary text (sepia black) |
| `--ink-2` | `#5a4530` | secondary text, body |
| `--ink-3` | `#7a6850` | muted, captions, meta |

### Accent — the ONE unifying colour (illuminated gold-leaf)
| Token | Hex | Role |
|---|---|---|
| `--gold` | `#9e7b1e` | primary chrome accent: nav active, eyebrows, links |
| `--gold-bright` | `#c19a2e` | emblems, bright gold-leaf |
| `--gold-soft` | `#b8983e` | hover / secondary accent |

### Per-culture identity (used ONLY inside that culture's card / timeline band)
| Token | Hex | Culture |
|---|---|---|
| `--c-greek` | `#5c1a1b` | Greek — wine (the sub-site's structural colour) |
| `--c-meso` | `#1a4480` | Mesopotamian — deep lapis |
| `--c-norse` | `#3a4754` | Norse — storm iron |
| `--c-persian` | `#2a9d8f` | Persian — firouzeh turquoise |
| `--c-indian` | `#b8341f` | Indian — sindoor vermillion |
| `--c-arthurian` | `#2d5a3d` | Arthurian — mossy forest green |
| `--c-kalevala` | `#1e5a7a` | Kalevala — deep lake blue |
| `--c-celtic` | `#6b3a5a` | Celtic & Irish — heather purple |
| `--c-east-asian` | `#1a1814` | East Asian — sumi ink black (seal-red accent) |

> **Rule:** culture colours never appear in chrome (nav, hero, footer) or in another
> culture's card. Aged gold is the only colour allowed in shared surfaces.

---

## 3 · Typography Rules

**Two families, used strictly by role:**

- **Serif / prose / display** — `"Iowan Old Style", "Palatino Linotype", "Georgia", serif`
  → all headings, all narrative prose, card titles.
- **Mono / labels** — `"SF Mono", ui-monospace, "Menlo", monospace`
  → eyebrows, section numbers, nav, meta, stage counts. Uppercase, wide tracking.

### Type scale (1.25 ratio)
| Token | Size | Weight | Tracking | Line | Use |
|---|---|---|---|---|---|
| `--t-hero` | `clamp(2.8rem, 9vw, 6.5rem)` | 700 | 0.18em | 1.0 | hero H1 |
| `--t-h2` | `clamp(1.5rem, 3.2vw, 2.1rem)` | 600 | 0.06em | 1.2 | section titles |
| `--t-h3` | `clamp(1.5rem, 2.4vw, 1.9rem)` | 600 | 0.02em | 1.15 | card titles |
| `--t-body` | `1rem` | 400 | 0 | 1.7 | prose |
| `--t-body-sm` | `0.9rem` | 400 | 0 | 1.55 | card essence |
| `--t-label` | `0.78rem` | 600 | 0.18em | 1.4 | eyebrow / nav (mono, UPPER) |
| `--t-meta` | `0.76rem` | 500 | 0.1em | 1.4 | captions (mono) |

### Bilingual rule
Chinese (`.zh`) always renders ≤0.85em of its English sibling, italicised, at
`--ink-3` opacity. English leads; Chinese echoes.

---

## 4 · Component Stylings

### Sticky nav (`<nav.top-nav>`)
- `position: fixed; top:0`, full width, `z-index: 1000`
- background `rgba(243,233,210,0.85)` (paper), `backdrop-filter: blur(14px)`
- `border-bottom: 1px solid var(--border)`
- height `60px`, content max-width `1100px`
- **Left:** wordmark `EPICS` (serif, 1.1rem, letter-spacing 0.22em, sepia ink) + tiny emblem glyph `✦ ◆ ❄` (aged gold)
- **Right:** anchor links (mono, 0.78rem, UPPER, 0.18em tracking) — Worlds · Mirror · Timeline · Future
- **Active state:** aged-gold underline (2px) + gold text; scroll-spy toggles via JS
- **Hover:** ink-2 → `--gold`; 150ms ease
- Mobile (<860px): links collapse to the wordmark + a single compact row; targets ≥44px

### Progress bar
- 2px aged-gold gradient, top of viewport, `z-index:1001`, width tracks scroll %

### World card (`.world`)
- surface `var(--surface)`, `border: 1px solid var(--border)`, radius `14px`
- `padding: 2.2rem 1.8rem 1.8rem`
- **top accent bar** 4px in the card's culture colour
- **eyebrow** (mono): `CIVILIZATION I · 已完成` in culture colour
- **stage dots**: row of pills in culture colour, opacity 0.4 → 0.85 on hover
- hover: `translateY(-6px)`, `border-color: culture`, soft sepia drop-shadow
  `0 10px 30px rgba(90,60,20,0.18)`, faint culture-coloured wash (opacity ≤0.06)
- **enter link** (mono): arrow gap widens 0.5rem→0.9rem on hover

### Section header pattern
Every content section opens with the same editorial header:
```
[§01 — eyebrow, mono, aged gold]  ←-- section number + label
[Section Title, serif H2]         ←-- English
[中文, --ink-3, italic]            ←-- Chinese echo
```

### Mirror table
- `border-collapse`, `border: 1px solid var(--border)`, radius `12px` overflow hidden
- thead: `--paper-3` bg, culture-coloured column headers (mono UPPER)
- tbody th: 22% width, aged-gold-soft, mono
- row dividers: `1px solid var(--border)`
- <700px: table → stacked cards (each row a block)

### Timeline band
- flex row of culture-tinted bands on parchment; each band a vertical gradient from
  faint paper → culture colour wash (max ~0.2 opacity, never opaque)
- <700px: stacks vertically

### "Coming next" card
- **always dashed** (`1px dashed var(--border-hi)`), opacity 0.75 → 1 on hover
- signals "not yet built" without looking broken

### Back-to-top
- fixed bottom-right, paper disc with aged-gold border, 44px target, sepia glyph

---

## 5 · Layout Principles

### Spacing scale (8px base)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`  — use these, nothing in between.

### Content widths
| Use | Max-width |
|---|---|
| Card grid (3-up) | 1100px |
| Tables / timeline | 1000px |
| Prose / intro | 760px |

### Section rhythm
- vertical padding: `5rem 2rem` desktop, `3.5rem 1.5rem` mobile
- sections separated by `--border` hairline, never by heavy rules
- one H2 per section; no orphan headings

### Grid
- worlds: `grid-template-columns: repeat(3,1fr)` (3-up; clean at 3/6/9 worlds, 3+2 at 5), gap `1.6rem`, collapse to 1-col `<860px`
- future: `auto-fit, minmax(180px,1fr)`

---

## 6 · Depth & Elevation

| Layer | Token / value | Use |
|---|---|---|
| canvas | z 0 | parchment bg (+ optional paper-fibre texture overlay) |
| content | z 1 | sections |
| nav | z 1000 | sticky bar |
| progress | z 1001 | top bar |
| back-to-top | z 999 | floating |

### Shadows (sepia, warm — never pure black)
- card rest: none (border carries it)
- card hover: `0 10px 30px rgba(90,60,20,0.18)`
- nav: no shadow; the paper blur + border do the work
- culture wash on hover: culture colour, `opacity ≤ 0.06` — never garish

**Principle:** elevation on parchment is signalled by border + warm sepia shadow + lift,
not heavy black drop-shadows.

---

## 7 · Do's and Don'ts

### ✅ Do
- Keep **aged gold** as the single accent in shared chrome.
- Keep the canvas **warm parchment** — never a dark screen. (The dark storm-iron
  theme belongs to the Norse sub-site alone.)
- Lead with English; echo in 繁體中文.
- Use the eyebrow + H2 + Chinese-echo header pattern on every section.
- Number sections `§01–§04`; mirror them in the nav.
- Let each culture colour live only in its own card / timeline band.
- Reserve dashed borders for "not yet built".

### 🚫 Don't
- Don't introduce a 4th type family.
- Don't use emojis.
- Don't switch the portal to a dark theme — it breaks family with the parchment sub-sites.
- Don't let culture colours bleed into nav, hero, footer, or another culture's card.
- Don't use drop-shadows heavier than the hover token, or pure-black shadows.
- Don't break the 8px spacing scale.
- Don't auto-play motion faster than 400ms, or animate more than one transform per element.

---

## 8 · Responsive Behavior

| Breakpoint | What collapses |
|---|---|
| `< 1100px` | card grid stays 3-up but tightens padding |
| `< 860px` | world cards → 1-column stack; nav links compress |
| `< 700px` | mirror table → stacked row-cards; timeline → vertical stack; nav → wordmark + compact row |

- All tap targets ≥ 44×44px.
- `scroll-behavior: smooth`; `prefers-reduced-motion` disables texture drift/slide.
- No horizontal scroll at any width (`overflow-x: hidden`).

---

## 9 · Agent Prompt Guide

> **Quick build prompt:** *"Read `DESIGN.md`. Build/modify `index.html` to follow it
> exactly — warm parchment canvas, aged-gold-only chrome accent, sticky nav with
> scroll-spy, editorial `§NN` section headers, 8px spacing scale, serif prose + mono
> labels. Per-culture colours appear only inside that culture's card. The portal must
> never be a dark screen. No emojis, no extra type families."*

**One-line colour reference:**
`paper #f3e9d2 · ink #2a1810 · gold #9e7b1e · greek #5c1a1b · meso #1a4480 · norse #3a4754 · persian #2a9d8f · indian #b8341f · arthurian #2d5a3d · kalevala #1e5a7a · celtic #6b3a5a · east-asian #1a1814`

**Section map (information architecture):**
`Hero → §01 Worlds (9 cards) → §02 Mirror (comparison table) → §03 Timeline → §04 Complete → Footer`
