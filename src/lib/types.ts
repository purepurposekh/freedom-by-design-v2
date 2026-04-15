// Human Design type, authority, and profile determination

import {
  type Center,
  type ActiveChannel,
  buildCenterGraph,
  hasPath,
} from './channels';

export type HDType =
  | 'Manifestor'
  | 'Generator'
  | 'Manifesting Generator'
  | 'Projector'
  | 'Reflector';

export type Authority =
  | 'Emotional'
  | 'Sacral'
  | 'Splenic'
  | 'Ego Manifested'
  | 'Ego Projected'
  | 'Self-Projected'
  | 'Mental'
  | 'Lunar';

export type Strategy =
  | 'To Inform'
  | 'To Respond'
  | 'Wait for the Invitation'
  | 'Wait a Lunar Cycle';

const MOTOR_CENTERS: Center[] = ['Root', 'Sacral', 'SolarPlexus', 'Heart'];

/**
 * Determine the Human Design type based on defined centers
 */
export function determineType(
  definedCenters: Set<Center>,
  activeChannels: ActiveChannel[]
): HDType {
  // Reflector: no centers defined
  if (definedCenters.size === 0) return 'Reflector';

  const graph = buildCenterGraph(activeChannels);
  const sacralDefined = definedCenters.has('Sacral');

  // Check if any motor has a path to the Throat
  const motorToThroat = MOTOR_CENTERS.some(
    (motor) => definedCenters.has(motor) && hasPath(graph, motor, 'Throat')
  );

  if (sacralDefined) {
    // Generator family
    if (motorToThroat) return 'Manifesting Generator';
    return 'Generator';
  } else {
    // Non-sacral
    if (motorToThroat) return 'Manifestor';
    if (definedCenters.size > 0) return 'Projector';
    return 'Reflector';
  }
}

/**
 * Determine the authority based on defined centers
 */
export function determineAuthority(
  definedCenters: Set<Center>,
  activeChannels: ActiveChannel[]
): Authority {
  const graph = buildCenterGraph(activeChannels);

  if (definedCenters.has('SolarPlexus')) return 'Emotional';
  if (definedCenters.has('Sacral')) return 'Sacral';
  if (definedCenters.has('Spleen')) return 'Splenic';

  if (definedCenters.has('Heart')) {
    if (hasPath(graph, 'Heart', 'Throat')) return 'Ego Manifested';
    return 'Ego Projected';
  }

  if (definedCenters.has('G')) {
    if (hasPath(graph, 'G', 'Throat')) return 'Self-Projected';
  }

  if (definedCenters.has('Head') || definedCenters.has('Ajna')) return 'Mental';

  return 'Lunar';
}

/**
 * Get strategy for a given type
 */
export function getStrategy(type: HDType): Strategy {
  switch (type) {
    case 'Manifestor':
      return 'To Inform';
    case 'Generator':
      return 'To Respond';
    case 'Manifesting Generator':
      return 'To Respond';
    case 'Projector':
      return 'Wait for the Invitation';
    case 'Reflector':
      return 'Wait a Lunar Cycle';
  }
}
