export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    city?: string;
    town?: string;
    country?: string;
  };
}

interface OpenMeteoResponse {
  timezone?: string;
  utc_offset_seconds?: number;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const q = typeof body?.q === 'string' ? body.q.trim() : '';

  if (!q) {
    return NextResponse.json({ error: 'Query parameter q is required' }, { status: 400 });
  }

  try {
    // Geocode using Nominatim
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1`;
    const nominatimResponse = await fetch(nominatimUrl, {
      headers: {
        'User-Agent': 'FreedomByDesign/1.0 (tracy-harris.co)',
      },
    });

    if (!nominatimResponse.ok) {
      return NextResponse.json({ error: 'Geocoding failed' }, { status: 500 });
    }

    const places: NominatimResult[] = await nominatimResponse.json();

    if (places.length === 0) {
      return NextResponse.json({ results: [] });
    }

    // For each place, get the timezone from open-meteo
    const results = await Promise.all(
      places.map(async (place) => {
        const lat = parseFloat(place.lat);
        const lon = parseFloat(place.lon);

        let timezone = 'UTC';
        let utcOffsetMinutes = Math.round(lon / 15) * 60; // fallback approximation

        try {
          const tzUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&forecast_days=0&hourly=temperature_2m`;
          const tzResponse = await fetch(tzUrl);
          if (tzResponse.ok) {
            const tzData: OpenMeteoResponse = await tzResponse.json();
            if (tzData.timezone) {
              timezone = tzData.timezone;
            }
            if (typeof tzData.utc_offset_seconds === 'number') {
              utcOffsetMinutes = Math.round(tzData.utc_offset_seconds / 60);
            }
          }
        } catch {
          // Use approximation fallback
        }

        return {
          displayName: place.display_name,
          lat,
          lon,
          timezone,
          utcOffsetMinutes,
        };
      })
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Geocode error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
