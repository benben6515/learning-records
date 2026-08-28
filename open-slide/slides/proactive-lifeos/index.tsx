import { Step, Steps, useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';

import coverImg from './assets/cover.png';
import slackImg from './assets/slack-checkin.png';
import avatarImg from '@assets/benben-avatar.png';

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

const VIOLET = '#efaaef';
const MUTED = '#D0E0E0';
const DIM = '#8090A0';
const SURFACE = '#12121a';
const SURFACE_HI = '#1a1a25';
const BORDER = '#3D3D50';
const GREEN = '#A6E3A1';
const PEACH = '#FAB387';
const PINK = '#F38BA8';
const MINT = '#77EFCF';
const CHART = '#E1FAA0';
const SKY = '#89DCEB';

const MONO = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace';

const styles = `
  @keyframes pl-fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pl-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .pl-fadeUp { opacity: 0; animation: pl-fadeUp 0.8s cubic-bezier(.2,.7,.2,1) forwards; }
  .pl-fadeIn { opacity: 0; animation: pl-fadeIn 1s ease forwards; }
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
    className="pl-fadeUp"
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
    className="pl-fadeUp"
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
        color: DIM,
      }}
    >
      <span>BENBEN · 2026</span>
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

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="pl-fadeUp"
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

const FlowRow = ({ n, name, desc }: { n: string; name: string; desc: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
    <span style={{ fontFamily: MONO, fontSize: 18, color: DIM, flexShrink: 0 }}>{n}</span>
    <span style={{ fontFamily: MONO, fontSize: 24, color: 'var(--osd-accent)', flexShrink: 0, fontWeight: 700 }}>
      {name}
    </span>
    <span style={{ fontSize: 28, color: MUTED }}>{desc}</span>
  </div>
);

const JobCard = ({
  time,
  cadence,
  name,
  deliver,
  deliverColor,
}: {
  time: string;
  cadence: string;
  name: string;
  deliver: string;
  deliverColor: string;
}) => (
  <div
    className="pl-fadeUp"
    style={{
      background: SURFACE,
      border: `1px solid ${BORDER}`,
      borderRadius: 'var(--osd-radius)',
      padding: '22px 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: MONO, fontSize: 26, color: 'var(--osd-accent)', fontWeight: 700 }}>{time}</span>
      <span style={{ fontFamily: MONO, fontSize: 15, color: DIM, letterSpacing: '0.06em' }}>{cadence}</span>
    </div>
    <div style={{ fontSize: 27, fontWeight: 500, color: 'var(--osd-text)' }}>{name}</div>
    <div style={{ fontFamily: MONO, fontSize: 15, color: deliverColor, letterSpacing: '0.04em' }}>{deliver}</div>
  </div>
);

const StatusCard = ({
  sym,
  color,
  title,
  desc,
}: {
  sym: string;
  color: string;
  title: string;
  desc: string;
}) => (
  <div
    style={{
      background: SURFACE,
      border: `1px solid ${BORDER}`,
      borderRadius: 'var(--osd-radius)',
      padding: '26px 30px',
      display: 'flex',
      gap: 22,
      alignItems: 'flex-start',
    }}
  >
    <span
      style={{
        fontFamily: MONO,
        fontSize: 26,
        fontWeight: 700,
        color,
        flexShrink: 0,
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        background: `${color}1a`,
        border: `1px solid ${color}3a`,
      }}
    >
      {sym}
    </span>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 30, fontWeight: 600, color: 'var(--osd-text)' }}>{title}</div>
      <div style={{ fontSize: 25, color: MUTED, lineHeight: 1.4 }}>{desc}</div>
    </div>
  </div>
);

const Cover: Page = () => (
  <div style={{ ...fill, position: 'relative' }}>
    <Styles />
    <img
      src={coverImg}
      alt="LifeOS cover"
      className="pl-fadeIn"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(to top, rgba(10,10,15,0.82) 0%, rgba(10,10,15,0.25) 32%, rgba(10,10,15,0) 55%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0) 22%)',
      }}
    />
    <div
      className="pl-fadeUp"
      style={{
        position: 'absolute',
        top: 72,
        left: 120,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
      }}
    >
      <img
        src={avatarImg}
        alt="benben avatar"
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid rgba(34,207,207,0.7)',
          boxShadow: '0 0 24px rgba(34,207,207,0.25)',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: MONO, fontSize: 18, letterSpacing: '0.14em', color: 'var(--osd-text)' }}>
          BENBEN
        </span>
        <span style={{ fontFamily: MONO, fontSize: 14, letterSpacing: '0.14em', color: DIM }}>LIFEOS OWNER</span>
      </div>
    </div>
    <div
      className="pl-fadeUp"
      style={{ position: 'absolute', left: 120, bottom: 130, animationDelay: '0.15s', maxWidth: 1100 }}
    >
      <Eyebrow>HERMES CRON × SLACK BOT</Eyebrow>
      <p style={{ margin: '18px 0 0', fontSize: 38, lineHeight: 1.3, color: MUTED, fontWeight: 500 }}>
        AI Agent 怎麼打造<span style={{ color: 'var(--osd-accent)' }}>主動回饋</span>的 LifeOS？
      </p>
    </div>
    <Footer />
  </div>
);

const Concept: Page = () => (
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
    <Eyebrow color={MINT}>CHAPTER 01 · CONCEPT</Eyebrow>
    <H2>從「被動問答」到「主動回饋」</H2>
    <div style={{ display: 'flex', gap: 40, marginTop: 56 }}>
      <div
        className="pl-fadeUp"
        style={{
          flex: 1,
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 'var(--osd-radius)',
          padding: '36px 40px',
          animationDelay: '0.1s',
        }}
      >
        <Tag text="PASSIVE" color={DIM} />
        <div style={{ fontSize: 38, fontWeight: 700, marginTop: 20, color: DIM }}>被動問答</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 26 }}>
          <div style={{ fontSize: 29, color: DIM }}>你問，它才答</div>
          <div style={{ fontSize: 29, color: DIM }}>沒有問，就沒有動作</div>
          <div style={{ fontSize: 29, color: DIM }}>每次對話都從零開始</div>
        </div>
      </div>
      <div
        className="pl-fadeUp"
        style={{
          flex: 1.25,
          background: SURFACE_HI,
          border: '1px solid rgba(34,207,207,0.55)',
          borderRadius: 'var(--osd-radius)',
          padding: '36px 40px',
          boxShadow: '0 0 40px rgba(34,207,207,0.08)',
          animationDelay: '0.2s',
        }}
      >
        <Tag text="PROACTIVE" />
        <div style={{ fontSize: 38, fontWeight: 700, marginTop: 20, color: 'var(--osd-text)' }}>主動回饋</div>
        <Steps>
          <div style={{ marginTop: 26 }} />
          <Step>
            <FlowRow n="01" name="TRIGGER" desc="cron 排程到點，自己醒來" />
          </Step>
          <div style={{ height: 18 }} />
          <Step>
            <FlowRow n="02" name="EXECUTE" desc="呼叫 skill / script 把工作做完" />
          </Step>
          <div style={{ height: 18 }} />
          <Step>
            <FlowRow n="03" name="REPORT" desc="結果推進 Discord / Slack — 成敗都說" />
          </Step>
        </Steps>
      </div>
    </div>
    <p
      className="pl-fadeUp"
      style={{
        margin: '52px 0 0',
        fontSize: 36,
        lineHeight: 1.4,
        color: VIOLET,
        fontWeight: 600,
        animationDelay: '0.3s',
      }}
    >
        自動化只是手段，回報才是信任的來源。
    </p>
    <Footer />
  </div>
);

const HermesGrid: Page = () => (
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
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <div>
        <Eyebrow color={CHART}>CHAPTER 02 · HERMES CRON</Eyebrow>
        <H2>九個排程，繞著一天的生活轉</H2>
      </div>
      <div className="pl-fadeUp" style={{ display: 'flex', gap: 12, paddingBottom: 8 }}>
        <Tag text="9 jobs" />
        <Tag text="24 h" color={VIOLET} />
      </div>
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        marginTop: 48,
      }}
    >
      <JobCard time="03:00" cadence="每天" name="Dreaming 記憶鞏固與夢境日記" deliver="→ local" deliverColor={VIOLET} />
      <JobCard time="08:00" cadence="每天" name="英文詞彙複習" deliver="→ discord dm" deliverColor={SKY} />
      <JobCard time="08:15" cadence="每天" name="每日早晨快報" deliver="→ discord dm" deliverColor={SKY} />
      <JobCard time="08:20" cadence="每天" name="優惠情報監控" deliver="→ #discount-superman" deliverColor={SKY} />
      <JobCard time="09:03" cadence="每天" name="星巴克活動檢查" deliver="→ #discount-superman" deliverColor={SKY} />
      <JobCard time="09·11·13" cadence="每天" name="股票快報" deliver="→ #stock" deliverColor={SKY} />
      <JobCard time="10:00" cadence="每週一" name="LLM Wiki 週度 Lint" deliver="→ local" deliverColor={VIOLET} />
      <JobCard time="00:00" cadence="每月 1 日" name="記帳月初初始化" deliver="→ discord" deliverColor={SKY} />
      <JobCard time="23:00" cadence="每月 28–31" name="記帳月底報表" deliver="→ discord" deliverColor={SKY} />
    </div>
    <p
      className="pl-fadeUp"
      style={{ margin: '44px 0 0', fontSize: 30, color: MUTED, animationDelay: '0.25s' }}
    >
      從<span style={{ color: VIOLET }}>凌晨的夢境日記</span>到<span style={{ color: 'var(--osd-accent)' }}>月底的記帳報表</span>
      ，生活裡的每一件事，都有一個 agent 在顧。
    </p>
    <Footer />
  </div>
);

const CheckinCase: Page = () => (
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
    <Eyebrow color={SKY}>CHAPTER 03 · CASE — 打卡 BOT</Eyebrow>
    <H2>做完，一定回報</H2>
    <div style={{ display: 'flex', gap: 56, marginTop: 44, flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Steps>
          <Step>
            <StatusCard
              sym="✓"
              color={GREEN}
              title="已自動打下班卡"
              desc="成功也回報 — 你知道它今天有做事"
            />
          </Step>
          <div style={{ height: 20 }} />
          <Step>
            <StatusCard
              sym="!"
              color={PEACH}
              title="已點擊，未偵測到成功訊息"
              desc="不確定就誠實標記不確定，請你確認"
            />
          </Step>
          <div style={{ height: 20 }} />
          <Step>
            <StatusCard
              sym="✕"
              color={PINK}
              title="自動打卡失敗，請手動打卡"
              desc="附上原因 TimeoutError — 直接告訴你該接手"
            />
          </Step>
        </Steps>
        <p className="pl-fadeUp" style={{ margin: '8px 0 0', fontSize: 26, color: DIM, animationDelay: '0.2s' }}>
          全部推進 Slack DM，不用自己開頁面查。
        </p>
      </div>
      <div
        className="pl-fadeUp"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, animationDelay: '0.15s' }}
      >
        <div
          style={{
            width: 325,
            height: 660,
            borderRadius: 'var(--osd-radius)',
            border: `1px solid ${BORDER}`,
            overflow: 'hidden',
            background: SURFACE,
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          }}
        >
          <img
            src={slackImg}
            alt="Slack 打卡 bot 訊息"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
        <span style={{ fontFamily: MONO, fontSize: 15, color: DIM, letterSpacing: '0.06em' }}>
          slack · 記得打卡-啾咪-0_0
        </span>
      </div>
    </div>
    <Footer />
  </div>
);

const Closing: Page = () => (
  <div
    style={{
      ...fill,
      padding: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <Styles />
    <GridBg />
    <img
      src={avatarImg}
      alt="benben avatar"
      className="pl-fadeUp"
      style={{
        width: 88,
        height: 88,
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid rgba(34,207,207,0.7)',
        boxShadow: '0 0 32px rgba(34,207,207,0.25)',
      }}
    />
    <div style={{ height: 28 }} />
    <Eyebrow>THE LOOP</Eyebrow>
    <div style={{ height: 20 }} />
    <Title>
      讓 Agent
      <br />
      住進你的生活節奏
    </Title>
    <div
      className="pl-fadeUp"
      style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 36, animationDelay: '0.15s' }}
    >
      <Tag text="TRIGGER" />
      <span style={{ fontFamily: MONO, fontSize: 22, color: DIM }}>→</span>
      <Tag text="EXECUTE" color={VIOLET} />
      <span style={{ fontFamily: MONO, fontSize: 22, color: DIM }}>→</span>
      <Tag text="REPORT" />
    </div>
    <p
      className="pl-fadeUp"
      style={{
        margin: '30px 0 0',
        fontSize: 32,
        lineHeight: 1.5,
        color: MUTED,
        animationDelay: '0.25s',
      }}
    >
      排程觸發、自動執行、主動回報 — 成功要說，失敗更要說。
    </p>
    <Footer />
  </div>
);

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
  title: '主動回饋的 LifeOS',
  createdAt: '2026-08-28T12:54:53.515Z',
  theme: 'benben',
};

export default [Cover, Concept, HermesGrid, CheckinCase, Closing] satisfies Page[];
