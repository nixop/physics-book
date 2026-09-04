import { useEffect, useRef } from 'react';
import { Atom, BookOpen, FlaskConical, Menu, Moon, Search, Sigma, Sun, X } from 'lucide-react';
import type { Route } from '../routing';
import { routeToHash, routes } from '../routing';
import { bookMeta } from '../data/meta.generated';
import { useLocale } from '../i18n/LocaleContext';

interface AppHeaderProps {
  route: Route;
  completedCount: number;
  theme: 'light' | 'dark';
  mobileOpen: boolean;
  onOpenSearch: () => void;
  onToggleTheme: () => void;
  onToggleMobile: () => void;
}

export function AppHeader({ route, completedCount, theme, mobileOpen, onOpenSearch, onToggleTheme, onToggleMobile }: AppHeaderProps) {
  const { locale, t } = useLocale();
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const isBook = route.page === 'catalog' || route.page === 'chapter' || route.page === 'topic';
  const switchLocale = (nextLocale: 'ru' | 'en') => {
    if (nextLocale !== locale) {
      document.documentElement.dataset.restoreFocus = 'locale';
      window.location.hash = routeToHash(route, nextLocale).slice(1);
    }
  };
  const vault = locale === 'en' ? './pole-physics-vault-en.zip' : './pole-physics-vault.zip';
  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      onToggleMobile();
      window.setTimeout(() => mobileMenuButtonRef.current?.focus(), 0);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileOpen, onToggleMobile]);

  return (
    <header className="app-header">
      <div className="header-inner">
        <a className="brand" href={routes.home(locale)} aria-label={`${t('brand.name')} — ${locale === 'en' ? 'home' : 'на главную'}`}>
          <span className="brand-mark"><Atom size={22} /></span>
          <span className="brand-name">{t('brand.name')}</span>
          <span className="brand-caption">{t('brand.caption')}</span>
        </a>

        <nav className="desktop-nav" aria-label={t('header.primaryNav')}>
          <a className={isBook ? 'is-active' : ''} href={routes.catalog(locale)}><BookOpen size={16} /> {t('header.guide')}</a>
          <a className={route.page === 'labs' ? 'is-active' : ''} href={routes.labs(locale)}><FlaskConical size={16} /> {t('header.labs')}</a>
          <a className={route.page === 'formulas' ? 'is-active' : ''} href={routes.formulas(locale)}><Sigma size={17} /> {t('header.formulas')}</a>
        </nav>

        <div className="header-tools">
          <button type="button" className="search-trigger" onClick={onOpenSearch}>
            <Search size={17} />
            <span>{t('header.search')}</span>
            <kbd>Ctrl K</kbd>
          </button>
          <a className="progress-chip" href={routes.catalog(locale)} aria-label={t('header.progress', { done: completedCount, total: bookMeta.topicCount })}>
            <span className="progress-chip__ring" style={{ '--progress': `${(completedCount / bookMeta.topicCount) * 360}deg` } as React.CSSProperties}>{completedCount}</span>
            <span>{t('header.of', { total: bookMeta.topicCount })}</span>
          </a>
          <div className="locale-switch" role="group" aria-label={t('header.language')}>
            <button type="button" lang="ru" data-locale-option="ru" aria-label="Русский" className={locale === 'ru' ? 'is-active' : ''} onClick={() => switchLocale('ru')} aria-pressed={locale === 'ru'}>RU</button>
            <button type="button" lang="en" data-locale-option="en" aria-label="English" className={locale === 'en' ? 'is-active' : ''} onClick={() => switchLocale('en')} aria-pressed={locale === 'en'}>EN</button>
          </div>
          <button type="button" className="header-icon" onClick={onToggleTheme} aria-label={theme === 'light' ? t('header.dark') : t('header.light')}>
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <button ref={mobileMenuButtonRef} type="button" className="header-icon mobile-menu-button" onClick={onToggleMobile} aria-expanded={mobileOpen} aria-controls="mobile-menu" aria-label={mobileOpen ? t('header.closeMenu') : t('header.openMenu')}>
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-menu" className="mobile-nav" aria-label={t('header.mobileNav')}>
          <button type="button" onClick={onOpenSearch}><Search size={18} /> {t('header.searchAll', { count: bookMeta.topicCount })}</button>
          <a href={routes.catalog(locale)} onClick={onToggleMobile}><BookOpen size={18} /> {t('header.guide')}</a>
          <a href={routes.labs(locale)} onClick={onToggleMobile}><FlaskConical size={18} /> {t('header.labs')}</a>
          <a href={routes.formulas(locale)} onClick={onToggleMobile}><Sigma size={18} /> {t('header.formulasAndConstants')}</a>
          <a className="mobile-vault-link" href={vault} download onClick={onToggleMobile}>{t('header.downloadVault')}</a>
        </nav>
      )}
    </header>
  );
}
