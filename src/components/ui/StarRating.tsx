import React from 'react';
import { StarIcon } from './Icons';

interface StarRatingProps {
  rating: number; // e.g. 5 or 4.96
  maxRating?: number;
  size?: number;
  color?: string;
  showScore?: boolean;
  scoreClassName?: string;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 15,
  color = '#f59e0b',
  showScore = false,
  scoreClassName = 'text-sm font-semibold ml-1.5',
  className = 'flex items-center gap-0.5',
}: StarRatingProps) {
  // Clamped rating
  const clampedRating = Math.max(0, Math.min(rating, maxRating));

  return (
    <div className={`inline-flex items-center ${className}`} aria-label={`${clampedRating} out of ${maxRating} stars`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, index) => {
          const starNumber = index + 1;
          const isFull = starNumber <= clampedRating;
          const isPart = !isFull && starNumber - 1 < clampedRating;
          const fraction = isPart ? clampedRating - (starNumber - 1) : 0;

          if (isFull) {
            return (
              <span key={index} style={{ color }}>
                <StarIcon size={size} fill="currentColor" />
              </span>
            );
          }

          if (isPart) {
            return (
              <span key={index} className="relative inline-block" style={{ width: size, height: size }}>
                {/* Background empty star */}
                <span className="absolute inset-0 text-slate-200 dark:text-zinc-700">
                  <StarIcon size={size} fill="currentColor" />
                </span>
                {/* Foreground clipped star */}
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fraction * 100}%`, color }}
                >
                  <StarIcon size={size} fill="currentColor" />
                </span>
              </span>
            );
          }

          return (
            <span key={index} className="text-slate-200 dark:text-zinc-700">
              <StarIcon size={size} fill="currentColor" />
            </span>
          );
        })}
      </div>

      {showScore && (
        <span className={scoreClassName}>
          {clampedRating.toFixed(clampedRating % 1 === 0 ? 1 : 2)}
        </span>
      )}
    </div>
  );
}
