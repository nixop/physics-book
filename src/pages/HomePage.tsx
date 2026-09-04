import { ArrowRight, Atom, BookOpen, CheckCircle2, Eye, FlaskConical, LineChart, Network, Orbit, SlidersHorizontal, Sparkles, Waves } from 'lucide-react';
import { bookMeta } from '../data/meta.generated';
import { routes } from '../routing';
import { PhysicsLab } from '../components/PhysicsLab';
import { pluralRu } from '../lib/format';
import { useLocale } from '../i18n/LocaleContext';
import type { TranslationKey } from '../i18n/strings';
import type { ChapterGroup } from '../types';

interface HomePageProps {
  completed: Set<string>;
}

const principles = [
  { icon: Eye, title: 'home.observe', text: 'home.observeText' },
  { icon: SlidersHorizontal, title: 'home.change', text: 'home.changeText' },
  { icon: LineChart, title: 'home.connect', text: 'home.connectText' },
  { icon: CheckCircle2, title: 'home.verify', text: 'home.verifyText' },
];

const featuredIds = ['2.5', '4.4', '7.3', '9.8', '12.2', '13.2'];

export function HomePage({ completed }: HomePageProps) {
  const { locale, t, allTopics, book, chaptersByGroup, groupLabel, levelLabel } = useLocale();
  const resumeTopic = allTopics.find((topic) => !completed.has(topic.id)) ?? allTopics[0];
  const routeComplete = completed.size === allTopics.length;
  const featured = featuredIds.map((id) => allTopics.find((topic) => topic.id === id)).filter(Boolean) as typeof allTopics;

  return (
    <main className="home-page">
      <section className="home-hero page-width">
        <div className="hero-copy">
          <span className="eyebrow-pill"><Sparkles size={15} /> {t('home.eyebrow')}</span>
          <h1>{t('home.titleA')}<br /><em>{t('home.titleEm')}</em> {t('home.titleB')}</h1>
          <p>{t('home.subtitle')}</p>
          <div className="hero-actions">
            <a className="button button--primary" href={routeComplete ? routes.catalog(locale) : routes.topic(resumeTopic.id, locale)}>{routeComplete ? t('home.complete') : completed.size ? t('home.continue') : t('home.start')} <ArrowRight size={18} /></a>
            <a className="button button--secondary" href={routes.catalog(locale)}><BookOpen size={18} /> {t('home.openContents')}</a>
          </div>
          <div className="hero-stats" aria-label={t('home.statsLabel')}>
            <div><strong>{bookMeta.chapterCount}</strong><span>{t('home.chapters')}</span></div>
            <div><strong>{bookMeta.topicCount}</strong><span>{t('home.cards')}</span></div>
            <div><strong>{bookMeta.pages}</strong><span>{t('home.pages')}</span></div>
          </div>
        </div>
        <div className="hero-lab-wrap">
          <PhysicsLab mode="cosmos" compact title={t('home.heroLab')} />
          <div className="hero-lab-note"><Orbit size={16} /><span>{t('home.heroNote')}</span></div>
        </div>
      </section>

      <section className="principle-strip" aria-label={t('home.learningCycle')}>
        <div className="page-width principle-strip__inner">
          {principles.map(({ icon: Icon, title, text }) => <div key={title}><Icon size={19} /><span><strong>{t(title as TranslationKey)}</strong><small>{t(text as TranslationKey)}</small></span></div>)}
        </div>
      </section>

      <section className="home-section page-width home-intro">
        <div className="section-heading section-heading--split">
          <div><span className="section-index">{t('home.methodIndex')}</span><h2><Lines text={t('home.methodTitle')} /></h2></div>
          <p>{t('home.methodText')}</p>
        </div>
        <div className="method-grid">
          <article className="method-card method-card--question"><span>01</span><Eye /><h3>{t('home.ask')}</h3><p>{t('home.askText')}</p></article>
          <article className="method-card method-card--model"><span>02</span><Network /><h3>{t('home.model')}</h3><p>{t('home.modelText')}</p></article>
          <article className="method-card method-card--experiment"><span>03</span><FlaskConical /><h3>{t('home.testLimit')}</h3><p>{t('home.testLimitText')}</p></article>
        </div>
      </section>

      <section className="home-section home-roadmap">
        <div className="page-width">
          <div className="section-heading">
            <span className="section-index">{t('home.routeIndex')}</span>
            <h2><Lines text={t('home.routeTitle')} /></h2>
            <p>{t('home.routeText')}</p>
          </div>
          <div className="roadmap-groups">
            {Object.entries(chaptersByGroup).map(([group, chapters], groupIndex) => (
              <div className="roadmap-group" key={group}>
                <div className="roadmap-group__label"><span>{String(groupIndex + 1).padStart(2, '0')}</span><strong>{groupLabel(group as ChapterGroup)}</strong>{(() => { const count = chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0); return <small>{count} {locale === 'ru' ? pluralRu(count, ['карточка', 'карточки', 'карточек']) : count === 1 ? 'card' : 'cards'}</small>; })()}</div>
                <div className="roadmap-group__chapters">
                  {chapters.map((chapter) => <a className={`roadmap-chapter accent-${chapter.accent}`} href={routes.chapter(chapter.number, locale)} key={chapter.number}><span>{chapter.number}</span><strong>{chapter.title}</strong><ArrowRight size={16} /></a>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section page-width">
        <div className="section-heading section-heading--split">
          <div><span className="section-index">{t('home.quickIndex')}</span><h2><Lines text={t('home.quickTitle')} /></h2></div>
          <a className="text-link" href={routes.catalog(locale)}>{t('home.allCards', { count: bookMeta.topicCount })} <ArrowRight size={17} /></a>
        </div>
        <div className="featured-grid">
          {featured.map((topic, index) => {
            const chapter = book[topic.chapter];
            const Icon = [Orbit, Atom, Waves][index % 3];
            return <a className={`featured-card accent-${chapter.accent}`} href={routes.topic(topic.id, locale)} key={topic.id}>
              <div><span>{topic.id}</span><Icon size={21} /></div>
              <h3>{topic.title}</h3>
              <p>{topic.summary}</p>
              <small>{t('home.minutes', { count: topic.minutes })} · {levelLabel(topic.level)}</small>
            </a>;
          })}
        </div>
      </section>

      <section className="home-section page-width vault-banner">
        <div className="vault-orbit" aria-hidden="true"><span /><span /><span /><Atom size={42} /></div>
        <div>
          <span className="section-index">{t('home.vaultIndex')}</span>
          <h2><Lines text={t('home.vaultTitle')} /></h2>
          <p>{t('home.vaultText')}</p>
        </div>
        <div className="vault-actions">
          <a className="button button--light" href={locale === 'en' ? './pole-physics-vault-en.zip' : './pole-physics-vault.zip'} download>{t('home.downloadVault')} <ArrowRight size={18} /></a>
          <small>{t('home.vaultHint')}</small>
        </div>
      </section>
    </main>
  );
}

function Lines({ text }: { text: string }) {
  return <>{text.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</>;
}
