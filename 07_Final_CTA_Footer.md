# Final CTA Section \& Footer

## Overview

The conversion endpoint of the page. By this point, the narrative has systematically addressed every dimension — what it does, why it matters, whether it's safe, what it costs. This section makes the action feel obvious and low-commitment. Two paths serve different mindsets: "Try JLS Reader" for confidence, "Request Test Access" for caution. Both lead to adoption.

## Dependencies

* `01\_Design\_System.md` — Button styles, card patterns, form input styling
* `09\_Content\_Copy.md` — Headline, subheadline, trust reinforcement text, form labels

## Section Structure

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Headline: "The app is built. The Sheet doesn't          │
│  change. The cost is zero."                              │
│                                                          │
│  Subheadline (1 sentence supporting copy)                │
│                                                          │
│  ┌────────────────────────────────────────┐              │
│  │     \[ Try JLS Reader → ]              │  ← Primary   │
│  │     (prominent, large button)          │              │
│  └────────────────────────────────────────┘              │
│                                                          │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─               │
│                                                          │
│  "Not a tester yet? Request access below."               │
│                                                          │
│  ┌────────────────────────────────────────┐              │
│  │  \[your.name@company.com    ]           │              │
│  │  \[ Request Test Access →   ]           │  ← Secondary │
│  │                                        │              │
│  │  Small text: "You'll be added to the   │              │
│  │  OAuth test user list. 100 slots       │              │
│  │  available."                           │              │
│  └────────────────────────────────────────┘              │
│                                                          │
│  Trust reinforcement:                                    │
│  "Your Google Sheet doesn't change"                      │
│  "Remove access anytime"                                 │
│  "No credit card required — ever"                        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Primary CTA: "Try JLS Reader"

* Large primary button style from `01\_Design\_System.md`
* Wider than standard buttons — this is the most important action on the page
* Links to the live JLS Reader app URL
* **Opens in a new tab** (`target="\_blank"`, `rel="noopener noreferrer"`)
* URL: `https://jls-reader-app.netlify.app` \[placeholder — confirm before launch]
* Visually dominant: larger font size, more padding than standard buttons

### Guidance for Non-Pre-Authorized Users

Below or near the primary CTA, include subtle small text:

> "For authorized testers. Not on the list yet? Request access below."

This guides forwarded stakeholders (who aren't OAuth-whitelisted) toward the email form without cluttering the experience for Johnny.

## Email Opt-In Form: "Request Test Access"

### Form Layout

Minimal — one input field and one submit button. Horizontal layout on desktop (input + button side by side), stacked on mobile.

### Form Elements

|Element|Spec|
|-|-|
|Email input|`type="email"`, placeholder: `"your.name@company.com"`|
|Submit button|Text: "Request Test Access →", secondary/olive button style|
|Helper text (below form)|"You'll be added to the Google OAuth test user list. Currently 100 slots available."|

### Form Submission

**Service**: Formspree (free tier, 50 submissions/month)

**Endpoint**: `https://formspree.io/f/{FORM\_ID}` — replace `{FORM\_ID}` with actual Formspree form ID before launch.

**Delivery**: Submissions arrive at `dilan.dobardzic.jls@gmail.com`

**Implementation**:

* Submit via `fetch()` POST with JSON body (not a traditional form submission — avoids page redirect)
* Set `Content-Type: application/json` and include `{ "email": inputValue }`
* Handle the response in JS to show success/error states without page reload

### Client-Side Validation

* Validate email format before submission (HTML5 `type="email"` validation + a basic JS regex check)
* Disable the submit button while the request is in flight (prevent double-submission)
* Don't validate anything else — one field, one check

### Success State

On successful submission, replace the entire form (input + button + helper text) with:

> "Thanks! We'll add you to the tester list within 24 hours."

* Same visual area — no layout shift
* Green checkmark icon or olive-colored text for positive reinforcement
* The success message persists (no timeout back to the form)

### Error State

On submission failure (network error, Formspree error), show:

> "Something went wrong. Try again, or email us directly at dilan.dobardzic.jls@gmail.com"

* The email address should be a clickable `mailto:` link
* Red/warning-colored text (use a warm red that fits the palette, not a jarring alert red)
* The form remains functional so they can retry
* Don't show a generic "error" — the fallback email address ensures the conversion path is never fully blocked

## Trust Reinforcement

Below the form, three short trust statements in a horizontal row (or stacked on mobile):

|Statement|
|-|
|"Your Google Sheet doesn't change"|
|"Remove access anytime"|
|"No credit card required — ever"|

* Small text, muted color (`--color-ink` at \~60% opacity)
* Separated by bullets, pipes, or generous spacing
* Final reassurance before Johnny leaves the page

## CTA Section Styling

* Background: subtle shift from the preceding section — slightly darker cream, or a very subtle terracotta tint at low opacity
* Generous vertical padding (`--section-padding` or more)
* All content centered horizontally
* The visual hierarchy is critical: headline → primary CTA → separator → email form → trust text. Each level should be visually distinct in size and weight.

\---

## Footer

Minimal. The footer exists for completeness, not persuasion.

### Content

* **Attribution line**: "JLS Reader — Built with React, Firebase, and Claude AI. Deployed on Netlify."
* **Placeholder links**: Privacy Policy | Terms of Service

  * Both are non-functional `#` links for now
  * Style as muted text links

### Styling

* Dark background (`--color-ink`), cream text
* Minimal height — one or two lines
* Centered content
* Small font size (`0.875rem`)

## Gaps \& Assumptions

|Gap|Default Applied|
|-|-|
|JLS Reader app URL not provided|Placeholder: `https://jls-reader-app.netlify.app`|
|Formspree form ID not provided|Placeholder: `{FORM\_ID}` — must be created and inserted before launch|
|Whether the primary CTA should appear a second time below the email form|Defaulting to **no** — one instance of each CTA in this section to avoid clutter|
|Privacy Policy / Terms of Service content|Non-functional placeholder links. Create actual pages if needed post-MVP.|
|Form submission method — Formspree supports both `action` POST and AJAX|Using AJAX (`fetch`) to avoid page redirect and enable custom success/error states|

## Implementation Notes

* The email form is the only piece of this page that involves a third-party service call. Test it thoroughly: successful submission, network failure, invalid email, rapid double-click.
* The `target="\_blank"` on the primary CTA is critical — Johnny must not lose the landing page when clicking through to the app.
* Consider using `sessionStorage` to remember if the form was already submitted in this session, so the success state persists if the user scrolls away and comes back.

