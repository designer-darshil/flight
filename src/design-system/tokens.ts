/**
 * ==================================================
 * AERIVA DESIGN SYSTEM — PHASE 01 FOUNDATION TOKENS
 * ==================================================
 * 
 * Global visual foundation for all AERIVA screens, components,
 * modals, dialogs, drawers, and operational tools.
 * 
 * Personality:
 * - Editorial
 * - Premium
 * - Warm
 * - Modern
 * - Calm
 * - Precise
 * - Travel-focused
 * - Sophisticated
 */

export const AERIVA_BRAND = {
  name: 'AERIVA',
  tagline: 'Travel Without The Friction',
  positioning: 'Premium global flight booking platform',
} as const;

export const AERIVA_COLORS = {
  // Canvases & Surfaces
  bgPrimary: '#F6F2EA',      // Cream base
  bgSecondary: '#EFE9DE',    // Sand secondary
  surface: '#FFFFFF',        // Pure white paper surface

  // Typography
  textPrimary: '#171717',    // Deep Ink
  textSecondary: '#6F6A61',  // Warm Gray

  // Boundaries & Dividers
  border: '#D8D1C5',         // Warm Gray border

  // Accents & Actions
  accentWarm: '#C96B45',         // Warm terracotta (decorative, large elements)
  accentPrimary: '#963F24',      // Accessible primary accent (WCAG 2.1 AA compliant on white > 4.5:1)
  accentSecondary: '#596052',    // Deep olive (secondary status, verified badges)
  accentSoft: '#E9DDD3',         // Soft champagne tint

  // Semantic Status Colors
  success: '#3F6B4F',        // Forest green (confirmed, on-time)
  warning: '#8A5A1F',        // Amber ochre (caution, boarding soon)
  error: '#9B3D32',          // Rust red (delayed, cancelled, validation error)

  // Subtle Overlays (NO BLUR)
  overlayModal: 'rgba(23, 23, 23, 0.25)',
  overlayDrawer: 'rgba(23, 23, 23, 0.20)',
} as const;

/**
 * WCAG 2.1 AA Accessibility Contract:
 * - Normal text (< 18pt or < 14pt bold): Minimum contrast 4.5:1
 * - Large text (>= 18pt or >= 14pt bold): Minimum contrast 3.0:1
 * - Known Failure: #C96B45 on #FFFFFF (~3.3:1) -> DO NOT use for normal body text.
 * - Compliant Pairing: #963F24 on #FFFFFF (6.2:1) -> Pass AA and AAA for large text.
 */
export const AERIVA_CONTRAST_RULES = {
  primaryCta: {
    bg: AERIVA_COLORS.accentPrimary, // #963F24
    text: AERIVA_COLORS.surface,      // #FFFFFF
    contrastRatio: '6.2:1',
    wcagStatus: 'PASS (WCAG 2.1 AA & AAA Large)',
  },
  accessibleTextOnWhite: {
    text: AERIVA_COLORS.accentPrimary, // #963F24
    bg: AERIVA_COLORS.surface,         // #FFFFFF
    contrastRatio: '6.2:1',
    wcagStatus: 'PASS (WCAG 2.1 AA)',
  },
  bodyTextOnCream: {
    text: AERIVA_COLORS.textPrimary, // #171717
    bg: AERIVA_COLORS.bgPrimary,     // #F6F2EA
    contrastRatio: '14.1:1',
    wcagStatus: 'PASS (WCAG 2.1 AAA)',
  },
  secondaryTextOnCream: {
    text: AERIVA_COLORS.textSecondary, // #6F6A61
    bg: AERIVA_COLORS.bgPrimary,       // #F6F2EA
    contrastRatio: '5.2:1',
    wcagStatus: 'PASS (WCAG 2.1 AA)',
  },
} as const;

export const AERIVA_TYPOGRAPHY = {
  fontFamily: {
    primary: 'Manrope, Inter, system-ui, sans-serif',
    fallback: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  scale: {
    displayXl: {
      fontSize: '4.5rem', // 72px
      lineHeight: '1.05',
      fontWeight: '700',
      letterSpacing: '-0.035em',
    },
    display: {
      fontSize: '3.5rem', // 56px
      lineHeight: '1.1',
      fontWeight: '700',
      letterSpacing: '-0.03em',
    },
    h1: {
      fontSize: '2.5rem', // 40px
      lineHeight: '1.15',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2rem', // 32px
      lineHeight: '1.2',
      fontWeight: '600',
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.5rem', // 24px
      lineHeight: '1.3',
      fontWeight: '600',
      letterSpacing: '-0.015em',
    },
    h4: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.35',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    bodyLarge: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '-0.005em',
    },
    body: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0em',
    },
    bodySmall: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.45',
      fontWeight: '400',
      letterSpacing: '0em',
    },
    caption: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.4',
      fontWeight: '500',
      letterSpacing: '0.01em',
    },
    eyebrow: {
      fontSize: '0.6875rem', // 11px
      lineHeight: '1.3',
      fontWeight: '700',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    },
  },
} as const;

/**
 * 4px Base Grid Spacing Scale
 * Allowed values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 144
 */
export const AERIVA_SPACING = {
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  32: '32px',
  40: '40px',
  48: '48px',
  64: '64px',
  80: '80px',
  96: '96px',
  120: '120px',
  144: '144px',
} as const;

/**
 * Radius Scale
 * Allowed values: 6px, 8px, 12px, 16px, 20px
 * Avoid excessive pill shapes.
 */
export const AERIVA_RADIUS = {
  xs: '6px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
} as const;

/**
 * Tactile Shadows
 * Subtle physical elevation, no heavy black shadows.
 */
export const AERIVA_SHADOWS = {
  small: '0 4px 16px rgba(23, 23, 23, 0.06)',
  medium: '0 12px 32px rgba(23, 23, 23, 0.08)',
  large: '0 24px 60px rgba(23, 23, 23, 0.10)',
  modal: '0 20px 60px rgba(23, 23, 23, 0.12)',
  drawer: '-20px 0 60px rgba(23, 23, 23, 0.08)',
} as const;

/**
 * Grid System & Layout Specifications
 */
export const AERIVA_GRID = {
  desktop: {
    columns: 12,
    maxWidth: '1280px',
    extendedMaxWidth: '1440px',
    gutter: '24px',
  },
  tablet: {
    columns: 8,
    gutter: '16px',
  },
  mobile: {
    columns: 4,
    gutter: '12px',
  },
} as const;

export const AERIVA_BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
} as const;

export const AERIVA_MOTION = {
  duration: {
    fast: '150ms',
    base: '250ms',
    slow: '400ms',
  },
  easing: {
    editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
