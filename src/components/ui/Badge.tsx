import React from 'react';
import { AirbnbIcon, ShieldCheckIcon, SparklesIcon, InfoIcon } from './Icons';

interface BadgeProps {
  variant?: 'guest-favorite' | 'superhost' | 'verified' | 'demo' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
  children?: React.ReactNode;
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  className = '',
  children,
}: BadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  if (variant === 'guest-favorite') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 shadow-xs dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60 ${sizeClasses} ${className}`}
      >
        <SparklesIcon size={13} className="text-rose-600 dark:text-rose-400" />
        <span>Guest favourite</span>
      </span>
    );
  }

  if (variant === 'superhost') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60 ${sizeClasses} ${className}`}
      >
        <AirbnbIcon size={12} className="text-amber-600 dark:text-amber-400" />
        <span>Superhost</span>
      </span>
    );
  }

  if (variant === 'verified') {
    return (
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-md px-1.5 py-0.5 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50 ${className}`}
        title="Verified guest stay"
      >
        <ShieldCheckIcon size={12} className="text-emerald-600 dark:text-emerald-400" />
        <span>Verified stay</span>
      </span>
    );
  }

  if (variant === 'demo') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-[10px] rounded-full bg-amber-100/90 text-amber-900 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700 px-2 py-0.5 ${className}`}
      >
        <InfoIcon size={12} className="text-amber-700 dark:text-amber-400" />
        <span>Demonstration Data</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 ${sizeClasses} ${className}`}
    >
      {children}
    </span>
  );
}
