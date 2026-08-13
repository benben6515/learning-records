---
name: Benben
description: Catppuccin-style pastel on a Mocha-dark canvas — a code/terminal-adjacent identity lifted from the opencode `benben` TUI theme.
mode: dark
---

# Benben

A soft pastel palette on a Catppuccin Mocha-dark base, extracted verbatim from the opencode TUI theme at `~/.config/opencode/themes/benben.json`. The identity is **code/terminal-adjacent**: lavender-purple is the single accent, mono type carries every label, and the extended syntax palette (mint / sky / peach / pink / yellow) is available for status-coded section accents. Where the source theme leaves a slot `none` (transparent background, panel, element), this slide theme commits a real Mocha value so cards and layers separate cleanly on a static canvas.

## Palette

| Role         | Value      | Notes                                                       |
| ------------ | ---------- | ----------------------------------------------------------- |
| bg           | `#1e1e2e`  | Catppuccin Mocha base (source bg is `none` → committed)     |
| text         | `#F0F0FF`  | lavender-white primary copy (source `text`)                 |
| accent       | `#AA97E9`  | soft purple — eyebrow, key numbers, tags (source `primary`) |
| muted        | `#D0E0E0`  | secondary copy (source `textMuted`)                         |
| surface      | `#313244`  | cards — Catppuccin surface0, lighter than base              |
| surfaceHi    | `#45475a`  | card headers, inset panels — surface1                       |
| surfaceMax   | `#585b70`  | deepest inset — surface2                                    |
| border       | `#3D3D50`  | hairlines (source `border`)                                 |
| borderBright | `#8A87E9`  | emphasized hairlines (source `borderActive`)                |
| borderSubtle | `#2D2D3D`  | faintest hairline (source `borderSubtle`)                   |
| mint         | `#77EFCF`  | section-coded accent (source `secondary`)                   |
| sky          | `#89DCEB`  | links, cool counterpoint (source `info`)                    |
| cyan         | `#00C4CC`  | source `accent`                                             |
| green        | `#A6E3A1`  | success / diff-added (source `success`)                     |
| peach        | `#FAB387`  | warning (source `warning`)                                  |
| pink         | `#F38BA8`  | error / diff-removed (source `error`)                       |
| yellow       | `#F9E2AF`  | headings highlight (source `markdownHeading` / `syntaxType`)|
| lavender     | `#C4A8F9`  | list items (source `markdownListItem`)                      |

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
- Motif: a faint 88 px grid (`GridBg`), radially masked so it fades at the edges. Present on every page for continuity.
- Card radius: 16 px (`--osd-radius`). Hairline borders `#3D3D50` (source `border`); lift to `#8A87E9` (source `borderActive`) on emphasis.
- Layering: cards sit **lighter** than the base (surface0 `#313244` > bg `#1e1e2e`) — the Catppuccin convention. Inset panels step up through surface1 / surface2.

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
      color: accent ? '#AA97E9' : '#F0F0FF',
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
        color: '#D0E0E0',
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
const Eyebrow = ({ children, color = '#AA97E9' }: { children: React.ReactNode; color?: string }) => (
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
        'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
      backgroundSize: '88px 88px',
      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
    }}
  />
);

const Tag = ({ text, color = '#AA97E9' }: { text: string; color?: string }) => (
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

Soft Catppuccin pastel on a Mocha-dark canvas — the visual register of a well-themed terminal. One lavender-purple accent does all the emphasis work; mono type carries every label because this identity comes from a CLI tool. Cards sit a shade lighter than the base (the Catppuccin surface convention), separated by `#3D3D50` hairlines, over a faint masked grid. Quiet fade-up entrances only. The extended palette (mint / sky / green / peach / pink / yellow) exists for status-coded section eyebrows — never run two accents on the same page. Avoid: high-contrast neon, pure-white text, heavy drop shadows, decorative gradients, and any non-mono label font. When in doubt, soften.

## Example usage

```tsx
const Cover: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: '#1e1e2e',
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
      <Title>Benben</Title>
      <p style={{ marginTop: 36, maxWidth: 1000, fontSize: 44, lineHeight: 1.3, color: '#D0E0E0' }}>
        Pastel on <span style={{ color: '#AA97E9' }}>Mocha dark</span> — a code-flavoured deck.
      </p>
    </div>
    <Footer />
  </div>
);
```
