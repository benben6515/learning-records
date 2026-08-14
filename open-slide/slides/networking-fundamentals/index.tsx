import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

import coverAvatar from './assets/welcome_zhewei_pixel.png';

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
  accent: '#22cfcf',
  violet: '#efaaef',
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
      <span>NETWORKING · 2026</span>
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

const Card = ({
  children,
  borderColor,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  borderColor?: string;
  delay?: number;
  style?: React.CSSProperties;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: palette.surface,
      border: `1px solid ${borderColor ?? palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '24px 28px',
      ...style,
    }}
  >
    {children}
  </div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3
    style={{
      margin: '0 0 10px',
      fontSize: 28,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}
  >
    {children}
  </h3>
);

const CardText = ({ children }: { children: React.ReactNode }) => (
  <p style={{ margin: 0, fontSize: 24, color: palette.muted, lineHeight: 1.5 }}>{children}</p>
);

const Lede = ({ children, delay = 0.15 }: { children: React.ReactNode; delay?: number }) => (
  <p
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      margin: '8px 0 0',
      fontSize: 30,
      lineHeight: 1.5,
      color: palette.muted,
      maxWidth: 1400,
    }}
  >
    {children}
  </p>
);

const Quote = ({ children, delay = 0.45 }: { children: React.ReactNode; delay?: number }) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      borderLeft: `3px solid ${palette.accent}`,
      padding: '4px 0 4px 24px',
      color: palette.muted,
      fontSize: 26,
      lineHeight: 1.5,
      fontStyle: 'italic',
      maxWidth: 1500,
    }}
  >
    {children}
  </div>
);

const FlowStep = ({
  k,
  d,
  highlight = false,
  delay = 0,
}: {
  k: string;
  d: React.ReactNode;
  highlight?: boolean;
  delay?: number;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      flex: 1,
      background: highlight ? `${palette.accent}14` : palette.surface,
      border: `1px solid ${highlight ? palette.borderBright : palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '22px 18px',
      textAlign: 'center',
    }}
  >
    <div style={{ fontFamily: font.mono, fontWeight: 700, fontSize: 24, color: palette.accent }}>{k}</div>
    <div style={{ color: palette.muted, fontSize: 18, marginTop: 8, lineHeight: 1.4 }}>{d}</div>
  </div>
);

const FlowArrow = ({ delay = 0 }: { delay?: number }) => (
  <span
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      color: palette.dim,
      fontSize: 28,
      padding: '0 8px',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    →
  </span>
);

const PrivRow = ({
  block,
  range,
  tag,
  delay = 0,
}: {
  block: string;
  range: string;
  tag: string;
  delay?: number;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gap: 24,
      alignItems: 'center',
      padding: '18px 24px',
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
    }}
  >
    <span style={{ fontFamily: font.mono, fontWeight: 700, fontSize: 30, color: palette.text }}>{block}</span>
    <span style={{ color: palette.muted, fontFamily: font.mono, fontSize: 20 }}>{range}</span>
    <span style={{ color: palette.accent, fontWeight: 700, fontSize: 22 }}>{tag}</span>
  </div>
);

const LayerRow = ({
  lid,
  name,
  sub,
  children,
  highlight = false,
  delay = 0,
}: {
  lid: string;
  name: string;
  sub: string;
  children: React.ReactNode;
  highlight?: boolean;
  delay?: number;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      display: 'grid',
      gridTemplateColumns: '72px 1fr auto',
      alignItems: 'center',
      gap: 24,
      padding: '16px 24px',
      border: `1px solid ${highlight ? palette.borderBright : palette.border}`,
      borderRadius: 'var(--osd-radius)',
      background: highlight ? `linear-gradient(90deg, ${palette.accent}14, transparent)` : palette.surface,
    }}
  >
    <span style={{ fontFamily: font.mono, fontWeight: 800, color: palette.accent, fontSize: 28 }}>{lid}</span>
    <div>
      <span style={{ fontWeight: 700, fontSize: 26 }}>{name}</span>
      <span style={{ display: 'block', color: palette.dim, fontSize: 18, marginTop: 2 }}>{sub}</span>
    </div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>{children}</div>
  </div>
);

const HsMsg = ({
  dir,
  color,
  label,
  sub,
  delay = 0,
}: {
  dir: 'r' | 'l';
  color: string;
  label: string;
  sub: string;
  delay?: number;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      textAlign: 'center',
      fontFamily: font.mono,
      fontWeight: 700,
      fontSize: 22,
      padding: '12px 20px',
      borderRadius: 10,
      border: `1px solid ${palette.border}`,
      background: palette.surfaceHi,
      whiteSpace: 'nowrap',
    }}
  >
    <span style={{ display: 'block', fontSize: 28, color, lineHeight: 1 }}>{dir === 'r' ? '→' : '←'}</span>
    {label}
    <span style={{ display: 'block', color: palette.muted, fontFamily: font.sans, fontWeight: 500, fontSize: 16, marginTop: 4 }}>{sub}</span>
  </div>
);

const SegBox = ({
  net,
  host,
  hostIp,
  delay = 0,
}: {
  net: string;
  host: string;
  hostIp: string;
  delay?: number;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      border: `1px dashed ${palette.border}`,
      borderRadius: 16,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      minWidth: 220,
      background: palette.surface,
    }}
  >
    <div style={{ fontFamily: font.mono, color: palette.accent, fontSize: 20, fontWeight: 600 }}>{net}</div>
    <div
      style={{
        padding: '10px 12px',
        border: `1px solid ${palette.border}`,
        borderRadius: 8,
        fontSize: 22,
        background: palette.surfaceHi,
        textAlign: 'center',
      }}
    >
      {host}
      <br />
      <span style={{ color: palette.dim, fontSize: 16 }}>{hostIp}</span>
    </div>
    <div style={{ textAlign: 'center', color: palette.dim, fontSize: 16 }}>閘道 .254</div>
  </div>
);

const RouterBox = ({ delay = 0 }: { delay?: number }) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      padding: '24px 28px',
      border: `1px solid ${palette.accent}`,
      borderRadius: 14,
      background: `${palette.accent}14`,
      textAlign: 'center',
      fontWeight: 700,
      minWidth: 200,
    }}
  >
    <span style={{ fontSize: 40, display: 'block' }}>⚙️</span>
    路由器
    <span style={{ display: 'block', color: palette.muted, fontWeight: 500, marginTop: 4, fontSize: 18 }}>
      L3 轉送 · 查路由表
    </span>
  </div>
);

const Wire = ({ delay = 0 }: { delay?: number }) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      height: 2,
      background: palette.border,
      minWidth: 40,
      alignSelf: 'center',
    }}
  />
);

const CmpRow = ({
  label,
  tcp,
  udp,
  delay = 0,
  last = false,
}: {
  label: string;
  tcp: string;
  udp: string;
  delay?: number;
  last?: boolean;
}) => (
  <div
    className="fadeUp"
    style={{
      animationDelay: `${delay}s`,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      padding: '14px 24px',
      borderBottom: last ? 'none' : `1px solid ${palette.borderSubtle}`,
      alignItems: 'center',
    }}
  >
    <span style={{ fontWeight: 600, color: palette.text, fontSize: 24 }}>{label}</span>
    <span style={{ color: palette.green, fontSize: 24 }}>{tcp}</span>
    <span style={{ color: palette.yellow, fontSize: 24 }}>{udp}</span>
  </div>
);

const TakeawayRow = ({
  n,
  text,
  delay = 0,
}: {
  n: string;
  text: string;
  delay?: number;
}) => (
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
    <span style={{ fontFamily: font.mono, fontSize: 24, fontWeight: 700, color: palette.accent, minWidth: 48 }}>{n}</span>
    <span style={{ fontSize: 26, color: palette.textSoft }}>{text}</span>
  </div>
);

const PageShell = ({ children }: { children: React.ReactNode }) => (
  <>
    <Styles />
    <GridBg />
    {children}
    <Footer />
  </>
);

const pageStyle: React.CSSProperties = {
  ...fill,
  padding: '100px 120px',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
};

// ─── Page 1: Cover ───────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div
    style={{
      ...fill,
      padding: 120,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Styles />
    <GridBg />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Eyebrow delay={0.05}>NETWORKING · 入門</Eyebrow>
      <div className="fadeUp" style={{ animationDelay: '0.05s', display: 'flex', gap: 10 }}>
        <Tag text="RFC 2131" color={palette.sky} />
        <Tag text="RFC 1918" color={palette.mint} />
        <Tag text="RFC 9293" color={palette.lavender} />
      </div>
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Title>網路基礎</Title>
      <p
        className="fadeUp"
        style={{
          marginTop: 28,
          maxWidth: 1300,
          fontSize: 42,
          lineHeight: 1.3,
          color: palette.textSoft,
          animationDelay: '0.2s',
        }}
      >
        一次看懂 <span style={{ color: palette.accent }}>DHCP</span> ·{' '}
        <span style={{ color: palette.sky }}>網段</span> ·{' '}
        <span style={{ color: palette.mint }}>Ping</span> ·{' '}
        <span style={{ color: palette.yellow }}>路由器</span> ·{' '}
        <span style={{ color: palette.lavender }}>TCP/UDP</span>
      </p>
    </div>
    <img
      src={coverAvatar}
      alt=""
      style={{
        position: 'absolute',
        left: 120,
        bottom: 130,
        width: 240,
        height: 240,
        borderRadius: 12,
        border: `2px solid ${palette.accent}`,
        boxShadow: `0 0 30px ${palette.accent}40`,
        objectFit: 'cover',
      }}
    />
    <Footer />
  </div>
);

// ─── Page 2: Agenda ──────────────────────────────────────────────────────────
const Agenda: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05}>AGENDA · 本場要講</Eyebrow>
      <SectionH2>五個觀念，一條邏輯鏈</SectionH2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 8 }}>
        <Card delay={0.15}>
          <CardTitle>
            <Tag text="1" /> DHCP vs 固定 IP
          </CardTitle>
          <CardText>IP 是手動寫死，還是自動發派？DHCP 其實有三種模式。</CardText>
        </Card>
        <Card delay={0.2}>
          <CardTitle>
            <Tag text="2" color={palette.sky} /> 網段與私有 IP
          </CardTitle>
          <CardText>192.168.x / 10.x 從哪來？為什麼不能直接上網？</CardText>
        </Card>
        <Card delay={0.25}>
          <CardTitle>
            <Tag text="3" color={palette.mint} /> Ping 為何同網段才通
          </CardTitle>
          <CardText>背後是 ICMP 加上 ARP 廣播的先天限制。</CardText>
        </Card>
        <Card delay={0.3}>
          <CardTitle>
            <Tag text="4" color={palette.yellow} /> 跨網段為何要路由器
          </CardTitle>
          <CardText>不同網段 = 不同廣播網域，要靠 L3 設備轉送。</CardText>
        </Card>
        <Card delay={0.35} style={{ gridColumn: '1 / -1' }}>
          <CardTitle>
            <Tag text="5" color={palette.lavender} /> 傳輸層 TCP / UDP
          </CardTitle>
          <CardText>前面四節解決「送不送得到」；TCP/UDP 解決「可不可靠」。</CardText>
        </Card>
      </div>
    </PageShell>
  </div>
);

// ─── Page 3: DHCP vs Static ──────────────────────────────────────────────────
const DhcpVsStatic: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05}>
        <span style={{ color: palette.accent }}>01</span> · IP 怎麼來的
      </Eyebrow>
      <SectionH2>DHCP vs 固定 IP</SectionH2>
      <Lede>
        不是二選一 — 兩者<strong style={{ color: palette.text }}>可以並存</strong>。
      </Lede>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 8 }}>
        <Card delay={0.3}>
          <CardTitle>固定 IP（Static）</CardTitle>
          <CardText>
            人員手動把 IP、遮罩、閘道、DNS 逐一寫進裝置，不會自動改變，也不依賴伺服器。
          </CardText>
        </Card>
        <Card delay={0.36}>
          <CardTitle>DHCP（自動發派）</CardTitle>
          <CardText>
            主機開機後自動向 DHCP 伺服器索取 IP 與設定。RFC 2131 明文：
            <strong style={{ color: palette.text }}>「DHCP must coexist with statically configured hosts.」</strong>
          </CardText>
        </Card>
      </div>
      <Quote delay={0.5}>
        很多人把 DHCP 直接等同於「每次拿到不一樣的 IP」— 其實不然。它有三種模式。
      </Quote>
    </PageShell>
  </div>
);

// ─── Page 4: DHCP Three Modes ────────────────────────────────────────────────
const DhcpModes: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05}>
        <span style={{ color: palette.accent }}>01</span> · DHCP 的三種分配模式
      </Eyebrow>
      <SectionH2>三種模式，不只是「動態」</SectionH2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 8 }}>
        <Card delay={0.15}>
          <Tag text="Automatic" />
          <h3 style={{ fontSize: 26, fontWeight: 700, margin: '12px 0 8px' }}>自動分配</h3>
          <CardText>
            配給 client 一個<strong style={{ color: palette.text }}>永久</strong> IP。結果也是固定 IP，只是由 DHCP 統一發派。
          </CardText>
        </Card>
        <Card delay={0.22} borderColor={palette.borderBright}>
          <Tag text="Dynamic" color={palette.accent} />
          <h3 style={{ fontSize: 26, fontWeight: 700, margin: '12px 0 8px' }}>動態分配</h3>
          <CardText>
            配給<strong style={{ color: palette.text }}>有限期</strong>的 IP（lease 租約），到期可回收再用。
            <strong style={{ color: palette.text }}>家用 / 企業最常見。</strong>
          </CardText>
        </Card>
        <Card delay={0.29}>
          <Tag text="Manual" color={palette.green} />
          <h3 style={{ fontSize: 26, fontWeight: 700, margin: '12px 0 8px' }}>手動分配</h3>
          <CardText>
            IP 由網管指定，DHCP 只負責傳給主機。即「<strong style={{ color: palette.text }}>保留位址 / 綁 MAC</strong>」。
          </CardText>
        </Card>
      </div>
      <Lede delay={0.42}>
        判斷原則：員工電腦用 <strong style={{ color: palette.text }}>Dynamic</strong>；印表機 / 伺服器要穩定，用{' '}
        <strong style={{ color: palette.text }}>Manual</strong> 或純固定 IP。
      </Lede>
    </PageShell>
  </div>
);

// ─── Page 5: DORA ────────────────────────────────────────────────────────────
const Dora: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05}>
        <span style={{ color: palette.accent }}>01</span> · 主機怎麼拿到 IP
      </Eyebrow>
      <SectionH2>DHCP 四步交握 — DORA</SectionH2>
      <div style={{ display: 'flex', alignItems: 'stretch', marginTop: 16 }}>
        <FlowStep
          k="DISCOVER"
          d={
            <>
              Client 在本地子網<strong style={{ color: palette.text }}>廣播</strong>
              <br />
              「誰是 DHCP 伺服器？」
            </>
          }
          highlight
          delay={0.2}
        />
        <FlowArrow delay={0.28} />
        <FlowStep
          k="OFFER"
          d={
            <>
              Server 回應
              <br />
              一個可用 IP + 設定
            </>
          }
          delay={0.3}
        />
        <FlowArrow delay={0.38} />
        <FlowStep
          k="REQUEST"
          d={
            <>
              Client 挑一個 Offer
              <br />
              正式請求該位址
            </>
          }
          delay={0.4}
        />
        <FlowArrow delay={0.48} />
        <FlowStep
          k="ACK"
          d={
            <>
              Server 確認配發
              <br />
              Client 正式取得 IP
            </>
          }
          delay={0.5}
        />
      </div>
      <Lede delay={0.62}>
        動態配發的 IP 有期限，稱為 <strong style={{ color: palette.text }}>lease（租約）</strong>— 可延長、可主動釋放，也能要求「無限期租約」變成實質固定 IP。
      </Lede>
    </PageShell>
  </div>
);

// ─── Page 6: Private IP ──────────────────────────────────────────────────────
const PrivateIp: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05} color={palette.sky}>
        <span style={{ color: palette.sky }}>02</span> · 私有 IP 網段
      </Eyebrow>
      <SectionH2>192.168.x / 10.x 從哪來？</SectionH2>
      <Lede delay={0.15}>
        RFC 1918 保留了三個 IPv4 區塊供私有網路使用 — 不需申請、可重複使用，但
        <strong style={{ color: palette.text }}>不能直接在公開網路上路由</strong>。
      </Lede>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
        <PrivRow block="10.0.0.0/8" range="10.0.0.0 – 10.255.255.255" tag="24-bit 區塊" delay={0.25} />
        <PrivRow block="172.16.0.0/12" range="172.16.0.0 – 172.31.255.255" tag="20-bit 區塊" delay={0.31} />
        <PrivRow block="192.168.0.0/16" range="192.168.0.0 – 192.168.255.255" tag="16-bit 區塊" delay={0.37} />
      </div>
      <Quote delay={0.48}>
        「packets with private source or destination addresses should not be forwarded across such links.」
        → 所以家用裝置要上網，必須靠路由器做{' '}
        <code style={{ color: palette.accent, fontStyle: 'normal', fontFamily: font.mono }}>NAT</code>{' '}
        把私有 IP 換成公開 IP。
      </Quote>
    </PageShell>
  </div>
);

// ─── Page 7: CIDR ────────────────────────────────────────────────────────────
const Cidr: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05} color={palette.sky}>
        <span style={{ color: palette.sky }}>02</span> · 網段怎麼切
      </Eyebrow>
      <SectionH2>網段 = CIDR 前綴</SectionH2>
      <Lede delay={0.15}>斜線後面的數字代表「網路部分」有幾個 bit。</Lede>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 }}>
        <Card delay={0.25}>
          <CardTitle>
            192.168.1.0<span style={{ color: palette.accent }}>/24</span>
          </CardTitle>
          <div style={{ fontFamily: font.mono, fontSize: 32, margin: '12px 0' }}>
            <span style={{ color: palette.accent }}>192.168.1</span>
            <span style={{ color: palette.dim }}> | </span>
            <span style={{ color: palette.muted }}>.0 – .255</span>
          </div>
          <CardText>
            前 24 bit 是網段，第四個數字是主機編號。
            <br />
            可用主機：<strong style={{ color: palette.text }}>.1 ~ .254</strong>（共 254 個，.0 是網路、.255 是廣播）。
          </CardText>
        </Card>
        <Card delay={0.31}>
          <CardTitle>「同網段」怎麼判斷</CardTitle>
          <CardText>
            看的不是數字像不像，而是<strong style={{ color: palette.text }}>前綴是否相同</strong>：
          </CardText>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: font.mono, fontSize: 22 }}>
              <span style={{ color: palette.green }}>192.168.1.10/24</span>
              <span style={{ color: palette.dim }}> ↔ </span>
              <span style={{ color: palette.green }}>192.168.1.20/24</span>
              <span style={{ color: palette.green, marginLeft: 8 }}>→ 同網段 ✓</span>
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 22 }}>
              <span style={{ color: palette.pink }}>192.168.1.10/24</span>
              <span style={{ color: palette.dim }}> ↔ </span>
              <span style={{ color: palette.pink }}>192.168.2.10/24</span>
              <span style={{ color: palette.pink, marginLeft: 8 }}>→ 不同網段 ✗</span>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  </div>
);

// ─── Page 8: ICMP / Ping ─────────────────────────────────────────────────────
const Icmp: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05} color={palette.mint}>
        <span style={{ color: palette.mint }}>03</span> · Ping 走的協定
      </Eyebrow>
      <SectionH2>Ping = ICMP Echo</SectionH2>
      <Lede delay={0.15}>
        <code style={{ color: palette.accent, fontFamily: font.mono }}>ping</code> 用的不是 TCP、不是 UDP，而是{' '}
        <strong style={{ color: palette.text }}>ICMP</strong>（RFC 792）。
      </Lede>
      <div style={{ display: 'flex', alignItems: 'stretch', maxWidth: 900, marginTop: 16 }}>
        <FlowStep k="Type 8 · Echo" d={<>來源主機送出「回聲請求」</>} delay={0.25} />
        <FlowArrow delay={0.33} />
        <FlowStep k="Type 0 · Reply" d={<>目的地原封不動回傳</>} delay={0.35} />
      </div>
      <Quote delay={0.48}>
        「The data received in the echo message must be returned in the echo reply message.」→ 有沒有收到回應、往返多久，就判斷連線通不通。但 ICMP 封包要送達之前，還得先過 ARP 這一關 ⬇
      </Quote>
    </PageShell>
  </div>
);

// ─── Page 9: ARP Same Subnet ─────────────────────────────────────────────────
const ArpSubnet: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05} color={palette.mint}>
        <span style={{ color: palette.mint }}>03</span> · 為什麼同網段才通
      </Eyebrow>
      <SectionH2>關鍵：ARP 是「本地廣播」</SectionH2>
      <Lede delay={0.15}>
        要在乙太網路上送封包，得先知道對方的 <strong style={{ color: palette.text }}>MAC 位址</strong>— 靠 ARP（RFC 826）以
        <strong style={{ color: palette.text }}>廣播</strong>詢問。而
        <strong style={{ color: palette.text }}>廣播過不了網段邊界</strong>。
      </Lede>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 }}>
        <Card delay={0.25} borderColor={palette.green}>
          <CardTitle>
            <span style={{ color: palette.green }}>✓</span> 同網段
          </CardTitle>
          <CardText>
            ARP 廣播找得到對方 MAC → ICMP Echo 直接送達 → 對方回 Reply →{' '}
            <strong style={{ color: palette.green }}>ping 通</strong>。
          </CardText>
        </Card>
        <Card delay={0.31} borderColor={palette.pink}>
          <CardTitle>
            <span style={{ color: palette.pink }}>✗</span> 不同網段
          </CardTitle>
          <CardText>
            目的地不在本地廣播網域 → ARP 廣播到不了對方（路由器不轉送廣播）→ 封包送不出去 →{' '}
            <strong style={{ color: palette.pink }}>ping 不通</strong>。
          </CardText>
        </Card>
      </div>
      <Quote delay={0.45}>
        「It then causes this packet to be broadcast to all stations on the Ethernet cable.」— 廣播只在「同一條乙太網路 / 同一廣播網域」裡有效。
      </Quote>
    </PageShell>
  </div>
);

// ─── Page 10: Router Topology ────────────────────────────────────────────────
const Router: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05} color={palette.yellow}>
        <span style={{ color: palette.yellow }}>04</span> · 跨網段要路由器
      </Eyebrow>
      <SectionH2>不同網段 = 不同廣播網域</SectionH2>
      <Lede delay={0.15}>
        兩個網段要互通，必須有一台在<strong style={{ color: palette.text }}>第三層（L3）</strong>轉送的設備 — 路由器。
      </Lede>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, marginTop: 24 }}>
        <SegBox net="192.168.1.0/24" host="PC-A" hostIp=".10" delay={0.25} />
        <Wire delay={0.3} />
        <RouterBox delay={0.32} />
        <Wire delay={0.34} />
        <SegBox net="192.168.2.0/24" host="PC-B" hostIp=".20" delay={0.36} />
      </div>
      <Lede delay={0.5}>
        主機發現目的不在自己網段 → 把封包交給<strong style={{ color: palette.text }}>預設閘道</strong>（路由器的本地介面）→ 路由器查路由表轉送到目的網段。
        <strong style={{ color: palette.text }}>沒設閘道，跨網段封包就沒出路。</strong>
      </Lede>
    </PageShell>
  </div>
);

// ─── Page 11: Layer Model ────────────────────────────────────────────────────
const LayerModel: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05} color={palette.lavender}>
        <span style={{ color: palette.lavender }}>05</span> · 把整個分層看清楚
      </Eyebrow>
      <SectionH2>Internet 協定四層（RFC 1122）</SectionH2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 1200, marginTop: 16 }}>
        <LayerRow lid="L4" name="Application" sub="使用者服務" delay={0.2}>
          <Tag text="HTTP" />
          <Tag text="SMTP" />
          <Tag text="DNS" />
          <Tag text="SSH" />
        </LayerRow>
        <LayerRow lid="L3" name="Transport" sub="端對端 · 可靠性 · 流量控制" highlight delay={0.27}>
          <Tag text="TCP" color={palette.green} />
          <Tag text="UDP" color={palette.yellow} />
        </LayerRow>
        <LayerRow lid="L2" name="Internet" sub="跨網段定址與路由" delay={0.34}>
          <Tag text="IP" />
          <Tag text="ICMP" />
          <Tag text="IGMP" />
        </LayerRow>
        <LayerRow lid="L1" name="Link" sub="實體網段上傳送訊框" delay={0.41}>
          <Tag text="Ethernet" />
          <Tag text="Wi-Fi" />
          <Tag text="ARP" />
        </LayerRow>
      </div>
      <Lede delay={0.55}>
        對號入座：<strong style={{ color: palette.text }}>ping = ICMP → L2</strong>（「ICMP is an integral part of IP」）·{' '}
        <strong style={{ color: palette.text }}>DHCP 跑在 UDP 上</strong> ·{' '}
        <strong style={{ color: palette.text }}>路由器在 L2 看 IP</strong>。
      </Lede>
    </PageShell>
  </div>
);

// ─── Page 12: TCP Handshake ──────────────────────────────────────────────────
const TcpHandshake: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05} color={palette.lavender}>
        <span style={{ color: palette.lavender }}>05</span> · TCP 的核心
      </Eyebrow>
      <SectionH2>TCP：可靠 · 有序 · 連線導向</SectionH2>
      <Lede delay={0.15}>
        TCP provides a <strong style={{ color: palette.text }}>reliable, in-order, byte-stream service</strong>. IP 只保證「盡力送」，
        <strong style={{ color: palette.text }}>是 TCP 補上可靠性</strong>。
      </Lede>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '0 30px',
          maxWidth: 1100,
          margin: '24px auto 0',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 28,
            padding: 16,
            border: `1px solid ${palette.border}`,
            borderRadius: 12,
            background: palette.surface,
          }}
        >
          Client
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <HsMsg dir="r" color={palette.accent} label="SYN" sub="我想連線 · seq=100" delay={0.28} />
          <HsMsg dir="l" color={palette.green} label="SYN + ACK" sub="收到(ack=101) · 我也連線" delay={0.36} />
          <HsMsg dir="r" color={palette.accent} label="ACK" sub="收到你的 SYN · 連線建立" delay={0.44} />
        </div>
        <div
          style={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 28,
            padding: 16,
            border: `1px solid ${palette.border}`,
            borderRadius: 12,
            background: palette.surface,
          }}
        >
          Server
        </div>
      </div>
      <p
        className="fadeUp"
        style={{
          animationDelay: '0.56s',
          margin: '24px 0 0',
          textAlign: 'center',
          fontSize: 26,
          color: palette.muted,
          lineHeight: 1.5,
        }}
      >
        三步走完才算 <strong style={{ color: palette.text }}>ESTABLISHED</strong>。表頭關鍵欄位：
        <code style={{ color: palette.accent, fontFamily: font.mono }}>Port</code> ·{' '}
        <code style={{ color: palette.accent, fontFamily: font.mono }}>Sequence</code> ·{' '}
        <code style={{ color: palette.accent, fontFamily: font.mono }}>Ack</code> ·{' '}
        <code style={{ color: palette.accent, fontFamily: font.mono }}>Window</code>（流量控制）
      </p>
    </PageShell>
  </div>
);

// ─── Page 13: TCP vs UDP ─────────────────────────────────────────────────────
const TcpVsUdp: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05} color={palette.lavender}>
        <span style={{ color: palette.lavender }}>05</span> · 怎麼選
      </Eyebrow>
      <SectionH2>TCP vs UDP</SectionH2>
      <div
        style={{
          marginTop: 16,
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 'var(--osd-radius)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            padding: '14px 24px',
            borderBottom: `1px solid ${palette.border}`,
            background: palette.surfaceHi,
          }}
        >
          <span style={{ color: palette.dim, fontSize: 20, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>特性</span>
          <span style={{ color: palette.green, fontSize: 20, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>TCP</span>
          <span style={{ color: palette.yellow, fontSize: 20, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>UDP</span>
        </div>
        <CmpRow label="連線" tcp="要（三向交握）" udp="不用" delay={0.2} />
        <CmpRow label="可靠性" tcp="保證送達、不丟、有序" udp="不保證" delay={0.26} />
        <CmpRow label="速度 / 延遲" tcp="較高（握手 · 確認 · 重傳）" udp="較低" delay={0.32} />
        <CmpRow label="表頭大小" tcp="20 bytes 起" udp="固定 8 bytes" delay={0.38} />
        <CmpRow label="常見應用" tcp="HTTP · SMTP · FTP · SSH" udp="DNS · DHCP · 視訊 · 遊戲" delay={0.44} last />
      </div>
      <Quote delay={0.56}>
        判斷原則：<strong style={{ color: palette.text }}>「資料不能錯、不能少」用 TCP</strong>；{' '}
        <strong style={{ color: palette.text }}>「快比準確重要，或自己處理可靠性」用 UDP</strong>。
      </Quote>
    </PageShell>
  </div>
);

// ─── Page 14: Takeaway ───────────────────────────────────────────────────────
const Takeaway: Page = () => (
  <div style={pageStyle}>
    <PageShell>
      <Eyebrow delay={0.05}>TAKEAWAY · 核心邏輯鏈</Eyebrow>
      <SectionH2>兩條主軸，一句話各一行</SectionH2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 }}>
        <Card delay={0.2} borderColor={palette.borderBright}>
          <CardTitle>
            <Tag text="連通層" color={palette.accent} /> L1 → L2
          </CardTitle>
          <CardText>
            IP 在網路層定址 → 網段由<strong style={{ color: palette.text }}>前綴切分</strong> → 同網段靠{' '}
            <strong style={{ color: palette.text }}>ARP 廣播</strong>解析 MAC 直送 →{' '}
            <strong style={{ color: palette.text }}>ping</strong> 用 ICMP Echo 測試 → 跨網段廣播過不去，必須交給
            <strong style={{ color: palette.text }}>路由器</strong>轉送。
          </CardText>
        </Card>
        <Card delay={0.26} borderColor={palette.green}>
          <CardTitle>
            <Tag text="應用層" color={palette.green} /> L3 → L4
          </CardTitle>
          <CardText>
            IP 只「盡力送」、不保證送達 →{' '}
            <strong style={{ color: palette.green }}>TCP</strong> 用序號／確認／重傳補上可靠性與有序 →{' '}
            <strong style={{ color: palette.yellow }}>UDP</strong> 不加這些、換取低延遲。應用程式依需求挑選。
          </CardText>
        </Card>
      </div>
      <div
        className="fadeUp"
        style={{
          animationDelay: '0.42s',
          textAlign: 'center',
          fontSize: 36,
          lineHeight: 1.5,
          marginTop: 20,
          color: palette.text,
        }}
      >
        前四節解決<strong style={{ color: palette.accent }}>「送不送得到」</strong>；
        <br />
        第五節解決<strong style={{ color: palette.lavender }}>「可不可靠」</strong>。
      </div>
    </PageShell>
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
  title: '網路基礎入門 · DHCP · 網段 · Ping · 路由器 · TCP',
  description: '從「封包能不能送到位」到「資料可不可靠」— DHCP、網段、Ping、路由器、TCP/UDP 五個觀念一條邏輯鏈',
  theme: 'benben',
  createdAt: '2026-08-14T03:28:50.649Z',
};

export default [
  Cover,
  Agenda,
  DhcpVsStatic,
  DhcpModes,
  Dora,
  PrivateIp,
  Cidr,
  Icmp,
  ArpSubnet,
  Router,
  LayerModel,
  TcpHandshake,
  TcpVsUdp,
  Takeaway,
] satisfies Page[];
