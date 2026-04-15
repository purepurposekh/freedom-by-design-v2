import Link from 'next/link';
import QuizForm from '@/components/QuizForm';

export default function QuizPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--deep-teal)', color: 'var(--canvas)' }}>
      {/* NAV */}
      <nav
        style={{
          padding: '20px 0',
          borderBottom: '1px solid var(--border-dark)',
          background: 'rgba(35, 54, 53, 0.92)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div className="v4-nav-inner">
          <Link href="/" className="v4-logo">Tracy Harris</Link>
          <span className="v4-stat-label" style={{ marginTop: 0 }}>Freedom by Design™</span>
        </div>
      </nav>

      {/* QUIZ */}
      <main style={{ padding: '80px 0 120px' }}>
        <div className="v4-wrap narrow">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="v4-label" style={{ textAlign: 'center' }}>Three minutes. That&apos;s it.</p>
            <h1
              className="v4-h2"
              style={{ color: 'var(--canvas)', marginBottom: '20px', textAlign: 'center' }}
            >
              Your <em>Freedom Blueprint</em>
            </h1>
            <p
              className="v4-lead"
              style={{
                color: 'var(--text-on-dark-muted)',
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              Birth data is what makes Human Design real. The more accurate your birth time, the more accurate your result. If you don&apos;t know it exactly, give your best guess, Tracy&apos;s Freedom Strategy still applies.
            </p>
          </div>
          <QuizForm />
        </div>
      </main>
    </div>
  );
}
