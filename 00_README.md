# JLS Reader Landing Page

## Overview

A single-page, scroll-animated marketing site that pitches JLS Reader to Johnny (CEO of JLS). Built as a persuasion tool for one person and one decision: "should we adopt this for the team?" The page walks the visitor through a scroll-driven narrative — problem, solution, trust, action — ending with a primary CTA to try the app and a secondary CTA to request test access via email.

This is **not** a public marketing site. It's a self-contained pitch asset designed to work without a presenter in the room.

## Target Audience

* **Primary**: Johnny, CEO of JLS. Pre-authorized OAuth test user. His path ends at "Try JLS Reader" (opens app in new tab).
* **Secondary**: Anyone Johnny forwards the link to. Not pre-authorized. Their path ends at the email opt-in form ("Request Test Access").

## Tech Stack

|Layer|Technology|Notes|
|-|-|-|
|Structure|HTML5 (semantic)|Single `index.html` file|
|Styling|CSS3 + Custom Properties|Single `styles.css` — no CSS framework|
|Interactivity|Vanilla JavaScript (ES6+)|No frontend framework|
|Animation|GSAP 3.12+ + ScrollTrigger|Loaded from CDN (cdnjs)|
|Canvas|HTML5 Canvas API|Paints pre-rendered JPEG frames tied to scroll position|
|Fonts|DM Serif Display + Instrument Sans|Google Fonts with `font-display: swap`|
|Hosting|Netlify (free tier)|Auto-deploy from GitHub, same account as JLS Reader app|
|Email Form|Formspree (free tier)|50 submissions/month, delivers to `dilan.dobardzic.jls@gmail.com`|
|Version Control|Git + GitHub|Push triggers Netlify deploy|

**No build tools.** No bundler, no `node\_modules`, no package.json. Files are written and served directly.

## File Structure

```
jls-reader-landing/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js                 ← Init, smooth scroll, form handling
│   ├── canvas-animation.js     ← Frame preloading, canvas painting, scroll-to-frame mapping
│   └── scroll-triggers.js      ← All GSAP ScrollTrigger configs
├── assets/
│   ├── frames/
│   │   ├── unclutter/          ← Animation Zone 1 JPEGs (unclutter-001.jpg … unclutter-150.jpg)
│   │   └── product/            ← Animation Zone 2 JPEGs (product-001.jpg … product-150.jpg)
│   ├── mockups/                ← dashboard.webp, reader.webp, progress.webp, ai-tools.webp
│   ├── fallbacks/              ← Static keyframe images for mobile/reduced-motion
│   ├── logo.svg
│   ├── og-preview.png          ← 1200×630 Open Graph image
│   └── favicon/                ← favicon.ico, apple-touch-icon.png
└── netlify.toml                ← Cache headers for frame images
```

## Decomposition Files

|File|Description|
|-|-|
|`00\_README.md`|This file — project overview, stack, structure|
|`01\_Design\_System.md`|Colors, typography, spacing, responsive breakpoints, component patterns|
|`02\_Scroll\_Animation\_Engine.md`|Canvas engine, GSAP ScrollTrigger, frame preloading, mobile fallback|
|`03\_Hero\_Section.md`|Above-the-fold layout, headline, proof strip, badge, CTAs|
|`04\_Problem\_Section.md`|Animation Zone 1, overlay text screens, problem narrative|
|`05\_Solution\_Features.md`|Solution pillars, 4 feature blocks, How It Works strip|
|`06\_Trust\_Risk\_Cost.md`|Animation Zone 2, backward compatibility, cost table, risk cards|
|`07\_Final\_CTA\_Footer.md`|Final CTA section, email form, success/error states, footer|
|`08\_Performance\_Accessibility.md`|Image optimization, lazy loading, fonts, WCAG, meta tags|
|`09\_Content\_Copy.md`|All headlines, body copy, overlay text, button labels, alt text|
|`10\_Assets\_Checklist.md`|Every asset needed with format, dimensions, and purpose|
|`11\_Future\_Enhancements.md`|Post-MVP enhancements backlog|

## Key Gaps \& Open Questions

|Gap|Impact|Suggested Default|
|-|-|-|
|JLS Reader app URL not provided|"Try JLS Reader" button has no `href`|Use placeholder `hhttps://jls-reader-app.netlify.app` — confirm before launch|
|Formspree form ID not provided|Email form endpoint incomplete|Create Formspree form and insert ID before launch|
|Animation Zone 2 visuals undefined|PRD says "rotating device OR exploded architecture stack" — never decides|Default to rotating device showcase (simpler, matches the Veo 3 workflow)|
|Frame count is a range (120–192)|Affects scroll distance calculation and payload size|Default to 150 frames per zone|
|Exact overlay text copy not finalized|Problem section text screens described but not word-for-word locked|Draft copy provided in `09\_Content\_Copy.md` — treat as starting point|
|No analytics|No way to measure scroll depth or CTA clicks|Acceptable for MVP (audience of one). See `11\_Future\_Enhancements.md` for Plausible option|

## Build Sequence

1. Design system CSS (`01`)
2. Scroll animation engine (`02`)
3. Hero section (`03`)
4. Problem section with Animation Zone 1 (`04`)
5. Solution + features (`05`)
6. Trust sections with Animation Zone 2 (`06`)
7. Final CTA + email form + footer (`07`)
8. Performance \& accessibility pass (`08`)
9. Content/copy review (`09`)
10. Asset production \& checklist (`10`)

