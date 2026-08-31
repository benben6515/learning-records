---
name: OpenCode
description: The official opencode CLI theme — a pure neutral gray ramp with a single warm peach accent, extracted verbatim from the sst/opencode TUI's built-in dark palette.
mode: dark
---

# OpenCode

The visual identity of the opencode CLI itself, taken directly from its built-in dark theme (`packages/tui/src/theme/assets/opencode.json` in `sst/opencode`). The canvas is a **pure neutral gray ramp** (`#0a0a0a` → `#282828`) — no navy or blue cast, deliberately distinct from navy-tinted "editorial dark" decks. All emphasis work is carried by one warm peach (`#fab283`, the CLI's `primary`); blue and purple (the CLI's `secondary`/`accent`) exist only as syntax-coded counterpoints. Mono type carries every label because this identity comes from a terminal.

## Palette

| Role         | Value     | Notes                                                            |
| ------------ | --------- | ---------------------------------------------------------------- |
| bg           | `#0a0a0a` | page background (darkStep1)                                      |
| text         | `#eeeeee` | primary copy (darkStep12)                                        |
| primary      | `#fab283` | warm peach — eyebrow, titles, key numbers, bullets (darkStep9)   |
| secondary    | `#5c9cf5` | blue — links, cool counterpoint (darkSecondary)                  |
| accent       | `#9d7cd8` | purple — syntax keywords, highlighted phrases (darkAccent)       |
| muted        | `#808080` | secondary copy, footers, comments (darkStep11)                   |
| surface      | `#141414` | cards (darkStep2)                                                |
| surfaceHi    | `#1e1e1e` | card headers, inset panels (darkStep3)                           |
| surfaceMax   | `#282828` | deepest inset (darkStep4)                                        |
| border       | `#484848` | hairlines (darkStep7)                                            |
| borderActive | `#606060` | emphasized hairlines (darkStep8)                                 |
| borderSubtle | `#3c3c3c` | faintest hairline (darkStep6)                                    |
| green        | `#7fd88f` | success, diff-added strings (darkGreen)                          |
| diffAdded    | `#4fd6be` | diff-added teal                                                  |
| orange       | `#f5a742` | warning, numbers (darkOrange)                                    |
| red          | `#e06c75` | error, variables, diff-removed (darkRed)                         |
| diffRemoved  | `#c53b53` | diff-removed deep                                                |
| cyan         | `#56b6c2` | info, operators, cool counterpoint (darkCyan)                    |
| yellow       | `#e5c07b` | types, headings highlight (darkYellow)                           |

## Typography

- Display font: `"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif` — weight 700 for headlines, tight tracking (`-0.045em` hero, `-0.03em` section headings).
- Body font: same Inter stack — weight 400–500.
- Mono font: `"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace` — eyebrows, tags, footers, code/URLs. **Lean on mono heavily**: this is a CLI tool's theme, so mono labels are the identity, not decoration.
- Type-scale (committed sizes):
  - Hero title: 140 px
  - Section heading (h2): 64 px
  - Body / bullets: 30–32 px
  - Eyebrow / label: 20 px
  - Tag / micro: 16–18 px

## Layout

- Content padding: 100–140 px from canvas edges (1920 × 1080). Copy never touches the edge.
- Alignment: left-aligned single column (editorial); reserve centered for the closing page.
- Motif: a faint 88 px grid (`GridBg`), radially masked so it fades at the edges, tinted faintly peach to echo the primary on the neutral-gray canvas. Present on every page for continuity.
- Card radius: 16 px (`--osd-radius`). Hairline borders `#484848`; lift to `#606060` (borderActive) on emphasis.
- Layering: cards sit **lighter** than the base (surface `#141414` > bg `#0a0a0a`) — cards step up through the `darkStep` ramp (`#141414` / `#1e1e1e` / `#282828`), the same convention as the source CLI's background steps.

## Fixed components

Paste-ready. Copy verbatim into a slide that uses this theme. The demo (`opencode.demo.tsx`) inlines the exact same `Title`, `Footer`, `Eyebrow` — keep them in lockstep.

### Title

```tsx
const Title = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <h1
    className="oc-fadeUp"
    style={{
      margin: 0,
      fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
      fontSize: 140,
      fontWeight: 700,
      lineHeight: 1.02,
      letterSpacing: '-0.045em',
      color: accent ? '#fab283' : '#eeeeee',
    }}
  >
    {children}
  </h1>
);
```

### Footer

Pull the page number from `useSlidePageNumber()` — never hardcode `current` / `total`.

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace',
        fontSize: 18,
        letterSpacing: '0.08em',
        color: '#808080',
      }}
    >
      <span>OPENCODE · 2026</span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children, color = '#fab283' }: { children: React.ReactNode; color?: string }) => (
  <div
    className="oc-fadeUp"
    style={{
      fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace',
      fontSize: 20,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </div>
);
```

### Supporting components (also paste-ready)

```tsx
// Faint masked grid — continuity motif. One on every page.
const GridBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(250,178,131,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(250,178,131,0.022) 1px, transparent 1px)',
      backgroundSize: '88px 88px',
      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
    }}
  />
);

const Tag = ({ text, color = '#fab283' }: { text: string; color?: string }) => (
  <span
    style={{
      fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace',
      fontSize: 16,
      color,
      background: `${color}18`,
      border: `1px solid ${color}30`,
      padding: '5px 12px',
      borderRadius: 6,
      fontWeight: 500,
      display: 'inline-block',
    }}
  >
    {text}
  </span>
);
```

## Motion

Philosophy: **subtle**. Per-element entrances only — elements fade up ~20 px on page mount, staggered ~100 ms. No loops, no parallax. The deck-wide page transition is a quiet RISE (opacity + ≤6 px Y, 200 ms).

Reusable keyframes (paste-ready):

```css
@keyframes oc-fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes oc-fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.oc-fadeUp { opacity: 0; animation: oc-fadeUp 0.8s cubic-bezier(.2,.7,.2,1) forwards; }
.oc-fadeIn { opacity: 0; animation: oc-fadeIn 1s ease forwards; }
```

Deck-wide page transition (declare once at module level):

```tsx
import type { SlideTransition } from '@open-slide/core';

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};
```

## Aesthetic

The terminal as it actually renders: a pure neutral gray ramp (no navy cast) where the only warmth on screen is the peach `#fab283` — the CLI's primary — doing all the emphasis work: eyebrows, titles, key numbers, bullet markers. Purple `#9d7cd8` and blue `#5c9cf5` are syntax-coded counterpoints (keywords / links), never competing accents; the extended set (green / orange / red / cyan / yellow / diff teal / diff rose) exists for status-coded tags and section eyebrows, never as primary emphasis. Cards step up the gray ramp (`#141414` / `#1e1e1e` / `#282828`) behind `#484848` hairlines, over a faint peach-tinted masked grid. Mono type carries every label. Quiet fade-up entrances only. Avoid: navy- or blue-tinted darks, a second warm hue, neon saturation, decorative gradients, drop shadows on type. When in doubt, stay gray and let the peach carry the signal.

## Example usage

```tsx
const Cover: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: '#0a0a0a',
      color: '#eeeeee',
      padding: 120,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <GridBg />
    <Eyebrow>OPENCODE · THEME</Eyebrow>
    <div>
      <Title accent>opencode</Title>
      <p style={{ marginTop: 36, maxWidth: 1000, fontSize: 44, lineHeight: 1.3, color: '#808080' }}>
        Neutral gray ramp, one <span style={{ color: '#fab283' }}>warm peach</span> signal — straight from the CLI.
      </p>
    </div>
    <Footer />
  </div>
);
```
