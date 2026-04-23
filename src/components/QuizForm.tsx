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
      <div className="qf-progress">
        <div className="qf-progress__meta">
          <span>Step {step} of {TOTAL_STEPS}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="qf-progress__bar">
          <div className="qf-progress__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="qf-card">
        {step === 1 && (
          <div>
            <h2 className="qf-step__h">When were you <em>born</em>?</h2>
            <p className="qf-step__sub">Your birth date shapes your Human Design chart.</p>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="qf-input"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="qf-step__h">What <em>time</em> were you born?</h2>
            <p className="qf-step__sub">Even an approximate time helps. If unsure, check your birth certificate.</p>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              disabled={unknownTime}
              className="qf-input"
            />
            <label className="qf-checkline">
              <input
                type="checkbox"
                checked={unknownTime}
                onChange={(e) => setUnknownTime(e.target.checked)}
              />
              <span>I don&apos;t know my exact birth time</span>
            </label>
            {unknownTime && (
              <p className="qf-note">We&apos;ll use noon as a default. Some chart details may vary.</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="qf-step__h">Where were you <em>born</em>?</h2>
            <p className="qf-step__sub">City, country or region is fine.</p>
            <div className="relative" ref={dropdownRef}>
              <input
                type="text"
                value={birthPlace}
                onChange={(e) => {
                  setBirthPlace(e.target.value);
                  setSelectedPlace(null);
                }}
                placeholder="e.g. London, UK"
                className="qf-input"
              />
              {showDropdown && geoResults.length > 0 && (
                <ul className="qf-geo-dropdown">
                  {geoResults.map((place, i) => (
                    <li
                      key={i}
                      onClick={() => handlePlaceSelect(place)}
                      className="qf-geo-item"
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
            <h2 className="qf-step__h">Where should we send your <em>chart</em>?</h2>
            <p className="qf-step__sub">Enter your email and we will send the read once the chart is calculated.</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="qf-input"
            />
            <p className="qf-step__sub" style={{ marginTop: 14, marginBottom: 0, fontSize: 13 }}>
              No spam. Just your results and occasional wisdom from Tracy.
            </p>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="qf-step__h">Tell us about your <em>business</em></h2>
            <p className="qf-step__sub">This lets Tracy tailor the read to where you actually are.</p>

            <p className="qf-radio-label">Where are you right now?</p>
            <div className="qf-radio-group">
              {BUSINESS_STAGES.map((stage) => (
                <label
                  key={stage}
                  className={`qf-radio-row${businessStage === stage ? ' qf-radio-row--selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="stage"
                    value={stage}
                    checked={businessStage === stage}
                    onChange={() => setBusinessStage(stage)}
                  />
                  <span>{stage}</span>
                </label>
              ))}
            </div>

            <p className="qf-radio-label">Your biggest challenge right now?</p>
            <div className="qf-radio-group">
              {CHALLENGES.map((challenge) => (
                <label
                  key={challenge}
                  className={`qf-radio-row${biggestChallenge === challenge ? ' qf-radio-row--selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="challenge"
                    value={challenge}
                    checked={biggestChallenge === challenge}
                    onChange={() => setBiggestChallenge(challenge)}
                  />
                  <span>{challenge}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {error && <p className="qf-error">{error}</p>}

        <div className="qf-actions">
          {step > 1 && (
            <button onClick={handleBack} disabled={isLoading} className="qf-btn qf-btn--ghost">
              Back
            </button>
          )}
          {step < TOTAL_STEPS ? (
            <button onClick={handleNext} className="qf-btn qf-btn--primary">
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="qf-btn qf-btn--primary"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Calculating your chart
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
