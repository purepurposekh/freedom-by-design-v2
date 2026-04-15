# SVG Bodygraph Fix Notes

## Problems (from Karl's screenshots)
1. SVG is too small overall — crammed into a tiny space
2. Gate numbers are all squishing together into unreadable blobs (e.g., "8121620233135354556..." all on one line)
3. Colours are too dark/harsh (forest green centres are very heavy)
4. Numbers hard to distinguish — too small font size

## Required Fixes to Bodygraph.tsx

### 1. Make the SVG much bigger
- viewBox should be at least "0 0 400 700" (wider and taller)
- The component should render at full container width
- Add width="100%" and height="auto" to SVG element
- Centres should be proportionally larger too

### 2. Fix gate number placement - spread them out properly
Each centre has gates attached to specific connection points. Instead of rendering ALL gate numbers as one cluster near the centre, place each gate number near where its channel EXITS the centre.

Gate layout per centre (approximate positions around each centre):
- Gate numbers should be offset from the centre shape, towards the direction of the channel they connect to
- Each gate gets its OWN position, not stacked on top of each other
- Font size: 11-12px minimum
- Only show the gate number, not all gates for every centre clustered together

### 3. Softer colours
- Defined centres: use a lighter forest green, e.g., #3a5a52 or even sage #788e75 for lighter feel
- OR: use parchment/cream fill (#ece7de) with forest green text and a forest green border for defined centres
- Active channels: terracotta #ad765b is fine but maybe slightly thinner (2px)
- The overall feel should be softer, editorial, not so heavy

### 4. Minimum render size
The SVG container should have a minimum height of 500px on mobile, 600px on desktop.

### 5. Gate number display approach
Instead of showing ALL gate numbers around each centre (which creates the cramming problem), consider:
- Only show the ACTIVE/defined gates in terracotta bold
- Show undefined gates in very light grey, smaller font
- Or: don't show undefined gate numbers at all (only active ones)
- This dramatically reduces clutter
