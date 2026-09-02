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

const CompareCard = ({
  head,
  tone,
  children,
}: {
  head: string;
  tone: 'good' | 'bad';
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
      border: `1px solid ${tone === 'good' ? '#a8d96c' : '#e06c75'}60`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <Tag text={head} color={tone === 'good' ? '#a8d96c' : '#e06c75'} />
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

const InstructionsMock = () => (
  <div
    className="oc-fadeUp"
    style={{
      fontFamily: MONO,
      fontSize: 26,
      lineHeight: 1.8,
      color: bodySoft,
      background: surfaceHi,
      border: `1px solid ${borderSubtle}`,
      borderRadius: 12,
      padding: '28px 44px',
      whiteSpace: 'pre',
    }}
  >
    {'{\n'}
    {'  '}
    <span style={{ color: codePurple }}>"instructions"</span>
    {': [\n'}
    {'    '}
    <span style={{ color: codePeach }}>"contributing.md"</span>
    {',\n'}
    {'    '}
    <span style={{ color: codePeach }}>"packages/*/AGENTS.md"</span>
    {',\n'}
    {'    '}
    <span style={{ color: codePeach }}>"https://team.dev/rules.md"</span>
    {'\n'}
    {'  ]\n'}
    {'}'}
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
      <Eyebrow>IRONMAN 2026 · DAY 12</Eyebrow>
      <Tag text="12 / 30" />
    </div>
    <div>
      <Title accent>12-opencode</Title>
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
        Rules 撰寫心法
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        AGENTS.md 進階配置
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

// ─── Page 2: 三層 rules 與載入順序 ───────────────────────────────────────────
const ThreeLayers: Page = () => (
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
    <Eyebrow color="#4ec9b0">THREE LAYERS</Eyebrow>
    <H2>三層 rules 與載入順序</H2>
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
        專案：往上爬，<Mono>AGENTS.md</Mono> 先搶先贏（沒有才退 <Mono>CLAUDE.md</Mono>）
      </FlowRow>
      <FlowRow n={2}>
        全域 <Mono>~/.config/opencode/AGENTS.md</Mono>（個人偏好，不進 git）
      </FlowRow>
      <FlowRow n={3}>
        Claude Code 相容：<Mono>~/.claude/CLAUDE.md</Mono>；環境變數可整組關閉
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 3: 引用外部文件 ────────────────────────────────────────────────────
const Instructions: Page = () => (
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
    <Eyebrow color="#ec6a9c">INSTRUCTIONS</Eyebrow>
    <H2>引用外部文件</H2>
    <InstructionsMock />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <FlowRow n={1}>
        檔案、glob、遠端 URL 都行——monorepo 救星 <Mono>packages/*/AGENTS.md</Mono>
      </FlowRow>
      <FlowRow n={2}>
        遠端規範改一次、全部生效（5 秒逾時不卡啟動）
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 4: 規則要寫多少？ ──────────────────────────────────────────────────
const HowMuch: Page = () => (
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
    <Eyebrow color="#a8d96c">HOW MUCH</Eyebrow>
    <H2>規則要寫多少？</H2>
    <div style={{ display: 'flex', gap: 40, marginTop: 48 }}>
      <CompareCard head="該寫" tone="good">
        AI 猜不到的——build 指令、架構決策、團隊慣例
      </CompareCard>
      <CompareCard head="不該寫" tone="bad">
        廢話、一次性任務、過時內容——
        <span style={{ color: '#e06c75' }}>過時比沒有更可怕</span>
      </CompareCard>
    </div>
    <p
      className="oc-fadeUp"
      style={{
        margin: '44px 0 0',
        fontSize: 30,
        lineHeight: 1.6,
        color: bodySoft,
      }}
    >
      心法：<Mono>/init</Mono> 起步 → 每次犯錯加一條 → 定期修剪
    </p>
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
    <Eyebrow>TAKEAWAYS · DAY 12</Eyebrow>
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
        Rules 是<span style={{ color: 'var(--osd-accent)' }}>活的文件</span>，跟著專案長大
      </Takeaway>
      <Takeaway n={2}>品質 &gt; 數量：錯了才加、定期修剪</Takeaway>
      <Takeaway n={3}>明天：Custom commands</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 13 · Custom commands
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
  title: '12-opencode｜Rules 撰寫心法 — Day 12',
  createdAt: '2026-09-01T16:16:11.623Z',
  theme: 'opencode',
};

export default [Cover, ThreeLayers, Instructions, HowMuch, Takeaways] satisfies Page[];
