// Variation B — "Confident Dark"
// Aztek/charcoal surface, Editors Note display, dusty-rose + sage accents,
// magazine-quality density with full-bleed type moments. Same brand kit tokens.

import Link from 'next/link';

const LOGO = 'https://static.showit.co/200/IBXs7NIvn4a1rU1r2lbrLQ/173187/th_logos_t_navy-09.png';
const LOGO_LIGHT = 'https://static.showit.co/200/IBXs7NIvn4a1rU1r2lbrLQ/173187/th_logos_t_navy-09.png';
const TRACY_HERO = 'https://static.showit.co/800/aHJ_7e00RV-MrsdMdJddaQ/173187/th-pb-2024-outfit1-25.jpg';
const TRACY_VOICE = 'https://static.showit.co/800/ncWFBwItLHrcgwkcAe-zZQ/173187/tracy_014.jpg';

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/purepurposekh/tracy-harris-brand-kit@main';

const TYPES = [
  { name: 'Manifestor',             tag: 'Initiator',    body: 'You do not wait. You inform.' },
  { name: 'Generator',              tag: 'Life Force',   body: 'You respond. Your energy is renewable.' },
  { name: 'Manifesting Generator',  tag: 'Multi-passionate', body: 'You spiral. The path is not linear.' },
  { name: 'Projector',              tag: 'Guide',        body: 'You see what others are too deep to see.' },
  { name: 'Reflector',              tag: 'Mirror',       body: 'You read environments. Clarity on a lunar cycle.' },
];

export default function DramaticLook() {
  return (
    <div data-brand="ffb" className="dr-root">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href={`${CDN_BASE}/styles/fonts.css`} />
      <link rel="stylesheet" href={`${CDN_BASE}/styles/tokens.css`} />

      <style>{`
        .dr-root {
          background: var(--p-aztek);
          color: var(--p-oatmeal);
          font-family: var(--f-sans);
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }
        .dr-wrap { max-width: 1240px; margin: 0 auto; padding: 0 clamp(24px, 5vw, 72px); }

        .dr-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 22px clamp(24px, 5vw, 72px);
          border-bottom: 1px solid rgba(246,244,241,0.14);
        }
        .dr-nav img { height: 28px; filter: brightness(0) invert(1); }
        .dr-nav a {
          font-family: var(--f-sans);
          font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase;
          font-weight: 500; color: var(--p-oatmeal);
          text-decoration: none; padding: 10px 20px;
          border: 1px solid rgba(246,244,241,0.4); border-radius: 2px;
          transition: background 240ms ease, color 240ms ease, border-color 240ms ease;
        }
        .dr-nav a:hover { background: var(--p-oatmeal); color: var(--p-aztek); border-color: var(--p-oatmeal); }

        /* FULL-BLEED TYPOGRAPHIC HERO */
        .dr-hero {
          padding: clamp(88px, 12vw, 160px) 0 clamp(56px, 8vw, 96px);
          position: relative;
        }
        .dr-hero::after {
          content: ""; position: absolute; inset: auto 0 0 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(246,244,241,0.2) 50%, transparent);
        }
        .dr-hero__grid {
          display: grid; grid-template-columns: minmax(0,1.4fr) minmax(0,1fr);
          gap: clamp(40px, 7vw, 96px); align-items: end;
        }
        @media (max-width: 960px) { .dr-hero__grid { grid-template-columns: 1fr; } }

        .dr-eyebrow {
          font-family: var(--f-script); font-size: 28px; line-height: 1;
          color: var(--p-dusty-rose); display: inline-block; margin-bottom: 10px;
        }
        .dr-label {
          font-family: var(--f-sans); font-size: 11px; font-weight: 500;
          letter-spacing: 0.28em; text-transform: uppercase; color: var(--p-sage);
          margin: 0 0 22px;
        }
        .dr-title {
          font-family: var(--f-serif-display); font-weight: 400;
          font-size: clamp(48px, 7.5vw, 112px); line-height: 0.98; letter-spacing: -0.025em;
          color: var(--p-oatmeal); margin: 0 0 32px;
        }
        .dr-title em {
          font-family: var(--f-serif-italic); font-style: italic; color: var(--p-dusty-rose);
        }
        .dr-lede {
          font-size: 18px; line-height: 1.7; max-width: 48ch;
          color: rgba(246,244,241,0.82); margin: 0 0 40px;
        }
        .dr-cta-row { display: flex; flex-wrap: wrap; gap: 14px; }
        .dr-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 16px 30px; font-family: var(--f-sans); font-size: 13px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase; text-decoration: none;
          border-radius: 2px; transition: transform 160ms ease, background 240ms ease;
        }
        .dr-btn--primary {
          background: var(--p-dusty-rose); color: var(--p-aztek); border: 1px solid var(--p-dusty-rose);
        }
        .dr-btn--primary:hover { background: var(--p-copper); border-color: var(--p-copper); color: var(--p-oatmeal); transform: translateY(-1px); }
        .dr-btn--ghost {
          background: transparent; color: var(--p-oatmeal); border: 1px solid rgba(246,244,241,0.4);
        }
        .dr-btn--ghost:hover { border-color: var(--p-oatmeal); background: rgba(246,244,241,0.06); }

        .dr-hero__media { position: relative; }
        .dr-hero__portrait {
          width: 100%; height: 540px; object-fit: cover; object-position: center top;
          border-radius: 2px; filter: grayscale(0.15) contrast(1.05);
        }
        .dr-hero__overlay {
          position: absolute; left: 12px; bottom: -40px;
          background: var(--p-dusty-rose); color: var(--p-aztek);
          padding: 16px 22px; font-family: var(--f-serif-display); font-size: 20px;
          letter-spacing: -0.01em; box-shadow: 0 12px 32px rgba(0,0,0,0.4);
          max-width: 320px;
        }

        /* MARQUEE / FULL-BLEED STAT STRIP */
        .dr-stats {
          border-top: 1px solid rgba(246,244,241,0.14);
          border-bottom: 1px solid rgba(246,244,241,0.14);
          padding: clamp(40px, 6vw, 64px) 0;
        }
        .dr-stats__grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; align-items: center;
        }
        @media (max-width: 800px) { .dr-stats__grid { grid-template-columns: repeat(2, 1fr); gap: 32px; } }
        .dr-stat__num {
          font-family: var(--f-serif-display); font-size: clamp(44px, 6vw, 72px);
          line-height: 1; color: var(--p-dusty-rose); margin: 0 0 8px;
        }
        .dr-stat__label {
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(246,244,241,0.62);
        }

        /* PREMISE ON OATMEAL, breaks the dark rhythm deliberately */
        .dr-premise {
          background: var(--p-oatmeal); color: var(--p-aztek);
          padding: clamp(88px, 11vw, 140px) 0;
        }
        .dr-premise__grid {
          display: grid; grid-template-columns: minmax(0, 0.4fr) minmax(0, 1fr);
          gap: clamp(40px, 7vw, 96px);
        }
        @media (max-width: 900px) { .dr-premise__grid { grid-template-columns: 1fr; } }
        .dr-premise__eye {
          font-family: var(--f-sans); font-size: 11px; letter-spacing: 0.28em;
          text-transform: uppercase; color: var(--p-copper); margin-top: 14px;
        }
        .dr-h2 {
          font-family: var(--f-serif-display); font-weight: 400;
          font-size: clamp(36px, 5vw, 60px); line-height: 1.08; letter-spacing: -0.02em;
          color: var(--p-aztek); margin: 0 0 32px;
        }
        .dr-h2 em { font-family: var(--f-serif-italic); font-style: italic; color: var(--p-copper); }
        .dr-body-lg { font-size: 18px; line-height: 1.75; color: var(--p-ink); margin: 0 0 22px; }
        .dr-body { font-size: 17px; line-height: 1.72; color: var(--p-ink); margin: 0 0 22px; }

        /* TYPES TABLE */
        .dr-types { padding: clamp(88px, 11vw, 140px) 0; }
        .dr-types__intro { max-width: 680px; margin-bottom: 64px; }
        .dr-types .dr-h2 { color: var(--p-oatmeal); }
        .dr-types .dr-h2 em { color: var(--p-dusty-rose); }
        .dr-types__body { font-size: 17px; line-height: 1.72; color: rgba(246,244,241,0.82); margin: 0; }
        .dr-types__table { border-top: 1px solid rgba(246,244,241,0.2); }
        .dr-type-row {
          display: grid; grid-template-columns: 60px 1.4fr 1fr 2fr;
          gap: 24px; align-items: center;
          padding: 28px 0;
          border-bottom: 1px solid rgba(246,244,241,0.14);
          transition: padding 300ms ease;
        }
        @media (max-width: 800px) {
          .dr-type-row { grid-template-columns: 32px 1fr; row-gap: 8px; }
          .dr-type-row > *:nth-child(3), .dr-type-row > *:nth-child(4) { grid-column: 2; }
        }
        .dr-type-row:hover { padding-left: 12px; }
        .dr-type-row__num {
          font-family: var(--f-serif-display); font-size: 24px; color: var(--p-dusty-rose);
        }
        .dr-type-row__name {
          font-family: var(--f-serif-display); font-size: 28px; color: var(--p-oatmeal);
        }
        .dr-type-row__tag {
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--p-sage);
        }
        .dr-type-row__body {
          font-size: 15px; line-height: 1.6; color: rgba(246,244,241,0.78);
        }

        /* VOICE STRIP */
        .dr-voice {
          background: var(--p-copper); color: var(--p-oatmeal);
          padding: clamp(96px, 12vw, 144px) 0;
          position: relative; overflow: hidden;
        }
        .dr-voice::before {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(36,53,49,0.15), rgba(36,53,49,0.35));
          pointer-events: none;
        }
        .dr-voice__grid {
          display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.2fr);
          gap: clamp(40px, 7vw, 96px); align-items: center; position: relative;
        }
        @media (max-width: 900px) { .dr-voice__grid { grid-template-columns: 1fr; } }
        .dr-voice__img {
          width: 100%; height: 560px; object-fit: cover; border-radius: 2px;
          filter: grayscale(0.2) contrast(1.1);
        }
        .dr-voice .dr-h2 { color: var(--p-oatmeal); }
        .dr-voice .dr-h2 em { color: var(--p-cream); }
        .dr-voice__p { font-size: 18px; line-height: 1.72; color: rgba(246,244,241,0.92); margin: 0 0 22px; }
        .dr-voice .dr-eyebrow { color: var(--p-cream); }

        /* CTA STRIP */
        .dr-cta {
          padding: clamp(96px, 12vw, 144px) 0;
          text-align: center;
        }
        .dr-cta .dr-h2 { color: var(--p-oatmeal); font-size: clamp(44px, 6vw, 88px); max-width: 16ch; margin: 0 auto 28px; }
        .dr-cta .dr-h2 em { color: var(--p-dusty-rose); }
        .dr-cta__p { max-width: 540px; margin: 0 auto 40px; font-size: 17px; line-height: 1.7; color: rgba(246,244,241,0.8); }

        .dr-footer {
          border-top: 1px solid rgba(246,244,241,0.14);
          padding: 28px 0; font-size: 12px; letter-spacing: 0.18em;
          text-transform: uppercase; text-align: center; color: rgba(246,244,241,0.6);
        }
      `}</style>

      <nav className="dr-nav">
        <Link href="/">
          <img src={LOGO_LIGHT} alt="Tracy Harris" />
        </Link>
        <Link href="/quiz">Take the assessment</Link>
      </nav>

      <section className="dr-hero">
        <div className="dr-wrap dr-hero__grid">
          <div>
            <span className="dr-eyebrow">freedom by design</span>
            <p className="dr-label">A Freedom Filled® experience</p>
            <h1 className="dr-title">
              Build the business you were <em>designed</em> to build.
            </h1>
            <p className="dr-lede">
              Your Human Design is a blueprint, not a label. Three minutes. Real ephemeris maths. A Freedom Strategy that fits the way you are actually wired to work.
            </p>
            <div className="dr-cta-row">
              <Link href="/quiz" className="dr-btn dr-btn--primary">Start the assessment</Link>
              <Link href="#premise" className="dr-btn dr-btn--ghost">How it works</Link>
            </div>
          </div>
          <div className="dr-hero__media">
            <img src={TRACY_HERO} alt="Tracy Harris" className="dr-hero__portrait" />
            <div className="dr-hero__overlay">
              &ldquo;Your chart is a blueprint for the business you were meant to build.&rdquo;
            </div>
          </div>
        </div>
      </section>

      <section className="dr-stats">
        <div className="dr-wrap dr-stats__grid">
          <div>
            <div className="dr-stat__num">3 min</div>
            <div className="dr-stat__label">Assessment</div>
          </div>
          <div>
            <div className="dr-stat__num">5</div>
            <div className="dr-stat__label">Types</div>
          </div>
          <div>
            <div className="dr-stat__num">64</div>
            <div className="dr-stat__label">Gates read</div>
          </div>
          <div>
            <div className="dr-stat__num">1</div>
            <div className="dr-stat__label">Strategy for you</div>
          </div>
        </div>
      </section>

      <section className="dr-premise" id="premise">
        <div className="dr-wrap dr-premise__grid">
          <div>
            <span className="dr-eyebrow" style={{ color: 'var(--p-copper)' }}>the premise</span>
            <div className="dr-premise__eye">Why this exists</div>
          </div>
          <div>
            <h2 className="dr-h2">
              Your Human Design isn&rsquo;t a personality label. It is a <em>blueprint</em> for how you&rsquo;re wired to work.
            </h2>
            <p className="dr-body-lg">
              Most business advice is written for a default person who doesn&rsquo;t exist. Hustle harder. Wake at five. Post every day. Grind until it clicks.
            </p>
            <p className="dr-body">
              Human Design says the opposite. You have a specific energy type. A specific way of making decisions. A profile that describes how you learn, lead, and connect. When your business is built against your design, it feels heavy and extractive. When it is built with it, it feels generative and sustainable.
            </p>
            <p className="dr-body-lg">
              This assessment reveals your type, your strategy, and the one shift that changes how you show up in your business.
            </p>
          </div>
        </div>
      </section>

      <section className="dr-types">
        <div className="dr-wrap">
          <div className="dr-types__intro">
            <span className="dr-eyebrow">five types</span>
            <h2 className="dr-h2">
              One of these is how you&rsquo;re designed to <em>build</em>.
            </h2>
            <p className="dr-types__body">
              Each type has a distinct strategy, energy, and way of making decisions. Your chart tells you which one.
            </p>
          </div>
          <div className="dr-types__table">
            {TYPES.map((t, i) => (
              <div key={t.name} className="dr-type-row">
                <div className="dr-type-row__num">{String(i + 1).padStart(2, '0')}</div>
                <div className="dr-type-row__name">{t.name}</div>
                <div className="dr-type-row__tag">{t.tag}</div>
                <div className="dr-type-row__body">{t.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dr-voice">
        <div className="dr-wrap dr-voice__grid">
          <img src={TRACY_VOICE} alt="Tracy at a live event" className="dr-voice__img" />
          <div>
            <span className="dr-eyebrow">why tracy uses this</span>
            <h2 className="dr-h2">
              Your design doesn&rsquo;t <em>decide</em> your business. It reveals how you are wired to build it.
            </h2>
            <p className="dr-voice__p">
              Tracy has used Human Design with thousands of women inside Freedom Filled® Business. Not as a label. Not as a cage. As a language for the thing you already knew about yourself but could not quite name.
            </p>
            <p className="dr-voice__p">
              This assessment gives you the same starting point her members get. Type, strategy, authority, profile, plus a Freedom Blueprint that applies it to your business model.
            </p>
          </div>
        </div>
      </section>

      <section className="dr-cta">
        <div className="dr-wrap">
          <span className="dr-eyebrow">your next move</span>
          <h2 className="dr-h2">
            Three minutes. One chart. A clearer next <em>move</em>.
          </h2>
          <p className="dr-cta__p">
            Enter your birth data, get your type, then read the Freedom Blueprint that turns it into a business strategy.
          </p>
          <Link href="/quiz" className="dr-btn dr-btn--primary">Take the assessment</Link>
        </div>
      </section>

      <footer className="dr-footer">Tracy Harris Co · Freedom by Design</footer>
    </div>
  );
}
