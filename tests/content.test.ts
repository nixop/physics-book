import { describe, expect, it } from 'vitest';
import katex from 'katex';
import { allTopics, book, bookMeta, constants, formulas, lessonDetails } from '../src/data';
import { book as bookEn } from '../src/data/book.en.generated';
import { formulas as formulasEn } from '../src/data/formulas.en.generated';
import { constants as constantsEn } from '../src/data/constants.en.generated';
import { lessonDetails as lessonDetailsEn } from '../src/data/lessons.en.generated';
import { implementedLabForTopic } from '../src/lib/content';
import { pluralEn } from '../src/lib/format';
import { translate } from '../src/i18n/strings';

function collectContentStrings(value: unknown, key = ''): string[] {
  if (typeof value === 'string') return key === 'topicId' ? [] : [value];
  if (Array.isArray(value)) return value.flatMap((item) => collectContentStrings(item));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([childKey, child]) => collectContentStrings(child, childKey));
  }
  return [];
}

describe('редакционная модель книги', () => {
  it('сохраняет структуру исходного документа', () => {
    expect(book).toHaveLength(17);
    expect(allTopics).toHaveLength(108);
    expect(new Set(allTopics.map((topic) => topic.id)).size).toBe(108);
    expect(new Set(allTopics.map((topic) => topic.uid)).size).toBe(108);
    expect(allTopics.every((topic) => topic.concepts.length >= 4 && topic.concepts.length <= 6)).toBe(true);
    expect(allTopics.find((topic) => topic.id === '16.4')?.concepts).toHaveLength(5);
    expect(allTopics.every((topic) => topic.summary !== topic.concepts[0] && topic.summary.length >= 30)).toBe(true);
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
    expect(formulasEn.every((formula) => !/[А-Яа-яЁё]/u.test(`${formula.title} ${formula.latex} ${formula.plain} ${formula.meaning} ${formula.conditions} ${formula.units}`))).toBe(true);
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

  it('даёт каждой карточке полноценный уникальный урок в обеих локалях', () => {
    const topicsEn = bookEn.flatMap((chapter) => chapter.topics);
    expect(Object.keys(lessonDetails)).toHaveLength(allTopics.length);
    expect(Object.keys(lessonDetailsEn)).toHaveLength(topicsEn.length);
    for (const [topics, details, locale] of [[allTopics, lessonDetails, 'ru'], [topicsEn, lessonDetailsEn, 'en']] as const) {
      for (const topic of topics) {
        const detail = details[topic.id];
        expect(detail.topicId).toBe(topic.id);
        expect(detail.overview).toHaveLength(2);
        expect(detail.conceptExplanations).toHaveLength(topic.concepts.length);
        expect(detail.example.steps.length).toBeGreaterThanOrEqual(3);
        expect(detail.practice).toHaveLength(2);
        expect(detail.question).not.toBe(topic.summary);
        expect(detail.conceptExplanations.every((explanation, index) => explanation !== topic.concepts[index])).toBe(true);
        if (locale === 'en') expect(JSON.stringify(detail)).not.toMatch(/[А-Яа-яЁё]/u);
      }
      expect(new Set(Object.values(details).map((detail) => detail.question)).size).toBe(topics.length);
      expect(new Set(Object.values(details).map((detail) => detail.boundary)).size).toBe(topics.length);
      expect(new Set(Object.values(details).map((detail) => detail.example.problem)).size).toBe(topics.length);
      expect(JSON.stringify(details)).not.toMatch(/This card connects|Карточка связывает наблюдаемое|not implemented|не реализован/iu);
    }
    expect(allTopics.every((topic) => topic.minutes >= 10 && topic.minutes <= 30)).toBe(true);
    expect(allTopics.some((topic) => topic.minutes !== topic.pages * 7)).toBe(true);
  });

  it('держит inline-математику сбалансированной и валидной для KaTeX', () => {
    let inlineFormulaCount = 0;
    for (const details of [lessonDetails, lessonDetailsEn]) {
      for (const text of collectContentStrings(details)) {
        expect((text.match(/\$/gu) ?? []).length % 2, text).toBe(0);
        for (const match of text.matchAll(/\$([^$\n]+)\$/gu)) {
          inlineFormulaCount += 1;
          expect(match[1]).not.toMatch(/(?<!\\)\b(?:sqrt|omega0|omega|lambda|rho|phi|mu|delta|epsilon|theta|tau|grad|div|infinity|sin|cos|tan|ln|exp|hat)\b/iu);
          expect(() => katex.renderToString(match[1], { throwOnError: true, strict: 'error' })).not.toThrow();
        }
      }
    }
    expect(inlineFormulaCount).toBeGreaterThanOrEqual(1_200);
  });

  it('сохраняет единую русскую нотацию в разделах 6–11', () => {
    const normalizedDetails = Object.fromEntries(Object.entries(lessonDetails).filter(([topicId]) => /^(?:[6-9]|10|11)\./u.test(topicId)));
    const normalizedDetailsEn = Object.fromEntries(Object.entries(lessonDetailsEn).filter(([topicId]) => /^(?:[6-9]|10|11)\./u.test(topicId)));
    const text = collectContentStrings(normalizedDetails).join(' ');
    const textEn = collectContentStrings(normalizedDetailsEn).join(' ');
    const prose = text.replace(/\$[^$]*\$/gu, ' ').replace(/`[^`]*`/gu, ' ');

    expect(text).not.toMatch(/\d+\.\d+/u);
    expect(text).not.toMatch(/\d(?:[.,]\d+)?e[+-]?\d+/iu);
    expect(textEn).not.toMatch(/\d(?:\.\d+)?e[+-]?\d+/iu);
    expect(prose).not.toMatch(/\b(?:sqrt|omega0|lambda|rho|phi|mu|delta)\b/iu);
    expect(lessonDetails['1.6'].example.check).toMatch(/Размерность одна, физический смысл разный/u);
  });

  it('не искажает смысл формул при переводе прозы в inline KaTeX', () => {
    for (const details of [lessonDetails, lessonDetailsEn]) {
      expect(details['8.3'].example.steps.join(' ')).toContain('\\langle x');
      expect(details['8.8'].example.steps.join(' ')).toContain('Q_{\\mathrm{c,min}}');
      expect(details['9.1'].example.steps.at(-1)).toContain('\\frac');
      expect(details['9.3'].example.steps[0]).toContain('\\frac');
      expect(details['10.3'].conceptExplanations.join(' ')).toContain('\\oint');
      expect(details['10.5'].overview.join(' ')).toContain('\\mathbf u\\times\\mathbf B');
      expect(details['10.5'].example.steps.join(' ')).toContain('\\mathcal E');
      expect(details['10.7'].practice[1].answer).toContain('\\frac');
      expect(details['11.6'].example.steps[1]).toContain('\\cos');
    }
    expect(lessonDetailsEn['7.6'].example.problem).toContain('\\mathrm{m^{-1}}');
    expect(lessonDetailsEn['8.1'].example.steps[1]).toContain('T_{2}');
    expect(lessonDetailsEn['10.3'].example.problem).toContain('\\times 10^{-7}');

    const revisedText = collectContentStrings({
      ru: Object.fromEntries(Object.entries(lessonDetails).filter(([topicId]) => /^(?:[6-9]|10|11)\./u.test(topicId))),
      en: Object.fromEntries(Object.entries(lessonDetailsEn).filter(([topicId]) => /^(?:[6-9]|10|11)\./u.test(topicId))),
    }).join(' ');
    expect(revisedText).not.toMatch(/\\mathrm\{(?:micro|k?ohm|hat)\}|\be-7\b|Q_\{\\mathrm\{c\}\},min/iu);
  });

  it('честно отмечает только семь готовых лабораторий', () => {
    expect(allTopics.filter((topic) => implementedLabForTopic(topic.id))).toHaveLength(7);
  });

  it('отделяет точный scope семи моделей от полного редакционного брифа', () => {
    const scopes = [
      ['1.3', 'Измерительный шум, объём выборки и повторная выборка', 'Measurement Noise, Sample Size, and Resampling'],
      ['2.5', 'Бросок при v₀ = 24 м/с без сопротивления воздуха', 'Projectile at v₀ = 24 m/s without Air Resistance'],
      ['5.2', 'Кеплерова орбита и равные площади при изменяемом e', 'Keplerian Orbit and Equal Areas at Variable e'],
      ['7.4', 'Гармоническая волна при постоянной скорости', 'Harmonic Wave at Constant Speed'],
      ['9.2', 'Поле двух неподвижных точечных зарядов', 'Field of Two Fixed Point Charges'],
      ['12.4', 'Мировая линия и одновременность при изменяемой β', 'Worldline and Simultaneity at Variable β'],
      ['13.2', 'Двухщелевая картина при изменяемых d/λ и a/λ', 'Double-Slit Pattern with Variable d/λ and a/λ'],
    ] as const;

    for (const [topicId, titleRu, titleEn] of scopes) {
      const topic = allTopics.find((item) => item.id === topicId)!;
      expect(implementedLabForTopic(topicId, 'ru')?.title).toBe(titleRu);
      expect(implementedLabForTopic(topicId, 'en')?.title).toBe(titleEn);
      expect(titleRu).not.toBe(topic.interactive);
    }
  });

  it('называет сто планов на странице лабораторий брифами, а не готовыми моделями', () => {
    expect(translate('ru', 'labs.plannedBriefsLabel')).toContain('брифов');
    expect(translate('ru', 'labs.editorialText')).toContain('100 планов экспериментов');
    expect(translate('en', 'labs.plannedBriefsLabel')).toBe('experiment briefs');
    expect(translate('en', 'labs.editorialText')).toContain('100 planned experiments');
  });

  it('склоняет английские счётчики в единственном числе', () => {
    expect(pluralEn(1, 'card')).toBe('card');
    expect(pluralEn(0, 'card')).toBe('cards');
    expect(pluralEn(2, 'topic')).toBe('topics');
  });
});
