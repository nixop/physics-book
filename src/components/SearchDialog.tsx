import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpen, CornerDownLeft, Search, X } from 'lucide-react';
import { RichText } from './LessonBlocks';
import { routes } from '../routing';
import { useLocale } from '../i18n/LocaleContext';
import { createSearchTerms, createSearchTextIndex, matchesSearchTerms, scoreSearchTerms } from '../lib/search';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const frequent = ['2.3', '3.3', '4.4', '7.3', '9.8', '12.3', '13.3'];

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const { locale, t, allTopics, book, groupLabel, lessonSearchTextForTopic } = useLocale();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const searchCorpus = useMemo(() => new Map(allTopics.map((topic) => {
    const chapter = book[topic.chapter];
    const title = createSearchTextIndex(`${topic.id} ${topic.title}`);
    return [topic.id, {
      title,
      haystack: createSearchTextIndex(`${topic.id} ${topic.title} ${topic.summary} ${topic.concepts.join(' ')} ${topic.interactive} ${lessonSearchTextForTopic(topic.id)} ${chapter.title} ${groupLabel(chapter.group)}`),
    }];
  })), [allTopics, book, groupLabel, lessonSearchTextForTopic]);

  const results = useMemo(() => {
    const terms = createSearchTerms(query);
    if (!terms.length) return frequent.map((id) => allTopics.find((topic) => topic.id === id)).filter(Boolean).slice(0, 7) as typeof allTopics;
    return allTopics
      .map((topic) => {
        const { title, haystack } = searchCorpus.get(topic.id)!;
        const matches = matchesSearchTerms(haystack, terms);
        const score = scoreSearchTerms(title, haystack, terms);
        return { topic, matches, score };
      })
      .filter((item) => item.matches)
      .sort((a, b) => b.score - a.score)
      .slice(0, 9)
      .map((item) => item.topic);
  }, [allTopics, query, searchCorpus]);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setQuery('');
    setActive(0);
    window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const selectResult = () => {
    const result = results[active];
    if (!result) return;
    window.location.hash = routes.topic(result.id, locale).slice(1);
    onClose();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') onClose();
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive((value) => Math.min(value + 1, results.length - 1)); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
    if (event.key === 'Enter') { event.preventDefault(); selectResult(); }
    if (event.key === 'Tab' && dialogRef.current) {
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('input, button, a[href]')];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  };

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title" onKeyDown={onKeyDown}>
        <div className="search-dialog__input">
          <Search size={21} />
          <input
            ref={inputRef}
            role="combobox"
            aria-label={t('search.label')}
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `search-result-${results[active].slug}` : undefined}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('search.placeholder')}
          />
          <button type="button" onClick={onClose} aria-label={t('search.close')}><X size={19} /></button>
        </div>
        <div className="search-dialog__meta">
          <span id="search-title">{query ? t('search.found', { count: results.length }) : t('search.frequent')}</span>
          <span><kbd>↑↓</kbd> {t('search.choose')} <kbd>↵</kbd> {t('search.open')}</span>
        </div>
        <div id="search-results" className="search-results" role="listbox" aria-label={t('search.results')}>
          {results.map((topic, index) => {
            const chapter = book[topic.chapter];
            return (
              <a
                key={topic.id}
                id={`search-result-${topic.slug}`}
                href={routes.topic(topic.id, locale)}
                className={index === active ? 'is-active' : ''}
                role="option"
                aria-selected={index === active}
                onMouseEnter={() => setActive(index)}
                onClick={onClose}
              >
                <span className={`search-result__icon accent-${chapter.accent}`}><BookOpen size={17} /></span>
                <span className="search-result__copy">
                  <strong><span>{topic.id}</span> {topic.title}</strong>
                  <small>{chapter.title} · {groupLabel(chapter.group)} · <RichText>{topic.summary}</RichText></small>
                </span>
                {index === active ? <CornerDownLeft size={17} /> : <ArrowRight size={17} />}
              </a>
            );
          })}
          {results.length === 0 && (
            <div className="search-empty">
              <strong>{t('search.emptyTitle')}</strong>
              <p>{t('search.emptyText')}</p>
            </div>
          )}
        </div>
        <div className="search-dialog__footer">{t('search.footer')}</div>
      </div>
    </div>
  );
}
