# Problem Section (Animation Zone 1: "The Unclutter")

## Overview

The problem section is the first scroll-animated zone. As Johnny scrolls, a 3D scene of chaotic floating spreadsheet cells, browser tabs, and document icons gradually assembles into a single clean device. Four overlay text screens fade in and out, describing the pain points of the current training experience. By the time the animation resolves, the narrative has shifted from problem to solution — the visual transformation mirrors the story.

This is the **emotional pivot** of the page. The hero earned the scroll; this section validates the problem and creates the "aha" moment.

## Dependencies

- `01_Design_System.md` — Typography, colors for overlay text
- `02_Scroll_Animation_Engine.md` — Canvas engine, frame preloading, ScrollTrigger configuration, overlay timing model
- `09_Content_Copy.md` — Exact overlay text content

## Section Structure

### HTML Structure

```html
<!-- Transition zone: visual shift from hero's clean layout -->
<section class="problem-transition">
  <!-- Optional: subtle background color shift or gradient -->
</section>

<section class="animation-zone" id="unclutter-zone">
  <div class="animation-container">
    <canvas id="unclutter-canvas"></canvas>

    <!-- Fallback for mobile / reduced-motion -->
    <img class="fallback-image" src="assets/fallbacks/unclutter-static.webp"
         alt="Chaotic spreadsheet elements resolving into a clean reading interface"
         loading="lazy">

    <!-- Overlay text screens -->
    <div class="overlay-text" id="problem-text-1">...</div>
    <div class="overlay-text" id="problem-text-2">...</div>
    <div class="overlay-text" id="problem-text-3">...</div>
    <div class="overlay-text" id="problem-text-4">...</div>
  </div>
</section>
```

### Visual Transition from Hero

The page needs a clear visual shift from the hero's clean layout into the animation zone. Options:
- Background color shifts from cream to a darker tone (ink or near-black) to make the 3D animation visually pop
- A gradient or fade at the boundary
- The animation zone goes full-bleed (edge-to-edge, no padding)

The 3D animation likely has a dark/neutral background, so transitioning the page background to dark before the canvas appears creates a seamless entry.

## The Animation: Chaos to Clarity

### What the Veo 3 Video Shows

The pre-rendered 3D video (exported as 150 JPEG frames) depicts:
- **Start state (frame 1)**: Chaotic arrangement of floating elements — spreadsheet cells, browser tabs, document icons, scattered text — tumbling and overlapping in 3D space
- **Middle state (~frame 75)**: Elements begin gravitating toward each other, starting to organize
- **End state (frame 150)**: All elements have collapsed into a single clean device/screen showing an organized interface

The chaos represents the current training experience (tab-switching, scattered content). The resolved device represents JLS Reader.

### Frame Specifications

| Property | Value |
|----------|-------|
| Frame source | `assets/frames/unclutter/` |
| Naming | `unclutter-001.jpg` through `unclutter-150.jpg` |
| Count | 150 [default — PRD said "~120–192"] |
| Resolution | Match Veo 3 export (target 1920×1080) |
| Format | JPEG at ~80% quality |

## Overlay Text Screens

Four text screens fade in and out as the user scrolls through the animation zone. Each screen occupies roughly a quarter of the scroll distance.

### Text Content

| # | Text | Pain Point |
|---|------|-----------|
| 1 | "Your training system holds the data. But the experience of using it?" | Sets up the gap between data and experience |
| 2 | "Employees bounce between the Sheet, Google Docs, and external links — every switch breaks focus." | Tab-switching, context loss |
| 3 | "There's no 'pick up where you left off.' Just scrolling through rows, guessing which was next." | No continuity, no progress tracking |
| 4 | "Without study tools or progress signals, training becomes a checklist. Comprehension suffers." | No learning aids, checklist mentality |

See `09_Content_Copy.md` for finalized versions.

### Overlay Timing

Using the quartile model from `02_Scroll_Animation_Engine.md`:

| Overlay | Fade In (progress) | Visible | Fade Out |
|---------|-------------------|---------|----------|
| 1 | 0.00–0.05 | 0.05–0.20 | 0.20–0.25 |
| 2 | 0.25–0.30 | 0.30–0.45 | 0.45–0.50 |
| 3 | 0.50–0.55 | 0.55–0.70 | 0.70–0.75 |
| 4 | 0.75–0.80 | 0.80–0.92 | 0.92–0.97 |

Each overlay has dedicated ScrollTrigger instances for fade-in and fade-out, using the animation zone's overall progress as the reference.

### Overlay Styling

- Positioned absolutely over the canvas, centered both horizontally and vertically
- Max-width: ~600px (prevents overly wide text lines)
- Text color: `--color-cream` or white — must be legible against the dark 3D animation background
- Font: `--font-body` at body-large size for longer sentences, `--font-display` for any short impactful phrases
- **Legibility safeguard**: Add a subtle radial gradient or dark vignette behind the text area if testing reveals legibility issues against the animation. Don't rely solely on text color.
- Line height: generous (`1.5–1.6`) for comfortable reading during scroll

### Overlay Responsiveness

On desktop: overlays are positioned center-screen over the canvas.

On mobile (where canvas is replaced by static fallback):
- Overlays display as a vertically stacked text list
- No scroll-triggered fading — all four text blocks are visible in sequence
- Styled as regular body text sections against the dark/transition background
- Clear visual separation between each text block (spacing or dividers)

## Scroll Distance & Pacing

The animation zone's scroll distance determines how "fast" the animation plays and how long each text screen is visible.

| Parameter | Value | Notes |
|-----------|-------|-------|
| ScrollTrigger `end` | `"+=300%"` | User scrolls 3× viewport height through the zone |
| Effective scroll per overlay | ~0.75× viewport height | Each of the 4 text screens gets ~75vh of scroll distance |
| Reading time at normal scroll speed | ~3–4 seconds per overlay | Enough to read 1–2 sentences comfortably |

**Tune during testing.** If text feels rushed, increase to `"+=400%"`. If it feels sluggish, decrease to `"+=250%"`.

## Narrative-to-Visual Sync

The critical design requirement: **the last overlay text fades out at the same moment the animation resolves into the clean device.** This creates the seamless problem→solution transition.

- Overlay 4 fades out at progress ~0.97
- The animation's "resolved" state should be reached by frame ~142 (progress 0.95)
- The final 5% of scroll (frames 142–150) shows the fully resolved device with no overlay text — a moment of visual clarity before the section unpins

If the Veo 3 video's resolution timing doesn't align with this, adjust either the overlay timing or the `end` scroll distance.

## Transition to Solution Section

After the animation zone unpins, the page needs a smooth transition into the Solution Overview (`05_Solution_Features.md`).

- The resolved device on the canvas provides the visual "answer" to the chaos
- The next section's headline ("Same spreadsheet. Completely different experience.") should feel like the verbal version of what the animation just showed
- Background should transition back from dark (animation zone) to cream (solution section) — use a gradient or spacing to avoid a jarring color jump

## Gaps & Assumptions

| Gap | Default Applied |
|-----|----------------|
| Exact overlay text not locked — PRD has draft copy | Using PRD draft text as starting point. See `09_Content_Copy.md` for edits. |
| Background color for animation zone not specified | Defaulting to near-black (`--color-ink` or `#0d0b09`) to make the 3D animation pop |
| Whether overlays need a text-shadow or backdrop for legibility | Will depend on the actual Veo 3 frames — flag for visual testing. Include a subtle dark gradient as a safety net. |
| Transition style entering and exiting the animation zone | Defaulting to gradient fade (cream → dark → cream) over ~100px of scroll |

## Implementation Notes

- Get the canvas + frame painting working first with no overlays. Verify smooth frame-by-frame playback tied to scroll. Then layer in the text overlays.
- Test overlay legibility against actual Veo 3 frames — this is the highest-risk visual element. If frames are too visually busy, add a dark semi-transparent backdrop behind overlay text.
- The transition from this section to the solution section is a key narrative moment. Spend time on the visual bridge between dark (animation) and light (solution content).
