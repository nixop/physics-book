import { useEffect, useId, useMemo, useState } from 'react';
import { Pause, Play, RefreshCw, RotateCcw, Sparkles } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import type { TranslationKey } from '../i18n/strings';
import type { Locale } from '../i18n/types';
import {
  apoapsisPeriapsisRatio,
  measurementSeries,
  orbitState,
  projectileMetrics,
  projectilePoint,
  projectileTrajectory,
  sampleStandardDeviation,
  signalModel,
  waveDisplacement,
  waveParameters,
} from '../lib/physics/classical';
import {
  ctOnMinkowskiLine,
  electricFieldAt,
  lorentzFactor,
  minkowskiWorldlineEvent,
  normalizeLogMagnitude,
  sampleDoubleSlitCurve,
  sampleDoubleSlitDetections,
  simultaneityLineThroughEvent,
  worldlineX,
} from '../lib/physics/modern';

export type LabMode = 'measure' | 'motion' | 'wave' | 'field' | 'relativity' | 'quantum' | 'cosmos';

interface PhysicsLabProps {
  mode: LabMode;
  title?: string;
  compact?: boolean;
}

const defaults: Record<LabMode, number> = {
  measure: 42,
  motion: 48,
  wave: 44,
  field: -55,
  relativity: 65,
  quantum: 52,
  cosmos: 34,
};

const labelKeys: Record<LabMode, TranslationKey> = {
  measure: 'lab.noise',
  motion: 'lab.angle',
  wave: 'lab.frequency',
  field: 'lab.charge',
  relativity: 'lab.speed',
  quantum: 'lab.slits',
  cosmos: 'lab.eccentricity',
};

const ranges: Record<LabMode, { min: number; max: number; step: number }> = {
  measure: { min: 0, max: 100, step: 1 },
  motion: { min: 15, max: 75, step: 1 },
  wave: { min: 10, max: 90, step: 1 },
  field: { min: -100, max: 100, step: 5 },
  relativity: { min: 5, max: 92, step: 1 },
  quantum: { min: 10, max: 90, step: 1 },
  cosmos: { min: 0, max: 78, step: 1 },
};

const TWO_PI = Math.PI * 2;
const DEFAULT_SAMPLE_COUNT = 16;
const DEFAULT_SAMPLE_SEED = 0x504f4c45;
const DEFAULT_SLIT_WIDTH_OVER_WAVELENGTH = 0.5;
const pointsToString = (points: ReadonlyArray<readonly [number, number]>) => points
  .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
  .join(' ');

const formattedControlValue = (mode: LabMode, parameter: number, locale: Locale) => {
  if (mode === 'measure') return `σ ${(parameter / 50).toFixed(2)}`;
  if (mode === 'motion') return `${parameter}°`;
  if (mode === 'wave') return `${waveParameters(parameter).frequency.toFixed(1)} ${locale === 'en' ? 'Hz' : 'Гц'}`;
  if (mode === 'field') return `${(parameter / 50).toFixed(1)} q`;
  if (mode === 'relativity') return `${parameter}% c`;
  if (mode === 'quantum') return `d/λ ${(0.7 + parameter / 24).toFixed(2)}`;
  return `e ${(parameter / 100).toFixed(2)}`;
};

function useSimulationClock(running: boolean, resetToken: number, rate = 1) {
  const [time, setTime] = useState(0);

  useEffect(() => setTime(0), [resetToken]);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(Math.max(now - previous, 0), 100) / 1000;
      previous = now;
      setTime((value) => value + elapsed * rate);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [rate, resetToken, running]);

  return time;
}

export function PhysicsLab({ mode, title, compact = false }: PhysicsLabProps) {
  const { locale, t } = useLocale();
  const [parameter, setParameter] = useState(defaults[mode]);
  const [running, setRunning] = useState(false);
  const [resetToken, setResetToken] = useState(0);
  const [sampleCount, setSampleCount] = useState(DEFAULT_SAMPLE_COUNT);
  const [sampleSeed, setSampleSeed] = useState(DEFAULT_SAMPLE_SEED);
  const [slitWidthOverLambda, setSlitWidthOverLambda] = useState(DEFAULT_SLIT_WIDTH_OVER_WAVELENGTH);
  const rawId = useId();
  const stableId = rawId.replaceAll(':', '');
  const markerId = `arrow-${stableId}`;
  const plotClipId = `plot-${stableId}`;
  const range = ranges[mode];
  const animated = mode === 'motion' || mode === 'wave' || mode === 'quantum' || mode === 'cosmos';
  const controlLabel = t(labelKeys[mode]);
  const controlValue = formattedControlValue(mode, parameter, locale);
  const resampleLabel = locale === 'en' ? 'Generate a new sample' : 'Создать новую выборку';
  const toggleLabel = running ? t('lab.pause') : t('lab.play');

  useEffect(() => {
    setParameter(defaults[mode]);
    setRunning(false);
    setSampleCount(DEFAULT_SAMPLE_COUNT);
    setSampleSeed(DEFAULT_SAMPLE_SEED);
    setSlitWidthOverLambda(DEFAULT_SLIT_WIDTH_OVER_WAVELENGTH);
    setResetToken((value) => value + 1);
  }, [mode]);

  const output = useMemo(() => {
    if (mode === 'measure') {
      const sigma = parameter / 50;
      const residuals = measurementSeries(sigma, sampleCount, sampleSeed).map((point) => point.noise);
      return `σ = ${sigma.toFixed(2)} · s = ${sampleStandardDeviation(residuals).toFixed(2)} · n = ${sampleCount}`;
    }
    if (mode === 'motion') {
      const metrics = projectileMetrics(24, parameter);
      return locale === 'en'
        ? `R = ${metrics.range.toFixed(1)} m · H = ${metrics.height.toFixed(1)} m · T = ${metrics.flightTime.toFixed(2)} s`
        : `R = ${metrics.range.toFixed(1)} м · H = ${metrics.height.toFixed(1)} м · T = ${metrics.flightTime.toFixed(2)} с`;
    }
    if (mode === 'wave') {
      const parameters = waveParameters(parameter);
      return `f = ${parameters.frequency.toFixed(1)} ${locale === 'en' ? 'Hz' : 'Гц'} · λ = ${parameters.wavelength.toFixed(2)} ${locale === 'en' ? 'm' : 'м'} · v = ${parameters.speed.toFixed(0)} ${locale === 'en' ? 'm/s' : 'м/с'}`;
    }
    if (mode === 'field') {
      const relation = parameter === -50
        ? t('lab.dipole')
        : parameter < 0
          ? t('lab.opposite')
          : parameter === 0
            ? t('lab.single')
            : t('lab.sameCharges');
      return `q₂ = ${(parameter / 50).toFixed(1)}q · ${relation}`;
    }
    if (mode === 'relativity') {
      const beta = parameter / 100;
      return `β = ${beta.toFixed(2)} · γ = ${lorentzFactor(beta).toFixed(3)}`;
    }
    if (mode === 'quantum') return `d/λ = ${(0.7 + parameter / 24).toFixed(2)} · a/λ = ${slitWidthOverLambda.toFixed(2)}`;
    const eccentricity = parameter / 100;
    return `e = ${eccentricity.toFixed(2)} · rₐ/rₚ = ${apoapsisPeriapsisRatio(eccentricity).toFixed(2)}`;
  }, [locale, mode, parameter, sampleCount, sampleSeed, slitWidthOverLambda, t]);

  const reset = () => {
    setParameter(defaults[mode]);
    setRunning(false);
    setSampleCount(DEFAULT_SAMPLE_COUNT);
    setSampleSeed(DEFAULT_SAMPLE_SEED);
    setSlitWidthOverLambda(DEFAULT_SLIT_WIDTH_OVER_WAVELENGTH);
    setResetToken((value) => value + 1);
  };

  const changeParameter = (value: number) => {
    setParameter(value);
    if (mode === 'quantum') setResetToken((token) => token + 1);
  };

  return (
    <section className={`physics-lab physics-lab--${mode}${compact ? ' physics-lab--compact' : ''}`} aria-label={title ?? t('lab.defaultTitle')} data-lab-mode={mode} data-running={running} data-reset-generation={resetToken}>
      <div className="lab-head">
        <div>
          <span className="lab-kicker"><Sparkles size={14} aria-hidden="true" /> {t('lab.live')}</span>
          <h3>{title ?? t('lab.defaultTitle')}</h3>
        </div>
        <div className="lab-actions">
          {mode === 'measure' && <button type="button" className="icon-button" data-lab-action="resample" onClick={() => setSampleSeed((seed) => seed + 1)} aria-label={resampleLabel} title={resampleLabel}>
            <RefreshCw size={17} aria-hidden="true" />
          </button>}
          {animated && <button type="button" className="icon-button" data-lab-action="toggle" aria-pressed={running} onClick={() => setRunning((value) => !value)} aria-label={toggleLabel} title={toggleLabel}>
            {running ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
          </button>}
          <button type="button" className="icon-button" data-lab-action="reset" onClick={reset} aria-label={t('lab.reset')} title={t('lab.reset')}>
            <RotateCcw size={17} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`lab-stage${running ? ' is-running' : ''}`}>
        <svg viewBox="0 0 560 300" role="img" aria-label={`${locale === 'en' ? 'Visualization' : 'Визуализация'}: ${output}`}>
          <defs>
            <pattern id={`grid-${stableId}`} width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" className="lab-grid-dot" /></pattern>
            <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" className="lab-arrow-head" /></marker>
            <clipPath id={plotClipId}><rect x="28" y="28" width="504" height="230" rx="4" /></clipPath>
          </defs>
          <rect width="560" height="300" rx="20" fill={`url(#grid-${stableId})`} />
          {mode === 'measure' && <MeasureScene parameter={parameter} sampleCount={sampleCount} sampleSeed={sampleSeed} plotClipId={plotClipId} />}
          {mode === 'motion' && <MotionScene angle={parameter} running={running} resetToken={resetToken} />}
          {mode === 'wave' && <WaveScene parameter={parameter} running={running} resetToken={resetToken} />}
          {mode === 'field' && <FieldScene charge={parameter / 50} markerId={markerId} />}
          {mode === 'relativity' && <RelativityScene beta={parameter / 100} plotClipId={plotClipId} />}
          {mode === 'quantum' && <QuantumScene parameter={parameter} slitWidthOverLambda={slitWidthOverLambda} running={running} resetToken={resetToken} />}
          {mode === 'cosmos' && <CosmosScene eccentricity={parameter / 100} running={running} resetToken={resetToken} />}
        </svg>
      </div>

      <div className="lab-readout" aria-live="polite"><span>{t('lab.result')}</span><strong>{output}</strong></div>

      <div className="lab-controls">
        <label className="lab-control">
          <span>{controlLabel}</span>
          <input type="range" data-lab-control min={range.min} max={range.max} step={range.step} value={parameter} aria-label={controlLabel} aria-valuetext={controlValue} onChange={(event) => changeParameter(Number(event.target.value))} />
          <output>{controlValue}</output>
        </label>
        {mode === 'measure' && <label className="lab-control lab-control--secondary">
          <span>{locale === 'en' ? 'sample size n' : 'объём выборки n'}</span>
          <input type="range" data-lab-control-secondary="sample-count" min="8" max="128" step="8" value={sampleCount} aria-label={locale === 'en' ? 'Sample size' : 'Объём выборки'} aria-valuetext={`n = ${sampleCount}`} onChange={(event) => setSampleCount(Number(event.target.value))} />
          <output>n {sampleCount}</output>
        </label>}
        {mode === 'quantum' && <label className="lab-control lab-control--secondary">
          <span>{locale === 'en' ? 'slit width a/λ' : 'ширина щели a/λ'}</span>
          <input type="range" data-lab-control-secondary="slit-width" min="0.15" max="1" step="0.05" value={slitWidthOverLambda} aria-label={locale === 'en' ? 'Slit width relative to wavelength' : 'Ширина щели относительно длины волны'} aria-valuetext={`a/λ = ${slitWidthOverLambda.toFixed(2)}`} onChange={(event) => { setSlitWidthOverLambda(Number(event.target.value)); setResetToken((token) => token + 1); }} />
          <output>a/λ {slitWidthOverLambda.toFixed(2)}</output>
        </label>}
      </div>
    </section>
  );
}

function MeasureScene({ parameter, sampleCount, sampleSeed, plotClipId }: { parameter: number; sampleCount: number; sampleSeed: number; plotClipId: string }) {
  const { t } = useLocale();
  const measurements = measurementSeries(parameter / 50, sampleCount, sampleSeed);
  const mapX = (x: number) => 42 + x / TWO_PI * 476;
  const mapY = (value: number) => 150 - value * 23;
  const model = Array.from({ length: 161 }, (_, index) => {
    const x = TWO_PI * index / 160;
    return [mapX(x), mapY(signalModel(x))] as const;
  });

  return <>
    <line x1="30" y1="244" x2="530" y2="244" className="lab-axis" />
    <line x1="30" y1="42" x2="30" y2="244" className="lab-axis" />
    <line x1="30" y1="150" x2="530" y2="150" className="lab-axis lab-axis--dashed" />
    <g clipPath={`url(#${plotClipId})`}>
      <polyline points={pointsToString(model)} className="lab-line lab-line--muted lab-model-curve" />
      {measurements.map((point) => <line key={`residual-${point.index}`} x1={mapX(point.x)} y1={mapY(point.model)} x2={mapX(point.x)} y2={mapY(point.observed)} className="lab-residual" />)}
      {measurements.map((point) => <circle key={point.index} cx={mapX(point.x)} cy={mapY(point.observed)} r={sampleCount <= 32 ? 5 : sampleCount <= 64 ? 3.6 : 2.7} className="lab-point" data-model={point.model.toFixed(8)} data-observed={point.observed.toFixed(8)} data-sample-seed={sampleSeed} />)}
    </g>
    <text x="44" y="65" className="lab-label">{t('lab.measurementsModel')}</text>
    <text x="500" y="263" className="lab-tick">2π</text>
    <text x="13" y="154" className="lab-tick">0</text>
  </>;
}

function MotionScene({ angle, running, resetToken }: { angle: number; running: boolean; resetToken: number }) {
  const { locale, t } = useLocale();
  const time = useSimulationClock(running, resetToken);
  const velocity = 24;
  const metrics = projectileMetrics(velocity, angle);
  const trajectory = projectileTrajectory(velocity, angle, 81);
  const xOrigin = 42;
  const yOrigin = 246;
  const xScale = 7;
  const yScale = 7;
  const mapPoint = (point: { x: number; y: number }) => [xOrigin + point.x * xScale, yOrigin - point.y * yScale] as const;
  const trajectoryPoints = trajectory.map(mapPoint);
  const cycleTime = time % (metrics.flightTime + 0.7);
  const movingPoint = projectilePoint(Math.min(cycleTime, metrics.flightTime), velocity, angle);
  const [projectileX, projectileY] = mapPoint(movingPoint);
  const radians = angle * Math.PI / 180;

  return <>
    <line x1="42" y1="246" x2="497" y2="246" className="lab-axis" data-lab-part="motion-x-axis" data-physical-min-m="0" data-physical-max-m="65" />
    <line x1="42" y1="246" x2="42" y2="36" className="lab-axis" />
    {[20, 40, 60].map((value) => <g key={`x-${value}`}><line x1={xOrigin + value * xScale} y1="242" x2={xOrigin + value * xScale} y2="250" className="lab-axis" /><text x={xOrigin + value * xScale - 7} y="265" className="lab-tick">{value}</text></g>)}
    {[10, 20, 30].map((value) => <g key={`y-${value}`}><line x1="38" y1={yOrigin - value * yScale} x2="46" y2={yOrigin - value * yScale} className="lab-axis" /><text x="12" y={yOrigin - value * yScale + 4} className="lab-tick">{value}</text></g>)}
    <polyline points={pointsToString(trajectoryPoints)} className="lab-line lab-trajectory" data-lab-part="trajectory" data-range-m={metrics.range.toFixed(8)} data-flight-time-s={metrics.flightTime.toFixed(8)} data-end-x={trajectoryPoints.at(-1)?.[0].toFixed(4)} />
    <circle cx={projectileX} cy={projectileY} r="8" className="lab-orb lab-projectile" data-lab-part="projectile" data-time-s={Math.min(cycleTime, metrics.flightTime).toFixed(6)} />
    <path d={`M 42 246 L ${42 + Math.cos(radians) * 66} ${246 - Math.sin(radians) * 66}`} className="lab-vector" />
    <text x="45" y="24" className="lab-label">v₀ = 24 {locale === 'en' ? 'm/s' : 'м/с'}</text>
    <text x="518" y="24" textAnchor="end" className="lab-label">g = {locale === 'en' ? '9.81 m/s²' : '9,81 м/с²'}</text>
    <text x="467" y="227" className="lab-label">x, {locale === 'en' ? 'm' : 'м'}</text>
    <text x="49" y="60" className="lab-label">y, {locale === 'en' ? 'm' : 'м'}</text>
    <text x="518" y="60" textAnchor="end" className="lab-label">{t('lab.noAir')}</text>
  </>;
}

function WaveScene({ parameter, running, resetToken }: { parameter: number; running: boolean; resetToken: number }) {
  const { locale, t } = useLocale();
  const time = useSimulationClock(running, resetToken);
  const parameters = waveParameters(parameter);
  const mapX = (x: number) => 30 + x / parameters.length * 500;
  const points = Array.from({ length: 181 }, (_, index) => {
    const x = parameters.length * index / 180;
    return [mapX(x), 150 - waveDisplacement(x, time, 68, parameters)] as const;
  });
  const sourceY = 150 - waveDisplacement(0, time, 68, parameters);
  const wavelengthEnd = mapX(Math.min(parameters.wavelength, parameters.length));

  return <>
    <line x1="24" y1="150" x2="536" y2="150" className="lab-axis lab-axis--dashed" />
    <polyline points={pointsToString(points)} className="lab-line lab-wave" data-lab-part="wave" data-time-s={time.toFixed(6)} data-frequency-hz={parameters.frequency.toFixed(8)} data-wavelength-m={parameters.wavelength.toFixed(8)} data-window-m={parameters.length} data-speed-mps={parameters.speed} data-cycles={parameters.cycles.toFixed(8)} />
    <circle cx="30" cy={sourceY} r="10" className="lab-source" />
    <line x1="30" y1="239" x2={wavelengthEnd} y2="239" className="lab-wavelength-guide" />
    <line x1="30" y1="234" x2="30" y2="244" className="lab-wavelength-guide" />
    <line x1={wavelengthEnd} y1="234" x2={wavelengthEnd} y2="244" className="lab-wavelength-guide" />
    <text x={(30 + wavelengthEnd) / 2 - 4} y="232" className="lab-tick">λ</text>
    <text x="38" y="54" className="lab-label">{t('lab.displacement')}</text>
    <text x="518" y="278" textAnchor="end" className="lab-label">L = 10 {locale === 'en' ? 'm' : 'м'} · v = 5 {locale === 'en' ? 'm/s' : 'м/с'}</text>
  </>;
}

function FieldScene({ charge, markerId }: { charge: number; markerId: string }) {
  const { locale, t } = useLocale();
  const physicalCharges = [{ x: -1, y: 0, q: 1 }, { x: 1, y: 0, q: charge }] as const;
  const centerX = 280;
  const centerY = 150;
  const scale = 84;
  const samples: Array<{ x: number; y: number; physicalX: number; physicalY: number; magnitude: number; directionX: number; directionY: number }> = [];

  for (let y = 55; y <= 245; y += 38) {
    for (let x = 55; x <= 505; x += 45) {
      const physicalX = (x - centerX) / scale;
      const physicalY = (centerY - y) / scale;
      if (physicalCharges.some((point) => point.q !== 0 && Math.hypot(physicalX - point.x, physicalY - point.y) < 0.34)) continue;
      const field = electricFieldAt(physicalX, physicalY, physicalCharges);
      if (field.singular || !field.direction) continue;
      samples.push({ x, y, physicalX, physicalY, magnitude: field.magnitude, directionX: field.direction.x, directionY: -field.direction.y });
    }
  }

  const magnitudes = samples.map((sample) => sample.magnitude).filter((magnitude) => magnitude > 0);
  const minimumMagnitude = Math.min(...magnitudes);
  const maximumMagnitude = Math.max(...magnitudes);

  return <>
    {samples.map((sample, index) => {
      const strength = maximumMagnitude === minimumMagnitude ? 1 : normalizeLogMagnitude(sample.magnitude, minimumMagnitude, maximumMagnitude);
      const length = 7 + 18 * strength;
      const dx = sample.directionX * length;
      const dy = sample.directionY * length;
      return <line key={index} x1={sample.x - dx / 2} y1={sample.y - dy / 2} x2={sample.x + dx / 2} y2={sample.y + dy / 2} className="lab-field-arrow" data-lab-part="field-vector" markerEnd={`url(#${markerId})`} opacity={0.34 + 0.66 * strength} strokeWidth={1.05 + 0.85 * strength} data-field-x={sample.physicalX.toFixed(3)} data-field-y={sample.physicalY.toFixed(3)} data-magnitude={sample.magnitude.toExponential(6)} data-strength={strength.toFixed(6)} />;
    })}
    {physicalCharges.map((point, index) => {
      const x = centerX + point.x * scale;
      const neutral = point.q === 0;
      return <g key={index} data-lab-part="charge" data-charge-index={index} data-charge={point.q.toFixed(2)} data-field-x={point.x} data-field-y={point.y}>
        <circle cx={x} cy={centerY} r={neutral ? 11 : 24} className={point.q > 0 ? 'lab-charge lab-charge--plus' : point.q < 0 ? 'lab-charge lab-charge--minus' : 'lab-charge lab-charge--neutral'} />
        <text x={x} y={centerY + (neutral ? 4 : 6)} textAnchor="middle" className={neutral ? 'lab-charge-label lab-charge-label--neutral' : 'lab-charge-label'}>{point.q > 0 ? '+' : point.q < 0 ? '−' : '0'}</text>
      </g>;
    })}
    <text x="32" y="42" className="lab-label">{t('lab.fieldDirection')}</text>
    <g className="lab-field-legend">
      <line x1="34" y1="269" x2="44" y2="269" className="lab-field-arrow" markerEnd={`url(#${markerId})`} opacity="0.38" />
      <line x1="58" y1="269" x2="85" y2="269" className="lab-field-arrow" markerEnd={`url(#${markerId})`} />
      <text x="94" y="273" className="lab-tick">|E| · {locale === 'en' ? 'relative to this frame' : 'относительно этого кадра'}</text>
    </g>
  </>;
}

function RelativityScene({ beta, plotClipId }: { beta: number; plotClipId: string }) {
  const { t } = useLocale();
  const originX = 280;
  const baseY = 258;
  const scale = 170;
  const xMin = -1.3;
  const xMax = 1.3;
  const ctTop = 1.25;
  const mapX = (x: number) => originX + x * scale;
  const mapCt = (ct: number) => baseY - ct * scale;
  const observerTopX = worldlineX(beta, ctTop);
  const simultaneityLines = [0.34, 0.68, 1.02].map((ct) => {
    const event = minkowskiWorldlineEvent(beta, ct);
    return { event, line: simultaneityLineThroughEvent(beta, event) };
  });

  return <>
    <line x1={mapX(xMin)} y1={baseY} x2={mapX(xMax)} y2={baseY} className="lab-axis" />
    <line x1={originX} y1="276" x2={originX} y2="28" className="lab-axis" />
    <g clipPath={`url(#${plotClipId})`}>
      <line x1={originX} y1={baseY} x2={mapX(ctTop)} y2={mapCt(ctTop)} className="lab-light-line" data-lab-part="light-line" data-direction="right" data-light-slope="1" />
      <line x1={originX} y1={baseY} x2={mapX(-ctTop)} y2={mapCt(ctTop)} className="lab-light-line" data-lab-part="light-line" data-direction="left" data-light-slope="-1" />
      <line x1={originX} y1={baseY} x2={mapX(observerTopX)} y2={mapCt(ctTop)} className="lab-world-line" data-lab-part="worldline" data-beta={beta.toFixed(6)} />
      {simultaneityLines.map(({ event, line }) => <g key={event.ct}>
        <line x1={mapX(xMin)} y1={mapCt(ctOnMinkowskiLine(line, xMin))} x2={mapX(xMax)} y2={mapCt(ctOnMinkowskiLine(line, xMax))} className="lab-simultaneous" data-lab-part="simultaneity-line" data-slope={line.slope.toFixed(6)} />
        <circle cx={mapX(event.x)} cy={mapCt(event.ct)} r="3.5" className="lab-relativity-event" />
      </g>)}
    </g>
    <text x="290" y="42" className="lab-label">ct</text>
    <text x="512" y="278" className="lab-label">x</text>
    <text x="518" y="52" textAnchor="end" className="lab-label">{t('lab.observer')}</text>
    <text x={mapX(-1) - 6} y="276" className="lab-tick">−1</text>
    <text x={mapX(1) - 3} y="276" className="lab-tick">1</text>
  </>;
}

function QuantumScene({ parameter, slitWidthOverLambda, running, resetToken }: { parameter: number; slitWidthOverLambda: number; running: boolean; resetToken: number }) {
  const { t } = useLocale();
  const time = useSimulationClock(running, resetToken);
  const dOverLambda = 0.7 + parameter / 24;
  const curve = useMemo(() => sampleDoubleSlitCurve(dOverLambda, slitWidthOverLambda, { uMin: -0.9, uMax: 0.9, sampleCount: 241 }), [dOverLambda, slitWidthOverLambda]);
  const detections = useMemo(() => sampleDoubleSlitDetections(curve, 420, 0x51_17 + Math.round(dOverLambda * 1000)), [curve, dOverLambda]);
  const visibleCount = Math.min(detections.length, Math.floor(time * 36));
  const screenX = 486;
  const mapU = (u: number) => 42 + (u - curve.uMin) / (curve.uMax - curve.uMin) * 216;
  const intensityCurve = curve.points.map((point) => [screenX - point.intensity * 112, mapU(point.u)] as const);
  const pixelsPerWavelength = 20;
  const slitSeparation = dOverLambda * pixelsPerWavelength;
  const slitHeight = slitWidthOverLambda * pixelsPerWavelength;
  const pseudoRandom = (index: number) => {
    const value = Math.sin((index + 1) * 12.9898 + parameter * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  return <>
    <circle cx="43" cy="150" r="9" className="lab-source" />
    <line x1="53" y1="150" x2="150" y2={150 - slitSeparation / 2} className="lab-particle-line" />
    <line x1="53" y1="150" x2="150" y2={150 + slitSeparation / 2} className="lab-particle-line" />
    <rect x="150" y="39" width="9" height="222" rx="4" className="lab-screen" />
    <rect x="150" y={150 - slitSeparation / 2 - slitHeight / 2} width="9" height={slitHeight} className="lab-slit" />
    <rect x="150" y={150 + slitSeparation / 2 - slitHeight / 2} width="9" height={slitHeight} className="lab-slit" />
    <line x1={screenX} y1="39" x2={screenX} y2="261" className="lab-detector-screen" />
    <polyline points={pointsToString(intensityCurve)} className="lab-line lab-quantum" data-lab-part="quantum-curve" data-d-over-lambda={dOverLambda.toFixed(8)} data-a-over-lambda={slitWidthOverLambda.toFixed(8)} data-sample-count={curve.points.length} data-pixels-per-lambda={pixelsPerWavelength} data-slit-separation={slitSeparation.toFixed(4)} data-slit-height={slitHeight.toFixed(4)} />
    <g className="lab-detections" data-event-count={visibleCount}>
      {detections.slice(0, visibleCount).map((detection, index) => <circle key={index} cx={screenX + 6 + pseudoRandom(index * 2) * 30} cy={mapU(detection.u) + (pseudoRandom(index * 2 + 1) - 0.5) * 2.4} r="1.45" className="lab-detection-event" data-lab-part="quantum-detection" data-curve-index={detection.index} data-u={detection.u.toFixed(6)} />)}
    </g>
    <text x="522" y="44" textAnchor="end" className="lab-label">{t('lab.probability')} I/I₀</text>
    <text x="28" y="276" className="lab-label">{t('lab.twoSlits')} · d/λ = {dOverLambda.toFixed(2)}</text>
    <text x="522" y="276" textAnchor="end" className="lab-label">N = {visibleCount}</text>
  </>;
}

function CosmosScene({ eccentricity, running, resetToken }: { eccentricity: number; running: boolean; resetToken: number }) {
  const { locale, t } = useLocale();
  const time = useSimulationClock(running, resetToken, 0.75);
  const meanAnomaly = time % TWO_PI;
  const state = orbitState(meanAnomaly, eccentricity);
  const centerX = 280;
  const centerY = 150;
  const semiMajor = 130;
  const semiMinor = semiMajor * state.semiMinorAxis;
  const focusX = centerX - semiMajor * state.focusDistance;
  const planetX = centerX + semiMajor * state.centeredX;
  const planetY = centerY + semiMajor * state.centeredY;
  const sweepPoints = Array.from({ length: 25 }, (_, index) => {
    const sweepState = orbitState(meanAnomaly - 0.32 + 0.32 * index / 24, eccentricity);
    return [centerX + semiMajor * sweepState.centeredX, centerY + semiMajor * sweepState.centeredY] as const;
  });
  const sweepPath = `M ${focusX.toFixed(2)} ${centerY.toFixed(2)} L ${sweepPoints.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(' L ')} Z`;

  return <>
    <ellipse cx={centerX} cy={centerY} rx={semiMajor} ry={semiMinor} className="lab-orbit" data-lab-part="orbit" />
    <path d={sweepPath} className="lab-area-sweep" data-delta-mean-anomaly="0.32" />
    <circle cx={focusX} cy={centerY} r="19" className="lab-star" data-lab-part="star" />
    <circle cx={planetX} cy={planetY} r="8" className="lab-planet" data-lab-part="planet" data-mean-anomaly={meanAnomaly.toFixed(6)} data-radius={state.radius.toFixed(6)} />
    <line x1={focusX} y1={centerY} x2={planetX} y2={planetY} className="lab-radius" />
    <text x={focusX + 15} y="188" className="lab-label">{t('lab.focus')}</text>
    <text x="42" y="42" className="lab-label">{t('lab.orbitLaw')}</text>
    <text x="42" y="276" className="lab-tick">ΔM = 0.32 {locale === 'en' ? 'rad per equal Δt' : 'рад за равные Δt'}</text>
  </>;
}
