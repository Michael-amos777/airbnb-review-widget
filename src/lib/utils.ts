import { ListingValidationResult } from './adapters/types';

/**
 * Validate and parse an Airbnb listing URL or raw Listing ID
 */
export function parseAirbnbListing(input: string): ListingValidationResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      isValid: false,
      errorMessage: 'Please enter an Airbnb listing URL or Listing ID',
    };
  }

  // Check if input is a pure numeric ID (standard Airbnb IDs are 6 to 22 digits)
  if (/^\d{6,22}$/.test(trimmed)) {
    return {
      isValid: true,
      listingId: trimmed,
      cleanUrl: `https://www.airbnb.co.uk/rooms/${trimmed}`,
    };
  }

  // Check for Airbnb rooms URL pattern
  try {
    let urlString = trimmed;
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
      urlString = `https://${urlString}`;
    }

    const url = new URL(urlString);
    const host = url.hostname.toLowerCase();

    // Verify it's an Airbnb domain
    const isAirbnbHost =
      host === 'airbnb.com' ||
      host.endsWith('.airbnb.com') ||
      host === 'airbnb.co.uk' ||
      host.endsWith('.airbnb.co.uk') ||
      /^airbnb\.[a-z]{2,3}(\.[a-z]{2})?$/.test(host) ||
      /\.airbnb\.[a-z]{2,3}(\.[a-z]{2})?$/.test(host);

    if (!isAirbnbHost) {
      return {
        isValid: false,
        errorMessage: 'Domain must be an official Airbnb URL (e.g. airbnb.com or airbnb.co.uk)',
      };
    }

    // Extract room ID from path: /rooms/12345678 or /rooms/12345678/...
    const pathMatch = url.pathname.match(/\/rooms\/(\d+)/i);
    if (pathMatch && pathMatch[1]) {
      const listingId = pathMatch[1];
      return {
        isValid: true,
        listingId,
        cleanUrl: `https://${url.hostname}/rooms/${listingId}`,
      };
    }

    return {
      isValid: false,
      errorMessage: 'URL must point to a listing (e.g. https://www.airbnb.co.uk/rooms/12345678)',
    };
  } catch {
    return {
      isValid: false,
      errorMessage: 'Invalid URL format. Please enter a valid Airbnb web address.',
    };
  }
}

/**
 * Generate avatar color from a name
 */
export function getAvatarColor(name: string): { bg: string; text: string } {
  const palettes = [
    { bg: '#fee2e2', text: '#b91c1c' }, // Rose
    { bg: '#ffedd5', text: '#c2410c' }, // Orange
    { bg: '#fef3c7', text: '#b45309' }, // Amber
    { bg: '#dcfce7', text: '#15803d' }, // Green
    { bg: '#e0e7ff', text: '#4338ca' }, // Indigo
    { bg: '#f3e8ff', text: '#7e22ce' }, // Purple
    { bg: '#ccfbf1', text: '#0f766e' }, // Teal
    { bg: '#fce7f3', text: '#be185d' }, // Pink
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % palettes.length;
  return palettes[index];
}

/**
 * Extract 1-2 letter initials from a display name
 */
export function getInitials(name: string): string {
  if (!name) return 'G';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Format date string nicely
 */
export function formatReviewDate(dateString: string): string {
  if (!dateString) return '';
  // If already like "October 2024" or "September 2024", keep it
  if (/^[A-Za-z]+\s+\d{4}$/.test(dateString.trim())) {
    return dateString;
  }
  try {
    const d = new Date(dateString);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    }
  } catch {
    // fallback
  }
  return dateString;
}
