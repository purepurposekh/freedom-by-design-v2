'use client';

import { CHANNELS, GATE_TO_CENTER } from '@/lib/channels';

export interface GateInfo {
  planet: string;
  gate: number;
  line: number;
}

interface BodygraphProps {
  definedCenters: string[];
  activeChannels: { gate1: number; gate2: number }[];
  personalityGates: GateInfo[];
  designGates: GateInfo[];
  showTable?: boolean;
}

// ViewBox: 0 0 480 570
// Head and Ajna are triangles pointing up; G is a large diamond; Heart/SP/Spleen are squares
const CENTRE_POS: Record<string, { cx: number; cy: number; shape: 'diamond' | 'rect' | 'triangle'; hw: number; hh: number; label: string; fontSize?: number }> = {
  Head:        { cx: 240, cy:  55, shape: 'triangle', hw: 44, hh: 36, label: 'Head'         },
  Ajna:        { cx: 240, cy: 157, shape: 'triangle', hw: 44, hh: 36, label: 'Ajna'         },
  Throat:      { cx: 240, cy: 235, shape: 'rect',     hw: 72, hh: 28, label: 'Throat'       },
  G:           { cx: 240, cy: 322, shape: 'diamond',  hw: 68, hh: 58, label: 'G Center'     },
  Heart:       { cx: 352, cy: 279, shape: 'rect',     hw: 32, hh: 32, label: 'Heart'        },
  SolarPlexus: { cx: 354, cy: 399, shape: 'rect',     hw: 36, hh: 36, label: 'Solar Plexus', fontSize: 9 },
  Sacral:      { cx: 240, cy: 427, shape: 'rect',     hw: 74, hh: 28, label: 'Sacral'       },
  Spleen:      { cx: 130, cy: 357, shape: 'rect',     hw: 36, hh: 36, label: 'Spleen'       },
  Root:        { cx: 240, cy: 519, shape: 'rect',     hw: 74, hh: 28, label: 'Root'         },
};

// Build channel lines from gate pairs + gate-to-centre mapping
const CHANNEL_LINES = CHANNELS.map(([gate1, gate2]) => ({
  gate1,
  gate2,
  c1: GATE_TO_CENTER[gate1] as string,
  c2: GATE_TO_CENTER[gate2] as string,
})).filter(ch => ch.c1 && ch.c2 && ch.c1 !== ch.c2);

export const PLANET_SYMBOLS: Record<string, string> = {
  sun:       '\u2609',
  earth:     '\u2295',
  moon:      '\u263D',
  mercury:   '\u263F',
  venus:     '\u2640',
  mars:      '\u2642',
  jupiter:   '\u2643',
  saturn:    '\u2644',
  uranus:    '\u2645',
  neptune:   '\u2646',
  pluto:     '\u2647',
  northNode: '\u260A',
  southNode: '\u260B',
};

export const PLANET_ORDER = [
  'sun', 'earth', 'moon', 'mercury', 'venus', 'mars',
  'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
  'northNode', 'southNode',
];

function TriangleShape({ cx, cy, hw, hh, fill, stroke, isDefined }: { cx: number; cy: number; hw: number; hh: number; fill: string; stroke: string; isDefined: boolean }) {
  // Triangle pointing up: apex at top, base at bottom
  const pts = `${cx},${cy - hh} ${cx + hw},${cy + hh} ${cx - hw},${cy + hh}`;
  return (
    <polygon
      points={pts}
      fill={fill}
      stroke={stroke}
      strokeWidth="1.5"
      filter={isDefined ? 'url(#defined-shadow)' : undefined}
    />
  );
}

function DiamondShape({ cx, cy, hw, hh, fill, stroke, isDefined }: { cx: number; cy: number; hw: number; hh: number; fill: string; stroke: string; isDefined: boolean }) {
  const pts = `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`;
  return (
    <polygon
      points={pts}
      fill={fill}
      stroke={stroke}
      strokeWidth="1.5"
      filter={isDefined ? 'url(#defined-shadow)' : undefined}
    />
  );
}

function RectShape({ cx, cy, hw, hh, fill, stroke, isDefined }: { cx: number; cy: number; hw: number; hh: number; fill: string; stroke: string; isDefined: boolean }) {
  return (
    <rect
      x={cx - hw} y={cy - hh} width={hw * 2} height={hh * 2} rx="6"
      fill={fill} stroke={stroke} strokeWidth="1.5"
      filter={isDefined ? 'url(#defined-shadow)' : undefined}
    />
  );
}

function CenterLabel({ cx, cy, label, fontSize = 11, textColor }: { cx: number; cy: number; label: string; fontSize?: number; textColor: string }) {
  const words = label.split(' ');
  if (words.length >= 2) {
    const lineH = fontSize + 2;
    return (
      <text textAnchor="middle" fontSize={fontSize} fontWeight="500" fill={textColor}>
        <tspan x={cx} y={cy - lineH / 2 + 4}>{words[0]}</tspan>
        <tspan x={cx} dy={lineH}>{words.slice(1).join(' ')}</tspan>
      </text>
    );
  }
  return (
    <text x={cx} y={cy + 4} textAnchor="middle" fontSize={fontSize} fontWeight="500" fill={textColor}>
      {label}
    </text>
  );
}

export default function Bodygraph({
  definedCenters,
  activeChannels,
  personalityGates,
  designGates,
  showTable = true,
}: BodygraphProps) {
  const definedSet = new Set(definedCenters);

  const activeGatePairs = new Set(
    activeChannels.map(
      (ch) => `${Math.min(ch.gate1, ch.gate2)}-${Math.max(ch.gate1, ch.gate2)}`
    )
  );

  const isChannelActive = (g1: number, g2: number) =>
    activeGatePairs.has(`${Math.min(g1, g2)}-${Math.max(g1, g2)}`);

  // Connection point on each centre for drawing channel lines
  function getConnectionPoint(centreKey: string, targetKey: string): { x: number; y: number } {
    const c = CENTRE_POS[centreKey];
    const t = CENTRE_POS[targetKey];
    if (!c || !t) return { x: c?.cx ?? 0, y: c?.cy ?? 0 };

    const dx = t.cx - c.cx;
    const dy = t.cy - c.cy;
    const angle = Math.atan2(dy, dx);
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    if (c.shape === 'triangle') {
      if (sinA > 0) {
        // Going down: hit the bottom horizontal base
        const tVal = c.hh / sinA;
        const x = c.cx + tVal * cosA;
        return { x: Math.max(c.cx - c.hw, Math.min(c.cx + c.hw, x)), y: c.cy + c.hh };
      } else {
        // Going up: hit the apex
        return { x: c.cx, y: c.cy - c.hh };
      }
    } else if (c.shape === 'diamond') {
      const hw = c.hw, hh = c.hh;
      const d = (hw * hh) / Math.sqrt((hh * cosA) ** 2 + (hw * sinA) ** 2);
      return { x: c.cx + d * cosA, y: c.cy + d * sinA };
    } else {
      // Rect: clamp to edge
      const hw = c.hw, hh = c.hh;
      const tX = cosA !== 0 ? hw / Math.abs(cosA) : Infinity;
      const tY = sinA !== 0 ? hh / Math.abs(sinA) : Infinity;
      const t2 = Math.min(tX, tY);
      return { x: c.cx + t2 * cosA, y: c.cy + t2 * sinA };
    }
  }

  const byPlanet = (gates: GateInfo[]) => {
    const map: Record<string, GateInfo> = {};
    for (const g of gates) map[g.planet] = g;
    return map;
  };

  const personalityByPlanet = byPlanet(personalityGates);
  const designByPlanet = byPlanet(designGates);

  return (
    <div className="w-full">
      {/* Bodygraph SVG */}
      <div className="w-full flex justify-center">
        <svg
          viewBox="0 0 480 570"
          width="100%"
          style={{ maxWidth: 520, minWidth: 300 }}
          aria-label="Human Design bodygraph chart"
        >
          <defs>
            <filter id="defined-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(61,107,97,0.25)" />
            </filter>
          </defs>

          {/* Channel lines — inactive first (behind), active on top */}
          {CHANNEL_LINES.filter(ch => !isChannelActive(ch.gate1, ch.gate2)).map((ch, i) => {
            const p1 = getConnectionPoint(ch.c1, ch.c2);
            const p2 = getConnectionPoint(ch.c2, ch.c1);
            return (
              <line
                key={`inactive-${i}`}
                x1={p1.x} y1={p1.y}
                x2={p2.x} y2={p2.y}
                stroke="#ddd8d2"
                strokeWidth="1.2"
                strokeDasharray="5,4"
              />
            );
          })}
          {CHANNEL_LINES.filter(ch => isChannelActive(ch.gate1, ch.gate2)).map((ch, i) => {
            const p1 = getConnectionPoint(ch.c1, ch.c2);
            const p2 = getConnectionPoint(ch.c2, ch.c1);
            return (
              <line
                key={`active-${i}`}
                x1={p1.x} y1={p1.y}
                x2={p2.x} y2={p2.y}
                stroke="#ad765b"
                strokeWidth="3"
              />
            );
          })}


          {/* Centres */}
          {Object.entries(CENTRE_POS).map(([key, c]) => {
            const isDefined = definedSet.has(key);
            const fill = isDefined ? '#3d6b61' : '#f5f2ed';
            const stroke = isDefined ? '#2d5449' : '#c8bfb5';
            const textColor = isDefined ? 'white' : '#9b8f84';

            return (
              <g key={key}>
                {c.shape === 'triangle' ? (
                  <TriangleShape cx={c.cx} cy={c.cy} hw={c.hw} hh={c.hh} fill={fill} stroke={stroke} isDefined={isDefined} />
                ) : c.shape === 'diamond' ? (
                  <DiamondShape cx={c.cx} cy={c.cy} hw={c.hw} hh={c.hh} fill={fill} stroke={stroke} isDefined={isDefined} />
                ) : (
                  <RectShape cx={c.cx} cy={c.cy} hw={c.hw} hh={c.hh} fill={fill} stroke={stroke} isDefined={isDefined} />
                )}
                <CenterLabel cx={c.cx} cy={c.cy} label={c.label} fontSize={c.fontSize} textColor={textColor} />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Planetary positions table */}
      {showTable && (personalityGates.length > 0 || designGates.length > 0) && (
        <div className="mt-6 max-w-sm mx-auto">
          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Design (unconscious) */}
            <div>
              <p className="text-center font-semibold text-brand-terracotta uppercase tracking-wider mb-2 text-[10px]">Design</p>
              {PLANET_ORDER.map(planet => {
                const g = designByPlanet[planet];
                if (!g) return null;
                return (
                  <div key={planet} className="flex items-center justify-between py-1 border-b border-brand-parchment/60">
                    <span className="text-brand-terracotta w-5 text-center">{PLANET_SYMBOLS[planet] ?? planet}</span>
                    <span className="text-brand-dark/70 flex-1 text-right">{g.gate}.{g.line}</span>
                  </div>
                );
              })}
            </div>
            {/* Personality (conscious) */}
            <div>
              <p className="text-center font-semibold text-brand-dark uppercase tracking-wider mb-2 text-[10px]">Personality</p>
              {PLANET_ORDER.map(planet => {
                const g = personalityByPlanet[planet];
                if (!g) return null;
                return (
                  <div key={planet} className="flex items-center justify-between py-1 border-b border-brand-parchment/60">
                    <span className="text-brand-dark/60 w-5 text-center">{PLANET_SYMBOLS[planet] ?? planet}</span>
                    <span className="text-brand-dark/70 flex-1 text-right">{g.gate}.{g.line}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
