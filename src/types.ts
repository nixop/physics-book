export type LabKind = 'interactive' | 'mini-lab' | 'project';
export type TopicLevel = 'foundation' | 'in-depth' | 'advanced';
export type ChapterGroup = 'foundations' | 'motion-matter' | 'waves-heat' | 'fields-light' | 'modern-physics' | 'universe-complexity';

export interface Topic {
  id: string;
  uid: string;
  slug: string;
  chapter: number;
  order: number;
  title: string;
  pages: number;
  minutes: number;
  level: TopicLevel;
  concepts: string[];
  summary: string;
  labKind: LabKind;
  interactive: string;
}

export interface Chapter {
  number: number;
  slug: string;
  title: string;
  pages: number;
  accent: string;
  group: ChapterGroup;
  topics: Topic[];
}

export interface FormulaEntry {
  id: string;
  chapter: number;
  title: string;
  latex: string;
  plain: string;
  meaning: string;
  conditions: string;
  units: string;
  relatedTopics: string[];
}

export interface ConstantEntry {
  id: string;
  symbol: string;
  name: string;
  value: string | number;
  unit: string;
  note: string;
}

export interface BookMeta {
  title: string;
  subtitle: string;
  edition: string;
  pages: number;
  chapterCount: number;
  topicCount: number;
}
