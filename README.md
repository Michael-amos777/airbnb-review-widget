# Airbnb Review Widget (StayReviews)

A local, personal-use web application and embeddable carousel widget that showcases Airbnb listing reviews on vacation-rental and direct-booking websites.

- **Initial Test Listing:** [https://www.airbnb.co.uk/rooms/YOUR_LISTING_ID](https://www.airbnb.co.uk/rooms/YOUR_LISTING_ID)
- **Listing ID:** `YOUR_LISTING_ID`
- **Host Role:** Managed directly by the property owner/host on Airbnb.

---

## 🌟 Key Features

### Phase 1: Working Interface & Widget Studio
- **Listing URL Bar:** Real-time URL validation and listing ID extraction for any Airbnb listing URL (`airbnb.co.uk`, `airbnb.com`, international domains) or raw numeric ID.
- **Quick Test Preset:** One-click button to load and preview test listing `YOUR_LISTING_ID`.
- **Aggregate Rating Header:** 5-star score display (`4.96 ★`), total review count, Airbnb trust badges (*Guest favourite*, *Superhost*).
- **Category Rating Breakdown:** Visual meters for Cleanliness, Accuracy, Communication, Location, Check-in, and Value.
- **Interactive Sliding Testimonial Carousel:**
  - Horizontally sliding cards with smooth CSS transitions and transforms.
  - Previous and Next controls, keyboard navigation (`ArrowLeft` / `ArrowRight`), and touch-swipe gestures on mobile.
  - Progress pagination dots and slide counter (`Showing 1–2 of 6`).
  - Reviewer avatars with curated warm palettes or initials, location, stay dates, and verified stay badges.
  - Text expansion toggle (*"Read more"* / *"Show less"*).
  - Expandable host response section displaying host care and hospitality.
  - Responsive multi-card layouts (1, 2, or 3 cards on desktop; 1 card on mobile).
- **Live Widget Customizer:**
  - **Themes:** Clean Light, Warm Boutique / Sand, Midnight Luxury, Minimal Dark, Frosted Glass.
  - **Accent Colors:** Airbnb Coral (`#FF385C`), Warm Amber, Rose Petal, Emerald Forest, Indigo Sky, or custom hex.
  - **Card Corner Styles:** Subtle, Medium, Rounded, Soft Pill.
  - **Visibility Toggles:** Toggle categories, avatars, dates, host responses, badges, and autoplay.
  - **Backdrop Simulator:** Preview the widget against light, sand, dark, or grid website backdrops.
- **Embed Code Generator:** One-click copy modal for:
  - Standalone HTML `<script>` loader snippet
  - Responsive `<iframe>` snippet with automatic height sync
  - React / Next.js component snippet

### Phase 2: Decoupled Review Data Architecture
- **Normalized Data Model (`src/types/review.ts`):** Universal `Review` and `ListingSummary` interfaces containing all required fields:
  - `listingId`
  - `reviewId`
  - `reviewerDisplayName`
  - `reviewText`
  - `starRating`
  - `reviewDate`
  - `hostResponse` (`responseText`, `responseDate`, `hostName`)
  - `sourcePlatform` (`airbnb`, `direct`, etc.)
  - `lastSyncTimestamp`
- **Adapter Interface (`src/lib/adapters/types.ts`):** `ReviewProviderAdapter` cleanly separates review retrieval logic from widget rendering.
- **Provider Registry (`src/lib/adapters/index.ts`):** Allows switching between providers without modifying widget code.
- **External PMS Adapter Architecture (`src/lib/adapters/pmsAdapter.ts`):** Structured foundation for connecting channel managers (Hospitable, Guesty, Smoobu, OwnerRez) or direct Airbnb Partner APIs.

### Phase 3: Clearly Identified Demonstration Data
- Built-in `DemoReviewProvider` with realistic sample reviews tailored for property layout testing.
- Visible, unambiguous **Development Mode Notice** on the widget and in the header:
  > *"Development Mode: Demonstration Data. Showing simulated sample reviews for layout & carousel testing. Not fetched from live Airbnb API."*
- Never presents simulated reviews as genuine Airbnb data.

### Phase 4: Retrieval Technical Investigation
Full investigation documented both in this README and directly inside the app's interactive **Retrieval Guide** tab:
- Detailed analysis of Property Management Systems (Hospitable, Guesty, Smoobu, OwnerRez).
- Official Airbnb Partner API vs PMS channel manager bridging.
- Clear technical explanation of why automated scraping violates Airbnb Terms of Service (Section 13) and risks account suspension.
- Clear implementation roadmap for the property owner.

### Phase 5: Standalone Embeddable Widget
- Standalone zero-chrome route: `/embed/[listingId]` accepting query parameters (`?theme=sand&accent=FF385C&cards=2`).
- Standalone JavaScript embed loader: `public/embed.js` automatically creates a responsive iframe on any external webpage and synchronizes height via `window.postMessage`.
- Working demonstration page: `public/demo-embed.html`.
- No private API keys or host credentials exposed in client-side code.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18.18+ (tested on Node v24.20)
- npm v10+

### Installation

1. Navigate to the project directory:
```bash
cd airbnb-review-widget
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the local development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Main Dashboard & Studio:** [http://localhost:3000](http://localhost:3000)
- **Standalone Embed Endpoint:** [http://localhost:3000/embed/YOUR_LISTING_ID](http://localhost:3000/embed/YOUR_LISTING_ID)
- **External Site Demo:** [http://localhost:3000/demo-embed.html](http://localhost:3000/demo-embed.html)

### Running Automated Checks

Run the automated test suite:
```bash
npm test
```

Run production build validation:
```bash
npm run build
```

---

## 📁 Project Architecture

```
airbnb-review-widget/
├── src/
│   ├── types/
│   │   ├── review.ts                 # Normalized review & summary data models
│   │   └── widget.ts                 # Theme presets and customization options
│   ├── lib/
│   │   ├── utils.ts                  # URL validator, ID extractor, avatar helpers
│   │   └── adapters/
│   │       ├── types.ts              # Universal ReviewProviderAdapter interface
│   │       ├── demoProvider.ts       # Demonstration provider with realistic samples
│   │       ├── pmsAdapter.ts         # External PMS / Channel Manager adapter stub
│   │       └── index.ts              # Provider registry and factory
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Icons.tsx             # Clean inline SVG icons
│   │   │   ├── StarRating.tsx        # Fractional 5-star rating renderer
│   │   │   └── Badge.tsx             # Guest favorite, Superhost, Verified, Demo badges
│   │   ├── widget/
│   │   │   ├── AirbnbReviewWidget.tsx # Master reusable widget container
│   │   │   ├── WidgetHeader.tsx      # Overall score, badges, and category meters
│   │   │   ├── ReviewCarousel.tsx    # Horizontally sliding carousel with touch & arrows
│   │   │   └── ReviewCard.tsx        # Individual review card with host reply
│   │   ├── dashboard/
│   │   │   ├── ListingUrlBar.tsx     # URL input with real-time validation
│   │   │   ├── SettingsPanel.tsx     # Theme, accent, card radius & visibility panel
│   │   │   ├── EmbedCodeModal.tsx    # Snippet generator (Script, Iframe, React)
│   │   │   └── RetrievalGuideTab.tsx # Interactive Phase 4 investigation documentation
│   │   └── layout/
│   │       └── Navbar.tsx            # Header with tab switcher & demo badge
│   └── app/
│       ├── layout.tsx                # Root HTML layout with Geist font
│       ├── page.tsx                  # Main Widget Studio page
│       ├── embed/[listingId]/page.tsx # Standalone embed route for iframes
│       └── globals.css               # Design tokens and carousel transition styles
├── public/
│   ├── embed.js                      # Standalone client-side script loader
│   └── demo-embed.html               # External site demonstration
├── tests/
│   └── review-model.test.mjs         # Automated test suite
└── package.json
```

---

## 📋 Phase 4: Retrieval Investigation Summary

| Approach | Review Text Available? | Automatic Sync? | Authentication & Pricing | Terms Compliance | Recommended for Host? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. PMS Channel Manager** (Hospitable, Smoobu, Guesty, OwnerRez) | **Yes** (full text, dates, scores, host replies) | **Yes** (Real-time webhooks or hourly REST sync) | Official Airbnb OAuth in PMS. Subscriptions start ~$25–40/mo (free trials available). | **100% Compliant**. Uses official Airbnb Preferred Partner APIs. | ⭐ **YES (Optimal)** |
| **2. Direct Airbnb Developer Platform API** | **Yes** | **Yes** | OAuth 2.0 Client Credentials. | 100% Compliant. | ⚠️ Limited to enterprise partners with &gt;20 listings. |
| **3. Automated Web Scraping** | Yes (fragile) | Intermittent | Headless browser / proxies. | ❌ **Violates Section 13 of Airbnb Terms**. High risk of IP blocking, CAPTCHA, and account suspension. | ❌ **NO (Forbidden)** |

---

## 🔒 Security & Privacy

- Client-side embed codes expose **zero private API keys or host credentials**.
- In production, PMS webhooks authenticate securely on the server via `PMS_API_KEY` and `PMS_WEBHOOK_SECRET` environment variables.
