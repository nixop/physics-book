import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Chapter, ChapterGroup, ConstantEntry, FormulaEntry, Topic, TopicLessonDetail } from '../types';
import { translate, type TranslationKey } from './strings';
import type { Locale } from './types';

interface LocaleBundle {
  book: Chapter[];
  formulas: FormulaEntry[];
  constants: ConstantEntry[];
  lessonDetails: Record<string, TopicLessonDetail>;
}

interface LocaleValue extends LocaleBundle {
  locale: Locale;
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
  allTopics: Topic[];
  findChapter: (number: number) => Chapter | undefined;
  findTopic: (id: string) => Topic | undefined;
  topicNeighbors: (id: string) => { previous?: Topic; next?: Topic };
  formulasForTopic: (id: string) => FormulaEntry[];
  lessonDetailForTopic: (id: string) => TopicLessonDetail | undefined;
  lessonSearchTextForTopic: (id: string) => string;
  chaptersByGroup: Record<string, Chapter[]>;
  groupLabel: (group: ChapterGroup) => string;
  levelLabel: (level: Topic['level']) => string;
}

const LocaleContext = createContext<LocaleValue | null>(null);
const bundlePromises = new Map<Locale, Promise<LocaleBundle>>();
const resolvedBundles = new Map<Locale, LocaleBundle>();

function loadLocaleBundle(locale: Locale) {
  const cached = bundlePromises.get(locale);
  if (cached) return cached;

  const promise = locale === 'en'
    ? Promise.all([
      import('../data/book.en.generated'),
      import('../data/formulas.en.generated'),
      import('../data/constants.en.generated'),
      import('../data/lessons.en.generated'),
    ]).then(([book, formulas, constants, lessons]) => ({
      book: book.book,
      formulas: formulas.formulas,
      constants: constants.constants,
      lessonDetails: lessons.lessonDetails,
    }))
    : Promise.all([
      import('../data/book.generated'),
      import('../data/formulas.generated'),
      import('../data/constants.generated'),
      import('../data/lessons.generated'),
    ]).then(([book, formulas, constants, lessons]) => ({
      book: book.book,
      formulas: formulas.formulas,
      constants: constants.constants,
      lessonDetails: lessons.lessonDetails,
    }));
  const cachedPromise = promise.then((bundle) => {
    resolvedBundles.set(locale, bundle);
    return bundle;
  });
  bundlePromises.set(locale, cachedPromise);
  return cachedPromise;
}

const groupLabels: Record<Locale, Record<ChapterGroup, string>> = {
  ru: {
    foundations: 'Фундамент',
    'motion-matter': 'Движение и материя',
    'waves-heat': 'Волны и тепло',
    'fields-light': 'Поля и свет',
    'modern-physics': 'Современная физика',
    'universe-complexity': 'Вселенная и сложность',
  },
  en: {
    foundations: 'Foundations',
    'motion-matter': 'Motion and matter',
    'waves-heat': 'Waves and heat',
    'fields-light': 'Fields and light',
    'modern-physics': 'Modern physics',
    'universe-complexity': 'Universe and complexity',
  },
};

const levelLabels: Record<Locale, Record<Topic['level'], string>> = {
  ru: { foundation: 'основа', 'in-depth': 'углубление', advanced: 'продвинутый' },
  en: { foundation: 'foundation', 'in-depth': 'in depth', advanced: 'advanced' },
};

const lessonSearchText = (detail: TopicLessonDetail) => [
  detail.question,
  ...detail.overview,
  ...detail.conceptExplanations,
  detail.boundary,
  detail.example.title,
  detail.example.problem,
  ...detail.example.steps,
  detail.example.answer,
  detail.example.check,
  detail.pitfall,
  ...detail.practice.flatMap((item) => [item.question, item.hint, item.answer]),
].join(' ');

interface LoadState {
  locale: Locale;
  bundle?: LocaleBundle;
  error?: unknown;
}

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [loaded, setLoaded] = useState<LoadState | null>(() => {
    const bundle = resolvedBundles.get(locale);
    return bundle ? { locale, bundle } : null;
  });

  useEffect(() => {
    let active = true;
    loadLocaleBundle(locale).then(
      (bundle) => { if (active) setLoaded({ locale, bundle }); },
      (error: unknown) => { if (active) setLoaded({ locale, error }); },
    );
    return () => { active = false; };
  }, [locale]);

  const bundle = resolvedBundles.get(locale) ?? (loaded?.locale === locale ? loaded.bundle : undefined);
  if (loaded?.locale === locale && loaded.error) throw loaded.error;
  if (!bundle) {
    return <div className="locale-loading" role="status" aria-live="polite">{locale === 'en' ? 'Loading the physics guide…' : 'Загружаем справочник…'}</div>;
  }

  return <ResolvedLocaleProvider locale={locale} bundle={bundle}>{children}</ResolvedLocaleProvider>;
}

function ResolvedLocaleProvider({ locale, bundle, children }: { locale: Locale; bundle: LocaleBundle; children: ReactNode }) {
  const value = useMemo<LocaleValue>(() => {
    const { book, formulas, constants, lessonDetails } = bundle;
    const allTopics = book.flatMap((chapter) => chapter.topics);
    const searchableLessons = Object.fromEntries(Object.entries(lessonDetails).map(([id, detail]) => [id, lessonSearchText(detail)]));
    return {
      locale,
      t: (key, variables) => translate(locale, key, variables),
      book,
      allTopics,
      formulas,
      constants,
      lessonDetails,
      findChapter: (number) => book.find((chapter) => chapter.number === number),
      findTopic: (id) => allTopics.find((topic) => topic.id === id),
      topicNeighbors: (id) => {
        const position = allTopics.findIndex((topic) => topic.id === id);
        return {
          previous: position > 0 ? allTopics[position - 1] : undefined,
          next: position >= 0 && position < allTopics.length - 1 ? allTopics[position + 1] : undefined,
        };
      },
      formulasForTopic: (id) => formulas.filter((formula) => formula.relatedTopics.includes(id)),
      lessonDetailForTopic: (id) => lessonDetails[id],
      lessonSearchTextForTopic: (id) => searchableLessons[id] ?? '',
      chaptersByGroup: book.reduce<Record<string, Chapter[]>>((groups, chapter) => {
        (groups[chapter.group] ??= []).push(chapter);
        return groups;
      }, {}),
      groupLabel: (group) => groupLabels[locale][group] ?? group,
      levelLabel: (level) => levelLabels[locale][level],
    };
  }, [bundle, locale]);

  useEffect(() => {
    if (document.documentElement.dataset.restoreFocus !== 'locale') return;
    delete document.documentElement.dataset.restoreFocus;
    window.requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(`[data-locale-option="${locale}"]`)?.focus());
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider');
  return context;
}
