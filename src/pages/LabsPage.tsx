import { useMemo, useState } from 'react';
import { ArrowRight, Atom, BarChart3, CircleDot, FlaskConical, Gauge, Orbit, Play, Sparkles, Waves } from 'lucide-react';
import { PhysicsLab, type LabMode } from '../components/PhysicsLab';
import { implementedLabForTopic } from '../lib/content';
import { routes } from '../routing';
import { useLocale } from '../i18n/LocaleContext';
import type { TranslationKey } from '../i18n/strings';

const labDefinitions: Array<{ mode: LabMode; title: TranslationKey; subtitle: TranslationKey; prompt: TranslationKey; topic: string; icon: typeof Orbit }> = [
  { mode: 'measure', title: 'labs.dataTitle', subtitle: 'labs.dataSubtitle', prompt: 'labs.dataPrompt', topic: '1.3', icon: BarChart3 },
  { mode: 'motion', title: 'labs.motionTitle', subtitle: 'labs.motionSubtitle', prompt: 'labs.motionPrompt', topic: '2.5', icon: Orbit },
  { mode: 'wave', title: 'labs.waveTitle', subtitle: 'labs.waveSubtitle', prompt: 'labs.wavePrompt', topic: '7.4', icon: Waves },
  { mode: 'field', title: 'labs.fieldTitle', subtitle: 'labs.fieldSubtitle', prompt: 'labs.fieldPrompt', topic: '9.2', icon: CircleDot },
  { mode: 'relativity', title: 'labs.relativityTitle', subtitle: 'labs.relativitySubtitle', prompt: 'labs.relativityPrompt', topic: '12.4', icon: Gauge },
  { mode: 'quantum', title: 'labs.quantumTitle', subtitle: 'labs.quantumSubtitle', prompt: 'labs.quantumPrompt', topic: '13.2', icon: Atom },
  { mode: 'cosmos', title: 'labs.cosmosTitle', subtitle: 'labs.cosmosSubtitle', prompt: 'labs.cosmosPrompt', topic: '5.2', icon: Orbit },
];

export function LabsPage() {
  const { locale, t, allTopics } = useLocale();
  const labs = useMemo(() => labDefinitions.map((lab) => ({ ...lab, title: t(lab.title), subtitle: t(lab.subtitle), prompt: t(lab.prompt) })), [t]);
  const [activeMode, setActiveMode] = useState<LabMode>('motion');
  const current = labs.find((lab) => lab.mode === activeMode) ?? labs[1];
  const currentModel = implementedLabForTopic(current.topic, locale);
  const activityCounts = useMemo(() => ({
    plannedBriefs: allTopics.filter((topic) => topic.labKind === 'interactive').length,
    miniLab: allTopics.filter((topic) => topic.labKind === 'mini-lab').length,
    project: allTopics.filter((topic) => topic.labKind === 'project').length,
  }), []);

  const moveTab = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const delta = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? labs.length - 1 : (index + delta + labs.length) % labs.length;
    setActiveMode(labs[nextIndex].mode);
    document.getElementById(`lab-tab-${labs[nextIndex].mode}`)?.focus();
  };

  return (
    <main className="labs-page">
      <section className="labs-hero page-width">
        <div><span className="eyebrow-pill"><FlaskConical size={15} /> {t('labs.eyebrow')}</span><h1>{t('labs.titleA')}<br /><em>{t('labs.titleEm')}</em> {t('labs.titleB')}</h1><p>{t('labs.subtitle')}</p></div>
        <div className="labs-hero__stats"><div><strong>{labs.length}</strong><span>{t('labs.liveModels')}</span></div><div><strong>{activityCounts.miniLab}</strong><span><Lines text={t('labs.miniLabs')} /></span></div><div><strong>{activityCounts.plannedBriefs}</strong><span><Lines text={t('labs.briefs')} /></span></div></div>
      </section>

      <section className="lab-workbench page-width">
        <div className="lab-tabs" role="tablist" aria-label={t('labs.choose')}>
          {labs.map(({ mode, title, subtitle, icon: Icon }, index) => <button id={`lab-tab-${mode}`} type="button" role="tab" aria-selected={activeMode === mode} aria-controls="lab-panel" tabIndex={activeMode === mode ? 0 : -1} className={activeMode === mode ? 'is-active' : ''} onClick={() => setActiveMode(mode)} onKeyDown={(event) => moveTab(event, index)} key={mode}><span><Icon size={18} /></span><span><small>{subtitle}</small><strong>{title}</strong></span></button>)}
        </div>
        <div id="lab-panel" className="lab-workbench__main" role="tabpanel" aria-labelledby={`lab-tab-${activeMode}`}>
          <div className="lab-brief">
            <span className="section-index">{t('labs.question')}</span>
            <h2>{current.prompt}</h2>
            <p>{t('labs.methodNote')}</p>
            <ol><li><span>1</span>{t('labs.step1')}</li><li><span>2</span>{t('labs.step2')}</li><li><span>3</span>{t('labs.step3')}</li><li><span>4</span>{t('labs.step4')}</li></ol>
            <a className="text-link" href={routes.topic(current.topic, locale)}>{t('labs.related')} <ArrowRight size={17} /></a>
          </div>
          <PhysicsLab key={current.mode} mode={current.mode} title={currentModel?.title ?? current.title} />
        </div>
      </section>

      <section className="home-section page-width lab-method-section">
        <div className="section-heading"><span className="section-index">{t('labs.cycle')}</span><h2><Lines text={t('labs.cycleTitle')} /></h2></div>
        <div className="lab-cycle">
          {[['01', t('labs.predict'), t('labs.predictText')], ['02', t('labs.measure'), t('labs.measureText')], ['03', t('labs.compare'), t('labs.compareText')], ['04', t('labs.explain'), t('labs.explainText')]].map(([number, title, text]) => <article key={number}><span>{number}</span><Play size={18} /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="home-section lab-registry">
        <div className="page-width">
          <div className="section-heading section-heading--split"><div><span className="section-index">{t('labs.editorial')}</span><h2><Lines text={t('labs.allBound')} /></h2></div><p>{t('labs.editorialText')}</p></div>
          <div className="registry-cards">
            <div><Sparkles /><strong>{activityCounts.plannedBriefs}</strong><span>{t('labs.plannedBriefsLabel')}</span><p>{t('labs.plannedBriefsText')}</p></div>
            <div><FlaskConical /><strong>{activityCounts.miniLab}</strong><span>{t('labs.miniLabsLabel')}</span><p>{t('labs.miniLabsText')}</p></div>
            <div><Atom /><strong>{activityCounts.project}</strong><span>{t('labs.project')}</span><p>{t('labs.projectText')}</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Lines({ text }: { text: string }) {
  return <>{text.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</>;
}
