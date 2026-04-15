'use client';

import type { ChartData } from '@/app/api/calculate/route';
import {
  TYPE_CONTENT,
  STRATEGY_CONTENT,
  AUTHORITY_CONTENT,
  PROFILE_CONTENT,
  FRESH_CONTENT,
  BUSINESS_CONTENT,
  CENTER_MEANINGS,
} from '@/lib/content';
import type { HDType, Authority } from '@/lib/types';

interface ResultCardProps {
  chartData: ChartData;
}

const CENTER_LABELS: Record<string, string> = {
  Head: 'Head',
  Ajna: 'Ajna',
  Throat: 'Throat',
  G: 'G-Center (Identity)',
  Heart: 'Heart / Ego',
  SolarPlexus: 'Solar Plexus',
  Sacral: 'Sacral',
  Spleen: 'Spleen',
  Root: 'Root',
};

const TYPE_ACCENT: Record<string, string> = {
  Manifestor: 'bg-brand-teal/10 text-brand-teal border-brand-teal/30',
  Generator: 'bg-brand-terracotta/10 text-brand-terracotta border-brand-terracotta/30',
  'Manifesting Generator': 'bg-brand-sage/10 text-brand-sage border-brand-sage/30',
  Projector: 'bg-brand-dark/10 text-brand-dark border-brand-dark/30',
  Reflector: 'bg-brand-blush/20 text-brand-dark border-brand-blush/50',
};

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-6 border border-brand-parchment ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-brand-dark/40 uppercase tracking-wider mb-3 font-medium">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-brand-dark mb-3">{children}</h2>
  );
}

function BodyText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-brand-dark/70 leading-relaxed ${className}`}>{children}</p>
  );
}

export default function ResultCard({ chartData }: ResultCardProps) {
  const typeContent = TYPE_CONTENT[chartData.type as HDType];
  const strategyContent = STRATEGY_CONTENT[chartData.strategy];
  const authorityContent = AUTHORITY_CONTENT[chartData.authority as Authority];
  const profileContent = PROFILE_CONTENT[chartData.profile];
  const freshContent = FRESH_CONTENT[chartData.type as HDType];
  const businessContent = BUSINESS_CONTENT[chartData.type as HDType];
  const accentClass = TYPE_ACCENT[chartData.type] ?? 'bg-brand-parchment text-brand-dark border-brand-parchment';

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">

      {/* ── Section 1: Your Type ──────────────────────────────── */}
      <div className="text-center mb-2">
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium border ${accentClass} mb-4`}>
          {typeContent?.tagline ?? chartData.type}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-2">
          {chartData.type}
        </h1>
        <p className="text-brand-dark/50 text-lg">Your Human Design Type</p>
      </div>

      {typeContent && (
        <SectionCard>
          <SectionLabel>What This Means for You</SectionLabel>
          <p className="text-xl font-semibold text-brand-dark italic mb-4">
            &quot;{typeContent.strategy}&quot;
          </p>
          <BodyText className="mb-4">{typeContent.body}</BodyText>
          {typeContent.expandedBody.split('\n\n').map((para, i) => (
            <BodyText key={i} className="mb-3 last:mb-0">{para}</BodyText>
          ))}
        </SectionCard>
      )}

      {/* ── Section 2: Your Strategy ──────────────────────────── */}
      {strategyContent && (
        <SectionCard>
          <SectionLabel>Your Strategy</SectionLabel>
          <SectionHeading>{strategyContent.name}</SectionHeading>
          <BodyText>{strategyContent.explanation}</BodyText>
        </SectionCard>
      )}

      {/* ── Section 3: Your Authority ─────────────────────────── */}
      {authorityContent && (
        <SectionCard>
          <SectionLabel>Your Authority</SectionLabel>
          <SectionHeading>{authorityContent.name}</SectionHeading>
          <p className="text-sm text-brand-dark/40 mb-3 italic">How you are designed to make decisions</p>
          <BodyText>{authorityContent.explanation}</BodyText>
        </SectionCard>
      )}

      {/* ── Section 4: Your Profile ───────────────────────────── */}
      <SectionCard>
        <SectionLabel>Your Profile</SectionLabel>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl font-bold text-brand-dark">{chartData.profile}</span>
          {profileContent && (
            <span className="text-lg font-semibold text-brand-dark/70">{profileContent.name.replace(/^\d\/\d\s/, '')}</span>
          )}
        </div>
        <p className="text-sm text-brand-dark/40 mb-3 italic">How you show up in your business</p>
        {profileContent ? (
          <BodyText>{profileContent.explanation}</BodyText>
        ) : (
          <BodyText>Your profile shapes how you learn, teach, and build authority in your field.</BodyText>
        )}
      </SectionCard>

      {/* ── Section 5: Your FRESH Alignment ──────────────────── */}
      {freshContent && (
        <SectionCard>
          <SectionLabel>Your FRESH Alignment</SectionLabel>
          <SectionHeading>FRESH Framework Check-In</SectionHeading>
          <BodyText>{freshContent.body}</BodyText>
        </SectionCard>
      )}

      {/* ── Section 6: Building Your Freedom Filled Business ─── */}
      {businessContent && (
        <SectionCard>
          <SectionLabel>Building Your Freedom Filled Business</SectionLabel>
          <SectionHeading>Your Business Model</SectionHeading>
          <BodyText className="mb-5">{businessContent.model}</BodyText>

          <p className="text-sm font-semibold text-brand-dark/60 uppercase tracking-wide mb-3">Three Practical Steps</p>
          <ul className="space-y-3">
            {businessContent.tips.map((tip, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-terracotta/10 text-brand-terracotta text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <BodyText>{tip}</BodyText>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* ── Section 7: Defined Centers ────────────────────────── */}
      {chartData.definedCenters.length > 0 && (
        <SectionCard>
          <SectionLabel>Your Defined Centers</SectionLabel>
          <p className="text-sm text-brand-dark/40 mb-4 italic">
            Defined centers are consistent, reliable forces in your design. They shape how you show up every day.
          </p>
          <div className="space-y-4">
            {chartData.definedCenters.map((center) => {
              const meaning = CENTER_MEANINGS[center];
              return (
                <div key={center} className="flex gap-3">
                  <span className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-brand-parchment text-brand-dark border border-brand-parchment self-start mt-0.5 whitespace-nowrap">
                    {CENTER_LABELS[center] ?? center}
                  </span>
                  {meaning && (
                    <p className="text-sm text-brand-dark/65 leading-relaxed">{meaning}</p>
                  )}
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* ── Section 8: CTA ────────────────────────────────────── */}
      <div className="bg-brand-terracotta rounded-2xl p-8 text-center">
        <p className="text-white/80 text-sm uppercase tracking-wider mb-2 font-medium">Ready to go deeper?</p>
        <h2 className="text-2xl font-bold text-white mb-3">
          Freedom Filled Business
        </h2>
        <p className="text-white/80 mb-6 leading-relaxed max-w-md mx-auto">
          Join Tracy inside Freedom Filled Business and learn how to build a business aligned with your design, your FRESH pillars, and your version of freedom.
        </p>
        <a
          href="https://tracyharris.co/ffb"
          className="inline-block px-8 py-3 bg-white text-brand-terracotta font-bold rounded-full hover:bg-brand-parchment transition-colors"
        >
          Learn More
        </a>
      </div>

    </div>
  );
}
