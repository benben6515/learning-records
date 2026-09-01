import { type Page, useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, SlideMeta, SlideTransition } from '@open-slide/core';

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

// Extra colors outside the DesignSystem shape — plain consts.
const muted = '#808080';
const bodySoft = '#b8b8b8';
const surface = '#141414';
const surfaceHi = '#1e1e1e';
const border = '#484848';
const borderSubtle = '#3c3c3c';
const MONO = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace';

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

// ─── Theme fixed components (from themes/opencode.md) ────────────────────────
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
      fontFamily: MONO,
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
        fontFamily: MONO,
        fontSize: 18,
        letterSpacing: '0.08em',
        color: muted,
      }}
    >
      <span>OPENCODE · IRONMAN 2026</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Tag = ({ text, color = 'var(--osd-accent)' }: { text: string; color?: string }) => (
  <span
    style={{
      fontFamily: MONO,
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

// ─── Deck helpers ────────────────────────────────────────────────────────────
const H2 = ({ children }: { children: React.ReactNode }) => (
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
    {children}
  </h2>
);

const Mono = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: MONO, fontSize: '0.88em', color: 'var(--osd-accent)' }}>{children}</span>
);

const Punch = ({ children }: { children: React.ReactNode }) => (
  <p
    className="oc-fadeUp"
    style={{
      margin: 0,
      fontFamily: 'var(--osd-font-display)',
      fontSize: 34,
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
      textAlign: 'center',
    }}
  >
    {children}
  </p>
);

const FlowRow = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      gap: 28,
      alignItems: 'flex-start',
      padding: '28px 36px',
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <span
      style={{
        fontFamily: MONO,
        fontSize: 22,
        color: 'var(--osd-accent)',
        flexShrink: 0,
        marginTop: 6,
      }}
    >
      {String(n).padStart(2, '0')}
    </span>
    <div style={{ fontSize: 32, lineHeight: 1.5 }}>{children}</div>
  </div>
);

const Chip = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <span
    style={{
      fontFamily: MONO,
      fontSize: 26,
      fontWeight: 600,
      color: accent ? '#0a0a0a' : 'var(--osd-text)',
      background: accent ? 'var(--osd-accent)' : '#1e1e1e',
      border: `1px solid ${accent ? 'var(--osd-accent)' : border}`,
      padding: '14px 28px',
      borderRadius: 10,
      whiteSpace: 'nowrap' as const,
    }}
  >
    {children}
  </span>
);

const Arrow = () => (
  <span style={{ fontFamily: MONO, fontSize: 28, color: muted, flexShrink: 0 }}>→</span>
);

const PointItem = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      gap: 18,
      alignItems: 'baseline',
      fontSize: 28,
      lineHeight: 1.45,
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 21, color: 'var(--osd-accent)', flexShrink: 0 }}>
      {String(n).padStart(2, '0')}
    </span>
    <span>{children}</span>
  </div>
);

const Takeaway = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      gap: 24,
      alignItems: 'baseline',
      fontSize: 34,
      lineHeight: 1.5,
    }}
  >
    <span
      style={{
        fontFamily: MONO,
        fontSize: 22,
        color: 'var(--osd-accent)',
        flexShrink: 0,
      }}
    >
      {String(n).padStart(2, '0')}
    </span>
    <span>{children}</span>
  </div>
);

const ShareLinkMock = () => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      padding: '24px 36px',
      background: surfaceHi,
      border: `1px solid ${borderSubtle}`,
      borderRadius: 12,
      alignSelf: 'center',
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 26, color: '#89DCEB' }}>
      https://opencode.ai/s/x7Kp2
    </span>
    <Tag text="copied ✓" color="#7fd88f" />
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
      <Eyebrow>IRONMAN 2026 · DAY 10</Eyebrow>
      <Tag text="10 / 30" />
    </div>
    <div>
      <Title accent>10-opencode</Title>
      <p
        className="oc-fadeUp"
        style={{
          margin: '36px 0 0',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 52,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
        }}
      >
        /share 與新手篇總結
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        十天基礎，一次收網
      </p>
    </div>
    <div
      className="oc-fadeUp"
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
    >
      <span style={{ fontFamily: MONO, fontSize: 22, color: bodySoft, letterSpacing: '0.06em' }}>
        benben
      </span>
      <span style={{ fontFamily: MONO, fontSize: 20, color: muted }}>
        $ opencode ./ironman-2026
      </span>
    </div>
    <Footer />
  </div>
);

// ─── Page 2: /share 分享對話 ─────────────────────────────────────────────────
const Share: Page = () => (
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
    <Eyebrow color="#56b6c2">/SHARE</Eyebrow>
    <H2>/share 分享對話</H2>
    <div style={{ marginTop: 16 }}>
      <ShareLinkMock />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <FlowRow n={1}>
        產生連結進剪貼簿，<span style={{ color: 'var(--osd-accent)' }}>預設不公開</span>
      </FlowRow>
      <FlowRow n={2}>場景：同事看 debug 過程、教學示範、求救</FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 3: 新手篇十大要點 ──────────────────────────────────────────────────
const TenPoints: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow color="#9d7cd8">BEGINNER wrap-up</Eyebrow>
    <H2>新手篇十大要點</H2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: 72,
        rowGap: 30,
        marginTop: 56,
      }}
    >
      <PointItem n={1}>Agent 是隊友不是顧問</PointItem>
      <PointItem n={6}>上下文心法</PointItem>
      <PointItem n={2}>安裝 + provider 連線</PointItem>
      <PointItem n={7}>
        <Mono>/undo</Mono> 安全網
      </PointItem>
      <PointItem n={3}>
        TUI 三寶：<Mono>/</Mono> 命令、<Mono>@</Mono> 引用、<Mono>Tab</Mono> 切模式
      </PointItem>
      <PointItem n={8}>個人化設定</PointItem>
      <PointItem n={4}>
        <Mono>/init</Mono> + AGENTS.md
      </PointItem>
      <PointItem n={9}>LSP + formatters</PointItem>
      <PointItem n={5}>Plan → Build 節奏</PointItem>
      <PointItem n={10}>
        <Mono>/share</Mono> 分享
      </PointItem>
    </div>
    <Footer />
  </div>
);

// ─── Page 4: 30 分鐘驗收小專案 ───────────────────────────────────────────────
const Capstone: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow color="#7fd88f">CAPSTONE · 30 MIN</Eyebrow>
    <H2>30 分鐘驗收小專案</H2>
    <div
      className="oc-fadeUp"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        marginTop: 96,
        justifyContent: 'center',
      }}
    >
      <Chip accent>/init</Chip>
      <Arrow />
      <Chip>plan</Chip>
      <Arrow />
      <Chip>build</Chip>
      <Arrow />
      <Chip>undo 重試</Chip>
      <Arrow />
      <Chip accent>share</Chip>
    </div>
    <div style={{ flex: 1 }} />
    <Punch>
      完整流程走一遍 = <span style={{ color: 'var(--osd-accent)' }}>真的學會</span>
    </Punch>
    <Footer />
  </div>
);

// ─── Page 5: Takeaways ───────────────────────────────────────────────────────
const Takeaways: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow>TAKEAWAYS · DAY 10</Eyebrow>
    <H2>新手篇收網</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        marginTop: 64,
        marginBottom: 48,
      }}
    >
      <Takeaway n={1}>新手篇 ＝ 把 opencode 當隊友的全部基礎</Takeaway>
      <Takeaway n={2}>
        進階篇預告：<span style={{ color: 'var(--osd-accent)' }}>客製化小宇宙</span>
      </Takeaway>
      <Takeaway n={3}>明天：自訂 Agents</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT · 進階篇" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 11 · 自訂 Agents
      </span>
    </div>
    <Footer />
  </div>
);

// ─── Module-level page transition (theme: RISE) ──────────────────────────────
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

export const meta: SlideMeta = {
  title: '10-opencode｜/share 與新手篇總結 — Day 10',
  createdAt: '2026-09-01T16:16:09.623Z',
  theme: 'opencode',
};

export default [Cover, Share, TenPoints, Capstone, Takeaways] satisfies Page[];
