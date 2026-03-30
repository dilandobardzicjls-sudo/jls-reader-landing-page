# Performance & Accessibility

## Overview

Cross-cutting concerns that apply to the entire page. This file covers performance optimization (fast load, efficient assets), accessibility (WCAG AA compliance), and meta/sharing tags. These are implemented as a final pass after all sections are built, but the principles should be followed during development to avoid retrofitting.

## Dependencies

- `01_Design_System.md` — Color contrast requirements, typography (font loading)
- `02_Scroll_Animation_Engine.md` — Frame preloading strategy, mobile fallback detection
- `10_Assets_Checklist.md` — Asset formats and dimensions

## Performance

### Priority: Fast Above-the-Fold Render

The hero must render in under 1–2 seconds on a reasonable connection. Nothing heavy should block first paint.

| Requirement | How |
|-------------|-----|
| No animation assets above the fold | Canvas frames load in background after hero renders |
| System font fallback | `font-display: swap` — text visible immediately in system fonts |
| Static hero mockup | Appropriately sized, compressed WebP image |
| No render-blocking JS | GSAP loaded with `defer`; `canvas-animation.js` and `scroll-triggers.js` loaded with `defer` |
| Minimal critical CSS | Consider inlining above-the-fold CSS in a `<style>` tag in `<head>`, or rely on the single stylesheet loading quickly |

### Image Optimization

| Image Type | Format | Notes |
|------------|--------|-------|
| App mockups | WebP primary, JPEG fallback | Use `<picture>` element with `<source type="image/webp">` and `<img>` fallback |
| Canvas animation frames | JPEG only | WebP decode is slower for rapid canvas painting. Keep as JPEG ~80% quality |
| Mobile fallback images | WebP | Static keyframes from animations |
| Logo | SVG | Vector, infinitely scalable |
| OG preview image | PNG | 1200×630px, required format for social sharing |
| Favicon | .ico (32×32) + .png (180×180) | Multi-format for browser and Apple touch icon |

### Responsive Image Sizing

Don't serve a 3000px image when the container is 600px. Use `srcset` and `sizes` attributes on mockup images:

```html
<picture>
  <source type="image/webp"
          srcset="mockup-400.webp 400w, mockup-800.webp 800w, mockup-1200.webp 1200w"
          sizes="(max-width: 768px) 100vw, 50vw">
  <img src="mockup-800.jpg"
       srcset="mockup-400.jpg 400w, mockup-800.jpg 800w, mockup-1200.jpg 1200w"
       sizes="(max-width: 768px) 100vw, 50vw"
       alt="..." loading="lazy">
</picture>
```

Generate 2–3 sizes per mockup image (400w, 800w, 1200w) to cover mobile, tablet, and desktop.

### Lazy Loading

- All images below the fold: `loading="lazy"` attribute on `<img>` elements
- The hero mockup is above the fold — do **not** lazy-load it (use `loading="eager"` or omit the attribute)
- Canvas animation frames are loaded via JS (not `<img>` elements), so they're already "lazy" — they load in the background after page render

### GSAP Loading Strategy

```html
<!-- At the bottom of <body>, before closing </body> tag -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js" defer></script>
<script src="js/canvas-animation.js" defer></script>
<script src="js/scroll-triggers.js" defer></script>
<script src="js/main.js" defer></script>
```

Order matters: GSAP core loads first, then ScrollTrigger plugin, then the page scripts that use them. All `defer` so they don't block HTML parsing.

### Frame Loading Budget

| Zone | Frames | Est. Size Per Frame | Total |
|------|--------|-------------------|-------|
| Zone 1 (Unclutter) | 150 | ~25KB | ~3.75MB |
| Zone 2 (Product) | 150 | ~25KB | ~3.75MB |
| **Total** | **300** | | **~7.5MB** |

This loads in the background. On a 10Mbps connection, ~7.5MB takes ~6 seconds. Since the user spends 30–60+ seconds in the hero and problem section before reaching Zone 2, this is fine. On slow connections, Zone 1 should be loaded before the user scrolls to it (they must read the hero first).

### Netlify Cache Headers

Add a `netlify.toml` or `_headers` file to set aggressive caching for static assets:

```toml
# netlify.toml
[[headers]]
  for = "/assets/frames/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/assets/mockups/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

Frame images and mockups won't change after deployment — cache them for a year.

---

## Accessibility (WCAG AA)

### Semantic HTML

- Single `<h1>`: the hero headline
- `<h2>` for each major section headline (solution, features, trust, CTA)
- `<h3>` for sub-sections within features and trust
- No skipped heading levels
- Landmark elements: `<header>`, `<main>`, `<footer>`, `<section>` (with `aria-label` or `aria-labelledby` for each section)
- The `<nav>` element is **not needed** — this is a single-page scroll with no persistent navigation

### Alt Text

| Image | Alt Text Approach |
|-------|-------------------|
| App mockups | Descriptive: "JLS Reader dashboard showing course cards with progress bars" |
| Decorative elements (shadows, dividers) | Empty: `alt=""` |
| Mobile fallback images | Descriptive: "Chaotic spreadsheet elements resolving into a clean interface" |
| Logo | "JLS Reader logo" |
| Pillar/feature icons | If decorative (text label adjacent), `alt=""`. If the icon IS the label, descriptive alt. |

See `09_Content_Copy.md` for all alt text strings.

### Color Contrast

All text/background pairs must meet WCAG AA:
- **4.5:1** minimum for body text (16px and under)
- **3:1** minimum for large text (18px+ or 14px bold)

Key pairs to verify:
| Foreground | Background | Expected Ratio | Check? |
|-----------|-----------|----------------|--------|
| Ink (#1a1612) | Cream (#faf6f0) | ~16:1 | ✅ Passes |
| Cream | Terracotta (#c45d2c) | ~3.5:1 | ⚠️ Passes for large text only. Verify button text size. |
| Cream | Olive (#5c6b4f) | ~4.2:1 | ⚠️ Borderline for body text. May need to darken olive or increase text size. |
| Cream/white | Dark animation BG | Depends on frames | Must test with actual frames |

If cream-on-terracotta or cream-on-olive fail at body text size, options: darken the background color, use white instead of cream, or increase the text size to qualify as "large text."

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all scroll-driven canvas animations */
  .animation-zone canvas { display: none; }
  .animation-zone .fallback-image { display: block; }

  /* Disable the badge pulse */
  .pulse-dot { animation: none; }

  /* Disable any CSS transitions that aren't essential */
  * { transition-duration: 0.01ms !important; }
}
```

Also check in JS to avoid preloading 300 JPEG frames that will never be used:

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion && window.innerWidth > 768) {
  loadFrames(); // Only load if animations will play
}
```

### Keyboard Navigation

- All interactive elements (CTAs, form input, form button) reachable via Tab
- Logical tab order: follows the visual reading order (top to bottom)
- **Focus indicators**: visible outline on all focusable elements. Use `:focus-visible` to show focus rings only for keyboard users (not mouse clicks).

```css
:focus-visible {
  outline: 2px solid var(--color-terracotta);
  outline-offset: 2px;
}
```

### Screen Reader Considerations

- Animation zones: add `aria-hidden="true"` on the `<canvas>` elements (they're purely visual). The overlay text and fallback images carry the content.
- Success/error states on the email form: use `role="alert"` or `aria-live="polite"` so screen readers announce state changes.
- Proof strip stats: ensure stat number + label are read together (use `aria-label` on each stat card if the visual layout separates number from label).

---

## Meta & Sharing Tags

### `<head>` Elements

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JLS Reader — Training that feels like reading, not homework</title>
<meta name="description" content="JLS Reader transforms your PLMS Google Sheet into a distraction-free learning experience. Zero cost, zero migration, 100% reversible.">

<!-- Open Graph -->
<meta property="og:title" content="JLS Reader — Training that feels like reading, not homework">
<meta property="og:description" content="A distraction-free reading experience for JLS training. Built on your existing Google Sheet.">
<meta property="og:image" content="https://jls-reader-landing.netlify.app/assets/og-preview.png">
<meta property="og:type" content="website">
<meta property="og:url" content="https://jls-reader-landing.netlify.app">

<!-- Favicon -->
<link rel="icon" href="/assets/favicon/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png">
```

### OG Preview Image

1200×630px PNG. Should show:
- The headline text
- A snippet of the dashboard mockup
- The cream/terracotta palette

This is what Johnny sees when the link is shared in Slack, email, or iMessage. It needs to look polished and communicate "this is a product, not a random link."

See `10_Assets_Checklist.md` for full specs.

## Gaps & Assumptions

| Gap | Default Applied |
|-----|----------------|
| OG image URL depends on final hosting URL | Using `jls-reader-landing.netlify.app` as placeholder |
| Cream-on-terracotta contrast may fail for body text | Flag for visual testing. Darken terracotta or use white text if needed. |
| Cream-on-olive contrast is borderline | Flag for visual testing. Darken olive if needed. |
| No specified robots/indexing policy | Defaulting to `noindex, nofollow` — this is an internal tool pitch, not a public marketing page |

## Implementation Notes

- Add `<meta name="robots" content="noindex, nofollow">` — this page shouldn't appear in search results.
- Run a Lighthouse audit after the page is complete. Target: 90+ on Performance, 100 on Accessibility.
- Test the OG preview by pasting the URL in Slack or using a tool like opengraph.xyz.
