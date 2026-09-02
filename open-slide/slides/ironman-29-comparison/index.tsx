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

const ToolRow = ({
  tool,
  color,
  verdict,
}: {
  tool: string;
  color: string;
  verdict: string;
}) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '20px 36px',
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <span
      style={{
        fontFamily: MONO,
        fontSize: 25,
        fontWeight: 600,
        color,
        flexShrink: 0,
        minWidth: 240,
      }}
    >
      {tool}
    </span>
    <span style={{ fontSize: 26, color: bodySoft }}>{verdict}</span>
  </div>
);

const SceneRow = ({
  scene,
  combo,
}: {
  scene: string;
  combo: React.ReactNode;
}) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '20px 36px',
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <span style={{ fontSize: 27, fontWeight: 600, flexShrink: 0, minWidth: 320 }}>{scene}</span>
    <span style={{ fontFamily: MONO, fontSize: 22, color: muted }}>→</span>
    <span style={{ fontSize: 26, color: bodySoft }}>{combo}</span>
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
      <Eyebrow>IRONMAN 2026 · DAY 29</Eyebrow>
      <Tag text="29 / 30" />
    </div>
    <div>
      <Title accent>29-comparison</Title>
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
        AI agent 工具｜橫向比較
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        場景 × 工具選擇矩陣
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

// ─── Page 2: 五維評分總表 ────────────────────────────────────────────────────
const Scoreboard: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow color="#6fc7ec">SCOREBOARD</Eyebrow>
    <H2>五維評分總表</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        marginTop: 32,
        marginBottom: 28,
      }}
    >
      <ToolRow tool="opencode" color={codePeach} verdict="全配平台，擴充與自動化最全" />
      <ToolRow tool="pi" color={'#6fc7ec'} verdict="極簡鞍座，心智負擔最輕" />
      <ToolRow tool="OpenSpec" color={'#e070c8'} verdict="規格層，30+ 工具通吃" />
      <ToolRow tool="open-slide" color={'#52d6a0'} verdict="呈現層，就是 React" />
      <ToolRow tool="mp skills" color="#ff8a70" verdict="紀律層，複製制隨你改" />
      <ToolRow tool="herdr" color="#9aa8f0" verdict="runtime，21 種 CLI 通吃" />
    </div>
    <div style={{ flex: 1 }} />
    <Punch>
      沒有萬年冠軍，只有<span style={{ color: 'var(--osd-accent)' }}>場景冠軍</span>
    </Punch>
    <Footer />
  </div>
);

// ─── Page 3: 場景 × 組合矩陣 ─────────────────────────────────────────────────
const SceneMatrix: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow color="#e070c8">SCENE × COMBO</Eyebrow>
    <H2>場景 × 組合矩陣</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        marginTop: 32,
        marginBottom: 24,
      }}
    >
      <SceneRow scene="個人小專案" combo="opencode（＋ 少量 skills）" />
      <SceneRow scene="團隊協作" combo="opencode ＋ OpenSpec ＋ rules 進 git" />
      <SceneRow scene="規格先行大功能" combo="OpenSpec 或 to-spec ＋ implement" />
      <SceneRow scene="多專案並行" combo="herdr ＋ opencode（＋ pi）" />
      <SceneRow scene="溝通素材" combo="open-slide ＋ 任意 agent" />
      <SceneRow scene="教學 onboarding" combo="teach ＋ open-slide" />
    </div>
    <Footer />
  </div>
);

// ─── Page 4: 取捨三原則 ──────────────────────────────────────────────────────
const Principles: Page = () => (
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
    <Eyebrow color="#52d6a0">TRADE-OFF PRINCIPLES</Eyebrow>
    <H2>取捨三原則</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        marginTop: 40,
        marginBottom: 24,
      }}
    >
      <ToolRow tool="原則一" color={codePeach} verdict="先問工作流，再問工具——它取代哪塊？那塊真的痛嗎？" />
      <ToolRow tool="原則二" color={'#6fc7ec'} verdict="加一個工具的錢比標價貴：學習曲線稅 ＋ 維護稅" />
      <ToolRow tool="原則三" color={'#52d6a0'} verdict="組合優於單品；AGENTS.md / SKILL.md / git 是膠水" />
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
    <Eyebrow>TAKEAWAYS · DAY 29</Eyebrow>
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
      <Takeaway n={1}>按痛點逐個上，每上一個觀察兩週</Takeaway>
      <Takeaway n={2}>細節會過時，分層與原則撐得久</Takeaway>
      <Takeaway n={3}>明天：完賽總結</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 30 · 完賽總結
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
  title: '29-comparison｜場景 × 工具選擇矩陣 — Day 29',
  createdAt: '2026-09-01T16:16:28.623Z',
  theme: 'opencode',
};

export default [Cover, Scoreboard, SceneMatrix, Principles, Takeaways] satisfies Page[];
