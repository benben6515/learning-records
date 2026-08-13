import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';

import openclawBg from './assets/openclaw.png';

export const design: DesignSystem = {
  palette: {
    bg: '#0e1117',
    text: '#e8eaed',
    accent: '#e0a458',
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
  bg: '#0e1117',
  text: '#e8eaed',
  accent: '#e0a458',
  surface: '#151921',
  surfaceHi: '#1c212b',
  surfaceMax: '#242a35',
  textSoft: '#b8bfca',
  muted: '#6b7280',
  dim: '#374151',
  border: 'rgba(255,255,255,0.08)',
  borderBright: 'rgba(255,255,255,0.15)',
  amber: '#e0a458',
  terracotta: '#d97757',
  teal: '#5eb3a8',
  cream: '#e8dcc4',
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
        'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
      backgroundSize: '88px 88px',
      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
    }}
  />
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

const SectionCard = ({
  number,
  title,
  subtitle,
  emoji,
  delay = 0,
}: {
  number: string;
  title: string;
  subtitle: string;
  emoji: string;
  delay?: number;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '26px 30px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    }}
  >
    <div
      style={{
        width: 54,
        height: 54,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${palette.amber}, ${palette.terracotta})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 26,
        flexShrink: 0,
      }}
    >
      {emoji}
    </div>
    <div>
      <div style={{ fontSize: 27, fontWeight: 600, color: palette.text, letterSpacing: '-0.02em' }}>
        {title}
      </div>
      <div style={{ fontSize: 19, color: palette.muted, marginTop: 4, fontFamily: font.mono }}>
        {number} · {subtitle}
      </div>
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
          gap: 16,
          alignItems: 'flex-start',
          fontSize: 30,
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
      padding: '5px 12px',
      borderRadius: 6,
      fontWeight: 500,
      display: 'inline-block',
    }}
  >
    {text}
  </span>
);

const UrlChip = ({ label, url, delay = 0 }: { label: string; url: string; delay?: number }) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '20px 28px',
    }}
  >
    <span style={{ fontSize: 22, color: palette.textSoft }}>{label}</span>
    <span
      style={{
        fontFamily: font.mono,
        fontSize: 24,
        color: palette.teal,
        background: `${palette.teal}14`,
        padding: '6px 14px',
        borderRadius: 8,
      }}
    >
      {url}
    </span>
  </div>
);

// ─── Slide 1: Cover ───────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div style={fill}>
    <Styles />
    {/* Background image with dark overlay */}
    <img
      src={openclawBg}
      alt=""
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.28,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse at 25% 35%, rgba(224,164,88,0.10), transparent 55%), linear-gradient(180deg, rgba(14,17,23,0.55) 0%, rgba(14,17,23,0.92) 100%)',
      }}
    />
    <GridBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '120px 140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Eyebrow delay={0.05}>OpenClaw · 簡報</Eyebrow>
        <div className="fadeUp" style={{ animationDelay: '0.05s' }}>
          <Tag text="2026" />
        </div>
      </div>
      <div>
        <h1
          className="fadeUp"
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            lineHeight: 1.02,
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.045em',
            animationDelay: '0.15s',
          }}
        >
          OpenClaw
        </h1>
        <p
          className="fadeUp"
          style={{
            marginTop: 36,
            maxWidth: 900,
            fontSize: 44,
            lineHeight: 1.3,
            color: palette.textSoft,
            animationDelay: '0.35s',
          }}
        >
          <span style={{ color: palette.accent }}>「有靈魂」</span>
          的個人助理
        </p>
      </div>
      <div
        className="fadeUp"
        style={{
          animationDelay: '0.55s',
          fontFamily: font.mono,
          fontSize: 18,
          color: palette.muted,
        }}
      >
        openclaw.ai
      </div>
    </div>
  </div>
);

// ─── Slide 2: Agenda ──────────────────────────────────────────────────────────
const Agenda: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '90px 120px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <Eyebrow delay={0}>目錄</Eyebrow>
      <h2
        className="fadeUp"
        style={{
          marginTop: 4,
          marginBottom: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 68,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          animationDelay: '0.1s',
        }}
      >
        Agenda
      </h2>
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          minHeight: 0,
          marginTop: 8,
        }}
      >
        <SectionCard number="01" title="Getting Started" subtitle="Web UI" emoji="🚧" delay={0.15} />
        <SectionCard number="02" title="Soul 與設定檔" subtitle="Config" emoji="👻" delay={0.21} />
        <SectionCard number="03" title="Cron Job" subtitle="Automation" emoji="🔃" delay={0.27} />
        <SectionCard number="04" title="安全第一" subtitle="Security" emoji="🛡️" delay={0.33} />
        <SectionCard number="05" title="我的 OpenClaw 案例" subtitle="Case Study" emoji="💡" delay={0.39} />
        <SectionCard number="06" title="感謝 & Q&A" subtitle="Closing" emoji="💬" delay={0.45} />
      </div>
    </div>
  </div>
);

// ─── Slide 3: Getting Started ─────────────────────────────────────────────────
const GettingStarted: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 140px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <Eyebrow delay={0}>一、入門</Eyebrow>
      <h2
        className="fadeUp"
        style={{
          marginTop: 4,
          marginBottom: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          animationDelay: '0.1s',
        }}
      >
        🚧 Getting Started <span style={{ color: palette.muted }}>(Web UI)</span>
      </h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
        <BulletList
          items={['安裝與設定', 'OpenClaw Web UI 簡介', 'Dashboard 初體驗']}
          delay={0.2}
        />
        <UrlChip label="官方網站" url="https://openclaw.ai/" delay={0.55} />
      </div>
    </div>
  </div>
);

// ─── Slide 4: Soul & Config ───────────────────────────────────────────────────
const Soul: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 140px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <Eyebrow delay={0}>二、設定</Eyebrow>
      <h2
        className="fadeUp"
        style={{
          marginTop: 4,
          marginBottom: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          animationDelay: '0.1s',
        }}
      >
        👻 Soul 與其他設定檔
      </h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
        <BulletList items={['了解 soul 設定 — 決定助理的「靈魂」', '關鍵設定檔說明']} delay={0.2} />
        <UrlChip
          label="範本參考"
          url="docs.openclaw.ai/.../SOUL"
          delay={0.45}
        />
      </div>
    </div>
  </div>
);

// ─── Slide 5: Cron Job ────────────────────────────────────────────────────────
const Cron: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '90px 140px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <Eyebrow delay={0}>三、自動化</Eyebrow>
      <h2
        className="fadeUp"
        style={{
          marginTop: 4,
          marginBottom: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          animationDelay: '0.1s',
        }}
      >
        🔃 Cron Job
      </h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 36, marginTop: 12 }}>
        <BulletList
          items={[
            '設定排程任務',
            'Cron 語法基礎',
            '自動化工作流程',
            '監控與除錯 cron jobs',
            '太麻煩了（直接請 OpenClaw 幫忙）',
          ]}
          delay={0.2}
        />
      </div>
    </div>
  </div>
);

// ─── Slide 6: Security ────────────────────────────────────────────────────────
const Security: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 140px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <Eyebrow delay={0} color={palette.terracotta}>
        四、安全
      </Eyebrow>
      <h2
        className="fadeUp"
        style={{
          marginTop: 4,
          marginBottom: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          animationDelay: '0.1s',
        }}
      >
        🛡️ 安全第一
      </h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
        <BulletList
          items={[
            '要知道哪些資料是敏感的',
            '隔離環境（Docker | Mac mini）',
            '不要怕 Terminal，甚至要跟它當好朋友',
          ]}
          delay={0.2}
        />
      </div>
    </div>
  </div>
);

// ─── Slide 7: Case Study ──────────────────────────────────────────────────────
const CaseStudy: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 140px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <Eyebrow delay={0} color={palette.teal}>
        五、實戰
      </Eyebrow>
      <h2
        className="fadeUp"
        style={{
          marginTop: 4,
          marginBottom: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          animationDelay: '0.1s',
        }}
      >
        💡 我的 OpenClaw 案例
      </h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
        <BulletList
          items={['實際應用場景', '遇到的挑戰與解決方案', '學到的經驗']}
          delay={0.2}
        />
      </div>
    </div>
  </div>
);

// ─── Slide 8: Thanks & Q&A ────────────────────────────────────────────────────
const Thanks: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '120px 140px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 40,
      }}
    >
      <Eyebrow delay={0}>OpenClaw · 感謝</Eyebrow>
      <h1
        className="fadeUp"
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 128,
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          animationDelay: '0.1s',
        }}
      >
        感謝聆聽！
      </h1>
      <p
        className="fadeUp"
        style={{
          margin: 0,
          maxWidth: 1000,
          fontSize: 38,
          lineHeight: 1.5,
          color: palette.textSoft,
          animationDelay: '0.3s',
        }}
      >
        有問題嗎？
        <br />
        <span style={{ color: palette.muted }}>
          或是我沒分享但你想知道的東西
        </span>
      </p>
      <div
        className="fadeUp"
        style={{
          animationDelay: '0.5s',
          fontFamily: font.mono,
          fontSize: 20,
          color: palette.accent,
          marginTop: 16,
          padding: '10px 22px',
          border: `1px solid ${palette.borderBright}`,
          borderRadius: 999,
        }}
      >
        Q & A
      </div>
    </div>
  </div>
);

// ─── Deck-wide transition: quiet RISE (the house default) ─────────────────────
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
  title: 'OpenClaw — 有靈魂的個人助理',
  description: 'OpenClaw 簡報：Getting Started、Soul 設定、Cron Job、安全、實戰案例',
  theme: 'soul-dark',
  createdAt: '2026-08-13T14:13:45.830Z',
};

export default [
  Cover,
  Agenda,
  GettingStarted,
  Soul,
  Cron,
  Security,
  CaseStudy,
  Thanks,
] satisfies Page[];
