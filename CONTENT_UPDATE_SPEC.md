# Content Update Spec — Make Results Tracy-Specific

## Context
This HD assessment needs to feel like Tracy Harris is interpreting your chart, not a generic HD calculator. Every section must be filtered through the FRESH Framework (Fitness, Relationships, Environment, Self, Hustle) and Freedom Filled Business philosophy.

## IMPORTANT: NO EM DASHES (—) ANYWHERE. Use commas, full stops, or rewrite.

## What Needs to Change

### 1. Expand `src/lib/content.ts` massively

The content file needs to grow from a single paragraph per type to comprehensive sections:

For EACH of the 5 types (Manifestor, Generator, Manifesting Generator, Projector, Reflector), include:

#### a) Freedom Strategy (exists, but expand)
Keep the tagline and one-liner. Expand the body to 2-3 paragraphs with practical business examples.

#### b) Strategy Explanation
What their HD strategy means IN BUSINESS CONTEXT. Not abstract. Practical.

- Manifestor "To Inform": "Before you launch that new offer, rebrand your business, or pivot your niche, tell people. Not ask permission. Inform. Your team, your audience, your partner. The women who struggle most as Manifestors are the ones who disappear, rebuild everything behind closed doors, and then wonder why nobody followed them to the new thing."

- Generator "To Respond": "Stop creating offers nobody asked for. Your business grows when you pay attention to what your audience is already telling you they need. That DM asking about meal planning? That comment saying 'I wish someone would just show me how'? Those are your signals. Respond to them."

- Manifesting Generator "To Respond": Same as Generator but add the multi-passion angle. "You'll feel the pull to start something new every few weeks. That's not a flaw. But before you build that new course or start that podcast, check: is anyone actually asking for this? Your best moves come from responding to real demand, then moving fast."

- Projector "Wait for the Invitation": "This does NOT mean sit on the couch and wait for clients to fall from the sky. It means stop cold-DMing strangers. Stop pitching before people are ready. Instead, put your brilliance where it can be seen. Write the post, record the podcast, share the insight. The right people will come to you and say 'I need that.' That's your invitation."

- Reflector "Wait a Lunar Cycle": "You have a 28-day inner rhythm. Big decisions, like launching a program, hiring someone, or changing your niche, need a full cycle to settle. If it still feels right after 28 days, it's right. This is your protection against absorbing someone else's excitement and building their dream instead of yours."

#### c) Authority Explanation
What their authority means for business decision-making. This should cover ALL authority types, not just per-type. Create a separate AUTHORITY_CONTENT object:

- Emotional (Solar Plexus): "You're designed to sleep on it. That 'amazing opportunity' that feels urgent right now? Wait. Your emotions move in waves. The decision that feels perfect at the crest might feel terrible in the trough. Give yourself at least one night. If it still feels aligned when the wave has passed, move forward."

- Sacral: "Your gut knows. Literally. When someone asks 'do you want to do this?' and your body goes 'uh huh' or 'mm mm,' trust that. The Sacral response is physical, not logical. Stop overthinking your yes. If your body lights up, say yes. If it goes flat, it's a no, even if your brain says it makes sense."

- Splenic: "You get a hit in the moment. A quiet knowing. The tricky part? It only speaks once. It won't repeat itself. When your intuition says 'this isn't right' in the middle of a sales call, don't override it because the numbers look good. Your Spleen is protecting you."

- Ego Manifested: "Your heart makes the call. Not your head, not your gut. When you feel that pull in your chest that says 'I WILL do this,' trust it. You're one of the few people designed to make willpower-based promises and actually follow through. But only when the commitment comes from your heart, not from guilt or obligation."

- Ego Projected: "Same heart-based knowing as Ego Manifested, but you need to talk it through with someone first. Not for their approval. For clarity. Hearing yourself say it out loud helps you know if the commitment is real or if you're performing confidence."

- Self-Projected: "Talk it out. Find someone who will just listen while you process. You need to hear your own voice say the thing before you know if it's true for you. Journaling works. Voice memos work. Anything that gets the decision out of your head and into sound."

- Mental/Environment: "You're not designed to make decisions from logic OR emotion. You need the right environment and the right sounding boards. Change your physical space when you're stuck. Have the conversation in a different room. Walk outside. Your clarity comes from your surroundings, not your internal processing."

- Lunar: "28 days. Full stop. Talk to different people throughout the month. Notice how the decision feels in week 1 vs week 3. You're sampling the entire emotional spectrum before you're ready to choose."

#### d) Profile Explanation
Brief explanation of what each profile number means for how they show up in business. Create a PROFILE_CONTENT object keyed by profile string (e.g., "1/3", "2/4", "5/1"):

For the 12 possible profiles, give a 2-3 sentence business interpretation:

- 1/3: "The Researcher who learns by doing. You need to feel solid in your knowledge before you teach it, and you'll learn most of what you know through trial and error. Your audience trusts you because you've actually done the thing, not just studied it."

- 1/4: "The Researcher with a network. You go deep into your subject and then share what you find with your inner circle. Your business grows through relationships, not algorithms. The people who know you personally become your best ambassadors."

- 2/4: "The Natural Talent with connections. People see gifts in you that you can't always see in yourself. Your best business moves happen when someone in your network says 'you should really teach that thing you do.' Listen to them."

- 2/5: "The Natural Talent who gets projected on. People expect you to save them. You can, sometimes. But you need space to recharge, and you need to be selective about who you help. Not every client is your client."

- 3/5: "The Experimenter who others look to for solutions. You've tried everything, and that experience is your authority. Your audience sees you as someone who can fix their problems because you've already navigated those exact challenges."

- 3/6: "The Experimenter becoming the Role Model. Your early business years were chaotic, full of pivots, and maybe some spectacular failures. After 40 (roughly your Saturn Return), something shifts. You become the woman others look at and say 'I want what she has.'"

- 4/6: "The Networker becoming the Role Model. Your business is built on who you know and the trust you've earned. You're moving toward a phase of life where your lived experience becomes your greatest selling point."

- 4/1: "The Networker with deep foundations. You need to know your stuff inside and out before you share it. Your business grows through genuine relationships, referrals, and community, not through going viral."

- 5/1: "The Problem-Solver with depth. People project their expectations onto you. They want you to have the answer. And because you research everything thoroughly, you usually do. Your challenge: managing those projections so you don't burn out trying to be everyone's saviour."

- 5/2: "The Problem-Solver with natural talent. You attract people who need you to fix things, and you often have an innate ability to do exactly that. But you also need significant alone time. Build a business that doesn't require you to be 'on' 24/7."

- 6/2: "The Role Model with natural gifts. You've lived through phases: experimentation (before 30), retreat and observation (30-50), and then stepping into true leadership (after 50). Wherever you are in that arc, honour it. Don't rush the role model phase."

- 6/3: "The Role Model who learned through experience. Similar to 6/2 but with more trial-and-error built in. Your wisdom comes from having actually done it wrong and figuring out what works. That authenticity is magnetic."

#### e) FRESH Alignment by Type
How each type naturally aligns with FRESH pillars:

- Manifestor: Strong in Hustle (natural initiator). Tends to neglect Relationships (goes lone wolf). Key FRESH focus: invest in Relationships, because your business needs informed allies, not surprised bystanders.

- Generator: Strong in Hustle + Fitness (sustained energy, loves doing the work). Watch for Environment (can over-work in the wrong setting and not notice). Key FRESH focus: Environment. Your workspace, your clients, your team. If the environment drains your Sacral, everything suffers.

- Manifesting Generator: High Hustle energy, bursts of intense Fitness. Needs intentional Self work (identity gets scattered across too many projects). Key FRESH focus: Self. Who are you when you strip away all the projects? Get clear on that, and the right projects find you.

- Projector: Must prioritise Fitness + Environment (energy management is everything for non-Sacral types). Natural strength in Self (deep self-awareness). Key FRESH focus: Fitness, not in the "gym every day" sense, but in the "protect your energy like it's your most valuable asset" sense. Because it is.

- Reflector: All FRESH pillars need intentional attention (nothing is consistently defined). Natural strength in Relationships (you feel everyone). Key FRESH focus: Environment, more than any other type. You absorb the energy of every room you walk into. Choose your rooms carefully.

#### f) Business Building by Type
Practical Freedom Filled Business advice:

- Manifestor: "Your ideal business model: create the vision, hire the team, step back. You're the founder energy, not the operator energy. If you're doing customer service, you've built the wrong structure. Your Freedom Filled business runs without you being in every conversation."

- Generator: "Your ideal business model: mastery-based. One core offer you love delivering, refined over years. You're not meant to have 12 different programs. You're meant to have one incredible one that people rave about. Think depth, not breadth."

- Manifesting Generator: "Your ideal business model: one core container with multiple expressions. Like FFB, which covers courses, coaching, community, and retreats all under one umbrella. You get variety inside a single structure. That's freedom for you."

- Projector: "Your ideal business model: high-touch, premium pricing, fewer clients. You don't have the sustained energy for volume. What you have is the insight that transforms someone in one conversation. Charge accordingly. Group programs work if you're guiding, not grinding."

- Reflector: "Your ideal business model: community-centred. You're the mirror that reflects back what a group needs. Curation, facilitation, creating spaces where others thrive. Don't try to be the guru on the stage. Be the one who builds the room."

### 2. Update `src/components/ResultCard.tsx`

Replace the current sparse layout with rich, sectioned results:

**Section 1: Your Type**
- Type name, tagline, badge
- "What this means" - 1-2 paragraph explanation
- Freedom Strategy quote + expanded body

**Section 2: Your Strategy**
- Strategy name
- "How to use this in your business" - strategy explanation from content

**Section 3: Your Authority**
- Authority name
- "How you're designed to make decisions" - authority explanation from content

**Section 4: Your Profile**
- Profile number (e.g., "3/5")
- "How you show up in your business" - profile explanation from content

**Section 5: Your FRESH Alignment**
- Which pillars their type naturally supports
- Which pillar needs the most attention
- Practical recommendation tied to FRESH

**Section 6: Building Your Freedom Filled Business**
- Business model advice per type
- 3 practical tips

**Section 7: Your Defined Centers** (keep existing, but add brief meaning for each)
- Head defined: "You're a source of inspiration and mental pressure. Ideas come to you constantly."
- Ajna defined: "You have a fixed way of processing information. Trust your analytical style."
- Throat defined: "You have a consistent voice and way of expressing. Communication is your strength."
- G-Center defined: "You have a fixed sense of identity and direction. You know who you are."
- Heart defined: "You have consistent willpower. When you commit, you follow through."
- Solar Plexus defined: "You experience a full emotional wave. Your feelings are deep and reliable."
- Sacral defined: "You have consistent life force energy. You can sustain effort when it lights you up."
- Spleen defined: "You have a reliable intuitive sense. Trust your instincts in the moment."
- Root defined: "You have consistent drive and pressure to get things done. Deadlines fuel you."

**Section 8: CTA** (keep existing workshop CTA)

### 3. Design Notes
- Keep the warm white (#fbfaf8) background
- Use the forest green (#243531) for headings
- Use sage (#788e75) for section dividers or subtle accents
- Terracotta (#ad765b) for CTAs and highlights
- Each section should have a clean card layout with subtle borders
- Generous spacing between sections
- Mobile-first, single column, readable

### 4. Files to modify
- `src/lib/content.ts` — massively expand with all content above
- `src/components/ResultCard.tsx` — rebuild with all sections
- No other files need changing (calculation engine, quiz, APIs all stay the same)
