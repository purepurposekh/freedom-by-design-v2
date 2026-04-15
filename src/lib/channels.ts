// Human Design gate-to-center mapping and channel definitions

export type Center =
  | 'Head'
  | 'Ajna'
  | 'Throat'
  | 'G'
  | 'Heart'
  | 'SolarPlexus'
  | 'Sacral'
  | 'Spleen'
  | 'Root';

// Which center each gate belongs to
export const GATE_TO_CENTER: Record<number, Center> = {
  // Head
  64: 'Head',
  61: 'Head',
  63: 'Head',
  // Ajna
  47: 'Ajna',
  24: 'Ajna',
  4: 'Ajna',
  17: 'Ajna',
  43: 'Ajna',
  11: 'Ajna',
  // Throat
  62: 'Throat',
  23: 'Throat',
  56: 'Throat',
  35: 'Throat',
  12: 'Throat',
  45: 'Throat',
  33: 'Throat',
  8: 'Throat',
  31: 'Throat',
  20: 'Throat',
  16: 'Throat',
  // G-Center
  7: 'G',
  1: 'G',
  13: 'G',
  25: 'G',
  46: 'G',
  2: 'G',
  15: 'G',
  10: 'G',
  // Heart/Ego
  21: 'Heart',
  51: 'Heart',
  26: 'Heart',
  40: 'Heart',
  // Solar Plexus
  6: 'SolarPlexus',
  37: 'SolarPlexus',
  22: 'SolarPlexus',
  36: 'SolarPlexus',
  49: 'SolarPlexus',
  55: 'SolarPlexus',
  30: 'SolarPlexus',
  // Sacral
  5: 'Sacral',
  14: 'Sacral',
  29: 'Sacral',
  59: 'Sacral',
  9: 'Sacral',
  3: 'Sacral',
  42: 'Sacral',
  27: 'Sacral',
  34: 'Sacral',
  // Spleen
  48: 'Spleen',
  57: 'Spleen',
  44: 'Spleen',
  50: 'Spleen',
  32: 'Spleen',
  28: 'Spleen',
  18: 'Spleen',
  // Root
  53: 'Root',
  60: 'Root',
  52: 'Root',
  19: 'Root',
  39: 'Root',
  41: 'Root',
  58: 'Root',
  38: 'Root',
  54: 'Root',
};

// 36 channels connecting centers: [gate1, gate2]
export const CHANNELS: [number, number][] = [
  [1, 8],
  [2, 14],
  [3, 60],
  [4, 63],
  [5, 15],
  [6, 59],
  [7, 31],
  [9, 52],
  [10, 20],
  [10, 34],
  [10, 57],
  [11, 56],
  [12, 22],
  [13, 33],
  [16, 48],
  [17, 62],
  [18, 58],
  [19, 49],
  [20, 34],
  [20, 57],
  [21, 45],
  [23, 43],
  [24, 61],
  [25, 51],
  [26, 44],
  [27, 50],
  [28, 38],
  [29, 46],
  [30, 41],
  [32, 54],
  [34, 57],
  [35, 36],
  [37, 40],
  [39, 55],
  [42, 53],
  [47, 64],
];

export interface ActiveChannel {
  gate1: number;
  gate2: number;
  center1: Center;
  center2: Center;
}

/**
 * Find all active channels given a set of active gates
 */
export function getActiveChannels(activeGates: Set<number>): ActiveChannel[] {
  const result: ActiveChannel[] = [];
  for (const [g1, g2] of CHANNELS) {
    if (activeGates.has(g1) && activeGates.has(g2)) {
      const center1 = GATE_TO_CENTER[g1];
      const center2 = GATE_TO_CENTER[g2];
      if (center1 && center2) {
        result.push({ gate1: g1, gate2: g2, center1, center2 });
      }
    }
  }
  return result;
}

/**
 * Get all defined centers based on active channels
 */
export function getDefinedCenters(activeChannels: ActiveChannel[]): Set<Center> {
  const defined = new Set<Center>();
  for (const channel of activeChannels) {
    defined.add(channel.center1);
    defined.add(channel.center2);
  }
  return defined;
}

/**
 * Build adjacency map of defined centers (for BFS path finding)
 */
export function buildCenterGraph(activeChannels: ActiveChannel[]): Map<Center, Set<Center>> {
  const graph = new Map<Center, Set<Center>>();
  for (const channel of activeChannels) {
    if (!graph.has(channel.center1)) graph.set(channel.center1, new Set());
    if (!graph.has(channel.center2)) graph.set(channel.center2, new Set());
    graph.get(channel.center1)!.add(channel.center2);
    graph.get(channel.center2)!.add(channel.center1);
  }
  return graph;
}

/**
 * BFS to check if there is a path between two centers through defined channels
 */
export function hasPath(
  graph: Map<Center, Set<Center>>,
  from: Center,
  to: Center
): boolean {
  if (!graph.has(from) || !graph.has(to)) return false;
  const visited = new Set<Center>();
  const queue: Center[] = [from];
  visited.add(from);
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current === to) return true;
    const neighbors = graph.get(current) ?? new Set();
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return false;
}
