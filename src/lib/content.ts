// Tracy's Freedom by Design content for Human Design assessment results
// No em dashes anywhere in this file

import type { HDType, Authority } from './types';

// ─── Type Content ────────────────────────────────────────────────────────────

export interface TypeContent {
  strategy: string;
  body: string;
  color: string;
  tagline: string;
  expandedBody: string;
}

export const TYPE_CONTENT: Record<HDType, TypeContent> = {
  Manifestor: {
    color: 'brand-teal',
    tagline: 'The Fire Starter',
    strategy: 'Initiate, then let go.',
    body: "You're built to start things, not sustain them. Your power is in the spark. The Freedom Filled way? Build a business where you light the fire and your team keeps it burning. Stop trying to do the follow-through yourself.",
    expandedBody:
      "You are literally built to initiate. Not to ask permission, not to wait for consensus, and definitely not to operate inside someone else's system. The Manifestor's gift is the ability to get something moving from pure will. In business, this looks like being the woman who sees the gap, names it, and acts before everyone else has finished their second cup of coffee.\n\nThe catch? Manifestors carry an aura that can feel intense or closed to others. When you disappear into creation mode and emerge with a new offer, a rebrand, or a complete pivot, the people around you feel left out. That's not their weakness. That's your design. Your strategy to inform exists precisely because your initiation energy can disrupt without you meaning it to.\n\nThe women who build the most freedom in their business as Manifestors are the ones who have learned to travel light. They're not in every Slack thread. They're not doing the client onboarding. They've built structures that can hold their ideas without requiring them to hold everything together personally. That's your model: spark it, hand it off, go start the next thing.",
  },
  Generator: {
    color: 'brand-terracotta',
    tagline: 'The Life Force',
    strategy: 'Follow the fire in your belly.',
    body: "You have more sustained energy than anyone in the room, but only when you're doing work that genuinely lights you up. If your business feels like a grind, it's not because you're lazy. It's because you're building something your body is saying no to.",
    expandedBody:
      "You are the backbone of the workforce, the person with seemingly limitless energy, the one who can go deep and stay there. Generators make up the largest group in Human Design for good reason. The world is built on sustained effort, and you are designed for it. The question is never whether you have the energy. The question is always: what are you using it on?\n\nWhen a Generator is lit up by their work, they are unstoppable. They refine, they improve, they master. The business model that works for you isn't about doing a thousand things. It's about finding the one thing (or the small cluster of things) that genuinely satisfies your Sacral, and going all in. Your audience senses your energy. When you love what you're doing, they feel it. When you're going through the motions, they feel that too.\n\nThe biggest trap for Generators is building from their head instead of their gut. You see a gap in the market, you think it makes logical sense, so you build the thing. But your body never said yes. That's the business that feels like dragging yourself through mud every morning. Your Sacral response, that gut-level yes or no, is your compass. Learning to trust it over your very capable brain is the whole game.",
  },
  'Manifesting Generator': {
    color: 'brand-sage',
    tagline: 'The Multi-Passionate Powerhouse',
    strategy: 'Build one vehicle for all your passions.',
    body: "You want to do everything, and honestly? You can. But not all at once, and not from scratch every time. Your Freedom Filled business is one core offer that lets you express your many passions without burning it all down to start again.",
    expandedBody:
      "You move fast, you skip steps that feel irrelevant, and you genuinely cannot understand why everyone else is still stuck on phase two. Manifesting Generators have both the Generator's sustained energy and the Manifestor's ability to initiate. You are designed for speed and variety. The multi-passionate business coach? Usually a Manifesting Generator. The woman with six income streams who somehow makes it all work? Same.\n\nHere's what nobody tells you: your pivots are not a character flaw. When something stops lighting you up, your body is telling you something real. The problem isn't the pivot itself. It's doing it without a container. If you rebuild your entire business from scratch every time your enthusiasm shifts, you'll wear yourself and your audience out. The solution is to build a container spacious enough to hold all your expressions, one brand or business identity that can flex without breaking.\n\nYour secret weapon is your speed. You can see how things connect before anyone else does. You can move from idea to launch in a time frame that baffles your peers. But speed without strategy leaves a trail of half-finished projects. Check in with your Sacral before you start. If the yes is genuine, move fast. If it's enthusiasm that belongs to someone else's energy in the room, wait.",
  },
  Projector: {
    color: 'brand-dark',
    tagline: 'The Natural Guide',
    strategy: 'Lead with wisdom, not hours.',
    body: "You're not built for hustle culture, and that's your superpower. Your business grows when people come to YOU for your insight, not when you chase them. The most freedom-filled move? Charge for your brain, not your time.",
    expandedBody:
      "You are not designed to sustain the same level of output as a Generator or Manifesting Generator, and the sooner you stop measuring yourself against that standard, the faster your business grows. Projectors are built to see and guide. You can observe a person for five minutes and understand their blocks better than they've understood them in five years. That insight is your product. It is worth far more than you're probably charging for it.\n\nThe Projector's business thrives on recognition. This is not about ego. It is about the way your aura works. When someone genuinely sees you and invites your guidance, your energy is amplified. When you're pushing your services at people who haven't asked, you're working against your own design and it shows. The business model that frees you is one where your wisdom is visible, where the right people find you, and where you're paid well to guide rather than grind.\n\nEnergy management is not a luxury for Projectors. It's the core strategy. The women who build thriving businesses as Projectors are intentional about rest, they say no to clients who don't value their insight, and they have created offerings that don't require them to be 'on' around the clock. A two-hour strategy session followed by genuine rest is more sustainable and more profitable than twelve hours of mediocre output. That's not laziness. That's your design working correctly.",
  },
  Reflector: {
    color: 'brand-blush',
    tagline: 'The Mirror',
    strategy: 'Trust the cycle, not the clock.',
    body: "You feel everything around you, which makes you the ultimate people-reader. But it also means you need space to process. Your Freedom Filled business runs on lunar rhythm, not quarterly pressure. Give yourself 28 days for every big decision.",
    expandedBody:
      "You are the rarest type in Human Design, making up roughly one percent of the population, and your experience of the world is genuinely different from everyone else's. You have no consistently defined centers, which means you are open to and sampling the energy of everyone around you. You literally feel what's happening in a room before anyone else names it. That is an extraordinary gift for a business built around community, curation, or facilitation.\n\nThe challenge is knowing which of those feelings are yours. When you're around high-energy people, you feel high energy. When you're around doubt, you feel doubt. Without grounding practices and space to return to yourself, it becomes very difficult to make decisions that are truly yours. This is why the lunar cycle matters so much. You need enough time to move through different environments and different emotional states before you can trust that a decision reflects you and not the last person you had coffee with.\n\nYour business will not look conventional, and it shouldn't. You're not here to out-hustle a Generator or out-initiate a Manifestor. You're here to create spaces where others can see themselves clearly. The communities you build, the gatherings you facilitate, the environments you curate, these are your business model. When you're in a healthy space and surrounded by the right people, you become a mirror for the collective. And that is irreplaceable.",
  },
};

export function getTypeContent(type: HDType): TypeContent {
  return TYPE_CONTENT[type];
}

// ─── Strategy Content ─────────────────────────────────────────────────────────

export interface StrategyContent {
  name: string;
  explanation: string;
}

export const STRATEGY_CONTENT: Record<string, StrategyContent> = {
  'To Inform': {
    name: 'To Inform',
    explanation:
      "Before you launch that new offer, rebrand your business, or pivot your niche, tell people. Not ask permission. Inform. Your team, your audience, your partner. The women who struggle most as Manifestors are the ones who disappear, rebuild everything behind closed doors, and then wonder why nobody followed them to the new thing. Informing is not a courtesy. It is the mechanism that removes resistance from your path. The more people know what you're doing and why, the less they push back, and the smoother your initiation lands.",
  },
  'To Respond': {
    name: 'To Respond',
    explanation:
      "Stop creating offers nobody asked for. Your business grows when you pay attention to what your audience is already telling you they need. That DM asking about meal planning? That comment saying 'I wish someone would just show me how'? Those are your signals. Respond to them. This doesn't mean you're reactive or passive. It means you're building from real demand instead of invented demand. Your Sacral response is your business intelligence. The more you learn to read it, the less you waste on things that won't land.",
  },
  'Wait for the Invitation': {
    name: 'Wait for the Invitation',
    explanation:
      "This does not mean sit on the couch and wait for clients to fall from the sky. It means stop cold-DMing strangers. Stop pitching before people are ready. Instead, put your brilliance where it can be seen. Write the post, record the podcast, share the insight. The right people will come to you and say 'I need that.' That is your invitation. When you work with invited clients, your guidance lands differently. When you push your way in, even if the person says yes, the energy is off and you both feel it.",
  },
  'Wait a Lunar Cycle': {
    name: 'Wait a Lunar Cycle',
    explanation:
      "You have a 28-day inner rhythm. Big decisions, like launching a program, hiring someone, or changing your niche, need a full cycle to settle. If it still feels right after 28 days, it's right. This is your protection against absorbing someone else's excitement and building their dream instead of yours. The women around you will move faster. That's fine. Your timing is different, and when you honour it, your decisions have a quality of clarity and alignment that others often can't explain but can definitely feel.",
  },
};

// ─── Authority Content ────────────────────────────────────────────────────────

export interface AuthorityContent {
  name: string;
  explanation: string;
}

export const AUTHORITY_CONTENT: Record<Authority, AuthorityContent> = {
  Emotional: {
    name: 'Emotional (Solar Plexus)',
    explanation:
      "You're designed to sleep on it. That 'amazing opportunity' that feels urgent right now? Wait. Your emotions move in waves. The decision that feels perfect at the crest might feel terrible in the trough. Give yourself at least one night. If it still feels aligned when the wave has passed, move forward. The women who honour their emotional authority stop making expensive yes decisions out of excitement and expensive no decisions out of low moments. Your clarity comes over time, not in the moment.",
  },
  Sacral: {
    name: 'Sacral',
    explanation:
      "Your gut knows. Literally. When someone asks 'do you want to do this?' and your body goes 'uh huh' or 'mm mm,' trust that. The Sacral response is physical, not logical. Stop overthinking your yes. If your body lights up, say yes. If it goes flat, it's a no, even if your brain says it makes sense. The most powerful business moves you'll make will be the ones where you had no logical reason to say yes but your body was already moving toward it.",
  },
  Splenic: {
    name: 'Splenic',
    explanation:
      "You get a hit in the moment. A quiet knowing. The tricky part? It only speaks once. It won't repeat itself. When your intuition says 'this isn't right' in the middle of a sales call, don't override it because the numbers look good. Your Spleen is protecting you. It's the oldest intelligence in the body, and it communicates fast and quietly. Your job is to stay present enough to hear it and brave enough to act on it even when it's inconvenient.",
  },
  'Ego Manifested': {
    name: 'Ego Manifested',
    explanation:
      "Your heart makes the call. Not your head, not your gut. When you feel that pull in your chest that says 'I WILL do this,' trust it. You're one of the few people designed to make willpower-based promises and actually follow through. But only when the commitment comes from your heart, not from guilt or obligation. When you commit from a genuine 'I want this,' you have extraordinary follow-through. When you commit from 'I should,' you burn out and resent the whole thing.",
  },
  'Ego Projected': {
    name: 'Ego Projected',
    explanation:
      "Same heart-based knowing as Ego Manifested, but you need to talk it through with someone first. Not for their approval. For clarity. Hearing yourself say it out loud helps you know if the commitment is real or if you're performing confidence. Find a sounding board you trust, someone who will listen without steering. The decision is still yours. You just need to hear your own voice articulate it before you know whether the heart-pull is genuine.",
  },
  'Self-Projected': {
    name: 'Self-Projected',
    explanation:
      "Talk it out. Find someone who will just listen while you process. You need to hear your own voice say the thing before you know if it's true for you. Journaling works. Voice memos work. Anything that gets the decision out of your head and into sound. You're not asking for advice. You're using another person as a witness to your own clarity. The moment you hear yourself say 'I think I'm going to do this' and it lands in your body, that's your answer.",
  },
  Mental: {
    name: 'Mental / Environment',
    explanation:
      "You're not designed to make decisions from logic OR emotion alone. You need the right environment and the right sounding boards. Change your physical space when you're stuck. Have the conversation in a different room. Walk outside. Your clarity comes from your surroundings, not your internal processing. Different environments will pull different answers from you. The decision that feels impossible at your desk might become obvious on a walk. That's your design, not indecision.",
  },
  Lunar: {
    name: 'Lunar',
    explanation:
      "28 days. Full stop. Talk to different people throughout the month. Notice how the decision feels in week one versus week three. You're sampling the entire emotional spectrum before you're ready to choose. This is not a limitation. It is a gift. You see all sides of a situation in a way that faster-moving people simply cannot. The decisions you make after a full cycle are layered with a kind of wisdom that others take years to develop, if they ever do.",
  },
};

// ─── Profile Content ──────────────────────────────────────────────────────────

export interface ProfileContent {
  name: string;
  explanation: string;
}

export const PROFILE_CONTENT: Record<string, ProfileContent> = {
  '1/3': {
    name: '1/3 The Researcher',
    explanation:
      "You need to feel solid in your knowledge before you teach it, and you'll learn most of what you know through trial and error. Your audience trusts you because you've actually done the thing, not just studied it. Don't rush to teach before you've tested. Your credibility lives in your lived experience.",
  },
  '1/4': {
    name: '1/4 The Researcher with a Network',
    explanation:
      "You go deep into your subject and then share what you find with your inner circle. Your business grows through relationships, not algorithms. The people who know you personally become your best ambassadors, and your depth of knowledge gives them something worth talking about. Build your foundation and then let your network carry you.",
  },
  '2/4': {
    name: '2/4 The Natural with Connections',
    explanation:
      "People see gifts in you that you can't always see in yourself. Your best business moves happen when someone in your network says 'you should really teach that thing you do.' Listen to them. You need alone time to develop your gifts, and your network to get them into the world. Both matter equally.",
  },
  '2/5': {
    name: '2/5 The Natural Problem Solver',
    explanation:
      "People expect you to save them. You can, sometimes. But you need space to recharge, and you need to be selective about who you help. Not every client is your client. You carry a reputation that precedes you, which means managing expectations matters more than it does for most types. Be deliberate about what you're known for.",
  },
  '3/5': {
    name: '3/5 The Experiential Problem Solver',
    explanation:
      "You've tried everything, and that experience is your authority. Your audience sees you as someone who can fix their problems because you've already navigated those exact challenges. Your pivots and experiments are not failures. They are the curriculum. Lean into the 'I've been where you are' angle in your marketing.",
  },
  '3/6': {
    name: '3/6 The Experimenter Becoming the Role Model',
    explanation:
      "Your early business years were chaotic, full of pivots, and maybe some spectacular failures. After your Saturn Return (roughly around 30), something shifts. You become the woman others look at and say 'I want what she has.' You're earning your authority through lived experience. Each experiment, even the messy ones, is building your story.",
  },
  '4/6': {
    name: '4/6 The Networker Becoming the Role Model',
    explanation:
      "Your business is built on who you know and the trust you've earned over time. You're moving toward a phase of life where your lived experience becomes your greatest selling point. Relationships are your distribution channel. Invest in them consistently, and the business builds itself through genuine connection and reputation.",
  },
  '4/1': {
    name: '4/1 The Networker with Deep Foundations',
    explanation:
      "You need to know your stuff inside and out before you share it. Your business grows through genuine relationships, referrals, and community, not through going viral. The security you feel in your knowledge is directly proportional to how confidently you show up in your network. Do the research, then do the relationship-building.",
  },
  '5/1': {
    name: '5/1 The Problem Solver with Depth',
    explanation:
      "People project their expectations onto you. They want you to have the answer. And because you research everything thoroughly, you usually do. Your challenge is managing those projections so you don't burn out trying to be everyone's solution. Boundaries and clear positioning protect your energy and your reputation at the same time.",
  },
  '5/2': {
    name: '5/2 The Natural Problem Solver',
    explanation:
      "You attract people who need you to fix things, and you often have an innate ability to do exactly that. But you also need significant alone time to stay resourced. Build a business model that doesn't require you to be 'on' around the clock. Your best work comes from a place of rest, not depletion.",
  },
  '6/2': {
    name: '6/2 The Role Model with Natural Gifts',
    explanation:
      "You've lived through phases: experimentation in your twenties, a period of observation and integration, and then stepping into true leadership. Wherever you are in that arc, honour it. Your natural gifts are real and they're recognised by others even when you don't fully see them yet. The role model phase is coming, or it's already here.",
  },
  '6/3': {
    name: '6/3 The Role Model Who Learned Through Experience',
    explanation:
      "Your wisdom comes from having actually done it wrong and figured out what works. That authenticity is magnetic. You're not selling theory. You're sharing what you've genuinely lived through. The trial-and-error nature of your 3rd line makes your eventual authority feel earned in a way that resonates deeply with the people you're here to serve.",
  },
};

// ─── FRESH Alignment Content ───────────────────────────────────────────────────

export interface FreshContent {
  body: string;
}

export const FRESH_CONTENT: Record<HDType, FreshContent> = {
  Generator: {
    body: "Your design shows up most naturally in the Hustle pillar. You have the energy to build, and when the work lights you up, it barely feels like work. The pillar that often gets neglected is Environment. Generators can grind in the wrong setting, with the wrong clients, for years without noticing. When your environment does not match your energy, frustration builds quietly.",
  },
  Manifestor: {
    body: "Your design shows up most naturally in the Hustle pillar when initiating, but Manifestors tend to burn out in the follow-through. The Relationships pillar is where most Manifestors hit resistance. Going lone wolf, not informing your team or audience, creates friction that slows everything down. Informing is not asking permission. It is the thing that removes the resistance.",
  },
  'Manifesting Generator': {
    body: "Your design has strong Hustle energy when you are responding to the right things. The pillar that gets squeezed out is Self. With so many projects, passions, and pivots, Manifesting Generators often lose track of what they actually want. Getting clear on your core identity stops the cycle of starting things that are not really yours.",
  },
  Projector: {
    body: "Your design shows up most naturally in the Self pillar. You have deep self-awareness and the ability to see clearly. The pillar that most Projectors overlook is Fitness, but not in the gym sense. Energy management is everything for a non-sacral type. If you are trying to match the output of Generators around you, you will burn out. Rest is strategy for a Projector.",
  },
  Reflector: {
    body: "Your design shows up most naturally in the Relationships pillar. You read people and environments with extraordinary accuracy. The pillar that most needs attention is Environment, because you absorb the energy of every room you walk into. Your business, your team, your clients. If the energy around you is off, it will show up in how you feel and how you perform.",
  },
};

// ─── Business Building Content ────────────────────────────────────────────────

export interface BusinessContent {
  model: string;
  tips: string[];
}

export const BUSINESS_CONTENT: Record<HDType, BusinessContent> = {
  Manifestor: {
    model:
      "Your ideal business model: create the vision, hire the team, step back. You're the founder energy, not the operator energy. If you're doing customer service, responding to every DM, or managing the day-to-day, you've built the wrong structure. Your Freedom Filled business runs without you being in every conversation. Your job is the idea and the initiation. Someone else's job is the execution.",
    tips: [
      "Delegate before you're ready. Manifestors who wait until they're overwhelmed to hire help always wait too long.",
      "Document your vision clearly and often. The clearer you are about where you're going, the easier it is for others to follow without needing you to be there.",
      "Build inform rituals into your business. A weekly update to your audience or team removes 80 percent of the resistance that slows Manifestors down.",
    ],
  },
  Generator: {
    model:
      "Your ideal business model: mastery-based. One core offer you love delivering, refined over years. You're not meant to have twelve different programs running simultaneously. You're meant to have one incredible container that people rave about. Think depth, not breadth. The Generator who has refined their signature offer for three years is always more magnetic than the one who launches something new every quarter.",
    tips: [
      "Let your audience tell you what they need before you build it. The Sacral response is most reliable when it's responding to something real.",
      "Track what consistently lights you up in your work. Those patterns are your business intelligence.",
      "When the work starts feeling like a grind, don't push harder. Pause and ask whether your body is still in it. Sometimes the work needs to evolve, not just survive.",
    ],
  },
  'Manifesting Generator': {
    model:
      "Your ideal business model: one core container with multiple expressions. Think of Freedom Filled Business itself as a model, one umbrella that holds courses, coaching, community, and retreats. You get variety inside a single structure. That's the freedom equation for you. Not a new business every time your interests shift, but a flexible enough container that your multitudes all have a home.",
    tips: [
      "Before you start the next thing, check: is anyone actually asking for this? Your best moves come from responding to real demand, then moving fast.",
      "Build systems early. Your speed is a gift, but without structure, you'll keep rebuilding from scratch. Systems let you move fast without losing ground.",
      "Give yourself permission to go deep, not just wide. Your multi-passionate nature is your brand. You don't need to hide it.",
    ],
  },
  Projector: {
    model:
      "Your ideal business model: high-touch, premium pricing, fewer clients. You don't have the sustained energy for volume-based offers. What you have is the insight that can transform someone in one conversation. Charge accordingly. Group programs work beautifully for Projectors as long as you're guiding and facilitating rather than grinding through high-support delivery. Think leverage, not labour.",
    tips: [
      "Raise your prices. Seriously. Your value is in your insight, not your hours, and you are probably undercharging for it.",
      "Create a waitlist or application process. This naturally filters for clients who genuinely recognise your value, which is exactly the invitation energy your design needs.",
      "Schedule rest as a non-negotiable. Your best work comes from a regulated nervous system, not a depleted one.",
    ],
  },
  Reflector: {
    model:
      "Your ideal business model: community-centred. You're the mirror that reflects back what a group needs. Curation, facilitation, and creating spaces where others can thrive are your natural business architecture. Don't try to be the guru on the stage delivering all the content. Be the one who builds the room, chooses who's in it, and holds the container for transformation to happen.",
    tips: [
      "Choose your community and collaborators with extreme care. The energy of the people around you is the energy of your business.",
      "Offer your services on your own timeline. Monthly or seasonal containers suit you far better than perpetual high-availability coaching.",
      "Trust your 28-day process. When clients push you for fast decisions, explain your process clearly. The right clients will respect it.",
    ],
  },
};

// ─── Summary Generator ───────────────────────────────────────────────────────

export function generateSummary(type: HDType, _authority: string, _profile: string): string {
  const summaries: Record<HDType, string> = {
    Generator:
      "As a Generator, you have the most sustainable life force energy of any type, and when you're doing work that lights you up, you can go all day. In your business, this means building one core offer you genuinely love delivering, rather than spreading yourself thin across too many things.",
    Manifestor:
      "As a Manifestor, you're built to initiate, and you carry a spark that starts things other people only dream about. In your business, the key is to inform and delegate: you light the fire, and your team keeps it burning.",
    'Manifesting Generator':
      "As a Manifesting Generator, you're wired for speed, multiple passions, and a non-linear path that makes complete sense to you even when it baffles everyone else. In your business, the freedom comes from building one core vehicle that lets you express all those passions without starting from scratch every time.",
    Projector:
      "As a Projector, you see what others miss, including patterns, inefficiencies, and the deeper thing going on beneath the surface. In your business, your greatest leverage is charging for that insight rather than trading hours for dollars.",
    Reflector:
      "As a Reflector, you feel everything around you, making you the ultimate read on a room, a team, or a community. In your business, honouring your 28-day cycle and choosing your environment carefully is not optional, it's your foundation.",
  };
  return summaries[type] ?? `You are a ${type}.`;
}

// ─── Not-Self Theme Content ───────────────────────────────────────────────────

export interface NotSelfContent {
  notSelf: string;
  sign: string;
  environment: string;
  strongestSense: string;
}

export const NOT_SELF_CONTENT: Record<HDType, NotSelfContent> = {
  Manifestor: {
    notSelf: 'Anger',
    sign: 'Anger signals you are suppressing your initiating energy',
    environment: 'Build in spaces that are yours — where you can move and create without restriction',
    strongestSense: 'Smell / Outer Vision',
  },
  Generator: {
    notSelf: 'Frustration',
    sign: 'Frustration is the signal your body is saying no to what you are doing',
    environment: 'Surround yourself with things that light you up. Your environment should feel like a yes.',
    strongestSense: 'Taste / Internal',
  },
  'Manifesting Generator': {
    notSelf: 'Frustration and Anger',
    sign: 'When you feel both frustrated AND restless, your design is telling you to drop something and respond to what excites you',
    environment: 'Keep your environment dynamic. Stagnation is your enemy.',
    strongestSense: 'Taste / Smell',
  },
  Projector: {
    notSelf: 'Bitterness',
    sign: 'Bitterness arrives when you have been giving your wisdom where it was not invited. Stop pushing. Wait.',
    environment: 'Quiet, focused spaces where your insights can land. You do your best thinking without background noise.',
    strongestSense: 'Outer Vision / Touch',
  },
  Reflector: {
    notSelf: 'Disappointment',
    sign: 'Disappointment shows up when the people and places around you are not aligned with who you truly are',
    environment: 'Your environment is everything. You absorb the energy of every room. Choose yours carefully.',
    strongestSense: 'Outer Taste / Outer Touch',
  },
};

export const SIGNATURE_CONTENT: Record<HDType, string> = {
  Manifestor: 'Peace',
  Generator: 'Satisfaction',
  'Manifesting Generator': 'Satisfaction and Peace',
  Projector: 'Success',
  Reflector: 'Delight',
};

// ─── Center Meanings ──────────────────────────────────────────────────────────

export const CENTER_MEANINGS: Record<string, string> = {
  Head: 'You are a source of inspiration and mental pressure for others. Ideas and questions come to you consistently, and you have a reliable way of sparking thought in the people around you.',
  Ajna: 'You have a fixed way of processing and analysing information. Your mental style is consistent and dependable. Trust your analytical framework rather than second-guessing how you think.',
  Throat: 'You have a consistent voice and way of expressing yourself. Communication is a genuine strength. When you speak from your design, people listen and your words carry weight.',
  G: 'You have a fixed sense of identity and direction. You know who you are, even when life gets complicated. That grounded self-knowledge is a magnetic quality that draws the right people and opportunities to you.',
  Heart: 'You have consistent willpower. When you make a genuine commitment from your heart, you follow through. Your word is your bond, and that reliability is one of your most valuable business assets.',
  SolarPlexus: 'You experience a full and reliable emotional wave. Your feelings run deep and your emotional intelligence is genuine. Honouring your emotional process, not rushing through it, is how you access your clearest decisions.',
  Sacral: 'You have consistent life force energy. You can sustain significant effort when the work genuinely lights you up. This is one of the most powerful forces in Human Design when it is directed at something your body is truly in a yes for.',
  Spleen: 'You have a reliable intuitive sense and a consistent awareness of what is safe, healthy, and aligned. Trust your instincts in the moment. That quiet knowing is accurate more often than your logic will give it credit for.',
  Root: 'You have consistent drive and a healthy pressure to get things done. Deadlines fuel you rather than stress you. That adrenaline-channelling capacity is an asset in a business world that rewards momentum.',
};
