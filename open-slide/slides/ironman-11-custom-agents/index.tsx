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

const FmMock = () => (
  <div
    className="oc-fadeUp"
    style={{
      fontFamily: MONO,
      fontSize: 24,
      lineHeight: 1.75,
      color: bodySoft,
      background: surfaceHi,
      border: `1px solid ${borderSubtle}`,
      borderRadius: 12,
      padding: '28px 40px',
      whiteSpace: 'pre',
    }}
  >
    {'---\n'}
    <span style={{ color: codePurple }}>description</span>
    {': Reviews code for quality\n'}
    <span style={{ color: codePurple }}>mode</span>
    {': '}
    <span style={{ color: codeGreen }}>subagent</span>
    {'\n'}
    <span style={{ color: codePurple }}>model</span>
    {': '}
    <span style={{ color: codePeach }}>opencode-go/glm-5.3-flash</span>
    {'\n'}
    <span style={{ color: codePurple }}>permission</span>
    {':\n'}
    {'  edit: '}
    <span style={{ color: '#e06c75' }}>deny</span>
    {'\n'}
    {'  bash: { '}
    <span style={{ color: codePeach }}>"git diff"</span>
    {': '}
    <span style={{ color: codeGreen }}>allow</span>
    {' } \n'}
    {'---'}
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
      <Eyebrow>IRONMAN 2026 · DAY 11</Eyebrow>
      <Tag text="11 / 30" />
    </div>
    <div>
      <Title accent>11-opencode</Title>
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
        自訂 Agents
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        打造你的專屬小隊
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

// ─── Page 2: Agent 是什麼 ────────────────────────────────────────────────────
const WhatIsAgent: Page = () => (
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
    <Eyebrow color="#4ec9b0">WHAT IS AN AGENT</Eyebrow>
    <H2>Agent 是什麼</H2>
    <p
      className="oc-fadeUp"
      style={{
        margin: '28px 0 0',
        fontSize: 34,
        lineHeight: 1.5,
        color: bodySoft,
      }}
    >
      一個 agent ＝ 一份<span style={{ color: 'var(--osd-accent)' }}>系統提示</span> ＋ 一組
      <span style={{ color: 'var(--osd-accent)' }}>能力上限</span>
    </p>
    <div style={{ display: 'flex', gap: 40, marginTop: 44 }}>
      <Card
        tag="primary"
        name="Tab 切換"
        desc="你直接對話的主力——內建 Build / Plan"
        highlight
      />
      <Card
        tag="subagent"
        tagColor="#ec6a9c"
        name="@ 點名"
        desc="被呼叫的專家——General / Explore / Scout，AI 也會自動派遣"
      />
    </div>
    <Footer />
  </div>
);

// ─── Page 3: 定義方式 ────────────────────────────────────────────────────────
const Define: Page = () => (
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
    <Eyebrow color="#ec6a9c">DEFINE</Eyebrow>
    <H2>定義方式：一個 .md 檔就搞定</H2>
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
        專案 <Mono>.opencode/agents/</Mono> · 全域 <Mono>~/.config/opencode/agents/</Mono>
      </FlowRow>
      <FlowRow n={2}>
        檔名即 agent 名——<Mono>review.md</Mono> → <Mono>review</Mono>
      </FlowRow>
      <FlowRow n={3}>
        懶人法 <Mono>opencode agent create</Mono> 互動精靈（沒勾的 permission 全 deny）
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 4: front-matter 重點 ───────────────────────────────────────────────
const FrontMatter: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow color="#a8d96c">FRONT-MATTER</Eyebrow>
    <H2>front-matter 重點</H2>
    <FmMock />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <FlowRow n={1}>
        <Mono>description</Mono>（必填）：自動派遣的判斷依據
      </FlowRow>
      <FlowRow n={2}>
        <Mono>bash</Mono> 吃 glob，<span style={{ color: 'var(--osd-accent)' }}>後寫的優先</span>；
        舊的 <Mono>tools</Mono> 欄位已 deprecated
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 5: 實戰範例 ────────────────────────────────────────────────────────
const Examples: Page = () => (
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
    <Eyebrow color="#e5c07b">EXAMPLES</Eyebrow>
    <H2>實戰範例</H2>
    <div style={{ display: 'flex', gap: 40, marginTop: 36 }}>
      <Card
        tag="reviewer · subagent"
        name="只能出一張嘴"
        desc="edit: deny ＋ git diff 放行——reviewer 該有的教養"
        highlight
      />
      <Card
        tag="翻譯 · primary"
        tagColor="#a8d96c"
        name="小模型上陣"
        desc="綁便宜 model ＋ bash: deny，翻譯不需要動檔案"
      />
    </div>
    <p
      className="oc-fadeUp"
      style={{
        margin: '32px 0 0',
        fontSize: 28,
        lineHeight: 1.5,
        color: muted,
      }}
    >
      冷知識：subagent 沒綁 model，會沿用呼叫者的 model
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
    <Eyebrow>TAKEAWAYS · DAY 11</Eyebrow>
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
        把「角色」抽離成<span style={{ color: 'var(--osd-accent)' }}>可重用資產</span>
      </Takeaway>
      <Takeaway n={2}>小隊分工：貴模型主廚、便宜模型助手</Takeaway>
      <Takeaway n={3}>明天：Rules 撰寫心法</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 12 · Rules 撰寫心法
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
  title: '11-opencode｜自訂 Agents — Day 11',
  createdAt: '2026-09-01T16:16:10.623Z',
  theme: 'opencode',
};

export default [Cover, WhatIsAgent, Define, FrontMatter, Examples, Takeaways] satisfies Page[];
