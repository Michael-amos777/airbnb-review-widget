export type WidgetTheme = 'light' | 'dark' | 'sand' | 'midnight' | 'glass';

export type CardRadius = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface WidgetCustomization {
  theme: WidgetTheme;
  accentColor: string; // e.g. '#FF385C' for Airbnb Coral
  cardsPerView: 1 | 2 | 3;
  cardRadius: CardRadius;
  showCategoryRatings: boolean;
  showReviewerAvatar: boolean;
  showReviewDate: boolean;
  showHostResponse: boolean;
  showGuestFavoriteBadge: boolean;
  showVerifiedBadge: boolean;
  maxReviewTextLength: number;
  carouselAutoplay: boolean;
  autoplayIntervalMs: number;
  showDemoNotice: boolean;
}

export const DEFAULT_WIDGET_CONFIG: WidgetCustomization = {
  theme: 'light',
  accentColor: '#FF385C', // Airbnb Coral
  cardsPerView: 2,
  cardRadius: 'xl',
  showCategoryRatings: true,
  showReviewerAvatar: true,
  showReviewDate: true,
  showHostResponse: true,
  showGuestFavoriteBadge: true,
  showVerifiedBadge: true,
  maxReviewTextLength: 260,
  carouselAutoplay: false,
  autoplayIntervalMs: 5000,
  showDemoNotice: true,
};

export interface ThemeColors {
  name: string;
  id: WidgetTheme;
  background: string;
  cardBackground: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  starColor: string;
  badgeBackground: string;
  badgeText: string;
  quoteColor: string;
}

export const THEME_PRESETS: Record<WidgetTheme, ThemeColors> = {
  light: {
    name: 'Clean Light',
    id: 'light',
    background: '#ffffff',
    cardBackground: '#ffffff',
    cardBorder: '#f0ede8',
    textPrimary: '#1e293b',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    starColor: '#f59e0b',
    badgeBackground: '#fef2f2',
    badgeText: '#e11d48',
    quoteColor: '#e2e8f0',
  },
  sand: {
    name: 'Warm Boutique / Sand',
    id: 'sand',
    background: '#faf7f2',
    cardBackground: '#ffffff',
    cardBorder: '#ebe3d5',
    textPrimary: '#292524',
    textSecondary: '#57534e',
    textMuted: '#a8a29e',
    starColor: '#d97706',
    badgeBackground: '#fef3c7',
    badgeText: '#92400e',
    quoteColor: '#f5eedf',
  },
  midnight: {
    name: 'Midnight Luxury',
    id: 'midnight',
    background: '#0f172a',
    cardBackground: '#1e293b',
    cardBorder: '#334155',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#64748b',
    starColor: '#fbbf24',
    badgeBackground: '#1e1b4b',
    badgeText: '#a5b4fc',
    quoteColor: '#334155',
  },
  dark: {
    name: 'Minimal Dark',
    id: 'dark',
    background: '#18181b',
    cardBackground: '#27272a',
    cardBorder: '#3f3f46',
    textPrimary: '#fafafa',
    textSecondary: '#d4d4d8',
    textMuted: '#71717a',
    starColor: '#facc15',
    badgeBackground: '#3f3f46',
    badgeText: '#f4f4f5',
    quoteColor: '#3f3f46',
  },
  glass: {
    name: 'Frosted Glass',
    id: 'glass',
    background: 'transparent',
    cardBackground: 'rgba(255, 255, 255, 0.75)',
    cardBorder: 'rgba(255, 255, 255, 0.4)',
    textPrimary: '#1e293b',
    textSecondary: '#475569',
    textMuted: '#64748b',
    starColor: '#f59e0b',
    badgeBackground: 'rgba(254, 242, 242, 0.8)',
    badgeText: '#e11d48',
    quoteColor: 'rgba(226, 232, 240, 0.5)',
  },
};
