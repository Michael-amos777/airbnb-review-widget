'use client';

import React, { useState } from 'react';
import { Review } from '@/types/review';
import { CardRadius, WidgetCustomization } from '@/types/widget';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { MessageCircleIcon } from '@/components/ui/Icons';
import { formatReviewDate, getAvatarColor, getInitials } from '@/lib/utils';

interface ReviewCardProps {
  review: Review;
  config: WidgetCustomization;
  accentColor: string;
}

export function ReviewCard({ review, config, accentColor }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHostReply, setShowHostReply] = useState(true);

  const avatarColor = getAvatarColor(review.reviewerDisplayName);
  const initials = getInitials(review.reviewerDisplayName);
  const formattedDate = formatReviewDate(review.reviewDate);

  const shouldTruncate =
    review.reviewText.length > config.maxReviewTextLength && !isExpanded;
  const displayedText = shouldTruncate
    ? review.reviewText.slice(0, config.maxReviewTextLength).trim() + '...'
    : review.reviewText;

  const radiusClass = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-[2rem]',
  }[config.cardRadius || 'xl'];

  return (
    <article
      className={`relative flex flex-col justify-between h-full p-5 sm:p-6 transition-all duration-200 border shadow-xs hover:shadow-md ${radiusClass} card-theme-surface`}
    >
      <div>
        {/* Header: Reviewer info & Star rating */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            {config.showReviewerAvatar && (
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm shrink-0 select-none shadow-xs"
                style={{
                  backgroundColor: avatarColor.bg,
                  color: avatarColor.text,
                }}
                aria-hidden="true"
              >
                {initials}
              </div>
            )}

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="font-semibold text-sm leading-tight text-inherit">
                  {review.reviewerDisplayName}
                </h4>
                {config.showVerifiedBadge && review.verifiedStay && (
                  <Badge variant="verified" size="sm" />
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                {review.reviewerLocation && (
                  <span>{review.reviewerLocation}</span>
                )}
                {review.reviewerLocation && config.showReviewDate && formattedDate && (
                  <span>•</span>
                )}
                {config.showReviewDate && formattedDate && (
                  <time dateTime={review.reviewDate}>{formattedDate}</time>
                )}
              </div>
            </div>
          </div>

          <StarRating rating={review.starRating} size={15} color={accentColor} />
        </div>

        {/* Review body text */}
        <div className="relative mt-2 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
          <p className="whitespace-pre-line">{displayedText}</p>

          {review.reviewText.length > config.maxReviewTextLength && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-block mt-1 font-medium text-xs underline underline-offset-2 transition-opacity hover:opacity-80 cursor-pointer"
              style={{ color: accentColor }}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>

      {/* Host Response Section */}
      {config.showHostResponse && review.hostResponse && (
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-zinc-300">
              <MessageCircleIcon size={13} style={{ color: accentColor }} />
              <span>Response from host</span>
            </span>

            <button
              type="button"
              onClick={() => setShowHostReply(!showHostReply)}
              className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
            >
              {showHostReply ? 'Hide' : 'View'}
            </button>
          </div>

          {showHostReply && (
            <div className="mt-2 pl-3 py-1 border-l-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400 italic bg-slate-50/60 dark:bg-zinc-800/40 rounded-r-md" style={{ borderColor: accentColor }}>
              <p>"{review.hostResponse.responseText}"</p>
              {review.hostResponse.responseDate && (
                <span className="block mt-1 text-[10px] text-slate-400 not-italic">
                  {review.hostResponse.responseDate}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
