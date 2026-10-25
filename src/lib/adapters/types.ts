import { ListingReviewsResult, ListingSummary, Review } from '@/types/review';

/**
 * Universal Review Provider Adapter Interface
 * All review retrieval strategies (Demo, Official Partner API, PMS Webhooks, CSV Export)
 * implement this interface.
 *
 * This decouples the display widget from the review origin.
 */
export interface ReviewProviderAdapter {
  /** Unique machine identifier for this adapter */
  readonly id: string;
  
  /** Human-readable adapter name */
  readonly name: string;
  
  /** Brief description of how this adapter works */
  readonly description: string;
  
  /** Whether this adapter returns simulated/demonstration reviews */
  readonly isDemonstrationProvider: boolean;

  /**
   * Fetch reviews for the given listing ID
   */
  fetchListingReviews(listingId: string): Promise<ListingReviewsResult>;

  /**
   * Fetch aggregate listing summary metrics
   */
  fetchListingSummary(listingId: string): Promise<ListingSummary>;

  /**
   * Optional health check or connectivity test for the external provider
   */
  testConnection?(): Promise<{ success: boolean; message: string }>;
}

export interface ListingValidationResult {
  isValid: boolean;
  listingId?: string;
  cleanUrl?: string;
  errorMessage?: string;
}
