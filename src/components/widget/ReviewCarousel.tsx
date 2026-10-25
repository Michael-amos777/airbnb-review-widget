'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Review } from '@/types/review';
import { WidgetCustomization } from '@/types/widget';
import { ReviewCard } from './ReviewCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';

interface ReviewCarouselProps {
  reviews: Review[];
  config: WidgetCustomization;
  accentColor: string;
}

export function ReviewCarousel({ reviews, config, accentColor }: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalReviews = reviews.length;
  // Calculate visible cards based on screen width and config
  const [effectiveCardsPerView, setEffectiveCardsPerView] = useState(config.cardsPerView);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setEffectiveCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setEffectiveCardsPerView(Math.min(config.cardsPerView, 2) as 1 | 2);
      } else {
        setEffectiveCardsPerView(config.cardsPerView);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [config.cardsPerView]);

  // Max index we can scroll to
  const maxIndex = Math.max(0, totalReviews - effectiveCardsPerView);

  // Clamp current index if effective cards changed
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  // Autoplay functionality
  useEffect(() => {
    if (!config.carouselAutoplay || isHovered || totalReviews <= effectiveCardsPerView) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, config.autoplayIntervalMs || 5000);

    return () => clearInterval(timer);
  }, [
    config.carouselAutoplay,
    config.autoplayIntervalMs,
    isHovered,
    totalReviews,
    effectiveCardsPerView,
    handleNext,
  ]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 rounded-xl border border-dashed border-slate-300">
        No reviews available to display.
      </div>
    );
  }

  // Slide offset percentage
  const itemWidthPercentage = 100 / effectiveCardsPerView;
  const translateX = -(currentIndex * itemWidthPercentage);

  return (
    <div
      className="relative w-full focus:outline-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
      aria-roledescription="carousel"
      aria-label="Airbnb guest reviews"
    >
      {/* Navigation Top Bar / Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-medium text-slate-500 dark:text-zinc-400">
          Showing{' '}
          <span className="font-semibold text-slate-800 dark:text-zinc-200">
            {currentIndex + 1}
            {effectiveCardsPerView > 1
              ? `–${Math.min(currentIndex + effectiveCardsPerView, totalReviews)}`
              : ''}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-slate-800 dark:text-zinc-200">
            {totalReviews}
          </span>{' '}
          verified stays
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 shadow-xs hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeftIcon size={18} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 shadow-xs hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>

      {/* Carousel Track Container */}
      <div
        className="overflow-hidden w-full -mx-2 px-2 py-1"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translateX(${translateX}%)`,
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.reviewId}
              className="shrink-0 px-2 box-border"
              style={{
                width: `${itemWidthPercentage}%`,
              }}
            >
              <ReviewCard
                review={review}
                config={config}
                accentColor={accentColor}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      {maxIndex > 0 && (
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className="transition-all duration-300 cursor-pointer rounded-full h-1.5"
              style={{
                width: currentIndex === idx ? '24px' : '6px',
                backgroundColor:
                  currentIndex === idx ? accentColor : 'rgba(148, 163, 184, 0.4)',
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
