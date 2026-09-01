const TWO_PI = Math.PI * 2;

export const STANDARD_GRAVITY = 9.81;
export const DEFAULT_WAVE_SPEED = 5;
export const DEFAULT_WAVE_LENGTH = 10;

function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) throw new RangeError(`${name} must be finite`);
}

function assertPositive(value: number, name: string): void {
  assertFinite(value, name);
  if (value <= 0) throw new RangeError(`${name} must be greater than zero`);
}

function assertSampleCount(count: number): void {
  if (!Number.isInteger(count) || count < 2) {
    throw new RangeError('sample count must be an integer greater than one');
  }
}

export function sampleMean(values: readonly number[]): number {
  if (values.length === 0) throw new RangeError('cannot calculate the mean of an empty sample');
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function sampleStandardDeviation(values: readonly number[]): number {
  assertSampleCount(values.length);
  const mean = sampleMean(values);
  const squaredDeviations = values.reduce((sum, value) => sum + (value - mean) ** 2, 0);
  return Math.sqrt(squaredDeviations / (values.length - 1));
}

/** A dimensionless one-period signal used by both the curve and its measurements. */
export function signalModel(x: number): number {
  assertFinite(x, 'x');
  return Math.sin(x);
}

function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 0x1_0000_0000;
  };
}

/**
 * Returns a repeatable, Gaussian-shaped sample with sample mean 0 and sample
 * standard deviation 1 (up to floating-point round-off).
 */
export function seededStandardNoise(count: number, seed = 0x504f4c45): number[] {
  assertSampleCount(count);
  if (!Number.isInteger(seed)) throw new RangeError('seed must be an integer');

  const random = mulberry32(seed);
  const raw: number[] = [];
  while (raw.length < count) {
    const u1 = Math.max(random(), Number.MIN_VALUE);
    const u2 = random();
    const radius = Math.sqrt(-2 * Math.log(u1));
    const angle = TWO_PI * u2;
    raw.push(radius * Math.cos(angle));
    if (raw.length < count) raw.push(radius * Math.sin(angle));
  }

  const mean = sampleMean(raw);
  const centered = raw.map((value) => value - mean);
  const standardDeviation = sampleStandardDeviation(centered);
  if (standardDeviation === 0) throw new Error('seeded noise sample is degenerate');
  return centered.map((value) => value / standardDeviation);
}

export interface MeasurementPoint {
  readonly index: number;
  readonly x: number;
  readonly model: number;
  readonly noise: number;
  readonly observed: number;
}

/** Samples one full period, including both endpoints. Sigma uses sample-SD units. */
export function measurementSeries(sigma: number, count: number, seed = 0x504f4c45): MeasurementPoint[] {
  assertFinite(sigma, 'sigma');
  if (sigma < 0) throw new RangeError('sigma must not be negative');
  assertSampleCount(count);

  const standardizedNoise = seededStandardNoise(count, seed);
  return standardizedNoise.map((standardNoise, index) => {
    const x = TWO_PI * index / (count - 1);
    const model = signalModel(x);
    const noise = sigma === 0 ? 0 : sigma * standardNoise;
    return {
      index,
      x,
      model,
      noise,
      observed: sigma === 0 ? model : model + noise,
    };
  });
}

function launchAngleRadians(angleDeg: number): number {
  assertFinite(angleDeg, 'angleDeg');
  if (angleDeg < 0 || angleDeg > 90) {
    throw new RangeError('angleDeg must be between 0 and 90 degrees');
  }
  return angleDeg * Math.PI / 180;
}

function validateProjectile(v0: number, angleDeg: number, gravity: number): number {
  assertFinite(v0, 'v0');
  if (v0 < 0) throw new RangeError('v0 must not be negative');
  assertPositive(gravity, 'gravity');
  return launchAngleRadians(angleDeg);
}

function cleanRoundOff(value: number): number {
  return Math.abs(value) < 1e-12 ? 0 : value;
}

export interface ProjectileMetrics {
  readonly range: number;
  readonly height: number;
  readonly maxHeight: number;
  readonly flightTime: number;
}

/** Ideal projectile launched and landed at y=0 in a uniform gravitational field. */
export function projectileMetrics(
  v0: number,
  angleDeg: number,
  gravity = STANDARD_GRAVITY,
): ProjectileMetrics {
  const angle = validateProjectile(v0, angleDeg, gravity);
  const verticalVelocity = v0 * Math.sin(angle);
  const height = verticalVelocity ** 2 / (2 * gravity);
  return {
    range: cleanRoundOff(v0 ** 2 * Math.sin(2 * angle) / gravity),
    height,
    maxHeight: height,
    flightTime: 2 * verticalVelocity / gravity,
  };
}

export interface ProjectilePoint {
  readonly t: number;
  readonly x: number;
  readonly y: number;
  readonly velocityX: number;
  readonly velocityY: number;
  readonly speed: number;
}

export function projectilePoint(
  t: number,
  v0: number,
  angleDeg: number,
  gravity = STANDARD_GRAVITY,
): ProjectilePoint {
  assertFinite(t, 't');
  if (t < 0) throw new RangeError('t must not be negative');
  const angle = validateProjectile(v0, angleDeg, gravity);
  const velocityX = v0 * Math.cos(angle);
  const initialVelocityY = v0 * Math.sin(angle);
  const velocityY = initialVelocityY - gravity * t;
  return {
    t,
    x: cleanRoundOff(velocityX * t),
    y: cleanRoundOff(initialVelocityY * t - gravity * t ** 2 / 2),
    velocityX: cleanRoundOff(velocityX),
    velocityY: cleanRoundOff(velocityY),
    speed: Math.hypot(velocityX, velocityY),
  };
}

/** Equally spaced time samples from launch through landing, in SI coordinates. */
export function projectileTrajectory(
  v0: number,
  angleDeg: number,
  sampleCount = 61,
  gravity = STANDARD_GRAVITY,
): ProjectilePoint[] {
  assertSampleCount(sampleCount);
  const { flightTime } = projectileMetrics(v0, angleDeg, gravity);
  return Array.from({ length: sampleCount }, (_, index) => (
    projectilePoint(flightTime * index / (sampleCount - 1), v0, angleDeg, gravity)
  ));
}

export interface WaveParameters {
  readonly control: number;
  readonly frequency: number;
  readonly speed: number;
  readonly wavelength: number;
  readonly length: number;
  readonly cycles: number;
  readonly angularFrequency: number;
  readonly waveNumber: number;
}

/** Maps the UI control to a wave in a fixed 10 m window with speed 5 m/s. */
export function waveParameters(
  control: number,
  speed = DEFAULT_WAVE_SPEED,
  length = DEFAULT_WAVE_LENGTH,
): WaveParameters {
  assertFinite(control, 'control');
  assertPositive(speed, 'speed');
  assertPositive(length, 'length');
  const frequency = 0.6 + control / 28;
  assertPositive(frequency, 'frequency');
  const wavelength = speed / frequency;
  return {
    control,
    frequency,
    speed,
    wavelength,
    length,
    cycles: length / wavelength,
    angularFrequency: TWO_PI * frequency,
    waveNumber: TWO_PI / wavelength,
  };
}

/** A right-travelling harmonic wave y(x,t) = A sin(kx - omega*t + phase). */
export function waveDisplacement(
  x: number,
  t: number,
  amplitude: number,
  parameters: Pick<WaveParameters, 'waveNumber' | 'angularFrequency'>,
  phase = 0,
): number {
  assertFinite(x, 'x');
  assertFinite(t, 't');
  assertFinite(amplitude, 'amplitude');
  assertFinite(parameters.waveNumber, 'waveNumber');
  assertFinite(parameters.angularFrequency, 'angularFrequency');
  assertFinite(phase, 'phase');
  return amplitude * Math.sin(parameters.waveNumber * x - parameters.angularFrequency * t + phase);
}

function validateEccentricity(eccentricity: number): void {
  assertFinite(eccentricity, 'eccentricity');
  if (eccentricity < 0 || eccentricity >= 1) {
    throw new RangeError('eccentricity must be in the interval [0, 1)');
  }
}

export function keplerResidual(eccentricAnomaly: number, meanAnomaly: number, eccentricity: number): number {
  assertFinite(eccentricAnomaly, 'eccentricAnomaly');
  assertFinite(meanAnomaly, 'meanAnomaly');
  validateEccentricity(eccentricity);
  return eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly;
}

/** Solves M = E - e sin(E) for an elliptic orbit with a safeguarded Newton step. */
export function solveKeplerEquation(
  meanAnomaly: number,
  eccentricity: number,
  tolerance = 1e-14,
): number {
  assertFinite(meanAnomaly, 'meanAnomaly');
  validateEccentricity(eccentricity);
  assertPositive(tolerance, 'tolerance');
  if (eccentricity === 0) return meanAnomaly;

  const turns = Math.floor((meanAnomaly + Math.PI) / TWO_PI);
  const reducedMeanAnomaly = meanAnomaly - turns * TWO_PI;
  let lower = -Math.PI;
  let upper = Math.PI;
  let eccentricAnomaly = eccentricity < 0.8
    ? reducedMeanAnomaly
    : reducedMeanAnomaly === 0 ? 0 : Math.sign(reducedMeanAnomaly) * Math.PI;

  for (let iteration = 0; iteration < 80; iteration += 1) {
    const residual = eccentricAnomaly
      - eccentricity * Math.sin(eccentricAnomaly)
      - reducedMeanAnomaly;
    if (Math.abs(residual) <= tolerance) return eccentricAnomaly + turns * TWO_PI;

    if (residual > 0) upper = eccentricAnomaly;
    else lower = eccentricAnomaly;

    const derivative = 1 - eccentricity * Math.cos(eccentricAnomaly);
    const newtonCandidate = eccentricAnomaly - residual / derivative;
    eccentricAnomaly = Number.isFinite(newtonCandidate)
      && newtonCandidate > lower
      && newtonCandidate < upper
      ? newtonCandidate
      : (lower + upper) / 2;
  }

  const result = eccentricAnomaly + turns * TWO_PI;
  if (Math.abs(keplerResidual(result, meanAnomaly, eccentricity)) > tolerance * 8) {
    throw new Error('Kepler solver did not converge');
  }
  return result;
}

export function apoapsisPeriapsisRatio(eccentricity: number): number {
  validateEccentricity(eccentricity);
  return (1 + eccentricity) / (1 - eccentricity);
}

/** Specific areal velocity dA/dt for a Kepler ellipse. */
export function orbitArealRate(
  semiMajorAxis: number,
  eccentricity: number,
  gravitationalParameter = 1,
): number {
  assertPositive(semiMajorAxis, 'semiMajorAxis');
  validateEccentricity(eccentricity);
  assertPositive(gravitationalParameter, 'gravitationalParameter');
  return Math.sqrt(gravitationalParameter * semiMajorAxis * (1 - eccentricity ** 2)) / 2;
}

export interface OrbitState {
  readonly meanAnomaly: number;
  readonly eccentricAnomaly: number;
  readonly trueAnomaly: number;
  /** Position relative to the occupied focus. */
  readonly x: number;
  readonly y: number;
  /** Position relative to the geometric centre of the ellipse. */
  readonly centeredX: number;
  readonly centeredY: number;
  readonly radius: number;
  readonly velocityX: number;
  readonly velocityY: number;
  readonly speed: number;
  readonly semiMajorAxis: number;
  readonly semiMinorAxis: number;
  readonly focusDistance: number;
  readonly meanMotion: number;
  readonly arealRate: number;
}

export function orbitState(
  meanAnomaly: number,
  eccentricity: number,
  semiMajorAxis = 1,
  gravitationalParameter = 1,
): OrbitState {
  assertFinite(meanAnomaly, 'meanAnomaly');
  validateEccentricity(eccentricity);
  assertPositive(semiMajorAxis, 'semiMajorAxis');
  assertPositive(gravitationalParameter, 'gravitationalParameter');

  const eccentricAnomaly = solveKeplerEquation(meanAnomaly, eccentricity);
  const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity ** 2);
  const focusDistance = semiMajorAxis * eccentricity;
  const centeredX = semiMajorAxis * Math.cos(eccentricAnomaly);
  const centeredY = semiMinorAxis * Math.sin(eccentricAnomaly);
  const x = centeredX - focusDistance;
  const y = centeredY;
  const radius = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));
  const meanMotion = Math.sqrt(gravitationalParameter / semiMajorAxis ** 3);
  const anomalyRate = meanMotion / (1 - eccentricity * Math.cos(eccentricAnomaly));
  const velocityX = -semiMajorAxis * Math.sin(eccentricAnomaly) * anomalyRate;
  const velocityY = semiMinorAxis * Math.cos(eccentricAnomaly) * anomalyRate;

  return {
    meanAnomaly,
    eccentricAnomaly,
    trueAnomaly: Math.atan2(
      Math.sqrt(1 - eccentricity ** 2) * Math.sin(eccentricAnomaly),
      Math.cos(eccentricAnomaly) - eccentricity,
    ),
    x,
    y,
    centeredX,
    centeredY,
    radius,
    velocityX,
    velocityY,
    speed: Math.hypot(velocityX, velocityY),
    semiMajorAxis,
    semiMinorAxis,
    focusDistance,
    meanMotion,
    arealRate: orbitArealRate(semiMajorAxis, eccentricity, gravitationalParameter),
  };
}
