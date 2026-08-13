import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

import coverImg from './assets/cover.webp';

// ─── Benben theme tokens (from themes/benben.md — neon cyan + violet on near-black)
export const design: DesignSystem = {
  palette: {
    bg: '#0a0a0f',
    text: '#F0F0FF',
    accent: '#22cfcf',
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

const palette = {
  bg: '#0a0a0f',
  text: '#F0F0FF',
  accent: '#22cfcf', // primary neon cyan (dominant emphasis)
  violet: '#efaaef', // electric violet (counterpoint: links, highlights, caveman)
  textSoft: '#D0E0E0',
  muted: '#8090A0',
  dim: '#8090A0',
  surface: '#12121a',
  surfaceHi: '#1a1a25',
  surfaceMax: '#252533',
  border: '#3D3D50',
  borderBright: '#22cfcf',
  borderSubtle: '#15151f',
  mint: '#77EFCF',
  sky: '#89DCEB',
  cyan: '#22cfcf',
  green: '#A6E3A1',
  peach: '#FAB387',
  pink: '#F38BA8',
  yellow: '#F9E2AF',
  lavender: '#efaaef',
};

const font = {
  sans: design.fonts.body,
  display: design.fonts.display,
  mono: '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace',
};

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

const styles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .fadeUp { opacity: 0; animation: fadeUp 0.8s cubic-bezier(.2,.7,.2,1) forwards; }
  .fadeIn { opacity: 0; animation: fadeIn 1s ease forwards; }
`;

const Styles = () => <style>{styles}</style>;

const GridBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(34,207,207,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(34,207,207,0.028) 1px, transparent 1px)',
      backgroundSize: '88px 88px',
      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
    }}
  />
);

// ─── Theme fixed components (verbatim from benben.md, +delay) ─────────────────
const Title = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <h1
    className="fadeUp"
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
  delay = 0,
  color = palette.accent,
}: {
  children: React.ReactNode;
  delay?: number;
  color?: string;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      fontFamily: font.mono,
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
        fontFamily: font.mono,
        fontSize: 18,
        letterSpacing: '0.08em',
        color: palette.dim,
      }}
    >
      <span>省 TOKEN · 2026</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Tag = ({ text, color = palette.accent }: { text: string; color?: string }) => (
  <span
    style={{
      fontFamily: font.mono,
      fontSize: 16,
      color,
      background: `${color}1f`,
      border: `1px solid ${color}3a`,
      padding: '5px 12px',
      borderRadius: 6,
      fontWeight: 500,
      display: 'inline-block',
    }}
  >
    {text}
  </span>
);

// ─── Deck-specific helpers ───────────────────────────────────────────────────
const StatBox = ({
  value,
  label,
  color = palette.accent,
  delay = 0,
}: {
  value: string;
  label: string;
  color?: string;
  delay?: number;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '26px 28px',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: 48, fontWeight: 700, color, letterSpacing: '-0.03em', lineHeight: 1 }}>
      {value}
    </div>
    <div style={{ fontSize: 19, color: palette.muted, marginTop: 10, lineHeight: 1.3 }}>{label}</div>
  </div>
);

const Bullet = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
      fontSize: 30,
      color: palette.textSoft,
      lineHeight: 1.4,
    }}
  >
    <span style={{ color: palette.accent, flexShrink: 0, marginTop: 2 }}>▸</span>
    <span>{text}</span>
  </div>
);

const CodePane = ({
  title,
  tone = 'before',
  tokens,
  children,
  delay = 0,
}: {
  title: string;
  tone?: 'before' | 'after';
  tokens?: string;
  children: React.ReactNode;
  delay?: number;
}) => {
  const toneColor = tone === 'after' ? palette.green : palette.peach;
  return (
    <div
      className="fadeUp"
      style={{
        animationDelay: `${delay}s`,
        background: palette.surface,
        border: `1px solid ${tone === 'after' ? palette.borderBright : palette.border}`,
        borderRadius: 'var(--osd-radius)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <div
        style={{
          height: 44,
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: palette.surfaceHi,
          borderBottom: `1px solid ${palette.border}`,
          flexShrink: 0,
        }}
      >
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: palette.pink }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: palette.peach }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: palette.green }} />
        <span
          style={{
            marginLeft: 6,
            fontFamily: font.mono,
            fontSize: 15,
            color: palette.muted,
            letterSpacing: '0.04em',
          }}
        >
          {title}
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: font.mono,
            fontSize: 13,
            padding: '2px 9px',
            borderRadius: 5,
            color: toneColor,
            background: `${toneColor}1f`,
            border: `1px solid ${toneColor}3a`,
          }}
        >
          {tone === 'after' ? 'AFTER' : 'BEFORE'}
        </span>
      </div>
      <pre
        style={{
          margin: 0,
          padding: '18px 22px',
          fontFamily: font.mono,
          fontSize: 18,
          lineHeight: 1.55,
          color: palette.textSoft,
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          flex: 1,
        }}
      >
        {children}
      </pre>
      {tokens && (
        <div
          style={{
            padding: '8px 16px',
            borderTop: `1px solid ${palette.borderSubtle}`,
            fontFamily: font.mono,
            fontSize: 14,
            color: palette.muted,
            display: 'flex',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <span>{tone === 'after' ? '↓ 壓縮後' : '原始'}</span>
          <span style={{ color: toneColor }}>{tokens}</span>
        </div>
      )}
    </div>
  );
};

const SectionH2 = ({ children, delay = 0.1 }: { children: React.ReactNode; delay?: number }) => (
  <h2
    className="fadeUp"
    style={{
      margin: '4px 0 0',
      fontFamily: 'var(--osd-font-display)',
      fontSize: 60,
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      animationDelay: `${delay}s`,
    }}
  >
    {children}
  </h2>
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
    {/* Cover background image with Mocha-dark overlay */}
    <img
      src={coverImg}
      alt=""
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.3,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse at 28% 35%, rgba(34,207,207,0.14), transparent 55%), linear-gradient(180deg, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.94) 100%)',
      }}
    />
    <GridBg />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Eyebrow delay={0.05}>BENBEN · TOKEN OPT</Eyebrow>
      <div className="fadeUp" style={{ animationDelay: '0.05s', display: 'flex', gap: 10 }}>
        <Tag text="rtk" color={palette.green} />
        <Tag text="caveman" color={palette.lavender} />
      </div>
    </div>
    <div>
      <Title>省 Token</Title>
      <p
        className="fadeUp"
        style={{
          marginTop: 36,
          maxWidth: 1100,
          fontSize: 44,
          lineHeight: 1.3,
          color: palette.textSoft,
          animationDelay: '0.3s',
        }}
      >
        AI Agent 如何用 <span style={{ color: palette.accent }}>更少的 token</span> 做同樣的事。
      </p>
    </div>
    <Footer />
  </div>
);

// ─── Page 2: 為什麼要省 ───────────────────────────────────────────────────────
const Why: Page = () => (
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
    <Eyebrow>一、為什麼</Eyebrow>
    <SectionH2>為什麼要省 Token？</SectionH2>
    <p
      className="fadeUp"
      style={{ margin: '12px 0 0', fontSize: 28, color: palette.muted, animationDelay: '0.2s' }}
    >
      Token 不只是錢 — 它同時決定成本、速度、上限與品質。
    </p>
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18,
        minHeight: 0,
        marginTop: 8,
      }}
    >
      <StatBox value="成本" label="按 token 計價，省 token = 省錢" color={palette.accent} delay={0.25} />
      <StatBox value="延遲" label="token 多 → 生成慢、回合久" color={palette.lavender} delay={0.31} />
      <StatBox value="Context 上限" label="超過就截斷、遺忘或出錯" color={palette.accent} delay={0.37} />
      <StatBox value="Attention" label="雜訊多 → 回答失準、失焦" color={palette.lavender} delay={0.43} />
    </div>
    <Footer />
  </div>
);

// ─── Page 3: Token 流到哪 ────────────────────────────────────────────────────
const Where: Page = () => (
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
    <Eyebrow color={palette.sky}>二、流向</Eyebrow>
    <SectionH2>Token 流到哪去了？</SectionH2>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, marginTop: 8 }}>
      <FlowRow label="System prompt" note="固定開銷 · 每輪重送" delay={0.2} />
      <FlowRow label="Tool 描述" note="每個 tool 的 schema / 說明" delay={0.26} />
      <FlowRow label="Tool 結果" note="command output、API response — 通常最大宗" delay={0.32} highlight />
      <FlowRow label="對話歷史" note="持續累積，越來越長" delay={0.38} />
      <FlowRow label="Model 輸出" note="生成即計費" delay={0.44} />
    </div>
    <Footer />
  </div>
);

const FlowRow = ({
  label,
  note,
  delay = 0,
  highlight = false,
}: {
  label: string;
  note: string;
  delay?: number;
  highlight?: boolean;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: highlight ? `${palette.accent}14` : palette.surface,
      border: `1px solid ${highlight ? palette.borderBright : palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '18px 26px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    }}
  >
    <span
      style={{
        fontFamily: font.mono,
        fontSize: 24,
        color: highlight ? palette.accent : palette.text,
        minWidth: 240,
        fontWeight: 600,
      }}
    >
      {label}
    </span>
    <span style={{ fontSize: 22, color: palette.textSoft, flex: 1 }}>{note}</span>
    {highlight && <Tag text="最大宗" color={palette.accent} />}
  </div>
);

// ─── Page 4: caveman 概念 ────────────────────────────────────────────────────
const CavemanConcept: Page = () => (
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
    <Eyebrow color={palette.lavender}>方法一 · caveman</Eyebrow>
    <SectionH2>
      caveman — <span style={{ color: palette.lavender }}>語言壓縮</span>
    </SectionH2>
    <p
      className="fadeUp"
      style={{ margin: '8px 0 0', fontSize: 30, color: palette.textSoft, animationDelay: '0.2s' }}
    >
      Drop filler, keep substance. 把禮貌與贅字壓掉，只留 substance。
    </p>
    <div className="fadeUp" style={{ animationDelay: '0.3s', display: 'flex', gap: 10, alignItems: 'center' }}>
      <span style={{ fontFamily: font.mono, fontSize: 16, color: palette.muted }}>levels →</span>
      <Tag text="lite" color={palette.sky} />
      <Tag text="full" color={palette.mint} />
      <Tag text="ultra" color={palette.lavender} />
      <Tag text="wenyan" color={palette.yellow} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
      <Bullet text="進（prompt）+ 出（response）的 token 都省" delay={0.4} />
      <Bullet text="「請你幫我看看…」→「review this」" delay={0.46} />
      <Bullet text="犧牲禮貌，換 token 與速度" delay={0.52} />
    </div>
    <Footer />
  </div>
);

// ─── Page 5: caveman before/after ────────────────────────────────────────────
const CavemanDemo: Page = () => (
  <div
    style={{
      ...fill,
      padding: '90px 110px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow color={palette.lavender}>方法一 · 實測</Eyebrow>
    <SectionH2>caveman · before / after</SectionH2>
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr 0.7fr',
        gap: 16,
        minHeight: 0,
        marginTop: 8,
      }}
    >
      <CodePane title="verbose" tone="before" tokens="~58 tokens" delay={0.2}>
        {'Can you please take a look at the\nfile structure when you have a moment?\nI am not entirely sure if the way I\norganized everything makes sense, and I\nwould really appreciate any feedback or\nsuggestions. Thank you so much!'}
      </CodePane>
      <CodePane title="caveman · full" tone="after" tokens="~6 tokens" delay={0.32}>
        {'Review the\nfile structure.\nThoughts?'}
      </CodePane>
      <CodePane title="caveman · ultra" tone="after" tokens="~2 tokens" delay={0.44}>
        {'review\nstructure?'}
      </CodePane>
    </div>
    <p
      className="fadeUp"
      style={{ margin: 0, fontSize: 22, color: palette.muted, animationDelay: '0.56s' }}
    >
      同一個意圖：<span style={{ color: palette.accent }}>58 → 6 → 2 tokens</span>。進與出都適用。
    </p>
    <Footer />
  </div>
);

// ─── Page 6: RTK 概念 ────────────────────────────────────────────────────────
const RtkConcept: Page = () => (
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
    <Eyebrow color={palette.green}>方法二 · rtk</Eyebrow>
    <SectionH2>
      RTK — <span style={{ color: palette.accent }}>Rust Token Killer</span>
    </SectionH2>
    <p
      className="fadeUp"
      style={{ margin: '8px 0 0', fontSize: 30, color: palette.textSoft, animationDelay: '0.2s' }}
    >
      CLI proxy + Claude Code hook — 自動過濾 tool 輸出，0 額外操作。
    </p>
    <div
      className="fadeUp"
      style={{
        animationDelay: '0.3s',
        display: 'inline-flex',
        gap: 14,
        alignItems: 'center',
        background: palette.surface,
        border: `1px solid ${palette.border}`,
        borderRadius: 10,
        padding: '14px 20px',
        fontFamily: font.mono,
        fontSize: 24,
        width: 'fit-content',
      }}
    >
      <span style={{ color: palette.peach }}>$ git status</span>
      <span style={{ color: palette.muted }}>→</span>
      <span style={{ color: palette.green }}>$ rtk git status</span>
      <span style={{ color: palette.muted, fontSize: 16 }}>（hook 自動改寫）</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 4 }}>
      <Bullet text="專攻 tool 結果 — token 流向裡最大宗的那一塊" delay={0.4} />
      <Bullet text="過濾、精簡輸出，再送進 context" delay={0.46} />
      <Bullet text="透明代理：你照常下指令，它默默省" delay={0.52} />
    </div>
    <div className="fadeUp" style={{ animationDelay: '0.6s' }}>
      <Tag text="官方數據：60–90% savings" color={palette.green} />
    </div>
    <Footer />
  </div>
);

// ─── Page 7: RTK before/after ────────────────────────────────────────────────
const RtkDemo: Page = () => (
  <div
    style={{
      ...fill,
      padding: '90px 110px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow color={palette.green}>方法二 · 實測</Eyebrow>
    <SectionH2>RTK · before / after</SectionH2>
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18,
        minHeight: 0,
        marginTop: 8,
      }}
    >
      <CodePane title="git status (raw)" tone="before" tokens="~60 tokens" delay={0.2}>
        {'On branch main\nYour branch is ahead of origin/main by 2 commits.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update)\n  (use "git checkout -- <file>..." to discard)\n\n\tmodified:   src/index.tsx\n\tmodified:   src/app.tsx\n\tmodified:   package.json\n\nUntracked files:\n\tsrc/new.tsx'}
      </CodePane>
      <CodePane title="rtk git status (示意)" tone="after" tokens="~15 tokens" delay={0.34}>
        {'main  ↑2\n  M src/index.tsx\n  M src/app.tsx\n  M package.json\n  ? src/new.tsx'}
      </CodePane>
    </div>
    <p
      className="fadeUp"
      style={{ margin: 0, fontSize: 22, color: palette.muted, animationDelay: '0.5s' }}
    >
      只留 agent 真正需要的訊號：<span style={{ color: palette.accent }}>~60 → ~15 tokens</span>。
    </p>
    <Footer />
  </div>
);

// ─── Page 8: 實測數據 ────────────────────────────────────────────────────────
const Metrics: Page = () => (
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
    <Eyebrow color={palette.yellow}>三、數據</Eyebrow>
    <SectionH2>實測數據</SectionH2>
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        minHeight: 0,
        marginTop: 12,
        alignContent: 'center',
      }}
    >
      <StatBox value="60–90%" label="RTK · dev operations" color={palette.accent} delay={0.2} />
      <StatBox value="~70%" label="caveman · 語言壓縮（視內容）" color={palette.lavender} delay={0.28} />
      <StatBox value="95–99%" label="file-based wrapper · 先過濾再進 context" color={palette.accent} delay={0.36} />
      <StatBox value="進 × 出" label="caveman × rtk 疊加" color={palette.lavender} delay={0.44} />
    </div>
    <p
      className="fadeUp"
      style={{ margin: 0, fontSize: 22, color: palette.muted, animationDelay: '0.55s' }}
    >
      數據為各工具的代表性區間 — 實際節省視任務與內容而定。
    </p>
    <Footer />
  </div>
);

// ─── Page 9: 其他槓桿 ────────────────────────────────────────────────────────
const Levers: Page = () => (
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
    <Eyebrow color={palette.mint}>四、其他</Eyebrow>
    <SectionH2>其他省 token 的槓桿</SectionH2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
      <Bullet text="File-based 過濾 — 在程式裡先 filter，只送需要的欄位進 context" delay={0.2} />
      <Bullet text="Context pruning / 摘要 — 砍掉舊對話，或摘要成精簡版" delay={0.26} />
      <Bullet text="Prompt caching — 重複的 system prompt 走 cache，便宜很多" delay={0.32} />
      <Bullet text="小模型 delegation — 子任務交給更便宜的模型" delay={0.38} />
      <Bullet text="精簡 system prompt — 砍 boilerplate，BPE 友善寫法" delay={0.44} />
    </div>
    <Footer />
  </div>
);

// ─── Page 10: Takeaways ──────────────────────────────────────────────────────
const Takeaways: Page = () => (
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
    <Eyebrow>結論</Eyebrow>
    <SectionH2>組合拳 · Takeaways</SectionH2>
    <div
      className="fadeUp"
      style={{
        animationDelay: '0.2s',
        background: `${palette.accent}12`,
        border: `1px solid ${palette.borderBright}`,
        borderRadius: 'var(--osd-radius)',
        padding: '20px 26px',
        fontSize: 28,
        color: palette.text,
      }}
    >
      <span style={{ color: palette.lavender }}>caveman</span>（壓語言） ×{' '}
      <span style={{ color: palette.accent }}>rtk</span>（壓工具輸出） ={' '}
      <span style={{ color: palette.text }}>進與出同時省</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 4 }}>
      <Takeaway n="01" text="先找最大宗 — tool 結果通常佔最多，先過濾它（rtk）" delay={0.32} />
      <Takeaway n="02" text="壓語言 — 進出都用 caveman，禮貌換 token" delay={0.4} />
      <Takeaway n="03" text="疊加才強 — 單一技巧有限，組合起來效果倍增" delay={0.48} />
    </div>
    <Footer />
  </div>
);

const Takeaway = ({ n, text, delay = 0 }: { n: string; text: string; delay?: number }) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '20px 26px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    }}
  >
    <span
      style={{
        fontFamily: font.mono,
        fontSize: 24,
        fontWeight: 700,
        color: palette.accent,
        minWidth: 48,
      }}
    >
      {n}
    </span>
    <span style={{ fontSize: 26, color: palette.textSoft }}>{text}</span>
  </div>
);

// ─── Page 11: Q&A ────────────────────────────────────────────────────────────
const Thanks: Page = () => (
  <div
    style={{
      ...fill,
      padding: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: 32,
    }}
  >
    <Styles />
    <GridBg />
    <Eyebrow>THE END</Eyebrow>
    <Title>感謝聆聽</Title>
    <p
      className="fadeUp"
      style={{
        margin: 0,
        maxWidth: 1000,
        fontSize: 36,
        lineHeight: 1.5,
        color: palette.textSoft,
        animationDelay: '0.3s',
      }}
    >
      Q & A — 或你想知道的<span style={{ color: palette.accent }}>省 token</span>招式
    </p>
    <div className="fadeUp" style={{ animationDelay: '0.5s' }}>
      <Tag text="Q & A" color={palette.mint} />
    </div>
    <Footer />
  </div>
);

// ─── Deck-wide transition: quiet RISE (matches benben) ───────────────────────
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
  title: 'AI Agent 如何省 Token？',
  description: '用更少的 token 做同樣的事 — caveman（語言壓縮）× rtk（工具輸出過濾）實戰',
  theme: 'benben',
  createdAt: '2026-08-13T15:08:11.790Z',
};

export default [
  Cover,
  Why,
  Where,
  CavemanConcept,
  CavemanDemo,
  RtkConcept,
  RtkDemo,
  Metrics,
  Levers,
  Takeaways,
  Thanks,
] satisfies Page[];
