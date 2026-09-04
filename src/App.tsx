import { useCallback, useEffect, useRef, useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { SearchDialog } from './components/SearchDialog';
import { CatalogPage } from './pages/CatalogPage';
import { ChapterPage } from './pages/ChapterPage';
import { FormulasPage } from './pages/FormulasPage';
import { HomePage } from './pages/HomePage';
import { LabsPage } from './pages/LabsPage';
import { LessonPage } from './pages/LessonPage';
import { bookMeta } from './data/meta.generated';
import { topicIds } from './data/topic-ids.generated';
import { parseRoute, routeToHash, type Route } from './routing';
import { LocaleProvider, useLocale } from './i18n/LocaleContext';

const COMPLETED_KEY = 'pole:completed';
const BOOKMARKS_KEY = 'pole:bookmarks';
const THEME_KEY = 'pole:theme';
const LOCALE_KEY = 'pole:locale';

function safeStorageGet(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function safeStorageSet(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Состояние продолжает работать в памяти. */ }
}

function readStringSet(key: string) {
  try {
    const value = JSON.parse(safeStorageGet(key) ?? '[]');
    return new Set<string>(Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []);
  } catch {
    return new Set<string>();
  }
}

const validTopicIds = new Set(topicIds);
const readTopicSet = (key: string) => new Set([...readStringSet(key)].filter((id) => validTopicIds.has(id)));

function readPreferredRoute(hash = window.location.hash): Route {
  const route = parseRoute(hash);
  if (/^#\/(ru|en)(?:\/|$)/u.test(hash)) return route;
  const saved = safeStorageGet(LOCALE_KEY);
  const locale = saved === 'ru' || saved === 'en' ? saved : navigator.language.toLocaleLowerCase().startsWith('en') ? 'en' : 'ru';
  return { ...route, locale };
}

function App() {
  const [route, setRoute] = useState<Route>(() => readPreferredRoute());
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(() => readTopicSet(COMPLETED_KEY));
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => readTopicSet(BOOKMARKS_KEY));
  const routeFocusPending = useRef(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = safeStorageGet(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = readPreferredRoute();
      routeFocusPending.current = document.documentElement.dataset.restoreFocus !== 'locale';
      setRoute(nextRoute);
      setMobileOpen(false);
      setSidebarOpen(false);
      if (nextRoute.page !== 'topic' || !nextRoute.section) window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const section = route.page === 'topic' ? route.section : undefined;
    if (!routeFocusPending.current && !section) return;
    const shouldFocus = routeFocusPending.current;
    routeFocusPending.current = false;
    const frame = window.requestAnimationFrame(() => {
      const target = section
        ? document.getElementById(section)
        : document.querySelector<HTMLElement>('.book-main h1, main h1');
      if (!target) return;
      if (shouldFocus) {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
      if (section) {
        target.scrollIntoView({
          block: 'start',
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [route]);

  useEffect(() => {
    safeStorageSet(LOCALE_KEY, route.locale);
    if (!/^#\/(ru|en)(?:\/|$)/u.test(window.location.hash)) window.history.replaceState(null, '', routeToHash(route));
  }, [route]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    safeStorageSet(THEME_KEY, theme);
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f4f2eb' : '#0c1724');
  }, [theme]);

  useEffect(() => { document.documentElement.lang = route.locale; }, [route.locale]);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setMobileOpen(false);
  }, []);

  const skipToContent = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const routeContent = document.getElementById('main-content');
    const target = route.page === 'topic'
      ? document.getElementById('phenomenon')
      : routeContent?.querySelector<HTMLElement>('.book-main') ?? routeContent?.querySelector<HTMLElement>('main');
    const focusTarget = target ?? routeContent;
    if (!focusTarget) return;
    focusTarget.tabIndex = -1;
    focusTarget.focus({ preventScroll: true });
    focusTarget.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, [route.page]);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
      if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k') {
        event.preventDefault();
        openSearch();
      } else if (event.key === '/' && !typing) {
        event.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', onShortcut);
    return () => window.removeEventListener('keydown', onShortcut);
  }, [openSearch]);

  const toggleStored = (key: string, id: string, setter: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    setter((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      safeStorageSet(key, JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <LocaleProvider locale={route.locale}>
    <DocumentMeta route={route} />
    <div className="app-shell">
      <a
        className="skip-link"
        data-skip-link
        href={route.page === 'topic' ? '#phenomenon' : '#main-content'}
        onClick={skipToContent}
      >
        {route.locale === 'en' ? 'Skip to content' : 'Перейти к содержанию'}
      </a>
      <AppHeader
        route={route}
        completedCount={completed.size}
        theme={theme}
        mobileOpen={mobileOpen}
        onOpenSearch={openSearch}
        onToggleTheme={() => setTheme((value) => value === 'light' ? 'dark' : 'light')}
        onToggleMobile={() => setMobileOpen((value) => !value)}
      />

      <div id="main-content" tabIndex={-1}>
        {route.page === 'home' && <HomePage completed={completed} />}
        {route.page === 'catalog' && <CatalogPage completed={completed} bookmarks={bookmarks} />}
        {route.page === 'labs' && <LabsPage />}
        {route.page === 'formulas' && <FormulasPage />}
        {route.page === 'chapter' && <ChapterPage chapterNumber={route.chapter} completed={completed} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((value) => !value)} onOpenSearch={openSearch} />}
        {route.page === 'topic' && <LessonPage topicId={route.topic} completed={completed} bookmarks={bookmarks} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((value) => !value)} onOpenSearch={openSearch} onToggleComplete={(id) => toggleStored(COMPLETED_KEY, id, setCompleted)} onToggleBookmark={(id) => toggleStored(BOOKMARKS_KEY, id, setBookmarks)} />}
      </div>

      <LocalizedFooter />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
    </LocaleProvider>
  );
}

function DocumentMeta({ route }: { route: Route }) {
  const { locale, book, allTopics } = useLocale();
  useEffect(() => {
    const brand = locale === 'en' ? 'Field' : 'Поле';
    let title = locale === 'en' ? 'Field — interactive physics' : 'Поле — интерактивная физика';
    if (route.page === 'catalog') title = `${locale === 'en' ? 'Contents' : 'Оглавление'} — ${brand}`;
    if (route.page === 'labs') title = `${locale === 'en' ? 'Laboratories' : 'Лаборатории'} — ${brand}`;
    if (route.page === 'formulas') title = `${locale === 'en' ? 'Formulas' : 'Формулы'} — ${brand}`;
    if (route.page === 'chapter') title = `${book[route.chapter]?.title ?? (locale === 'en' ? 'Section' : 'Раздел')} — ${brand}`;
    if (route.page === 'topic') title = `${allTopics.find((topic) => topic.id === route.topic)?.title ?? (locale === 'en' ? 'Card' : 'Карточка')} — ${brand}`;
    document.title = title;
    const description = locale === 'en'
      ? 'FIELD is an interactive physics guide from measurement and mechanics to quantum theory and the Universe.'
      : 'ПОЛЕ — интерактивный справочник по физике: от измерений и механики до квантового мира и Вселенной.';
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')?.setAttribute('content', locale === 'en' ? 'en_US' : 'ru_RU');
  }, [allTopics, book, locale, route]);
  return null;
}

function LocalizedFooter() {
  const { locale, t } = useLocale();
  const vault = locale === 'en' ? './pole-physics-vault-en.zip' : './pole-physics-vault.zip';
  return <footer className="app-footer"><div className="page-width"><span><strong>{t('brand.name')}</strong> · {t('footer.tagline')}</span><span>{t('footer.stats', { chapters: bookMeta.chapterCount, topics: bookMeta.topicCount })}</span><a href={vault} download>{t('footer.download')}</a></div></footer>;
}

export default App;
