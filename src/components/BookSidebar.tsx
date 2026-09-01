import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, ChevronRight, Search, X } from 'lucide-react';
import { bookMeta } from '../data';
import { routes } from '../routing';
import { useLocale } from '../i18n/LocaleContext';

interface BookSidebarProps {
  currentChapter: number;
  currentTopic?: string;
  completed: Set<string>;
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function BookSidebar({ currentChapter, currentTopic, completed, open, onClose, onOpenSearch }: BookSidebarProps) {
  const { locale, t, book } = useLocale();
  const [expanded, setExpanded] = useState(currentChapter);
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 960px)').matches);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => setExpanded(currentChapter), [currentChapter]);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 960px)');
    const update = () => setMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (mobile && open) window.setTimeout(() => closeButtonRef.current?.focus(), 20);
  }, [mobile, open]);

  const closeMobile = useCallback(() => {
    if (!mobile) return;
    onClose();
    window.setTimeout(() => document.querySelector<HTMLButtonElement>('.mobile-sidebar-trigger')?.focus(), 20);
  }, [mobile, onClose]);

  useEffect(() => {
    if (!mobile || !open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      closeMobile();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [closeMobile, mobile, open]);

  const trapKeys = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!mobile || !open) return;
    if (event.key !== 'Tab') return;
    const focusable = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled])')];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };

  return (
    <>
      {mobile && open && <button type="button" className="sidebar-scrim" aria-label={t('sidebar.close')} onClick={closeMobile} />}
      <aside className={`book-sidebar${open ? ' is-open' : ''}`} aria-label={t('sidebar.contents')} aria-hidden={mobile && !open} inert={mobile && !open ? true : undefined} onKeyDown={trapKeys}>
        <div className="sidebar-mobile-head">
          <strong>{t('sidebar.contents')}</strong>
          <button ref={closeButtonRef} type="button" className="icon-button" onClick={closeMobile} aria-label={t('sidebar.close')}><X size={19} /></button>
        </div>
        <button type="button" className="sidebar-search" onClick={() => {
          if (mobile) {
            onClose();
            document.querySelector<HTMLButtonElement>('.mobile-sidebar-trigger')?.focus();
          }
          onOpenSearch();
        }}><Search size={17} /> {t('sidebar.search')} <kbd>/</kbd></button>
        <div className="sidebar-progress">
          <div><span>{t('sidebar.progress')}</span><strong>{completed.size}/{bookMeta.topicCount}</strong></div>
          <span className="progress-track"><span style={{ width: `${(completed.size / bookMeta.topicCount) * 100}%` }} /></span>
        </div>
        <nav className="sidebar-chapters" aria-label={t('sidebar.contents')}>
          {book.map((chapter) => {
            const isExpanded = expanded === chapter.number;
            const chapterDone = chapter.topics.filter((topic) => completed.has(topic.id)).length;
            return (
              <div className={`sidebar-chapter${chapter.number === currentChapter ? ' is-current' : ''}`} key={chapter.number}>
                <button type="button" onClick={() => setExpanded(isExpanded ? -1 : chapter.number)} aria-expanded={isExpanded}>
                  <span className={`sidebar-chapter__number accent-${chapter.accent}`}>{String(chapter.number).padStart(2, '0')}</span>
                  <span className="sidebar-chapter__title"><strong>{chapter.title}</strong><small>{t('sidebar.passed', { done: chapterDone, total: chapter.topics.length })}</small></span>
                  {isExpanded ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
                </button>
                {isExpanded && (
                  <div className="sidebar-topics">
                    <a className="sidebar-overview" href={routes.chapter(chapter.number, locale)} onClick={closeMobile}>{t('sidebar.overview')}</a>
                    {chapter.topics.map((topic) => (
                      <a key={topic.id} className={topic.id === currentTopic ? 'is-active' : ''} href={routes.topic(topic.id, locale)} onClick={closeMobile}>
                        <span>{topic.id}</span>
                        <span>{topic.title}</span>
                        {completed.has(topic.id) && <Check size={14} />}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
