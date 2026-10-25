'use client';

import React, { useState, useEffect } from 'react';
import { parseAirbnbListing } from '@/lib/utils';
import { AirbnbIcon, CheckCircleIcon, ExternalLinkIcon, SparklesIcon } from '@/components/ui/Icons';

interface ListingUrlBarProps {
  currentListingId: string;
  onListingChange: (listingId: string, url: string) => void;
  isLoading?: boolean;
}

const DEFAULT_TEST_URL = 'https://www.airbnb.co.uk/rooms/12345678';
const DEFAULT_TEST_ID = '12345678';

export function ListingUrlBar({
  currentListingId,
  onListingChange,
  isLoading = false,
}: ListingUrlBarProps) {
  const [inputValue, setInputValue] = useState(
    currentListingId === DEFAULT_TEST_ID
      ? DEFAULT_TEST_URL
      : `https://www.airbnb.co.uk/rooms/${currentListingId}`
  );
  const [validation, setValidation] = useState(parseAirbnbListing(inputValue));
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setValidation(parseAirbnbListing(inputValue));
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasInteracted(true);
    if (validation.isValid && validation.listingId) {
      onListingChange(validation.listingId, validation.cleanUrl || inputValue);
    }
  };

  const handleLoadTestListing = () => {
    setInputValue(DEFAULT_TEST_URL);
    setHasInteracted(true);
    onListingChange(DEFAULT_TEST_ID, DEFAULT_TEST_URL);
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <label
            htmlFor="airbnb-url-input"
            className="block text-sm font-semibold text-slate-900 dark:text-zinc-100"
          >
            Airbnb Listing URL or Listing ID
          </label>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Enter your Airbnb listing to preview and customize your reviews carousel widget
          </p>
        </div>

        {/* Quick test listing preset */}
        <button
          type="button"
          onClick={handleLoadTestListing}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-full border border-rose-200 dark:border-rose-800/60 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <SparklesIcon size={13} />
          <span>Load Test Listing (ID: 12345678)</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
            <AirbnbIcon size={18} className="text-rose-500" />
          </div>

          <input
            id="airbnb-url-input"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setHasInteracted(true);
            }}
            placeholder="e.g. https://www.airbnb.co.uk/rooms/12345678"
            className={`w-full pl-10 pr-24 py-2.5 text-sm bg-slate-50 dark:bg-zinc-800 border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
              hasInteracted && !validation.isValid
                ? 'border-red-300 dark:border-red-700 focus:ring-red-200 text-red-900 dark:text-red-200'
                : 'border-slate-200 dark:border-zinc-700 focus:ring-rose-200 dark:focus:ring-rose-900 text-slate-900 dark:text-zinc-100'
            }`}
          />

          {validation.isValid && validation.listingId && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5 pointer-events-none text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <CheckCircleIcon size={14} />
              <span className="hidden sm:inline">Valid</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!validation.isValid || isLoading}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-xs shrink-0 cursor-pointer flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              <span>Load Listing</span>
            </>
          )}
        </button>
      </form>

      {/* Validation feedback & Listing link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2.5 text-xs">
        {hasInteracted && !validation.isValid && validation.errorMessage ? (
          <p className="text-red-600 dark:text-red-400 font-medium">
            ⚠️ {validation.errorMessage}
          </p>
        ) : (
          <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
            <span>Current Listing ID:</span>
            <code className="font-mono bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md text-slate-800 dark:text-zinc-200 font-semibold">
              {currentListingId}
            </code>
          </div>
        )}

        <a
          href={`https://www.airbnb.co.uk/rooms/${currentListingId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          <span>Open listing on Airbnb</span>
          <ExternalLinkIcon size={12} />
        </a>
      </div>
    </div>
  );
}
