import { ListingReviewsResult, ListingSummary, Review } from '@/types/review';
import { ReviewProviderAdapter } from './types';

/**
 * Sample demonstration reviews specifically prepared for widget layout & visual testing.
 * All items are clearly flagged as demonstration data and must NEVER be represented as live Airbnb reviews.
 */
const DEMO_REVIEWS: Review[] = [
  {
    listingId: 'demo-listing-123',
    reviewId: 'demo-rev-001',
    reviewerDisplayName: 'Sarah Jenkins',
    reviewerLocation: 'London, United Kingdom',
    reviewerAvatarUrl: '',
    reviewText:
      'An absolutely wonderful stay! The property was spotless, beautifully designed, and even more charming than the photos. The attention to detail from the host made us feel welcomed right away. The kitchen was well equipped and the bed was exceptionally comfortable. We will definitely return!',
    starRating: 5,
    reviewDate: 'October 2024',
    hostResponse: {
      responseText:
        'Thank you so much for the glowing review, Sarah! It was an absolute pleasure hosting you and we look forward to welcoming you back anytime.',
      responseDate: 'October 2024',
      hostName: 'Host',
    },
    sourcePlatform: 'airbnb',
    lastSyncTimestamp: '2024-10-25T14:30:00Z',
    isDemonstration: true,
    verifiedStay: true,
    stayDuration: 'Stayed 3 nights',
    ratingCategories: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      checkIn: 5,
      value: 5,
    },
  },
  {
    listingId: 'demo-listing-123',
    reviewId: 'demo-rev-002',
    reviewerDisplayName: 'Marcus & Elena Vance',
    reviewerLocation: 'Edinburgh, United Kingdom',
    reviewerAvatarUrl: '',
    reviewText:
      'Such a peaceful retreat! The location was quiet yet accessible, and the interior touches made it feel like a boutique luxury hotel. Check-in was completely seamless with clear instructions. Perfect spot for a weekend getaway.',
    starRating: 5,
    reviewDate: 'September 2024',
    sourcePlatform: 'airbnb',
    lastSyncTimestamp: '2024-10-25T14:30:00Z',
    isDemonstration: true,
    verifiedStay: true,
    stayDuration: 'Stayed 2 nights',
  },
  {
    listingId: 'demo-listing-123',
    reviewId: 'demo-rev-003',
    reviewerDisplayName: 'David Thorne',
    reviewerLocation: 'Bristol, United Kingdom',
    reviewerAvatarUrl: '',
    reviewText:
      'High-speed Wi-Fi was flawless for remote working, followed by a relaxing evening in the private space. The host communicated promptly and provided top-notch local recommendations for dining. Highly recommended.',
    starRating: 5,
    reviewDate: 'September 2024',
    hostResponse: {
      responseText:
        'Glad the Wi-Fi and work setup worked well for you, David! Hope your meetings went smoothly.',
      responseDate: 'September 2024',
      hostName: 'Host',
    },
    sourcePlatform: 'airbnb',
    lastSyncTimestamp: '2024-10-25T14:30:00Z',
    isDemonstration: true,
    verifiedStay: true,
    stayDuration: 'Stayed 4 nights',
  },
  {
    listingId: 'demo-listing-123',
    reviewId: 'demo-rev-004',
    reviewerDisplayName: 'Clara Dubois',
    reviewerLocation: 'Paris, France',
    reviewerAvatarUrl: '',
    reviewText:
      'Un séjour magnifique! Everything was clean, warm, and inviting. The natural light in the morning is stunning, and the neighborhood felt very safe. We appreciated the thoughtful welcome basket.',
    starRating: 5,
    reviewDate: 'August 2024',
    sourcePlatform: 'airbnb',
    lastSyncTimestamp: '2024-10-25T14:30:00Z',
    isDemonstration: true,
    verifiedStay: true,
    stayDuration: 'Stayed 5 nights',
  },
  {
    listingId: 'demo-listing-123',
    reviewId: 'demo-rev-005',
    reviewerDisplayName: 'Liam O’Connor',
    reviewerLocation: 'Dublin, Ireland',
    reviewerAvatarUrl: '',
    reviewText:
      'One of the best Airbnb experiences we’ve had. Every amenity was well considered, from the coffee maker to the plush towels. 5 stars across the board.',
    starRating: 5,
    reviewDate: 'July 2024',
    sourcePlatform: 'airbnb',
    lastSyncTimestamp: '2024-10-25T14:30:00Z',
    isDemonstration: true,
    verifiedStay: true,
    stayDuration: 'Stayed 3 nights',
  },
  {
    listingId: 'demo-listing-123',
    reviewId: 'demo-rev-006',
    reviewerDisplayName: 'Hannah Schmidt',
    reviewerLocation: 'Munich, Germany',
    reviewerAvatarUrl: '',
    reviewText:
      'Super clean, stylish Scandinavian-inspired decor, and fantastic water pressure in the shower! The host checked in via message to ensure we had everything we needed. Truly a 5-star host.',
    starRating: 5,
    reviewDate: 'June 2024',
    sourcePlatform: 'airbnb',
    lastSyncTimestamp: '2024-10-25T14:30:00Z',
    isDemonstration: true,
    verifiedStay: true,
    stayDuration: 'Stayed 2 nights',
  },
];

export class DemoReviewProvider implements ReviewProviderAdapter {
  readonly id = 'demo-adapter';
  readonly name = 'Demonstration Provider (Simulated Data)';
  readonly description =
    'Provides sample vacation-rental reviews for UI design, widget customisation, and embed prototyping without live API dependencies.';
  readonly isDemonstrationProvider = true;

  async fetchListingSummary(listingId: string): Promise<ListingSummary> {
    return {
      listingId,
      listingTitle: 'Boutique Vacation Rental Experience',
      listingUrl: `https://www.airbnb.co.uk/rooms/${listingId}`,
      locationName: 'United Kingdom',
      propertyType: 'Entire Home / Apartment',
      overallRating: 4.96,
      reviewCount: 48,
      isSuperhost: true,
      isGuestFavorite: true,
      categoryRatings: {
        cleanliness: 5.0,
        accuracy: 4.9,
        communication: 5.0,
        location: 4.9,
        checkIn: 5.0,
        value: 4.8,
      },
      sourcePlatform: 'airbnb',
      lastSyncTimestamp: new Date().toISOString(),
      isDemonstration: true,
      disclaimer:
        'DEMO MODE: These reviews and ratings are simulated demonstration samples designed to test widget formatting and carousel animations. They are not retrieved from the live Airbnb API.',
    };
  }

  async fetchListingReviews(listingId: string): Promise<ListingReviewsResult> {
    const summary = await this.fetchListingSummary(listingId);

    // Map reviews to match the requested listing ID
    const reviews = DEMO_REVIEWS.map((rev, index) => ({
      ...rev,
      listingId,
      reviewId: `demo-${listingId}-${index + 1}`,
    }));

    return {
      listingId,
      summary,
      reviews,
      providerId: this.id,
      providerName: this.name,
      isDemonstration: true,
      fetchedAt: new Date().toISOString(),
    };
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: 'Demonstration adapter is active and operational.',
    };
  }
}
