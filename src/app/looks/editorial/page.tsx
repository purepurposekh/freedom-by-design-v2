// Variation A — "Editorial Light"
// FFB oatmeal surface, Editors Note display, sage + terracotta accents,
// generous rhythm. Uses the tracy-harris-brand-kit tokens via jsDelivr.

import Link from 'next/link';

const LOGO = 'https://static.showit.co/200/IBXs7NIvn4a1rU1r2lbrLQ/173187/th_logos_t_navy-09.png';
const TRACY_HERO = 'https://static.showit.co/800/aHJ_7e00RV-MrsdMdJddaQ/173187/th-pb-2024-outfit1-25.jpg';
const TRACY_VOICE = 'https://static.showit.co/800/ncWFBwItLHrcgwkcAe-zZQ/173187/tracy_014.jpg';

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/purepurposekh/tracy-harris-brand-kit@main';

const TYPES = [
  {
    name: 'Manifestor',
    tagline: 'The Initiator',
    body: 'You do not wait. You inform. Your business exists because you decided it should.',
  },
  {
    name: 'Generator',
    tagline: 'The Life Force',
    body: 'You respond. Your energy is renewable when you are building something that lights you up.',
  },
  {
    name: 'Manifesting Generator',
    tagline: 'The Multi-Passionate',
    body: 'You move fast, in bursts. Your path is not linear. It spirals and that is the gift.',
  },
  {
    name: 'Projector',
    tagline: 'The Guide',
    body: 'You see the system others are too deep inside to see. Your wisdom is invited, not pushed.',
  },
  {
    name: 'Reflector',
    tagline: 'The Mirror',
    body: 'You read environments. Your clarity arrives on a 28-day cycle. Patience is your superpower.',
  },
];

export default function EditorialLook() {
  return (
    <div data-brand="ffb" className="ed-root">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href={`${CDN_BASE}/styles/fonts.css`} />
      <link rel="stylesheet" href={`${CDN_BASE}/styles/tokens.css`} />

      <style>{`
        .ed-root {
          background: var(--surface-canvas);
          color: var(--ink-body);
          font-family: var(--f-sans);
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }
        .ed-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 22px clamp(24px, 5vw, 64px);
          border-bottom: 1px solid var(--border-hairline, rgba(36,53,49,0.10));
        }
        .ed-nav img { height: 28px; width: auto; }
        .ed-nav a {
          font-family: var(--f-sans);
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          font-weight: 500; color: var(--p-aztek);
          text-decoration: none; padding: 10px 18px;
          border: 1px solid var(--p-aztek); border-radius: 2px;
          transition: background 240ms ease, color 240ms ease;
        }
        .ed-nav a:hover { background: var(--p-aztek); color: var(--p-oatmeal); }

        .ed-wrap { max-width: 1180px; margin: 0 auto; padding: 0 clamp(24px, 5vw, 64px); }

        .ed-hero {
          padding: clamp(64px, 9vw, 112px) 0 clamp(96px, 11vw, 140px);
          position: relative; overflow: hidden;
        }
        .ed-hero::before {
          content: ""; position: absolute; inset: -10% -5% auto auto;
          width: 60%; height: 70%;
          background: radial-gradient(ellipse at 70% 30%, rgba(173,118,91,0.10), rgba(173,118,91,0));
          pointer-events: none; z-index: 0;
        }
        .ed-hero__grid {
          display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,1fr);
          gap: clamp(32px, 6vw, 80px); align-items: center; position: relative; z-index: 1;
        }
        @media (max-width: 900px) {
          .ed-hero__grid { grid-template-columns: 1fr; }
        }
        .ed-eyebrow {
          font-family: var(--f-script); font-size: 26px; line-height: 1;
          color: var(--p-copper); display: inline-block; margin-bottom: 8px;
        }
        .ed-label {
          font-family: var(--f-sans); font-size: 11px; font-weight: 500;
          letter-spacing: 0.24em; text-transform: uppercase; color: var(--p-mute);
          margin: 0 0 18px;
        }
        .ed-title {
          font-family: var(--f-serif-display); font-weight: 400;
          font-size: clamp(40px, 5.6vw, 72px); line-height: 1.02; letter-spacing: -0.02em;
          color: var(--p-aztek); margin: 0 0 28px;
        }
        .ed-title em { font-family: var(--f-serif-italic); font-style: italic; color: var(--p-copper); }
        .ed-lede {
          font-size: 17px; line-height: 1.7; max-width: 58ch;
          color: var(--p-ink); margin: 0 0 36px;
        }
        .ed-cta-row { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 48px; }
        .ed-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 14px 26px; font-family: var(--f-sans); font-size: 14px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;
          border-radius: 2px; transition: transform 160ms ease, background 240ms ease;
        }
        .ed-btn--primary {
          background: var(--p-aztek); color: var(--p-oatmeal); border: 1px solid var(--p-aztek);
        }
        .ed-btn--primary:hover { background: var(--p-ffb-dark); transform: translateY(-1px); }
        .ed-btn--ghost {
          background: transparent; color: var(--p-aztek); border: 1px solid var(--p-aztek);
        }
        .ed-btn--ghost:hover { background: var(--p-cream); }
        .ed-stats {
          display: flex; gap: clamp(24px, 4vw, 60px);
          padding-top: 28px; border-top: 1px solid rgba(36,53,49,0.18);
          flex-wrap: wrap;
        }
        .ed-stat { min-width: 110px; }
        .ed-stat__num {
          font-family: var(--f-serif-display); font-size: 34px; color: var(--p-aztek);
          line-height: 1; margin-bottom: 6px;
        }
        .ed-stat__label {
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--p-mute);
        }
        .ed-hero__media {
          position: relative;
        }
        .ed-hero__media img {
          width: 100%; height: 620px; object-fit: cover; object-position: center top;
          border-radius: 2px;
        }
        .ed-hero__caption {
          position: absolute; left: -14px; bottom: 28px;
          background: var(--p-oatmeal); color: var(--p-aztek);
          padding: 14px 18px; font-family: var(--f-serif-display); font-size: 18px;
          letter-spacing: -0.01em; box-shadow: 0 6px 18px rgba(16,16,16,0.08);
          max-width: 300px;
        }

        .ed-premise { background: var(--p-white); padding: clamp(72px, 9vw, 112px) 0; }
        .ed-premise__narrow { max-width: 720px; margin: 0 auto; text-align: left; }
        .ed-h2 {
          font-family: var(--f-serif-display); font-weight: 400;
          font-size: clamp(32px, 4vw, 48px); line-height: 1.12; letter-spacing: -0.015em;
          color: var(--p-aztek); margin: 0 0 28px;
        }
        .ed-h2 em { font-family: var(--f-serif-italic); font-style: italic; color: var(--p-copper); }
        .ed-body-lg { font-size: 18px; line-height: 1.75; color: var(--p-ink); margin: 0 0 20px; }
        .ed-body { font-size: 17px; line-height: 1.7; color: var(--p-ink); margin: 0 0 20px; }

        .ed-types { background: var(--p-cream); padding: clamp(72px, 9vw, 112px) 0; }
        .ed-types__grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px; margin-top: 56px;
        }
        .ed-type-card {
          background: var(--p-oatmeal); padding: 32px 26px; border: 1px solid rgba(36,53,49,0.08);
          border-radius: 2px; transition: transform 300ms var(--ease-out-craft, ease), border-color 300ms ease;
        }
        .ed-type-card:hover { transform: translateY(-2px); border-color: rgba(173,118,91,0.4); }
        .ed-type-card__name {
          font-family: var(--f-serif-display); font-weight: 400; font-size: 26px;
          color: var(--p-aztek); margin: 0 0 4px;
        }
        .ed-type-card__tag {
          font-family: var(--f-sans); font-size: 11px; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--p-copper); margin: 0 0 16px;
        }
        .ed-type-card__body { font-size: 14px; line-height: 1.65; color: var(--p-ink); margin: 0; }

        .ed-voice {
          background: var(--p-aztek); color: var(--p-oatmeal);
          padding: clamp(80px, 10vw, 128px) 0;
        }
        .ed-voice__grid {
          display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.3fr);
          gap: clamp(32px, 6vw, 80px); align-items: center;
        }
        @media (max-width: 900px) { .ed-voice__grid { grid-template-columns: 1fr; } }
        .ed-voice__img { width: 100%; height: 520px; object-fit: cover; border-radius: 2px; }
        .ed-voice .ed-h2 { color: var(--p-oatmeal); }
        .ed-voice .ed-h2 em { color: var(--p-dusty-rose); }
        .ed-voice__p { font-size: 17px; line-height: 1.75; color: rgba(246,244,241,0.88); margin: 0 0 18px; }
        .ed-voice .ed-eyebrow { color: var(--p-dusty-rose); }

        .ed-cta {
          background: var(--p-oatmeal); padding: clamp(80px, 10vw, 128px) 0;
          text-align: center;
        }
        .ed-cta__narrow { max-width: 640px; margin: 0 auto; }

        .ed-footer {
          background: var(--p-aztek); color: rgba(246,244,241,0.72);
          padding: 32px 0; font-size: 12px; letter-spacing: 0.12em;
          text-transform: uppercase; text-align: center;
        }
      `}</style>

      <nav className="ed-nav">
        <Link href="/">
          <img src={LOGO} alt="Tracy Harris" />
        </Link>
        <Link href="/quiz">Take the assessment</Link>
      </nav>

      <section className="ed-hero">
        <div className="ed-wrap ed-hero__grid">
          <div>
            <span className="ed-eyebrow">freedom by design</span>
            <p className="ed-label">A Freedom Filled® experience</p>
            <h1 className="ed-title">
              What does your Human Design say about the business you were <em>meant</em> to build?
            </h1>
            <p className="ed-lede">
              Tracy Harris uses Human Design as one of many tools inside Freedom Filled® Business. In under three minutes, discover your type and the Freedom Strategy that fits the way you are designed to work.
            </p>
            <div className="ed-cta-row">
              <Link href="/quiz" className="ed-btn ed-btn--primary">Start the assessment</Link>
              <Link href="#premise" className="ed-btn ed-btn--ghost">How it works</Link>
            </div>
            <div className="ed-stats">
              <div className="ed-stat">
                <div className="ed-stat__num">3 min</div>
                <span className="ed-stat__label">Assessment</span>
              </div>
              <div className="ed-stat">
                <div className="ed-stat__num">5</div>
                <span className="ed-stat__label">Types</span>
              </div>
              <div className="ed-stat">
                <div className="ed-stat__num">1</div>
                <span className="ed-stat__label">Strategy for you</span>
              </div>
            </div>
          </div>
          <div className="ed-hero__media">
            <img src={TRACY_HERO} alt="Tracy Harris" />
            <div className="ed-hero__caption">
              &ldquo;Your chart is a blueprint for the business you were meant to build.&rdquo;
            </div>
          </div>
        </div>
      </section>

      <section className="ed-premise" id="premise">
        <div className="ed-wrap ed-premise__narrow">
          <span className="ed-eyebrow">the premise</span>
          <h2 className="ed-h2">
            Your Human Design isn&rsquo;t a personality label. It is a <em>blueprint</em> for how you&rsquo;re wired to work.
          </h2>
          <p className="ed-body-lg">
            Most business advice is written for a default person who doesn&rsquo;t exist. Hustle harder. Wake at five. Post every day. Grind until it clicks.
          </p>
          <p className="ed-body">
            Human Design says the opposite. You have a specific energy type. A specific way of making decisions. A profile that describes how you learn, lead, and connect. When your business is built against your design, it feels heavy and extractive. When it is built with it, it feels generative and sustainable.
          </p>
          <p className="ed-body-lg">
            This assessment reveals your type, your strategy, and the one shift that changes how you show up in your business. It takes three minutes. The birth data is what makes it real.
          </p>
        </div>
      </section>

      <section className="ed-types">
        <div className="ed-wrap">
          <div style={{ maxWidth: 680 }}>
            <span className="ed-eyebrow">five types</span>
            <h2 className="ed-h2">
              One of these is how you&rsquo;re designed to <em>build</em>.
            </h2>
            <p className="ed-body">
              Each type has a distinct strategy, energy, and way of making decisions. Your chart tells you which one you are.
            </p>
          </div>
          <div className="ed-types__grid">
            {TYPES.map(t => (
              <div key={t.name} className="ed-type-card">
                <h3 className="ed-type-card__name">{t.name}</h3>
                <p className="ed-type-card__tag">{t.tagline}</p>
                <p className="ed-type-card__body">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ed-voice">
        <div className="ed-wrap ed-voice__grid">
          <img src={TRACY_VOICE} alt="Tracy at a live event" className="ed-voice__img" />
          <div>
            <span className="ed-eyebrow">why tracy uses this</span>
            <h2 className="ed-h2">
              Your design doesn&rsquo;t <em>decide</em> your business. It reveals how you are wired to build it.
            </h2>
            <p className="ed-voice__p">
              Tracy has used Human Design with thousands of women inside Freedom Filled® Business. Not as a label. Not as a cage. As a language for the thing you already knew about yourself but couldn&rsquo;t quite name.
            </p>
            <p className="ed-voice__p">
              This assessment gives you the same starting point her members get. Type, strategy, authority, profile, plus a Freedom Blueprint page that applies it to your business model.
            </p>
          </div>
        </div>
      </section>

      <section className="ed-cta">
        <div className="ed-wrap ed-cta__narrow">
          <span className="ed-eyebrow">next step</span>
          <h2 className="ed-h2">
            Three minutes. One chart. A clearer next <em>move</em>.
          </h2>
          <p className="ed-body">
            Enter your birth data, get your type in under three minutes, then read the Freedom Blueprint that turns it into a business strategy.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link href="/quiz" className="ed-btn ed-btn--primary">Take the assessment</Link>
          </div>
        </div>
      </section>

      <footer className="ed-footer">Tracy Harris Co · Freedom by Design</footer>
    </div>
  );
}
