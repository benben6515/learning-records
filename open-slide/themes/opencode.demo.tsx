import { type Page, useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem } from '@open-slide/core';

export const design: DesignSystem = {
  palette: {
    bg: '#0a0a0a',
    text: '#eeeeee',
    accent: '#fab283',
  },
  fonts: {
    display: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
    body: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 140,
    body: 32,
  },
  radius: 16,
};

const styles = `
  @keyframes oc-fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .oc-fadeUp { opacity: 0; animation: oc-fadeUp 0.8s cubic-bezier(.2,.7,.2,1) forwards; }
`;

const Styles = () => <style>{styles}</style>;

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: '-0.015em',
  overflow: 'hidden' as const,
  position: 'relative' as const,
};

// ─── Verbatim copies of the theme's fixed components ─────────────────────────
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

const Title = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <h1
    className="oc-fadeUp"
    style={{
      margin: 0,
      fontFamily: 'var(--osd-font-display)',
      fontSize: 'var(--osd-size-hero)',
      fontWeight: 700,
      lineHeight: 1.02,
      letterSpacing: '-0.045em',
      color: accent ? 'var(--osd-accent)' : 'var(--osd-text)',
    }}
  >
    {children}
  </h1>
);

const Eyebrow = ({
  children,
  color = 'var(--osd-accent)',
}: {
  children: React.ReactNode;
  color?: string;
}) => (
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
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Bullet = ({ text }: { text: string }) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
      fontSize: 30,
      color: '#b8b8b8',
      lineHeight: 1.4,
    }}
  >
    <span style={{ color: 'var(--osd-accent)', flexShrink: 0, marginTop: 2 }}>▸</span>
    <span>{text}</span>
  </div>
);

const Tag = ({ text, color = 'var(--osd-accent)' }: { text: string; color?: string }) => (
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

// ─── Page 1: Cover ───────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div
    style={{
      ...fill,
      padding: 120,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Styles />
    <GridBg />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Eyebrow>OPENCODE · THEME</Eyebrow>
      <Tag text="dark" />
    </div>
    <div>
      <Title accent>opencode</Title>
      <p
        className="oc-fadeUp"
        style={{
          marginTop: 36,
          maxWidth: 1000,
          fontSize: 44,
          lineHeight: 1.3,
          color: '#808080',
        }}
      >
        Neutral gray ramp, one <span style={{ color: 'var(--osd-accent)' }}>warm peach</span>{' '}
        signal — straight from the CLI.
      </p>
    </div>
    <Footer />
  </div>
);

// ─── Page 2: Content ─────────────────────────────────────────────────────────
const Content: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow color="#56b6c2">CHAPTER · BODY TYPE</Eyebrow>
    <h2
      className="oc-fadeUp"
      style={{
        margin: '4px 0 0',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 64,
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
      }}
    >
      One idea per page.
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
      <Bullet text="Pure neutral gray ramp — no navy cast" />
      <Bullet text="Peach carries every warm signal" />
      <Bullet text="Mono labels, syntax-coded tags" />
    </div>
    <div
      className="oc-fadeUp"
      style={{ display: 'flex', gap: 12, marginTop: 8, alignItems: 'center' }}
    >
      <Tag text="success" color="#7fd88f" />
      <Tag text="warning" color="#f5a742" />
      <Tag text="error" color="#e06c75" />
      <Tag text="info" color="#56b6c2" />
      <Tag text="keyword" color="#9d7cd8" />
    </div>
    <Footer />
  </div>
);

// ─── Page 3: Closer ──────────────────────────────────────────────────────────
const Closer: Page = () => (
  <div
    style={{
      ...fill,
      padding: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: 32,
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow>THE END</Eyebrow>
    <Title accent={false}>感謝聆聽</Title>
    <p
      className="oc-fadeUp"
      style={{
        margin: 0,
        fontSize: 34,
        lineHeight: 1.5,
        color: '#808080',
      }}
    >
      OpenCode — the CLI's own theme, as a deck.
    </p>
    <div className="oc-fadeUp">
      <Tag text="Q & A" />
    </div>
    <Footer />
  </div>
);

export default [Cover, Content, Closer];
