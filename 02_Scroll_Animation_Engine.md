# Scroll Animation Engine

## Overview

The page uses two scroll-driven canvas animations where pre-rendered JPEG frames are painted frame-by-frame as the user scrolls. This file covers the shared animation engine used by both animation zones. Individual zone configurations (trigger points, overlay text, pinning duration) are defined in their respective section files (`04_Problem_Section.md` and `06_Trust_Risk_Cost.md`).

**No scrolljacking.** Native scroll behavior is preserved at all times. Animations respond to scroll position but never hijack it.

## Dependencies

- `01_Design_System.md` — Responsive breakpoints for fallback detection
- GSAP 3.12+ and ScrollTrigger plugin loaded from CDN

## Architecture

### File Responsibilities

| File | Role |
|------|------|
| `canvas-animation.js` | Frame preloading, Image object caching, canvas drawing, resize handling |
| `scroll-triggers.js` | All GSAP ScrollTrigger instances — pinning, scroll-to-frame mapping, text overlay triggers |

### How It Works (High Level)

1. **Preload**: On page load, JS begins loading numbered JPEG frames into memory as `Image` objects
2. **Canvas setup**: A `<canvas>` element inside each animation zone is sized to fill its container
3. **Pin**: GSAP ScrollTrigger pins the canvas in the viewport while the user scrolls through the zone
4. **Map**: ScrollTrigger calculates which frame corresponds to current scroll progress within the zone
5. **Paint**: The correct frame `Image` is drawn to the canvas via `drawImage()`
6. **Overlays**: HTML text elements positioned above the canvas fade in/out at specific scroll progress points
7. **Unpin**: When the user scrolls past the zone, the canvas unpins and the next section scrolls into view

## Frame Preloading

### Strategy

Sequential preloading — frames load in order starting from frame 1. This ensures the first frames are ready when the user reaches the animation zone (which requires scrolling past the hero first, giving time to preload).

### Implementation Details

- Frame naming convention: `unclutter-001.jpg` through `unclutter-150.jpg` (Animation Zone 1), `product-001.jpg` through `product-150.jpg` (Animation Zone 2)
- Frame count per zone: **150 frames** [default — PRD said "~120–192 frames each"]
- Store loaded `Image` objects in an array indexed by frame number
- Begin preloading Animation Zone 1 frames immediately on `DOMContentLoaded`
- Begin preloading Animation Zone 2 frames after Zone 1 completes (or after a delay)
- Track loading progress — the canvas should show the first loaded frame (or a placeholder) until enough frames are loaded for smooth playback

### Preload Function Pattern

```
loadFrames(basePath, count) → Promise<Image[]>
```

- Loads images sequentially: `basePath/001.jpg`, `basePath/002.jpg`, etc.
- Each frame loaded via `new Image()` with `src` set to the path
- Resolve the promise when all frames are loaded
- Consider a chunked approach if 150 sequential loads cause network congestion: load first 30 frames, then continue in background

### Frame Size & Compression

- Target canvas resolution: **1920×1080** (or match the exported Veo 3 resolution)
- JPEG quality: **80%** — balances file size and visual quality for canvas painting
- Estimated per-frame file size: **~20–30KB**
- Estimated total per zone: **~3–4.5MB** (150 frames × ~25KB average)
- Total for both zones: **~6–9MB** — loads in background while user reads hero

### Why JPEG, Not WebP

WebP decoding is slower than JPEG for rapid sequential canvas painting. Since frames are drawn one-by-one at scroll speed, decode latency matters more than file size. Keep frames as JPEG for the canvas; WebP is fine for static mockup images elsewhere.

## Canvas Setup

### HTML Structure (per animation zone)

```html
<section class="animation-zone" id="unclutter-zone">
  <div class="animation-container">
    <canvas id="unclutter-canvas"></canvas>
    <div class="overlay-text" id="overlay-1"><!-- text content --></div>
    <div class="overlay-text" id="overlay-2"><!-- text content --></div>
    <!-- ... more overlays -->
  </div>
</section>
```

### Canvas Sizing

- Canvas fills its container: `width: 100%; height: 100vh`
- On resize, update `canvas.width` and `canvas.height` attributes to match the container's pixel dimensions (accounting for `devicePixelRatio` for retina sharpness)
- Repaint the current frame after resize

### Drawing Logic

```
paintFrame(canvas, ctx, frames, frameIndex):
  - Clear canvas (or just draw over — opaque frames don't need clearing)
  - Draw frames[frameIndex] to canvas, scaled to fill (cover behavior)
  - Use drawImage with calculated source/dest rectangles for aspect-ratio-correct "cover" scaling
```

The "cover" scaling math: calculate the scale factor so the image fills the canvas in both dimensions, then center and crop the overflow. This prevents letterboxing.

## Scroll-to-Frame Mapping

GSAP ScrollTrigger provides a `progress` value (0 to 1) representing how far the user has scrolled through the pinned zone.

```
frameIndex = Math.floor(progress * (totalFrames - 1))
```

### ScrollTrigger Configuration (per zone)

| Parameter | Value | Notes |
|-----------|-------|-------|
| `trigger` | The animation zone `<section>` element | |
| `pin` | `true` | Pins the canvas in viewport while scrolling |
| `scrub` | `true` | Ties animation directly to scroll position (not time-based) |
| `start` | `"top top"` | Pinning begins when section top reaches viewport top |
| `end` | `"+=300%"` | Scroll distance = 3× viewport height before unpinning. Adjust for pacing. |

The `end: "+=300%"` value means the user scrolls through 3 full viewport heights while the canvas is pinned — this determines the "speed" of the animation. Higher value = slower animation = more time to read overlay text. **Tune this value during testing.**

### Performance: `requestAnimationFrame` Throttling

ScrollTrigger fires its `onUpdate` callback on every scroll event. To avoid painting faster than the display can render, use `requestAnimationFrame` to debounce canvas paints:

- On ScrollTrigger update: store the target frame index
- On rAF: if stored index differs from last painted index, paint the new frame

## Text Overlay System

Text overlays are HTML `<div>` elements absolutely positioned over the canvas. They fade in and out at specific scroll progress ranges, controlled by separate ScrollTrigger instances.

### Overlay Timing Model

Each overlay has a `start` and `end` progress value (0–1) within the animation zone. Example for 4 overlays in Zone 1:

| Overlay | Fade In | Fully Visible | Fade Out |
|---------|---------|---------------|----------|
| 1 | 0.00–0.05 | 0.05–0.20 | 0.20–0.25 |
| 2 | 0.25–0.30 | 0.30–0.45 | 0.45–0.50 |
| 3 | 0.50–0.55 | 0.55–0.70 | 0.70–0.75 |
| 4 | 0.75–0.80 | 0.80–0.92 | 0.92–0.97 |

These ranges are starting points — tune based on actual scroll feel. The goal is that each text screen has enough scroll distance to be read comfortably without rushing.

### Overlay Styling

- Centered on the canvas (both horizontally and vertically)
- Max-width constrained to ~600px for readability
- Text color: cream or white (must be legible against the 3D animation background)
- Consider a subtle dark gradient/vignette behind text if legibility is an issue
- Font: `--font-body` at body-large size, or `--font-display` for short impactful lines

## Mobile & Reduced Motion Fallback

### Detection

```css
@media (max-width: 768px), (prefers-reduced-motion: reduce) {
  .animation-zone canvas { display: none; }
  .animation-zone .fallback-image { display: block; }
}
```

Also detect in JS to skip frame preloading entirely on mobile/reduced-motion — saves bandwidth.

### Fallback Experience

- Canvas is hidden via CSS
- A static fallback image is shown instead (e.g., the "resolved" state for Zone 1, the product device for Zone 2)
- Overlay text displays as a simple stacked layout (no scroll-triggered fading) — all text visible in order
- The narrative structure is preserved without animation

### Fallback Images Needed

| Zone | Fallback Image | Shows |
|------|----------------|-------|
| Zone 1 | `unclutter-static.webp` | The resolved/clean device (final state of the chaos-to-clarity animation) |
| Zone 2 | `product-static.webp` | The rotating product device at its most presentable angle |

See `10_Assets_Checklist.md` for full specs.

## Resize Handling

- Listen for `window.resize` events (debounced at ~250ms)
- On resize: update canvas dimensions, repaint current frame
- ScrollTrigger has a built-in `refresh()` method — call it on resize to recalculate pin positions and scroll distances

## Gaps & Assumptions

| Gap | Default Applied |
|-----|----------------|
| Exact frame count not specified (range: 120–192) | Defaulting to **150 frames** per zone |
| Animation Zone 2 visual content undecided ("rotating device OR exploded architecture stack") | **Decision needed from stakeholder.** Defaulting to rotating device for simplicity |
| Scroll distance for animation zones not specified | Using `end: "+=300%"` (3× viewport height) — adjust during testing |
| Overlay text timing not specified | Using evenly distributed quartile model — adjust during testing |
| Frame resolution not specified | Matching Veo 3 export resolution, target 1920×1080 |
| No loading indicator specified for while frames preload | Consider showing the first frame as a static image until preloading completes |

## Implementation Notes

- GSAP and ScrollTrigger are loaded from CDN via `<script>` tags in `index.html`. Register the plugin: `gsap.registerPlugin(ScrollTrigger)`
- The canvas animation engine is the most complex piece of this build. Get Zone 1 working end-to-end before starting Zone 2 — the same engine powers both.
- Test on a throttled network connection (Chrome DevTools → Slow 3G) to verify preloading completes before the user reaches the animation zone.
