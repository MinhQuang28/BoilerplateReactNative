/**
 * Clamp value on UI thread.
 */
export const sharedClamp = (
  value: number,
  lowerValue: number,
  upperValue: number,
) => {
  'worklet';

  return Math.min(Math.max(lowerValue, value), upperValue);
};

/**
 * Select a point where the animation should snap to given the value of the gesture and it's velocity on UI thread.
 */
export const sharedSnapPoint = (
  value: number,
  velocity: number,
  points: number[],
) => {
  'worklet';
  const point = value + velocity * 0.2;

  const diffPoint = (p: number) => Math.abs(point - p);

  const deltas = points.map(p => diffPoint(p));

  const minDelta = Math.min(...deltas);

  return points.reduce((acc, p) => (diffPoint(p) === minDelta ? p : acc), 0);
};

/**
 * Convert radian to degree on UI thread.
 */
export const sharedToDeg = (rad: number) => {
  'worklet';

  return (rad * 180) / Math.PI;
};

/**
 * Convert degree to radian on UI thread.
 */
export const sharedToRad = (deg: number) => {
  'worklet';

  return (deg * Math.PI) / 180;
};

/**
 * Convert boolean to 0 or 1 on UI thead
 */
export const sharedBin = (value: boolean): 0 | 1 => {
  'worklet';

  return value ? 1 : 0;
};
