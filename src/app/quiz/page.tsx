import Link from 'next/link';
import QuizForm from '@/components/QuizForm';

const LOGO = 'https://static.showit.co/200/IBXs7NIvn4a1rU1r2lbrLQ/173187/th_logos_t_navy-09.png';

export default function QuizPage() {
  return (
    <div style={{ background: 'var(--cream)', color: 'var(--near-black)', minHeight: '100vh' }}>
      {/* NAV */}
      <nav className="v4-nav">
        <div className="v4-nav-inner">
          <Link href="/" className="v4-logo">
            <img src={LOGO} alt="Tracy Harris" />
          </Link>
          <span className="v4-stat-label" style={{ marginTop: 0 }}>
            Freedom by Design
          </span>
        </div>
      </nav>

      {/* QUIZ */}
      <main style={{ padding: '80px 0 120px' }}>
        <div className="v4-wrap narrow" style={{ textAlign: 'center' }}>
          <span className="script-label">three minutes</span>
          <h1 className="heading-hero" style={{ margin: '12px 0 20px' }}>
            Your Human Design, <em>read</em>.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '17px',
              lineHeight: 1.6,
              color: 'var(--dark-teal)',
              maxWidth: '520px',
              margin: '0 auto 56px',
            }}
          >
            Enter your birth data. We calculate your chart and send you a read of what it means for the way you build, sell, and lead. The more accurate your birth time, the more accurate your chart. If you don&apos;t know it exactly, a best guess still works.
          </p>
          <div style={{ textAlign: 'left' }}>
            <QuizForm />
          </div>
        </div>
      </main>
    </div>
  );
}
