import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

export const design: DesignSystem = {
  palette: {
    bg: '#1d2944',
    text: '#e8eaed',
    accent: '#39b7d0',
  },
  fonts: {
    display: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
    body: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 120,
    body: 30,
  },
  radius: 18,
};

const palette = {
  bg: '#0a0e17',
  text: '#e8eaed',
  accent: '#00b4d8',
  surface: '#111827',
  surfaceHi: '#1a2332',
  surfaceMax: '#243044',
  textSoft: '#b0b8c4',
  muted: '#6b7280',
  dim: '#374151',
  border: 'rgba(255,255,255,0.08)',
  borderBright: 'rgba(255,255,255,0.15)',
  accentSoft: '#48cae4',
  cyan: '#00b4d8',
  blue: '#3b82f6',
  green: '#10b981',
  amber: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
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
        'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      backgroundSize: '80px 80px',
      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 70%)',
    }}
  />
);

const Eyebrow = ({ children, style, delay = 0 }: { children: React.ReactNode; style?: React.CSSProperties; delay?: number }) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      fontFamily: font.mono,
      fontSize: 20,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: palette.accent,
      ...style,
    }}
  >
    {children}
  </div>
);

const SectionCard = ({
  number,
  title,
  subtitle,
  delay = 0,
}: {
  number: string;
  title: string;
  subtitle: string;
  delay?: number;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '28px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${palette.cyan}, ${palette.blue})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font.mono,
        fontSize: 24,
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
      }}
    >
      {number}
    </div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 600, color: palette.text, letterSpacing: '-0.02em' }}>
        {title}
      </div>
      <div style={{ fontSize: 20, color: palette.muted, marginTop: 4 }}>{subtitle}</div>
    </div>
  </div>
);

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
      padding: '24px 28px',
      textAlign: 'center',
    }}
  >
    <div
      style={{
        fontSize: 48,
        fontWeight: 700,
        color,
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: 18,
        color: palette.muted,
        marginTop: 8,
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </div>
  </div>
);

const BulletList = ({
  items,
  delay = 0,
  color = palette.textSoft,
}: {
  items: string[];
  delay?: number;
  color?: string;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    {items.map((item, i) => (
      <div
        key={i}
        className="fadeUp"
        style={{
          animationDelay: `${delay + i * 0.1}s`,
          display: 'flex',
          gap: 14,
          alignItems: 'flex-start',
          fontSize: 22,
          color,
          lineHeight: 1.4,
        }}
      >
        <span style={{ color: palette.accent, flexShrink: 0, marginTop: 2 }}>▸</span>
        <span>{item}</span>
      </div>
    ))}
  </div>
);

const Tag = ({ text, color = palette.accent }: { text: string; color?: string }) => (
  <span
    style={{
      fontFamily: font.mono,
      fontSize: 16,
      color,
      background: `${color}18`,
      border: `1px solid ${color}30`,
      padding: '4px 10px',
      borderRadius: 6,
      fontWeight: 500,
      display: 'inline-block',
    }}
  >
    {text}
  </span>
);

export const meta: SlideMeta = {
  title: '塑膠射出成型機技術研究',
  description: '從熔融塑膠到成型製品 — 射出成型原理、五大製程週期與機台關鍵部件',
};

// ─── Slide 1: Cover ──────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '120px 140px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Eyebrow delay={0.05}>Technical Research Report</Eyebrow>
        <Tag text="2026-06-02" />
      </div>
      <div>
        <h1 className="fadeUp" style={{ fontFamily: 'var(--osd-font-display)', fontSize: 'var(--osd-size-hero)', lineHeight: 1.05, fontWeight: 700, margin: 0, letterSpacing: '-0.04em', animationDelay: '0.15s' }}>
          塑膠射出成型機<br />
          <span style={{ background: `linear-gradient(90deg, ${palette.cyan}, ${palette.blue})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            Plastic Injection Molding Machine
          </span>
        </h1>
        <p className="fadeUp" style={{ marginTop: 36, maxWidth: 900, fontSize: 28, lineHeight: 1.5, color: palette.textSoft, animationDelay: '0.35s' }}>
          全面技術研究報告：原理、構造、分類、製造商、應用產業與技術趨勢
        </p>
      </div>
      <div className="fadeUp" style={{ animationDelay: '0.55s', fontFamily: font.mono, fontSize: 18, color: palette.muted }}>
        Sources: Wikipedia · CustomPartNet · Rosato Handbook
      </div>
    </div>
  </div>
);

// ─── Slide 2: Table of Contents ──────────────────────────────────────────────
const TOC: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Eyebrow delay={0}>目錄</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, animationDelay: '0.1s' }}>
        Table of Contents
      </h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, minHeight: 0, marginTop: 16 }}>
        {[
          { n: '一', t: '基本原理與工作流程', s: 'Injection Molding Cycle' },
          { n: '二', t: '主要構造與核心部件', s: 'Machine Components' },
          { n: '三', t: '分類與機型', s: 'Machine Types' },
          { n: '四', t: '關鍵技術參數', s: 'Key Specifications' },
          { n: '五', t: '全球與台灣製造商', s: 'Global Manufacturers' },
          { n: '六', t: '應用產業與產品', s: 'Industry Applications' },
          { n: '七', t: '近年技術趨勢', s: 'Technology Trends' },
          { n: '八', t: '模具設計基礎', s: 'Mold Design Basics' },
          { n: '九', t: '產業術語對照', s: 'Terminology (CN/EN/JP)' },
          { n: '十', t: '參考資料', s: 'References' },
        ].map((item, i) => (
          <SectionCard key={i} number={item.n} title={item.t} subtitle={item.s} delay={0.15 + i * 0.06} />
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 3: Chapter 1 - Overview ───────────────────────────────────────────
const Ch1Overview: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 140px', display: 'flex', flexDirection: 'column', gap: 36 }}>
      <Eyebrow delay={0}>一、基本原理與工作流程</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, animationDelay: '0.1s' }}>
        射出成型概述
      </h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28, minHeight: 0 }}>
        <p className="fadeUp" style={{ fontSize: 28, lineHeight: 1.6, color: palette.textSoft, animationDelay: '0.2s' }}>
          射出成型（Injection Molding）是製造塑膠製品最重要的加工方法之一。將熱塑性或熱固性塑膠加熱至熔融狀態，再以高壓射入模具模穴中，經冷卻固化後得到特定形狀與尺寸的製品。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 12 }}>
          <div className="fadeUp" style={{ animationDelay: '0.3s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px 32px' }}>
            <div style={{ fontSize: 20, color: palette.cyan, fontFamily: font.mono, marginBottom: 12 }}>INJECTION UNIT</div>
            <div style={{ fontSize: 32, fontWeight: 600, color: palette.text }}>射出裝置</div>
            <div style={{ fontSize: 22, color: palette.muted, marginTop: 8 }}>負責塑化與射出</div>
          </div>
          <div className="fadeUp" style={{ animationDelay: '0.4s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px 32px' }}>
            <div style={{ fontSize: 20, color: palette.blue, fontFamily: font.mono, marginBottom: 12 }}>CLAMPING UNIT</div>
            <div style={{ fontSize: 32, fontWeight: 600, color: palette.text }}>鎖模裝置</div>
            <div style={{ fontSize: 22, color: palette.muted, marginTop: 8 }}>固定模具並承受射出壓力</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 4: Injection Molding Cycle (5 stages) ─────────────────────────────
const Ch1Cycle: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 100px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Eyebrow delay={0}>一、基本原理</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 8, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>
        射出成型完整週期（5 階段）
      </h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, minHeight: 0, marginTop: 12 }}>
        {[
          { n: '1', title: '關模', en: 'Mold Closing', desc: '鎖模機構閉合模具\n鎖模力 > 模穴壓力', color: palette.cyan },
          { n: '2', title: '射出/充填', en: 'Injection', desc: '螺桿推進，高壓高速\n射入模穴 10-30K PSI', color: palette.blue },
          { n: '3', title: '保壓/補縮', en: 'Holding', desc: '持續保壓 50-80%\n補償冷卻收縮', color: palette.green },
          { n: '4', title: '冷卻/塑化', en: 'Cooling', desc: '製品冷卻固化\n螺桿旋轉蓄積下一射出量', color: palette.amber },
          { n: '5', title: '開模/頂出', en: 'Ejection', desc: '模具打開\n頂出機構推出成品', color: palette.purple },
        ].map((stage, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.15 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderTop: `3px solid ${stage.color}`, borderRadius: 'var(--osd-radius)', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${stage.color}20`, border: `2px solid ${stage.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: stage.color }}>{stage.n}</div>
            <div style={{ fontSize: 26, fontWeight: 600, color: palette.text }}>{stage.title}</div>
            <div style={{ fontSize: 16, color: stage.color, fontFamily: font.mono }}>{stage.en}</div>
            <div style={{ fontSize: 18, color: palette.muted, lineHeight: 1.5, whiteSpace: 'pre-line', marginTop: 4 }}>{stage.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 5: Cycle Time ─────────────────────────────────────────────────────
const Ch1CycleTime: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 140px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Eyebrow delay={0}>一、基本原理</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>循環時間分析</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
        <div className="fadeUp" style={{ animationDelay: '0.2s', display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: 0, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', overflow: 'hidden' }}>
          {['階段', '典型時間', '說明'].map((h, i) => (
            <div key={i} style={{ padding: '16px 24px', background: palette.surfaceHi, borderBottom: `1px solid ${palette.border}`, fontFamily: font.mono, fontSize: 18, fontWeight: 600, color: palette.accent, letterSpacing: '0.05em' }}>{h}</div>
          ))}
          {[
            ['射出/充填', '< 1 秒', '實際充填時間往往不到 1 秒'],
            ['保壓/補縮', '1-10 秒', '取決於澆口尺寸與材料凝固速度'],
            ['冷卻', '10-60 秒', '與製品壁厚相關，是循環時間瓶頸'],
            ['開模/頂出', '1-5 秒', '取決於模具行程與頂出機構'],
            ['總循環時間', '2 秒 - 2 分鐘', '薄壁小件 < 5 秒；厚壁大件 > 2 分鐘'],
          ].map((row, i) => (
            <div key={i} className="fadeUp" style={{ animationDelay: `${0.25 + i * 0.08}s`, display: 'contents' }}>
              {row.map((cell, j) => (
                <div key={j} style={{ padding: '14px 24px', borderBottom: `1px solid ${palette.border}`, fontSize: i === 4 ? 22 : 20, fontWeight: i === 4 ? 600 : 400, color: i === 4 ? palette.accent : palette.textSoft }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="fadeUp" style={{ animationDelay: '0.7s', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
          <StatBox value="50-70%" label="冷卻佔循環時間比例" color={palette.amber} />
          <StatBox value="20%" label="全電動機速度提升" color={palette.green} />
          <StatBox value="2s-2min" label="總循環時間範圍" color={palette.cyan} />
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 6: Surface Marks ──────────────────────────────────────────────────
const Ch1Marks: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 140px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Eyebrow delay={0}>一、基本原理</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>成型過程不可避免的表面痕跡</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, minHeight: 0, marginTop: 16 }}>
        {[
          { name: '分模線', en: 'Parting Line', desc: '模具兩半的交界處' },
          { name: '澆口痕', en: 'Gate Mark', desc: '澆口與製品連接處' },
          { name: '流道痕', en: 'Sprue/Runner Mark', desc: '主流道與分流道切除後的痕跡' },
          { name: '頂針痕', en: 'Ejector Pin Mark', desc: '頂針與製品接觸處' },
        ].map((mark, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.2 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 32, fontWeight: 600, color: palette.text }}>{mark.name}</div>
            <div style={{ fontSize: 18, color: palette.accent, fontFamily: font.mono }}>{mark.en}</div>
            <div style={{ fontSize: 22, color: palette.muted }}>{mark.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 7: Chapter 2 - Injection Unit ─────────────────────────────────────
const Ch2InjectionUnit: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>二、主要構造與核心部件</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>射出裝置（Injection Unit）</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, minHeight: 0, marginTop: 12 }}>
        {[
          { title: '料斗', en: 'Hopper', desc: '儲存塑膠顆粒\n重力/強制加料\n預熱與乾燥功能', color: palette.cyan },
          { title: '料筒', en: 'Barrel', desc: '容納螺桿圓柱筒體\n外部纏繞加熱帶\n3-6 區溫控', color: palette.blue },
          { title: '螺桿', en: 'Screw', desc: '三大功能：\n輸送、熔融塑化、射出\n最核心部件', color: palette.green },
          { title: '噴嘴', en: 'Nozzle', desc: '連接料筒與模具\n開放式/針閥式\n獨立加熱器', color: palette.amber },
          { title: '止逆閥', en: 'Check Valve', desc: '防止熔膠回流\n確保射出壓力\n有效傳遞到模具', color: palette.purple },
        ].map((item, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.15 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderTop: `3px solid ${item.color}`, borderRadius: 'var(--osd-radius)', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: palette.text }}>{item.title}</div>
            <div style={{ fontSize: 16, color: item.color, fontFamily: font.mono }}>{item.en}</div>
            <div style={{ fontSize: 18, color: palette.muted, lineHeight: 1.5, whiteSpace: 'pre-line', marginTop: 4 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 8: Screw Design ───────────────────────────────────────────────────
const Ch2Screw: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>二、主要構造</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>螺桿三區設計</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { zone: '進料區', en: 'Feed Zone', func: '接收並向前輸送塑膠顆粒', feature: '螺紋深度深且均一\n溝槽容積最大', color: palette.cyan },
            { zone: '壓縮區', en: 'Compression Zone', func: '壓縮並熔融塑膠', feature: '螺紋深度逐漸變淺\n剪切 + 外部加熱熔化', color: palette.amber },
            { zone: '計量區', en: 'Metering Zone', func: '完成熔融均質化\n定量送往噴嘴', feature: '螺紋深度最淺且固定\n確保穩定輸出', color: palette.green },
          ].map((zone, i) => (
            <div key={i} className="fadeUp" style={{ animationDelay: `${0.2 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 32, fontWeight: 600, color: palette.text }}>{zone.zone}</div>
              <div style={{ fontSize: 18, color: zone.color, fontFamily: font.mono }}>{zone.en}</div>
              <div style={{ fontSize: 20, color: palette.textSoft, marginTop: 8 }}>{zone.func}</div>
              <div style={{ fontSize: 18, color: palette.muted, lineHeight: 1.5, whiteSpace: 'pre-line', marginTop: 4, padding: '12px 16px', background: palette.surfaceHi, borderRadius: 8 }}>{zone.feature}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 8 }}>
          <div className="fadeUp" style={{ animationDelay: '0.5s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '24px 28px' }}>
            <div style={{ fontSize: 20, color: palette.accent, fontFamily: font.mono, marginBottom: 12 }}>長徑比（L:D Ratio）</div>
            <BulletList items={['一般用途：20:1 至 24:1（最常見）', '短螺桿（熱敏感材料）：15:1 至 18:1', '長螺桿（工程塑膠）：25:1 至 30:1', '兩段式排氣螺桿：36:1']} delay={0.5} />
          </div>
          <div className="fadeUp" style={{ animationDelay: '0.6s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '24px 28px' }}>
            <div style={{ fontSize: 20, color: palette.amber, fontFamily: font.mono, marginBottom: 12 }}>壓縮比（Compression Ratio）</div>
            <BulletList items={['低壓縮比 2.0:1：熱敏感材料（PVC、PC）', '中壓縮比 2.5:1：一般用途（PP、PE、PS）', '高壓縮比 3.0:1：結晶性材料（Nylon、POM）']} delay={0.6} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 9: Clamping Unit ──────────────────────────────────────────────────
const Ch2Clamping: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>二、主要構造</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>鎖模裝置（Clamping Unit）</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
          {[
            { title: '三板設計', items: ['固定模板（A板）', '移動模板（B板）', '尾板'] },
            { title: '哥林柱', items: ['導引移動模板滑動', '承受鎖模力拉伸應力', '決定最大模具尺寸'] },
            { title: '無哥林柱設計', items: ['Tie-barless', '更大模具安裝空間', '更佳靈活性'] },
          ].map((item, i) => (
            <div key={i} className="fadeUp" style={{ animationDelay: `${0.2 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 26, fontWeight: 600, color: palette.text }}>{item.title}</div>
              <BulletList items={item.items} delay={0.2 + i * 0.1} />
            </div>
          ))}
        </div>
        <div className="fadeUp" style={{ animationDelay: '0.5s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '24px 28px' }}>
          <div style={{ fontSize: 22, color: palette.accent, fontFamily: font.mono, marginBottom: 16 }}>鎖模機構類型比較</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            {['類型', '機構', '特點'].map((h, i) => (
              <div key={i} style={{ padding: '12px 20px', background: palette.surfaceHi, fontFamily: font.mono, fontSize: 16, fontWeight: 600, color: palette.accent }}>{h}</div>
            ))}
            {[
              ['曲肘式（Toggle）', '連桿機構機械增力', '鎖模速度快、最主流'],
              ['直壓式（Direct Hydraulic）', '液壓缸直接施壓', '精確控制、速度較慢'],
              ['直鎖式（Electric Toggle）', '伺服電機驅動曲肘', '全電動機台標配'],
            ].map((row, i) => (
              <div key={i} className="fadeUp" style={{ animationDelay: `${0.55 + i * 0.08}s`, display: 'contents' }}>
                {row.map((cell, j) => (
                  <div key={j} style={{ padding: '12px 20px', borderBottom: `1px solid ${palette.border}`, fontSize: 18, color: palette.textSoft }}>{cell}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 10: Mold System ───────────────────────────────────────────────────
const Ch2Mold: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Eyebrow delay={0}>二、主要構造</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>模具系統（Mold System）</h2>
      <div className="fadeUp" style={{ animationDelay: '0.2s', background: palette.surfaceHi, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '16px 24px', fontFamily: font.mono, fontSize: 20, color: palette.accent }}>
        噴嘴 → 主流道（Sprue） → 分流道（Runner） → 澆口（Gate） → 模穴（Cavity）
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, minHeight: 0 }}>
        {[
          { name: '主流道 Sprue', desc: '連接噴嘴與分流道的錐形流道' },
          { name: '分流道 Runner', desc: '將熔膠分配到各模穴' },
          { name: '澆口 Gate', desc: '控制射出速度與壓力傳遞' },
          { name: '模穴 Cavity', desc: '賦予製品最終形狀的空腔' },
          { name: '排氣孔 Vent', desc: '排出空氣防止困氣燒焦' },
          { name: '頂出機構 Ejector', desc: '頂針、頂板將成品脫出' },
          { name: '抽芯機構', desc: '側面有孔或倒勾時的側向抽芯' },
          { name: '冷卻水路', desc: '加速製品固化' },
          { name: '導向元件', desc: '導柱與導柱孔確保精確對位' },
        ].map((item, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.25 + i * 0.06}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '18px 20px' }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: palette.text }}>{item.name}</div>
            <div style={{ fontSize: 17, color: palette.muted, marginTop: 6 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 11: Mold Materials ────────────────────────────────────────────────
const Ch2MoldMaterials: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 140px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Eyebrow delay={0}>二、主要構造</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>模具材質與壽命</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, minHeight: 0 }}>
        <div className="fadeUp" style={{ animationDelay: '0.2s', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', overflow: 'hidden' }}>
          {['材質', '硬度', '壽命', '適用場景'].map((h, i) => (
            <div key={i} style={{ padding: '14px 20px', background: palette.surfaceHi, fontFamily: font.mono, fontSize: 16, fontWeight: 600, color: palette.accent }}>{h}</div>
          ))}
          {[
            ['淬硬工具鋼', 'HRC 50-60', '1,000,000+ 件', '大量量產'],
            ['預硬鋼', 'HRC 38-45', '100K-500K 件', '中大量量產'],
            ['鋁合金 7075/2024', '—', '10K-100K+ 件', '原型件、小批量'],
            ['鈹銅合金', '—', '—', '高散熱區域嵌入件'],
          ].map((row, i) => (
            <div key={i} className="fadeUp" style={{ animationDelay: `${0.25 + i * 0.08}s`, display: 'contents' }}>
              {row.map((cell, j) => (
                <div key={j} style={{ padding: '12px 20px', borderBottom: `1px solid ${palette.border}`, fontSize: 18, color: palette.textSoft }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { level: '試模', life: '100-1,000 次', color: palette.muted },
            { level: '量產一般', life: '100K-500K 次', color: palette.green },
            { level: '量產高階', life: '500K-2M 次', color: palette.amber },
            { level: '精密高壽命', life: '>2,000,000 次', color: palette.red },
          ].map((item, i) => (
            <StatBox key={i} value={item.life} label={item.level} color={item.color} delay={0.55 + i * 0.1} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 12: Chapter 3 - Drive Systems ─────────────────────────────────────
const Ch3DriveSystems: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 100px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Eyebrow delay={0}>三、分類與機型</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>按驅動系統分類</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, minHeight: 0 }}>
        {[
          { title: '油壓式', en: 'Hydraulic', pros: ['高鎖模力', '堅固耐用', '適合大型製品', '初始成本低'], cons: ['精度較低', '能耗高', '噪音大', '油洩漏問題'], range: '< 5 - > 9,000 tons', color: palette.amber },
          { title: '全電動式', en: 'All-Electric', pros: ['節能 50-70%', '精度最高', '安靜', '循環快 +20%', '環保清潔'], cons: ['初始成本高 +30-60%', '大噸位受限'], range: '5 - 550 tons', color: palette.green },
          { title: '油電混合式', en: 'Hybrid', pros: ['能源效率接近全電動', '噸位範圍寬', '成本適中', '高精度 + 大噸位'], cons: ['市場仍在成長中'], range: '< 5 - > 3,000 tons', color: palette.blue },
        ].map((type, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.15 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderTop: `4px solid ${type.color}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: palette.text }}>{type.title}</div>
            <div style={{ fontSize: 18, color: type.color, fontFamily: font.mono }}>{type.en}</div>
            <Tag text={`鎖模力: ${type.range}`} color={type.color} />
            <div>
              <div style={{ fontSize: 16, color: palette.green, fontFamily: font.mono, marginBottom: 8 }}>✓ 優點</div>
              <BulletList items={type.pros} delay={0.3 + i * 0.1} color={palette.textSoft} />
            </div>
            <div style={{ marginTop: 4 }}>
              <div style={{ fontSize: 16, color: palette.red, fontFamily: font.mono, marginBottom: 8 }}>✗ 缺點</div>
              <BulletList items={type.cons} delay={0.4 + i * 0.1} color={palette.muted} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 13: Machine Types Comparison ──────────────────────────────────────
const Ch3Comparison: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 100px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>三、分類與機型</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>三種機型綜合比較</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, minHeight: 0 }}>
        <div className="fadeUp" style={{ animationDelay: '0.2s', display: 'grid', gridTemplateColumns: '140px repeat(3, 1fr)', gap: 0, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', overflow: 'hidden' }}>
          {['參數', '油壓式', '全電動式', '油電混合式'].map((h, i) => (
            <div key={i} style={{ padding: '14px 20px', background: palette.surfaceHi, fontFamily: font.mono, fontSize: 16, fontWeight: 600, color: i === 0 ? palette.muted : palette.accent }}>{h}</div>
          ))}
          {[
            ['能源效率', '基準 100%', '節省 50-70%', '接近全電動'],
            ['精度', '較低', '最高（伺服控制）', '高'],
            ['噪音', '較大', '安靜', '中等'],
            ['循環速度', '較慢', '最快（+20%）', '中快'],
            ['噸位範圍', '< 5 - > 9,000t', '5 - 550t', '< 5 - > 3,000t'],
            ['初始成本', '最低', '最高（+30-60%）', '中等'],
            ['維護成本', '較高', '較低', '中等'],
            ['主要市場', '全球（日本除外）', '日本、精密應用', '全球成長中'],
          ].map((row, i) => (
            <div key={i} className="fadeUp" style={{ animationDelay: `${0.25 + i * 0.06}s`, display: 'contents' }}>
              {row.map((cell, j) => (
                <div key={j} style={{ padding: '12px 20px', borderBottom: `1px solid ${palette.border}`, fontSize: 18, color: j === 0 ? palette.muted : palette.textSoft, fontWeight: j === 0 ? 500 : 400 }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 14: Other Classifications ─────────────────────────────────────────
const Ch3OtherTypes: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>三、分類與機型</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>其他分類方式</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, minHeight: 0 }}>
        {[
          { title: '按射出裝置類型', items: [{ name: '螺桿式', desc: '現代主流，1946 年起普及', tag: '主流' }, { name: '柱塞式', desc: '最早形式，目前已極少使用', tag: '淘汰' }, { name: '螺旋式', desc: '塑化與射出的分離', tag: '' }, { name: '微量射出機', desc: '成品重量 < 1 克', tag: '特殊' }] },
          { title: '按機台方向', items: [{ name: '臥式', desc: '最常見，模具水平開合', tag: '主流' }, { name: '立式', desc: '垂直開合，重力輔助嵌件成型', tag: '特殊' }] },
          { title: '按功能分類', items: [{ name: '標準單色機', desc: '單一材料單次射出', tag: '' }, { name: '雙色/多色機', desc: '同一循環射出不同材料或顏色', tag: '進階' }, { name: '嵌件成型機', desc: '金屬嵌件放入模具再射出', tag: '' }, { name: '氣輔射出', desc: '注入氮氣形成中空結構', tag: '' }, { name: '液體矽膠機', desc: 'LSR 專用射出與溫控系統', tag: '特殊' }] },
          { title: '按控制系統', items: [{ name: '閉迴路伺服控制', desc: '現代機台標準配置', tag: '' }, { name: '科學成型', desc: 'RJG Inc. 提出 Decoupled Molding', tag: '精密' }, { name: '機器手臂整合', desc: '自動取出成品、放置嵌件', tag: '' }] },
        ].map((category, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.15 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: palette.text }}>{category.title}</div>
            {category.items.map((item, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 0', borderBottom: j < category.items.length - 1 ? `1px solid ${palette.border}` : 'none' }}>
                <div style={{ fontSize: 20, color: palette.textSoft, flex: 1 }}>{item.name}</div>
                {item.tag && <Tag text={item.tag} color={item.tag === '主流' ? palette.green : palette.amber} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 15: Chapter 4 - Key Parameters ────────────────────────────────────
const Ch4ClampingForce: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 140px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>四、關鍵技術參數</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>鎖模力（Clamping Force）</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, minHeight: 0 }}>
        <div className="fadeUp" style={{ animationDelay: '0.2s', background: palette.surfaceHi, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '20px 28px', fontFamily: font.mono, fontSize: 24, color: palette.accent }}>
          鎖模力 = 製品投影面積 × 射出壓力 × 安全係數
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="fadeUp" style={{ animationDelay: '0.3s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '24px 28px' }}>
            <div style={{ fontSize: 20, color: palette.accent, fontFamily: font.mono, marginBottom: 16 }}>快速估算法</div>
            <BulletList items={['經驗法則：4-5 tons/in²（一般塑膠）', '精確範圍：1.8 - 7.2 tons/cm²', '高流動性材料（PP、PE）→ 較低值', '高黏度/工程塑膠 → 較高值', '薄壁製品 → 需更大鎖模力']} delay={0.3} />
          </div>
          <div className="fadeUp" style={{ animationDelay: '0.4s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '24px 28px' }}>
            <div style={{ fontSize: 20, color: palette.amber, fontFamily: font.mono, marginBottom: 16 }}>範例計算</div>
            <div style={{ fontSize: 22, color: palette.textSoft, lineHeight: 1.8 }}>
              <div>100 × 100 mm 零件</div>
              <div>投影面積 = 1,000 cm²</div>
              <div>PP 材料，模穴壓力 600 kg/cm²</div>
              <div style={{ marginTop: 8, color: palette.accent, fontWeight: 600 }}>鎖模力 = 1,000 × 600 × 1.2 = 720 噸</div>
              <div style={{ color: palette.muted }}>→ 選擇 800-1,000 噸射出機</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { range: '< 50 tons', app: '微型零件、醫療微件', color: palette.cyan },
            { range: '50 - 200 tons', app: '一般消費品、家電零件', color: palette.green },
            { range: '200 - 500 tons', app: '汽車零件、電子外殼', color: palette.blue },
          ].map((item, i) => (
            <StatBox key={i} value={item.range} label={item.app} color={item.color} delay={0.55 + i * 0.1} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 16: Shot Size & Pressure ──────────────────────────────────────────
const Ch4ShotPressure: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 140px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>四、關鍵技術參數</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>射出量與射出壓力</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, minHeight: 0 }}>
        <div className="fadeUp" style={{ animationDelay: '0.2s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: palette.text }}>射出量（Shot Size）</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <StatBox value="~4g" label="最小射出量" color={palette.cyan} delay={0.3} />
            <StatBox value="14g-25kg" label="一般範圍" color={palette.blue} delay={0.4} />
          </div>
          <div style={{ background: `${palette.amber}10`, border: `1px solid ${palette.amber}30`, borderRadius: 8, padding: '16px 20px', fontSize: 20, color: palette.amber }}>注意：實際射出量應為最大射出量的 20-80%</div>
        </div>
        <div className="fadeUp" style={{ animationDelay: '0.3s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: palette.text }}>射出壓力（Injection Pressure）</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <StatBox value="10-30K" label="PSI（一般熱塑性）" color={palette.green} delay={0.4} />
            <StatBox value="20-35K+" label="PSI（工程塑膠）" color={palette.red} delay={0.5} />
          </div>
          <BulletList items={['保壓壓力：射出壓力的 50-80%', '模穴壓力：通常低於射出壓力', '薄壁製品需高射出速率']} delay={0.5} />
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 17: Chapter 5 - Global Market ─────────────────────────────────────
const Ch5GlobalMarket: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 140px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>五、全球與台灣主要製造商</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>全球市場結構</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          <StatBox value="$100-120B" label="2024 全球市場規模" color={palette.cyan} delay={0.2} />
          <StatBox value="$140-160B" label="2030 預估市場規模" color={palette.green} delay={0.3} />
          <StatBox value="3.5-5%" label="年複合成長率 CAGR" color={palette.amber} delay={0.4} />
        </div>
        <div className="fadeUp" style={{ animationDelay: '0.5s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '24px 28px' }}>
          <div style={{ fontSize: 22, color: palette.accent, fontFamily: font.mono, marginBottom: 16 }}>區域市場格局</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            {['區域', '全球佔比', '特徵'].map((h, i) => (
              <div key={i} style={{ padding: '12px 16px', background: palette.surfaceHi, fontFamily: font.mono, fontSize: 16, fontWeight: 600, color: palette.accent }}>{h}</div>
            ))}
            {[
              ['中國大陸', '35-40%', '全球最大市場，海天佔 60%'],
              ['歐洲', '20-25%', '高階技術，Engel/KM/Arburg'],
              ['日本', '15-18%', '精密穩定，JSW/Shibaura'],
              ['東南亞/印度', '成長最快', 'CAGR 6-8%，性價比機種'],
              ['台灣', '5-7%', '技術層次高，出口 >70%'],
              ['美洲', '10-12%', '汽車與包裝應用為主'],
            ].map((row, i) => (
              <div key={i} className="fadeUp" style={{ animationDelay: `${0.55 + i * 0.06}s`, display: 'contents' }}>
                {row.map((cell, j) => (
                  <div key={j} style={{ padding: '10px 16px', borderBottom: `1px solid ${palette.border}`, fontSize: 18, color: j === 0 ? palette.text : palette.textSoft, fontWeight: j === 0 ? 500 : 400 }}>{cell}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 18: Top Manufacturers ─────────────────────────────────────────────
const Ch5TopMakers: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>五、全球與台灣主要製造商</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>全球市佔率 TOP 10</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 120px 100px', gap: 0 }}>
          {['#', '製造商', '國家', '市佔率'].map((h, i) => (
            <div key={i} style={{ padding: '12px 16px', background: palette.surfaceHi, fontFamily: font.mono, fontSize: 16, fontWeight: 600, color: palette.accent }}>{h}</div>
          ))}
          {[
            ['1', '海天國際 Haitian', '中國大陸', '15-18%'],
            ['2', 'Engel 恩格爾', '奧地利', '8-10%'],
            ['3', 'KraussMaffei', '德國', '6-8%'],
            ['4', 'Arburg 阿爾堡', '德國', '5-7%'],
            ['5', '震雄集團 Chen Hsong', '香港', '4-5%'],
            ['6', 'JSW 日本製鋼所', '日本', '3-4%'],
            ['7', 'Shibaura Machine', '日本', '3-4%'],
            ['8', '富強鑫 FCS', '台灣', '2-3%'],
            ['9', 'Victor 勝鴻機械', '台灣', '1.5-2%'],
            ['10', 'UBE Machinery', '日本', '1.5-2%'],
          ].map((row, i) => (
            <div key={i} className="fadeUp" style={{ animationDelay: `${0.2 + i * 0.05}s`, display: 'contents' }}>
              {row.map((cell, j) => (
                <div key={j} style={{ padding: '10px 16px', borderBottom: `1px solid ${palette.border}`, fontSize: 18, color: j === 0 ? palette.accent : j === 3 ? palette.green : palette.textSoft, fontWeight: j === 0 ? 700 : j === 3 ? 600 : 400 }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 19: European Makers ───────────────────────────────────────────────
const Ch5European: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 100px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Eyebrow delay={0}>五、製造商</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>歐洲製造商</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, minHeight: 0 }}>
        {[
          { name: 'Engel', country: '奧地利 · 1945', revenue: '18-20 億歐元', series: 'e-mac（全電動）、duo（大型二板機）、victory', highlight: '全電動技術領先，inject 4.0 智能平台', color: palette.cyan },
          { name: 'KraussMaffei', country: '德國 · 1838', revenue: '7-9 億歐元', series: 'PX（全電動）、CX（大型二板）、MX（多組分）', highlight: 'APIC 自適應控制，ColorForm 表面塗裝技術', color: palette.blue },
          { name: 'Arburg', country: '德國 · 1923', revenue: '9.5 億歐元', series: 'ALLROUNDER A/S/M/K、freeformer', highlight: '家族企業，GESTICA AI 控制，微型射出領先', color: palette.green },
        ].map((maker, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.15 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderTop: `4px solid ${maker.color}`, borderRadius: 'var(--osd-radius)', padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: palette.text }}>{maker.name}</div>
            <div style={{ fontSize: 18, color: maker.color, fontFamily: font.mono }}>{maker.country}</div>
            <Tag text={`年營收: ${maker.revenue}`} color={maker.color} />
            <div style={{ fontSize: 18, color: palette.textSoft, lineHeight: 1.5 }}><strong style={{ color: palette.muted }}>系列：</strong>{maker.series}</div>
            <div style={{ fontSize: 18, color: palette.accentSoft, padding: '12px 16px', background: `${maker.color}10`, borderRadius: 8, marginTop: 4 }}>{maker.highlight}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 20: Japan & Taiwan Makers ─────────────────────────────────────────
const Ch5JapanTaiwan: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 100px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Eyebrow delay={0}>五、製造商</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>日本與台灣製造商</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, minHeight: 0 }}>
        {[
          { region: '日本', makers: [{ name: 'JSW', highlight: '光學鏡片成型王者，市佔 >60%', color: palette.cyan }, { name: 'Shibaura Machine', highlight: '全電動技術成熟，立式嵌件成型優勢', color: palette.blue }, { name: 'UBE Machinery', highlight: '大型機技術突出，DIRECT NAVI 智能控制', color: palette.green }] },
          { region: '台灣', makers: [{ name: '富強鑫 FCS', highlight: '台灣第一，雙色/三色成型最強', color: palette.amber }, { name: 'Victor 勝鴻', highlight: '70 年歷史，立式射出機領先', color: palette.purple }, { name: 'Kinco 震雄', highlight: '全電動/伺服油壓/多色/立式', color: palette.red }] },
        ].map((region, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.15 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: palette.text }}>{region.region}</div>
            {region.makers.map((maker, j) => (
              <div key={j} className="fadeUp" style={{ animationDelay: `${0.25 + i * 0.1 + j * 0.08}s`, background: palette.surfaceHi, border: `1px solid ${palette.border}`, borderRadius: 8, padding: '16px 20px' }}>
                <div style={{ fontSize: 24, fontWeight: 600, color: maker.color }}>{maker.name}</div>
                <div style={{ fontSize: 18, color: palette.textSoft, marginTop: 6 }}>{maker.highlight}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 21: Chapter 6 - Automotive ────────────────────────────────────────
const Ch6Automotive: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>六、應用產業</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>汽車工業（30-35% 產值）</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { category: '內飾件', parts: '儀表板、門板、中控台', material: 'PP、ABS、PC/ABS', tons: '500-2,000t' },
            { category: '外飾件', parts: '保險桿、車燈殼、格柵', material: 'PP-EPDM、PC、ASA', tons: '1,000-4,000t' },
            { category: '引擎室零件', parts: '進氣歧管、散熱風扇', material: 'PA6/PA66、PPS、PBT', tons: '200-1,500t' },
            { category: 'EV 專用零件', parts: '電池模組外殼、充電插座', material: 'PPS-GF、PEEK、PA66-GF30', tons: '500-3,000t' },
            { category: '電子電氣', parts: 'ECU 外殼、連接器', material: 'PA66-GF、PBT、LCP', tons: '50-500t' },
            { category: '照明零件', parts: '車燈透鏡、反射鏡', material: 'PC、PMMA、LSR', tons: '200-1,500t' },
          ].map((item, i) => (
            <div key={i} className="fadeUp" style={{ animationDelay: `${0.2 + i * 0.08}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: palette.text }}>{item.category}</div>
              <div style={{ fontSize: 17, color: palette.textSoft }}>{item.parts}</div>
              <div style={{ fontSize: 16, color: palette.muted, fontFamily: font.mono }}>{item.material}</div>
              <Tag text={item.tons} color={palette.accent} />
            </div>
          ))}
        </div>
        <div className="fadeUp" style={{ animationDelay: '0.7s', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { label: '汽車輕量化', desc: '每減重 100kg 降 3-6% 油耗' },
            { label: '電動車 EV', desc: '大量新射出零件需求' },
            { label: '多物料成型', desc: '車燈、密封件應用' },
            { label: '纖維強化塑膠', desc: 'FRP/CFRP 替代金屬' },
          ].map((trend, i) => (
            <div key={i} style={{ background: `${palette.cyan}10`, border: `1px solid ${palette.cyan}30`, borderRadius: 8, padding: '14px 18px' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: palette.accent }}>{trend.label}</div>
              <div style={{ fontSize: 16, color: palette.muted, marginTop: 4 }}>{trend.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 22: 3C Electronics ────────────────────────────────────────────────
const Ch63C: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>六、應用產業</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>3C 電子（20-25% 產值）</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, minHeight: 0 }}>
        {[
          { category: '外殼結構件', parts: '手機外殼、平板背蓋、筆電蓋', material: 'PC、PC/ABS、PA', req: '高精密全電動' },
          { category: '連接器', parts: 'USB-C、FPC、板對板連接器', material: 'LCP、PA46、PPS', req: '微型精密 30-150t' },
          { category: '光學元件', parts: '手機鏡頭、導光板、擴散板', material: '光學級 PC、PMMA、COC', req: 'JSW 專用機' },
          { category: '聲學元件', parts: '揚聲器振膜、耳機外殼', material: 'LSR、PC、POM', req: '微型/雙色' },
          { category: '按鍵/觸控', parts: '矽膠按鍵、Touch Ring', material: 'LSR、POM、PC', req: '微型/雙色' },
          { category: '散熱元件', parts: '散熱風扇葉片、熱管固定座', material: 'PBT-GF、PPS、LCP', req: '高速成型' },
        ].map((item, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.2 + i * 0.08}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: palette.text }}>{item.category}</div>
            <div style={{ fontSize: 17, color: palette.textSoft }}>{item.parts}</div>
            <div style={{ fontSize: 16, color: palette.muted, fontFamily: font.mono }}>{item.material}</div>
            <Tag text={item.req} color={palette.green} />
          </div>
        ))}
      </div>
      <div className="fadeUp" style={{ animationDelay: '0.7s', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: '薄壁成型', desc: '壁厚 0.4-0.6mm' },
          { label: '高外觀要求', desc: '無熔接痕、縮水' },
          { label: '尺寸精度', desc: 'Pitch 0.3mm, ±0.01mm' },
          { label: '無塵室生產', desc: 'Class 1,000-10,000' },
        ].map((req, i) => (
          <div key={i} style={{ background: `${palette.green}10`, border: `1px solid ${palette.green}30`, borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: palette.green }}>{req.label}</div>
            <div style={{ fontSize: 16, color: palette.muted, marginTop: 4 }}>{req.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 23: Medical & Packaging ───────────────────────────────────────────
const Ch6MedicalPkg: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Eyebrow delay={0}>六、應用產業</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>醫療器材與包裝產業</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, minHeight: 0 }}>
        <div className="fadeUp" style={{ animationDelay: '0.2s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: palette.text }}>醫療器材 <span style={{ fontSize: 20, color: palette.muted }}>(8-12% 產值)</span></div>
          <BulletList items={['一次性用品：針筒、輸液套件（64-128 穴）', '診斷器材：試管、微孔板、檢測卡殼', '手術器械：PEEK、PEI 超精密全電動', '植入物：骨釘、關節組件（GMP 認證）']} delay={0.25} />
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 16, color: palette.amber, fontFamily: font.mono, marginBottom: 8 }}>法規要求</div>
            <BulletList items={['ISO 13485', 'US FDA 21 CFR Part 820', 'EU MDR', '無塵室 ISO Class 7-8']} delay={0.4} color={palette.amber} />
          </div>
        </div>
        <div className="fadeUp" style={{ animationDelay: '0.3s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: palette.text }}>包裝產業 <span style={{ fontSize: 20, color: palette.muted }}>(20-25% 產值)</span></div>
          <BulletList items={['瓶蓋/封蓋：高速多穴 32-96 穴，循環 2-4 秒', '食品容器：薄壁高速 0.3-0.5mm', '化妝品包裝：高外觀，雙色/電鍍', '工業包裝：托盤、桶蓋，1,000+ 噸']} delay={0.35} />
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 16, color: palette.green, fontFamily: font.mono, marginBottom: 8 }}>技術特點</div>
            <BulletList items={['壓縮封蓋成型節能 50%', '大穴數模具 48-128 穴', '食品接觸認證 FDA/EU']} delay={0.5} color={palette.green} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 24: Chapter 7 - Industry 4.0 ──────────────────────────────────────
const Ch7Industry40: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>七、近年技術趨勢</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>工業 4.0 / 智慧製造</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, minHeight: 0 }}>
        {[
          { title: 'IoT 感測與數據採集', items: ['機台內建溫度/壓力/位置感測器', '模內感測器 cavity pressure', 'OPC-UA / Euromap 82 協議', 'MQTT 雲端數據傳輸'], color: palette.cyan },
          { title: '數位孿生 Digital Twin', items: ['Moldex3D / Moldflow 模擬', '澆口優化、冷卻分析、翹曲預測', '縮短試模時間 30-50%', '降低模具修改成本'], color: palette.blue },
          { title: 'MES 整合', items: ['即時追蹤：產量、良率、OEE、能耗', 'SPC 統計製程管制報告', '完整生產追溯 Traceability', '原料批號 → 參數 → 品檢'], color: palette.green },
          { title: 'OEE 與預測性維護', items: ['OEE 目標 >85%', 'AI 分析震動/溫度/電流', '預測螺桿磨損、油封老化', '減少非計畫停機 30-50%'], color: palette.amber },
        ].map((item, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.15 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: item.color }}>{item.title}</div>
            <BulletList items={item.items} delay={0.2 + i * 0.1} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 25: AI Molding ────────────────────────────────────────────────────
const Ch7AI: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 140px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>七、技術趨勢</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>AI 智慧成型</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, minHeight: 0 }}>
        {[
          { title: 'AI 成型優化', desc: '自適應控制根據模內感測器回饋自動調整射出速度、保壓壓力', examples: 'KraussMaffei APIC\nEngel iQ weight control', color: palette.cyan },
          { title: 'AI 品檢', desc: 'AOI 機器視覺自動偵測缺點，AI 深度學習識別缺陷', examples: '短射、毛刺、縮水\n熔接痕、氣泡\n速度 <0.5s, 準確率 >99.5%', color: palette.green },
          { title: 'AI 參數自動調優', desc: '機器學習根據歷史數據自動建議最佳參數組合', examples: '減少試模次數\n縮短調機時間 40-60%', color: palette.amber },
        ].map((item, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.15 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderTop: `4px solid ${item.color}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: palette.text }}>{item.title}</div>
            <div style={{ fontSize: 20, color: palette.textSoft, lineHeight: 1.5 }}>{item.desc}</div>
            <div style={{ fontSize: 18, color: item.color, fontFamily: font.mono, lineHeight: 1.5, whiteSpace: 'pre-line', padding: '14px 18px', background: palette.surfaceHi, borderRadius: 8, marginTop: 4 }}>{item.examples}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 26: Micro & Multi-Material ────────────────────────────────────────
const Ch7MicroMulti: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>七、技術趨勢</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>微型射出與多物料成型</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, minHeight: 0 }}>
        <div className="fadeUp" style={{ animationDelay: '0.2s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: palette.text }}>微型射出成型</div>
            <div style={{ fontSize: 20, color: palette.muted }}>零件重量 {'<'}1g，特徵尺寸 {'<'}0.5mm</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
            {['參數', '微型射出', '一般射出'].map((h, i) => (
              <div key={i} style={{ padding: '10px 14px', background: palette.surfaceHi, fontFamily: font.mono, fontSize: 14, fontWeight: 600, color: palette.accent }}>{h}</div>
            ))}
            {[['射出量', '0.01-5g', '10-10,000g'], ['射出速度', '500-1,000mm/s', '50-300mm/s'], ['射出精度', '±0.01mm', '±0.05-0.1mm'], ['溫度控制', '±0.5°C', '±2-5°C']].map((row, i) => (
              <div key={i} className="fadeUp" style={{ animationDelay: `${0.3 + i * 0.06}s`, display: 'contents' }}>
                {row.map((cell, j) => (
                  <div key={j} style={{ padding: '8px 14px', borderBottom: `1px solid ${palette.border}`, fontSize: 16, color: j === 0 ? palette.muted : j === 1 ? palette.cyan : palette.textSoft, fontWeight: j === 1 ? 600 : 400 }}>{cell}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 18, color: palette.textSoft }}><strong style={{ color: palette.muted }}>代表機台：</strong>BABYPLAST、Arburg、Engel e-mac 50、JSW J-ELII 30</div>
        </div>
        <div className="fadeUp" style={{ animationDelay: '0.3s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: palette.text }}>多物料射出成型</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[['雙色成型', 'Two-shot', '車燈透鏡、雙色按鍵'], ['包覆成型', 'Overmolding', '手機外殼、工具握把'], ['嵌件成型', 'Insert Molding', '螺絲埋入、連接器'], ['三色成型', 'Three-color', '多色車燈、裝飾件'], ['三明治成型', 'Sandwich', '回收料芯層 + 新料皮層'], ['LSR 成型', 'LSR Molding', '醫療密封、防水圈']].map((row, i) => (
              <div key={i} className="fadeUp" style={{ animationDelay: `${0.35 + i * 0.06}s`, background: palette.surfaceHi, border: `1px solid ${palette.border}`, borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: palette.text }}>{row[0]}</div>
                <div style={{ fontSize: 14, color: palette.accent, fontFamily: font.mono }}>{row[1]}</div>
                <div style={{ fontSize: 15, color: palette.muted, marginTop: 4 }}>{row[2]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 27: Sustainability ────────────────────────────────────────────────
const Ch7Sustainability: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>七、技術趨勢</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>環保與永續</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, minHeight: 0 }}>
        {[
          { title: '回收材料射出', items: ['rPET 來自寶特瓶回收', 'rPP/rPE 來自塑膠袋回收', '鏈延長劑提升分子量', 'Virgin:Regrind = 80:20 至 50:50'], color: palette.green },
          { title: '生物可分解塑膠', items: ['PLA 來自玉米澱粉', 'PHA 微生物發酵', 'PBAT 提升韌性', 'Negri Bossi Canbio 系列'], color: palette.cyan },
          { title: '能源效率提升', items: ['全電動節能 50-70%', '升級增加產量 20%', '模溫機節能', '冷水塔水循環利用'], color: palette.amber },
          { title: '循環經濟設計', items: ['單材設計 Monomaterial', '自動回收 20-50% 回填', '填埋廢料 <1%', '標示塑膠材質代碼'], color: palette.blue },
        ].map((item, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.15 + i * 0.1}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderTop: `4px solid ${item.color}`, borderRadius: 'var(--osd-radius)', padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: item.color }}>{item.title}</div>
            <BulletList items={item.items} delay={0.2 + i * 0.1} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 28: Chapter 8 - Mold Design ───────────────────────────────────────
const Ch8MoldDesign: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>八、模具設計基礎</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>模具基本結構</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, minHeight: 0 }}>
        <div className="fadeUp" style={{ animationDelay: '0.2s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: palette.cyan }}>定模 / 母模（A-Side）</div>
          <BulletList items={['定位環 Locating Ring', '澆口套 Sprue Bushing', '流道系統 Runner System', '冷卻水路 Cooling Channels', '模穴 Cavity — 成型產品外形']} delay={0.25} />
        </div>
        <div className="fadeUp" style={{ animationDelay: '0.3s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: palette.blue }}>動模 / 公模（B-Side）</div>
          <BulletList items={['模芯 Core — 成型產品內部結構', '頂出機構 Ejection System', '冷卻水路 Cooling Channels', '導柱/導套 Guide Pins/Bushings']} delay={0.35} />
        </div>
      </div>
      <div className="fadeUp" style={{ animationDelay: '0.5s', background: palette.surfaceHi, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '16px 24px', fontFamily: font.mono, fontSize: 20, color: palette.accent, textAlign: 'center' }}>
        ───────────────── 分模面 Parting Line ─────────────────
      </div>
    </div>
  </div>
);

// ─── Slide 29: Gate Design ───────────────────────────────────────────────────
const Ch8Gate: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 100px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Eyebrow delay={0}>八、模具設計</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>澆口設計（Gate Design）</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, minHeight: 0 }}>
        {[
          { name: '直澆口', en: 'Direct Gate', desc: '壓力損失最小\n大型件、單穴模具' },
          { name: '邊澆口', en: 'Edge Gate', desc: '分模面邊緣進入\n一般零件' },
          { name: '薄膜澆口', en: 'Film Gate', desc: '寬而薄均勻充填\n平板件、薄壁件' },
          { name: '扇形澆口', en: 'Fan Gate', desc: '由窄變寬呈扇形\n大面積平板' },
          { name: '潛伏式澆口', en: 'Submarine Gate', desc: '分模面以下潛入\n自動脫澆口' },
          { name: '點澆口', en: 'Pin-point Gate', desc: '極小 Ø0.3-2mm\n多穴、外觀要求高' },
          { name: '針閥澆口', en: 'Valve Gate', desc: '機械銷控制開閉\n多穴精密件' },
          { name: '熱澆口', en: 'Thermal Gate', desc: '保持高溫凍結封閉\n熱流道系統' },
        ].map((gate, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.15 + i * 0.06}s`, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: palette.text }}>{gate.name}</div>
            <div style={{ fontSize: 14, color: palette.accent, fontFamily: font.mono }}>{gate.en}</div>
            <div style={{ fontSize: 16, color: palette.muted, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{gate.desc}</div>
          </div>
        ))}
      </div>
      <div className="fadeUp" style={{ animationDelay: '0.65s', background: `${palette.accent}10`, border: `1px solid ${palette.accent}30`, borderRadius: 8, padding: '14px 20px', fontSize: 18, color: palette.accentSoft }}>
        澆口厚度約為零件壁厚的 40-60%，寬度為厚度的 2-3 倍
      </div>
    </div>
  </div>
);

// ─── Slide 30: Runner & Cooling ──────────────────────────────────────────────
const Ch8RunnerCooling: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Eyebrow delay={0}>八、模具設計</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>流道系統與冷卻系統</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, minHeight: 0 }}>
        <div className="fadeUp" style={{ animationDelay: '0.2s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: palette.text }}>流道系統 Runner System</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: palette.surfaceHi, borderRadius: 8, padding: '16px' }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: palette.amber }}>冷流道 Cold Runner</div>
              <BulletList items={['模具成本低、結構簡單', '換色/換料容易', '產生流道廢料 20-40%', '需分離、粉碎、回收']} delay={0.3} />
            </div>
            <div style={{ background: palette.surfaceHi, borderRadius: 8, padding: '16px' }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: palette.green }}>熱流道 Hot Runner</div>
              <BulletList items={['節省材料 10-30%', '縮短循環 5-20%', '適合全自動化生產', '成本 $1,500-5,000/穴']} delay={0.4} />
            </div>
          </div>
        </div>
        <div className="fadeUp" style={{ animationDelay: '0.3s', background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 'var(--osd-radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: palette.text }}>冷卻系統 Cooling System</div>
          <div style={{ fontSize: 20, color: palette.amber }}>冷卻時間佔循環 50-70%</div>
          <BulletList items={['傳統水路：管徑 Ø6-12mm，間距管徑 2-3 倍', '共形冷卻：3D 列印，縮短循環 20-40%', '冷水機 5-30°C / 模溫機 30-200°C', 'RHCM 急冷急熱消除熔接痕']} delay={0.35} />
        </div>
      </div>
    </div>
  </div>
);

// ─── Slide 31: Terminology ───────────────────────────────────────────────────
const Terminology: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '100px 100px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Eyebrow delay={0}>九、產業術語對照</Eyebrow>
      <h2 className="fadeUp" style={{ marginTop: 12, marginBottom: 0, fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', animationDelay: '0.1s' }}>中英日術語對照表</h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, minHeight: 0 }}>
        {['中文', 'English', '日本語'].map((h, i) => (
          <div key={i} style={{ padding: '12px 16px', background: palette.surfaceHi, fontFamily: font.mono, fontSize: 16, fontWeight: 600, color: palette.accent }}>{h}</div>
        ))}
        {[
          ['射出成型機', 'Injection Molding Machine', '射出成形機'],
          ['鎖模力', 'Clamping Force / Tonnage', '型締力'],
          ['射出量', 'Shot Size / Capacity', '射出量'],
          ['射出壓力', 'Injection Pressure', '射出圧力'],
          ['螺桿', 'Screw', 'スクリュー'],
          ['料筒', 'Barrel', 'シリンダー'],
          ['噴嘴', 'Nozzle', 'ノズル'],
          ['模具', 'Mold / Die', '金型'],
          ['模穴', 'Cavity', 'キャビティ'],
          ['澆口', 'Gate', 'ゲート'],
          ['分流道', 'Runner', 'ランナー'],
          ['頂出', 'Ejection', '突き出し'],
          ['哥林柱', 'Tie Bar', 'タイバー'],
          ['模板', 'Platen', 'プラテン'],
          ['保壓', 'Holding / Packing', '保圧'],
          ['塑化', 'Plasticizing', '可塑化'],
          ['溢邊', 'Flash', 'バリ'],
          ['週期時間', 'Cycle Time', 'サイクルタイム'],
        ].map((row, i) => (
          <div key={i} className="fadeUp" style={{ animationDelay: `${0.15 + i * 0.04}s`, display: 'contents' }}>
            {row.map((cell, j) => (
              <div key={j} style={{ padding: '8px 16px', borderBottom: `1px solid ${palette.border}`, fontSize: 17, color: j === 0 ? palette.text : j === 1 ? palette.textSoft : palette.muted, fontWeight: j === 0 ? 500 : 400 }}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Slide 32: Q&A / Thank You ───────────────────────────────────────────────
const ThankYou: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div style={{ position: 'absolute', inset: 0, padding: '120px 140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 32 }}>
      <h1 className="fadeUp" style={{ fontFamily: 'var(--osd-font-display)', fontSize: 120, lineHeight: 1.05, fontWeight: 700, margin: 0, letterSpacing: '-0.04em', animationDelay: '0.15s', textAlign: 'center' }}>
        Thank You
      </h1>
      <p className="fadeUp" style={{ fontSize: 32, color: palette.textSoft, animationDelay: '0.35s', textAlign: 'center' }}>
        Q&A
      </p>
      <div className="fadeUp" style={{ animationDelay: '0.55s', display: 'flex', gap: 24, fontFamily: font.mono, fontSize: 18, color: palette.muted }}>
        <span>塑膠射出成型機技術研究報告</span>
        <span>·</span>
        <span>2026-06-02</span>
      </div>
    </div>
  </div>
);

export default [
  Cover,
  TOC,
  Ch1Overview,
  Ch1Cycle,
  Ch1CycleTime,
  Ch1Marks,
  Ch2InjectionUnit,
  Ch2Screw,
  Ch2Clamping,
  Ch2Mold,
  Ch2MoldMaterials,
  Ch3DriveSystems,
  Ch3Comparison,
  Ch3OtherTypes,
  Ch4ClampingForce,
  Ch4ShotPressure,
  Ch5GlobalMarket,
  Ch5TopMakers,
  Ch5European,
  Ch5JapanTaiwan,
  Ch6Automotive,
  Ch63C,
  Ch6MedicalPkg,
  Ch7Industry40,
  Ch7AI,
  Ch7MicroMulti,
  Ch7Sustainability,
  Ch8MoldDesign,
  Ch8Gate,
  Ch8RunnerCooling,
  Terminology,
  ThankYou,
];
