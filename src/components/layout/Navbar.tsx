'use client';

import React from 'react';
import { AirbnbIcon, CodeIcon, InfoIcon, SparklesIcon } from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';

interface NavbarProps {
  activeTab: 'studio' | 'investigation';
  onTabChange: (tab: 'studio' | 'investigation') => void;
  onOpenEmbedModal: () => void;
  isDemoMode: boolean;
}

export function Navbar({
  activeTab,
  onTabChange,
  onOpenEmbedModal,
  isDemoMode,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-rose-500 text-white shadow-xs">
            <AirbnbIcon size={22} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                StayReviews
              </span>
              <span className="hidden sm:inline-block text-xs text-slate-400 font-light">
                |
              </span>
              <span className="hidden sm:inline-block text-xs font-medium text-slate-600 dark:text-zinc-300">
                Airbnb Widget Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 -mt-0.5 hidden md:block">
              Vacation-rental testimonial widget & embed generator
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => onTabChange('studio')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'studio'
                ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Widget Studio
          </button>

          <button
            type="button"
            onClick={() => onTabChange('investigation')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'investigation'
                ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <InfoIcon size={13} className="text-rose-500" />
            <span>Retrieval Guide</span>
          </button>
        </div>

        {/* Action button & Demo Badge */}
        <div className="flex items-center gap-2.5">
          {isDemoMode && (
            <div className="hidden lg:block">
              <Badge variant="demo" />
            </div>
          )}

          <button
            type="button"
            onClick={onOpenEmbedModal}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <CodeIcon size={14} />
            <span>Get Embed Code</span>
          </button>
        </div>
      </div>
    </header>
  );
}
