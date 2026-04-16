import Link from 'next/link';

const LOGO = 'https://static.showit.co/200/IBXs7NIvn4a1rU1r2lbrLQ/173187/th_logos_t_navy-09.png';
const TRACY_HERO = 'https://static.showit.co/800/aHJ_7e00RV-MrsdMdJddaQ/173187/th-pb-2024-outfit1-25.jpg';
const TRACY_VOICE = 'https://static.showit.co/800/ncWFBwItLHrcgwkcAe-zZQ/173187/tracy_014.jpg';
const ENV_PHOTO = 'https://static.showit.co/800/Sgs6lqwBQVGiD4pFd2x4_g/173187/helena-lopes-rgpqnvoicdg-unsplash.jpg';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)', color: 'var(--near-black)' }}>
      {/* NAV */}
      <nav className="v4-nav">
        <div className="v4-nav-inner">
          <Link href="/" className="v4-logo">
            <img src={LOGO} alt="Tracy Harris" />
          </Link>
          <Link href="/quiz" className="v4-nav-link">Take the assessment</Link>
        </div>
      </nav>

      {/* HERO — cream, split with Tracy portrait */}
      <section style={{ background: 'var(--cream)', padding: '60px 0 100px' }}>
        <div
          className="v4-wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          <div>
            <span className="script-label">freedom by design</span>
            <p className="v4-label" style={{ marginTop: '8px' }}>A Freedom Filled® experience</p>
            <h1 className="heading-hero" style={{ marginBottom: '24px' }}>
              What does your Human Design say about the business you were <em>meant</em> to build?
            </h1>
            <p className="v4-body" style={{ color: 'var(--dark-teal)', fontSize: '17px', lineHeight: '1.6', marginBottom: '32px' }}>
              Tracy Harris uses Human Design as one of many tools to help women build sustainable, freedom-filled businesses. In under 3 minutes, discover your type and the Freedom Strategy that fits the way you were designed to work.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '48px' }}>
              <Link href="/quiz" className="btn btn-sage">Start the assessment</Link>
              <a href="#how" className="btn btn-outline">How it works</a>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '60px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(36,53,49,0.15)',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div className="v4-stat">3 min</div>
                <span className="v4-stat-label">Quick assessment</span>
              </div>
              <div>
                <div className="v4-stat">5</div>
                <span className="v4-stat-label">HD types</span>
              </div>
              <div>
                <div className="v4-stat">1</div>
                <span className="v4-stat-label">Strategy for you</span>
              </div>
            </div>
          </div>
          <div>
            <img
              src={TRACY_HERO}
              alt="Tracy Harris"
              style={{ width: '100%', height: '620px', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </div>
      </section>

      {/* PREMISE — white, editorial */}
      <section style={{ background: 'var(--white)', padding: '100px 0' }} id="how">
        <div className="v4-wrap narrow">
          <span className="script-label">the premise</span>
          <h2 className="heading-section" style={{ marginBottom: '32px' }}>
            Your Human Design isn&apos;t a personality label. It&apos;s a <em>blueprint</em> for how you&apos;re wired to work.
          </h2>
          <p className="body-text" style={{ color: 'var(--dark-teal)', fontSize: '17px', lineHeight: '1.75', marginBottom: '20px' }}>
            Most business advice is written for a default person who doesn&apos;t exist. Hustle harder. Wake at 5am. Post every day. Grind until it clicks.
          </p>
          <p className="body-text" style={{ color: 'var(--dark-teal)', fontSize: '17px', lineHeight: '1.75', marginBottom: '20px' }}>
            Human Design says the opposite. You have a specific energy type. A specific decision-making authority. A profile that describes how you learn, lead, and connect. When your business is built against your design, it feels heavy and extractive. When it&apos;s built with it, it feels generative and sustainable.
          </p>
          <p className="body-text" style={{ color: 'var(--dark-teal)', fontSize: '19px', lineHeight: '1.65', marginBottom: 0 }}>
            This assessment reveals your type, your strategy, and the one shift that changes how you show up in your business. It takes three minutes. The birth data is what makes it real.
          </p>
        </div>
      </section>

      {/* TYPES — dark teal, the one accent section */}
      <section style={{ background: 'var(--dark-teal)', color: 'var(--white)', padding: '100px 0' }}>
        <div className="v4-wrap" style={{ textAlign: 'center' }}>
          <span className="script-label" style={{ color: 'var(--sage)' }}>five types</span>
          <h2
            className="heading-section"
            style={{ color: 'var(--white)', marginBottom: '24px' }}
          >
            One of these is how you&apos;re designed to <em>build</em>.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '16px',
              lineHeight: '1.7',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '560px',
              margin: '0 auto 64px',
            }}
          >
            Each type has a distinct strategy, energy, and way of making decisions. Your chart tells you which one you are.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              maxWidth: '1100px',
              margin: '0 auto',
              textAlign: 'left',
            }}
          >
            {TYPES.map((t) => (
              <div
                key={t.name}
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '40px 32px',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'border-color 0.3s ease',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Editors Note Regular', serif",
                    fontSize: '64px',
                    lineHeight: 1,
                    color: 'var(--sage)',
                    marginBottom: '12px',
                  }}
                >
                  {t.pct}
                </div>
                <span className="v4-stat-label" style={{ marginBottom: '18px' }}>of the population</span>
                <h3
                  style={{
                    fontFamily: "'Editors Note Regular', serif",
                    fontWeight: 400,
                    fontSize: '32px',
                    lineHeight: 1.1,
                    color: 'var(--white)',
                    marginBottom: '10px',
                  }}
                >
                  {t.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '15px',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  {t.gist}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE BREAK */}
      <section style={{ background: 'var(--cream)', lineHeight: 0 }}>
        <img
          src={ENV_PHOTO}
          alt="Returning to centre"
          style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
        />
      </section>

      {/* TRACY VOICE — cream, split with photo */}
      <section style={{ background: 'var(--white)', padding: '100px 0' }}>
        <div
          className="v4-wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: '42% 1fr',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          <div>
            <img
              src={TRACY_VOICE}
              alt="Tracy Harris"
              style={{
                width: '100%',
                height: '560px',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          </div>
          <div>
            <span className="script-label">a note from Tracy</span>
            <p
              style={{
                fontFamily: "'Editors Note Regular', serif",
                fontSize: 'clamp(32px, 3.8vw, 55px)',
                lineHeight: 1.2,
                color: 'var(--dark-teal)',
                margin: '16px 0 32px',
              }}
            >
              The first time I had my chart read, I cried. Not because it was dramatic. Because it finally explained why the things that had felt wrong, had felt <em style={{ fontFamily: "'Editors Note Light Italic', serif", fontStyle: 'italic' }}>wrong</em>.
            </p>
            <p style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '17px', lineHeight: 1.7, color: 'var(--dark-teal)', marginBottom: '20px' }}>
              Your design isn&apos;t a cage. It&apos;s permission.
            </p>
            <p style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '17px', lineHeight: 1.7, color: 'var(--dark-teal)', marginBottom: '20px' }}>
              Permission to stop forcing yourself into someone else&apos;s business model. Permission to build at the pace your energy can actually sustain. Permission to lead in the way you&apos;re quietly, already, best at.
            </p>
            <p style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '17px', lineHeight: 1.7, color: 'var(--dark-teal)', marginBottom: '32px' }}>
              Take the three minutes. See what your design has been trying to tell you all along.
            </p>
            <p style={{ fontFamily: "'Editors Note Light Italic', serif", fontStyle: 'italic', fontSize: '24px', color: 'var(--dark-teal)', marginBottom: '32px' }}>
              Xx Tracy
            </p>
            <Link href="/quiz" className="btn btn-sage">Reveal my Freedom Blueprint</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--dark-teal)', padding: '40px 0', color: 'rgba(255,255,255,0.6)' }}>
        <div
          className="v4-wrap"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}
        >
          <div style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            © 2026 Tracy Harris Co · Freedom Filled® is a registered trademark
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="https://tracyharris.co" style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              tracyharris.co
            </a>
            <a href="https://instagram.com/tracyharrisco" style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const TYPES = [
  { name: 'Manifestor', pct: '8%', gist: 'Initiators. You start things others finish. Strategy: inform before you move. Business strength: creating from nothing.' },
  { name: 'Generator', pct: '37%', gist: 'Life-force workers. Respond, then commit. Your sacral response is your business compass. Mastery is the play.' },
  { name: 'Manifesting Generator', pct: '33%', gist: 'Speed and multi-passion. Build one vehicle for all of it. Your trap: starting everything, finishing three.' },
  { name: 'Projector', pct: '20%', gist: 'Wisdom-holders. Wait for the invitation. Not built for hustle, built for insight. Business around wisdom, not hours.' },
  { name: 'Reflector', pct: '1%', gist: 'Mirrors of community. 28-day cycles for decisions. Build a business that flows with the moon, not against it.' },
];
