'use client';

import React from 'react';
import { ListingSummary } from '@/types/review';
import { WidgetCustomization } from '@/types/widget';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { AirbnbIcon, InfoIcon } from '@/components/ui/Icons';

interface WidgetHeaderProps {
  summary: ListingSummary;
  config: WidgetCustomization;
  accentColor: string;
}

export function WidgetHeader({ summary, config, accentColor }: WidgetHeaderProps) {
  const categories = [
    { label: 'Cleanliness', value: summary.categoryRatings?.cleanliness ?? 5.0 },
    { label: 'Accuracy', value: summary.categoryRatings?.accuracy ?? 4.9 },
    { label: 'Communication', value: summary.categoryRatings?.communication ?? 5.0 },
    { label: 'Location', value: summary.categoryRatings?.location ?? 4.9 },
    { label: 'Check-in', value: summary.categoryRatings?.checkIn ?? 5.0 },
    { label: 'Value', value: summary.categoryRatings?.value ?? 4.8 },
  ];

  return (
    <header className="mb-6">
      {/* Phase 3: Demonstration Mode Notice */}
      {summary.isDemonstration && config.showDemoNotice && (
        <div className="mb-4 flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white shrink-0 font-bold text-[10px]">
              !
            </span>
            <span className="font-medium">
              <strong>Development Mode: Demonstration Data.</strong> Showing simulated sample reviews for layout & carousel testing.
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] opacity-75 font-mono">
            Listing: {summary.listingId}
          </span>
        </div>
      )}

      {/* Main Aggregate Rating Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
              <AirbnbIcon size={26} style={{ color: accentColor }} />
              <span>Airbnb Reviews</span>
            </span>

            {config.showGuestFavoriteBadge && summary.isGuestFavorite && (
              <Badge variant="guest-favorite" />
            )}

            {summary.isSuperhost && <Badge variant="superhost" />}
          </div>

          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Verified guest testimonials for{' '}
            <span className="font-medium text-slate-700 dark:text-zinc-200">
              {summary.listingTitle || `Listing #${summary.listingId}`}
            </span>
          </p>
        </div>

        {/* Overall Star & Score Badge */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-zinc-800/80 px-4 py-2.5 rounded-2xl border border-slate-200/70 dark:border-zinc-700/60 shadow-2xs self-start sm:self-auto">
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {summary.overallRating.toFixed(2)}
          </div>

          <div className="flex flex-col">
            <StarRating rating={summary.overallRating} size={15} color={accentColor} />
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400 mt-0.5">
              Based on {summary.reviewCount} guest reviews
            </span>
          </div>
        </div>
      </div>

      {/* Category breakdown meters */}
      {config.showCategoryRatings && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
          {categories.map((cat) => {
            const percentage = (cat.value / 5.0) * 100;
            return (
              <div
                key={cat.label}
                className="flex flex-col p-2.5 rounded-xl bg-slate-50/70 dark:bg-zinc-850/50 border border-slate-100 dark:border-zinc-800"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-600 dark:text-zinc-400 truncate">
                    {cat.label}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-zinc-200 ml-1">
                    {cat.value.toFixed(1)}
                  </span>
                </div>
                {/* Visual bar meter */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-zinc-700 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: accentColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
