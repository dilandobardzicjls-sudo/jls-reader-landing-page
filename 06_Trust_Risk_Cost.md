# Trust, Risk & Cost Sections

## Overview

These sections systematically eliminate every reason Johnny might have to say no. They cover three concerns in order: "Will it break our sheet?" (backward compatibility), "What does it cost?" (cost table), and "What's the worst case?" (risk reversal). A second scroll animation zone and an accessibility strip round out the trust-building before the final CTA.

This section also contains **Animation Zone 2** — the rotating product showcase that provides a visual break between feature content and trust content.

## Dependencies

- `01_Design_System.md` — Card styles, colors, responsive grid
- `02_Scroll_Animation_Engine.md` — Canvas engine and ScrollTrigger for Animation Zone 2
- `09_Content_Copy.md` — All headlines, descriptions, card text, table content

## Section Order (within this file)

1. Animation Zone 2: Product Showcase
2. Backward Compatibility & Resilience
3. Cost & Zero Risk
4. Accessibility & Polish Strip

---

## 1. Animation Zone 2: Product Showcase

### What It Is

A second scroll-driven canvas animation between the features section and the trust sections. Uses the same engine as Zone 1 (`02_Scroll_Animation_Engine.md`) but with different content: a rotating product device with floating stat text overlays.

### Animation Content

**Decision needed**: The PRD says "rotating product device OR exploded architecture stack" without choosing. **Default: rotating device showcase** — it's simpler to produce via Veo 3 and more relevant to Johnny (he cares about the product, not the architecture).

The animation shows the JLS Reader interface on a device rotating slowly in 3D space. Floating text overlays fade in alongside:
- "Zero backend servers"
- "Google Sheet stays the single source of truth"
- "Every service runs on free tiers"
- "Built with React, Firebase, and Claude AI"

### Frame Specifications

| Property | Value |
|----------|-------|
| Frame source | `assets/frames/product/` |
| Naming | `product-001.jpg` through `product-150.jpg` |
| Count | 150 [default] |
| Resolution | Match Veo 3 export (target 1920×1080) |
| Format | JPEG at ~80% quality |

### ScrollTrigger Configuration

Same pattern as Zone 1:
- `pin: true`, `scrub: true`
- `end: "+=250%"` — slightly shorter than Zone 1 since this is a visual break, not a narrative section. Adjust during testing.

### Floating Stat Overlays

Unlike Zone 1's sequential text screens, Zone 2's stats fade in and **stay visible** as the animation progresses, accumulating on screen:

| Stat | Appears at Progress |
|------|-------------------|
| "Zero backend servers" | 0.15 |
| "Google Sheet stays the single source of truth" | 0.35 |
| "Every service runs on free tiers" | 0.55 |
| "Built with React, Firebase, and Claude AI" | 0.75 |

Position the stats around the device (corners or sides of the viewport) so they don't overlap the rotating device.

### Mobile Fallback

Static image of the product device at its most presentable angle (`product-static.webp`). Stats displayed as a simple list below the image.

---

## 2. Backward Compatibility & Resilience

### Headline

"Built to survive change."

### Strategic Purpose

This section answers: "What happens if someone edits the Google Sheet? Will JLS Reader break?" The answer — three resilience mechanisms — shows the builder anticipated exactly the failure modes a CEO would worry about.

**Important framing**: Write for a business audience, not developers. Each point needs a "what this means" explanation, not a technical specification.

### Three Resilience Points

Each point has a title, a plain-language explanation, and a "why this matters" callout.

#### Point 1: Column Matching by Header Name

- **What it does**: JLS Reader finds data by column header names, not column positions. If someone inserts a new column or rearranges the sheet, the app still works.
- **Why it matters**: The sheet can evolve without breaking the app. No coordination needed.

#### Point 2: Composite Key Row Matching (Section + Item Name)

- **What it does**: Each training item is identified by a combination of its section name and item name — not its row number. If rows are reordered, added, or deleted, JLS Reader still finds the right items.
- **Why it matters**: Employees' progress data stays accurate even when the sheet is reorganized.

#### Point 3: Verify-Before-Write Safety Check

- **What it does**: Before JLS Reader writes any progress data back to the sheet, it verifies the target cell still contains the expected value. If something has changed, it pauses and flags the discrepancy instead of overwriting.
- **Why it matters**: The app will never silently corrupt sheet data. Safety over convenience.

#### Additional Point: Token Auto-Refresh

- Brief mention: Google OAuth tokens refresh automatically so users don't get unexpectedly logged out.

### Bottom-Line Callout

A visually distinct callout box (darker background or bordered):

> "The Google Sheet is your system of record. JLS Reader is designed to never, ever corrupt it."

Style: `--font-display` at h3 size, centered, generous padding. This is the single most important trust statement on the page.

---

## 3. Cost & Zero Risk

### Cost Table

A styled HTML table (not an image) showing the service-by-service cost breakdown.

| Service | Purpose | Monthly Cost |
|---------|---------|-------------|
| Netlify | App hosting & CDN | $0 (free tier) |
| Firebase Auth | Google sign-in | $0 (free tier) |
| Firestore | User data & progress | $0 (free tier) |
| Google Sheets API | Reading & writing the PLMS sheet | $0 (free tier) |
| Google Fonts | Typography | $0 |
| Claude AI (study tools) | SQ4R, paraphrase, summarize | ~$0.01–0.05/day per active user |

**Styling notes**:
- Clean table with alternating row backgrounds (cream and slightly darker cream)
- The AI cost row should be visually distinct — not hidden, not apologetic. Honest disclosure.
- Below the table, a summary line: "Total: $0/month for the core product. AI features add pennies per user per day."

### Risk Reversal Cards

Five cards in a responsive grid, each with an emoji icon, title, and one-sentence description.

| Icon | Title | Description |
|------|-------|-------------|
| 🔄 | 100% Reversible | Remove access anytime. The Sheet stays exactly as it was. |
| 📊 | Sheet stays source of truth | JLS Reader reads from the Sheet. Your data never leaves Google. |
| ⚡ | Test it now | The app is built and running. No waiting, no vaporware. |
| 💰 | Cost-capped | AI costs are metered and limited. No surprise bills, ever. |
| ↩️ | Every action undoable | Mark-as-done, un-mark. Progress changes are never permanent. |

**Layout**:
- Desktop: 3 columns top row, 2 centered bottom row (or 5 in a single row if space allows)
- Tablet: 2–3 columns
- Mobile: Stacked, full width
- Card style: per `01_Design_System.md` card pattern (white/light background, subtle shadow, rounded corners)

---

## 4. Accessibility & Polish Strip

### Purpose

An unexpected section for an internal tool. Signals that the builder's standard of care extends beyond the obvious. For a CEO evaluating quality, this is a trust differentiator.

### Layout

Horizontal strip of small items, each with an icon and a short label.

| Icon | Label |
|------|-------|
| ⌨️ | Keyboard navigation |
| 👁️ | Screen reader support |
| 🎯 | Reduced motion |
| 📱 | Responsive |
| ⚡ | Optimistic UI |
| 🔄 | Lazy loading |

- **Desktop**: Single horizontal row, evenly spaced
- **Mobile**: Two rows of three, or horizontal scroll
- Subtle background color shift to separate from the risk reversal cards above
- Small text, muted colors — this strip is a "bonus signal," not a primary selling point

## Gaps & Assumptions

| Gap | Default Applied |
|-----|----------------|
| Animation Zone 2 visual content undecided | Defaulting to **rotating device showcase** — flag for stakeholder decision |
| Zone 2 scroll distance not specified | Using `"+=250%"` — shorter than Zone 1 since it's a visual break |
| Zone 2 floating stat positions not defined | Defaulting to four corners of the viewport |
| Risk reversal card emojis vs. custom icons | Using emoji for simplicity — swap for SVG icons if desired |
| Whether the accessibility strip describes the landing page or the JLS Reader app | Interpreting as **JLS Reader app** features (the app has these; the landing page may also have them but they describe the product being pitched) |
| Cost table — exact AI cost wording | Using "~$0.01–0.05/day per active user" per PRD |

## Implementation Notes

- The backward compatibility section is the most technically dense content on the page. Test with a non-technical reader to verify it's clear without jargon.
- The cost table must be a real HTML `<table>` element, not an image — for accessibility and responsiveness.
- Risk reversal cards should feel light and scannable. If the descriptions are longer than one sentence, shorten them.
