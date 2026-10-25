'use client';

import React, { useState, useEffect } from 'react';
import { DEFAULT_WIDGET_CONFIG, WidgetCustomization } from '@/types/widget';
import { ListingSummary, Review } from '@/types/review';
import { getReviewProvider } from '@/lib/adapters';
import { Navbar } from '@/components/layout/Navbar';
import { ListingUrlBar } from '@/components/dashboard/ListingUrlBar';
import { SettingsPanel } from '@/components/dashboard/SettingsPanel';
import { AirbnbReviewWidget } from '@/components/widget/AirbnbReviewWidget';
import { EmbedCodeModal } from '@/components/dashboard/EmbedCodeModal';
import { RetrievalGuideTab } from '@/components/dashboard/RetrievalGuideTab';
import { CodeIcon, EyeIcon, InfoIcon, SparklesIcon, CheckCircleIcon } from '@/components/ui/Icons';

const DEFAULT_LISTING_ID = '12345678';
const DEFAULT_LISTING_URL = 'https://www.airbnb.co.uk/rooms/12345678';

export default function HomePage() {
  const [listingId, setListingId] = useState<string>(DEFAULT_LISTING_ID);
  const [listingUrl, setListingUrl] = useState<string>(DEFAULT_LISTING_URL);
  const [config, setConfig] = useState<WidgetCustomization>(DEFAULT_WIDGET_CONFIG);
  const [activeTab, setActiveTab] = useState<'studio' | 'investigation'>('studio');
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveSynced, setIsLiveSynced] = useState(false);

  const [summary, setSummary] = useState<ListingSummary | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [previewBg, setPreviewBg] = useState<'light' | 'dark' | 'sand' | 'pattern'>('sand');

  // Load reviews using live API fetch with fallback to adapter
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    // Call live listing API
    fetch(`/api/listing?id=${encodeURIComponent(listingId)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        if (data.success && data.summary) {
          setSummary(data.summary);
          setReviews(data.reviews || []);
          setIsLiveSynced(true);
          setIsLoading(false);
        } else {
          throw new Error('Fallback required');
        }
      })
      .catch((err) => {
        console.warn('Live fetch error, using fallback provider:', err);
        const provider = getReviewProvider('demo-adapter');
        Promise.all([
          provider.fetchListingSummary(listingId),
          provider.fetchListingReviews(listingId),
        ]).then(([fallbackSummary, fallbackReviewsResult]) => {
          if (isMounted) {
            setSummary(fallbackSummary);
            setReviews(fallbackReviewsResult.reviews);
            setIsLiveSynced(false);
            setIsLoading(false);
          }
        });
      });

    return () => {
      isMounted = false;
    };
  }, [listingId]);

  const handleListingChange = (newListingId: string, newUrl: string) => {
    setListingId(newListingId);
    setListingUrl(newUrl);
  };

  const handleConfigChange = (updated: Partial<WidgetCustomization>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_WIDGET_CONFIG);
  };

  const bgStyles: Record<string, string> = {
    sand: 'bg-[#f7f4ee]',
    light: 'bg-slate-100',
    dark: 'bg-zinc-950',
    pattern: 'bg-slate-100 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]',
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 font-sans text-slate-900 dark:text-zinc-100 antialiased selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
        isDemoMode={!isLiveSynced}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {activeTab === 'studio' ? (
          <>
            {/* Top Bar: Listing Input & Validation */}
            <ListingUrlBar
              currentListingId={listingId}
              onListingChange={handleListingChange}
              isLoading={isLoading}
            />

            {/* Live Data Sync Banner */}
            {summary && (
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    <strong>Connected to Airbnb:</strong> {summary.listingTitle} ({summary.overallRating.toFixed(2)} ★ · {summary.reviewCount} Reviews · {summary.locationName})
                  </span>
                </div>
                <span className="hidden sm:inline-block font-mono text-[11px] opacity-75">
                  ID: {summary.listingId}
                </span>
              </div>
            )}

            {/* Studio Workspace Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Live Widget Preview (8 Cols on desktop) */}
              <section className="lg:col-span-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-zinc-900 px-5 py-3 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                  <div className="flex items-center gap-2">
                    <EyeIcon size={16} className="text-rose-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                      Live Widget Preview
                    </span>
                    <span className="text-xs text-slate-400">• Interactive Carousel</span>
                  </div>

                  {/* Preview Backdrop Simulator */}
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-400 text-[11px] mr-1">Backdrop:</span>
                    {[
                      { id: 'sand', label: 'Sand', color: '#f7f4ee' },
                      { id: 'light', label: 'Light', color: '#f1f5f9' },
                      { id: 'dark', label: 'Dark', color: '#09090b' },
                      { id: 'pattern', label: 'Grid', color: '#e2e8f0' },
                    ].map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => setPreviewBg(bg.id as any)}
                        className={`px-2 py-0.5 rounded-md font-medium text-[11px] transition-all cursor-pointer ${
                          previewBg === bg.id
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                            : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400'
                        }`}
                      >
                        {bg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Container for the live review widget */}
                <div
                  className={`p-4 sm:p-8 rounded-3xl transition-colors duration-300 border border-slate-200/70 dark:border-zinc-800 overflow-hidden ${bgStyles[previewBg]}`}
                >
                  {isLoading || !summary ? (
                    <div className="py-24 text-center">
                      <div className="inline-block w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
                      <p className="mt-3 text-xs text-slate-500">Connecting to Airbnb listing {listingId}...</p>
                    </div>
                  ) : (
                    <AirbnbReviewWidget
                      summary={summary}
                      reviews={reviews}
                      config={config}
                    />
                  )}
                </div>

                {/* Quick Embed Callout */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                      <CodeIcon size={16} />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-zinc-100 block">
                        Ready to add this to your website?
                      </strong>
                      <span className="text-slate-500 dark:text-zinc-400">
                        Copy the standalone JavaScript or responsive iframe snippet in one click.
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEmbedModalOpen(true)}
                    className="px-4 py-2 font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 rounded-xl transition-colors shrink-0 cursor-pointer"
                  >
                    Generate Embed Snippet ↗
                  </button>
                </div>
              </section>

              {/* Right Column: Settings Panel (4 Cols on desktop) */}
              <section className="lg:col-span-4">
                <SettingsPanel
                  config={config}
                  onChange={handleConfigChange}
                  onReset={handleResetConfig}
                />
              </section>
            </div>
          </>
        ) : (
          /* Retrieval Investigation Tab (Phase 4 Deliverable) */
          <RetrievalGuideTab listingId={listingId} />
        )}
      </main>

      {/* Standalone Embed Code Generator Modal */}
      <EmbedCodeModal
        listingId={listingId}
        config={config}
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
      />
    </div>
  );
}
