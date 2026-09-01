import { useEffect, useId, useMemo, useState } from 'react';
import { Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import type { TranslationKey } from '../i18n/strings';
import type { Locale } from '../i18n/types';

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

const pointsToString = (points: Array<[number, number]>) => points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
const formattedControlValue = (mode: LabMode, parameter: number, locale: Locale) => {
  if (mode === 'measure') return `σ ${(parameter / 50).toFixed(2)}`;
  if (mode === 'motion') return `${parameter}°`;
  if (mode === 'wave') return `${(0.6 + parameter / 28).toFixed(1)} ${locale === 'en' ? 'Hz' : 'Гц'}`;
  if (mode === 'field') return `${(parameter / 50).toFixed(1)} q`;
  if (mode === 'relativity') return `${parameter}% c`;
  if (mode === 'quantum') return `d/λ ${(0.7 + parameter / 24).toFixed(2)}`;
  return `e ${(parameter / 100).toFixed(2)}`;
};

export function PhysicsLab({ mode, title, compact = false }: PhysicsLabProps) {
  const { locale, t } = useLocale();
  const [parameter, setParameter] = useState(defaults[mode]);
  const [running, setRunning] = useState(true);
  const rawId = useId();
  const markerId = `arrow-${rawId.replaceAll(':', '')}`;
  const range = ranges[mode];
  const animated = mode === 'motion' || mode === 'wave' || mode === 'quantum' || mode === 'cosmos';
  const controlLabel = t(labelKeys[mode]);
  const controlValue = formattedControlValue(mode, parameter, locale);

  useEffect(() => {
    setParameter(defaults[mode]);
    setRunning(true);
  }, [mode]);

  const output = useMemo(() => {
    if (mode === 'motion') {
      const velocity = 24;
      const angle = parameter * Math.PI / 180;
      const distance = velocity ** 2 * Math.sin(2 * angle) / 9.81;
      const height = velocity ** 2 * Math.sin(angle) ** 2 / (2 * 9.81);
      return t('lab.rangeHeight', { range: distance.toFixed(1), height: height.toFixed(1) });
    }
    if (mode === 'wave') return t('lab.wavelength', { frequency: (0.6 + parameter / 28).toFixed(1), wavelength: (5 / (0.6 + parameter / 28)).toFixed(2) });
    if (mode === 'field') {
      const relation = parameter === -50 ? t('lab.dipole') : parameter < 0 ? t('lab.opposite') : parameter === 0 ? t('lab.single') : t('lab.sameCharges');
      return `q₂ = ${(parameter / 50).toFixed(1)}q · ${relation}`;
    }
    if (mode === 'relativity') {
      const beta = parameter / 100;
      const gamma = 1 / Math.sqrt(1 - beta ** 2);
      return `β = ${beta.toFixed(2)} · γ = ${gamma.toFixed(3)}`;
    }
    if (mode === 'quantum') return `d/λ = ${(0.7 + parameter / 24).toFixed(2)} · ${t('lab.fringes', { count: Math.round(3 + parameter / 13) })}`;
    if (mode === 'cosmos') return `e = ${(parameter / 100).toFixed(2)} · rₐ/rₚ = ${((1 + parameter / 100) / (1 - parameter / 100)).toFixed(2)}`;
    return `σ = ${(parameter / 50).toFixed(2)} · ${parameter < 35 ? t('lab.signalVisible') : t('lab.moreMeasurements')}`;
  }, [mode, parameter, t]);

  return (
    <section className={`physics-lab physics-lab--${mode}${compact ? ' physics-lab--compact' : ''}`} aria-label={title ?? t('lab.defaultTitle')}>
      <div className="lab-head">
        <div>
          <span className="lab-kicker"><Sparkles size={14} /> {t('lab.live')}</span>
          <h3>{title ?? t('lab.defaultTitle')}</h3>
        </div>
        <div className="lab-actions">
          {animated && <button type="button" className="icon-button" onClick={() => setRunning((value) => !value)} aria-label={running ? t('lab.pause') : t('lab.play')}>
            {running ? <Pause size={17} /> : <Play size={17} />}
          </button>}
          <button type="button" className="icon-button" onClick={() => { setParameter(defaults[mode]); setRunning(true); }} aria-label={t('lab.reset')}>
            <RotateCcw size={17} />
          </button>
        </div>
      </div>

      <div className={`lab-stage${running ? ' is-running' : ''}`}>
        <svg viewBox="0 0 560 300" role="img" aria-label={`${locale === 'en' ? 'Visualization' : 'Визуализация'}: ${output}`}>
          <defs>
            <pattern id={`grid-${markerId}`} width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" className="lab-grid-dot" />
            </pattern>
            <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="lab-arrow-head" />
            </marker>
          </defs>
          <rect width="560" height="300" rx="20" fill={`url(#grid-${markerId})`} />
          {mode === 'measure' && <MeasureScene parameter={parameter} />}
          {mode === 'motion' && <MotionScene angle={parameter} running={running} />}
          {mode === 'wave' && <WaveScene parameter={parameter} running={running} />}
          {mode === 'field' && <FieldScene charge={parameter / 50} markerId={markerId} />}
          {mode === 'relativity' && <RelativityScene beta={parameter / 100} />}
          {mode === 'quantum' && <QuantumScene parameter={parameter} running={running} />}
          {mode === 'cosmos' && <CosmosScene eccentricity={parameter / 100} running={running} />}
        </svg>
        <div className="lab-readout" aria-live="polite">
          <span>{t('lab.result')}</span>
          <strong>{output}</strong>
        </div>
      </div>

      <label className="lab-control">
        <span>{controlLabel}</span>
        <input
          type="range"
          min={range.min}
          max={range.max}
          step={range.step}
          value={parameter}
          aria-label={controlLabel}
          aria-valuetext={controlValue}
          onChange={(event) => setParameter(Number(event.target.value))}
        />
        <output>{controlValue}</output>
      </label>
    </section>
  );
}

function MeasureScene({ parameter }: { parameter: number }) {
  const { t } = useLocale();
  const points = Array.from({ length: 16 }, (_, index) => {
    const x = 42 + index * 32;
    const ideal = 156 - Math.sin(index / 2.15) * 54;
    const noise = Math.sin(index * 7.13) * parameter * 0.46 + Math.cos(index * 3.7) * parameter * 0.18;
    return [x, ideal + noise] as [number, number];
  });
  const ideal = Array.from({ length: 80 }, (_, index) => {
    const x = 30 + index * 6.3;
    return [x, 156 - Math.sin((index / 80) * 7.45) * 54] as [number, number];
  });
  return <>
    <line x1="30" y1="244" x2="530" y2="244" className="lab-axis" />
    <line x1="30" y1="42" x2="30" y2="244" className="lab-axis" />
    <polyline points={pointsToString(ideal)} className="lab-line lab-line--muted" />
    {points.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="5" className="lab-point" />)}
    <text x="44" y="65" className="lab-label">{t('lab.measurementsModel')}</text>
  </>;
}

function MotionScene({ angle, running }: { angle: number; running: boolean }) {
  const { locale, t } = useLocale();
  const radians = angle * Math.PI / 180;
  const velocity = 24;
  const physicalRange = velocity ** 2 * Math.sin(2 * radians) / 9.81;
  const points = Array.from({ length: 61 }, (_, index) => {
    const fraction = index / 60;
    const xPhysical = physicalRange * fraction;
    const yPhysical = xPhysical * Math.tan(radians) - 9.81 * xPhysical ** 2 / (2 * velocity ** 2 * Math.cos(radians) ** 2);
    return [42 + fraction * 470, 246 - yPhysical * 5.1] as [number, number];
  });
  return <>
    <line x1="28" y1="246" x2="532" y2="246" className="lab-axis" />
    <polyline points={pointsToString(points)} className="lab-line" />
    <g className={running ? 'lab-projectile is-running' : 'lab-projectile'} style={{ offsetPath: `path('M ${points.map(([x, y]) => `${x} ${y}`).join(' L ')}')` }}>
      <circle r="8" className="lab-orb" />
    </g>
    <path d={`M 42 246 L ${42 + Math.cos(radians) * 66} ${246 - Math.sin(radians) * 66}`} className="lab-vector" />
    <text x="45" y="272" className="lab-label">v₀ = 24 {locale === 'en' ? 'm/s' : 'м/с'}</text>
    <text x="432" y="228" className="lab-label">{t('lab.noAir')}</text>
  </>;
}

function WaveScene({ parameter, running }: { parameter: number; running: boolean }) {
  const { t } = useLocale();
  const cycles = 1.4 + parameter / 24;
  const points = Array.from({ length: 180 }, (_, index) => {
    const x = 24 + index * 2.85;
    const envelope = 0.74 + 0.26 * Math.cos((index / 180) * Math.PI * 2);
    return [x, 150 + Math.sin((index / 180) * Math.PI * 2 * cycles) * 68 * envelope] as [number, number];
  });
  return <>
    <line x1="24" y1="150" x2="536" y2="150" className="lab-axis lab-axis--dashed" />
    <polyline points={pointsToString(points)} className={running ? 'lab-line lab-wave is-running' : 'lab-line lab-wave'} />
    <circle cx="24" cy="150" r="11" className="lab-source" />
    <text x="38" y="54" className="lab-label">{t('lab.displacement')}</text>
    <text x="478" y="178" className="lab-label">x</text>
  </>;
}

function FieldScene({ charge, markerId }: { charge: number; markerId: string }) {
  const { t } = useLocale();
  const charges = [{ x: 196, y: 150, q: 1 }, { x: 364, y: 150, q: charge }];
  const arrows = [];
  for (let y = 55; y <= 245; y += 38) {
    for (let x = 55; x <= 505; x += 45) {
      if (charges.some((point) => Math.hypot(x - point.x, y - point.y) < 38)) continue;
      let ex = 0;
      let ey = 0;
      for (const point of charges) {
        const dx = x - point.x;
        const dy = y - point.y;
        const distance = Math.max(22, Math.hypot(dx, dy));
        ex += point.q * dx / distance ** 3;
        ey += point.q * dy / distance ** 3;
      }
      const magnitude = Math.max(0.00001, Math.hypot(ex, ey));
      const length = 13;
      arrows.push({ x, y, dx: ex / magnitude * length, dy: ey / magnitude * length });
    }
  }
  return <>
    {arrows.map((arrow, index) => <line key={index} x1={arrow.x - arrow.dx / 2} y1={arrow.y - arrow.dy / 2} x2={arrow.x + arrow.dx / 2} y2={arrow.y + arrow.dy / 2} className="lab-field-arrow" markerEnd={`url(#${markerId})`} />)}
    {charges.map((point, index) => <g key={index}>
      <circle cx={point.x} cy={point.y} r="24" className={point.q > 0 ? 'lab-charge lab-charge--plus' : point.q < 0 ? 'lab-charge lab-charge--minus' : 'lab-charge lab-charge--neutral'} />
      <text x={point.x} y={point.y + 6} textAnchor="middle" className="lab-charge-label">{point.q > 0 ? '+' : point.q < 0 ? '−' : '0'}</text>
    </g>)}
    <text x="32" y="42" className="lab-label">{t('lab.fieldDirection')}</text>
  </>;
}

function RelativityScene({ beta }: { beta: number }) {
  const { t } = useLocale();
  const originX = 280;
  const baseY = 258;
  const topY = 36;
  const dx = beta * 180;
  return <>
    <line x1="48" y1={baseY} x2="520" y2={baseY} className="lab-axis" />
    <line x1={originX} y1="276" x2={originX} y2="28" className="lab-axis" />
    <line x1={originX} y1={baseY} x2={originX + 204} y2={topY} className="lab-light-line" />
    <line x1={originX} y1={baseY} x2={originX - 204} y2={topY} className="lab-light-line" />
    <line x1={originX} y1={baseY} x2={originX + dx} y2={topY} className="lab-world-line" />
    {[0.25, 0.5, 0.75].map((fraction) => {
      const y = baseY - fraction * (baseY - topY);
      const tilt = beta * 66;
      return <line key={fraction} x1={85 + tilt * fraction} y1={y + tilt / 4} x2={475 + tilt * fraction} y2={y - tilt / 4} className="lab-simultaneous" />;
    })}
    <text x="290" y="42" className="lab-label">ct</text>
    <text x="505" y="278" className="lab-label">x</text>
    <text x={originX + dx + 8} y="52" className="lab-label">{t('lab.observer')}</text>
  </>;
}

function QuantumScene({ parameter, running }: { parameter: number; running: boolean }) {
  const { t } = useLocale();
  const density = 2.5 + parameter / 19;
  const curve = Array.from({ length: 190 }, (_, index) => {
    const x = 34 + index * 2.58;
    const centered = (index - 95) / 95;
    const envelope = Math.exp(-(centered ** 2) * 3.2);
    const intensity = envelope * Math.cos(centered * density * Math.PI) ** 2;
    return [x, 248 - intensity * 154] as [number, number];
  });
  return <>
    <rect x="73" y="44" width="8" height="212" rx="4" className="lab-screen" />
    <rect x="75" y="113" width="4" height="15" className="lab-slit" />
    <rect x="75" y="174" width="4" height="15" className="lab-slit" />
    <polyline points={pointsToString(curve)} className={running ? 'lab-line lab-quantum is-running' : 'lab-line lab-quantum'} />
    <line x1="31" y1="150" x2="73" y2="150" className="lab-particle-line" />
    <text x="102" y="54" className="lab-label">{t('lab.probability')}</text>
    <text x="28" y="278" className="lab-label">{t('lab.twoSlits')}</text>
  </>;
}

function CosmosScene({ eccentricity, running }: { eccentricity: number; running: boolean }) {
  const { t } = useLocale();
  const [meanAnomaly, setMeanAnomaly] = useState(0);
  const semiMajor = 130;
  const semiMinor = semiMajor * Math.sqrt(1 - eccentricity ** 2);
  const focus = semiMajor * eccentricity;
  let eccentricAnomaly = meanAnomaly;
  for (let iteration = 0; iteration < 7; iteration += 1) {
    eccentricAnomaly -= (eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly) / (1 - eccentricity * Math.cos(eccentricAnomaly));
  }
  const planetX = 280 + semiMajor * Math.cos(eccentricAnomaly);
  const planetY = 150 + semiMinor * Math.sin(eccentricAnomaly);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 50);
      previous = now;
      setMeanAnomaly((value) => (value + elapsed * 0.00075) % (Math.PI * 2));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  return <>
    <ellipse cx="280" cy="150" rx={semiMajor} ry={semiMinor} className="lab-orbit" />
    <circle cx={280 + focus} cy="150" r="19" className="lab-star" />
    <circle cx={planetX} cy={planetY} r="8" className="lab-planet" />
    <line x1={280 + focus} y1="150" x2={planetX} y2={planetY} className="lab-radius" />
    <text x={295 + focus} y="188" className="lab-label">{t('lab.focus')}</text>
    <text x="42" y="42" className="lab-label">{t('lab.orbitLaw')}</text>
  </>;
}
