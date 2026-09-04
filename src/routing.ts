import type { Locale } from './i18n/types';

export const lessonSections = ['phenomenon', 'model', 'experiment', 'math', 'example', 'limits', 'practice', 'connections'] as const;
export type LessonSection = typeof lessonSections[number];

export type Route = { locale: Locale } & (
  | { page: 'home' }
  | { page: 'catalog' }
  | { page: 'chapter'; chapter: number }
  | { page: 'topic'; topic: string; section?: LessonSection }
  | { page: 'labs' }
  | { page: 'formulas' }
);

export function parseRoute(hash = window.location.hash): Route {
  const parts = hash.replace(/^#\/?/u, '').split('/').filter(Boolean).map((part) => {
    try { return decodeURIComponent(part); } catch { return part; }
  });
  const locale: Locale = parts[0] === 'en' ? 'en' : 'ru';
  if (parts[0] === 'ru' || parts[0] === 'en') parts.shift();
  if (parts[0] === 'catalog') return { locale, page: 'catalog' };
  if (parts[0] === 'labs') return { locale, page: 'labs' };
  if (parts[0] === 'formulas') return { locale, page: 'formulas' };
  if (parts[0] === 'chapter' && /^\d+$/u.test(parts[1] ?? '')) return { locale, page: 'chapter', chapter: Number(parts[1]) };
  if (parts[0] === 'topic' && /^\d+\.\d+$/u.test(parts[1] ?? '')) {
    const section = lessonSections.find((candidate) => candidate === parts[2]);
    return section
      ? { locale, page: 'topic', topic: parts[1], section }
      : { locale, page: 'topic', topic: parts[1] };
  }
  return { locale, page: 'home' };
}

export const routes = {
  home: (locale: Locale = 'ru') => `#/${locale}/`,
  catalog: (locale: Locale = 'ru') => `#/${locale}/catalog`,
  labs: (locale: Locale = 'ru') => `#/${locale}/labs`,
  formulas: (locale: Locale = 'ru') => `#/${locale}/formulas`,
  chapter: (chapter: number, locale: Locale = 'ru') => `#/${locale}/chapter/${chapter}`,
  topic: (topic: string, locale: Locale = 'ru', section?: LessonSection) => `#/${locale}/topic/${topic}${section ? `/${section}` : ''}`,
};

export function routeToHash(route: Route, locale: Locale = route.locale) {
  if (route.page === 'catalog') return routes.catalog(locale);
  if (route.page === 'labs') return routes.labs(locale);
  if (route.page === 'formulas') return routes.formulas(locale);
  if (route.page === 'chapter') return routes.chapter(route.chapter, locale);
  if (route.page === 'topic') return routes.topic(route.topic, locale, route.section);
  return routes.home(locale);
}
