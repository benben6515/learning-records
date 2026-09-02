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

const PluginCard = ({
  title,
  code,
}: {
  title: string;
  code: React.ReactNode;
}) => (
  <div
    className="oc-fadeUp"
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: 32,
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <Tag text={title} />
    <div
      style={{
        fontFamily: MONO,
        fontSize: 19,
        lineHeight: 1.75,
        color: bodySoft,
        background: surfaceHi,
        border: `1px solid ${borderSubtle}`,
        borderRadius: 10,
        padding: '20px 24px',
        whiteSpace: 'pre',
      }}
    >
      {code}
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
      <Eyebrow>IRONMAN 2026 · DAY 17</Eyebrow>
      <Tag text="17 / 30" />
    </div>
    <div>
      <Title accent>17-opencode</Title>
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
        Plugins 與 SDK
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}
      >
        程式化擴充
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

// ─── Page 2: Plugin = 事件鉤子 ───────────────────────────────────────────────
const PluginHooks: Page = () => (
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
    <Eyebrow color="#4ec9b0">EVENT HOOKS</Eyebrow>
    <H2>Plugin = 事件鉤子</H2>
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
        本地 <Mono>.opencode/plugins/</Mono>；npm 套件走 config <Mono>plugin</Mono> 陣列（Bun 自動裝）
      </FlowRow>
      <FlowRow n={2}>
        收到 <Mono>{'{ project, client, $, directory, worktree }'}</Mono>
      </FlowRow>
      <FlowRow n={3}>
        事件：<Mono>session.idle</Mono>、<Mono>tool.execute.before/after</Mono>、
        <Mono>permission.asked</Mono>、<Mono>file.edited</Mono>……
      </FlowRow>
    </div>
    <Footer />
  </div>
);

// ─── Page 3: 兩個必看實戰 ────────────────────────────────────────────────────
const TwoRecipes: Page = () => (
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
    <Eyebrow color="#ec6a9c">TWO RECIPES</Eyebrow>
    <H2>兩個必看實戰</H2>
    <div style={{ display: 'flex', gap: 36, marginTop: 44 }}>
      <PluginCard
        title="session.idle → 通知"
        code={
          <>
            <span style={{ color: codePurple }}>if</span>
            {' (event.type === '}
            <span style={{ color: codeGreen }}>"session.idle"</span>
            {') {{\n'}
            {'  '}
            <span style={{ color: codePurple }}>await</span>
            {' $`osascript -e\n'}
            {'    '}
            <span style={{ color: codeGreen }}>'display notification "done!"'</span>
            {`\n}}`}
          </>
        }
      />
      <PluginCard
        title="攔截 .env 讀取"
        code={
          <>
            <span style={{ color: codeGreen }}>"tool.execute.before"</span>
            {': '}
            <span style={{ color: codePurple }}>async</span>
            {' (input, output) => {{\n'}
            {'  '}
            <span style={{ color: codePurple }}>if</span>
            {' (input.tool === '}
            <span style={{ color: codeGreen }}>"read"</span>
            {' &&\n'}
            {'      output.args.filePath.includes('}
            <span style={{ color: codeGreen }}>".env"</span>
            {'))\n'}
            {'    '}
            <span style={{ color: codePurple }}>throw</span>
            {' new Error('}
            <span style={{ color: codeGreen }}>"No .env"</span>
            {')\n}}'}
          </>
        }
      />
    </div>
    <p
      className="oc-fadeUp"
      style={{
        margin: '32px 0 0',
        fontSize: 27,
        lineHeight: 1.55,
        color: muted,
      }}
    >
      還能注入環境變數、自訂 compaction 保留內容
    </p>
    <Footer />
  </div>
);

// ─── Page 4: SDK 把 opencode 當圖書館用 ──────────────────────────────────────
const SdkPage: Page = () => (
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
    <Eyebrow color="#a8d96c">SDK</Eyebrow>
    <H2>SDK：把 opencode 當圖書館用</H2>
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
        架構：TUI 只是客戶端，本體是 <span style={{ color: 'var(--osd-accent)' }}>OpenAPI server</span>
        （<Mono>/doc</Mono>）
      </FlowRow>
      <FlowRow n={2}>
        <Mono>createOpencode</Mono> 起 server＋client；<Mono>createOpencodeClient</Mono> 接現有的
      </FlowRow>
      <FlowRow n={3}>
        Structured output：JSON Schema 進、<span style={{ color: '#a8d96c' }}>驗證過的 JSON</span> 出
      </FlowRow>
      <FlowRow n={4}>
        <Mono>event.subscribe()</Mono> 訂閱 SSE——plugin 聽的事件程式也聽得到
      </FlowRow>
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
    <Eyebrow>TAKEAWAYS · DAY 17</Eyebrow>
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
        Plugin 在<span style={{ color: 'var(--osd-accent)' }}>事件流旁邊</span>做事；SDK 全
        API 型別安全
      </Takeaway>
      <Takeaway n={2}>程式化整合的大門：server 即本體</Takeaway>
      <Takeaway n={3}>明天：Headless 與 server mode</Takeaway>
    </div>
    <div style={{ flex: 1 }} />
    <div className="oc-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tag text="NEXT" />
      <span style={{ fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em' }}>
        Day 18 · Headless 與 server mode
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
  title: '17-opencode｜Plugins 與 SDK — Day 17',
  createdAt: '2026-09-01T16:16:16.623Z',
  theme: 'opencode',
};

export default [Cover, PluginHooks, TwoRecipes, SdkPage, Takeaways] satisfies Page[];
