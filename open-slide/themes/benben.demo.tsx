import { type Page, useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem } from '@open-slide/core';

export const design: DesignSystem = {
  palette: {
    bg: '#0a0a0f',
    text: '#F0F0FF',
    accent: '#22cfcf',
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

// Electric violet — the neon counterpoint to the primary cyan accent.
const VIOLET = '#efaaef';

const styles = `
  @keyframes bb-fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .bb-fadeUp { opacity: 0; animation: bb-fadeUp 0.8s cubic-bezier(.2,.7,.2,1) forwards; }
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
        'linear-gradient(rgba(34,207,207,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(34,207,207,0.028) 1px, transparent 1px)',
      backgroundSize: '88px 88px',
      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
    }}
  />
);

const Title = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <h1
    className="bb-fadeUp"
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
    className="bb-fadeUp"
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
        color: '#8090A0',
      }}
    >
      <span>BENBEN · 2026</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Tag = ({ text, color = 'var(--osd-accent)' }: { text: string; color?: string }) => (
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

const Bullet = ({ text }: { text: string }) => (
  <div
    className="bb-fadeUp"
    style={{
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
      fontSize: 30,
      color: '#D0E0E0',
      lineHeight: 1.4,
    }}
  >
    <span style={{ color: 'var(--osd-accent)', flexShrink: 0, marginTop: 2 }}>▸</span>
    <span>{text}</span>
  </div>
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
      <Eyebrow>BENBEN · THEME</Eyebrow>
      <Tag text="opencode" color={VIOLET} />
    </div>
    <div>
      <Title accent>Benben</Title>
      <p
        className="bb-fadeUp"
        style={{
          marginTop: 36,
          maxWidth: 1000,
          fontSize: 44,
          lineHeight: 1.3,
          color: '#D0E0E0',
        }}
      >
        Neon <span style={{ color: 'var(--osd-accent)' }}>cyan</span> +{' '}
        <span style={{ color: VIOLET }}>violet</span> on near-black.
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
    <Eyebrow color="#77EFCF">CHAPTER · PALETTE</Eyebrow>
    <h2
      className="bb-fadeUp"
      style={{
        margin: '4px 0 0',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 64,
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
      }}
      >
        Mono labels. Neon accents.
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
        <Bullet text="Neon cyan is the primary — violet is its counterpoint" />
        <Bullet text="Mono carries every label; this is a terminal tool's identity" />
        <Bullet text="Extended palette exists for status-coded eyebrows only" />
      </div>
      <div className="bb-fadeUp" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
        <Tag text="primary" />
        <Tag text="accent" color={VIOLET} />
        <Tag text="info" color="#89DCEB" />
        <Tag text="success" color="#A6E3A1" />
        <Tag text="warning" color="#FAB387" />
        <Tag text="error" color="#F38BA8" />
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
    <Title>感謝聆聽</Title>
    <p
      className="bb-fadeUp"
      style={{
        margin: 0,
        fontSize: 34,
        lineHeight: 1.5,
        color: '#D0E0E0',
      }}
      >
      Benben — a neon, code-flavoured theme.
      </p>
      <div className="bb-fadeUp">
        <Tag text="Q & A" color={VIOLET} />
      </div>
    <Footer />
  </div>
);

export default [Cover, Content, Closer];
