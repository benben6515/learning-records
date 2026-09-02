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

const CompareCard = ({
  head,
  color,
  children,
}: {
  head: string;
  color: string;
  children: React.ReactNode;
}) => (
  <div
    className="oc-fadeUp"
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      padding: 36,
      background: surface,
      border: `1px solid ${color}60`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <Tag text={head} color={color} />
    <div style={{ fontSize: 27, lineHeight: 1.6, color: bodySoft }}>{children}</div>
  </div>
);

const FlowRow = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      gap: 28,
      alignItems: 'flex-start',
      padding: '26px 36px',
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
    <div style={{ fontSize: 31, lineHeight: 1.5 }}>{children}</div>
  </div>
);

const StatusChip = ({
  text,
  color,
}: {
  text: string;
  color: string;
}) => (
  <span
    style={{
      fontFamily: MONO,
      fontSize: 24,
      fontWeight: 600,
      color,
      background: `${color}18`,
      border: `1px solid ${color}50`,
      padding: '12px 30px',
      borderRadius: 10,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
    }}
  >
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: color,
        display: 'inline-block',
      }}
    />
    {text}
  </span>
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
      <Eyebrow>IRONMAN 2026 · DAY 28</Eyebrow>
      <Tag text="28 / 30" />
    </div>
    <div>
      <Title accent>28-herdr</Title>
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
        coding agent 的終端機多工
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        agent runtime
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

// ─── Page 2: 問題意識 ────────────────────────────────────────────────────────
const Problem: Page = () => (
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
    <Eyebrow color="#ff8a70">THE PROBLEM</Eyebrow>
    <H2>問題意識</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        marginTop: 40,
        marginBottom: 24,
      }}
    >
      <FlowRow n={1}>三個 agent 各開一個 terminal，你會先瘋掉</FlowRow>
      <FlowRow n={2}>闔上筆電全陣亡；八個 pane 逐格找「誰在等我」</FlowRow>
      <FlowRow n={3}>
        herdr ＝ coding agents 賴以運行的 runtime
        （<span style={{ color: '#52d6a0' }}>Apache 2.0</span>、YC 背書）
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 3: 常駐不朽 ────────────────────────────────────────────────────────
const Immortal: Page = () => (
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
    <Eyebrow color="#6fc7ec">ALWAYS ON</Eyebrow>
    <H2>常駐不朽</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        marginTop: 40,
        marginBottom: 24,
      }}
    >
      <FlowRow n={1}>背景 server 活得比 terminal 久：闔蓋、斷網照跑</FlowRow>
      <FlowRow n={2}>重開機自動帶回版面與 session</FlowRow>
      <FlowRow n={3}>任何有鍵盤的裝置連回你的 herd</FlowRow>
      <FlowRow n={4}>
        開箱偵測 <span style={{ color: 'var(--osd-accent)' }}>21 種 agent CLI</span>
        ——不包裝、不取代
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 4: 狀態感知 + agent-native ─────────────────────────────────────────
const StatusAware: Page = () => (
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
    <Eyebrow color="#e070c8">AGENT-NATIVE</Eyebrow>
    <H2>狀態感知 ＋ agent-native</H2>
    <div
      className="oc-fadeUp"
      style={{
        display: 'flex',
        gap: 24,
        marginTop: 44,
        justifyContent: 'center',
      }}
    >
      <StatusChip text="working" color={'#52d6a0'} />
      <StatusChip text="blocked" color={codePeach} />
      <StatusChip text="idle" color={muted} />
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        marginTop: 40,
        marginBottom: 24,
      }}
    >
      <FlowRow n={1}>每個 agent 自動標示狀態——一眼看清誰在等你</FlowRow>
      <FlowRow n={2}>Spaces 分欄分頁，dashboard 全場總覽</FlowRow>
      <FlowRow n={3}>
        CLI 與 socket API 同一表面：agents 分 pane、互相 prompt、等彼此 blocked
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 5: herdr vs tmux ───────────────────────────────────────────────────
const VsTmux: Page = () => (
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
    <Eyebrow color="#9aa8f0">HERDR VS TMUX</Eyebrow>
    <H2>herdr vs tmux</H2>
    <div style={{ display: 'flex', gap: 40, marginTop: 48 }}>
      <CompareCard head="tmux" color="#9aa8f0">
        保活 process——住戶是<span style={{ color: '#9aa8f0' }}>文字流</span>
      </CompareCard>
      <CompareCard head="herdr" color={codePeach}>
        理解 agent——住戶會
        <span style={{ color: codePeach }}>「等你回答」</span>
      </CompareCard>
    </div>
    <p
      className="oc-fadeUp"
      style={{
        margin: '44px 0 0',
        fontSize: 28,
        lineHeight: 1.55,
        color: muted,
      }}
    >
      單專案用不上；多專案、長任務、多 agent 是主場
    </p>
    <Footer />
  </div>
);

// ─── Page 6: Takeaways ───────────────────────────────────────────────────────
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
    <Eyebrow>TAKEAWAYS · DAY 28</Eyebrow>
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
        名字即路線圖：你是<span style={{ color: 'var(--osd-accent)' }}>牧羊人</span>
        ，agents 是羊群
      </Takeaway>
      <Takeaway n={2}>住戶變了，房子也該變</Takeaway>
      <Takeaway n={3}>明天：橫向比較矩陣</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 29 · 橫向比較矩陣
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
  title: '28-herdr｜coding agent 的終端機多工 — Day 28',
  createdAt: '2026-09-01T16:16:27.623Z',
  theme: 'opencode',
};

export default [Cover, Problem, Immortal, StatusAware, VsTmux, Takeaways] satisfies Page[];
