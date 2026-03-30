# Design System

## Overview

Central design reference for the JLS Reader Landing Page. All visual decisions live here — other files reference this document rather than defining their own styles. The system is implemented as CSS custom properties in `styles.css`.

The aesthetic: **premium, warm, confident**. Apple product page crossed with an internal memo — beautiful enough to be impressive, grounded enough to be credible.

## Dependencies

- None — this is the foundational reference that other files depend on.

## Color Palette

All colors defined as CSS custom properties on `:root`.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-cream` | `#faf6f0` | Primary background, page base |
| `--color-terracotta` | `#c45d2c` | Primary accent — CTAs, highlights, interactive elements |
| `--color-olive` | `#5c6b4f` | Secondary accent — supporting UI, badges, secondary text |
| `--color-ink` | `#1a1612` | Primary text, headings, high-contrast elements |

### Semantic Color Usage

| Context | Color(s) |
|---------|----------|
| Page background | Cream |
| Body text | Ink |
| Headlines | Ink |
| Primary buttons | Terracotta background, cream text |
| Primary button hover | Darken terracotta ~10% |
| Secondary buttons / links | Olive text, transparent background |
| Proof strip stat numbers | Terracotta |
| Badge ("Built & Ready") | Olive background, cream text |
| Section background shifts | Alternate between cream and a slightly darker cream (`#f5f0e8` or similar) to separate content zones without hard borders |
| Footer | Ink background, cream text |

### Contrast Requirements

All text/background combinations must meet WCAG AA (4.5:1 for body text, 3:1 for large text). Key pairs to verify:
- Ink on cream: ✅ passes easily
- Cream on terracotta: verify — may need slight adjustment
- Cream on olive: verify — may need slight adjustment

## Typography

### Font Families

```css
--font-display: 'DM Serif Display', Georgia, serif;
--font-body: 'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

- **DM Serif Display**: All headlines (h1, h2, h3). Warm, editorial, premium feel.
- **Instrument Sans**: All body text, bullets, labels, buttons, form inputs. Clean and modern.
- Both loaded from Google Fonts with `font-display: swap` — text renders immediately in system fallbacks, swaps when custom fonts arrive.

### Type Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| h1 (hero) | Display | `clamp(2.5rem, 5vw, 4rem)` | 400 (regular) | 1.1 | -0.02em |
| h2 (section) | Display | `clamp(2rem, 4vw, 3rem)` | 400 | 1.15 | -0.01em |
| h3 (subsection) | Display | `clamp(1.5rem, 3vw, 2rem)` | 400 | 1.2 | 0 |
| Body | Body | `clamp(1rem, 1.1vw, 1.125rem)` | 400 | 1.6 | 0 |
| Body large | Body | `clamp(1.125rem, 1.3vw, 1.25rem)` | 400 | 1.5 | 0 |
| Small / caption | Body | `0.875rem` | 400 | 1.4 | 0.01em |
| Button text | Body | `1rem` | 600 | 1 | 0.02em |
| Stat number | Display | `clamp(1.5rem, 3vw, 2.25rem)` | 400 | 1 | 0 |

### DM Serif Display Note

DM Serif Display only comes in regular weight (400). Do **not** apply `font-weight: bold` to it — it will trigger faux bolding. Use size and color for headline hierarchy instead.

## Spacing System

```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;       /* 16px */
--space-md: 1.5rem;     /* 24px */
--space-lg: 2rem;       /* 32px */
--space-xl: 3rem;       /* 48px */
--space-2xl: 4rem;      /* 64px */
--space-3xl: 6rem;      /* 96px */

--section-padding: clamp(4rem, 8vw, 8rem);
--content-max-width: 1200px;
```

- **Between sections**: `--section-padding` (generous vertical whitespace is critical to the premium feel)
- **Content width**: All text content constrained to `--content-max-width` with auto horizontal margins
- **Within sections**: Use the spacing tokens above. Prefer `--space-lg` and `--space-xl` between elements.

## Responsive Breakpoints

```css
--bp-mobile: 768px;     /* Below: mobile layout */
--bp-tablet: 1024px;    /* 768–1024: tablet layout */
/* Above 1024: desktop layout */
```

| Breakpoint | Key Adaptations |
|-----------|-----------------|
| Mobile (<768px) | Single column, stacked layouts, canvas animation replaced with static fallbacks, type scale shrinks via clamp, section padding reduces |
| Tablet (768–1024px) | Two-column where possible, side-by-side feature layouts, full animation if device supports it |
| Desktop (>1024px) | Full experience — three-column grids, alternating feature layouts, scroll animations active |

### Mobile-Specific Rules

- Minimum tap target: **44×44px** on all interactive elements
- Safe area insets: `padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)` on the body or outermost container
- No horizontal scroll — all content fits within viewport width

## Component Patterns

### Primary Button

- Background: `--color-terracotta`
- Text: `--color-cream`, `--font-body`, weight 600
- Padding: `--space-sm --space-lg` (vertical horizontal)
- Border-radius: `0.5rem`
- Hover: darken background ~10%, subtle `transform: translateY(-1px)` lift
- Focus: visible outline (2px solid terracotta, 2px offset)
- Min height: 48px (touch-friendly)

### Secondary Button / Text Link

- Background: transparent
- Text: `--color-olive`, `--font-body`, weight 600
- Underline on hover
- Same focus style as primary

### Card (used for risk reversal, stat cards)

- Background: white or slightly lighter than section background
- Border-radius: `0.75rem`
- Padding: `--space-lg`
- Subtle shadow: `0 2px 8px rgba(26, 22, 18, 0.06)`
- No hard border — shadow creates separation

### Section Container

- Max-width: `--content-max-width`
- Horizontal margin: auto (centered)
- Vertical padding: `--section-padding`
- Subtle background tone shift between adjacent sections (cream → slightly-darker-cream → cream)

### Section Transitions

No hard borders between sections. Use subtle background color shifts and generous whitespace to create visual separation. The effect should feel like one continuous scroll, not discrete boxes.

## Animation Principles

- All decorative animations respect `prefers-reduced-motion: reduce` — disable and show static fallbacks
- Scroll-driven animations: native scroll preserved, no scrolljacking
- Transition durations for UI elements (hover, focus): `150–250ms ease`
- Fade-in animations for text overlays: `300–500ms ease-out`
- Canvas animations are tied to scroll position, not time — see `02_Scroll_Animation_Engine.md`

## Gaps & Assumptions

| Gap | Default Applied |
|-----|----------------|
| Exact "slightly darker cream" for alternating sections not specified | Using `#f5f0e8` — adjust based on visual testing |
| No hover state colors specified for buttons | Darkening terracotta by 10% for primary, underline for secondary |
| No specified shadow values for cards | Using `0 2px 8px rgba(26, 22, 18, 0.06)` — subtle and warm-toned |
| Border-radius values not specified | Using `0.5rem` for buttons, `0.75rem` for cards |
