'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { ChartData } from '@/app/api/calculate/route';
import {
  TYPE_CONTENT,
  STRATEGY_CONTENT,
  AUTHORITY_CONTENT,
  PROFILE_CONTENT,
  FRESH_CONTENT,
  BUSINESS_CONTENT,
  NOT_SELF_CONTENT,
} from '@/lib/content';
import type { HDType, Authority } from '@/lib/types';
import { loadChartData, stripDataParamFromCurrentUrl } from '@/lib/chart-storage';

export default function BlueprintClient() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    stripDataParamFromCurrentUrl();

    try {
      setChartData(loadChartData());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (chartData) {
      const timer = setTimeout(() => window.print(), 800);
      return () => clearTimeout(timer);
    }
  }, [chartData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading blueprint...
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-brand-bg">
        <h1 className="text-3xl font-bold text-brand-dark mb-4">Please complete the quiz first</h1>
        <p className="text-brand-dark/60 mb-8 max-w-md">
          Your blueprint depends on chart data stored in this browser session. Start with the quiz to generate it.
        </p>
        <Link
          href="/quiz"
          className="bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-terracotta/90 transition-colors"
        >
          Go to the Quiz
        </Link>
      </div>
    );
  }

  const hdType = chartData.type as HDType;
  const typeContent = TYPE_CONTENT[hdType];
  const strategyContent = STRATEGY_CONTENT[chartData.strategy];
  const authorityContent = AUTHORITY_CONTENT[chartData.authority as Authority];
  const profileContent = PROFILE_CONTENT[chartData.profile];
  const freshContent = FRESH_CONTENT[hdType];
  const businessContent = BUSINESS_CONTENT[hdType];
  const notSelfContent = NOT_SELF_CONTENT[hdType];

  // Fallback not-self/signature from content if missing in chartData (older sessions)
  const NOT_SELF_MAP: Record<string, string> = { Manifestor: 'Anger', Generator: 'Frustration', 'Manifesting Generator': 'Frustration and Anger', Projector: 'Bitterness', Reflector: 'Disappointment' };
  const SIG_MAP: Record<string, string> = { Manifestor: 'Peace', Generator: 'Satisfaction', 'Manifesting Generator': 'Satisfaction and Peace', Projector: 'Success', Reflector: 'Delight' };
  const notSelfTheme = chartData.notSelfTheme || NOT_SELF_MAP[chartData.type] || '';
  const signature = chartData.signature || SIG_MAP[chartData.type] || '';

  const stats = [
    { label: 'Type', value: chartData.type },
    { label: 'Strategy', value: chartData.strategy },
    { label: 'Authority', value: chartData.authority },
    { label: 'Profile', value: chartData.profile },
    { label: 'Not-Self Theme', value: notSelfTheme },
    { label: 'Aligned State', value: signature },
  ];

  return (
    <div
      style={{
        fontFamily: 'Georgia, serif',
        color: '#243531',
        background: '#fff',
        maxWidth: '210mm',
        margin: '0 auto',
        padding: '16mm 16mm 12mm',
        fontSize: '11pt',
        lineHeight: '1.5',
      }}
    >
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 12mm 14mm; }
          body { margin: 0; }
        }
        .section-box {
          background: #f9f6f1;
          border-radius: 8px;
          padding: 14px 16px;
          margin-bottom: 14px;
        }
        .section-heading {
          font-size: 13pt;
          font-weight: bold;
          color: #243531;
          margin: 0 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 14px;
        }
        .stat-card {
          background: #f9f6f1;
          border-radius: 8px;
          padding: 10px 12px;
          border-top: 3px solid #3d6b61;
        }
        .stat-label {
          font-size: 7pt;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #788e75;
          margin-bottom: 3px;
        }
        .stat-value {
          font-size: 12pt;
          font-weight: bold;
          color: #243531;
        }
        .body-text {
          font-size: 9.5pt;
          color: #3a3a3a;
          line-height: 1.6;
          margin: 0 0 6px;
        }
        .divider {
          border: none;
          border-top: 1px solid #ddd8d2;
          margin: 14px 0;
        }
        .cta-box {
          background: #243531;
          color: #fff;
          border-radius: 8px;
          padding: 14px 16px;
          margin-top: 16px;
        }
        .cta-heading {
          font-size: 12pt;
          font-weight: bold;
          margin: 0 0 8px;
        }
        .cta-link {
          font-size: 9pt;
          color: #ddd8d2;
          display: block;
          margin-bottom: 4px;
        }
        .page-footer {
          margin-top: 20px;
          text-align: center;
          font-size: 8pt;
          color: #888;
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '2px solid #3d6b61', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/th-logo.png" alt="Tracy Harris Co" style={{ height: '48px', width: 'auto' }} />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '14pt', color: '#243531' }}>Freedom by Design™</div>
            <div style={{ fontSize: '9pt', color: '#788e75', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Tracy Harris Co</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '9pt', color: '#788e75' }}>Your Human Design Type</div>
          <div style={{ fontSize: '13pt', fontWeight: 'bold', color: '#ad765b' }}>{chartData.type}</div>
        </div>
      </div>

      {/* Section 1: Human Design stats */}
      <div className="section-heading">Your Human Design</div>
      <div className="stat-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Section 2: Freedom Strategy */}
      <div className="section-box">
        <div className="section-heading">Your Freedom Strategy</div>
        {typeContent && (
          <>
            <p className="body-text" style={{ fontStyle: 'italic', fontWeight: 'bold', color: '#3d6b61', marginBottom: '8px' }}>{typeContent.tagline}</p>
            {typeContent.body.split('\n\n').map((para, i) => (
              <p className="body-text" key={i}>{para}</p>
            ))}
          </>
        )}
        {strategyContent && (
          <p className="body-text" style={{ marginTop: '6px', color: '#555' }}>
            <strong>Strategy — {strategyContent.name}:</strong> {strategyContent.explanation.split('\n\n')[0]}
          </p>
        )}
      </div>

      {/* Section 3: FRESH Alignment */}
      {freshContent && (
        <div className="section-box">
          <div className="section-heading">Your FRESH Alignment</div>
          <p className="body-text">{freshContent.body}</p>
        </div>
      )}

      {/* Section 4: Freedom Filled Business */}
      {businessContent && (
        <div className="section-box">
          <div className="section-heading">Your Freedom Filled Business</div>
          <p className="body-text">{businessContent.model}</p>
          <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
            {businessContent.tips.map((tip, i) => (
              <li className="body-text" key={i} style={{ marginBottom: '4px' }}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Authority note */}
      {authorityContent && (
        <div style={{ marginBottom: '14px', padding: '10px 14px', borderLeft: '3px solid #ad765b', background: '#fdf8f4' }}>
          <div style={{ fontSize: '8pt', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#788e75', marginBottom: '4px' }}>Your Authority — {authorityContent.name}</div>
          <p className="body-text" style={{ margin: 0 }}>{authorityContent.explanation.split('\n\n')[0]}</p>
        </div>
      )}

      {/* Profile note */}
      {profileContent && (
        <div style={{ marginBottom: '14px', padding: '10px 14px', borderLeft: '3px solid #788e75', background: '#f5f9f5' }}>
          <div style={{ fontSize: '8pt', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#788e75', marginBottom: '4px' }}>Your Profile — {profileContent.name}</div>
          <p className="body-text" style={{ margin: 0 }}>{profileContent.explanation.split('\n\n')[0]}</p>
        </div>
      )}

      {/* Not-Self reminder */}
      {notSelfContent && (
        <div style={{ marginBottom: '14px', padding: '10px 14px', background: '#f9f6f1', borderRadius: '6px', display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '8pt', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#788e75', marginBottom: '3px' }}>Not-Self Theme</div>
            <p className="body-text" style={{ margin: 0, fontWeight: 'bold' }}>{notSelfTheme}</p>
            <p className="body-text" style={{ margin: '3px 0 0', fontSize: '9pt' }}>{notSelfContent.sign}</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '8pt', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#788e75', marginBottom: '3px' }}>Aligned State</div>
            <p className="body-text" style={{ margin: 0, fontWeight: 'bold' }}>{signature}</p>
            <p className="body-text" style={{ margin: '3px 0 0', fontSize: '9pt' }}>{notSelfContent.environment}</p>
          </div>
        </div>
      )}

      {/* Divider with FFB symbol */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0 14px' }}>
        <hr className="divider" style={{ flex: 1, margin: 0 }} />
        <img src="/ffb-symbol.svg" alt="Freedom Filled Business" style={{ height: '24px', width: 'auto', opacity: 0.5 }} />
        <hr className="divider" style={{ flex: 1, margin: 0 }} />
      </div>

      {/* CTA */}
      <div className="cta-box">
        <div className="cta-heading">Ready to build your Freedom Filled Business?</div>
        <span className="cta-link">Join the Freedom Filled Business Workshop — tracyharris.co/workshop</span>
        <span className="cta-link">Learn more about Freedom Filled Business — tracyharris.co</span>
      </div>

      {/* Footer */}
      <div className="page-footer">
        © Tracy Harris Co | freedom-by-design.pages.dev
      </div>
    </div>
  );
}
