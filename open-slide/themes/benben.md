---
name: Benben
description: Neon cyan + electric violet on a near-black canvas — a code/terminal-adjacent identity lifted from the opencode `opencode.lua` editor palette.
mode: dark
---

# Benben

A neon accent palette on a near-black canvas, extracted from the opencode editor theme at `~/.config/nvim/lua/colors/opencode.lua`. The identity is **code/terminal-adjacent and cyber**: a single neon-cyan primary (`#22cfcf`) carries all the emphasis work — eyebrows, key numbers, titles — paired with one electric-violet accent (`#efaaef`) as its deliberate counterpoint for links and highlighted phrases. Mono type carries every label, and the extended syntax palette (mint / chartreuse / sky / peach / pink / yellow) is available for status-coded section accents. Where the source theme leaves a slot committed to a real value, this slide theme holds the source's near-black base so cards and layers separate cleanly on a static canvas.

## Palette

| Role         | Value      | Notes                                                            |
| ------------ | ---------- | ---------------------------------------------------------------- |
| bg           | `#0a0a0f`  | near-black canvas (source bg0)                                   |
| text         | `#F0F0FF`  | lavender-white primary copy (source fg0)                         |
| primary      | `#22cfcf`  | neon cyan — eyebrow, key numbers, titles, emphasis (source purple3) |
| accent       | `#efaaef`  | electric violet — counterpoint, links, highlights (source purple4) |
| muted        | `#D0E0E0`  | secondary copy (source fg1)                                      |
| dim          | `#8090A0`  | tertiary copy, footers, inactive (source fg3)                    |
| surface      | `#12121a`  | cards (source bg1)                                               |
| surfaceHi    | `#1a1a25`  | card headers, inset panels (source bg2)                          |
| surfaceMax   | `#252533`  | deepest inset / floats (source bg3)                              |
| border       | `#3D3D50`  | hairlines (source border)                                        |
| borderBright | `#22cfcf`  | emphasized hairlines (primary, source purple3)                   |
| borderSubtle | `#15151f`  | faintest hairline — one step above bg                            |
| mint         | `#77EFCF`  | section-coded accent (source purple5)                            |
| chartreuse   | `#E1FAA0`  | neon section accent (source purple2)                             |
| sky          | `#89DCEB`  | cool counterpoint (source cyan syntax)                           |
| blue         | `#BBA8F9`  | periwinkle (source blue syntax)                                  |
| green        | `#A6E3A1`  | success / diff-added (source green)                              |
| peach        | `#FAB387`  | warning (source orange)                                          |
| pink         | `#F38BA8`  | error / diff-removed (source red)                                |
| yellow       | `#F9E2AF`  | headings highlight (source yellow)                               |

## Typography

- Display font: `"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif` — weight 700 for headlines, tight tracking (`-0.045em` hero, `-0.03em` section headings).
- Body font: same Inter stack — weight 400–500.
- Mono font: `"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace` — eyebrows, tags, footers, code/URLs. **Lean on mono heavily**: this is a terminal tool's theme, so mono labels are the identity, not decoration.
- Type-scale (committed sizes):
  - Hero title: 140 px
  - Section heading (h2): 64 px
  - Body / bullets: 30–32 px
  - Eyebrow / label: 20 px
  - Tag / micro: 16–18 px

## Layout

- Content padding: 100–140 px from canvas edges (1920 × 1080). Copy never touches the edge.
- Alignment: left-aligned single column (editorial); reserve centered for the closing page.
- Motif: a faint 88 px grid (`GridBg`), radially masked so it fades at the edges, tinted faintly cyan to echo the primary on the near-black canvas. Present on every page for continuity.
- Card radius: 16 px (`--osd-radius`). Hairline borders `#3D3D50` (source `border`); lift to `#22cfcf` (primary) on emphasis.
- Layering: cards sit **lighter** than the base (surface `#12121a` > bg `#0a0a0f`) — cards step up through `bg1` / `bg2` / `bg3`, the same convention as the source editor's background ramp.

## Fixed components

Paste-ready. Copy verbatim into a slide that uses this theme. The demo (`benben.demo.tsx`) inlines the exact same `Title`, `Footer`, `Eyebrow` — keep them in lockstep.

### Title

```tsx
const Title = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <h1
    className="fadeUp"
    style={{
      margin: 0,
      fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
      fontSize: 140,
      fontWeight: 700,
      lineHeight: 1.02,
      letterSpacing: '-0.045em',
      color: accent ? '#22cfcf' : '#F0F0FF',
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
        color: '#8090A0',
      }}
    >
      <span>BENBEN · 2026</span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children, color = '#22cfcf' }: { children: React.ReactNode; color?: string }) => (
  <div
    className="fadeUp"
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
        'linear-gradient(rgba(34,207,207,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(34,207,207,0.028) 1px, transparent 1px)',
      backgroundSize: '88px 88px',
      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
    }}
  />
);

const Tag = ({ text, color = '#22cfcf' }: { text: string; color?: string }) => (
  <span
    style={{
      fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace',
      fontSize: 16,
      color,
      background: `${color}1f`,
      border: `1px solid ${color}3a`,
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
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.fadeUp { opacity: 0; animation: fadeUp 0.8s cubic-bezier(.2,.7,.2,1) forwards; }
.fadeIn { opacity: 0; animation: fadeIn 1s ease forwards; }
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

Neon cyan and electric violet on a near-black canvas — the visual register of a well-themed modern editor. The primary neon cyan (`#22cfcf`) does the dominant emphasis work; the electric-violet accent (`#efaaef`) is its deliberate counterpoint for links and highlighted phrases. The two coexist as a single neon pair (cyan + magenta) — never introduce a third competing accent. Cards sit a shade lighter than the near-black base (the editor's background ramp convention), separated by `#3D3D50` hairlines, over a faint cyan-tinted masked grid. Mono type carries every label because this identity comes from a CLI tool. Quiet fade-up entrances only. The extended palette (mint / chartreuse / sky / green / peach / pink / yellow) exists for status-coded section eyebrows — never run a status color as a primary emphasis. Avoid: pure-white text, heavy drop shadows, decorative gradients, muddy mid-tone backgrounds that wash out the neon, and any non-mono label font. When in doubt, go darker and let the neon carry the contrast.

## Example usage

```tsx
const Cover: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: '#0a0a0f',
      color: '#F0F0FF',
      padding: 120,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <GridBg />
    <Eyebrow>BENBEN · THEME</Eyebrow>
    <div>
      <Title accent>Benben</Title>
      <p style={{ marginTop: 36, maxWidth: 1000, fontSize: 44, lineHeight: 1.3, color: '#D0E0E0' }}>
        Neon <span style={{ color: '#22cfcf' }}>cyan</span> +{' '}
        <span style={{ color: '#efaaef' }}>violet</span> on near-black — a code-flavoured deck.
      </p>
    </div>
    <Footer />
  </div>
);
```
