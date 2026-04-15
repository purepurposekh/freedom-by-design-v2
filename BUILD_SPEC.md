# Freedom by Design — Build Specification

## What We're Building
A Human Design assessment tool for Tracy Harris Co. Users enter birth data, we calculate their HD chart, and present Tracy's "Freedom Strategy" interpretation.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Ephemeris:** `sweph` npm package (Swiss Ephemeris Node.js bindings) — if native bindings fail on this system, use `swisseph` (npm) as fallback
- **Geocoding:** Nominatim (OpenStreetMap) — free, no API key needed
- **Deploy:** Cloudflare Pages (later)

## Brand Palette (Tracy Harris Co)
- Background: `#fbfaf8` (warm white)
- Primary dark: `#243531` (deep forest green)
- Near-black: `#101010`
- Sage: `#788e75`
- Terracotta: `#ad765b`
- Blush: `#cc9989`
- Parchment: `#ece7de`
- Teal: `#275d74`
- Fonts: Use system fonts for now (serif headings, sans body). We'll add custom fonts later.

## IMPORTANT WRITING RULE
- **NO EM DASHES (—). EVER.** Use commas, full stops, or rewrite the sentence instead.

## Architecture

### API Route: `/api/calculate`
**Input:** `{ birthDate, birthTime, birthPlace }`
**Output:** Full HD chart data including type, strategy, authority, profile, activated gates, defined channels, defined centers

### Calculation Flow:
1. **Geocode** birth place → lat/lon/timezone using Nominatim
2. **Convert** birth date+time to Julian Day using the resolved timezone
3. **Calculate Personality (birth):** Get ecliptic longitude of Sun, Earth, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, North Node, South Node
4. **Find Design date:** Calculate the moment when the Sun was exactly 88° earlier in the ecliptic than at birth
5. **Calculate Design:** Same 13 bodies at Design date
6. **Map to Gates:** Convert each longitude to a gate number (1-64) and line (1-6)
7. **Determine:** channels → centers → type → strategy → authority → profile

### Gate-to-Degree Mapping (complete, verified from two sources)
Each gate occupies 5.625° (360° ÷ 64). The sequence around the zodiac starting from 0° Aries:

Starting from 0° Aries (0° absolute ecliptic longitude):
```
Gate 25: 358°15'00" - 3°52'30"
Gate 17: 3°52'30" - 9°30'00"
Gate 21: 9°30'00" - 15°07'30"
Gate 51: 15°07'30" - 20°45'00"
Gate 42: 20°45'00" - 26°22'30"
Gate 3: 26°22'30" - 32°00'00"
Gate 27: 32°00'00" - 37°37'30"
Gate 24: 37°37'30" - 43°15'00"
Gate 2: 43°15'00" - 48°52'30"
Gate 23: 48°52'30" - 54°30'00"
Gate 8: 54°30'00" - 60°07'30"
Gate 20: 60°07'30" - 65°45'00"
Gate 16: 65°45'00" - 71°22'30"
Gate 35: 71°22'30" - 77°00'00"
Gate 45: 77°00'00" - 82°37'30"
Gate 12: 82°37'30" - 88°15'00"
Gate 15: 88°15'00" - 93°52'30"
Gate 52: 93°52'30" - 99°30'00"
Gate 39: 99°30'00" - 105°07'30"
Gate 53: 105°07'30" - 110°45'00"
Gate 62: 110°45'00" - 116°22'30"
Gate 56: 116°22'30" - 122°00'00"
Gate 31: 122°00'00" - 127°37'30"
Gate 33: 127°37'30" - 133°15'00"
Gate 7: 133°15'00" - 138°52'30"
Gate 4: 138°52'30" - 144°30'00"
Gate 29: 144°30'00" - 150°07'30"
Gate 59: 150°07'30" - 155°45'00"
Gate 40: 155°45'00" - 161°22'30"
Gate 64: 161°22'30" - 167°00'00"
Gate 47: 167°00'00" - 172°37'30"
Gate 6: 172°37'30" - 178°15'00"
Gate 46: 178°15'00" - 183°52'30"
Gate 18: 183°52'30" - 189°30'00"
Gate 48: 189°30'00" - 195°07'30"
Gate 57: 195°07'30" - 200°45'00"
Gate 32: 200°45'00" - 206°22'30"
Gate 50: 206°22'30" - 212°00'00"
Gate 28: 212°00'00" - 217°37'30"
Gate 44: 217°37'30" - 223°15'00"
Gate 1: 223°15'00" - 228°52'30"
Gate 43: 228°52'30" - 234°30'00"
Gate 14: 234°30'00" - 240°07'30"
Gate 34: 240°07'30" - 245°45'00"
Gate 9: 245°45'00" - 251°22'30"
Gate 5: 251°22'30" - 257°00'00"
Gate 26: 257°00'00" - 262°37'30"
Gate 11: 262°37'30" - 268°15'00"
Gate 10: 268°15'00" - 273°52'30"
Gate 58: 273°52'30" - 279°30'00"
Gate 38: 279°30'00" - 285°07'30"
Gate 54: 285°07'30" - 290°45'00"
Gate 61: 290°45'00" - 296°22'30"
Gate 60: 296°22'30" - 302°00'00"
Gate 41: 302°00'00" - 307°37'30"
Gate 19: 307°37'30" - 313°15'00"
Gate 13: 313°15'00" - 318°52'30"
Gate 49: 318°52'30" - 324°30'00"
Gate 30: 324°30'00" - 330°07'30"
Gate 55: 330°07'30" - 335°45'00"
Gate 37: 335°45'00" - 341°22'30"
Gate 63: 341°22'30" - 347°00'00"
Gate 22: 347°00'00" - 352°37'30"
Gate 36: 352°37'30" - 358°15'00"
```

### Gate-to-Center Mapping
```
Head: 64, 61, 63
Ajna: 47, 24, 4, 17, 43, 11
Throat: 62, 23, 56, 35, 12, 45, 33, 8, 31, 20, 16
G-Center: 7, 1, 13, 25, 46, 2, 15, 10
Heart/Ego: 21, 51, 26, 40
Solar Plexus: 6, 37, 22, 36, 49, 55, 30
Sacral: 5, 14, 29, 59, 9, 3, 42, 27, 34
Spleen: 48, 57, 44, 50, 32, 28, 18
Root: 53, 60, 52, 19, 39, 41, 58, 38, 54
```

### 36 Channels (gate1-gate2: center1-center2)
```
1-8: G-Center - Throat
2-14: G-Center - Sacral
3-60: Sacral - Root
4-63: Ajna - Head
5-15: Sacral - G-Center
6-59: Solar Plexus - Sacral
7-31: G-Center - Throat
9-52: Sacral - Root
10-20: G-Center - Throat
10-34: G-Center - Sacral
10-57: G-Center - Spleen
11-56: Ajna - Throat
12-22: Throat - Solar Plexus
13-33: G-Center - Throat
16-48: Throat - Spleen
17-62: Ajna - Throat
18-58: Spleen - Root
19-49: Root - Solar Plexus
20-34: Throat - Sacral
20-57: Throat - Spleen
21-45: Heart/Ego - Throat
23-43: Throat - Ajna
24-61: Ajna - Head
25-51: G-Center - Heart/Ego
26-44: Heart/Ego - Spleen
27-50: Sacral - Spleen
28-38: Spleen - Root
29-46: Sacral - G-Center
30-41: Solar Plexus - Root
32-54: Spleen - Root
34-57: Sacral - Spleen
35-36: Throat - Solar Plexus
37-40: Solar Plexus - Heart/Ego
39-55: Root - Solar Plexus
42-53: Sacral - Root
47-64: Ajna - Head
```

### Type Determination Rules
1. **Reflector:** All 9 centers are UNDEFINED
2. **Manifestor:** Sacral is UNDEFINED + at least one motor center (Root, Solar Plexus, Heart/Ego) has a defined channel path to the Throat
3. **Generator:** Sacral is DEFINED + NO motor center has a defined channel path to the Throat
4. **Manifesting Generator:** Sacral is DEFINED + a motor center has a defined channel path to the Throat
5. **Projector:** Sacral is UNDEFINED + NO motor-to-Throat path + at least one center is defined

NOTE: "motor-to-Throat path" means a connected path of defined channels from any motor center (Root, Sacral, Solar Plexus, Heart/Ego) reaching the Throat. This can be a direct channel OR through intermediate defined centers. Must use graph traversal (BFS/DFS) to check connectivity.

### Authority Determination (first match wins)
1. Solar Plexus defined → Emotional Authority
2. Sacral defined → Sacral Authority
3. Spleen defined → Splenic Authority
4. Heart/Ego defined (and connected to Throat) → Ego Manifested Authority
5. Heart/Ego defined (not connected to Throat) → Ego Projected Authority
6. G-Center defined (and connected to Throat) → Self-Projected Authority
7. Head or Ajna defined → Mental/Environment Authority
8. Nothing defined → Lunar Authority (Reflector only)

### Profile Determination
- Personality Sun Line (1-6) / Design Sun Line (1-6)
- Line = which sixth of the gate's 5.625° arc the planet falls in
- Line 1: first 0.9375°, Line 2: next 0.9375°, etc.

### Strategy by Type
- Manifestor → "To Inform"
- Generator → "To Respond"
- Manifesting Generator → "To Respond"
- Projector → "Wait for the Invitation"
- Reflector → "Wait a Lunar Cycle"

## Pages

### 1. Landing Page (`/`)
- Hero: "What does your Human Design say about the business you're meant to build?"
- Brief explainer (3-4 sentences)
- CTA button: "Discover Your Freedom Blueprint"
- Tracy Harris Co branding

### 2. Quiz Page (`/quiz`)
- Step 1: Birth date (date picker)
- Step 2: Birth time (time picker with "I don't know my exact time" option)
- Step 3: Birth place (city search with autocomplete via Nominatim)
- Step 4: Email capture (required before seeing results)
- Step 5: 2-3 supplementary questions:
  - "Where are you in your business?" (5 options)
  - "What's your biggest challenge right now?" (5 options)
- Submit → loading animation → redirect to results

### 3. Results Page (`/results/[type]`)
- Type name + Strategy + Authority
- "Your Freedom Strategy" (Tracy's interpretation, unique per type)
- Shareable Instagram card (downloadable image)
- CTA: "Want the full picture? Join Freedom Filled Business"
- Link to workshop

## Tracy's Freedom Strategy Content (per type)

### Manifestor
**Freedom Strategy:** "Initiate, then let go."
You're built to start things, not sustain them. Your power is in the spark. The Freedom Filled way? Build a business where you light the fire and your team keeps it burning. Stop trying to do the follow-through yourself.

### Generator
**Freedom Strategy:** "Follow the fire in your belly."
You have more sustained energy than anyone in the room, but only when you're doing work that genuinely lights you up. If your business feels like a grind, it's not because you're lazy. It's because you're building something your body is saying no to.

### Manifesting Generator
**Freedom Strategy:** "Build one vehicle for all your passions."
You want to do everything, and honestly? You can. But not all at once, and not from scratch every time. Your Freedom Filled business is one core offer that lets you express your many passions without burning it all down to start again.

### Projector
**Freedom Strategy:** "Lead with wisdom, not hours."
You're not built for hustle culture, and that's your superpower. Your business grows when people come to YOU for your insight, not when you chase them. The most freedom-filled move? Charge for your brain, not your time.

### Reflector
**Freedom Strategy:** "Trust the cycle, not the clock."
You feel everything around you, which makes you the ultimate people-reader. But it also means you need space to process. Your Freedom Filled business runs on lunar rhythm, not quarterly pressure. Give yourself 28 days for every big decision.

## File Structure
```
freedom-by-design/
├── src/
│   ├── app/
│   │   ├── page.tsx              (landing page)
│   │   ├── quiz/
│   │   │   └── page.tsx          (quiz form)
│   │   ├── results/
│   │   │   └── [type]/
│   │   │       └── page.tsx      (results page per type)
│   │   ├── api/
│   │   │   ├── calculate/
│   │   │   │   └── route.ts      (HD calculation endpoint)
│   │   │   └── geocode/
│   │   │       └── route.ts      (Nominatim proxy)
│   │   └── layout.tsx
│   ├── lib/
│   │   ├── ephemeris.ts          (Swiss Ephemeris wrapper)
│   │   ├── gates.ts              (gate mapping data)
│   │   ├── channels.ts           (channel + center data)
│   │   ├── types.ts              (type/authority/profile calculation)
│   │   └── content.ts            (Tracy's interpretation content)
│   └── components/
│       ├── QuizForm.tsx
│       ├── ResultCard.tsx
│       └── ShareCard.tsx
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Verification
After build, test against mybodygraph.com with these known births:
1. A few team members if birth data is available
2. Celebrity birth data (easily available online)
3. Edge cases: Reflectors are very rare, make sure the type logic handles all 5 types
