import { describe, expect, it } from 'vitest';
import {
  ctOnMinkowskiLine,
  doubleSlitIntensity,
  electricFieldAt,
  extractDoubleSlitMaxima,
  logMagnitude,
  lorentzFactor,
  lorentzTransform,
  minkowskiIntervalSquared,
  minkowskiWorldlineEvent,
  normalizeLogMagnitude,
  sampleDoubleSlitCurve,
  sampleDoubleSlitDetections,
  simultaneityLineThroughEvent,
  worldlineX,
} from '../src/lib/physics/modern';

function expectRegularField(field: ReturnType<typeof electricFieldAt>) {
  expect(field.singular).toBe(false);
  if (field.singular) throw new Error('expected a finite electric field');
  return field;
}

describe('electricFieldAt', () => {
  it('respects charge signs and returns a unit direction', () => {
    const positive = expectRegularField(electricFieldAt(2, 0, [{ x: 0, y: 0, q: 3 }]));
    const negative = expectRegularField(electricFieldAt(2, 0, [{ x: 0, y: 0, q: -3 }]));

    expect(positive.ex).toBeCloseTo(0.75, 12);
    expect(positive.ey).toBeCloseTo(0, 12);
    expect(positive.direction).toEqual({ x: 1, y: 0 });
    expect(negative.ex).toBeCloseTo(-0.75, 12);
    expect(negative.direction).toEqual({ x: -1, y: 0 });
  });

  it('obeys inverse-square scaling and linear superposition', () => {
    const near = expectRegularField(electricFieldAt(1, 0, [{ x: 0, y: 0, q: 1 }]));
    const far = expectRegularField(electricFieldAt(2, 0, [{ x: 0, y: 0, q: 1 }]));
    expect(near.magnitude / far.magnitude).toBeCloseTo(4, 12);

    const charges = [
      { x: -0.7, y: 0.2, q: 2 },
      { x: 1.1, y: -0.4, q: -0.8 },
      { x: 0.3, y: 1.2, q: 0.45 },
    ] as const;
    const sum = expectRegularField(electricFieldAt(0.2, -0.1, charges));
    const individual = charges.map((charge) =>
      expectRegularField(electricFieldAt(0.2, -0.1, [charge])),
    );
    expect(sum.ex).toBeCloseTo(
      individual.reduce((value, field) => value + field.ex, 0),
      12,
    );
    expect(sum.ey).toBeCloseTo(
      individual.reduce((value, field) => value + field.ey, 0),
      12,
    );
  });

  it('has the expected symmetry for equal charges and for a dipole', () => {
    const equalCharges = [
      { x: -1, y: 0, q: 1 },
      { x: 1, y: 0, q: 1 },
    ] as const;
    const midpoint = expectRegularField(electricFieldAt(0, 0, equalCharges));
    expect(midpoint.magnitude).toBe(0);
    expect(midpoint.direction).toBeNull();

    const dipole = [
      { x: -0.5, y: 0, q: 1 },
      { x: 0.5, y: 0, q: -1 },
    ] as const;
    const above = expectRegularField(electricFieldAt(0, 3, dipole));
    const below = expectRegularField(electricFieldAt(0, -3, dipole));
    expect(above.ex).toBeGreaterThan(0);
    expect(above.ey).toBeCloseTo(0, 12);
    expect(below.ex).toBeCloseTo(above.ex, 12);
    expect(below.ey).toBeCloseTo(0, 12);
  });

  it('reports non-zero singularities without letting a zero charge mask the field', () => {
    const throughNeutralMarker = expectRegularField(
      electricFieldAt(0, 0, [
        { x: 0, y: 0, q: 0 },
        { x: -1, y: 0, q: 2 },
      ]),
    );
    expect(throughNeutralMarker.ex).toBeCloseTo(2, 12);

    const singular = electricFieldAt(0, 0, [
      { x: 0, y: 0, q: 1 },
      { x: 1, y: 0, q: -1 },
    ]);
    expect(singular).toEqual({
      singular: true,
      ex: null,
      ey: null,
      magnitude: null,
      direction: null,
      sourceIndices: [0],
    });
  });

  it('provides monotone, bounded logarithmic display helpers', () => {
    expect(logMagnitude(0)).toBe(0);
    expect(logMagnitude(10)).toBeGreaterThan(logMagnitude(1));
    expect(normalizeLogMagnitude(0.001, 0.01, 100)).toBe(0);
    expect(normalizeLogMagnitude(1, 0.01, 100)).toBeCloseTo(0.5, 12);
    expect(normalizeLogMagnitude(1_000, 0.01, 100)).toBe(1);
  });
});

describe('Minkowski geometry', () => {
  it('computes gamma and rejects non-physical speeds', () => {
    expect(lorentzFactor(0)).toBe(1);
    expect(lorentzFactor(0.6)).toBeCloseTo(1.25, 12);
    expect(lorentzFactor(-0.6)).toBeCloseTo(1.25, 12);
    expect(() => lorentzFactor(1)).toThrow(RangeError);
    expect(() => lorentzFactor(-1.01)).toThrow(RangeError);
  });

  it('places the observer on x = beta*ct and transforms that worldline to x\' = 0', () => {
    const beta = 0.65;
    const event = minkowskiWorldlineEvent(beta, 8);
    expect(event.x).toBeCloseTo(worldlineX(beta, 8), 12);
    expect(event.x).toBeCloseTo(5.2, 12);
    expect(lorentzTransform(event, beta).x).toBeCloseTo(0, 12);
  });

  it('constructs ct = beta*x + C through the chosen worldline event', () => {
    const beta = 0.72;
    const event = minkowskiWorldlineEvent(beta, 6);
    const line = simultaneityLineThroughEvent(beta, event);
    expect(line.slope).toBe(beta);
    expect(ctOnMinkowskiLine(line, event.x)).toBeCloseTo(event.ct, 12);

    // Every point on this line has the same ct' under the same boost.
    const first = { x: -2, ct: ctOnMinkowskiLine(line, -2) };
    const second = { x: 4, ct: ctOnMinkowskiLine(line, 4) };
    expect(lorentzTransform(first, beta).ct).toBeCloseTo(
      lorentzTransform(second, beta).ct,
      12,
    );
  });

  it('preserves light lines and the Minkowski interval', () => {
    const beta = 0.83;
    const lightEvent = lorentzTransform({ x: 7, ct: 7 }, beta);
    expect(lightEvent.x).toBeCloseTo(lightEvent.ct, 12);

    const event = { x: -2.3, ct: 7.4 };
    const transformed = lorentzTransform(event, beta);
    expect(minkowskiIntervalSquared(transformed)).toBeCloseTo(
      minkowskiIntervalSquared(event),
      11,
    );
  });
});

describe('double-slit model', () => {
  it('is even in angle, has a unit central maximum and follows the slit envelope', () => {
    for (const u of [0.03, 0.17, 0.41, 0.77]) {
      expect(doubleSlitIntensity(u, 3.2, 1.4)).toBeCloseTo(
        doubleSlitIntensity(-u, 3.2, 1.4),
        14,
      );
    }
    expect(doubleSlitIntensity(0, 4, 1.5)).toBe(1);
    // First single-slit zero: pi*(a/lambda)*u = pi.
    expect(doubleSlitIntensity(0.5, 2.7, 2)).toBeCloseTo(0, 14);
  });

  it('normalizes one sampled curve for rendering and for a discrete CDF', () => {
    const curve = sampleDoubleSlitCurve(3, 0.8, { sampleCount: 401 });
    expect(curve.points).toHaveLength(401);
    expect(Math.max(...curve.points.map((point) => point.intensity))).toBeCloseTo(1, 14);
    expect(curve.points.reduce((sum, point) => sum + point.probability, 0)).toBeCloseTo(
      1,
      14,
    );

    for (let index = 0; index < curve.points.length; index += 1) {
      const reflected = curve.points[curve.points.length - 1 - index];
      expect(curve.points[index].intensity).toBeCloseTo(reflected.intensity, 12);
    }
  });

  it('extracts maxima from the exact curve used by the renderer and sampler', () => {
    const curve = sampleDoubleSlitCurve(2, 0, { sampleCount: 801 });
    const maxima = extractDoubleSlitMaxima(curve);
    expect(maxima.map((point) => point.u)).toEqual([-0.5, 0, 0.5]);
    maxima.forEach((maximum) => {
      expect(maximum).toBe(curve.points[maximum.index]);
      expect(maximum.intensity).toBeGreaterThanOrEqual(
        curve.points[maximum.index - 1].intensity,
      );
      expect(maximum.intensity).toBeGreaterThanOrEqual(
        curve.points[maximum.index + 1].intensity,
      );
    });
  });

  it('samples detection events deterministically from that same distribution', () => {
    const curve = sampleDoubleSlitCurve(2, 0.7, { sampleCount: 401 });
    const first = sampleDoubleSlitDetections(curve, 20_000, 8675309);
    const repeat = sampleDoubleSlitDetections(curve, 20_000, 8675309);
    const otherSeed = sampleDoubleSlitDetections(curve, 20_000, 42);
    expect(repeat).toEqual(first);
    expect(otherSeed.slice(0, 30)).not.toEqual(first.slice(0, 30));

    const meanU = first.reduce((sum, event) => sum + event.u, 0) / first.length;
    expect(Math.abs(meanU)).toBeLessThan(0.015);
    first.forEach((event) => {
      expect(event.u).toBe(curve.points[event.index].u);
      expect(curve.points[event.index].probability).toBeGreaterThan(0);
    });
  });
});
