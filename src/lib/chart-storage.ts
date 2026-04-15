'use client';

import type { ChartData } from '@/app/api/calculate/route';

export const CHART_DATA_STORAGE_KEY = 'hd_chart_data';

export function saveChartData(chartData: ChartData) {
  sessionStorage.setItem(CHART_DATA_STORAGE_KEY, JSON.stringify(chartData));
}

export function loadChartData(): ChartData | null {
  const stored = sessionStorage.getItem(CHART_DATA_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as ChartData;
  } catch {
    sessionStorage.removeItem(CHART_DATA_STORAGE_KEY);
    return null;
  }
}

export function stripDataParamFromCurrentUrl() {
  if (typeof window === 'undefined') return;

  const current = new URL(window.location.href);
  if (!current.searchParams.has('data')) return;

  current.searchParams.delete('data');
  const next = `${current.pathname}${current.search ? current.search : ''}${current.hash}`;
  window.history.replaceState({}, '', next);
}
