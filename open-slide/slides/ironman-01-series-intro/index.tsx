import {type Page, useSlidePageNumber} from '@open-slide/core'
import type {DesignSystem, SlideMeta, SlideTransition} from '@open-slide/core'

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
}

// Extra colors outside the DesignSystem shape — plain consts.
const muted = '#808080'
const bodySoft = '#b8b8b8'
const surface = '#141414'
const border = '#484848'
const borderActive = '#606060'
const MONO = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace'

const styles = `
  @keyframes oc-fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .oc-fadeUp { opacity: 0; animation: oc-fadeUp 0.8s cubic-bezier(.2,.7,.2,1) forwards; }
`

const Styles = () => <style>{styles}</style>

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: '-0.015em',
  overflow: 'hidden' as const,
  position: 'relative' as const,
}

// ─── Theme fixed components (from themes/opencode.md) ────────────────────────
const GridBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(250,178,131,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(250,178,131,0.022) 1px, transparent 1px)',
      backgroundSize: '88px 88px',
      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
    }}
  />
)

const Title = ({children, accent = false}: {children: React.ReactNode; accent?: boolean}) => (
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
    }}>
    {children}
  </h1>
)

const Eyebrow = ({children, color = 'var(--osd-accent)'}: {children: React.ReactNode; color?: string}) => (
  <div
    className="oc-fadeUp"
    style={{
      fontFamily: MONO,
      fontSize: 20,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color,
    }}>
    {children}
  </div>
)

const Footer = () => {
  const {current, total} = useSlidePageNumber()
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
      }}>
      <span>OPENCODE · IRONMAN 2026</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}

const Tag = ({text, color = 'var(--osd-accent)'}: {text: string; color?: string}) => (
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
    }}>
    {text}
  </span>
)

// ─── Deck helpers ────────────────────────────────────────────────────────────
const H2 = ({children}: {children: React.ReactNode}) => (
  <h2
    className="oc-fadeUp"
    style={{
      margin: '4px 0 0',
      fontFamily: 'var(--osd-font-display)',
      fontSize: 64,
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
    }}>
    {children}
  </h2>
)

const Card = ({tag, tagColor, name, desc, highlight = false}: {tag: string; tagColor?: string; name: React.ReactNode; desc: string; highlight?: boolean}) => (
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
    }}>
    <Tag
      text={tag}
      color={tagColor}
    />
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: highlight ? 'var(--osd-accent)' : 'var(--osd-text)',
      }}>
      {name}
    </div>
    <div style={{fontSize: 26, lineHeight: 1.5, color: bodySoft}}>{desc}</div>
  </div>
)

const Row = ({range, phase, desc, accent = false}: {range: string; phase: string; desc: string; accent?: boolean}) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      padding: '32px 40px',
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 'var(--osd-radius)',
    }}>
    <span
      style={{
        fontFamily: MONO,
        fontSize: 20,
        letterSpacing: '0.08em',
        color: accent ? 'var(--osd-accent)' : muted,
        flexShrink: 0,
        width: 170,
      }}>
      {range}
    </span>
    <span
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        flexShrink: 0,
        width: 220,
      }}>
      {phase}
    </span>
    <span style={{fontSize: 28, color: bodySoft, lineHeight: 1.4}}>{desc}</span>
  </div>
)

const Punch = ({children}: {children: React.ReactNode}) => (
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
    }}>
    {children}
  </p>
)

const Takeaway = ({n, children}: {n: number; children: React.ReactNode}) => (
  <div
    className="oc-fadeUp"
    style={{
      display: 'flex',
      gap: 24,
      alignItems: 'baseline',
      fontSize: 34,
      lineHeight: 1.5,
    }}>
    <span
      style={{
        fontFamily: MONO,
        fontSize: 22,
        color: 'var(--osd-accent)',
        flexShrink: 0,
      }}>
      {String(n).padStart(2, '0')}
    </span>
    <span>{children}</span>
  </div>
)

// ─── Page 1: Cover ───────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div
    style={{
      ...fill,
      padding: 120,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
    <Styles />
    <GridBg />
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Eyebrow>IRONMAN 2026 · DAY 01</Eyebrow>
      <Tag text="01 / 30" />
    </div>
    <div>
      <Title accent>01-opencode</Title>
      <p
        className="oc-fadeUp"
        style={{
          margin: '36px 0 0',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 52,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
        }}>
        你的終端機 AI 戰友
      </p>
      <p
        className="oc-fadeUp"
        style={{
          margin: '20px 0 0',
          fontSize: 34,
          color: muted,
        }}>
        30 天從新手到前沿 Agent 工具
      </p>
    </div>
    <div
      className="oc-fadeUp"
      style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
      <span style={{fontFamily: MONO, fontSize: 22, color: bodySoft, letterSpacing: '0.06em'}}>benben</span>
      <span style={{fontFamily: MONO, fontSize: 20, color: muted}}>$ opencode ./ironman-2026</span>
    </div>
    <Footer />
  </div>
)

// ─── Page 2: 你用的是哪一種 AI？ ─────────────────────────────────────────────
const Levels: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
    }}>
    <Styles />
    <GridBg />
    <Eyebrow color="#56b6c2">互動開場 · 小小測驗</Eyebrow>
    <H2>你用的是哪一種 AI？</H2>
    <div style={{display: 'flex', gap: 40, marginTop: 56}}>
      <Card
        tag="LEVEL 1"
        tagColor="#7fd88f"
        name="補全"
        desc="Copilot 式，AI 猜你下一行"
      />
      <Card
        tag="LEVEL 2"
        tagColor="#56b6c2"
        name="問答"
        desc="貼 code 問 ChatGPT，自己回來改"
      />
      <Card
        tag="LEVEL 3"
        name="Agent"
        desc="自己讀專案、改檔案、跑指令、回報結果"
        highlight
      />
    </div>
    <div style={{flex: 1}} />
    <Punch>
      從「<span style={{color: bodySoft}}>工程師兼打字員</span>」變「
      <span style={{color: 'var(--osd-accent)'}}>帶 AI 小隊的 tech lead</span>」
    </Punch>
    <Footer />
  </div>
)

// ─── Page 3: 為什麼選 opencode ───────────────────────────────────────────────
const Why: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
    }}>
    <Styles />
    <GridBg />
    <Eyebrow>WHY OPENCODE</Eyebrow>
    <H2>為什麼選 opencode</H2>
    <div style={{display: 'flex', gap: 40, marginTop: 56}}>
      <Card
        tag="terminal-first"
        name="哪裡都能跑"
        desc="SSH、遠端、無 GUI 環境都能跑"
      />
      <Card
        tag="open source"
        tagColor="#9d7cd8"
        name="開源"
        desc="github.com/anomalyco/opencode — 看得見的 code 才敢交付"
      />
      <Card
        tag="model freedom"
        tagColor="#7fd88f"
        name="模型自由"
        desc="provider 是你的選擇權，可接地端模型"
      />
    </div>
    <Footer />
  </div>
)

// ─── Page 4: 跟既有工具的關係 ────────────────────────────────────────────────
const Relationship: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
    }}>
    <Styles />
    <GridBg />
    <Eyebrow color="#5c9cf5">EXISTING TOOLS</Eyebrow>
    <H2>跟既有工具的關係</H2>
    <div style={{display: 'flex', gap: 40, marginTop: 56}}>
      <Card
        tag="IDE 型"
        tagColor="#56b6c2"
        name="Cursor 等"
        desc="活在編輯器裡"
      />
      <Card
        tag="CLI 型"
        name="opencode"
        desc="活在 terminal 裡（腳本 / 遠端 / 無 GUI 友善）"
        highlight
      />
    </div>
    <div style={{flex: 1}} />
    <Punch>
      不是取代問題，是「<span style={{color: 'var(--osd-accent)'}}>住處</span>
      」問題 — 很多人兩個都用
    </Punch>
    <Footer />
  </div>
)

// ─── Page 5: 30 天系列地圖 ───────────────────────────────────────────────────
const Map: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}>
    <Styles />
    <GridBg />
    <Eyebrow>ROADMAP</Eyebrow>
    <H2>30 天系列地圖</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        marginTop: 40,
        marginBottom: 40,
      }}>
      <Row
        range="DAY 01–10"
        phase="新手篇"
        desc="把 opencode 當隊友（/init、Plan mode、@、/undo）"
      />
      <Row
        range="DAY 11–20"
        phase="進階篇"
        desc="把 opencode 變平台（agents、skills、MCP、CI）"
      />
      <Row
        range="DAY 21–30"
        phase="工具巡禮"
        desc="pi、OpenSpec、open-slide、mp-skills、herdr"
        accent
      />
    </div>
    <Footer />
  </div>
)

// ─── Page 6: Takeaways ───────────────────────────────────────────────────────
const Takeaways: Page = () => (
  <div
    style={{
      ...fill,
      padding: '100px 120px',
      display: 'flex',
      flexDirection: 'column',
    }}>
    <Styles />
    <GridBg />
    <Eyebrow>TAKEAWAYS · DAY 01</Eyebrow>
    <H2>今天帶走三件事</H2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        marginTop: 64,
        marginBottom: 48,
      }}>
      <Takeaway n={1}>AI coding agent 是會動手的隊友，不是只出一張嘴的顧問</Takeaway>
      <Takeaway n={2}>
        opencode：<span style={{color: 'var(--osd-accent)'}}>開源、terminal-first、模型自由</span>
      </Takeaway>
      <Takeaway n={3}>明天：五分鐘安裝開工</Takeaway>
    </div>
    <div style={{flex: 1}} />
    <div
      className="oc-fadeUp"
      style={{display: 'flex', alignItems: 'center', gap: 20}}>
      <Tag text="匿名提問" />
      <span style={{fontFamily: MONO, fontSize: 24, color: bodySoft, letterSpacing: '0.04em'}}>dev.benben.me/q/P3C5U6</span>
    </div>
    <Footer />
  </div>
)

// ─── Module-level page transition (theme: RISE) ──────────────────────────────
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)'
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)'

export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      {opacity: 1, transform: 'translateY(0)'},
      {opacity: 0, transform: 'translateY(-4px)'},
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      {opacity: 0, transform: 'translateY(6px)'},
      {opacity: 1, transform: 'translateY(0)'},
    ],
  },
}

export const meta: SlideMeta = {
  title: '01-opencode｜你的終端機 AI 戰友',
  createdAt: '2026-08-31T16:46:50.498Z',
  theme: 'opencode',
}

export default [Cover, Levels, Why, Relationship, Map, Takeaways] satisfies Page[]
