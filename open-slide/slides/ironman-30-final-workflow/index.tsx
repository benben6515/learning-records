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
      padding: '24px 36px',
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
    <div style={{ fontSize: 30, lineHeight: 1.5 }}>{children}</div>
  </div>
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
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: highlight ? 'var(--osd-accent)' : 'var(--osd-text)',
      }}
    >
      {name}
    </div>
    <div style={{ fontSize: 25, lineHeight: 1.5, color: bodySoft }}>{desc}</div>
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
      <Eyebrow>IRONMAN 2026 · DAY 30</Eyebrow>
      <Tag text="30 / 30" color={'#52d6a0'} />
    </div>
    <div>
      <Title accent>30-final</Title>
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
        組合自己的 AI 開發工作流
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        30 天，完賽！
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

// ─── Page 2: 三階段回顧 ──────────────────────────────────────────────────────
const ThreePhases: Page = () => (
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
    <Eyebrow color="#6fc7ec">THREE PHASES</Eyebrow>
    <H2>三階段回顧</H2>
    <div style={{ display: 'flex', gap: 32, marginTop: 52 }}>
      <Card
        tag="新手篇 · 01–10"
        name="當隊友"
        desc="會動手的隊友，不是出一張嘴的顧問"
      />
      <Card
        tag="進階篇 · 11–20"
        tagColor="#e070c8"
        name="變平台"
        desc="每個擴充點都是插槽"
        highlight
      />
      <Card
        tag="工具巡禮 · 21–29"
        tagColor="#52d6a0"
        name="變樂高"
        desc="工作流才是作品"
      />
    </div>
    <Footer />
  </div>
);

// ─── Page 3: End-to-End 工作流 ───────────────────────────────────────────────
const E2E: Page = () => (
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
    <Eyebrow color="#e070c8">END-TO-END · 實際在跑的</Eyebrow>
    <H2>End-to-End 工作流</H2>
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
        grill-me 拷問 → OpenSpec 提規格 → to-tickets 切票
      </FlowRow>
      <FlowRow n={2}>
        herdr 分欄並行 → opencode ＋ tdd 逐票實作 → code-review 雙軸
      </FlowRow>
      <FlowRow n={3}>
        push 後 <Mono>/oc</Mono> 先審 → open-slide 產簡報 → <Mono>/share</Mono> 留檔覆盤
      </FlowRow>
    </div>
    <div style={{ flex: 1 }} />
    <Punch>
      每一格都是 30 天講過的功能——<span style={{ color: 'var(--osd-accent)' }}>
        組合就是全部的秘密
      </span>
    </Punch>
    <Footer />
  </div>
);

// ─── Page 4: 完賽感言 ────────────────────────────────────────────────────────
const FinalWords: Page = () => (
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
    <Eyebrow color="#ff8a70">CLOSING</Eyebrow>
    <H2>完賽感言</H2>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 44 }}>
      <Punch>
        AI 讓鐵人賽從<span style={{ color: 'var(--osd-accent)' }}>耐力賽</span>變
        <span style={{ color: '#52d6a0' }}>接力賽</span>
      </Punch>
      <p
        className="oc-fadeUp"
        style={{
          margin: 0,
          fontSize: 29,
          lineHeight: 1.65,
          color: bodySoft,
          textAlign: 'center',
        }}
      >
        連續 30 天的敵人是決策疲勞——前期把規範定好，後期只剩「寫」
        <br />
        判斷與經驗，沒辦法外包
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
        下一步：找一個自己的小專案，跑一週新手篇，再決定平台化
      </p>
    </div>
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
    <Eyebrow>TAKEAWAYS · DAY 30</Eyebrow>
    <H2>完賽收網</H2>
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
        opencode 是這條工作流的<span style={{ color: 'var(--osd-accent)' }}>發動機</span>
        ，工作流是你自己的
      </Takeaway>
      <Takeaway n={2}>完賽！下一個系列見 :D</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="完賽" color={'#52d6a0'} />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        IRONMAN 2026 · 30 / 30 · see you next series :D
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
  title: '30-final｜組合自己的 AI 開發工作流 — Day 30',
  createdAt: '2026-09-01T16:16:29.623Z',
  theme: 'opencode',
};

export default [Cover, ThreePhases, E2E, FinalWords, Takeaways] satisfies Page[];
