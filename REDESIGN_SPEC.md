# Results Page Redesign Spec

## Reference Design (MyHumanDesign.com style)
- Bodygraph chart centred at top with 9 centres shown as shapes
- Planetary positions listed left (Design/unconscious, red) and right (Personality/conscious, black)
- Each centre shows gate numbers around it
- Defined centres are filled/coloured, undefined are hollow/light
- Clean white/light background, minimal, clinical but warm
- Type, Strategy, Authority, Profile shown as clean data pills at top

## Page Layout

### SECTION 1: "Your Human Design" (white background, forest green header)

**Top bar:**
- Name/type badge: "You are a [TYPE]" in large serif
- Tagline below (e.g., "The Life Force")

**Data grid (4 pills):**
- Type | Strategy | Authority | Profile

**Bodygraph SVG:**
- Full bodygraph with 9 centres: Head, Ajna, Throat, G-Center, Heart/Ego, Solar Plexus, Sacral, Spleen, Root
- Defined centres = filled with terracotta/forest green
- Undefined centres = hollow, light grey border
- Active channels = thick coloured lines connecting centres
- Inactive channels = thin grey dashed lines
- Gate numbers shown as small labels on the chart
- Planetary positions table below chart: two columns (Design left in terracotta, Personality right in dark green), planet symbol + gate number + line

**Expandable sections (accordion, one at a time):**
Each row: section title + chevron. Click to expand inline.

1. **Your Type** — What being a [TYPE] actually means. Expanded content from content.ts expandedBody.
2. **Your Strategy** — "[STRATEGY]" + business-context explanation
3. **Your Authority** — "[AUTHORITY]" + how to make decisions
4. **Your Profile** — "[PROFILE]" + how you show up in business

---
Visual divider: horizontal rule with "Your Freedom Blueprint" centered, terracotta colour, small Tracy Harris Co logo or monogram

---

### SECTION 2: "Your Freedom Blueprint" (parchment background #ece7de)

Intro line: "This is where Human Design meets Tracy's method. Your type tells you HOW you're wired. Your Freedom Blueprint shows you how to BUILD with it."

**Expandable sections (accordion):**

5. **Your Freedom Strategy** — Tracy's one-liner + expanded body (3 paragraphs)
6. **Your FRESH Alignment** — Which pillar is natural, which needs work, recommendation
7. **Your Freedom Filled Business** — Business model advice + 3 practical tips
8. **Your Defined Centers** — Each defined centre with its meaning for business

---

### SECTION 3: CTA (forest green background)
- "Ready to go deeper?"
- Workshop invite + button
- Download PDF button

---

## Bodygraph SVG Spec

Build as a React component `<Bodygraph />` accepting `definedCenters` and `activeChannels` props.

### Centre positions (approximate SVG coordinates, 300x400 viewBox):
```
Head: cx=150, cy=30, shape=diamond (rhombus)
Ajna: cx=150, cy=85, shape=diamond
Throat: cx=150, cy=145, shape=square (rect)
G-Center: cx=150, cy=210, shape=diamond (larger)
Heart/Ego: cx=205, cy=195, shape=triangle/small square
Solar Plexus: cx=205, cy=280, shape=square
Sacral: cx=150, cy=290, shape=rect (wide)
Spleen: cx=95, cy=245, shape=triangle/square
Root: cx=150, cy=365, shape=rect (wide)
```

### Centre shapes and sizes:
- Head: small diamond, ~30x30
- Ajna: small diamond, ~30x30
- Throat: small square, ~35x25
- G-Center: large diamond, ~45x45 (identity/love centre, most prominent)
- Heart/Ego: small square, ~25x25
- Solar Plexus: small square, ~30x25
- Sacral: wide rect, ~60x25
- Spleen: small triangle/square, ~28x25
- Root: wide rect, ~60x25

### Channel lines:
Draw SVG lines between centre coordinates for each of the 36 channels.
Active channels (both gates defined) = solid line, 3px, colour matching the dominant section (HD section = terracotta, FRESH section = sage)
Inactive channels = dashed line, 1px, #d0c8bf

### Colour scheme for bodygraph:
- Defined centre fill: #243531 (forest green)
- Defined centre text: #fbfaf8 (white)
- Undefined centre fill: #fbfaf8 (white)
- Undefined centre stroke: #d0c8bf
- Undefined centre text: #788e75 (sage)
- Active channel: #ad765b (terracotta)
- Inactive channel: #e0dbd3

---

## PDF Download

When "Download Your Blueprint" is clicked:
1. Use `window.print()` with a print-specific CSS that formats the page cleanly
2. OR use a simple approach: open a new window with a print-optimised version

For v1, use `window.print()` approach with `@media print` CSS that:
- Hides nav, quiz CTA, download button
- Shows everything else cleanly
- Removes accordion behaviour (all sections expanded)
- Adds Tracy Harris Co footer/watermark

---

## Files to change
- `src/app/results/[type]/ResultsClient.tsx` — full rebuild with two-section layout
- `src/components/Bodygraph.tsx` — NEW component (SVG bodygraph renderer)
- `src/components/ResultCard.tsx` — may be replaced or significantly changed
- `src/app/globals.css` — add print styles

## NO EM DASHES anywhere. No exceptions.
