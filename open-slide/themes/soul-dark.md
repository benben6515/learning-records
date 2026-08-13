---
name: Soul Dark
description: Editorial dark deck with a warm amber "soul" accent — premium tech-editorial feel for human-facing technical talks.
mode: dark
---

# Soul Dark

An editorial dark identity built around a single warm amber accent. Extracted from the `openclaw` deck (「有靈魂」的個人助理). The cold near-black canvas carries the technical subject matter; the amber carries the human "soul". Hold the line on one accent — do not introduce a second hue except the supporting terracotta/teal listed below, and only for section-coded eyebrows.

## Palette

| Role        | Value                  | Notes                                            |
| ----------- | ---------------------- | ------------------------------------------------ |
| bg          | `#0e1117`              | page background, near-black with a navy cast     |
| text        | `#e8eaed`              | primary copy                                     |
| accent      | `#e0a458`              | warm amber — eyebrow, key numbers, bullets, tags |
| muted       | `#6b7280`              | secondary copy, dividers, footer                 |
| textSoft    | `#b8bfca`              | body copy below headings                         |
| surface     | `#151921`              | cards                                            |
| surfaceHi   | `#1c212b`              | card headers, inset panels                       |
| surfaceMax  | `#242a35`              | deepest inset                                    |
| border      | `rgba(255,255,255,0.08)` | hairlines on dark                              |
| borderBright| `rgba(255,255,255,0.15)`| emphasized hairlines                           |
| terracotta  | `#d97757`              | section-coded accent (security / warm chapters)  |
| teal        | `#5eb3a8`              | section-coded accent (cool counterpoint, links)  |
| cream       | `#e8dcc4`              | occasional warm highlight text                   |

## Typography

- Display font: `"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif` — weight 700 for headlines, tight tracking (`-0.045em` on hero, `-0.03em` on section headings).
- Body font: same Inter stack — weight 400–500.
- Mono font: `"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace` — eyebrows, tags, footers, URLs. This is the identity's secondary voice; lean on it for labels.
- Type-scale overrides (the committed sizes used across the deck):
  - Hero title: 140 px
  - Section heading (h2): 64 px
  - Body / bullets: 30–32 px
  - Eyebrow / label: 20 px
  - Tag / micro: 16–18 px

## Layout

- Content padding: 100–140 px from canvas edges (1920 × 1080). Never let copy touch the edge.
- Alignment: left-aligned, single column — editorial, not ceremonial (reserve centered for the closing page).
- Motif: a faint 88 px grid (`GridBg` below), masked with a radial gradient so it fades at the edges. Present on every page for continuity.
- Card radius: 16 px (`--osd-radius`). Hairline borders `rgba(255,255,255,0.08)`.

## Fixed components

These are paste-ready. Copy them verbatim into a slide that uses this theme. The demo (`soul-dark.demo.tsx`) inlines the exact same `Title`, `Footer`, `Eyebrow` — keep them in lockstep.

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
      color: accent ? '#e0a458' : '#e8eaed',
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
        color: '#6b7280',
      }}
    >
      <span>SOUL-DARK · 2026</span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children, color = '#e0a458' }: { children: React.ReactNode; color?: string }) => (
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
// Faint masked grid — the deck's continuity motif. Put one on every page.
const GridBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
      backgroundSize: '88px 88px',
      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
    }}
  />
);

const Tag = ({ text, color = '#e0a458' }: { text: string; color?: string }) => (
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

Philosophy: **subtle**. Per-element entrances only — elements fade up ~20 px on page mount, staggered ~100 ms. No looping gimmicks, no parallax. The deck-wide page transition is a quiet RISE (opacity + ≤6 px Y, 200 ms).

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

Editorial dark, premium tech-editorial (the register of Linear / Vercel dark docs), warmed by a single amber accent so a cold technical subject reads as human — "有靈魂". One display family (Inter) paired with one mono (JetBrains Mono) that does all the label/eyebrow/tag work. Generous left-aligned padding, hairline-bordered cards on a faint masked grid, quiet fade-up entrances. Avoid: bright neon, more than one accent hue on a page, decorative gradients, rounded-pill overload, drop shadows on type. When in doubt, remove.

## Example usage

```tsx
const Cover: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: '#0e1117',
      color: '#e8eaed',
      padding: 120,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <GridBg />
    <Eyebrow>OPENCLAW · 簡報</Eyebrow>
    <div>
      <Title>OpenClaw</Title>
      <p style={{ marginTop: 36, maxWidth: 900, fontSize: 44, lineHeight: 1.3, color: '#b8bfca' }}>
        <span style={{ color: '#e0a458' }}>「有靈魂」</span>的個人助理
      </p>
    </div>
    <Footer />
  </div>
);
```
