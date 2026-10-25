/**
 * StayReviews - Standalone Airbnb Review Widget Embed Loader
 * Pure client-side JavaScript snippet for external website embedding.
 * Safe, zero-credential, responsive iframe loader with automatic height synchronisation.
 */
(function () {
  'use strict';

  // Determine script origin to build absolute iframe URLs
  function getScriptOrigin() {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      const src = scripts[i].src;
      if (src && src.indexOf('/embed.js') !== -1) {
        try {
          const url = new URL(src);
          return url.origin;
        } catch (e) {
          // fallback
        }
      }
    }
    return window.location.origin;
  }

  const BASE_ORIGIN = getScriptOrigin();

  function initWidgets() {
    // Find all target containers on the host page
    const containers = document.querySelectorAll('[data-listing-id], [id^="airbnb-review-widget"]');

    containers.forEach(function (container) {
      if (container.getAttribute('data-widget-loaded') === 'true') {
        return; // Already initialized
      }

      const listingId = container.getAttribute('data-listing-id');
      if (!listingId) return;
      const theme = container.getAttribute('data-theme') || 'light';
      const accent = (container.getAttribute('data-accent') || 'FF385C').replace('#', '');
      const cards = container.getAttribute('data-cards') || '2';
      const radius = container.getAttribute('data-radius') || 'xl';

      const iframeSrc =
        BASE_ORIGIN +
        '/embed/' +
        encodeURIComponent(listingId) +
        '?theme=' +
        encodeURIComponent(theme) +
        '&accent=' +
        encodeURIComponent(accent) +
        '&cards=' +
        encodeURIComponent(cards) +
        '&radius=' +
        encodeURIComponent(radius);

      // Create responsive iframe
      const iframe = document.createElement('iframe');
      iframe.src = iframeSrc;
      iframe.title = 'Airbnb Guest Reviews - Listing ' + listingId;
      iframe.style.width = '100%';
      iframe.style.height = '460px'; // Initial height before postMessage handshake
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.style.transition = 'height 0.25s ease-out';
      iframe.loading = 'lazy';
      iframe.setAttribute('scrolling', 'no');

      // Clear container and append iframe
      container.innerHTML = '';
      container.appendChild(iframe);
      container.setAttribute('data-widget-loaded', 'true');

      // Listen for auto-resize messages from the child iframe
      window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'airbnb-widget-resize') {
          if (event.data.listingId === listingId && event.data.height) {
            iframe.style.height = event.data.height + 16 + 'px';
          }
        }
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidgets);
  } else {
    initWidgets();
  }
})();
