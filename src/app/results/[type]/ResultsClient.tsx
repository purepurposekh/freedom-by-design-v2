'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Bodygraph, { type GateInfo, PLANET_SYMBOLS, PLANET_ORDER } from '@/components/Bodygraph';
import type { ChartData } from '@/app/api/calculate/route';
import { loadChartData, stripDataParamFromCurrentUrl } from '@/lib/chart-storage';
import {
  TYPE_CONTENT,
  STRATEGY_CONTENT,
  AUTHORITY_CONTENT,
  PROFILE_CONTENT,
  FRESH_CONTENT,
  BUSINESS_CONTENT,
  CENTER_MEANINGS,
  NOT_SELF_CONTENT,
  generateSummary,
} from '@/lib/content';
import type { HDType, Authority } from '@/lib/types';

const TYPE_MAP: Record<string, string> = {
  manifestor: 'Manifestor',
  generator: 'Generator',
  'manifesting-generator': 'Manifesting Generator',
  projector: 'Projector',
  reflector: 'Reflector',
};

const CENTRE_DISPLAY_NAMES: Record<string, string> = {
  Head: 'Head',
  Ajna: 'Ajna',
  Throat: 'Throat',
  G: 'G Center',
  Heart: 'Heart (Ego)',
  SolarPlexus: 'Solar Plexus',
  Sacral: 'Sacral',
  Spleen: 'Spleen',
  Root: 'Root',
};

const STRATEGY_ONELINERS: Record<string, string> = {
  'To Inform': "Tell people what you're doing before you act.",
  'To Respond': 'Wait for what genuinely excites you, then move.',
  'Wait for the Invitation': 'Be visible. Let the right people come to you.',
  'Wait a Lunar Cycle': 'Give yourself 28 days for every big decision.',
};

const AUTHORITY_ONELINERS: Record<string, string> = {
  Emotional: 'Your clarity comes in waves. Sleep on it.',
  Sacral: 'Your gut knows. Trust the yes or no.',
  Splenic: 'One quiet hit in the moment. Listen and act.',
  'Ego Manifested': 'Your heart makes the call. Commit from want, not should.',
  'Ego Projected': 'Talk it through with a trusted listener first.',
  'Self-Projected': 'Hear your own voice say it out loud.',
  Mental: 'Change your environment to find your clarity.',
  Lunar: 'Give yourself 28 days across different states.',
};

const STAT_ICONS: Record<string, string> = {
  Type: '◈',
  Strategy: '↻',
  Authority: '◎',
  Profile: '⋈',
  'Not-Self Theme': '◯',
  'Aligned State': '◇',
};


function renderHighlightedParagraphs(text: string) {
  return text.split('\n\n').map((para, i) => {
    const match = para.match(/^(.*?[.!?])([\s\S]*)$/);
    if (!match) {
      return <p key={i} className="mb-3 last:mb-0 text-brand-dark/75">{para}</p>;
    }
    const [, first, rest] = match;
    return (
      <p key={i} className="mb-3 last:mb-0">
        <span className="font-medium text-brand-dark">{first}</span>
        {rest && <span className="text-brand-dark/75">{rest}</span>}
      </p>
    );
  });
}

function StatCard({
  label,
  value,
  oneLiner,
}: {
  label: string;
  value: string;
  oneLiner: string;
}) {
  const icon = STAT_ICONS[label] ?? '◆';
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #243531, #788e75)',
        borderRadius: '1rem',
        padding: '1px',
      }}
    >
      <div
        className="bg-white rounded-2xl p-6 flex flex-col gap-2 h-full"
        style={{ borderRadius: 'calc(1rem - 1px)' }}
      >
        <div className="flex items-start justify-between mb-1">
          <span className="text-xs uppercase tracking-widest text-brand-sage font-medium">{label}</span>
          <span className="text-2xl text-brand-parchment leading-none select-none" aria-hidden="true">
            {icon}
          </span>
        </div>
        <span className="font-bold text-brand-dark leading-tight" style={{ fontSize: '1.75rem' }}>
          {value}
        </span>
        <span className="text-sm text-brand-dark/60 leading-snug">{oneLiner}</span>
      </div>
    </div>
  );
}

function ExpandableCard({
  title,
  isExpanded,
  onToggle,
  children,
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-white rounded-2xl border border-brand-parchment p-7 flex flex-col transition-all duration-200 hover:shadow-md hover:border-brand-sage/40"
      style={{
        borderLeft: '4px solid #ad765b',
        boxShadow: '0 1px 3px rgba(36,53,49,0.06), 0 2px 8px rgba(36,53,49,0.04)',
      }}
    >
      <h3 className="font-serif-display font-semibold text-brand-dark mb-4 text-lg leading-snug">{title}</h3>
      <div className="flex-1">
        <div className={`text-sm leading-relaxed${isExpanded ? '' : ' line-clamp-3'}`}>
          {children}
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="mt-5 text-xs font-semibold text-brand-terracotta hover:text-brand-dark transition-colors text-left"
      >
        {isExpanded ? 'Show less ↑' : 'Read more ↓'}
      </button>
    </div>
  );
}

export default function ResultsClient({ typeSlug }: { typeSlug: string }) {
  const typeName = TYPE_MAP[typeSlug] ?? 'Unknown';
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hdExpanded, setHdExpanded] = useState(true);
  const [fbExpanded, setFbExpanded] = useState(true);

  useEffect(() => {
    stripDataParamFromCurrentUrl();

    try {
      setChartData(loadChartData());
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="animate-pulse text-brand-dark/40">Loading your chart...</div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif-display text-3xl font-bold text-brand-dark mb-4">You are a {typeName}</h1>
        <p className="text-brand-dark/60 mb-8 max-w-md">
          Please complete the quiz first. Your chart data is only available for the current session and is no longer passed in the URL.
        </p>
        <Link
          href="/quiz"
          className="bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-terracotta/90 transition-colors"
        >
          Take the Quiz
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

  const definedCenterMeanings = (chartData.definedCenters ?? [])
    .filter((c) => CENTER_MEANINGS[c])
    .map((c) => ({ key: c, name: CENTRE_DISPLAY_NAMES[c] ?? c, meaning: CENTER_MEANINGS[c] }));

  const personalityGatesList: GateInfo[] = chartData.personalityGates
    ? Object.entries(chartData.personalityGates).map(([planet, info]) => ({
        planet,
        gate: info.gate,
        line: info.line,
      }))
    : [];

  const designGatesList: GateInfo[] = chartData.designGates
    ? Object.entries(chartData.designGates).map(([planet, info]) => ({
        planet,
        gate: info.gate,
        line: info.line,
      }))
    : [];

  const bodygraphChannels = (chartData.activeChannels ?? []).map((ch) => ({
    gate1: ch.gate1,
    gate2: ch.gate2,
  }));

  const profileDotIdx = profileContent ? profileContent.explanation.indexOf('.') : -1;
  const profileOneLiner =
    profileDotIdx > 0
      ? profileContent!.explanation.slice(0, profileDotIdx)
      : chartData.profile;

  const summary = generateSummary(hdType, chartData.authority, chartData.profile);

  // Build planet → gate lookups for the planetary table
  const personalityByPlanet: Record<string, GateInfo> = {};
  for (const g of personalityGatesList) personalityByPlanet[g.planet] = g;
  const designByPlanet: Record<string, GateInfo> = {};
  for (const g of designGatesList) designByPlanet[g.planet] = g;

  const hdToggle = () => setHdExpanded((v) => !v);
  const fbToggle = () => setFbExpanded((v) => !v);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Nav */}
      <nav className="no-print px-6 py-5 border-b border-brand-parchment bg-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/th-logo.png" alt="Tracy Harris Co" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                window.open('/blueprint', '_blank');
              }}
              className="text-sm font-medium text-brand-dark border border-brand-parchment rounded-lg px-3 py-1.5 hover:border-brand-dark transition-colors"
            >
              Download Your Blueprint
            </button>
            <Link
              href="/quiz"
              className="text-sm text-brand-dark/50 hover:text-brand-dark transition-colors"
            >
              Retake quiz
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero: Your Human Design */}
        <div
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #fbfaf8 0%, #ece7de 100%)' }}
        >
          <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-brand-sage mb-3">Your Human Design</p>
              <h1 className="font-serif-display text-5xl md:text-6xl font-bold text-brand-dark leading-tight mb-4">
                You are a<br />
                <span style={{ color: '#ad765b' }}>{chartData.type}</span>
              </h1>
              {typeContent && (
                <p className="text-brand-dark/60 text-lg italic">{typeContent.tagline}</p>
              )}
            </div>
            <div className="shrink-0">
              <div
                className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white"
                style={{ boxShadow: '0 8px 40px rgba(36,53,49,0.18)' }}
              >
                <img
                  src="/tracy-pro-shot-web.jpg"
                  alt="Tracy Harris"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-center text-xs text-brand-dark/40 mt-3">Tracy Harris</p>
            </div>
          </div>
        </div>

        {/* Section 1: Cards + Bodygraph */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Stat cards — 2 col mobile, 3 col md+ */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <StatCard label="Type" value={chartData.type} oneLiner={typeContent?.tagline ?? ''} />
              <StatCard label="Strategy" value={chartData.strategy} oneLiner={STRATEGY_ONELINERS[chartData.strategy] ?? ''} />
              <StatCard label="Authority" value={chartData.authority} oneLiner={AUTHORITY_ONELINERS[chartData.authority] ?? ''} />
              <StatCard label="Profile" value={chartData.profile} oneLiner={profileOneLiner} />
              <StatCard label="Not-Self Theme" value={chartData.notSelfTheme} oneLiner={notSelfContent?.sign ?? ''} />
              <StatCard label="Aligned State" value={chartData.signature} oneLiner={notSelfContent?.environment ?? ''} />
            </div>

            {/* Summary banner */}
            <div
              className="rounded-2xl p-7 mb-12 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #ece7de 0%, #f4f0ea 100%)' }}
            >
              <span
                className="absolute top-2 left-4 text-7xl leading-none select-none"
                style={{ color: '#ad765b', opacity: 0.18, fontFamily: 'Georgia, serif' }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="font-serif-display text-brand-dark leading-relaxed text-lg font-medium italic relative z-10 pl-4">
                {summary}
              </p>
            </div>

            {/* Bodygraph LEFT + Planetary table RIGHT */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              {/* Left: Bodygraph SVG */}
              <div className="md:w-[55%] w-full">
                <Bodygraph
                  showTable={false}
                  definedCenters={chartData.definedCenters ?? []}
                  activeChannels={bodygraphChannels}
                  personalityGates={personalityGatesList}
                  designGates={designGatesList}
                />
              </div>
              {/* Right: Planetary table */}
              <div className="md:w-[45%] w-full">
                {(personalityGatesList.length > 0 || designGatesList.length > 0) && (
                  <div className="bg-brand-bg rounded-2xl p-5 border border-brand-parchment h-full">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-dark/40 mb-4">
                      Planetary Gates
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4">
                      <div>
                        <p className="text-[10px] font-semibold text-brand-terracotta uppercase tracking-wider mb-2 text-center">
                          Design
                        </p>
                        {PLANET_ORDER.map((planet) => {
                          const g = designByPlanet[planet];
                          if (!g) return null;
                          return (
                            <div
                              key={planet}
                              className="flex items-center gap-1 py-1.5 border-b border-brand-parchment/60 text-xs"
                            >
                              <span className="text-brand-terracotta w-4 text-center flex-shrink-0">
                                {PLANET_SYMBOLS[planet] ?? planet}
                              </span>
                              <span className="text-brand-dark/50 flex-1 capitalize text-[10px]">{planet}</span>
                              <span className="text-brand-dark font-medium">{g.gate}.{g.line}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-brand-dark uppercase tracking-wider mb-2 text-center">
                          Personality
                        </p>
                        {PLANET_ORDER.map((planet) => {
                          const g = personalityByPlanet[planet];
                          if (!g) return null;
                          return (
                            <div
                              key={planet}
                              className="flex items-center gap-1 py-1.5 border-b border-brand-parchment/60 text-xs"
                            >
                              <span className="text-brand-dark/50 w-4 text-center flex-shrink-0">
                                {PLANET_SYMBOLS[planet] ?? planet}
                              </span>
                              <span className="text-brand-dark/50 flex-1 capitalize text-[10px]">{planet}</span>
                              <span className="text-brand-dark font-medium">{g.gate}.{g.line}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* HD interpretation cards — group expand */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif-display text-xl font-semibold text-brand-dark">
                Your Human Design
              </h2>
              <button
                type="button"
                onClick={hdToggle}
                className="text-xs font-semibold text-brand-terracotta hover:text-brand-dark transition-colors"
              >
                {hdExpanded ? 'Collapse all ↑' : 'Expand all ↓'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExpandableCard title="Your Type" isExpanded={hdExpanded} onToggle={hdToggle}>
                {typeContent ? renderHighlightedParagraphs(typeContent.expandedBody) : <p>No content available.</p>}
              </ExpandableCard>

              <ExpandableCard title="Your Strategy" isExpanded={hdExpanded} onToggle={hdToggle}>
                {strategyContent ? (
                  <>
                    <p className="font-medium text-brand-dark mb-2">{strategyContent.name}</p>
                    {renderHighlightedParagraphs(strategyContent.explanation)}
                  </>
                ) : (
                  <p className="text-brand-dark/70">Strategy: {chartData.strategy}</p>
                )}
              </ExpandableCard>

              <ExpandableCard title="Your Authority" isExpanded={hdExpanded} onToggle={hdToggle}>
                {authorityContent ? (
                  <>
                    <p className="font-medium text-brand-dark mb-2">{authorityContent.name}</p>
                    {renderHighlightedParagraphs(authorityContent.explanation)}
                  </>
                ) : (
                  <p className="text-brand-dark/70">Authority: {chartData.authority}</p>
                )}
              </ExpandableCard>

              <ExpandableCard title="Your Profile" isExpanded={hdExpanded} onToggle={hdToggle}>
                {profileContent ? (
                  <>
                    <p className="font-medium text-brand-dark mb-2">{profileContent.name}</p>
                    {renderHighlightedParagraphs(profileContent.explanation)}
                  </>
                ) : (
                  <p className="text-brand-dark/70">Profile: {chartData.profile}</p>
                )}
              </ExpandableCard>
            </div>
          </div>
        </section>

        {/* Divider band */}
        <div
          className="py-8 px-6 text-center text-white"
          style={{ background: 'linear-gradient(135deg, #243531 0%, #3a5a52 100%)' }}
        >
          <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Powered by Tracy Harris Co</p>
          <div className="flex items-center justify-center gap-3 mb-1">
            <img src="/ffb-symbol.svg" alt="Freedom Filled Business" className="h-8 w-auto opacity-80" style={{filter: "brightness(0) invert(1)"}} />
            <h2 className="font-serif-display text-2xl font-semibold italic text-white">Your Freedom Blueprint</h2>
          </div>
          <p className="text-white/70 text-sm mt-2">
            Where Human Design meets the Freedom Filled<sup className="text-xs font-normal">&reg;</sup> Business method
          </p>
        </div>

        {/* Section 2: Your Freedom Blueprint */}
        <section className="bg-brand-parchment px-6 py-12">
          <div className="max-w-5xl mx-auto">

            {/* Intro */}
            <div className="flex flex-col md:flex-row gap-8 mb-10 items-start">
              <div className="md:w-3/5">
                <h2 className="font-serif-display text-4xl font-bold text-brand-dark mb-5 leading-tight">
                  Your Freedom Blueprint
                </h2>
                <p className="text-brand-dark/70 leading-relaxed mb-6 text-base">
                  This is where Human Design meets Tracy&apos;s method. Your type tells you HOW
                  you&apos;re wired. Your Freedom Blueprint shows you how to BUILD with it.
                </p>
                <div className="inline-block border border-brand-dark/20 rounded-xl px-4 py-2">
                  <span className="font-serif-display text-sm font-bold text-brand-dark tracking-tight">
                    Freedom Filled
                    <sup className="text-xs font-normal">&reg;</sup>{' '}
                    Business
                  </span>
                </div>
              </div>
              <div className="md:w-2/5 w-full">
                <img
                  src="/tracy-pro-shot-web.jpg"
                  alt="Tracy Harris"
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Freedom Blueprint cards — group expand */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif-display text-xl font-semibold text-brand-dark">
                Freedom by Design™
              </h2>
              <button
                type="button"
                onClick={fbToggle}
                className="text-xs font-semibold text-brand-terracotta hover:text-brand-dark transition-colors"
              >
                {fbExpanded ? 'Collapse all ↑' : 'Expand all ↓'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExpandableCard title="Your Freedom Strategy" isExpanded={fbExpanded} onToggle={fbToggle}>
                {typeContent ? (
                  <>
                    <p className="font-medium text-brand-dark mb-2">{typeContent.tagline}</p>
                    {renderHighlightedParagraphs(typeContent.body)}
                    {renderHighlightedParagraphs(typeContent.expandedBody)}
                  </>
                ) : (
                  <p className="text-brand-dark/70">No content available.</p>
                )}
              </ExpandableCard>

              <ExpandableCard title="Your FRESH Alignment" isExpanded={fbExpanded} onToggle={fbToggle}>
                {freshContent ? (
                  <p className="text-brand-dark/70">{freshContent.body}</p>
                ) : (
                  <p className="text-brand-dark/70">No content available.</p>
                )}
              </ExpandableCard>

              <ExpandableCard title="Your Freedom Filled Business" isExpanded={fbExpanded} onToggle={fbToggle}>
                {businessContent ? (
                  <>
                    <p className="text-brand-dark/70 mb-3">{businessContent.model}</p>
                    <ul className="space-y-2">
                      {businessContent.tips.map((tip, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-brand-terracotta font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
                          <span className="text-brand-dark/70">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-brand-dark/70">No content available.</p>
                )}
              </ExpandableCard>

              <ExpandableCard title="Your Defined Centers" isExpanded={fbExpanded} onToggle={fbToggle}>
                {definedCenterMeanings.length > 0 ? (
                  <div className="space-y-3">
                    {definedCenterMeanings.map((centre) => (
                      <div key={centre.key}>
                        <p className="font-medium text-brand-dark mb-1">{centre.name}</p>
                        <p className="text-brand-dark/70">{centre.meaning}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-brand-dark/70">
                    No defined centers. You are a Reflector, taking in and reflecting the energy of
                    those around you.
                  </p>
                )}
              </ExpandableCard>
            </div>
          </div>
        </section>

        {/* Section 3: CTA */}
        <section
          className="no-print px-6 py-16 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #243531 0%, #1a3d38 100%)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-3">Ready to go deeper?</p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-bold italic mb-4">
              Freedom Filled Business Workshop
            </h2>
            <p className="text-white/70 leading-relaxed mb-8 max-w-md mx-auto">
              If you want to go deeper and learn how to build a business with freedom at the forefront, Tracy runs live workshops throughout the year. No Human Design expertise required. Just a willingness to build differently.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://tracyharris.co"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-terracotta text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-terracotta/90 transition-colors"
              >
                Join the Next Workshop
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 text-center border-t border-brand-parchment print-footer">
        <p className="text-sm text-brand-dark/40">
          &copy; {new Date().getFullYear()} Tracy Harris Co. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
