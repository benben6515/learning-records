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

const SymptomRow = ({
  symptom,
  cure,
  cureColor,
}: {
  symptom: string;
  cure: React.ReactNode;
  cureColor: string;
}) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '22px 36px',
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <span style={{ fontSize: 27, flexShrink: 0, minWidth: 380, color: bodySoft }}>{symptom}</span>
    <span style={{ fontFamily: MONO, fontSize: 22, color: muted }}>→</span>
    <span style={{ fontSize: 28, fontWeight: 600, color: cureColor }}>{cure}</span>
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
      <Eyebrow>IRONMAN 2026 · DAY 25</Eyebrow>
      <Tag text="25 / 30" />
    </div>
    <div>
      <Title accent>25-mp-skills</Title>
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
        Matt Pocock skills｜Skills for Real Engineers
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        不是 vibe coding
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

// ─── Page 2: 誰與立場 ────────────────────────────────────────────────────────
const Who: Page = () => (
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
    <Eyebrow color="#6fc7ec">WHO & WHY</Eyebrow>
    <H2>誰與立場</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        marginTop: 40,
        marginBottom: 24,
      }}
    >
      <FlowRow n={1}>Matt Pocock——Total TypeScript 作者</FlowRow>
      <FlowRow n={2}>
        GSD / BMAD / Spec Kit「接管流程」——流程出 bug 難修
      </FlowRow>
      <FlowRow n={3}>
        反其道：<span style={{ color: 'var(--osd-accent)' }}>
          小、容易改、可組合
        </span>
        ——Make them your own
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 3: 安裝兩種哲學 ────────────────────────────────────────────────────
const Install: Page = () => (
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
    <Eyebrow color="#e070c8">TWO INSTALL PHILOSOPHIES</Eyebrow>
    <H2>安裝兩種哲學（二選一）</H2>
    <div style={{ display: 'flex', gap: 40, marginTop: 44 }}>
      <CompareCard head="plugin 訂閱制" color="#9aa8f0">
        <Mono>claude plugins install</Mono>——跟著作者更新
      </CompareCard>
      <CompareCard head="skills.sh 複製制" color={'#52d6a0'}>
        <Mono>npx skills@latest add mattpocock/skills</Mono>——檔案是你的
      </CompareCard>
    </div>
    <p
      className="oc-fadeUp"
      style={{
        margin: '44px 0 0',
        fontSize: 28,
        lineHeight: 1.55,
        color: bodySoft,
      }}
    >
      裝完必跑：<Mono>/setup-matt-pocock-skills</Mono>（tracker、標籤、文件位置三問）
    </p>
    <Footer />
  </div>
);

// ─── Page 4: 四大病與對應解藥 ────────────────────────────────────────────────
const FourCures: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow color="#52d6a0">FOUR CURES</Eyebrow>
    <H2>四大病與對應解藥</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        marginTop: 36,
        marginBottom: 24,
      }}
    >
      <SymptomRow
        symptom="做的不是我要的"
        cure={
          <>
            grilling（<Mono>grill-me</Mono>）
          </>
        }
        cureColor={codePeach}
      />
      <SymptomRow symptom="廢話太多" cure="shared language（CONTEXT.md）" cureColor={'#6fc7ec'} />
      <SymptomRow symptom="code 是壞的" cure="feedback loops（tdd）" cureColor={'#52d6a0'} />
      <SymptomRow
        symptom="蓋成泥球"
        cure="天天投資設計（improve-codebase-architecture）"
        cureColor={'#e070c8'}
      />
    </div>
    <Footer />
  </div>
);

// ─── Page 5: 分類與相容性 ────────────────────────────────────────────────────
const Taxonomy: Page = () => (
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
    <Eyebrow color="#ff8a70">TAXONOMY</Eyebrow>
    <H2>分類與相容性</H2>
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
        User-invoked（你指揮）vs model-invoked（AI 隨任務取用）
      </FlowRow>
      <FlowRow n={2}>
        指揮權在人：<span style={{ color: 'var(--osd-accent)' }}>user 可以叫 model，反向不行</span>
      </FlowRow>
      <FlowRow n={3}>
        標準 <Mono>SKILL.md</Mono>——opencode 直接載入（第 15 篇的插槽）
      </FlowRow>
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
    <Eyebrow>TAKEAWAYS · DAY 25</Eyebrow>
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
      <Takeaway n={1}>工程紀律打包成可重複單元</Takeaway>
      <Takeaway n={2}>四大病框架本身就是好用的自檢表</Takeaway>
      <Takeaway n={3}>明天：基本盤實戰</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 26 · 基本盤實戰
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
  title: '25-mp-skills｜Skills for Real Engineers — Day 25',
  createdAt: '2026-09-01T16:16:24.623Z',
  theme: 'opencode',
};

export default [Cover, Who, Install, FourCures, Taxonomy, Takeaways] satisfies Page[];
