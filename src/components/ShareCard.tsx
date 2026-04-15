'use client';

import { useRef } from 'react';
import type { ChartData } from '@/app/api/calculate/route';
import type { HDType } from '@/lib/types';
import { TYPE_CONTENT } from '@/lib/content';

interface ShareCardProps {
  chartData: ChartData;
}

export default function ShareCard({ chartData }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const content = TYPE_CONTENT[chartData.type as HDType];

  const TYPE_BG: Record<string, string> = {
    Manifestor: 'bg-brand-teal',
    Generator: 'bg-brand-terracotta',
    'Manifesting Generator': 'bg-brand-sage',
    Projector: 'bg-brand-dark',
    Reflector: 'bg-brand-blush',
  };

  const bgClass = TYPE_BG[chartData.type] ?? 'bg-brand-dark';

  async function handleShare() {
    const shareUrl = window.location.href;
    const shareText = `I just discovered I&apos;m a ${chartData.type} in Human Design. My strategy: ${chartData.strategy} Find yours at tracyharris.co`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Freedom Blueprint', text: shareText, url: shareUrl });
      } catch {
        // User cancelled or not supported
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('Link copied to clipboard!');
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Visual share card */}
      <div
        ref={cardRef}
        className={`${bgClass} rounded-2xl p-8 text-white relative overflow-hidden`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10">
          <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">
            Freedom by Design™
          </p>
          <h2 className="text-3xl font-bold mb-1">{chartData.type}</h2>
          {content && (
            <p className="text-white/80 text-lg mb-4">{content.tagline}</p>
          )}
          <div className="flex gap-4 mb-6">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wide">Profile</p>
              <p className="font-semibold">{chartData.profile}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wide">Authority</p>
              <p className="font-semibold">{chartData.authority}</p>
            </div>
          </div>
          {content && (
            <p className="text-white/80 text-sm italic border-t border-white/20 pt-4">
              &quot;{content.strategy}&quot;
            </p>
          )}
          <p className="text-white/40 text-xs mt-4">tracyharris.co/freedom-blueprint</p>
        </div>
      </div>

      {/* Share button */}
      <button
        onClick={handleShare}
        className="mt-4 w-full py-3 rounded-xl border border-brand-dark text-brand-dark font-medium hover:bg-brand-dark hover:text-brand-bg transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share Your Blueprint
      </button>
    </div>
  );
}
