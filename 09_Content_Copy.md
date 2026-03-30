# Content & Copy Reference

## Overview

All written content for the landing page in one place. Other files reference this document for exact copy. Treat all text below as **draft copy** — review and refine before launch. The tone should be: confident, warm, specific, zero jargon.

## Dependencies

- None — this is a reference document. Other files depend on it.

## Hero Section

### Badge
"Built & Ready to Test"

### Headline (h1)
"Training that feels like reading, not homework"

### Subheadline
"JLS Reader turns your team's PLMS Google Sheet into a focused, beautiful learning experience — with progress tracking, study tools, and zero migration."

### Proof Strip Stats

| Number | Label | Tooltip / Fine Print |
|--------|-------|---------------------|
| $0/mo | core cost | Core product free. AI study tools add ~$0.01–0.05/day per active user. |
| Zero | migration | Your Google Sheet stays exactly as it is. |
| 100% | reversible | Remove access anytime. No data changes. |

### CTAs
- Primary button: **"Try JLS Reader"**
- Scroll anchor link: **"See How It Works ↓"**

---

## Problem Section (Animation Zone 1 Overlays)

Four text screens that fade in/out over the scroll animation. Each should be 1–2 sentences max, readable in 3–4 seconds of scrolling.

### Screen 1
"Your training system holds the data. But the experience of using it?"

### Screen 2
"Employees bounce between the Sheet, Google Docs, and external links — every switch breaks focus."

### Screen 3
"There's no 'pick up where you left off.' Just scrolling through rows, guessing which was next."

### Screen 4
"Without study tools or progress signals, training becomes a checklist. Comprehension suffers."

---

## Solution Overview

### Headline (h2)
"Same spreadsheet. Completely different experience."

### Subheadline
"JLS Reader sits on top of your existing PLMS Google Sheet. Nothing to migrate. Nothing to replace."

### Three Pillars

| Pillar | Title | Description |
|--------|-------|-------------|
| 1 | Distraction-Free Reader | Training content pulled from the Sheet into a clean, focused reading view. |
| 2 | Smart Progress Tracking | See what's done, what's next, and how far along each person is — automatically. |
| 3 | AI Study Tools | Claude-powered tools that help employees actually retain what they read. |

---

## Feature Deep Dives

### Feature A: The Reader

**Title**: "A reading experience, not a spreadsheet"

**Bullets**:
- Choose from multiple reading themes — light, sepia, dark, or high contrast
- Adjust font size and content width to your preference
- Scroll position memory — picks up right where you left off
- Progress bar shows your position in the document
- Toggle images on or off for text-heavy content
- Navigate between items with tabbed navigation

### Feature B: Multi-Content Support

**Title**: "Videos, forms, links, docs — all in one place"

**Bullets**:
- YouTube, Loom, and Google Drive videos play inline — no new tabs
- Google Forms appear as interactive cards
- Vimeo and external links open gracefully
- Full document formatting preserved
- Everything your Sheet references, organized in one view

### Feature C: Progress Tracking

**Title**: "Always know where you are"

**Bullets**:
- Dashboard shows completion percentage per course and section
- "Continue Learning" jumps to your frontier item — the first incomplete
- Content type badges so you know what's ahead (doc, video, form, link)
- One-click mark-as-done with instant undo
- Progress verified against the Sheet before writing — your data stays accurate
- Changed your mind? Un-mark any item, anytime

### Feature D: AI Study Tools

**Title**: "Study tools that make training stick"

**Bullets**:
- SQ4R method: generates survey questions, reading prompts, and review material
- Paraphrase: rewrites content in simpler, clearer terms
- Summarize: distills the key takeaways into a few sentences
- Responses are cached — the same content doesn't cost twice
- Regenerate for a fresh perspective
- Daily usage limit keeps costs predictable
- API keys secured server-side — never exposed in the browser

---

## How It Works Strip

### Headline (h2)
"Four steps. No setup."

### Subheadline
"No IT department, no migration, no configuration."

### Steps

| # | Title | Description |
|---|-------|-------------|
| 1 | Sign in with Google | Use your existing JLS Google account. |
| 2 | Sheet auto-detected | JLS Reader finds your team's PLMS sheet automatically. |
| 3 | See your dashboard | Your training items, progress, and next steps — organized. |
| 4 | Read & learn | Open any item and start learning in a distraction-free reader. |

---

## Animation Zone 2 Floating Stats

Stats that fade in and accumulate during the product showcase animation:

1. "Zero backend servers"
2. "Google Sheet stays the single source of truth"
3. "Every service runs on free tiers"
4. "Built with React, Firebase, and Claude AI"

---

## Backward Compatibility

### Headline (h2)
"Built to survive change."

### Resilience Points

**Column matching by header name**
- What: "JLS Reader finds data by column header names — not positions. Rearrange or add columns, and the app still works."
- Why it matters: "The sheet can evolve without breaking anything."

**Composite key row matching**
- What: "Training items are identified by section name + item name — not row number. Reorder, add, or remove rows freely."
- Why it matters: "Employee progress stays accurate even when the sheet is reorganized."

**Verify-before-write**
- What: "Before recording progress, JLS Reader checks that the target cell hasn't changed. If something's off, it pauses and flags the discrepancy."
- Why it matters: "The app will never silently overwrite your data."

**Token auto-refresh**
- "Google sign-in tokens refresh automatically — no surprise logouts."

### Callout
> "The Google Sheet is your system of record. JLS Reader is designed to never, ever corrupt it."

---

## Cost Table

### Headline (h2)
"What it costs: nothing."

### Subheadline
"Every service runs on a free tier — except AI study tools, which cost pennies."

### Table Data

| Service | Purpose | Monthly Cost |
|---------|---------|-------------|
| Netlify | App hosting & CDN | $0 |
| Firebase Auth | Google sign-in | $0 |
| Firestore | User data & progress | $0 |
| Google Sheets API | Sheet reading & writing | $0 |
| Google Fonts | Typography | $0 |
| Claude AI | Study tools (SQ4R, summarize, paraphrase) | ~$0.01–0.05/day per active user |

### Summary Line
"Total: **$0/month** for the core product. AI features add pennies per user per day."

---

## Risk Reversal Cards

| Icon | Title | Description |
|------|-------|-------------|
| 🔄 | 100% Reversible | Remove access anytime. The Sheet stays exactly as it was. |
| 📊 | Sheet stays source of truth | JLS Reader reads from the Sheet. Your data never leaves Google. |
| ⚡ | Test it now | The app is built and running. No waiting, no vaporware. |
| 💰 | Cost-capped | AI costs are metered and limited. No surprise bills, ever. |
| ↩️ | Every action undoable | Marked something as done by accident? Un-mark it. Nothing's permanent. |

---

## Accessibility Strip Labels

| Icon | Label |
|------|-------|
| ⌨️ | Keyboard navigation |
| 👁️ | Screen reader support |
| 🎯 | Reduced motion |
| 📱 | Responsive |
| ⚡ | Optimistic UI |
| 🔄 | Lazy loading |

---

## Final CTA Section

### Headline (h2)
"The app is built. The Sheet doesn't change. The cost is zero."

### Primary CTA
Button: **"Try JLS Reader"**

### Separator Text
"Not a tester yet? Request access below."

### Email Form
- Input placeholder: `"your.name@company.com"`
- Submit button: **"Request Test Access →"**
- Helper text: "You'll be added to the Google OAuth test user list. Currently 100 slots available."

### Success State
"Thanks! We'll add you to the tester list within 24 hours."

### Error State
"Something went wrong. Try again, or email us directly at dilan.dobardzic.jls@gmail.com"

### Trust Reinforcement
"Your Google Sheet doesn't change" · "Remove access anytime" · "No credit card required — ever"

---

## Footer

"JLS Reader — Built with React, Firebase, and Claude AI. Deployed on Netlify."

Placeholder links: Privacy Policy | Terms of Service

---

## Alt Text Reference

| Image | Alt Text |
|-------|----------|
| Hero dashboard mockup | "JLS Reader dashboard showing a greeting, course cards with progress bars, and a clean interface" |
| Reader mockup | "JLS Reader reading view with theme selection, adjustable font controls, and a progress bar" |
| Multi-content mockup | "Stacked content type cards showing inline video, Google Form, and external link items" |
| Progress tracking mockup | "Training item list showing completed items, a highlighted next item, and upcoming items" |
| AI tools mockup | "AI study tools panel with SQ4R, paraphrase, and summarize options and sample output" |
| Zone 1 fallback | "Chaotic spreadsheet elements gradually resolving into a clean reading interface" |
| Zone 2 fallback | "JLS Reader app displayed on a rotating device" |
| Logo | "JLS Reader logo" |

## Gaps & Assumptions

| Gap | Default Applied |
|-----|----------------|
| All copy is draft | Based on PRD descriptions. Needs stakeholder review before launch. |
| Proof strip tooltip/fine print mechanism not specified | Defaulting to a small-text line below the stat, not a hover tooltip (mobile-friendly) |
| Whether "Currently 100 slots available" is accurate | Placeholder — verify the actual Google OAuth tester limit before launch |
