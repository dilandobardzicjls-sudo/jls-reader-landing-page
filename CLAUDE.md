# JLS Reader Landing Page — AI Codebase Guide

A single-page marketing landing page designed to pitch JLS Reader to Johnny (CEO of JLS). Built as a scroll-driven narrative from problem → solution → trust → action, using vanilla HTML, CSS, and JavaScript with no build tools. Currently in **design specification phase** — detailed docs exist, no implementation files yet.

---

## Workflow Rules

- **Deploy via Netlify**: Push to GitHub triggers auto-deploy. No build command needed — files served directly.
- **No build tools**: No bundler, no `node_modules`, no `package.json`. Files are written and served as-is.
- **Test after changes**: Chrome DevTools (Slow 3G, reduced motion, mobile viewports) + Lighthouse audit.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic, single `index.html`) |
| Styling | CSS3 + Custom Properties (single `styles.css`, no framework) |
| Interactivity | Vanilla JavaScript ES6+ (3 files: `main.js`, `canvas-animation.js`, `scroll-triggers.js`) |
| Animation | GSAP 3.12+ + ScrollTrigger (loaded from CDN, not npm) |
| Canvas | HTML5 Canvas API (pre-rendered JPEG frames, 150 per animation zone) |
| Fonts | DM Serif Display + Instrument Sans (Google Fonts, `font-display: swap`) |
| Hosting | Netlify (free tier, auto-deploy from GitHub) |
| Email Form | Formspree (free tier, 50 submissions/month) |
| Version Control | Git + GitHub |

---

## Project Structure

```
jls-reader-landing/
├── index.html                    # Single entry point
├── CLAUDE.md                     # AI codebase guide (this file)
├── 00_README.md – 11_*.md        # Design specification documents
├── css/
│   └── styles.css                # All styling (custom properties, no framework)
├── js/
│   ├── main.js                   # Init, smooth scroll, form handling
│   ├── canvas-animation.js       # Frame preloading, canvas painting, resize
│   └── scroll-triggers.js        # GSAP ScrollTrigger configurations
├── assets/
│   ├── frames/
│   │   ├── unclutter/            # Zone 1 frames (unclutter-001.jpg – 150.jpg)
│   │   └── product/              # Zone 2 frames (product-001.jpg – 150.jpg)
│   ├── mockups/                  # App screenshots (WebP + JPEG, 3 sizes each)
│   ├── fallbacks/                # Static fallbacks for mobile/reduced-motion
│   ├── logo.svg                  # JLS Reader logo (vector)
│   ├── og-preview.png            # 1200×630 Open Graph image
│   └── favicon/                  # favicon.ico + apple-touch-icon.png
└── netlify.toml                  # Cache control headers
```

---

## Build & Run Commands

```bash
# No build step — files are served directly

# Local Dev — use any static file server
npx serve .                       # Or: python -m http.server 8000

# Deploy — push to GitHub, Netlify auto-deploys

# Lighthouse Audit
# Run via Chrome DevTools > Lighthouse tab
# Targets: Performance 90+, Accessibility 100, Best Practices 95+, SEO 100
```

---

## Environment Variables

### Placeholders (must replace before launch)

| Placeholder | Current Value | Replace With |
|-------------|---------------|--------------|
| JLS Reader app URL | `https://jls-reader-app.netlify.app` | TODO: Actual live app URL |
| Formspree Form ID | `{FORM_ID}` | TODO: Actual Formspree form ID |

No `.env` files needed — zero-dependency static site with no secrets.

---

## Key Architectural Rules

### No Build Tools
- No bundler, no `package.json`, no `node_modules`
- GSAP loaded from CDN (`cdn.jsdelivr.net`), not npm
- All JS files use `defer` attribute in `<script>` tags
- Load order matters: GSAP core → ScrollTrigger → page scripts

### Single Page Architecture
- Single `index.html` — no routing, no multi-page navigation
- Linear scroll narrative: hero → problem → solution → features → trust → CTA → footer
- Smooth scroll for anchor links (`#solution`), no scroll hijacking

### Canvas Animation Engine
- Two scroll-driven animation zones (150 JPEG frames each, ~3.75MB per zone)
- Pinned canvas + GSAP ScrollTrigger maps scroll position → frame index
- Mobile/reduced-motion: hide canvas, show static fallback images
- `requestAnimationFrame` throttling to prevent faster-than-display rendering
- JPEG over WebP for frames (decode speed > file size for rapid canvas painting)

### Form Handling
- Formspree via `fetch()` POST with JSON body — no traditional form submit
- Client-side email validation before submission
- Disable button during request, show success/error states
- Success state persists (no timeout)

---

## Conventions

- **No frameworks**: Vanilla HTML/CSS/JS only — no React, no Tailwind, no npm packages
- **CSS Custom Properties**: All design tokens defined as `--color-*`, `--space-*`, `--font-*` variables
- **Semantic HTML**: `<header>`, `<main>`, `<footer>`, `<section>` with `aria-label`/`aria-labelledby`
- **Single `<h1>`**: Hero headline only. `<h2>` per section, `<h3>` for sub-sections. No skipped levels.
- **Images**: `<picture>` with WebP source + JPEG fallback. `loading="lazy"` below fold. Descriptive `alt` text.
- **External links**: `target="_blank" rel="noopener noreferrer"`

---

## Design System Standards

> **Do NOT deviate from these values when writing new UI or editing existing UI.**

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-cream` | `#faf6f0` | Page background |
| `--color-terracotta` | `#c45d2c` | Primary accent — CTAs, highlights |
| `--color-olive` | `#5c6b4f` | Secondary accent — badges, secondary text |
| `--color-ink` | `#1a1612` | Primary text, headings, footer background |

Section alternation: Cream (`#faf6f0`) ↔ slightly darker cream (`#f5f0e8`).

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| h1 (hero) | DM Serif Display | `clamp(2.5rem, 5vw, 4rem)` | 400 |
| h2 (section) | DM Serif Display | `clamp(2rem, 4vw, 3rem)` | 400 |
| h3 (sub) | DM Serif Display | `clamp(1.5rem, 3vw, 2rem)` | 400 |
| Body | Instrument Sans | `clamp(1rem, 1.1vw, 1.125rem)` | 400 |
| Button | Instrument Sans | `1rem` | 600 |

**DM Serif Display only has weight 400. Never apply `font-weight: bold` — triggers faux bolding.**

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `0.5rem` | Tight gaps |
| `--space-sm` | `1rem` | Standard |
| `--space-md` | `1.5rem` | Comfortable |
| `--space-lg` | `2rem` | Card sections |
| `--space-xl` | `3rem` | Major divisions |
| `--space-2xl` | `4rem` | Between sections |
| `--section-padding` | `clamp(4rem, 8vw, 8rem)` | Section vertical padding |
| `--content-max-width` | `1200px` | Content constraint |

### Components

- **Primary Button**: Terracotta bg, cream text, `0.5rem` radius, `48px` min-height, darken 10% on hover
- **Secondary Button**: Transparent bg, olive text, underline on hover
- **Cards**: White/lighter bg, `0.75rem` radius, `--space-lg` padding, subtle shadow
- **Focus**: `:focus-visible` with 2px solid terracotta outline, 2px offset

### Responsive Breakpoints

| Name | Query | Behavior |
|------|-------|----------|
| Mobile | `< 768px` | Single column, static fallbacks instead of canvas, reduced padding |
| Tablet | `768–1024px` | Two-column where possible, full animation if supported |
| Desktop | `> 1024px` | Full experience — grids, alternating layouts, scroll animations |

---

## Accessibility Standards

### WCAG AA Required
- **4.5:1** contrast for body text, **3:1** for large text
- All interactive elements reachable via Tab, logical order
- Canvas elements: `aria-hidden="true"` (overlay text carries content)
- Form success/error: `role="alert"` or `aria-live="polite"`
- Min tap target: 44×44px on mobile
- `prefers-reduced-motion: reduce` — disable all animation, show static fallbacks

### Focus Indicators
```css
:focus-visible {
  outline: 2px solid var(--color-terracotta);
  outline-offset: 2px;
}
```

---

## Page Sections (Linear Scroll Order)

1. **Hero** — Badge, headline, CTAs, proof strip (3 stats), dashboard mockup
2. **Problem** — Animation Zone 1 ("The Unclutter"), 4 overlay text screens
3. **Solution Overview** — 3 pillars: Reader, Progress Tracking, AI Tools
4. **Feature Deep Dives** — 4 features, alternating mockup/text layout
5. **How It Works** — 4-step timeline (horizontal desktop, vertical mobile)
6. **Trust & Risk** — Animation Zone 2 ("Product Showcase"), 4 stat overlays
7. **Backward Compatibility** — 3 resilience mechanisms
8. **Cost Table** — Service breakdown (all free except AI: $0.01–0.05/day/user)
9. **Risk Reversal Cards** — 5 cards (reversible, sheet is source, test now, cost-capped, undoable)
10. **Accessibility Strip** — 6 labels (keyboard nav, screen reader, reduced motion, responsive, etc.)
11. **Final CTA** — Headline, primary CTA, email form (Formspree), trust reinforcement
12. **Footer** — Attribution, placeholder legal links

---

## Design Specification Documents

| File | Purpose |
|------|---------|
| `00_README.md` | Project overview and document map |
| `01_Design_System.md` | Colors, typography, spacing, components |
| `02_Scroll_Animation_Engine.md` | Canvas animation architecture, frame specs, overlay timing |
| `03_Hero_Section.md` | Hero layout, proof strip, dashboard mockup |
| `04_Problem_Section.md` | Animation Zone 1 details, overlay content |
| `05_Solution_Features.md` | Solution pillars, feature deep dives |
| `06_Trust_Risk_Cost.md` | Animation Zone 2, compatibility, cost table, risk reversal |
| `07_Final_CTA_Footer.md` | CTA section, form handling, footer |
| `08_Performance_Accessibility.md` | Lighthouse targets, WCAG AA, reduced motion |
| `09_Content_Copy.md` | All page copy (headlines, body text, overlay text) |
| `10_Assets_Checklist.md` | Asset inventory and specifications |
| `11_Future_Enhancements.md` | Post-MVP priorities |

---

## Meta & SEO

- `<meta name="robots" content="noindex, nofollow">` — internal pitch, not public
- Open Graph tags for social sharing (Slack, iMessage, email)
- OG image: `og-preview.png` (1200×630)
