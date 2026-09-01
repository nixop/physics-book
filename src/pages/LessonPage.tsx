import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Check, CheckCircle2, Clipboard, Copy, Gauge, Lightbulb, Menu, RotateCcw, Ruler, Sparkles, Target } from 'lucide-react';
import { BookSidebar } from '../components/BookSidebar';
import { Math } from '../components/Math';
import { PhysicsLab } from '../components/PhysicsLab';
import { bookMeta } from '../data';
import { implementedLabForTopic, topicBoundary, topicLead, topicQuestion } from '../lib/content';
import { routes } from '../routing';
import { pluralRu } from '../lib/format';
import { useLocale } from '../i18n/LocaleContext';

interface LessonPageProps {
  topicId: string;
  completed: Set<string>;
  bookmarks: Set<string>;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onToggleComplete: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

export function LessonPage({ topicId, completed, bookmarks, sidebarOpen, onToggleSidebar, onOpenSearch, onToggleComplete, onToggleBookmark }: LessonPageProps) {
  const { locale, t, book, findTopic, formulasForTopic, topicNeighbors, levelLabel } = useLocale();
  const topic = findTopic(topicId);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPrediction(null);
    setAnswerOpen(false);
    setCopied(false);
  }, [locale, topicId]);

  if (!topic) return <main className="not-found"><h1>{t('lesson.notFound')}</h1><a href={routes.catalog(locale)}>{t('lesson.back')}</a></main>;
  const chapter = book[topic.chapter];
  const neighbors = topicNeighbors(topic.id);
  const directFormulas = formulasForTopic(topic.id);
  const shownFormulas = directFormulas;
  const implementedLab = implementedLabForTopic(topic.id, locale);
  const isDone = completed.has(topic.id);
  const isBookmarked = bookmarks.has(topic.id);
  const predictionOptions = [t('lesson.decrease'), t('lesson.same'), t('lesson.increase')];
  const quickCheckId = `quick-check-answer-${topic.slug}`;

  const movePrediction = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? predictionOptions.length - 1 : direction ? (index + direction + predictionOptions.length) % predictionOptions.length : -1;
    if (nextIndex < 0) return;
    event.preventDefault();
    setPrediction(predictionOptions[nextIndex]);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[nextIndex]?.focus();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="book-layout lesson-layout">
      <BookSidebar currentChapter={chapter.number} currentTopic={topic.id} completed={completed} open={sidebarOpen} onClose={onToggleSidebar} onOpenSearch={onOpenSearch} />
      <article className="lesson-page book-main">
        <button type="button" className="mobile-sidebar-trigger" onClick={onToggleSidebar}><Menu size={18} /> {t('sidebar.contents')}</button>
        <nav className="breadcrumbs"><a href={routes.catalog(locale)}>{t('lesson.guide')}</a><span>/</span><a href={routes.chapter(chapter.number, locale)}>{t('lesson.section', { number: chapter.number })}</a><span>/</span><span>{topic.id}</span></nav>

        <header className="lesson-header">
          <div className="lesson-header__top">
            <span className={`lesson-index accent-${chapter.accent}`}>{topic.id} · {chapter.title}</span>
            <div className="lesson-actions">
              <button type="button" className={isBookmarked ? 'round-action is-active' : 'round-action'} onClick={() => onToggleBookmark(topic.id)} aria-pressed={isBookmarked} aria-label={isBookmarked ? t('lesson.bookmarkRemove') : t('lesson.bookmarkAdd')}><Bookmark size={19} fill={isBookmarked ? 'currentColor' : 'none'} /></button>
              <button type="button" className="round-action" onClick={copyLink} aria-label={t('lesson.copy')}>{copied ? <Check size={19} /> : <Copy size={19} />}</button>
            </div>
          </div>
          <h1>{topic.title}</h1>
          <p>{topicLead(topic, locale)}</p>
          <div className="lesson-meta">
            <span><Gauge size={16} /> {levelLabel(topic.level)}</span>
            <span><Ruler size={16} /> {locale === 'ru' ? `≈ ${topic.pages} ${pluralRu(topic.pages, ['страница', 'страницы', 'страниц'])}` : t('lesson.pages', { count: topic.pages })}</span>
            <span><Target size={16} /> {locale === 'ru' ? `${topic.minutes} ${pluralRu(topic.minutes, ['минута', 'минуты', 'минут'])}` : t('lesson.minutes', { count: topic.minutes })}</span>
            <span className={`activity-type activity-type--${topic.labKind}`}><Sparkles size={15} /> {topic.labKind === 'mini-lab' ? t('lesson.miniLabType') : topic.labKind === 'project' ? t('lesson.projectType') : t('lesson.modelType')}</span>
          </div>
        </header>

        <section className="learning-goals">
          <div className="learning-goals__icon"><Target size={22} /></div>
          <div><span>{t('lesson.after')}</span><ul>{topic.concepts.slice(0, 4).map((concept) => <li key={concept}><Check size={16} /> {concept}</li>)}</ul></div>
        </section>

        <section id="phenomenon" className="lesson-section">
          <div className="lesson-section__label"><span>01</span> {t('lesson.phenomenon')}</div>
          <h2>{t('lesson.questionFirst')}</h2>
          <p className="lesson-lead">{topicQuestion(topic, locale)}</p>
          {implementedLab && <div className="prediction-card">
            <div><Lightbulb size={21} /><span><strong>{t('lesson.prediction')}</strong><small>{t('lesson.predictionText')}</small></span></div>
            <div className="prediction-options" role="radiogroup" aria-label={t('lesson.predictionGroup')}>
              {predictionOptions.map((option, index) => <button type="button" role="radio" aria-checked={prediction === option} tabIndex={prediction === option || (!prediction && index === 0) ? 0 : -1} className={prediction === option ? 'is-selected' : ''} onClick={() => setPrediction(option)} onKeyDown={(event) => movePrediction(event, index)} key={option}>{option}</button>)}
            </div>
            {prediction && <p className="prediction-feedback">{t('lesson.predictionSaved', { value: prediction })}</p>}
          </div>}
        </section>

        <section id="experiment" className="lesson-section lesson-section--wide">
          <div className="lesson-section__label"><span>02</span> {t('lesson.experiment')}</div>
          <h2>{topic.interactive || t('lesson.experimentFallback')}</h2>
          <p>{t('lesson.briefText')}</p>
          {implementedLab ? <>
            <div className="lab-status lab-status--ready"><CheckCircle2 size={17} /><span><strong>{t('lesson.demoReady')}</strong> {t('lesson.demoReadyText')}</span></div>
            <PhysicsLab key={topic.id} mode={implementedLab.mode} title={implementedLab.title} />
          </> : <div className="experiment-blueprint">
            <div><Sparkles size={22} /><span><strong>{t('lesson.spec')}</strong><small>{t('lesson.notImplemented')}</small></span></div>
            <ol><li>{t('lesson.spec1')}</li><li>{t('lesson.spec2')}</li><li>{t('lesson.spec3')}</li></ol>
            <a className="text-link" href={routes.labs(locale)}>{t('lesson.openLabs')} <ArrowRight size={17} /></a>
          </div>}
        </section>

        <section id="model" className="lesson-section">
          <div className="lesson-section__label"><span>03</span> {t('lesson.thoughtModel')}</div>
          <h2>{t('lesson.keep')}</h2>
          <p>{t('lesson.keepText')}</p>
          <div className="concept-stack">
            {topic.concepts.map((concept, index) => (
              <div className="concept-row" key={concept}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{concept}</strong></div>
              </div>
            ))}
          </div>
        </section>

        <section id="math" className="lesson-section">
          <div className="lesson-section__label"><span>04</span> {t('lesson.math')}</div>
          <h2>{t('lesson.formulaWithConditions')}</h2>
          {shownFormulas.length > 0 ? (
            <div className="lesson-formulas">
              {shownFormulas.map((formula) => (
                <article className="lesson-formula" key={formula.id}>
                  <div className="lesson-formula__main"><small>{t('lesson.referenceFormula')}</small><Math display label={formula.plain}>{formula.latex}</Math><h3>{formula.title}</h3><p>{formula.meaning}</p></div>
                  <div className="lesson-formula__conditions"><span>{t('lesson.worksIf')}</span><p>{formula.conditions}</p><small>{t('lesson.units', { units: formula.units })}</small></div>
                </article>
              ))}
              <a className="text-link" href={routes.formulas(locale)}>{t('lesson.formulaMap')} <ArrowRight size={17} /></a>
            </div>
          ) : (
            <div className="no-formula-callout"><Clipboard size={24} /><div><h3>{t('lesson.reasoning')}</h3><p>{t('lesson.reasoningText')}</p></div></div>
          )}
        </section>

        <section id="limits" className="lesson-section">
          <div className="lesson-section__label"><span>05</span> {t('lesson.limits')}</div>
          <h2>{t('lesson.whenFails')}</h2>
          <div className="boundary-callout">
            <span>!</span>
            <div><p>{topicBoundary(topic, locale)}</p><ul><li>{t('lesson.limit1')}</li><li>{t('lesson.limit2')}</li><li>{t('lesson.limit3')}</li></ul></div>
          </div>
        </section>

        <section id="check" className="lesson-section">
          <div className="lesson-section__label"><span>06</span> {t('lesson.selfCheck')}</div>
          <h2>{t('lesson.explain')}</h2>
          <div className="quick-check">
            <p>{t('lesson.checkQuestion')}</p>
            <button type="button" aria-expanded={answerOpen} aria-controls={quickCheckId} onClick={() => setAnswerOpen((value) => !value)}>{answerOpen ? t('lesson.hideHint') : t('lesson.showHint')} <ArrowRight size={16} /></button>
            <div id={quickCheckId} className="quick-check__answer" hidden={!answerOpen}><strong>{t('lesson.answerGuide')}</strong><p>{t('lesson.answerText', { summary: topic.summary.replace(/\.$/u, '') })}</p></div>
          </div>
        </section>

        <section className={isDone ? 'completion-card is-complete' : 'completion-card'}>
          <div>{isDone ? <CheckCircle2 size={28} /> : <Sparkles size={28} />}<span><strong>{isDone ? t('lesson.passed') : t('lesson.save')}</strong><small>{isDone ? t('lesson.saved') : t('lesson.saveText')}</small></span></div>
          <button type="button" aria-pressed={isDone} className={isDone ? 'button button--secondary' : 'button button--primary'} onClick={() => onToggleComplete(topic.id)}>{isDone ? <><RotateCcw size={17} /> {t('lesson.undo')}</> : <><Check size={18} /> {t('lesson.mark')}</>}</button>
        </section>

        <nav className="page-neighbors lesson-neighbors">
          {neighbors.previous ? <a href={routes.topic(neighbors.previous.id, locale)}><ArrowLeft size={18} /><span><small>{neighbors.previous.id}</small><strong>{neighbors.previous.title}</strong></span></a> : <span />}
          {neighbors.next ? <a href={routes.topic(neighbors.next.id, locale)}><span><small>{neighbors.next.id}</small><strong>{neighbors.next.title}</strong></span><ArrowRight size={18} /></a> : <a href={routes.catalog(locale)}><span><small>{t('lesson.routeComplete')}</small><strong>{t('lesson.toContents')}</strong></span><ArrowRight size={18} /></a>}
        </nav>
      </article>

      <aside className="lesson-outline">
        <strong>{t('lesson.onPage')}</strong>
        <OutlineButton target="phenomenon">{t('lesson.phenomenon')}</OutlineButton>
        <OutlineButton target="experiment">{t('lesson.experiment')}</OutlineButton>
        <OutlineButton target="model">{t('lesson.thoughtModel')}</OutlineButton>
        <OutlineButton target="math">{t('lesson.formula')}</OutlineButton>
        <OutlineButton target="limits">{t('lesson.limits')}</OutlineButton>
        <OutlineButton target="check">{t('lesson.selfCheck')}</OutlineButton>
        <div className="outline-progress"><span>{t('lesson.progress')}</span><strong>{completed.size}/{bookMeta.topicCount}</strong><i><i style={{ width: `${completed.size / bookMeta.topicCount * 100}%` }} /></i></div>
      </aside>
    </main>
  );
}

function OutlineButton({ target, children }: { target: string; children: React.ReactNode }) {
  return <button type="button" onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>{children}</button>;
}
