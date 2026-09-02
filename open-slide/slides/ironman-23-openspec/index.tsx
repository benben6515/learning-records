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
      <Eyebrow>IRONMAN 2026 · DAY 23</Eyebrow>
      <Tag text="23 / 30" />
    </div>
    <div>
      <Title accent>23-openspec</Title>
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
        spec-driven development
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        讓 AI 不用猜需求
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

// ─── Page 2: 問題與解法 ──────────────────────────────────────────────────────
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
    <Eyebrow color="#6fc7ec">PROBLEM → SDD</Eyebrow>
    <H2>問題與解法</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        marginTop: 40,
        marginBottom: 24,
      }}
    >
      <FlowRow n={1}>
        需求只活在 chat history 裡：session 關了就消失、換工具重講、三週後自己也忘
      </FlowRow>
      <FlowRow n={2}>
        SDD：先把「要什麼」寫成 spec，<span style={{ color: 'var(--osd-accent)' }}>
          跟 code 一起進 repo
        </span>
      </FlowRow>
      <FlowRow n={3}>
        OpenSpec：Fission-AI 出品、MIT、支援 30+ AI 工具、老專案也能用
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 3: 核心流程 opsx ───────────────────────────────────────────────────
const OpsxFlow: Page = () => (
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
    <Eyebrow color="#e070c8">OPSX FLOW</Eyebrow>
    <H2>核心流程 opsx</H2>
    <div
      className="oc-fadeUp"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        marginTop: 88,
        justifyContent: 'center',
      }}
    >
      <Chip>explore</Chip>
      <Arrow />
      <Chip accent>propose</Chip>
      <Arrow />
      <Chip>apply</Chip>
      <Arrow />
      <Chip>archive</Chip>
    </div>
    <p
      className="oc-fadeUp"
      style={{
        margin: '56px 0 0',
        fontSize: 27,
        lineHeight: 1.7,
        color: bodySoft,
        textAlign: 'center',
      }}
    >
      <Mono>/opsx:explore</Mono> 零承諾的思考夥伴 · <Mono>/opsx:propose</Mono> 生成 changes/
      &lt;id&gt;/ 四件套
      <br />
      <Mono>/opsx:apply</Mono> 照 tasks 實作 · <Mono>/opsx:archive</Mono> 歸檔並回寫主 spec
    </p>
    <Footer />
  </div>
);

// ─── Page 4: specs 即 source of truth ────────────────────────────────────────
const SpecTruth: Page = () => (
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
    <Eyebrow color="#52d6a0">SPEC AS TRUTH</Eyebrow>
    <H2>specs 即 source of truth</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        marginTop: 40,
        marginBottom: 24,
      }}
    >
      <FlowRow n={1}>
        Spec 是純 markdown：<Mono>Requirement</Mono> ＋ WHEN/THEN <Mono>Scenario</Mono>
      </FlowRow>
      <FlowRow n={2}>AI 寫 spec、人在 code 動工前 review</FlowRow>
      <FlowRow n={3}>
        <Mono>openspec/specs/</Mono> 永遠等於系統現況；新 session 打開就懂
      </FlowRow>
      <FlowRow n={4}>vs Spec Kit（更輕）、vs Kiro（不綁 IDE）</FlowRow>
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
    <Eyebrow>TAKEAWAYS · DAY 23</Eyebrow>
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
        改一段 <span style={{ color: 'var(--osd-accent)' }}>markdown</span> 比改一堆 code 便宜
      </Takeaway>
      <Takeaway n={2}>需求進 repo，不進 chat history</Takeaway>
      <Takeaway n={3}>明天：open-slide</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 24 · open-slide
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
  title: '23-openspec｜spec-driven development — Day 23',
  createdAt: '2026-09-01T16:16:22.623Z',
  theme: 'opencode',
};

export default [Cover, Problem, OpsxFlow, SpecTruth, Takeaways] satisfies Page[];
