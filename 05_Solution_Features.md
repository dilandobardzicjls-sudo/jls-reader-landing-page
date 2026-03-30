# Solution Overview & Feature Deep Dives

## Overview

This section transitions from "here's the problem" to "here's what JLS Reader does about it." It contains three sub-sections in scroll order: the solution overview (three pillars), four alternating feature deep-dives, and a "How It Works" strip. Together they answer Johnny's core question: "Is this a toy or a real tool that would genuinely help my team?"

## Dependencies

- `01_Design_System.md` — Typography, colors, card patterns, alternating layout styles
- `04_Problem_Section.md` — This section immediately follows the problem animation zone
- `09_Content_Copy.md` — All headlines, subheadlines, bullet point text
- `10_Assets_Checklist.md` — Mockup image specs for each feature block

## Solution Overview

### Headline

"Same spreadsheet. Completely different experience."

Subheadline: 1–2 sentences reinforcing that JLS Reader sits on top of the existing Google Sheet — it doesn't replace anything.

### Three Pillars

Horizontal row of three pillars, each with an icon, title, and one-sentence description.

| Pillar | Title | Description |
|--------|-------|-------------|
| 1 | Distraction-Free Reader | Training content pulled from the Sheet into a clean, focused reading view |
| 2 | Smart Progress Tracking | Automatic tracking of what's done, what's next, and how far along each person is |
| 3 | AI Study Tools | Claude-powered tools that help employees actually retain what they read |

### Layout

- **Desktop**: Three columns, equal width, centered within `--content-max-width`
- **Mobile**: Stacked vertically, full width
- Each pillar: icon above title, title in `--font-display` h3 size, description in body text
- Icons: simple, single-color SVG icons or emoji. Keep minimal — these are labels, not illustrations.
- Generous spacing between pillars and from the preceding section

## Feature Deep Dives (Alternating Layout)

Four feature blocks, each with a mockup image on one side and text on the other, alternating left-right.

### Layout Pattern

```
Feature A: [Mockup LEFT]  [Text RIGHT]
Feature B: [Text LEFT]    [Mockup RIGHT]
Feature C: [Mockup LEFT]  [Text RIGHT]
Feature D: [Text LEFT]    [Mockup RIGHT]
```

- **Desktop**: Two-column, ~55% mockup / 45% text (or equal)
- **Tablet**: Same two-column but tighter spacing
- **Mobile**: Stacked — mockup on top, text below. Always mockup-first regardless of desktop order.
- Vertical spacing between feature blocks: `--space-3xl` or `--section-padding`

### Mockup Images

Each mockup is a real screenshot from JLS Reader placed inside a browser or device frame with a subtle shadow. Format: WebP with JPEG fallback via `<picture>`. All mockups need descriptive alt text.

### Feature A: The Reader

**Mockup**: Browser frame showing the reader view — toolbar with theme dots, font controls, document text area, progress bar at bottom.

**Title**: "A reading experience, not a spreadsheet"

**Key points** (concise bullets, no jargon):
- Multiple reading themes (light, sepia, dark, high contrast)
- Adjustable font size and content width
- Scroll position memory — picks up where you left off
- Progress bar showing position in the document
- Image toggle for text-heavy content
- Multi-tab navigation between content items

### Feature B: Multi-Content Support

**Mockup**: Stacked content type cards showing different media types.

**Title**: "Videos, forms, links, docs — all in one place"

**Key points**:
- YouTube, Loom, and Google Drive videos play inline
- Google Forms appear as interactive cards
- Vimeo and external links handled gracefully
- Full document formatting preserved
- No more bouncing between tabs and windows

### Feature C: Progress Tracking

**Mockup**: Item list view showing completed items (checked), a highlighted "NEXT" item, and upcoming items.

**Title**: "Always know where you are"

**Key points**:
- Dashboard shows completion percentage per course/section
- "Continue Learning" picks up at the frontier item (first incomplete)
- Content type badges (doc, video, form, link)
- One-click mark-as-done with undo toast
- Verify-before-write: confirms with the Google Sheet before recording progress
- Un-mark capability — nothing is permanent

### Feature D: AI Study Tools

**Mockup**: AI panel showing method selection pills (SQ4R, Paraphrase, Summarize) and sample SQ4R output.

**Title**: "Study tools that make training stick"

**Key points**:
- SQ4R method: generates survey, questions, and review prompts from the content
- Paraphrase: rewrites content in simpler terms
- Summarize: distills key takeaways
- Responses are cached — same content doesn't burn API credits twice
- Regenerate option for a fresh take
- Daily usage limit to keep costs predictable
- Server-side auth — API keys never touch the browser

**Cost note**: This is where the ~$0.01–0.05/day per active user cost comes from. The AI features are the only non-free component.

## How It Works Strip

### Headline

"Four steps. No setup."

Subheadline: "No IT department, no migration, no configuration."

### Four Steps

Horizontal numbered strip:

| Step | Title | Description |
|------|-------|-------------|
| 1 | Sign in with Google | Use your existing JLS Google account |
| 2 | Sheet auto-detected | JLS Reader finds your team's PLMS sheet automatically |
| 3 | See your dashboard | Your training items, progress, and next steps — organized |
| 4 | Read & learn | Open any item and start learning in a distraction-free reader |

### Layout

- **Desktop**: Horizontal row, 4 equal columns. Each step: large number, title, one sentence. Connected by a subtle line or arrow between steps.
- **Mobile**: Vertical timeline — numbers stacked vertically with a connecting line on the left.
- Visual style: clean, minimal. Numbers in `--color-terracotta`, titles in `--font-display`, descriptions in body text.

### Strategic Purpose

This strip directly answers the unspoken question: "How hard is this to roll out?" The answer — four steps, no IT involvement — removes friction before it forms. It should feel effortless.

## Gaps & Assumptions

| Gap | Default Applied |
|-----|----------------|
| Pillar icons not specified | Use simple SVG icons or emoji — book/reader, chart/progress, brain/AI |
| Exact bullet point copy not finalized | Draft copy above based on PRD feature descriptions. See `09_Content_Copy.md` |
| Mockup images not yet created | See `10_Assets_Checklist.md` for specs (4 mockups needed) |
| Whether the "How It Works" strip has a background color shift | Defaulting to slightly darker cream background to visually separate it from feature blocks |
| Connecting visual between the 4 steps (line, arrow, dots) | Defaulting to a subtle horizontal line connecting step numbers on desktop |

## Implementation Notes

- The alternating layout is the most visually important pattern on the page — get the first feature block pixel-perfect, then replicate the pattern with alternation.
- Mockup images should be the same visual style (same browser frame, same shadow treatment). See `10_Assets_Checklist.md`.
- Keep bullet points scannable — no bullet should be longer than one line on desktop. If it wraps, shorten it.
