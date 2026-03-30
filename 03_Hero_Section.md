# Hero Section (Above the Fold)

## Overview

The first thing Johnny sees. Must load fast, look premium, and communicate the value proposition in 2–3 seconds. No heavy animations above the fold — the hero is entirely static. The hero must also work as a **self-contained mini-pitch** for users who skip directly to the bottom CTA.

## Dependencies

* `01\_Design\_System.md` — Colors, typography, button styles, spacing
* `09\_Content\_Copy.md` — Exact headline, subheadline, and stat copy

## Layout

### Desktop (>1024px)

Two-column layout within `--content-max-width`:

```
┌──────────────────────────────────────────────────────────┐
│  \[Badge: "Built \& Ready to Test" ●]                      │
│                                                          │
│  ┌─────────────────────┐  ┌────────────────────────────┐ │
│  │                     │  │                            │ │
│  │  Headline           │  │  Dashboard Mockup Image    │ │
│  │  Subheadline        │  │  (browser frame with       │ │
│  │                     │  │   dashboard screenshot)    │ │
│  │  \[Try JLS Reader]   │  │                            │ │
│  │  See How It Works ↓ │  │                            │ │
│  │                     │  │                            │ │
│  └─────────────────────┘  └────────────────────────────┘ │
│                                                          │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │ $0/mo    │  │ Zero         │  │ 100%              │   │
│  │ core cost│  │ migration    │  │ reversible        │   │
│  └──────────┘  └──────────────┘  └───────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

### Mobile (<768px)

Single column, stacked:

1. Badge
2. Headline + Subheadline
3. CTAs
4. Dashboard mockup (full width)
5. Proof strip (horizontal scroll or stacked)

## Components

### Headline \& Subheadline

* **Headline**: "Training that feels like reading, not homework"

  * `h1`, DM Serif Display, hero size from type scale
  * Color: `--color-ink`
* **Subheadline**: Supporting value prop (1–2 sentences max)

  * `--font-body` at body-large size
  * Color: `--color-ink` at \~80% opacity or a slightly lighter tone

### "Built \& Ready to Test" Badge

* Positioned above the headline (top of the hero content area)
* Small pill-shaped badge: olive background, cream text
* **Pulsing dot**: A small circle to the left of the text with a CSS-only pulse animation

```css
.pulse-dot {
  width: 8px;
  height: 8px;
  background: #4ade80; /\* green — signals "live" \*/
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
}
```

* The pulse animation is CSS-only (no JS dependency for cosmetic detail)
* Respects `prefers-reduced-motion`: disable the animation, show a static dot

### Dashboard Mockup Image

* Static screenshot of the JLS Reader dashboard placed inside a browser frame
* Responsive sizing via `srcset` or CSS `max-width` — sharp on retina without being heavy
* Format: WebP with JPEG fallback using `<picture>` element
* **Alt text**: "JLS Reader dashboard showing greeting, course cards with progress bars, and a clean interface"
* Subtle shadow beneath the browser frame for depth
* No animation — this is a static image

### Proof Strip (3 Stats)

A horizontal row of three stat cards immediately below the hero content.

|Stat|Label|Notes|
|-|-|-|
|$0/mo|core cost|Clarify: "Core product free. AI features \~$0.01–0.05/day per user."|
|Zero|migration|The Google Sheet doesn't change|
|100%|reversible|Remove access anytime, no data changes|

Each stat card:

* Stat number in `--font-display` at stat-number size, `--color-terracotta`
* Label below in `--font-body` small size, `--color-ink`
* Arranged horizontally on desktop (flexbox, equal spacing)
* On mobile: horizontal scroll or three-up grid (stats are short enough to fit)

**Cost accuracy note**: The `$0/mo` stat specifically refers to the core product. The small text or tooltip should mention the AI feature cost. The PRD is explicit: honest disclosure of the \~$0.01–0.05/day AI cost builds more trust than claiming $0 for everything.

### CTAs

**Two CTAs only** (not three — see normalization note in `00\_README.md`).

1. **Primary: "Try JLS Reader"**

   * Primary button style (terracotta background, cream text) — see `01\_Design\_System.md`
   * Links to the live JLS Reader app URL
   * **Opens in a new tab** (`target="\_blank"`, `rel="noopener noreferrer"`) — Johnny must not lose the landing page context
   * Prominent placement: left-aligned below the subheadline on desktop, full-width on mobile
2. **Secondary: "See How It Works"**

   * Text link style with a downward arrow indicator (↓)
   * Smooth-scrolls to the solution/features section (`#solution`)
   * Smaller text, positioned below the primary CTA
   * This is a **scroll anchor**, not a conversion CTA — its job is to encourage scrolling for visitors who aren't ready to click the primary CTA yet

**No "Request Test Access" CTA in the hero.** The email form lives in the final CTA section (`07\_Final\_CTA\_Footer.md`). The hero's job is to hook attention and establish credibility, not to present all conversion paths.

### Smooth Scroll for "See How It Works"

Standard smooth scroll behavior:

```css
html { scroll-behavior: smooth; }
```

Or handle via JS for more control (easing, offset for any fixed headers). Target: the `#solution` section anchor.

## Performance Requirements

The hero is the **most performance-critical section** of the entire page. It must render fast — any delay destroys the premium signal before the pitch begins.

|Requirement|Implementation|
|-|-|
|No heavy assets above the fold|No canvas, no animation frames, no video|
|Dashboard mockup optimized|WebP, appropriately sized (don't serve a 3000px image for a 600px container)|
|Fonts load gracefully|System font fallbacks render text immediately; custom fonts swap in via `font-display: swap`|
|Hero content is static HTML/CSS|No JS required for anything in the hero to render (badge pulse is CSS-only)|
|Animation frame preloading starts here|`canvas-animation.js` begins loading Zone 1 frames in the background while user reads the hero|

## Gaps \& Assumptions

|Gap|Default Applied|
|-|-|
|JLS Reader app URL not provided|Placeholder: `https://jls-reader-app.netlify.app` — confirm before launch|
|Exact subheadline copy not finalized|Draft provided in `09\_Content\_Copy.md`|
|Dashboard mockup image not yet created|See `10\_Assets\_Checklist.md` for specs|
|Badge position (above headline vs. top-right corner) not specified|Defaulting to above headline, left-aligned with the text content|
|Whether proof strip sits inside the hero or below it as a separator|Defaulting to below the two-column hero content, spanning full `--content-max-width`|

## Implementation Notes

* Build the hero first and test its load time before adding any other sections. If the hero doesn't feel instant, nothing else matters.
* The "See How It Works" scroll target (`#solution`) must exist before this link works — coordinate with `05\_Solution\_Features.md`.

