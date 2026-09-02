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
const codePurple = '#9d7cd8';
const codeGreen = '#7fd88f';
const codePeach = '#fab283';
const codeCyan = '#56b6c2';
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

const LayerRow = ({
  layer,
  color,
  examples,
}: {
  layer: string;
  color: string;
  examples: string;
}) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '22px 36px',
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <span
      style={{
        fontFamily: MONO,
        fontSize: 24,
        fontWeight: 600,
        color,
        flexShrink: 0,
        minWidth: 300,
      }}
    >
      {layer}
    </span>
    <span style={{ fontSize: 26, color: bodySoft }}>{examples}</span>
  </div>
);

const DimChip = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      fontFamily: MONO,
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--osd-text)',
      background: '#1e1e1e',
      border: `1px solid ${border}`,
      padding: '12px 28px',
      borderRadius: 10,
      whiteSpace: 'nowrap' as const,
    }}
  >
    {children}
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
      <Eyebrow>IRONMAN 2026 · DAY 21</Eyebrow>
      <Tag text="21 / 30" />
    </div>
    <div>
      <Title accent>21-tools</Title>
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
        2026 全景圖與評估框架
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        從選一把瑞士刀到拼樂高
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

// ─── Page 2: 五層地圖 ────────────────────────────────────────────────────────
const FiveLayers: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow color="#6fc7ec">FIVE LAYERS</Eyebrow>
    <H2>五層地圖</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        marginTop: 36,
        marginBottom: 24,
      }}
    >
      <LayerRow layer="agent harness" color={codePeach} examples="opencode · pi · Claude Code · Gemini CLI · Codex CLI" />
      <LayerRow layer="spec 工具" color={'#6fc7ec'} examples="OpenSpec · GitHub Spec Kit · BMAD" />
      <LayerRow layer="技能生態" color={'#e070c8'} examples="Matt Pocock skills · Agent Skills 標準" />
      <LayerRow layer="呈現層" color={'#52d6a0'} examples="open-slide" />
      <LayerRow layer="agent runtime" color="#ff8a70" examples="herdr" />
    </div>
    <Footer />
  </div>
);

// ─── Page 3: 五維評估框架 ────────────────────────────────────────────────────
const FiveDims: Page = () => (
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
    <Eyebrow color="#e070c8">FIVE DIMENSIONS</Eyebrow>
    <H2>五維評估框架</H2>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        marginTop: 56,
        justifyContent: 'center',
      }}
    >
      <DimChip>開源與授權</DimChip>
      <DimChip>模型自由度</DimChip>
      <DimChip>擴充性</DimChip>
      <DimChip>自動化能力</DimChip>
      <DimChip>心智負擔</DimChip>
    </div>
    <p
      className="oc-fadeUp"
      style={{
        margin: '56px 0 0',
        fontSize: 30,
        lineHeight: 1.65,
        color: bodySoft,
        textAlign: 'center',
      }}
    >
      權重沒有標準答案：side project 重<span style={{ color: 'var(--osd-accent)' }}>心智負擔</span>、
      團隊重<span style={{ color: 'var(--osd-accent)' }}>開源與自動化</span>
      <br />
      框架是拿來調的，不是拿來背的
    </p>
    <Footer />
  </div>
);

// ─── Page 4: 心法與導覽 ──────────────────────────────────────────────────────
const Mindset: Page = () => (
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
    <Eyebrow color="#52d6a0">MINDSET</Eyebrow>
    <H2>心法與導覽</H2>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 48 }}>
      <Punch>
        工具是樂高，<span style={{ color: 'var(--osd-accent)' }}>工作流才是作品</span>
      </Punch>
      <p
        className="oc-fadeUp"
        style={{
          margin: 0,
          fontSize: 30,
          lineHeight: 1.6,
          color: bodySoft,
          textAlign: 'center',
        }}
      >
        新工具出現先問：屬於哪層？取代手上哪塊？
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: 0,
          fontSize: 26,
          lineHeight: 1.6,
          color: muted,
          textAlign: 'center',
        }}
      >
        後九天：pi · OpenSpec · open-slide · mp skills 三部曲 · herdr · 比較矩陣
      </p>
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
    <Eyebrow>TAKEAWAYS · DAY 21</Eyebrow>
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
      <Takeaway n={1}>評估成本從「從頭研究」降到「對照比較」</Takeaway>
      <Takeaway n={2}>
        <Mono>AGENTS.md</Mono> / <Mono>SKILL.md</Mono> 等共通慣例是跨工具膠水
      </Takeaway>
      <Takeaway n={3}>明天：pi</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 22 · pi
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
  title: '21-tools｜2026 全景圖與評估框架 — Day 21',
  createdAt: '2026-09-01T16:16:20.623Z',
  theme: 'opencode',
};

export default [Cover, FiveLayers, FiveDims, Mindset, Takeaways] satisfies Page[];
