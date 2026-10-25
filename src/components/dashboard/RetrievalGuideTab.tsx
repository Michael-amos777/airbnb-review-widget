'use client';

import React from 'react';
import { ShieldCheckIcon, AirbnbIcon, InfoIcon, ExternalLinkIcon } from '@/components/ui/Icons';

export function RetrievalGuideTab({ listingId }: { listingId: string }) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-slate-800 dark:text-zinc-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 border border-rose-200/60 dark:border-rose-900/40">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-rose-600 text-white shrink-0 shadow-xs">
            <AirbnbIcon size={28} />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 mb-2">
              Phase 4 Technical Investigation
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Airbnb Review Retrieval Architecture & Feasibility
            </h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
              Analysis for listing ID <code className="font-mono font-semibold">{listingId}</code> (managed directly by user on Airbnb)
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recommended Option: PMS Channel Manager */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-emerald-500/40 dark:border-emerald-500/30 shadow-xs relative">
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Recommended Path
            </span>
          </div>

          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
            1. Property Management System (PMS)
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
            Via Hospitable, Guesty, Smoobu, or OwnerRez
          </p>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2">
              <span className="font-semibold w-28 shrink-0">Review Text:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                ✓ Full review text, dates, star ratings & host responses
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold w-28 shrink-0">Auto Updates:</span>
              <span>✓ Real-time via webhooks or hourly sync</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold w-28 shrink-0">Authentication:</span>
              <span>Official Airbnb OAuth login inside PMS dashboard</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold w-28 shrink-0">Terms of Service:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                100% compliant. Uses official Airbnb Preferred Partner APIs
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold w-28 shrink-0">Pricing:</span>
              <span>Free trials available (Hospitable ~$25/mo, Smoobu ~$29/mo)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold w-28 shrink-0">Reliability:</span>
              <span>99.9% uptime, no risk of IP bans or CAPTCHA failures</span>
            </div>
          </div>
        </div>

        {/* Option 2: Direct Airbnb Partner API */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
            2. Direct Airbnb Developer Partner API
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
            Direct application on developer.airbnb.com
          </p>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2">
              <span className="font-semibold w-28 shrink-0">Review Text:</span>
              <span>✓ Supported through Official Reviews API</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold w-28 shrink-0">Auto Updates:</span>
              <span>✓ Real-time webhooks</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold w-28 shrink-0">Authentication:</span>
              <span>OAuth 2.0 Client ID and Secret</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold w-28 shrink-0">Limitation:</span>
              <span className="text-amber-700 dark:text-amber-400 font-medium">
                Airbnb restricts direct API access to certified enterprise partners managing &gt;20 listings.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold w-28 shrink-0">Conclusion:</span>
              <span>Individual hosts access this through a certified PMS partner instead.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Unofficial Scraping Warning */}
      <div className="p-5 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-xs">
        <div className="flex items-start gap-3">
          <span className="p-2 rounded-xl bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 shrink-0 font-bold">
            ⚠️
          </span>
          <div>
            <h4 className="font-bold text-sm text-red-900 dark:text-red-200 mb-1">
              Why We Explicitly Reject Automated Scraping & Reverse-Engineering
            </h4>
            <p className="text-red-800/90 dark:text-red-300 leading-relaxed mb-2">
              Per Phase 4 instructions and Airbnb's Terms of Service (Section 13), automated scraping without prior written consent is strictly prohibited. Unofficial scrapers face:
            </p>
            <ul className="list-disc list-inside space-y-1 text-red-800/80 dark:text-red-300/80 pl-1">
              <li>
                <strong>Account safety risk:</strong> Risk of Airbnb account review, shadow-banning, or listing delisting for violating Terms of Service.
              </li>
              <li>
                <strong>Aggressive bot defenses:</strong> Akamai Bot Manager, TLS fingerprinting, dynamic class-name obfuscation, and recurrent CAPTCHAs.
              </li>
              <li>
                <strong>Fragility:</strong> Scrapers break every few weeks when Airbnb alters their internal minified GraphQL endpoints.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step by step Host Roadmap */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
          Host Implementation Roadmap (Next Steps)
        </h3>
        
        <ol className="space-y-4 text-xs">
          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs shrink-0">
              1
            </span>
            <div>
              <strong className="text-slate-900 dark:text-zinc-100 block">
                Current Phase: Prototype with Demonstration Mode
              </strong>
              <p className="text-slate-500 dark:text-zinc-400 mt-0.5">
                The widget design, carousel animations, theme customizer, and embed codes are fully functional locally with sample reviews tailored to listing #YOUR_LISTING_ID.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200 font-bold text-xs shrink-0">
              2
            </span>
            <div>
              <strong className="text-slate-900 dark:text-zinc-100 block">
                Host Input: Choose Preferred PMS or Direct Sync Method
              </strong>
              <p className="text-slate-500 dark:text-zinc-400 mt-0.5">
                Does the property already use Hospitable, Smoobu, Guesty, or OwnerRez? If so, we plug your API Key into our <code>ExternalPmsReviewAdapter</code> to fetch live reviews instantly.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200 font-bold text-xs shrink-0">
              3
            </span>
            <div>
              <strong className="text-slate-900 dark:text-zinc-100 block">
                Production Deployment & Embedding
              </strong>
              <p className="text-slate-500 dark:text-zinc-400 mt-0.5">
                Deploy this Next.js app to Vercel/Netlify, and embed the generated <code>&lt;script&gt;</code> or <code>&lt;iframe&gt;</code> snippet into your direct booking website.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
