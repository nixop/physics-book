import { useId, useState, type ReactNode } from 'react';
import { Check, ChevronDown, ChevronRight, ChevronUp, RotateCcw } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import type { LessonPractice, TopicLessonDetail } from '../types';
import { Math } from './Math';

export function RichText({ children }: { children: string }) {
  const parts = children.split(/(`[^`]+`|\$[^$\n]+\$)/gu);
  return <>{parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) return <code key={`${index}-${part}`}>{part.slice(1, -1)}</code>;
    if (part.startsWith('$') && part.endsWith('$')) return <Math key={`${index}-${part}`} label={part.slice(1, -1)}>{part.slice(1, -1)}</Math>;
    return <span key={`${index}-${part}`}>{part}</span>;
  })}</>;
}

export function StepExample({ example }: { example: TopicLessonDetail['example'] }) {
  const { t } = useLocale();
  const [visibleSteps, setVisibleSteps] = useState(0);
  const panelId = useId();
  const complete = visibleSteps === example.steps.length;
  const renderedSteps = example.steps.slice(0, complete ? example.steps.length : visibleSteps + 1);

  return (
    <article className="worked-example">
      <header>
        <span>{t('lesson.workedExample')}</span>
        <h3>{example.title}</h3>
      </header>
      <div className="worked-example__problem"><strong>{t('lesson.problem')}</strong><p><RichText>{example.problem}</RichText></p></div>
      <div className="worked-example__steps" id={panelId} aria-live="polite" data-total-steps={example.steps.length} data-visible-steps={visibleSteps}>
        <span>{t('lesson.solutionSteps')} <i>{visibleSteps}/{example.steps.length}</i></span>
        <ol>
          {renderedSteps.map((step, index) => (
            <li className={index < visibleSteps ? 'is-visible' : ''} key={`${index}-${step}`}>
              <i>{index < visibleSteps ? <Check size={15} aria-hidden="true" /> : index + 1}</i>
              <p>{index < visibleSteps ? <RichText>{step}</RichText> : t('lesson.stepHidden')}</p>
            </li>
          ))}
        </ol>
      </div>
      {complete && <div className="worked-example__result">
        <div><span>{t('lesson.answer')}</span><strong><RichText>{example.answer}</RichText></strong></div>
        <p><span>{t('lesson.resultCheck')}</span><RichText>{example.check}</RichText></p>
      </div>}
      <button type="button" aria-controls={panelId} onClick={() => setVisibleSteps(complete ? 0 : visibleSteps + 1)}>
        {complete ? <><RotateCcw size={16} aria-hidden="true" /> {t('lesson.restartExample')}</> : <>{visibleSteps === 0 ? t('lesson.showFirstStep') : t('lesson.showNextStep')} <ChevronRight size={16} aria-hidden="true" /></>}
      </button>
    </article>
  );
}

function Reveal({ label, hideLabel, children }: { label: string; hideLabel: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const rawId = useId();
  const panelId = `${rawId.replaceAll(':', '')}-panel`;
  return <div className={`lesson-reveal${open ? ' is-open' : ''}`}>
    <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
      {open ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
      {open ? hideLabel : label}
    </button>
    <div id={panelId} hidden={!open}>{children}</div>
  </div>;
}

function PracticeCard({ item, index }: { item: LessonPractice; index: number }) {
  const { t } = useLocale();
  return <article className="practice-card">
    <span>{String(index + 1).padStart(2, '0')}</span>
    <h3><RichText>{item.question}</RichText></h3>
    <div className="practice-card__reveals">
      <Reveal label={t('lesson.showHint')} hideLabel={t('lesson.hideHint')}>
        <strong>{t('lesson.hint')}</strong>
        <p><RichText>{item.hint}</RichText></p>
      </Reveal>
      <Reveal label={t('lesson.showAnswer')} hideLabel={t('lesson.hideAnswer')}>
        <strong>{t('lesson.answer')}</strong>
        <p><RichText>{item.answer}</RichText></p>
      </Reveal>
    </div>
  </article>;
}

export function PracticeSet({ items }: { items: TopicLessonDetail['practice'] }) {
  return <div className="practice-grid">
    {items.map((item, index) => <PracticeCard item={item} index={index} key={`${index}-${item.question}`} />)}
  </div>;
}
