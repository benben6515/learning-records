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
        fontSize: 38,
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

const SkillTree = () => (
  <div
    className="oc-fadeUp"
    style={{
      fontFamily: MONO,
      fontSize: 26,
      lineHeight: 1.85,
      color: bodySoft,
      background: surfaceHi,
      border: `1px solid ${borderSubtle}`,
      borderRadius: 12,
      padding: '32px 44px',
      whiteSpace: 'pre',
    }}
  >
    {'.opencode/skills/\n'}
    {'  '}
    <span style={{ color: codePeach }}>git-release/</span>
    {'\n'}
    {'    '}
    <span style={{ color: codePurple }}>SKILL.md</span>
    {'        '}
    <span style={{ color: muted }}>← name / description 必填</span>
    {'\n'}
    {'    '}
    <span style={{ color: codePurple }}>checklist.md</span>
    {'     '}
    <span style={{ color: muted }}>← 大知識包，第二層 lazy loading</span>
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
      <Eyebrow>IRONMAN 2026 · DAY 15</Eyebrow>
      <Tag text="15 / 30" />
    </div>
    <div>
      <Title accent>15-opencode</Title>
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
        Agent Skills
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        教 agent 新技能
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

// ─── Page 2: 按需載入 ────────────────────────────────────────────────────────
const Progressive: Page = () => (
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
    <Eyebrow color="#4ec9b0">PROGRESSIVE DISCLOSURE</Eyebrow>
    <H2>按需載入</H2>
    <div style={{ display: 'flex', gap: 40, marginTop: 48 }}>
      <Card
        tag="rules"
        name="永遠在場"
        desc="每個字都佔 context——適合精煉常識"
      />
      <Card
        tag="skill"
        tagColor="#ec6a9c"
        name="只佔一行"
        desc="平時只常駐一行簡介，AI 判斷任務吻合才呼叫 skill tool 載入全文"
        highlight
      />
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
      圖書館比喻：書脊都看得到，<span style={{ color: 'var(--osd-accent)' }}>用到才抽書</span>
    </p>
    <Footer />
  </div>
);

// ─── Page 3: 結構與規則 ──────────────────────────────────────────────────────
const Structure: Page = () => (
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
    <Eyebrow color="#ec6a9c">STRUCTURE</Eyebrow>
    <H2>結構與規則</H2>
    <SkillTree />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <FlowRow n={1}>
        name 規則：小寫英數＋單連字號，<span style={{ color: 'var(--osd-accent)' }}>
          與資料夾同名
        </span>
      </FlowRow>
      <FlowRow n={2}>
        載入路徑：<Mono>.opencode/skills/</Mono>、全域、<Mono>.claude/skills/</Mono>、
        <Mono>.agents/skills/</Mono>
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 4: 四種擴充分工 ────────────────────────────────────────────────────
const FourExt: Page = () => (
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
    <Eyebrow color="#a8d96c">FOUR EXTENSIONS</Eyebrow>
    <H2>四種擴充分工</H2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginTop: 56 }}>
      <div style={{ width: 'calc(50% - 16px)' }}>
        <Card tag="rules" name="常識" desc="自動常駐的專案常識" />
      </div>
      <div style={{ width: 'calc(50% - 16px)' }}>
        <Card tag="commands" tagColor="#4ec9b0" name="口頭禪" desc="你主動觸發的流程" />
      </div>
      <div style={{ width: 'calc(50% - 16px)' }}>
        <Card tag="skills" tagColor="#ec6a9c" name="專業知識" desc="AI 判斷吻合才載入" highlight />
      </div>
      <div style={{ width: 'calc(50% - 16px)' }}>
        <Card tag="tools" tagColor="#a8d96c" name="雙手" desc="AI 直接呼叫執行" />
      </div>
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
    <Eyebrow>TAKEAWAYS · DAY 15</Eyebrow>
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
        知識單元愈大愈獨立，用 skill <span style={{ color: 'var(--osd-accent)' }}>愈划算</span>
      </Takeaway>
      <Takeaway n={2}>標準 SKILL.md 格式 ＝ 生態系的插槽</Takeaway>
      <Takeaway n={3}>明天：Custom tools</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 16 · Custom tools
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
  title: '15-opencode｜Agent Skills — Day 15',
  createdAt: '2026-09-01T16:16:14.623Z',
  theme: 'opencode',
};

export default [Cover, Progressive, Structure, FourExt, Takeaways] satisfies Page[];
