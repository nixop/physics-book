import { useEffect, useState } from 'react';
import { AlertTriangle, ArrowLeft, ArrowRight, Bookmark, BookOpenText, Check, CheckCircle2, Clipboard, Copy, Gauge, ListTree, Menu, Network, RotateCcw, Sparkles } from 'lucide-react';
import { BookSidebar } from '../components/BookSidebar';
import { PracticeSet, RichText, StepExample } from '../components/LessonBlocks';
import { Math } from '../components/Math';
import { PhysicsLab } from '../components/PhysicsLab';
import { bookMeta } from '../data/meta.generated';
import { implementedLabForTopic } from '../lib/content';
import { lessonSections, routes, type LessonSection } from '../routing';
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

const focusLessonTarget = (target: string) => {
  const element = document.getElementById(target);
  if (!element) return;
  element.tabIndex = -1;
  element.focus({ preventScroll: true });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
};

export function LessonPage({ topicId, completed, bookmarks, sidebarOpen, onToggleSidebar, onOpenSearch, onToggleComplete, onToggleBookmark }: LessonPageProps) {
  const { locale, t, book, findTopic, formulasForTopic, topicNeighbors, levelLabel, lessonDetailForTopic } = useLocale();
  const topic = findTopic(topicId);
  const detail = topic ? lessonDetailForTopic(topic.id) : undefined;
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<LessonSection>('phenomenon');

  useEffect(() => setCopied(false), [locale, topicId]);
  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.3;
      const visible = lessonSections
        .map((section) => ({ section, element: document.getElementById(section) }))
        .filter((entry): entry is { section: LessonSection; element: HTMLElement } => Boolean(entry.element))
        .filter(({ element }) => element.getBoundingClientRect().top <= marker)
        .at(-1);
      setActiveSection(visible?.section ?? 'phenomenon');
    };
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [topicId]);

  if (!topic) return <main className="not-found"><h1>{t('lesson.notFound')}</h1><a href={routes.catalog(locale)}>{t('lesson.back')}</a></main>;
  if (!detail) return <main className="not-found"><h1>{t('lesson.notFound')}</h1><a href={routes.catalog(locale)}>{t('lesson.back')}</a></main>;

  const chapter = book[topic.chapter];
  const neighbors = topicNeighbors(topic.id);
  const directFormulas = formulasForTopic(topic.id);
  const implementedLab = implementedLabForTopic(topic.id, locale);
  const isDone = completed.has(topic.id);
  const isBookmarked = bookmarks.has(topic.id);
  const relatedIds = [...new Set([
    ...directFormulas.flatMap((formula) => formula.relatedTopics),
    neighbors.previous?.id,
    neighbors.next?.id,
  ].filter((id): id is string => Boolean(id) && id !== topic.id))];
  const relatedTopics = relatedIds.map((id) => findTopic(id)).filter((item) => item !== undefined).slice(0, 6);

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
        <button type="button" className="mobile-sidebar-trigger" aria-expanded={sidebarOpen} aria-controls="book-sidebar" onClick={onToggleSidebar}><Menu size={18} aria-hidden="true" /> {t('sidebar.contents')}</button>
        <nav className="breadcrumbs"><a href={routes.catalog(locale)}>{t('lesson.guide')}</a><span>/</span><a href={routes.chapter(chapter.number, locale)}>{t('lesson.section', { number: chapter.number })}</a><span>/</span><span>{topic.id}</span></nav>

        <header className="lesson-header">
          <div className="lesson-header__top">
            <span className={`lesson-index accent-${chapter.accent}`}>{topic.id} · {chapter.title}</span>
            <div className="lesson-actions">
              <button type="button" className={isBookmarked ? 'round-action is-active' : 'round-action'} onClick={() => onToggleBookmark(topic.id)} aria-pressed={isBookmarked} aria-label={isBookmarked ? t('lesson.bookmarkRemove') : t('lesson.bookmarkAdd')}><Bookmark size={19} fill={isBookmarked ? 'currentColor' : 'none'} aria-hidden="true" /></button>
              <button type="button" className="round-action" onClick={copyLink} aria-label={copied ? t('formulas.copied') : t('lesson.copy')}>{copied ? <Check size={19} aria-hidden="true" /> : <Copy size={19} aria-hidden="true" />}</button>
            </div>
          </div>
          <h1>{topic.title}</h1>
          <p>{detail.question}</p>
          <div className="lesson-meta">
            <span><Gauge size={16} aria-hidden="true" /> {levelLabel(topic.level)}</span>
            <span><BookOpenText size={16} aria-hidden="true" /> {locale === 'ru' ? `${topic.minutes} ${pluralRu(topic.minutes, ['минута', 'минуты', 'минут'])}` : t('lesson.minutes', { count: topic.minutes })}</span>
            <span><ListTree size={16} aria-hidden="true" /> {t('lesson.concepts', { count: topic.concepts.length })}</span>
          </div>
        </header>

        <nav className="lesson-roadmap" aria-label={t('lesson.route')}>
          <div><span>{t('lesson.route')}</span><p>{t('lesson.routeText')}</p></div>
          <ol>{topic.concepts.map((concept, index) => {
            const target = `concept-${topic.slug}-${index + 1}`;
            return <li key={concept}><button type="button" aria-controls={target} onClick={() => focusLessonTarget(target)}><span>{String(index + 1).padStart(2, '0')}</span><span><RichText>{concept}</RichText></span><ArrowRight size={16} aria-hidden="true" /></button></li>;
          })}</ol>
        </nav>

        <section id="phenomenon" className="lesson-section lesson-overview">
          <div className="lesson-section__label"><span>01</span> {t('lesson.phenomenon')}</div>
          <h2>{t('lesson.whyItMatters')}</h2>
          <div className="lesson-prose">{detail.overview.map((paragraph) => <p key={paragraph}><RichText>{paragraph}</RichText></p>)}</div>
        </section>

        <section id="model" className="lesson-section">
          <div className="lesson-section__label"><span>02</span> {t('lesson.explanation')}</div>
          <h2>{t('lesson.fromIdeasToModel')}</h2>
          <div className="concept-explanations">
            {topic.concepts.map((concept, index) => (
              <article id={`concept-${topic.slug}-${index + 1}`} className="concept-explanation" key={concept}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3><RichText>{concept}</RichText></h3><p><RichText>{detail.conceptExplanations[index]}</RichText></p></div>
              </article>
            ))}
          </div>
        </section>

        <section id="experiment" className={implementedLab ? 'lesson-section lesson-section--wide' : 'lesson-section'}>
          <div className="lesson-section__label"><span>03</span> {t('lesson.experiment')}</div>
          <h2>{implementedLab ? implementedLab.title : t('lesson.experimentFallback')}</h2>
          {implementedLab ? <>
            <div className="lab-status lab-status--ready">
              <CheckCircle2 size={19} aria-hidden="true" />
              <span><strong>{t('lesson.demoReady')}</strong>{' '}{t('lesson.demoReadyText')}</span>
            </div>
            <PhysicsLab key={topic.id} mode={implementedLab.mode} title={implementedLab.title} />
          </> : <p>{t('lesson.briefText')}</p>}
          <aside className="experiment-blueprint" aria-labelledby={`experiment-brief-${topic.slug}`}>
            <div>
              <Sparkles size={20} aria-hidden="true" />
              <div>
                <small>{t('lesson.experimentBrief')}</small>
                <strong id={`experiment-brief-${topic.slug}`}>{t('lesson.fullBrief')}</strong>
                <p><RichText>{topic.interactive}</RichText></p>
                <p>{implementedLab ? t('lesson.fullBriefText') : t('lesson.briefOnlyText')}</p>
              </div>
            </div>
          </aside>
        </section>

        <section id="math" className="lesson-section">
          <div className="lesson-section__label"><span>04</span> {t('lesson.math')}</div>
          <h2>{t('lesson.formulaWithConditions')}</h2>
          {directFormulas.length > 0 ? (
            <div className="lesson-formulas">
              {directFormulas.map((formula) => (
                <article className="lesson-formula" key={formula.id}>
                  <div className="lesson-formula__main"><small>{t('lesson.referenceFormula')}</small><Math display label={formula.plain}>{formula.latex}</Math><h3>{formula.title}</h3><p>{formula.meaning}</p></div>
                  <div className="lesson-formula__conditions"><span>{t('lesson.worksIf')}</span><p>{formula.conditions}</p><small>{t('lesson.units', { units: formula.units })}</small></div>
                </article>
              ))}
              <a className="text-link" href={routes.formulas(locale)}>{t('lesson.formulaMap')} <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          ) : (
            <div className="no-formula-callout"><Clipboard size={24} aria-hidden="true" /><div><h3>{t('lesson.reasoning')}</h3><p>{t('lesson.reasoningText')}</p></div></div>
          )}
        </section>

        <section id="example" className="lesson-section">
          <div className="lesson-section__label"><span>05</span> {t('lesson.workedExample')}</div>
          <h2>{t('lesson.workedExample')}</h2>
          <StepExample key={`${locale}-${topic.id}`} example={detail.example} />
        </section>

        <section id="limits" className="lesson-section">
          <div className="lesson-section__label"><span>06</span> {t('lesson.limits')}</div>
          <h2>{t('lesson.whenFails')}</h2>
          <div className="boundary-callout"><span>!</span><div><p><RichText>{detail.boundary}</RichText></p></div></div>
          <aside className="pitfall-card"><AlertTriangle size={22} aria-hidden="true" /><div><strong>{t('lesson.commonMistake')}</strong><p><RichText>{detail.pitfall}</RichText></p></div></aside>
        </section>

        <section id="practice" className="lesson-section">
          <div className="lesson-section__label"><span>07</span> {t('lesson.practice')}</div>
          <h2>{t('lesson.practice')}</h2>
          <p>{t('lesson.practiceText')}</p>
          <PracticeSet key={`${locale}-${topic.id}`} items={detail.practice} />
        </section>

        <section id="connections" className="lesson-section">
          <div className="lesson-section__label"><span>08</span> {t('lesson.related')}</div>
          <h2>{t('lesson.related')}</h2>
          <p>{t('lesson.relatedText')}</p>
          <div className="related-topic-grid">
            {relatedTopics.map((related) => <a href={routes.topic(related.id, locale)} key={related.id}><Network size={18} aria-hidden="true" /><span><small>{related.id} · {book[related.chapter].title}</small><strong>{related.title}</strong></span><ArrowRight size={17} aria-hidden="true" /></a>)}
          </div>
        </section>

        <section className={isDone ? 'completion-card is-complete' : 'completion-card'}>
          <div>{isDone ? <CheckCircle2 size={28} aria-hidden="true" /> : <Sparkles size={28} aria-hidden="true" />}<span><strong>{isDone ? t('lesson.passed') : t('lesson.save')}</strong><small>{isDone ? t('lesson.saved') : t('lesson.saveText')}</small></span></div>
          <button type="button" aria-pressed={isDone} className={isDone ? 'button button--secondary' : 'button button--primary'} onClick={() => onToggleComplete(topic.id)}>{isDone ? <><RotateCcw size={17} aria-hidden="true" /> {t('lesson.undo')}</> : <><Check size={18} aria-hidden="true" /> {t('lesson.mark')}</>}</button>
        </section>

        <nav className="page-neighbors lesson-neighbors">
          {neighbors.previous ? <a href={routes.topic(neighbors.previous.id, locale)}><ArrowLeft size={18} aria-hidden="true" /><span><small>{neighbors.previous.id}</small><strong>{neighbors.previous.title}</strong></span></a> : <span />}
          {neighbors.next ? <a href={routes.topic(neighbors.next.id, locale)}><span><small>{neighbors.next.id}</small><strong>{neighbors.next.title}</strong></span><ArrowRight size={18} aria-hidden="true" /></a> : <a href={routes.catalog(locale)}><span><small>{t('lesson.routeComplete')}</small><strong>{t('lesson.toContents')}</strong></span><ArrowRight size={18} aria-hidden="true" /></a>}
        </nav>
      </article>

      <aside className="lesson-outline">
        <strong>{t('lesson.onPage')}</strong>
        <OutlineLink target="phenomenon" topicId={topic.id} locale={locale} active={activeSection === 'phenomenon'}>{t('lesson.phenomenon')}</OutlineLink>
        <OutlineLink target="model" topicId={topic.id} locale={locale} active={activeSection === 'model'}>{t('lesson.explanation')}</OutlineLink>
        <OutlineLink target="experiment" topicId={topic.id} locale={locale} active={activeSection === 'experiment'}>{t('lesson.experiment')}</OutlineLink>
        <OutlineLink target="math" topicId={topic.id} locale={locale} active={activeSection === 'math'}>{t('lesson.formula')}</OutlineLink>
        <OutlineLink target="example" topicId={topic.id} locale={locale} active={activeSection === 'example'}>{t('lesson.workedExample')}</OutlineLink>
        <OutlineLink target="limits" topicId={topic.id} locale={locale} active={activeSection === 'limits'}>{t('lesson.limits')}</OutlineLink>
        <OutlineLink target="practice" topicId={topic.id} locale={locale} active={activeSection === 'practice'}>{t('lesson.practice')}</OutlineLink>
        <OutlineLink target="connections" topicId={topic.id} locale={locale} active={activeSection === 'connections'}>{t('lesson.related')}</OutlineLink>
        <div className="outline-progress"><span>{t('lesson.progress')}</span><strong>{completed.size}/{bookMeta.topicCount}</strong><i><i style={{ width: `${completed.size / bookMeta.topicCount * 100}%` }} /></i></div>
      </aside>
    </main>
  );
}

function OutlineLink({ target, topicId, locale, active, children }: { target: LessonSection; topicId: string; locale: 'ru' | 'en'; active: boolean; children: React.ReactNode }) {
  const href = routes.topic(topicId, locale, target);
  return <a href={href} aria-current={active ? 'location' : undefined} onClick={(event) => {
    if (window.location.hash !== href) return;
    event.preventDefault();
    focusLessonTarget(target);
  }}>{children}</a>;
}
