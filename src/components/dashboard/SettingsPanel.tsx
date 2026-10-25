'use client';

import React from 'react';
import { CardRadius, DEFAULT_WIDGET_CONFIG, THEME_PRESETS, WidgetCustomization, WidgetTheme } from '@/types/widget';
import { RefreshCwIcon, SlidersIcon } from '@/components/ui/Icons';

interface SettingsPanelProps {
  config: WidgetCustomization;
  onChange: (updated: Partial<WidgetCustomization>) => void;
  onReset: () => void;
}

const ACCENT_COLORS = [
  { name: 'Airbnb Coral', hex: '#FF385C' },
  { name: 'Warm Amber', hex: '#D97706' },
  { name: 'Rose Petal', hex: '#E11D48' },
  { name: 'Emerald Forest', hex: '#059669' },
  { name: 'Indigo Sky', hex: '#4F46E5' },
  { name: 'Slate Luxury', hex: '#0F172A' },
];

export function SettingsPanel({ config, onChange, onReset }: SettingsPanelProps) {
  return (
    <aside className="w-full bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <SlidersIcon size={18} className="text-slate-600 dark:text-zinc-300" />
          <h3 className="font-semibold text-sm text-slate-900 dark:text-zinc-100">
            Widget Customizer
          </h3>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
          title="Reset to default settings"
        >
          <RefreshCwIcon size={12} />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-5 text-sm">
        {/* Theme Preset */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
            Theme Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.keys(THEME_PRESETS) as WidgetTheme[]).map((themeKey) => {
              const preset = THEME_PRESETS[themeKey];
              const isSelected = config.theme === themeKey;
              return (
                <button
                  key={themeKey}
                  type="button"
                  onClick={() => onChange({ theme: themeKey })}
                  className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-rose-500 ring-2 ring-rose-200 dark:ring-rose-900 bg-rose-50/30 dark:bg-rose-950/20'
                      : 'border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <span className="font-medium text-xs text-slate-900 dark:text-zinc-100">
                    {preset.name}
                  </span>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: preset.background === 'transparent' ? '#f1f5f9' : preset.background }}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: preset.cardBackground === 'transparent' ? '#ffffff' : preset.cardBackground }}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: preset.starColor }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
            Accent Brand Color
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {ACCENT_COLORS.map((color) => {
              const isSelected = config.accentColor.toLowerCase() === color.hex.toLowerCase();
              return (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => onChange({ accentColor: color.hex })}
                  className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-transform cursor-pointer ${
                    isSelected ? 'scale-110 ring-2 ring-offset-2 ring-slate-800 dark:ring-white' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                />
              );
            })}

            {/* Custom hex input */}
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-xs text-slate-400">#</span>
              <input
                type="text"
                value={config.accentColor.replace('#', '')}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  if (/^[0-9A-Fa-f]{0,6}$/.test(val)) {
                    onChange({ accentColor: `#${val}` });
                  }
                }}
                maxLength={6}
                className="w-18 px-2 py-1 text-xs font-mono bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-200"
                placeholder="FF385C"
              />
            </div>
          </div>
        </div>

        {/* Layout: Cards per view */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
            Desktop Carousel Cards Per View
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onChange({ cardsPerView: num as 1 | 2 | 3 })}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  config.cardsPerView === num
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-xs'
                    : 'bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:border-slate-300'
                }`}
              >
                {num} {num === 1 ? 'Card' : 'Cards'}
              </button>
            ))}
          </div>
        </div>

        {/* Card Border Radius */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
            Card Corner Style
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'sm', label: 'Subtle' },
              { id: 'md', label: 'Medium' },
              { id: 'xl', label: 'Rounded' },
              { id: 'full', label: 'Soft Pill' },
            ].map((radius) => (
              <button
                key={radius.id}
                type="button"
                onClick={() => onChange({ cardRadius: radius.id as CardRadius })}
                className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  config.cardRadius === radius.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                    : 'bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700'
                }`}
              >
                {radius.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visibility Toggles */}
        <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 space-y-2.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
            Display Elements
          </label>

          {[
            {
              key: 'showCategoryRatings',
              label: 'Category Rating Breakdown',
              desc: 'Cleanliness, Accuracy, Communication scores',
            },
            {
              key: 'showReviewerAvatar',
              label: 'Reviewer Avatars',
              desc: 'Display guest initials or profile images',
            },
            {
              key: 'showReviewDate',
              label: 'Review Dates',
              desc: 'Month and year of guest stay',
            },
            {
              key: 'showHostResponse',
              label: 'Host Responses',
              desc: 'Display replies posted by host',
            },
            {
              key: 'showGuestFavoriteBadge',
              label: 'Guest Favourite / Superhost Badges',
              desc: 'Show Airbnb trust badges in header',
            },
            {
              key: 'carouselAutoplay',
              label: 'Auto-play Carousel',
              desc: 'Slides automatically every 5 seconds',
            },
            {
              key: 'showDemoNotice',
              label: 'Development Mode Notice Banner',
              desc: 'Show demonstration data indicator',
            },
          ].map((toggle) => (
            <label
              key={toggle.key}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer select-none"
            >
              <div className="pr-3">
                <span className="block text-xs font-medium text-slate-800 dark:text-zinc-200">
                  {toggle.label}
                </span>
                <span className="block text-[11px] text-slate-400 dark:text-zinc-500">
                  {toggle.desc}
                </span>
              </div>

              <input
                type="checkbox"
                checked={!!(config as any)[toggle.key]}
                onChange={(e) =>
                  onChange({ [toggle.key]: e.target.checked } as Partial<WidgetCustomization>)
                }
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300 dark:border-zinc-600 cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
