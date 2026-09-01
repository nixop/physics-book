import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { book as bookRu } from '../data/book.generated';
import { book as bookEn } from '../data/book.en.generated';
import { formulas as formulasRu } from '../data/formulas.generated';
import { formulas as formulasEn } from '../data/formulas.en.generated';
import { constants as constantsRu } from '../data/constants.generated';
import { constants as constantsEn } from '../data/constants.en.generated';
import type { Chapter, ChapterGroup, ConstantEntry, FormulaEntry, Topic } from '../types';
import { translate, type TranslationKey } from './strings';
import type { Locale } from './types';

interface LocaleValue {
  locale: Locale;
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
  book: Chapter[];
  allTopics: Topic[];
  formulas: FormulaEntry[];
  constants: ConstantEntry[];
  findChapter: (number: number) => Chapter | undefined;
  findTopic: (id: string) => Topic | undefined;
  topicNeighbors: (id: string) => { previous?: Topic; next?: Topic };
  formulasForTopic: (id: string) => FormulaEntry[];
  chaptersByGroup: Record<string, Chapter[]>;
  groupLabel: (group: ChapterGroup) => string;
  levelLabel: (level: Topic['level']) => string;
}

const LocaleContext = createContext<LocaleValue | null>(null);

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

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<LocaleValue>(() => {
    const book = locale === 'en' ? bookEn : bookRu;
    const formulas = locale === 'en' ? formulasEn : formulasRu;
    const constants = locale === 'en' ? constantsEn : constantsRu;
    const allTopics = book.flatMap((chapter) => chapter.topics);
    return {
      locale,
      t: (key, variables) => translate(locale, key, variables),
      book,
      allTopics,
      formulas,
      constants,
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
      chaptersByGroup: book.reduce<Record<string, Chapter[]>>((groups, chapter) => {
        (groups[chapter.group] ??= []).push(chapter);
        return groups;
      }, {}),
      groupLabel: (group) => groupLabels[locale][group] ?? group,
      levelLabel: (level) => levelLabels[locale][level],
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider');
  return context;
}
