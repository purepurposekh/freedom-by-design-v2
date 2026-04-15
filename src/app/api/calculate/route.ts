export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { getPlanetaryPositions, findDesignDate } from '@/lib/ephemeris';
import { longitudeToGate } from '@/lib/gates';
import { getActiveChannels, getDefinedCenters } from '@/lib/channels';
import { determineType, determineAuthority, getStrategy } from '@/lib/types';

const NOT_SELF_THEMES: Record<string, string> = {
  Manifestor: 'Anger',
  Generator: 'Frustration',
  'Manifesting Generator': 'Frustration and Anger',
  Projector: 'Bitterness',
  Reflector: 'Disappointment',
};

const SIGNATURES: Record<string, string> = {
  Manifestor: 'Peace',
  Generator: 'Satisfaction',
  'Manifesting Generator': 'Satisfaction and Peace',
  Projector: 'Success',
  Reflector: 'Delight',
};

export interface ChartData {
  type: string;
  authority: string;
  strategy: string;
  profile: string;
  personalityGates: Record<string, { gate: number; line: number }>;
  designGates: Record<string, { gate: number; line: number }>;
  definedCenters: string[];
  activeChannels: Array<{ gate1: number; gate2: number; center1: string; center2: string }>;
  birthDate: string;
  birthPlace: string;
  email: string;
  businessStage: string;
  biggestChallenge: string;
  notSelfTheme: string;
  signature: string;
}

interface CalculateRequestBody {
  birthDate: string;
  birthTime?: string;
  birthPlace: string;
  email: string;
  businessStage: string;
  biggestChallenge: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  utcOffsetMinutes?: number;
}

const PLANET_KEYS = [
  'sun', 'earth', 'moon', 'mercury', 'venus', 'mars',
  'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
  'northNode', 'southNode',
] as const;

type PlanetKey = typeof PLANET_KEYS[number];

export async function POST(request: NextRequest) {
  try {
    const body: CalculateRequestBody = await request.json();
    const {
      birthDate,
      birthTime,
      birthPlace,
      email,
      businessStage,
      biggestChallenge,
      utcOffsetMinutes = 0,
    } = body;

    // Determine birth time (use noon if unknown)
    const timeStr = birthTime && birthTime.trim() ? birthTime : '12:00';

    // Parse the birth datetime
    // Build ISO string from date + time + UTC offset
    const [datePart] = birthDate.split('T');
    const offsetHours = Math.floor(Math.abs(utcOffsetMinutes) / 60);
    const offsetMins = Math.abs(utcOffsetMinutes) % 60;
    const offsetSign = utcOffsetMinutes >= 0 ? '+' : '-';
    const offsetStr = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;

    const isoString = `${datePart}T${timeStr}:00${offsetStr}`;
    const birthDateTime = new Date(isoString);

    if (isNaN(birthDateTime.getTime())) {
      return NextResponse.json({ error: 'Invalid birth date or time' }, { status: 400 });
    }

    // Calculate personality positions (at birth)
    const personalityPositions = getPlanetaryPositions(birthDateTime);

    // Find design date (Sun 88 degrees earlier)
    const designDate = findDesignDate(birthDateTime, personalityPositions.sun);

    // Calculate design positions
    const designPositions = getPlanetaryPositions(designDate);

    // Map positions to gates
    const personalityGates: Record<string, { gate: number; line: number }> = {};
    const designGates: Record<string, { gate: number; line: number }> = {};

    for (const key of PLANET_KEYS) {
      const pLon = personalityPositions[key as PlanetKey];
      const dLon = designPositions[key as PlanetKey];
      personalityGates[key] = longitudeToGate(pLon);
      designGates[key] = longitudeToGate(dLon);
    }

    // Collect all active gates
    const allActiveGates = new Set<number>();
    for (const key of PLANET_KEYS) {
      allActiveGates.add(personalityGates[key].gate);
      allActiveGates.add(designGates[key].gate);
    }

    // Find active channels
    const activeChannels = getActiveChannels(allActiveGates);

    // Get defined centers
    const definedCenters = getDefinedCenters(activeChannels);

    // Determine type, authority, strategy
    const hdType = determineType(definedCenters, activeChannels);
    const authority = determineAuthority(definedCenters, activeChannels);
    const strategy = getStrategy(hdType);

    // Calculate profile: Personality Sun line / Design Sun line
    const personalitySunLine = personalityGates['sun'].line;
    const designSunLine = designGates['sun'].line;
    const profile = `${personalitySunLine}/${designSunLine}`;

    const chartData: ChartData = {
      type: hdType,
      authority,
      strategy,
      profile,
      personalityGates,
      designGates,
      definedCenters: Array.from(definedCenters),
      activeChannels: activeChannels.map((ch) => ({
        gate1: ch.gate1,
        gate2: ch.gate2,
        center1: ch.center1,
        center2: ch.center2,
      })),
      birthDate: birthDateTime.toISOString(),
      birthPlace,
      email,
      businessStage,
      biggestChallenge,
      notSelfTheme: NOT_SELF_THEMES[hdType] ?? '',
      signature: SIGNATURES[hdType] ?? '',
    };

    return NextResponse.json(chartData);
  } catch (error) {
    console.error('Calculate error:', error);
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 });
  }
}
