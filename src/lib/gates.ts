// Gate-degree mapping for Human Design
// Each gate occupies 5.625 degrees (360/64) of the ecliptic
// All values in decimal degrees (0-360)

export interface GateRange {
  gate: number;
  start: number;
  end: number;
  wraps?: boolean; // true if gate spans 0 degrees (wraparound)
}

export const GATE_RANGES: GateRange[] = [
  // Gate 25 wraps around 0 degrees
  { gate: 25, start: 358.25, end: 3.875, wraps: true },
  { gate: 17, start: 3.875, end: 9.5 },
  { gate: 21, start: 9.5, end: 15.125 },
  { gate: 51, start: 15.125, end: 20.75 },
  { gate: 42, start: 20.75, end: 26.375 },
  { gate: 3, start: 26.375, end: 32.0 },
  { gate: 27, start: 32.0, end: 37.625 },
  { gate: 24, start: 37.625, end: 43.25 },
  { gate: 2, start: 43.25, end: 48.875 },
  { gate: 23, start: 48.875, end: 54.5 },
  { gate: 8, start: 54.5, end: 60.125 },
  { gate: 20, start: 60.125, end: 65.75 },
  { gate: 16, start: 65.75, end: 71.375 },
  { gate: 35, start: 71.375, end: 77.0 },
  { gate: 45, start: 77.0, end: 82.625 },
  { gate: 12, start: 82.625, end: 88.25 },
  { gate: 15, start: 88.25, end: 93.875 },
  { gate: 52, start: 93.875, end: 99.5 },
  { gate: 39, start: 99.5, end: 105.125 },
  { gate: 53, start: 105.125, end: 110.75 },
  { gate: 62, start: 110.75, end: 116.375 },
  { gate: 56, start: 116.375, end: 122.0 },
  { gate: 31, start: 122.0, end: 127.625 },
  { gate: 33, start: 127.625, end: 133.25 },
  { gate: 7, start: 133.25, end: 138.875 },
  { gate: 4, start: 138.875, end: 144.5 },
  { gate: 29, start: 144.5, end: 150.125 },
  { gate: 59, start: 150.125, end: 155.75 },
  { gate: 40, start: 155.75, end: 161.375 },
  { gate: 64, start: 161.375, end: 167.0 },
  { gate: 47, start: 167.0, end: 172.625 },
  { gate: 6, start: 172.625, end: 178.25 },
  { gate: 46, start: 178.25, end: 183.875 },
  { gate: 18, start: 183.875, end: 189.5 },
  { gate: 48, start: 189.5, end: 195.125 },
  { gate: 57, start: 195.125, end: 200.75 },
  { gate: 32, start: 200.75, end: 206.375 },
  { gate: 50, start: 206.375, end: 212.0 },
  { gate: 28, start: 212.0, end: 217.625 },
  { gate: 44, start: 217.625, end: 223.25 },
  { gate: 1, start: 223.25, end: 228.875 },
  { gate: 43, start: 228.875, end: 234.5 },
  { gate: 14, start: 234.5, end: 240.125 },
  { gate: 34, start: 240.125, end: 245.75 },
  { gate: 9, start: 245.75, end: 251.375 },
  { gate: 5, start: 251.375, end: 257.0 },
  { gate: 26, start: 257.0, end: 262.625 },
  { gate: 11, start: 262.625, end: 268.25 },
  { gate: 10, start: 268.25, end: 273.875 },
  { gate: 58, start: 273.875, end: 279.5 },
  { gate: 38, start: 279.5, end: 285.125 },
  { gate: 54, start: 285.125, end: 290.75 },
  { gate: 61, start: 290.75, end: 296.375 },
  { gate: 60, start: 296.375, end: 302.0 },
  { gate: 41, start: 302.0, end: 307.625 },
  { gate: 19, start: 307.625, end: 313.25 },
  { gate: 13, start: 313.25, end: 318.875 },
  { gate: 49, start: 318.875, end: 324.5 },
  { gate: 30, start: 324.5, end: 330.125 },
  { gate: 55, start: 330.125, end: 335.75 },
  { gate: 37, start: 335.75, end: 341.375 },
  { gate: 63, start: 341.375, end: 347.0 },
  { gate: 22, start: 347.0, end: 352.625 },
  { gate: 36, start: 352.625, end: 358.25 },
];

export interface GatePosition {
  gate: number;
  line: number;
}

/**
 * Convert ecliptic longitude (0-360) to Human Design gate and line
 */
export function longitudeToGate(longitude: number): GatePosition {
  // Normalize to 0-360
  const lon = ((longitude % 360) + 360) % 360;

  for (const range of GATE_RANGES) {
    let inRange = false;

    if (range.wraps) {
      // Gate 25: spans 358.25 to 363.875, i.e., 358.25+ or 0 to 3.875
      inRange = lon >= range.start || lon < range.end;
    } else {
      inRange = lon >= range.start && lon < range.end;
    }

    if (inRange) {
      // Calculate which line (1-6) within the gate
      // Each gate has 6 lines, each line is 5.625/6 = 0.9375 degrees
      let offset: number;
      if (range.wraps && lon >= range.start) {
        offset = lon - range.start;
      } else if (range.wraps && lon < range.end) {
        offset = (lon + 360) - range.start;
      } else {
        offset = lon - range.start;
      }

      const lineWidth = 5.625 / 6; // 0.9375 degrees per line
      const line = Math.min(6, Math.ceil((offset + 0.0001) / lineWidth));
      return { gate: range.gate, line: Math.max(1, line) };
    }
  }

  // Fallback (should not happen with normalized input)
  return { gate: 25, line: 1 };
}
