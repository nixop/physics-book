import { useEffect, useMemo, useState } from 'react';
import { Bookmark, Check, ChevronDown, Clock3, Filter, Search, Sparkles } from 'lucide-react';
import { RichText } from '../components/LessonBlocks';
import { bookMeta } from '../data/meta.generated';
import { routes } from '../routing';
import { pluralEn, pluralRu } from '../lib/format';
import { createSearchTextIndex, matchesCatalogQuery } from '../lib/search';
import { useLocale } from '../i18n/LocaleContext';

interface CatalogPageProps {
  completed: Set<string>;
  bookmarks: Set<string>;
}

export function CatalogPage({ completed, bookmarks }: CatalogPageProps) {
  const { locale, t, book, groupLabel, levelLabel, lessonSearchTextForTopic } = useLocale();
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const groups = [...new Set(book.map((chapter) => chapter.group))];
  useEffect(() => setQuery(''), [locale]);

  const searchCorpus = useMemo(() => new Map(book.flatMap((chapter) => chapter.topics.map((topic) => [
    topic.id,
    createSearchTextIndex(`${topic.id} ${topic.title} ${topic.summary} ${topic.concepts.join(' ')} ${lessonSearchTextForTopic(topic.id)} ${chapter.title}`),
  ]))), [book, lessonSearchTextForTopic]);

  const filtered = useMemo(() => {
    return book.map((chapter) => ({
      ...chapter,
      topics: chapter.topics.filter((topic) => {
        const matchesGroup = group === 'all' || chapter.group === group;
        const matchesBookmark = !bookmarkedOnly || bookmarks.has(topic.id);
        const haystack = searchCorpus.get(topic.id);
        const matchesQuery = Boolean(haystack && matchesCatalogQuery(haystack, query));
        return matchesGroup && matchesBookmark && matchesQuery;
      }),
    })).filter((chapter) => chapter.topics.length > 0);
  }, [book, bookmarkedOnly, bookmarks, group, query, searchCorpus]);

  const visibleCount = filtered.reduce((sum, chapter) => sum + chapter.topics.length, 0);

  return (
    <main className="catalog-page">
      <section className="catalog-hero page-width">
        <span className="eyebrow-pill"><Sparkles size={15} /> {t('catalog.eyebrow')}</span>
        <div className="catalog-title-row">
          <div><h1>{t('catalog.title')}</h1><p>{t('catalog.subtitle')}</p></div>
          <div className="catalog-summary"><strong>{completed.size}</strong><span>{t('catalog.completed', { total: bookMeta.topicCount }).split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</span><span className="catalog-summary__bar"><span style={{ width: `${completed.size / bookMeta.topicCount * 100}%` }} /></span></div>
        </div>
      </section>

      <div className="catalog-toolbar-wrap">
        <div className="catalog-toolbar page-width">
          <label className="catalog-search"><Search size={18} aria-hidden="true" /><input aria-label={t('catalog.search')} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('catalog.search')} /><kbd aria-hidden="true">/</kbd></label>
          <label className="catalog-select"><Filter size={17} aria-hidden="true" /><select aria-label={t('catalog.groupLabel')} value={group} onChange={(event) => setGroup(event.target.value)}><option value="all">{t('catalog.all')}</option>{groups.map((item) => <option value={item} key={item}>{groupLabel(item)}</option>)}</select><ChevronDown size={16} aria-hidden="true" /></label>
          <button type="button" aria-pressed={bookmarkedOnly} className={bookmarkedOnly ? 'filter-button is-active' : 'filter-button'} onClick={() => setBookmarkedOnly((value) => !value)}><Bookmark size={17} fill={bookmarkedOnly ? 'currentColor' : 'none'} /> {t('catalog.bookmarks')}</button>
          <span className="catalog-result-count">{locale === 'ru' ? `${visibleCount} ${pluralRu(visibleCount, ['карточка', 'карточки', 'карточек'])}` : `${visibleCount} ${pluralEn(visibleCount, 'card')}`}</span>
        </div>
      </div>

      <section className="catalog-content page-width">
        {filtered.map((chapter) => {
          const done = chapter.topics.filter((topic) => completed.has(topic.id)).length;
          const hasFilter = Boolean(query || group !== 'all' || bookmarkedOnly);
          return (
            <details className={`catalog-chapter accent-${chapter.accent}`} key={chapter.number} open={hasFilter || chapter.number < 2}>
              <summary>
                <span className="catalog-chapter__number">{String(chapter.number).padStart(2, '0')}</span>
                <span className="catalog-chapter__title"><small>{groupLabel(chapter.group)}</small><strong>{chapter.title}</strong></span>
                <span className="catalog-chapter__meta"><span>{locale === 'ru' ? `${chapter.topics.length} ${pluralRu(chapter.topics.length, ['тема', 'темы', 'тем'])}` : `${chapter.topics.length} ${pluralEn(chapter.topics.length, 'topic')}`}</span><span>{t('catalog.pagesShort', { count: chapter.pages })}</span><span>{done}/{chapter.topics.length}</span></span>
                <span className="catalog-chapter__chevron"><ChevronDown size={20} /></span>
              </summary>
              <div className="catalog-topic-grid">
                {chapter.topics.map((topic) => (
                  <a href={routes.topic(topic.id, locale)} className={completed.has(topic.id) ? 'catalog-topic is-complete' : 'catalog-topic'} key={topic.id}>
                    <div className="catalog-topic__top"><span>{topic.id}</span><span>{bookmarks.has(topic.id) && <Bookmark size={15} fill="currentColor" />}{completed.has(topic.id) && <Check size={16} />}</span></div>
                    <h3>{topic.title}</h3>
                    <p><RichText>{topic.summary}</RichText></p>
                    <small><Clock3 size={14} /> {t('catalog.minutesShort', { count: topic.minutes })} <span>·</span> {levelLabel(topic.level)}</small>
                  </a>
                ))}
                <a className="catalog-chapter-overview" href={routes.chapter(chapter.number, locale)}>{t('catalog.overview')} <span>→</span></a>
              </div>
            </details>
          );
        })}
        {filtered.length === 0 && <div className="catalog-empty"><Search size={28} /><h2>{t('catalog.emptyTitle')}</h2><p>{t('catalog.emptyText')}</p><button className="button button--secondary" type="button" onClick={() => { setQuery(''); setGroup('all'); setBookmarkedOnly(false); }}>{t('catalog.reset')}</button></div>}
      </section>
    </main>
  );
}
