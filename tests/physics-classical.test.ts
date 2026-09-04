import { describe, expect, it } from 'vitest';
import {
  DEFAULT_WAVE_LENGTH,
  DEFAULT_WAVE_SPEED,
  apoapsisPeriapsisRatio,
  keplerResidual,
  measurementSeries,
  orbitArealRate,
  orbitState,
  projectileMetrics,
  projectilePoint,
  projectileTrajectory,
  sampleMean,
  sampleStandardDeviation,
  seededStandardNoise,
  signalModel,
  solveKeplerEquation,
  waveDisplacement,
  waveParameters,
} from '../src/lib/physics/classical';

describe('measurement model', () => {
  it('puts every observation exactly on the one shared model when sigma is zero', () => {
    const points = measurementSeries(0, 16, 42);
    for (const point of points) {
      expect(point.model).toBe(signalModel(point.x));
      expect(point.noise).toBe(0);
      expect(point.observed).toBe(point.model);
    }
  });

  it('generates deterministic Gaussian draws without forcing sample statistics', () => {
    const first = seededStandardNoise(50_000, 2026);
    const repeated = seededStandardNoise(50_000, 2026);
    const otherSeed = seededStandardNoise(50_000, 2027);

    expect(repeated).toEqual(first);
    expect(otherSeed).not.toEqual(first);
    expect(Math.abs(sampleMean(first))).toBeLessThan(0.02);
    expect(Math.abs(sampleStandardDeviation(first) - 1)).toBeLessThan(0.02);

    const sigma = 1.7;
    const residuals = measurementSeries(sigma, 50_000, 2026)
      .map((point) => point.observed - point.model);
    expect(Math.abs(sampleMean(residuals))).toBeLessThan(0.04);
    expect(Math.abs(sampleStandardDeviation(residuals) - sigma)).toBeLessThan(0.04);

    const smallSamples = [2026, 2027, 2028].map((seed) => sampleStandardDeviation(measurementSeries(sigma, 16, seed).map((point) => point.noise)));
    expect(new Set(smallSamples.map((value) => value.toFixed(6))).size).toBe(3);
    expect(smallSamples.every((value) => Math.abs(value - sigma) > 1e-8)).toBe(true);
  });
});

describe('ideal projectile motion', () => {
  it('gives complementary angles equal ranges and a maximum at 45 degrees', () => {
    const low = projectileMetrics(24, 15);
    const high = projectileMetrics(24, 75);
    const optimum = projectileMetrics(24, 45);

    expect(low.range).toBeCloseTo(high.range, 12);
    expect(optimum.range).toBeGreaterThan(projectileMetrics(24, 44).range);
    expect(optimum.range).toBeGreaterThan(projectileMetrics(24, 46).range);
    expect(optimum.height).toBeCloseTo(24 ** 2 * 0.5 / (2 * 9.81), 12);
  });

  it('lands at the reported range and time and reaches the reported height', () => {
    for (const angle of [15, 45, 48, 75]) {
      const metrics = projectileMetrics(24, angle);
      const landing = projectilePoint(metrics.flightTime, 24, angle);
      const apex = projectilePoint(metrics.flightTime / 2, 24, angle);

      expect(landing.x).toBeCloseTo(metrics.range, 11);
      expect(landing.y).toBe(0);
      expect(apex.y).toBeCloseTo(metrics.height, 11);
      expect(apex.velocityY).toBe(0);

      const trajectory = projectileTrajectory(24, angle, 101);
      expect(trajectory).toHaveLength(101);
      expect(trajectory[0]).toMatchObject({ t: 0, x: 0, y: 0 });
      expect(trajectory.at(-1)?.t).toBeCloseTo(metrics.flightTime, 12);
      expect(trajectory.at(-1)?.x).toBeCloseTo(metrics.range, 11);
      expect(trajectory.at(-1)?.y).toBe(0);
    }
  });
});

describe('travelling wave', () => {
  it('uses one fixed window and obeys v = f lambda', () => {
    for (const control of [10, 44, 90]) {
      const parameters = waveParameters(control);
      expect(parameters.speed).toBe(DEFAULT_WAVE_SPEED);
      expect(parameters.length).toBe(DEFAULT_WAVE_LENGTH);
      expect(parameters.frequency * parameters.wavelength).toBeCloseTo(DEFAULT_WAVE_SPEED, 14);
      expect(parameters.cycles).toBeCloseTo(parameters.length / parameters.wavelength, 14);
    }
  });

  it('propagates its phase to the right at the declared wave speed', () => {
    for (const control of [10, 44, 90]) {
      const parameters = waveParameters(control);
      for (const [x, t, delta] of [[0.3, 0.1, 0.04], [4.7, 2.1, 0.37], [9.8, 4.2, 1.3]]) {
        const original = waveDisplacement(x, t, 2.3, parameters, 0.27);
        const propagated = waveDisplacement(
          x + parameters.speed * delta,
          t + delta,
          2.3,
          parameters,
          0.27,
        );
        expect(propagated).toBeCloseTo(original, 12);
      }
    }
  });
});

describe('elliptic Kepler motion', () => {
  const eccentricities = [0, 0.3, 0.78, 0.95, 0.999, 0.999999];
  const meanAnomalies = [-4 * Math.PI, -Math.PI, -0.4, -1e-8, 0, 1e-8, 0.4, Math.PI, 4 * Math.PI];

  it('solves Kepler equation over an extreme grid', () => {
    for (const eccentricity of eccentricities) {
      for (const meanAnomaly of meanAnomalies) {
        const eccentricAnomaly = solveKeplerEquation(meanAnomaly, eccentricity);
        expect(Math.abs(keplerResidual(eccentricAnomaly, meanAnomaly, eccentricity))).toBeLessThan(8e-13);
      }
    }
  });

  it('keeps areal velocity constant at every orbital phase', () => {
    for (const eccentricity of eccentricities) {
      const expected = orbitArealRate(3.7, eccentricity, 2.4);
      for (const meanAnomaly of meanAnomalies) {
        const state = orbitState(meanAnomaly, eccentricity, 3.7, 2.4);
        const crossProductRate = Math.abs(
          state.x * state.velocityY - state.y * state.velocityX,
        ) / 2;
        expect(state.arealRate).toBeCloseTo(expected, 12);
        expect(crossProductRate).toBeCloseTo(expected, 10);
        expect(Math.hypot(state.x, state.y)).toBeCloseTo(state.radius, 10);
      }
    }
  });

  it('matches the apoapsis-to-periapsis distance ratio', () => {
    for (const eccentricity of eccentricities) {
      const periapsis = orbitState(0, eccentricity, 7).radius;
      const apoapsis = orbitState(Math.PI, eccentricity, 7).radius;
      expect(apoapsis / periapsis).toBeCloseTo(apoapsisPeriapsisRatio(eccentricity), 9);
    }
  });
});
