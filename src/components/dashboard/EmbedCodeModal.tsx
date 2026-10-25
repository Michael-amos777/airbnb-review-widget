'use client';

import React, { useState } from 'react';
import { WidgetCustomization } from '@/types/widget';
import { CheckIcon, CodeIcon, CopyIcon } from '@/components/ui/Icons';

interface EmbedCodeModalProps {
  listingId: string;
  config: WidgetCustomization;
  isOpen: boolean;
  onClose: () => void;
}

export function EmbedCodeModal({
  listingId,
  config,
  isOpen,
  onClose,
}: EmbedCodeModalProps) {
  const [activeTab, setActiveTab] = useState<'script' | 'iframe' | 'react'>('script');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Clean params for the embed URL
  const queryParams = new URLSearchParams({
    theme: config.theme,
    accent: config.accentColor.replace('#', ''),
    cards: String(config.cardsPerView),
    radius: config.cardRadius,
    cat: String(config.showCategoryRatings),
    avatar: String(config.showReviewerAvatar),
    date: String(config.showReviewDate),
    reply: String(config.showHostResponse),
  }).toString();

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const embedUrl = `${baseUrl}/embed/${listingId}?${queryParams}`;

  // Snippet 1: Standalone Script loader (Standard for Squarespace, Wix, WordPress, Custom HTML)
  const scriptSnippet = `<!-- Airbnb Review Widget by StayReviews -->
<div 
  id="airbnb-review-widget-${listingId}" 
  data-listing-id="${listingId}"
  data-theme="${config.theme}"
  data-accent="${config.accentColor}"
  data-cards="${config.cardsPerView}"
></div>
<script src="${baseUrl}/embed.js" async></script>`;

  // Snippet 2: Zero-dependency Responsive Iframe
  const iframeSnippet = `<!-- Airbnb Review Widget (Responsive Iframe) -->
<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="480" 
  style="border:none; overflow:hidden; border-radius:1.5rem;" 
  title="Airbnb Reviews for Listing ${listingId}" 
  loading="lazy"
></iframe>`;

  // Snippet 3: React / Next.js Component import
  const reactSnippet = `import { AirbnbReviewWidget } from '@/components/widget/AirbnbReviewWidget';

export default function ListingPage() {
  return (
    <AirbnbReviewWidget 
      summary={listingSummary} 
      reviews={reviews} 
      config={{
        theme: '${config.theme}',
        accentColor: '${config.accentColor}',
        cardsPerView: ${config.cardsPerView},
        cardRadius: '${config.cardRadius}',
      }} 
    />
  );
}`;

  const currentSnippet =
    activeTab === 'script'
      ? scriptSnippet
      : activeTab === 'iframe'
      ? iframeSnippet
      : reactSnippet;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="embed-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <CodeIcon size={20} />
            </div>
            <div>
              <h2 id="embed-modal-title" className="font-bold text-base text-slate-900 dark:text-white">
                Embeddable Widget Snippet
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Paste this code onto your vacation rental website or direct booking page
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Tab selection */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-100 dark:border-zinc-800 flex items-center gap-2">
          {[
            { id: 'script', label: 'HTML / Script Tag (Recommended)' },
            { id: 'iframe', label: 'Responsive Iframe' },
            { id: 'react', label: 'React / Next.js' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Snippet box */}
        <div className="p-6">
          <div className="relative rounded-2xl bg-slate-950 text-slate-100 p-4 font-mono text-xs overflow-x-auto border border-slate-800">
            <button
              type="button"
              onClick={handleCopy}
              className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {copied ? (
                <>
                  <CheckIcon size={14} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon size={14} />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <pre className="pr-24 whitespace-pre-wrap break-all leading-relaxed text-emerald-400">
              {currentSnippet}
            </pre>
          </div>

          {/* Integration Guidelines */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-850 border border-slate-200/70 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-400 space-y-1.5">
            <h4 className="font-semibold text-slate-800 dark:text-zinc-200">
              Where to place this snippet:
            </h4>
            <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] leading-relaxed">
              <li>
                <strong>Squarespace / Wix:</strong> Add a "Code" or "Embed" block in the page editor and paste.
              </li>
              <li>
                <strong>WordPress:</strong> Add a "Custom HTML" block in the Gutenberg or Elementor editor.
              </li>
              <li>
                <strong>Webflow:</strong> Drag an "Embed" component into your container and paste.
              </li>
              <li>
                <strong>Security note:</strong> The widget runs client-side and requires no private API keys or host credentials in browser code.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50/70 dark:bg-zinc-850/50 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Listing #{listingId}
          </span>

          <div className="flex items-center gap-3">
            <a
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-700 dark:text-zinc-300 hover:underline"
            >
              Test standalone preview ↗
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer"
            >
              {copied ? 'Copied to Clipboard' : 'Copy Snippet'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
