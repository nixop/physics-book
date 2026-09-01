import { describe, expect, it } from 'vitest';
import katex from 'katex';
import { allTopics, book, bookMeta, constants, formulas } from '../src/data';
import { book as bookEn } from '../src/data/book.en.generated';
import { formulas as formulasEn } from '../src/data/formulas.en.generated';
import { constants as constantsEn } from '../src/data/constants.en.generated';
import { implementedLabForTopic, topicBoundary } from '../src/lib/content';
import { pluralEn } from '../src/lib/format';

describe('редакционная модель книги', () => {
  it('сохраняет структуру исходного документа', () => {
    expect(book).toHaveLength(17);
    expect(allTopics).toHaveLength(108);
    expect(new Set(allTopics.map((topic) => topic.id)).size).toBe(108);
    expect(new Set(allTopics.map((topic) => topic.uid)).size).toBe(108);
    expect(allTopics.every((topic) => topic.concepts.length >= 4 && topic.concepts.length <= 6)).toBe(true);
    expect(allTopics.find((topic) => topic.id === '16.4')?.concepts).toHaveLength(5);
    expect(book.reduce((sum, chapter) => sum + chapter.pages, 0)).toBe(438);
    expect(bookMeta.pages).toBe(450);
    expect(JSON.stringify(book)).not.toMatch(/sourceLine|sourceFile|sourceHash/u);
    expect(Object.keys(bookMeta).every((key) => !key.startsWith('source'))).toBe(true);
  });

  it('извлекает отдельный экспериментальный бриф для каждой карточки', () => {
    expect(allTopics.every((topic) => topic.interactive.length > 0)).toBe(true);
    expect(allTopics.filter((topic) => topic.labKind === 'interactive')).toHaveLength(100);
    expect(allTopics.filter((topic) => topic.labKind === 'mini-lab')).toHaveLength(7);
    expect(allTopics.filter((topic) => topic.labKind === 'project')).toHaveLength(1);
  });

  it('связывает проверенные справочные данные с существующими карточками', () => {
    expect(formulas.length).toBeGreaterThanOrEqual(35);
    expect(constants.length).toBeGreaterThanOrEqual(15);
    expect(new Set(formulas.map((formula) => formula.id)).size).toBe(formulas.length);
    expect(new Set(constants.map((constant) => constant.id)).size).toBe(constants.length);
    const topicIds = new Set(allTopics.map((topic) => topic.id));
    expect(formulas.every((formula) => formula.relatedTopics.every((id) => topicIds.has(id)))).toBe(true);
    expect(new Set(formulas.map((formula) => formula.chapter))).toEqual(new Set(book.map((chapter) => chapter.number)));
    expect(() => formulas.forEach((formula) => katex.renderToString(formula.latex, { throwOnError: true }))).not.toThrow();
    expect(() => constants.forEach((constant) => katex.renderToString(constant.symbol, { throwOnError: true }))).not.toThrow();
  });

  it('полностью покрывает английскую локаль', () => {
    const topicsEn = bookEn.flatMap((chapter) => chapter.topics);
    expect(bookEn).toHaveLength(17);
    expect(topicsEn).toHaveLength(108);
    expect(formulasEn).toHaveLength(formulas.length);
    expect(constantsEn).toHaveLength(constants.length);
    expect(topicsEn.map((topic) => topic.id)).toEqual(allTopics.map((topic) => topic.id));
    expect(topicsEn.every((topic) => topic.title.length > 0 && topic.concepts.length >= 4 && topic.interactive.length > 0)).toBe(true);
    expect(topicsEn.every((topic) => !/[А-Яа-яЁё]/u.test(`${topic.title} ${topic.concepts.join(' ')} ${topic.interactive}`))).toBe(true);
    expect(JSON.stringify(bookEn)).not.toMatch(/[А-Яа-яЁё]/u);
    expect(formulasEn.every((formula) => !/[А-Яа-яЁё]/u.test(`${formula.title} ${formula.meaning} ${formula.conditions} ${formula.units}`))).toBe(true);
    expect(constantsEn.every((constant) => !/[А-Яа-яЁё]/u.test(`${constant.name} ${constant.unit} ${constant.note}`))).toBe(true);
  });

  it('сохраняет проверенные фактологические поправки в обеих локалях', () => {
    const topicsEn = bookEn.flatMap((chapter) => chapter.topics);
    const topic = (id: string) => allTopics.find((item) => item.id === id)!;
    const topicEn = (id: string) => topicsEn.find((item) => item.id === id)!;

    expect(topic('4.3').concepts.join(' ')).toContain('F = −∇U');
    expect(topic('8.7').concepts.join(' ')).toContain('S = k_B ln Ω');
    expect(topic('8.4').concepts.join(' ')).toMatch(/полная работа.+только граничную pV-работу/u);
    expect(topic('7.1').concepts.join(' ')).toContain('sin θ ≈ θ');
    expect(topic('8.2').concepts.join(' ')).toContain('3k_B T/2');
    expect(topic('8.8').concepts.join(' ')).toMatch(/постоянных `T, V`.+постоянных `T, p`/u);
    expect(topic('11.1').concepts.join(' ')).toMatch(/стационарности.+не обязательного минимума/u);

    expect(topicEn('4.3').concepts.join(' ')).toContain('F = −∇U');
    expect(topicEn('8.7').concepts.join(' ')).toContain('S = k_B ln Ω');
    expect(topicEn('8.4').concepts.join(' ')).toMatch(/total work.+boundary pV work/u);
    expect(topicEn('7.1').concepts.join(' ')).toContain('sin θ ≈ θ');
    expect(topicEn('8.2').concepts.join(' ')).toContain('3k_B T/2');
    expect(topicEn('8.8').concepts.join(' ')).toMatch(/constant `T, V`.+constant `T, p`/u);
    expect(topicEn('11.1').concepts.join(' ')).toMatch(/stationary.+not necessarily a minimum/u);
  });

  it('привязывает опорные формулы к трём ранее непокрытым карточкам', () => {
    const formulaFor = (id: string) => formulas.find((formula) => formula.id === id);
    expect(formulaFor('wave-speed')?.relatedTopics).toContain('7.4');
    expect(formulaFor('lorentz-transform-interval')?.relatedTopics).toContain('12.4');
    expect(formulaFor('double-slit-probability')?.relatedTopics).toContain('13.2');
  });

  it('даёт каждой карточке собственную границу модели и отмечает только семь готовых лабораторий', () => {
    const ruBoundaries = allTopics.map((topic) => topicBoundary(topic, 'ru'));
    const enBoundaries = bookEn.flatMap((chapter) => chapter.topics).map((topic) => topicBoundary(topic, 'en'));
    expect(new Set(ruBoundaries).size).toBe(allTopics.length);
    expect(new Set(enBoundaries).size).toBe(allTopics.length);
    expect(allTopics.filter((topic) => implementedLabForTopic(topic.id))).toHaveLength(7);
  });

  it('склоняет английские счётчики в единственном числе', () => {
    expect(pluralEn(1, 'card')).toBe('card');
    expect(pluralEn(0, 'card')).toBe('cards');
    expect(pluralEn(2, 'topic')).toBe('topics');
  });
});
