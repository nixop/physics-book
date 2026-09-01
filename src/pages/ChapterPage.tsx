import { ArrowLeft, ArrowRight, BookOpen, Check, Clock3, Menu, Sparkles } from 'lucide-react';
import { BookSidebar } from '../components/BookSidebar';
import { Math } from '../components/Math';
import { PhysicsLab } from '../components/PhysicsLab';
import { chapterGuide, implementedLabForChapter } from '../lib/content';
import { routes } from '../routing';
import { useLocale } from '../i18n/LocaleContext';

interface ChapterPageProps {
  chapterNumber: number;
  completed: Set<string>;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
}

export function ChapterPage({ chapterNumber, completed, sidebarOpen, onToggleSidebar, onOpenSearch }: ChapterPageProps) {
  const { locale, t, book, findChapter, formulas } = useLocale();
  const chapter = findChapter(chapterNumber);
  if (!chapter) return <main className="not-found"><h1>{t('chapter.notFound')}</h1><a href={routes.catalog(locale)}>{t('chapter.back')}</a></main>;
  const guide = chapterGuide(chapter, locale);
  const chapterFormulas = formulas.filter((formula) => formula.chapter === chapter.number);
  const done = chapter.topics.filter((topic) => completed.has(topic.id)).length;
  const previous = book[chapter.number - 1];
  const next = book[chapter.number + 1];
  const demoLab = implementedLabForChapter(chapter.number, locale);

  return (
    <main className="book-layout">
      <BookSidebar currentChapter={chapter.number} completed={completed} open={sidebarOpen} onClose={onToggleSidebar} onOpenSearch={onOpenSearch} />
      <article className="chapter-page book-main">
        <button type="button" className="mobile-sidebar-trigger" onClick={onToggleSidebar}><Menu size={18} /> {t('sidebar.contents')}</button>
        <nav className="breadcrumbs"><a href={routes.catalog(locale)}>{t('chapter.guide')}</a><span>/</span><span>{t('chapter.section', { number: chapter.number })}</span></nav>
        <header className={`chapter-hero accent-${chapter.accent}`}>
          <div className="chapter-hero__index"><span>{String(chapter.number).padStart(2, '0')}</span><small>{guide.eyebrow}</small></div>
          <div className="chapter-hero__copy"><h1>{chapter.title}</h1><p>{guide.lead}</p></div>
          <div className="chapter-hero__stats"><div><strong>{chapter.topics.length}</strong><span>{t('chapter.cards')}</span></div><div><strong>{chapter.pages}</strong><span>{t('chapter.pages')}</span></div><div><strong>{done}/{chapter.topics.length}</strong><span>{t('chapter.completed')}</span></div></div>
          <div className="chapter-progress"><span style={{ width: `${done / chapter.topics.length * 100}%` }} /></div>
        </header>

        <section className="chapter-question">
          <span><Sparkles size={18} /></span>
          <div><small>{t('chapter.mainQuestion')}</small><h2>{guide.question}</h2></div>
        </section>

        <section className="chapter-topics-section">
          <div className="content-heading"><span>{t('chapter.route')}</span><h2>{t('chapter.cardsTitle')}</h2><p>{t('chapter.cardsText')}</p></div>
          <div className="chapter-topic-list">
            {chapter.topics.map((topic, index) => (
              <a className={completed.has(topic.id) ? 'chapter-topic-row is-complete' : 'chapter-topic-row'} href={routes.topic(topic.id, locale)} key={topic.id}>
                <span className="chapter-topic-row__number">{topic.id}</span>
                <span className="chapter-topic-row__copy"><small>{t('chapter.step', { number: index + 1 })}</small><strong>{topic.title}</strong><p>{topic.summary}</p></span>
                <span className="chapter-topic-row__meta"><span><Clock3 size={14} /> {t('chapter.minutes', { count: topic.minutes })}</span>{completed.has(topic.id) ? <Check size={19} /> : <ArrowRight size={19} />}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="chapter-preview-grid">
          <div className="chapter-formula-card">
            <span>{t('chapter.reference')}</span>
            {chapterFormulas[0] ? <><Math display>{chapterFormulas[0].latex}</Math><h3>{chapterFormulas[0].title}</h3><p>{chapterFormulas[0].meaning}</p><a href={routes.formulas(locale)}>{t('chapter.conditions')} <ArrowRight size={16} /></a></> : <><BookOpen size={30} /><h3>{t('chapter.formulaFollows')}</h3><p>{t('chapter.formulaFollowsText')}</p></>}
          </div>
          <div className="chapter-boundary-card"><small>{t('chapter.limit')}</small><h3>{t('chapter.whereStop')}</h3><p>{guide.boundary}</p></div>
        </section>

        <section className="chapter-lab-section">
          <div className="content-heading"><span>{t('chapter.try')}</span><h2>{t('chapter.liveModel')}</h2></div>
          {demoLab ? <PhysicsLab key={chapter.number} mode={demoLab.mode} title={demoLab.title} /> : <div className="chapter-lab-placeholder"><Sparkles size={24} /><div><h3>{t('chapter.briefsReady')}</h3><p>{t('chapter.briefsText')}</p><a className="text-link" href={routes.labs(locale)}>{t('chapter.goLabs')} <ArrowRight size={17} /></a></div></div>}
        </section>

        <nav className="page-neighbors">
          {previous ? <a href={routes.chapter(previous.number, locale)}><ArrowLeft size={18} /><span><small>{t('chapter.previous')}</small><strong>{previous.title}</strong></span></a> : <span />}
          {next ? <a href={routes.chapter(next.number, locale)}><span><small>{t('chapter.next')}</small><strong>{next.title}</strong></span><ArrowRight size={18} /></a> : <a href={routes.catalog(locale)}><span><small>{t('chapter.routeComplete')}</small><strong>{t('chapter.backMap')}</strong></span><ArrowRight size={18} /></a>}
        </nav>
      </article>
    </main>
  );
}
