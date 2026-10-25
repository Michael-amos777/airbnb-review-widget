'use client';

import React, { useEffect, useRef } from 'react';
import { ListingSummary, Review } from '@/types/review';
import { DEFAULT_WIDGET_CONFIG, THEME_PRESETS, WidgetCustomization } from '@/types/widget';
import { WidgetHeader } from './WidgetHeader';
import { ReviewCarousel } from './ReviewCarousel';

interface AirbnbReviewWidgetProps {
  summary: ListingSummary;
  reviews: Review[];
  config?: Partial<WidgetCustomization>;
  isStandaloneEmbed?: boolean;
}

export function AirbnbReviewWidget({
  summary,
  reviews,
  config = {},
  isStandaloneEmbed = false,
}: AirbnbReviewWidgetProps) {
  const mergedConfig: WidgetCustomization = {
    ...DEFAULT_WIDGET_CONFIG,
    ...config,
  };

  const themeTheme = THEME_PRESETS[mergedConfig.theme] || THEME_PRESETS.light;
  const accentColor = mergedConfig.accentColor || '#FF385C';
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-resize postMessage for iframe embeds
  useEffect(() => {
    if (!isStandaloneEmbed || typeof window === 'undefined') return;

    const reportHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight;
        window.parent.postMessage(
          {
            type: 'airbnb-widget-resize',
            listingId: summary.listingId,
            height,
          },
          '*'
        );
      }
    };

    reportHeight();
    const observer = new ResizeObserver(reportHeight);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isStandaloneEmbed, summary.listingId, reviews, mergedConfig]);

  // CSS theme styles
  const themeClasses: Record<string, string> = {
    light: 'bg-white text-slate-900 border-slate-200/80 shadow-xs',
    sand: 'bg-[#faf7f2] text-stone-900 border-[#ebe3d5] shadow-xs',
    midnight: 'bg-[#0f172a] text-slate-100 border-slate-800 shadow-md',
    dark: 'bg-[#18181b] text-zinc-100 border-zinc-800 shadow-md',
    glass: 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-slate-900 dark:text-zinc-100 border-white/50 dark:border-zinc-700/50 shadow-lg',
  };

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-6xl mx-auto rounded-3xl p-6 sm:p-8 border transition-all duration-300 font-sans ${themeClasses[mergedConfig.theme] || themeClasses.light}`}
      style={
        {
          '--widget-accent': accentColor,
        } as React.CSSProperties
      }
    >
      {/* Widget Header */}
      <WidgetHeader
        summary={summary}
        config={mergedConfig}
        accentColor={accentColor}
      />

      {/* Review Carousel */}
      <ReviewCarousel
        reviews={reviews}
        config={mergedConfig}
        accentColor={accentColor}
      />

      {/* Footer Branding & Disclaimer */}
      <footer className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 dark:text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span>Powered by</span>
          <a
            href={summary.listingUrl || `https://www.airbnb.co.uk/rooms/${summary.listingId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline flex items-center gap-1 text-slate-600 dark:text-zinc-300"
          >
            Airbnb Listing #{summary.listingId}
          </a>
        </div>

        <div className="text-[11px] text-center sm:text-right">
          Last synchronized:{' '}
          <time dateTime={summary.lastSyncTimestamp}>
            {new Date(summary.lastSyncTimestamp).toLocaleDateString()}
          </time>
        </div>
      </footer>
    </div>
  );
}
