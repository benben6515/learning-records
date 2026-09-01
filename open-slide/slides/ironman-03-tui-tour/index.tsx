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

const KeyCap = ({ children, size = 96 }: { children: React.ReactNode; size?: number }) => (
  <span
    style={{
      fontFamily: MONO,
      fontSize: size * 0.38,
      fontWeight: 600,
      color: 'var(--osd-text)',
      background: surfaceHi,
      border: `1px solid ${border}`,
      borderBottomWidth: 3,
      borderRadius: 10,
      padding: size * 0.14,
      minWidth: size,
      textAlign: 'center' as const,
      display: 'inline-block',
      lineHeight: 1,
    }}
  >
    {children}
  </span>
);

const KeyCard = ({
  kbd,
  name,
  desc,
  highlight = false,
}: {
  kbd: string;
  name: React.ReactNode;
  desc: string;
  highlight?: boolean;
}) => (
  <div
    className="oc-fadeUp"
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 24,
      padding: 36,
      background: surface,
      border: `1px solid ${highlight ? 'var(--osd-accent)' : border}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <KeyCap size={88}>{kbd}</KeyCap>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 38,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: highlight ? 'var(--osd-accent)' : 'var(--osd-text)',
      }}
    >
      {name}
    </div>
    <div style={{ fontSize: 26, lineHeight: 1.5, color: bodySoft }}>{desc}</div>
  </div>
);

const LabelRow = ({ n, name, desc }: { n: number; name: string; desc: string }) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: '24px 32px',
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ fontFamily: MONO, fontSize: 20, color: 'var(--osd-accent)' }}>
        {String(n).padStart(2, '0')}
      </span>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        {name}
      </span>
    </div>
    <div style={{ fontSize: 24, color: bodySoft, lineHeight: 1.4 }}>{desc}</div>
  </div>
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

// Pure-div TUI mock — the terminal, drawn with the theme's own ramp.
const TuiMock = () => (
  <div
    className="oc-fadeUp"
    style={{
      width: 900,
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 12,
      overflow: 'hidden',
      flexShrink: 0,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 20px',
        background: surfaceHi,
        borderBottom: `1px solid ${borderSubtle}`,
      }}
    >
      <span style={{ width: 14, height: 14, borderRadius: 7, background: '#e06c75' }} />
      <span style={{ width: 14, height: 14, borderRadius: 7, background: '#e5c07b' }} />
      <span style={{ width: 14, height: 14, borderRadius: 7, background: '#7fd88f' }} />
      <span
        style={{
          fontFamily: MONO,
          fontSize: 16,
          color: muted,
          margin: '0 auto',
          letterSpacing: '0.08em',
        }}
      >
        opencode
      </span>
    </div>
    <div
      style={{
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        height: 380,
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 22, color: 'var(--osd-accent)' }}>
        <span style={{ color: muted }}>&gt; </span>這個專案在做什麼？
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 19,
          lineHeight: 1.6,
          color: bodySoft,
          background: surfaceHi,
          border: `1px solid ${borderSubtle}`,
          borderRadius: 8,
          padding: '16px 20px',
          maxWidth: 720,
        }}
      >
        這是一個簡報工具專案，使用 React + Vite…
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ fontFamily: MONO, fontSize: 22, color: muted }}>
        <span style={{ color: 'var(--osd-accent)' }}>&gt; </span>
        <span style={{ opacity: 0.6 }}>▌</span>
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        borderTop: `1px solid ${borderSubtle}`,
        fontFamily: MONO,
        fontSize: 16,
        color: muted,
      }}
    >
      <span>
        <span style={{ color: 'var(--osd-accent)' }}>build</span> · glm-5.3-flash
      </span>
      <span>? for shortcuts</span>
    </div>
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
      <Eyebrow>IRONMAN 2026 · DAY 03</Eyebrow>
      <Tag text="03 / 30" />
    </div>
    <div>
      <Title accent>03-opencode</Title>
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
        TUI 介面導覽
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        把每個角落走一遍
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

// ─── Page 2: 畫面地圖 ────────────────────────────────────────────────────────
const ScreenMap: Page = () => (
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
    <Eyebrow color="#56b6c2">SCREEN MAP</Eyebrow>
    <H2>畫面地圖</H2>
    <div style={{ display: 'flex', gap: 56, marginTop: 48, alignItems: 'center' }}>
      <TuiMock />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
        <LabelRow n={3} name="狀態列" desc="模式指示（右下）、目前 model" />
        <LabelRow n={2} name="訊息區" desc="對話歷史" />
        <LabelRow n={1} name="輸入區" desc="打 prompt 的地方" />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── Page 3: 快捷鍵三寶 ──────────────────────────────────────────────────────
const Shortcuts: Page = () => (
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
    <Eyebrow>SHORTCUTS</Eyebrow>
    <H2>快捷鍵三寶</H2>
    <div style={{ display: 'flex', gap: 40, marginTop: 56 }}>
      <KeyCard kbd="Tab" name="切模式" desc="Plan / Build 模式切換" highlight />
      <KeyCard kbd="/" name="命令選單" desc="內建命令選單（/init、/undo、/share…）" />
      <KeyCard kbd="@" name="檔案引用" desc="檔案 fuzzy search 引用" />
    </div>
    <Footer />
  </div>
);

// ─── Page 4: Session 管理 ────────────────────────────────────────────────────
const Sessions: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow color="#9d7cd8">SESSIONS</Eyebrow>
    <H2>Session 管理</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        marginTop: 40,
        marginBottom: 24,
      }}
    >
      <FlowRow n={1}>一個任務，一個 session</FlowRow>
      <FlowRow n={2}>新開 / 切換 / 回顧歷史 session</FlowRow>
      <FlowRow n={3}>
        主題即時切換：<Mono>/themes</Mono>
      </FlowRow>
    </div>
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
    <Eyebrow>TAKEAWAYS · DAY 03</Eyebrow>
    <H2>今天帶走三件事</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        marginTop: 64,
        marginBottom: 48,
      }}
    >
      <Takeaway n={1}>
        三寶：<Mono>/</Mono> 命令、<Mono>@</Mono> 引用、<Mono>Tab</Mono> 切模式
      </Takeaway>
      <Takeaway n={2}>session 是對話抽屜，分任務管理</Takeaway>
      <Takeaway n={3}>明天：/init 與 AGENTS.md</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 04 · /init 與 AGENTS.md
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
  title: '03-opencode｜TUI 介面導覽 — Day 03',
  createdAt: '2026-09-01T16:16:02.623Z',
  theme: 'opencode',
};

export default [Cover, ScreenMap, Shortcuts, Sessions, Takeaways] satisfies Page[];
