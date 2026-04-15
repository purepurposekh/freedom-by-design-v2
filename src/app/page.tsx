import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-charcoal">
      {/* NAV */}
      <nav className="v4-nav">
        <div className="v4-nav-inner">
          <Link href="/" className="v4-logo">Tracy Harris</Link>
          <Link href="/quiz" className="v4-nav-link">Take the assessment</Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="v4-section dark relative overflow-hidden"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '180px' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 25% 30%, rgba(110, 142, 119, 0.15), transparent 55%), radial-gradient(circle at 80% 75%, rgba(138, 171, 146, 0.08), transparent 55%)',
          }}
        />
        <div className="v4-wrap relative z-10">
          <p className="v4-label">A Freedom Filled® experience</p>
          <h1 className="v4-display" style={{ color: 'var(--canvas)', marginBottom: '28px' }}>
            What does your Human Design<br />
            say about the business you were <em>meant</em> to build?
          </h1>
          <p
            className="v4-lead"
            style={{ color: 'var(--text-on-dark-muted)', maxWidth: '620px', marginBottom: '48px' }}
          >
            Tracy Harris uses Human Design as one of many tools to help women build sustainable, freedom-filled businesses. In under 3 minutes, discover your type and the Freedom Strategy that fits the way you were designed to work.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '120px' }}>
            <Link href="/quiz" className="v4-btn v4-btn-primary">Start the assessment</Link>
            <a href="#how" className="v4-btn v4-btn-ghost">How it works</a>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '80px',
              paddingTop: '40px',
              borderTop: '1px solid var(--border-dark)',
              maxWidth: '780px',
            }}
          >
            <div>
              <div className="v4-stat" style={{ color: 'var(--canvas)' }}>3 min</div>
              <div className="v4-stat-label">Quick assessment</div>
            </div>
            <div>
              <div className="v4-stat" style={{ color: 'var(--canvas)' }}>5</div>
              <div className="v4-stat-label">Human Design types</div>
            </div>
            <div>
              <div className="v4-stat" style={{ color: 'var(--canvas)' }}>1</div>
              <div className="v4-stat-label">Strategy built for you</div>
            </div>
          </div>
        </div>
      </section>

      {/* PREMISE — the exhale */}
      <section className="v4-section light" id="how">
        <div className="v4-wrap narrow">
          <p className="v4-label">The premise</p>
          <h2 className="v4-h2" style={{ marginBottom: '24px' }}>
            Your Human Design isn&apos;t a personality label. It&apos;s a <em>blueprint</em> for how you&apos;re wired to work.
          </h2>
          <p className="v4-body" style={{ marginBottom: '20px' }}>
            Most business advice is written for a default person who doesn&apos;t exist. Hustle harder. Wake at 5am. Post every day. Grind until it clicks.
          </p>
          <p className="v4-body" style={{ marginBottom: '20px' }}>
            Human Design says the opposite. You have a specific energy type. A specific decision-making authority. A profile that describes how you learn, lead, and connect. When your business is built against your design, it feels heavy and extractive. When it&apos;s built with it, it feels generative and sustainable.
          </p>
          <p className="v4-body v4-lead">
            This assessment reveals your type, your strategy, and the one shift that changes how you show up in your business. It takes three minutes. The birth data is what makes it real.
          </p>
        </div>
      </section>

      {/* TYPES — dark section with cards */}
      <section className="v4-section dark">
        <div className="v4-wrap">
          <p className="v4-label" style={{ textAlign: 'center' }}>Five types</p>
          <h2
            className="v4-h2"
            style={{ color: 'var(--canvas)', textAlign: 'center', marginBottom: '80px' }}
          >
            One of these is how you&apos;re designed to build.
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              maxWidth: '1180px',
              margin: '0 auto',
            }}
          >
            {TYPES.map((t) => (
              <div
                key={t.name}
                style={{
                  background: 'var(--mid-teal)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: '14px',
                  padding: '40px 28px',
                  transition: 'all 500ms var(--ease)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                    fontSize: '64px',
                    lineHeight: '1',
                    color: 'var(--sage-light)',
                    marginBottom: '12px',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {t.pct}
                </div>
                <div className="v4-stat-label" style={{ marginBottom: '18px' }}>
                  of the population
                </div>
                <h3 className="v4-h3" style={{ color: 'var(--canvas)', marginBottom: '10px' }}>
                  {t.name}
                </h3>
                <p
                  style={{
                    color: 'var(--text-on-dark-muted)',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '15px',
                    lineHeight: '1.7',
                  }}
                >
                  {t.gist}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACY VOICE */}
      <section className="v4-section light">
        <div className="v4-wrap narrow">
          <p className="v4-label">A note from Tracy</p>
          <blockquote style={{ margin: '24px 0 48px', padding: 0, border: 'none' }}>
            <p
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              The first time I had my chart read, I cried. Not because it was dramatic. Because it finally explained why the things that had felt wrong, had felt wrong.
            </p>
          </blockquote>
          <p className="v4-body" style={{ marginBottom: '20px' }}>
            Your design isn&apos;t a cage. It&apos;s permission.
          </p>
          <p className="v4-body" style={{ marginBottom: '20px' }}>
            Permission to stop forcing yourself into someone else&apos;s business model. Permission to build at the pace your energy can actually sustain. Permission to lead in the way you&apos;re quietly, already, best at.
          </p>
          <p className="v4-body">
            Take the three minutes. See what your design has been trying to tell you all along.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontStyle: 'italic',
              fontSize: '22px',
              color: 'var(--charcoal)',
              marginTop: '32px',
            }}
          >
            Xx Tracy
          </p>
          <div style={{ marginTop: '48px' }}>
            <Link href="/quiz" className="v4-btn v4-btn-primary">
              Reveal my Freedom Blueprint
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="v4-section dark" style={{ paddingTop: '80px', paddingBottom: '32px' }}>
        <div className="v4-wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '48px',
              marginBottom: '48px',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                  fontSize: '28px',
                  letterSpacing: '0.04em',
                  color: 'var(--canvas)',
                  marginBottom: '8px',
                }}
              >
                Tracy Harris
                <span
                  style={{
                    fontSize: '0.55em',
                    verticalAlign: 'super',
                    color: 'var(--sage)',
                    marginLeft: '2px',
                  }}
                >
                  ®
                </span>
              </p>
              <p
                style={{
                  color: 'var(--text-on-dark-muted)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  maxWidth: '320px',
                }}
              >
                Freedom Filled® Business for women ready to build by design.
              </p>
            </div>
            <div>
              <p className="v4-stat-label" style={{ marginTop: 0, marginBottom: '16px' }}>
                Explore
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <li>
                  <a
                    href="https://tracyharris.co"
                    style={{ color: 'var(--text-on-dark-muted)', fontSize: '14px', textDecoration: 'none' }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="https://tracyharris.co/ffb"
                    style={{ color: 'var(--text-on-dark-muted)', fontSize: '14px', textDecoration: 'none' }}
                  >
                    FFB Mentorship
                  </a>
                </li>
                <li>
                  <a
                    href="https://tracyharris.co/podcast"
                    style={{ color: 'var(--text-on-dark-muted)', fontSize: '14px', textDecoration: 'none' }}
                  >
                    Podcast
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            style={{
              paddingTop: '24px',
              borderTop: '1px solid var(--border-dark)',
              fontSize: '12px',
              color: 'var(--text-on-dark-ghost)',
            }}
          >
            © 2026 Tracy Harris Co. Freedom Filled® is a registered trademark. Human Design method referenced under fair use.
          </div>
        </div>
      </footer>
    </div>
  );
}

const TYPES = [
  {
    name: 'Manifestor',
    pct: '8%',
    gist: 'Initiators. You start things others finish. Strategy: inform before you move. Business strength: creating from nothing.',
  },
  {
    name: 'Generator',
    pct: '37%',
    gist: "Life-force workers. Respond, then commit. Your sacral response is your business compass. Mastery is the play.",
  },
  {
    name: 'Manifesting Generator',
    pct: '33%',
    gist: 'Speed and multi-passion. Build one vehicle for all of it. Your trap: starting everything, finishing three.',
  },
  {
    name: 'Projector',
    pct: '20%',
    gist: 'Wisdom-holders. Wait for the invitation. Not built for hustle, built for insight. Business around wisdom, not hours.',
  },
  {
    name: 'Reflector',
    pct: '1%',
    gist: 'Mirrors of community. 28-day cycles for decisions. Build a business that flows with the moon, not against it.',
  },
];
