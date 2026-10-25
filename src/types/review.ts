export type ReviewPlatform = 'airbnb' | 'direct' | 'google' | 'vrbo';

export interface RatingCategories {
  cleanliness?: number;
  accuracy?: number;
  communication?: number;
  location?: number;
  checkIn?: number;
  value?: number;
}

export interface HostResponse {
  responseText: string;
  responseDate?: string;
  hostName?: string;
}

/**
 * Core normalized Review data model
 * Independent of any specific external provider
 */
export interface Review {
  listingId: string;
  reviewId: string;
  reviewerDisplayName: string;
  reviewerAvatarUrl?: string;
  reviewerLocation?: string;
  reviewText: string;
  starRating: number; // 1 to 5
  reviewDate: string; // e.g. "October 2024" or ISO string
  hostResponse?: HostResponse;
  sourcePlatform: ReviewPlatform;
  lastSyncTimestamp: string;
  isDemonstration?: boolean;
  ratingCategories?: RatingCategories;
  verifiedStay?: boolean;
  stayDuration?: string;
}

/**
 * Normalized Listing Summary & aggregate metrics
 */
export interface ListingSummary {
  listingId: string;
  listingTitle: string;
  listingUrl: string;
  locationName: string;
  propertyType: string;
  overallRating: number;
  reviewCount: number;
  isSuperhost: boolean;
  isGuestFavorite: boolean;
  categoryRatings: Required<RatingCategories>;
  sourcePlatform: ReviewPlatform;
  lastSyncTimestamp: string;
  isDemonstration: boolean;
  disclaimer?: string;
}

/**
 * Result payload returned by any review provider adapter
 */
export interface ListingReviewsResult {
  listingId: string;
  summary: ListingSummary;
  reviews: Review[];
  providerId: string;
  providerName: string;
  isDemonstration: boolean;
  fetchedAt: string;
  error?: string;
}
