'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { ChartData } from '@/app/api/calculate/route';
import { saveChartData } from '@/lib/chart-storage';

interface GeoResult {
  displayName: string;
  lat: number;
  lon: number;
  timezone: string;
  utcOffsetMinutes: number;
}

const BUSINESS_STAGES = [
  'Just starting out',
  '0-3k/month',
  '3-10k/month',
  '10-50k/month',
  '50k+/month',
];

const CHALLENGES = [
  'Finding clients',
  'Pricing my work',
  'Managing my time',
  'Scaling beyond myself',
  'Staying consistent',
];

export default function QuizForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 5;

  // Form state
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [unknownTime, setUnknownTime] = useState(false);
  const [birthPlace, setBirthPlace] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<GeoResult | null>(null);
  const [geoResults, setGeoResults] = useState<GeoResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setEmail] = useState('');
  const [businessStage, setBusinessStage] = useState('');
  const [biggestChallenge, setBiggestChallenge] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const geocodeAbortRef = useRef<AbortController | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Geocode search with debounce
  useEffect(() => {
    if (birthPlace.length < 2) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      geocodeAbortRef.current?.abort();
      setGeoResults([]);
      setShowDropdown(false);
      return;
    }
    if (selectedPlace && selectedPlace.displayName === birthPlace) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      geocodeAbortRef.current?.abort();
      const controller = new AbortController();
      geocodeAbortRef.current = controller;

      try {
        const res = await fetch('/api/geocode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: birthPlace }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setGeoResults(data.results);
          setShowDropdown(true);
        } else {
          setGeoResults([]);
          setShowDropdown(false);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        // ignore geocode errors
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      geocodeAbortRef.current?.abort();
    };
  }, [birthPlace, selectedPlace]);

  function handlePlaceSelect(place: GeoResult) {
    setSelectedPlace(place);
    setBirthPlace(place.displayName);
    setShowDropdown(false);
  }

  function validateStep(): boolean {
    setError('');
    if (step === 1 && !birthDate) {
      setError('Please enter your birth date.');
      return false;
    }
    if (step === 3 && !selectedPlace) {
      setError('Please select a location from the suggestions.');
      return false;
    }
    if (step === 4 && !email) {
      setError('Please enter your email address.');
      return false;
    }
    if (step === 5 && (!businessStage || !biggestChallenge)) {
      setError('Please answer both questions.');
      return false;
    }
    return true;
  }

  function handleNext() {
    if (!validateStep()) return;
    if (step < TOTAL_STEPS) setStep(step + 1);
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
    setError('');
  }

  async function handleSubmit() {
    if (!validateStep()) return;
    setIsLoading(true);
    setError('');

    try {
      const payload = {
        birthDate,
        birthTime: unknownTime ? '' : birthTime,
        birthPlace: selectedPlace?.displayName ?? birthPlace,
        email,
        businessStage,
        biggestChallenge,
        lat: selectedPlace?.lat,
        lon: selectedPlace?.lon,
        timezone: selectedPlace?.timezone,
        utcOffsetMinutes: selectedPlace?.utcOffsetMinutes ?? 0,
      };

      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error((errData as { error?: string }).error ?? 'Calculation failed');
      }

      const chartData: ChartData = await res.json();

      // Persist chart data in session storage so it never travels in the URL.
      saveChartData(chartData);

      const typeSlug = chartData.type
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/\//g, '-');

      router.push(`/results/${typeSlug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  }

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-brand-dark/60 mb-2">
          <span>Step {step} of {TOTAL_STEPS}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-brand-parchment rounded-full h-2">
          <div
            className="bg-brand-dark h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-parchment">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold text-brand-dark mb-2">When were you born?</h2>
            <p className="text-brand-dark/60 mb-6">Your birth date shapes your Human Design chart.</p>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full border border-brand-parchment rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dark bg-brand-bg"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold text-brand-dark mb-2">What time were you born?</h2>
            <p className="text-brand-dark/60 mb-6">Even an approximate time helps. If unsure, check your birth certificate.</p>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              disabled={unknownTime}
              className="w-full border border-brand-parchment rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dark bg-brand-bg disabled:opacity-40"
            />
            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={unknownTime}
                onChange={(e) => setUnknownTime(e.target.checked)}
                className="w-5 h-5 accent-brand-dark"
              />
              <span className="text-brand-dark/70 text-sm">I don&apos;t know my exact birth time</span>
            </label>
            {unknownTime && (
              <p className="mt-3 text-sm text-brand-terracotta bg-brand-blush/20 rounded-lg px-4 py-2">
                We&apos;ll use noon as a default. Some chart details may vary.
              </p>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold text-brand-dark mb-2">Where were you born?</h2>
            <p className="text-brand-dark/60 mb-6">City, country or region is fine.</p>
            <div className="relative" ref={dropdownRef}>
              <input
                type="text"
                value={birthPlace}
                onChange={(e) => {
                  setBirthPlace(e.target.value);
                  setSelectedPlace(null);
                }}
                placeholder="e.g. London, UK"
                className="w-full border border-brand-parchment rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dark bg-brand-bg"
              />
              {showDropdown && geoResults.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-brand-parchment rounded-xl shadow-lg overflow-hidden">
                  {geoResults.map((place, i) => (
                    <li
                      key={i}
                      onClick={() => handlePlaceSelect(place)}
                      className="px-4 py-3 hover:bg-brand-parchment cursor-pointer text-sm text-brand-dark truncate"
                    >
                      {place.displayName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-semibold text-brand-dark mb-2">Where should we send your results?</h2>
            <p className="text-brand-dark/60 mb-6">Your chart is ready. Enter your email and we will send the read.</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-brand-parchment rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dark bg-brand-bg"
            />
            <p className="text-xs text-brand-dark/40 mt-3">No spam. Just your results and occasional wisdom from Tracy.</p>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-2xl font-semibold text-brand-dark mb-2">Tell us about your business</h2>
            <p className="text-brand-dark/60 mb-6">This lets Tracy tailor the read to where you actually are.</p>

            <div className="mb-6">
              <p className="text-sm font-medium text-brand-dark mb-3">Where are you right now?</p>
              <div className="space-y-2">
                {BUSINESS_STAGES.map((stage) => (
                  <label key={stage} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="stage"
                      value={stage}
                      checked={businessStage === stage}
                      onChange={() => setBusinessStage(stage)}
                      className="w-4 h-4 accent-brand-dark"
                    />
                    <span className="text-sm text-brand-dark group-hover:text-brand-dark">{stage}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-brand-dark mb-3">Your biggest challenge right now?</p>
              <div className="space-y-2">
                {CHALLENGES.map((challenge) => (
                  <label key={challenge} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="challenge"
                      value={challenge}
                      checked={biggestChallenge === challenge}
                      onChange={() => setBiggestChallenge(challenge)}
                      className="w-4 h-4 accent-brand-dark"
                    />
                    <span className="text-sm text-brand-dark group-hover:text-brand-dark">{challenge}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={handleBack}
              disabled={isLoading}
              className="flex-1 py-3 rounded-xl border border-brand-parchment text-brand-dark font-medium hover:bg-brand-parchment transition-colors disabled:opacity-40"
            >
              Back
            </button>
          )}
          {step < TOTAL_STEPS ? (
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-xl bg-brand-dark text-brand-bg font-medium hover:bg-brand-dark/90 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 py-3 rounded-xl bg-brand-dark text-brand-bg font-medium hover:bg-brand-dark/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Calculating your chart...
                </>
              ) : (
                'See my chart'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
