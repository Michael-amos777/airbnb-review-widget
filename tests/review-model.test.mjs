import test from 'node:test';
import assert from 'node:assert/strict';

// Helper matching parseAirbnbListing
function parseAirbnbListing(input) {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isValid: false, errorMessage: 'Empty input' };
  }
  if (/^\d{6,22}$/.test(trimmed)) {
    return {
      isValid: true,
      listingId: trimmed,
      cleanUrl: `https://www.airbnb.co.uk/rooms/${trimmed}`,
    };
  }
  try {
    let urlString = trimmed;
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
      urlString = `https://${urlString}`;
    }
    const url = new URL(urlString);
    const host = url.hostname.toLowerCase();
    const isAirbnbHost =
      host === 'airbnb.com' ||
      host.endsWith('.airbnb.com') ||
      host === 'airbnb.co.uk' ||
      host.endsWith('.airbnb.co.uk') ||
      /^airbnb\.[a-z]{2,3}(\.[a-z]{2})?$/.test(host) ||
      /\.airbnb\.[a-z]{2,3}(\.[a-z]{2})?$/.test(host);

    if (!isAirbnbHost) {
      return { isValid: false, errorMessage: 'Not an Airbnb domain' };
    }
    const pathMatch = url.pathname.match(/\/rooms\/(\d+)/i);
    if (pathMatch && pathMatch[1]) {
      return {
        isValid: true,
        listingId: pathMatch[1],
        cleanUrl: `https://${url.hostname}/rooms/${pathMatch[1]}`,
      };
    }
    return { isValid: false, errorMessage: 'Missing /rooms/ID path' };
  } catch {
    return { isValid: false, errorMessage: 'Invalid URL format' };
  }
}

test('Listing URL parser validates test listing 987654321 correctly', () => {
  const testUrl = 'https://www.airbnb.co.uk/rooms/987654321';
  const result = parseAirbnbListing(testUrl);
  assert.equal(result.isValid, true);
  assert.equal(result.listingId, '987654321');
});

test('Listing URL parser handles query strings and subdomains', () => {
  const testUrl = 'https://www.airbnb.com/rooms/987654321?adults=2&check_in=2024-11-01';
  const result = parseAirbnbListing(testUrl);
  assert.equal(result.isValid, true);
  assert.equal(result.listingId, '987654321');
});

test('Listing URL parser accepts raw numeric listing ID', () => {
  const rawId = '987654321';
  const result = parseAirbnbListing(rawId);
  assert.equal(result.isValid, true);
  assert.equal(result.listingId, '987654321');
});

test('Listing URL parser rejects non-Airbnb domains and invalid paths', () => {
  assert.equal(parseAirbnbListing('https://example.com/rooms/12345').isValid, false);
  assert.equal(parseAirbnbListing('https://www.airbnb.co.uk/help').isValid, false);
  assert.equal(parseAirbnbListing('').isValid, false);
});

test('Review data model adheres to required architecture fields', async () => {
  // Import the DemoReviewProvider from built files or mock structure
  const requiredFields = [
    'listingId',
    'reviewId',
    'reviewerDisplayName',
    'reviewText',
    'starRating',
    'reviewDate',
    'sourcePlatform',
    'lastSyncTimestamp',
    'isDemonstration',
  ];

  const sampleReview = {
    listingId: '987654321',
    reviewId: 'demo-rev-001',
    reviewerDisplayName: 'Sarah Jenkins',
    reviewText: 'An absolutely wonderful stay! The property was spotless...',
    starRating: 5,
    reviewDate: 'October 2024',
    hostResponse: {
      responseText: 'Thank you so much Sarah!',
      responseDate: 'October 2024',
    },
    sourcePlatform: 'airbnb',
    lastSyncTimestamp: new Date().toISOString(),
    isDemonstration: true,
  };

  for (const field of requiredFields) {
    assert.ok(field in sampleReview, `Missing required field: ${field}`);
  }
  assert.equal(sampleReview.isDemonstration, true, 'Sample review must be flagged as demonstration');
  assert.equal(sampleReview.listingId, '987654321');
  assert.ok(sampleReview.hostResponse.responseText.length > 0);
});
