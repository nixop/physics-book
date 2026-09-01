/**
 * Pure numerical helpers shared by the electromagnetism, relativity and
 * double-slit visualisations. Coordinates are deliberately independent from
 * SVG pixels: callers choose their own unit and screen transform.
 */

export interface PointCharge {
  readonly x: number;
  readonly y: number;
  readonly q: number;
}

export interface ElectricFieldOptions {
  /** Use 1 for relative/diagram units, or Coulomb's constant for SI. */
  readonly fieldConstant?: number;
  /** A non-zero radius can be useful when sampling a finite display grid. */
  readonly singularityTolerance?: number;
}

export interface RegularElectricField {
  readonly singular: false;
  readonly ex: number;
  readonly ey: number;
  readonly magnitude: number;
  /** Null only where a finite field cancels exactly. */
  readonly direction: Readonly<{ x: number; y: number }> | null;
}

export interface SingularElectricField {
  readonly singular: true;
  readonly ex: null;
  readonly ey: null;
  readonly magnitude: null;
  readonly direction: null;
  /** Indices of non-zero point charges at the singular sample position. */
  readonly sourceIndices: readonly number[];
}

export type ElectricField = RegularElectricField | SingularElectricField;

function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${name} must be finite`);
  }
}

function assertNonNegative(value: number, name: string): void {
  assertFinite(value, name);
  if (value < 0) {
    throw new RangeError(`${name} must be non-negative`);
  }
}

/**
 * Sum E = k q r / |r|^3 for point charges in a plane.
 *
 * A coincident non-zero point charge is reported as an explicit singularity
 * instead of leaking NaN/Infinity into rendering code. A zero charge is
 * skipped, so a decorative neutral marker never masks the field beneath it.
 */
export function electricFieldAt(
  x: number,
  y: number,
  charges: readonly PointCharge[],
  options: ElectricFieldOptions = {},
): ElectricField {
  assertFinite(x, 'x');
  assertFinite(y, 'y');

  const fieldConstant = options.fieldConstant ?? 1;
  const singularityTolerance = options.singularityTolerance ?? 0;
  assertNonNegative(fieldConstant, 'fieldConstant');
  assertNonNegative(singularityTolerance, 'singularityTolerance');

  const singularSourceIndices: number[] = [];
  const toleranceSquared = singularityTolerance * singularityTolerance;
  let ex = 0;
  let ey = 0;

  charges.forEach((charge, index) => {
    assertFinite(charge.x, `charges[${index}].x`);
    assertFinite(charge.y, `charges[${index}].y`);
    assertFinite(charge.q, `charges[${index}].q`);

    // q = 0 contributes no field, even at its nominal marker position.
    if (charge.q === 0) return;

    const dx = x - charge.x;
    const dy = y - charge.y;
    const radiusSquared = dx * dx + dy * dy;

    if (radiusSquared === 0 || radiusSquared <= toleranceSquared) {
      singularSourceIndices.push(index);
      return;
    }

    const inverseRadiusCubed = 1 / (radiusSquared * Math.sqrt(radiusSquared));
    const coefficient = fieldConstant * charge.q * inverseRadiusCubed;
    const contributionX = coefficient * dx;
    const contributionY = coefficient * dy;

    // Extremely small, but non-zero, separations can overflow before the
    // exact r = 0 check. Treat those samples as singular as well.
    if (!Number.isFinite(contributionX) || !Number.isFinite(contributionY)) {
      singularSourceIndices.push(index);
      return;
    }

    ex += contributionX;
    ey += contributionY;
  });

  if (singularSourceIndices.length > 0) {
    return {
      singular: true,
      ex: null,
      ey: null,
      magnitude: null,
      direction: null,
      sourceIndices: singularSourceIndices,
    };
  }

  const magnitude = Math.hypot(ex, ey);
  if (!Number.isFinite(magnitude)) {
    // A finite collection of valid point charges should reach this branch
    // only through floating-point overflow, which is singular for display
    // purposes even when no one contribution overflowed on its own.
    return {
      singular: true,
      ex: null,
      ey: null,
      magnitude: null,
      direction: null,
      sourceIndices: [],
    };
  }

  return {
    singular: false,
    ex,
    ey,
    magnitude,
    direction: magnitude === 0 ? null : { x: ex / magnitude, y: ey / magnitude },
  };
}

/**
 * A zero-safe logarithmic magnitude. `referenceMagnitude` is the value where
 * the returned natural-log value equals ln(2).
 */
export function logMagnitude(magnitude: number, referenceMagnitude = 1): number {
  assertNonNegative(magnitude, 'magnitude');
  assertFinite(referenceMagnitude, 'referenceMagnitude');
  if (referenceMagnitude <= 0) {
    throw new RangeError('referenceMagnitude must be positive');
  }
  return Math.log1p(magnitude / referenceMagnitude);
}

/**
 * Map a positive magnitude range onto [0, 1] in log space. Values at or below
 * `minimumMagnitude` map to 0; values at or above `maximumMagnitude` map to 1.
 */
export function normalizeLogMagnitude(
  magnitude: number,
  minimumMagnitude: number,
  maximumMagnitude: number,
): number {
  assertNonNegative(magnitude, 'magnitude');
  assertFinite(minimumMagnitude, 'minimumMagnitude');
  assertFinite(maximumMagnitude, 'maximumMagnitude');
  if (minimumMagnitude <= 0) {
    throw new RangeError('minimumMagnitude must be positive');
  }
  if (maximumMagnitude <= minimumMagnitude) {
    throw new RangeError('maximumMagnitude must exceed minimumMagnitude');
  }
  if (magnitude <= minimumMagnitude) return 0;
  if (magnitude >= maximumMagnitude) return 1;

  return (
    Math.log(magnitude / minimumMagnitude) /
    Math.log(maximumMagnitude / minimumMagnitude)
  );
}

export interface MinkowskiEvent {
  /** Spatial coordinate, expressed in the same length unit as ct. */
  readonly x: number;
  /** Time coordinate multiplied by c. */
  readonly ct: number;
}

export interface MinkowskiLine {
  /** In ct = slope * x + intercept, a simultaneity line has slope beta. */
  readonly slope: number;
  readonly intercept: number;
}

function assertPhysicalBeta(beta: number): void {
  assertFinite(beta, 'beta');
  if (Math.abs(beta) >= 1) {
    throw new RangeError('beta must satisfy |beta| < 1');
  }
}

export function lorentzFactor(beta: number): number {
  assertPhysicalBeta(beta);
  return 1 / Math.sqrt((1 - beta) * (1 + beta));
}

/** x = beta * ct for an inertial observer passing through the origin. */
export function worldlineX(beta: number, ct: number): number {
  assertPhysicalBeta(beta);
  assertFinite(ct, 'ct');
  return beta * ct;
}

export function minkowskiWorldlineEvent(beta: number, ct: number): MinkowskiEvent {
  return { x: worldlineX(beta, ct), ct };
}

/**
 * The t' = constant line through an event: ct = beta*x + C.
 * Passing an event on x = beta*ct yields the observer's simultaneity line.
 */
export function simultaneityLineThroughEvent(
  beta: number,
  event: MinkowskiEvent,
): MinkowskiLine {
  assertPhysicalBeta(beta);
  assertFinite(event.x, 'event.x');
  assertFinite(event.ct, 'event.ct');
  return { slope: beta, intercept: event.ct - beta * event.x };
}

export function ctOnMinkowskiLine(line: MinkowskiLine, x: number): number {
  assertFinite(line.slope, 'line.slope');
  assertFinite(line.intercept, 'line.intercept');
  assertFinite(x, 'x');
  return line.slope * x + line.intercept;
}

/** Standard boost along +x: x' = gamma(x-beta*ct), ct' = gamma(ct-beta*x). */
export function lorentzTransform(event: MinkowskiEvent, beta: number): MinkowskiEvent {
  assertFinite(event.x, 'event.x');
  assertFinite(event.ct, 'event.ct');
  const gamma = lorentzFactor(beta);
  return {
    x: gamma * (event.x - beta * event.ct),
    ct: gamma * (event.ct - beta * event.x),
  };
}

/** The signed squared interval from the origin: s^2 = (ct)^2 - x^2. */
export function minkowskiIntervalSquared(event: MinkowskiEvent): number {
  assertFinite(event.x, 'event.x');
  assertFinite(event.ct, 'event.ct');
  return event.ct * event.ct - event.x * event.x;
}

function sinc(value: number): number {
  // The series avoids a removable 0/0 singularity and precision loss nearby.
  if (Math.abs(value) < 1e-8) {
    const squared = value * value;
    return 1 - squared / 6 + (squared * squared) / 120;
  }
  return Math.sin(value) / value;
}

/**
 * Fraunhofer intensity for two equal slits, normalized to I(0) = 1:
 * sinc^2(pi a/lambda u) cos^2(pi d/lambda u), where u = sin(theta).
 */
export function doubleSlitIntensity(
  u: number,
  dOverLambda: number,
  aOverLambda: number,
): number {
  assertFinite(u, 'u');
  if (Math.abs(u) > 1) {
    throw new RangeError('u = sin(theta) must satisfy |u| <= 1');
  }
  assertNonNegative(dOverLambda, 'dOverLambda');
  assertNonNegative(aOverLambda, 'aOverLambda');

  const envelope = sinc(Math.PI * aOverLambda * u) ** 2;
  const interference = Math.cos(Math.PI * dOverLambda * u) ** 2;
  // Suppress harmless one-ulp excursions above one after multiplication.
  return Math.min(1, Math.max(0, envelope * interference));
}

export interface DoubleSlitCurveOptions {
  readonly uMin?: number;
  readonly uMax?: number;
  /** Includes both endpoints. An odd value includes u = 0 for symmetric bounds. */
  readonly sampleCount?: number;
}

export interface DoubleSlitCurvePoint {
  readonly index: number;
  readonly u: number;
  /** The physical intensity normalized to the on-axis value I(0). */
  readonly rawIntensity: number;
  /** Intensity normalized to the largest value in this sampled window. */
  readonly intensity: number;
  /** Discrete probability mass used by sampleDoubleSlitDetections. */
  readonly probability: number;
}

export interface DoubleSlitCurve {
  readonly dOverLambda: number;
  readonly aOverLambda: number;
  readonly uMin: number;
  readonly uMax: number;
  readonly step: number;
  readonly points: readonly DoubleSlitCurvePoint[];
}

/** Build one normalized curve that both rendering and event sampling can use. */
export function sampleDoubleSlitCurve(
  dOverLambda: number,
  aOverLambda: number,
  options: DoubleSlitCurveOptions = {},
): DoubleSlitCurve {
  const uMin = options.uMin ?? -1;
  const uMax = options.uMax ?? 1;
  const sampleCount = options.sampleCount ?? 801;
  assertFinite(uMin, 'uMin');
  assertFinite(uMax, 'uMax');
  if (uMin < -1 || uMax > 1 || uMin >= uMax) {
    throw new RangeError('sample bounds must satisfy -1 <= uMin < uMax <= 1');
  }
  if (!Number.isInteger(sampleCount) || sampleCount < 3) {
    throw new RangeError('sampleCount must be an integer of at least 3');
  }

  // Validate parameters once even if a future implementation changes sampling.
  assertNonNegative(dOverLambda, 'dOverLambda');
  assertNonNegative(aOverLambda, 'aOverLambda');

  const step = (uMax - uMin) / (sampleCount - 1);
  const rawPoints = Array.from({ length: sampleCount }, (_, index) => {
    // Pin the last endpoint to avoid accumulated floating-point drift.
    const u = index === sampleCount - 1 ? uMax : uMin + step * index;
    return { index, u, rawIntensity: doubleSlitIntensity(u, dOverLambda, aOverLambda) };
  });
  const peak = Math.max(...rawPoints.map((point) => point.rawIntensity));
  const total = rawPoints.reduce((sum, point) => sum + point.rawIntensity, 0);
  if (!(peak > 0) || !(total > 0)) {
    throw new RangeError('sampled window contains no non-zero intensity');
  }

  const points = rawPoints.map<DoubleSlitCurvePoint>((point) => ({
    ...point,
    intensity: point.rawIntensity / peak,
    probability: point.rawIntensity / total,
  }));

  return { dOverLambda, aOverLambda, uMin, uMax, step, points };
}

export interface DoubleSlitMaximaOptions {
  /** Applied to window-normalized intensity. */
  readonly minimumRelativeIntensity?: number;
  readonly includeEndpoints?: boolean;
}

/** Extract discrete local maxima directly from the rendered/sample curve. */
export function extractDoubleSlitMaxima(
  curve: DoubleSlitCurve,
  options: DoubleSlitMaximaOptions = {},
): readonly DoubleSlitCurvePoint[] {
  const minimumRelativeIntensity = options.minimumRelativeIntensity ?? 0;
  assertNonNegative(minimumRelativeIntensity, 'minimumRelativeIntensity');
  if (minimumRelativeIntensity > 1) {
    throw new RangeError('minimumRelativeIntensity must not exceed 1');
  }

  const { points } = curve;
  const maxima: DoubleSlitCurvePoint[] = [];
  const qualifies = (point: DoubleSlitCurvePoint): boolean =>
    point.intensity >= minimumRelativeIntensity;

  if (
    options.includeEndpoints &&
    qualifies(points[0]) &&
    points[0].intensity > points[1].intensity
  ) {
    maxima.push(points[0]);
  }

  for (let index = 1; index < points.length - 1; index += 1) {
    const previous = points[index - 1].intensity;
    const current = points[index];
    const next = points[index + 1].intensity;
    if (
      qualifies(current) &&
      current.intensity >= previous &&
      current.intensity >= next &&
      (current.intensity > previous || current.intensity > next)
    ) {
      maxima.push(current);
    }
  }

  const last = points[points.length - 1];
  if (
    options.includeEndpoints &&
    qualifies(last) &&
    last.intensity > points[points.length - 2].intensity
  ) {
    maxima.push(last);
  }
  return maxima;
}

export interface DoubleSlitDetection {
  readonly index: number;
  readonly u: number;
}

/** Deterministic PRNG suitable for reproducible visual experiments (not crypto). */
export function createSeededRandom(seed: number): () => number {
  assertFinite(seed, 'seed');
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 0x1_0000_0000;
  };
}

/** Sample detection bins from the exact discrete distribution stored in curve. */
export function sampleDoubleSlitDetections(
  curve: DoubleSlitCurve,
  count: number,
  seed = 0x5eed,
): readonly DoubleSlitDetection[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError('count must be a non-negative integer');
  }
  if (curve.points.length === 0) {
    throw new RangeError('curve must contain at least one point');
  }

  const totalProbability = curve.points.reduce(
    (sum, point) => sum + point.probability,
    0,
  );
  if (!(totalProbability > 0) || !Number.isFinite(totalProbability)) {
    throw new RangeError('curve probabilities must have a finite positive sum');
  }

  const cdf: number[] = [];
  let cumulative = 0;
  curve.points.forEach((point, index) => {
    assertNonNegative(point.probability, `curve.points[${index}].probability`);
    cumulative += point.probability / totalProbability;
    cdf.push(cumulative);
  });
  cdf[cdf.length - 1] = 1;

  const random = createSeededRandom(seed);
  const detections: DoubleSlitDetection[] = [];
  for (let eventIndex = 0; eventIndex < count; eventIndex += 1) {
    const target = random();
    let low = 0;
    let high = cdf.length - 1;
    while (low < high) {
      const middle = low + Math.floor((high - low) / 2);
      if (target < cdf[middle]) high = middle;
      else low = middle + 1;
    }
    const point = curve.points[low];
    detections.push({ index: point.index, u: point.u });
  }
  return detections;
}
