# Assets Checklist

## Overview

Every visual asset the landing page requires, with format, dimensions, and purpose. Use this as a production checklist — nothing ships until every item here is accounted for. Assets are organized by where they appear on the page.

## Dependencies

- `01_Design_System.md` — Color palette for OG image and favicon
- `02_Scroll_Animation_Engine.md` — Frame specifications (count, format, resolution)
- `09_Content_Copy.md` — Alt text for each image

## Asset Summary

| Category | Count | Total Est. Size |
|----------|-------|----------------|
| Animation frames (Zone 1) | 150 | ~3.75MB |
| Animation frames (Zone 2) | 150 | ~3.75MB |
| App mockups | 4 | ~400KB |
| Mobile fallback images | 2 | ~100KB |
| Logo | 1 | ~5KB |
| Favicon set | 2 | ~15KB |
| OG preview image | 1 | ~150KB |
| **Total** | **310** | **~8.2MB** |

---

## Animation Frame Sequences

### Zone 1: "The Unclutter" (Chaos to Clarity)

| Property | Spec |
|----------|------|
| Source video | Veo 3 render — chaotic floating spreadsheet elements assembling into a clean device |
| Output path | `assets/frames/unclutter/` |
| Naming | `unclutter-001.jpg` through `unclutter-150.jpg` |
| Frame count | 150 [default — PRD range: 120–192] |
| Resolution | Match Veo 3 export, target 1920×1080 |
| Format | JPEG at 80% quality |
| Est. per frame | ~25KB |
| Est. total | ~3.75MB |
| Production status | ⬜ Veo 3 video not yet rendered / frames not yet extracted |

**Extraction process**: Export Veo 3 video → extract frames with ffmpeg:
```bash
ffmpeg -i unclutter-video.mp4 -vf "fps=24" -q:v 4 unclutter-%03d.jpg
```
Adjust `-vf "fps=X"` and trim to get exactly 150 frames. If the source video is longer than needed, extract the best 150-frame segment.

### Zone 2: Product Showcase (Rotating Device)

| Property | Spec |
|----------|------|
| Source video | Veo 3 render — JLS Reader interface on a rotating 3D device |
| Output path | `assets/frames/product/` |
| Naming | `product-001.jpg` through `product-150.jpg` |
| Frame count | 150 |
| Resolution | Match Veo 3 export, target 1920×1080 |
| Format | JPEG at 80% quality |
| Est. per frame | ~25KB |
| Est. total | ~3.75MB |
| Production status | ⬜ Pending — Animation Zone 2 visual content needs stakeholder decision (rotating device vs. exploded stack) |

---

## App Screenshot Mockups

All mockups follow the same visual treatment: real JLS Reader screenshot placed inside a browser or device frame with a subtle drop shadow. Consistent frame style across all four.

### Production Process

1. Take screenshots from the live JLS Reader app at consistent viewport size
2. Place into a browser/device frame template (Figma, Sketch, or a simple HTML/CSS mockup frame)
3. Export at multiple sizes for responsive `srcset`: 400w, 800w, 1200w
4. Export as WebP (primary) and JPEG (fallback)

### Mockup A: Dashboard

| Property | Spec |
|----------|------|
| Shows | Greeting message, course cards with progress bars, clean layout |
| Used in | Hero section (above the fold) |
| Output path | `assets/mockups/dashboard.webp` (+ `.jpg` fallback) |
| Sizes needed | 400w, 800w, 1200w (for `srcset`) |
| Alt text | "JLS Reader dashboard showing a greeting, course cards with progress bars, and a clean interface" |
| Production status | ⬜ Screenshot needed from live app |

**Note**: This is the hero image — it must be visually impressive. Choose a dashboard state that shows real-looking data (not empty states).

### Mockup B: Reader

| Property | Spec |
|----------|------|
| Shows | Reading view with toolbar (theme dots, font size controls), document text, progress bar at bottom |
| Used in | Feature A deep dive |
| Output path | `assets/mockups/reader.webp` (+ `.jpg` fallback) |
| Sizes needed | 400w, 800w, 1200w |
| Alt text | "JLS Reader reading view with theme selection, adjustable font controls, and a progress bar" |
| Production status | ⬜ Screenshot needed |

### Mockup C: Progress Tracking

| Property | Spec |
|----------|------|
| Shows | Item list with completed items (checked), highlighted "NEXT" item, upcoming items |
| Used in | Feature C deep dive |
| Output path | `assets/mockups/progress.webp` (+ `.jpg` fallback) |
| Sizes needed | 400w, 800w, 1200w |
| Alt text | "Training item list showing completed items, a highlighted next item, and upcoming items" |
| Production status | ⬜ Screenshot needed |

### Mockup D: AI Study Tools

| Property | Spec |
|----------|------|
| Shows | AI panel with method selection pills (SQ4R, Paraphrase, Summarize) and sample SQ4R output |
| Used in | Feature D deep dive |
| Output path | `assets/mockups/ai-tools.webp` (+ `.jpg` fallback) |
| Sizes needed | 400w, 800w, 1200w |
| Alt text | "AI study tools panel with SQ4R, paraphrase, and summarize options and sample output" |
| Production status | ⬜ Screenshot needed |

---

## Mobile Fallback Images

Static keyframe images shown on mobile and when `prefers-reduced-motion` is active, replacing the canvas animations.

### Zone 1 Fallback

| Property | Spec |
|----------|------|
| Shows | The resolved/clean device — final state of the chaos-to-clarity animation |
| Output path | `assets/fallbacks/unclutter-static.webp` |
| Resolution | 800×450 (doesn't need to be full 1920×1080 — it's a static image, not a canvas source) |
| Format | WebP |
| Alt text | "Chaotic spreadsheet elements gradually resolving into a clean reading interface" |
| Production status | ⬜ Extract from final frame of Zone 1 video, or render separately |

### Zone 2 Fallback

| Property | Spec |
|----------|------|
| Shows | The rotating product device at its most presentable angle |
| Output path | `assets/fallbacks/product-static.webp` |
| Resolution | 800×450 |
| Format | WebP |
| Alt text | "JLS Reader app displayed on a rotating device" |
| Production status | ⬜ Extract from mid-point frame of Zone 2 video |

---

## Logo

| Property | Spec |
|----------|------|
| Design | Recreated from JLS Reader app's book icon logo |
| Output path | `assets/logo.svg` |
| Format | SVG (vector) |
| Used in | Hero section, footer |
| Colors | Should work on both cream (hero) and ink (footer) backgrounds — use currentColor or provide two variants |
| Production status | ⬜ Recreate from app icon as clean SVG |

---

## Favicon

| File | Spec |
|------|------|
| `assets/favicon/favicon.ico` | 32×32px, derived from logo SVG |
| `assets/favicon/apple-touch-icon.png` | 180×180px PNG, derived from logo SVG |
| Production status | ⬜ Generate from finalized logo |

---

## Open Graph Preview Image

| Property | Spec |
|----------|------|
| Purpose | The image that appears when the landing page link is shared in Slack, iMessage, email |
| Output path | `assets/og-preview.png` |
| Dimensions | 1200×630px (standard OG ratio) |
| Format | PNG |
| Content | Headline text ("Training that feels like reading, not homework"), a snippet of the dashboard mockup, cream/terracotta palette background |
| Production status | ⬜ Design and export after mockups are finalized |

**Design note**: This image is Johnny's first impression if the link is shared before he opens it. It needs to look polished and clearly communicate "this is a product." Avoid clutter — headline + one visual + brand colors is enough.

---

## Production Checklist

| # | Asset | Status |
|---|-------|--------|
| 1 | Zone 1 Veo 3 video rendered | ⬜ |
| 2 | Zone 1 frames extracted (150 JPEGs) | ⬜ |
| 3 | Zone 2 visual direction decided | ⬜ |
| 4 | Zone 2 Veo 3 video rendered | ⬜ |
| 5 | Zone 2 frames extracted (150 JPEGs) | ⬜ |
| 6 | Dashboard screenshot taken | ⬜ |
| 7 | Reader screenshot taken | ⬜ |
| 8 | Progress tracking screenshot taken | ⬜ |
| 9 | AI tools screenshot taken | ⬜ |
| 10 | All mockups placed in browser frames | ⬜ |
| 11 | All mockups exported at 3 sizes (400w, 800w, 1200w) in WebP + JPEG | ⬜ |
| 12 | Zone 1 fallback image extracted | ⬜ |
| 13 | Zone 2 fallback image extracted | ⬜ |
| 14 | Logo SVG created | ⬜ |
| 15 | Favicon generated (ico + png) | ⬜ |
| 16 | OG preview image designed and exported | ⬜ |

## Gaps & Assumptions

| Gap | Default Applied |
|-----|----------------|
| Browser frame template for mockups not specified | Use any clean browser chrome mockup — light theme, minimal chrome, subtle shadow |
| Whether mockups need retina (@2x) versions beyond the 1200w size | The 1200w version at WebP compression should be sharp enough on retina. Add @2x only if visual testing shows blurriness. |
| Logo source file format | Assuming the JLS Reader app has a rasterized icon — needs to be redrawn as clean SVG |
