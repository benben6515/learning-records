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

const Chip = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <span
    style={{
      fontFamily: MONO,
      fontSize: 25,
      fontWeight: 600,
      color: accent ? '#0a0a0a' : 'var(--osd-text)',
      background: accent ? 'var(--osd-accent)' : '#1e1e1e',
      border: `1px solid ${accent ? 'var(--osd-accent)' : border}`,
      padding: '12px 26px',
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
      <Eyebrow>IRONMAN 2026 · DAY 26</Eyebrow>
      <Tag text="26 / 30" />
    </div>
    <div>
      <Title accent>26-mp-skills</Title>
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
        基本盤實戰
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        grill-me、tdd、code-review 與 handoff
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

// ─── Page 2: grill-me 拷問現場 ───────────────────────────────────────────────
const Grill: Page = () => (
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
    <Eyebrow color="#6fc7ec">GRILL-ME</Eyebrow>
    <H2>grill-me 拷問現場</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        marginTop: 40,
        marginBottom: 24,
      }}
    >
      <FlowRow n={1}>一句話想法進場，被逼問到計畫樹全綠</FlowRow>
      <FlowRow n={2}>
        最有價值的輸出：
        <span style={{ color: 'var(--osd-accent)' }}>「呃我沒想過」的瞬間</span>
      </FlowRow>
      <FlowRow n={3}>
        <Mono>grill-with-docs</Mono>：拷問順便沉澱 CONTEXT.md 與 ADR——一行命中的共同語言
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 3: tdd 紅綠循環 ────────────────────────────────────────────────────
const Tdd: Page = () => (
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
    <Eyebrow color="#52d6a0">RED · GREEN · REFACTOR</Eyebrow>
    <H2>tdd 紅綠循環</H2>
    <div
      className="oc-fadeUp"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        marginTop: 88,
        justifyContent: 'center',
      }}
    >
      <Chip accent>紅：先寫會失敗的測試</Chip>
      <Arrow />
      <Chip>綠：剛好通過的最小實作</Chip>
      <Arrow />
      <Chip>重構：綠燈下整理</Chip>
    </div>
    <p
      className="oc-fadeUp"
      style={{
        margin: '56px 0 0',
        fontSize: 29,
        lineHeight: 1.6,
        color: bodySoft,
        textAlign: 'center',
      }}
    >
      一次一測——速率來自 <span style={{ color: 'var(--osd-accent)' }}>feedback</span>，不是爆量
    </p>
    <Footer />
  </div>
);

// ─── Page 4: code-review 雙軸 + handoff ──────────────────────────────────────
const ReviewHandoff: Page = () => (
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
    <Eyebrow color="#e070c8">DUAL REVIEW</Eyebrow>
    <H2>code-review 雙軸 ＋ handoff</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        marginTop: 40,
        marginBottom: 24,
      }}
    >
      <FlowRow n={1}>
        <span style={{ color: '#6fc7ec' }}>Standards 軸</span>：符合 repo 規範嗎（＋ Fowler smell 基準）
      </FlowRow>
      <FlowRow n={2}>
        <span style={{ color: '#52d6a0' }}>Spec 軸</span>：忠實實作原始 issue / spec 嗎
      </FlowRow>
      <FlowRow n={3}>兩軍平行 sub-agent，互不污染</FlowRow>
      <FlowRow n={4}>
        <Mono>/handoff</Mono>：對話濃縮成交接文件，跨 session 存活
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 5: 基本盤流程 ──────────────────────────────────────────────────────
const BaselineFlow: Page = () => (
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
    <Eyebrow color="#ff8a70">BASELINE FLOW</Eyebrow>
    <H2>基本盤流程</H2>
    <div
      className="oc-fadeUp"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginTop: 80,
        justifyContent: 'center',
      }}
    >
      <Chip accent>grill-me</Chip>
      <Arrow />
      <Chip>plan</Chip>
      <Arrow />
      <Chip>tdd</Chip>
      <Arrow />
      <Chip>code-review</Chip>
      <Arrow />
      <Chip>handoff</Chip>
    </div>
    <div style={{ flex: 1 }} />
    <Punch>
      在 opencode：規劃給 <span style={{ color: '#e070c8' }}>plan agent</span>、實作給{' '}
      <span style={{ color: codePeach }}>build agent</span>
    </Punch>
    <p
      className="oc-fadeUp"
      style={{
        margin: '28px 0 0',
        fontSize: 26,
        lineHeight: 1.55,
        color: muted,
        textAlign: 'center',
      }}
    >
      紀律是工具不是信仰：視覺微調就別硬上 tdd
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
    <Eyebrow>TAKEAWAYS · DAY 26</Eyebrow>
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
      <Takeaway n={1}>動工前對齊、實作時有 feedback、收工時能換手</Takeaway>
      <Takeaway n={2}>紅綠循環：速率來自 feedback，不是爆量</Takeaway>
      <Takeaway n={3}>明天：進階工作流</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 27 · 進階工作流
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
  title: '26-mp-skills｜基本盤實戰 — Day 26',
  createdAt: '2026-09-01T16:16:25.623Z',
  theme: 'opencode',
};

export default [Cover, Grill, Tdd, ReviewHandoff, BaselineFlow, Takeaways] satisfies Page[];
