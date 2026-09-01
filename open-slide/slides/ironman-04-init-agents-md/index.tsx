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

const Card = ({
  tag,
  tagColor,
  name,
  desc,
  highlight = false,
}: {
  tag: string;
  tagColor?: string;
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
      gap: 20,
      padding: 36,
      background: surface,
      border: `1px solid ${highlight ? 'var(--osd-accent)' : border}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <Tag text={tag} color={tagColor} />
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 40,
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

// AGENTS.md document mock — markdown, drawn with theme colors.
const DocMock = () => (
  <div
    className="oc-fadeUp"
    style={{
      width: 880,
      flexShrink: 0,
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 12,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 24px',
        background: surfaceHi,
        borderBottom: `1px solid ${borderSubtle}`,
      }}
    >
      <span style={{ width: 12, height: 12, borderRadius: 6, background: '#e06c75' }} />
      <span style={{ width: 12, height: 12, borderRadius: 6, background: '#e5c07b' }} />
      <span style={{ width: 12, height: 12, borderRadius: 6, background: '#7fd88f' }} />
      <span style={{ fontFamily: MONO, fontSize: 16, color: muted, marginLeft: 8 }}>
        AGENTS.md
      </span>
    </div>
    <div
      style={{
        padding: '32px 40px',
        fontFamily: MONO,
        fontSize: 24,
        lineHeight: 2.1,
      }}
    >
      <div>
        <span style={{ color: 'var(--osd-accent)' }}># </span>
        <span style={{ color: '#9d7cd8' }}>AGENTS.md</span>
      </div>
      <div style={{ color: 'var(--osd-accent)' }}>## 專案</div>
      <div style={{ color: bodySoft }}>簡介 / tech stack / 目錄結構</div>
      <div style={{ color: 'var(--osd-accent)' }}>## 慣例</div>
      <div style={{ color: bodySoft }}>命名 / 測試 / linter</div>
      <div style={{ color: 'var(--osd-accent)' }}>## 指令</div>
      <div style={{ color: '#7fd88f' }}>build / test / dev</div>
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
      <Eyebrow>IRONMAN 2026 · DAY 04</Eyebrow>
      <Tag text="04 / 30" />
    </div>
    <div>
      <Title accent>04-opencode</Title>
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
        /init 與 AGENTS.md
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        讓 AI 認識你的專案
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

// ─── Page 2: 為什麼需要 AGENTS.md ────────────────────────────────────────────
const Why: Page = () => (
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
    <Eyebrow color="#56b6c2">WHY</Eyebrow>
    <H2>為什麼需要 AGENTS.md</H2>
    <div style={{ display: 'flex', gap: 40, marginTop: 56 }}>
      <Card tag="pain" tagColor="#e06c75" name="沒讀說明書的 AI" desc="＝ 沒 onboarding 的新人，全靠猜" />
      <Card
        tag="solution"
        name="一次講清楚"
        desc="專案結構、慣例、指令…寫在 AGENTS.md"
        highlight
      />
      <Card tag="bootstrap" tagColor="#7fd88f" name="自動生成" desc="/init 自動分析、生成初稿" />
    </div>
    <Footer />
  </div>
);

// ─── Page 3: AGENTS.md 該寫什麼 ──────────────────────────────────────────────
const WhatToWrite: Page = () => (
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
    <Eyebrow>WHAT TO WRITE</Eyebrow>
    <H2>AGENTS.md 該寫什麼</H2>
    <div style={{ display: 'flex', gap: 56, marginTop: 48, alignItems: 'center' }}>
      <DocMock />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
        <LabelRow n={1} name="專案" desc="專案簡介 / tech stack / 目錄結構" />
        <LabelRow n={2} name="慣例" desc="coding 慣例：命名、測試、linter" />
        <LabelRow n={3} name="指令" desc="常用指令：build / test / dev" />
      </div>
    </div>
    <Footer />
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

// ─── Page 4: 跨工具共用 + 進 git ─────────────────────────────────────────────
const ShareAndGit: Page = () => (
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
    <Eyebrow color="#9d7cd8">SHARE + GIT</Eyebrow>
    <H2>跨工具共用，commit 進 git</H2>
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
        跨 agent 的公開慣例 — <span style={{ color: 'var(--osd-accent)' }}>寫一次，到處用</span>
      </FlowRow>
      <FlowRow n={2}>
        commit 進 git → 團隊共用、AI 共讀
      </FlowRow>
      <FlowRow n={3}>它是起點不是終點：持續維護</FlowRow>
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
    <Eyebrow>TAKEAWAYS · DAY 04</Eyebrow>
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
        <Mono>/init</Mono> 五秒鐘，AI 少猜一半
      </Takeaway>
      <Takeaway n={2}>AGENTS.md 是給 AI 的 onboarding 文件</Takeaway>
      <Takeaway n={3}>明天：Plan mode vs Build mode</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 05 · Plan mode vs Build mode
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
  title: '04-opencode｜/init 與 AGENTS.md — Day 04',
  createdAt: '2026-09-01T16:16:03.623Z',
  theme: 'opencode',
};

export default [Cover, Why, WhatToWrite, ShareAndGit, Takeaways] satisfies Page[];
