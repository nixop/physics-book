import { describe, expect, it } from 'vitest';
import {
  createSearchTerms,
  createSearchTextIndex,
  matchesCatalogQuery,
  matchesSearchTerms,
  normalizeSearchText,
  scoreSearchTerms,
  stemRussianToken,
} from '../src/lib/search';

describe('search normalization and morphology', () => {
  it('normalizes case, ё and punctuation without losing topic identifiers', () => {
    expect(normalizeSearchText('  Ёмкость: тема 9.8!  ')).toBe('емкость тема 9.8');
  });

  it('reduces common Russian noun inflections to a stable search stem', () => {
    expect(stemRussianToken('волны')).toBe(stemRussianToken('волна'));
    expect(stemRussianToken('волною')).toBe(stemRussianToken('волна'));
    expect(stemRussianToken('зарядов')).toBe(stemRussianToken('заряд'));
    expect(stemRussianToken('энтропией')).toBe(stemRussianToken('энтропия'));
  });

  it('matches inflected Russian queries token by token', () => {
    const index = createSearchTextIndex('Электрический заряд. Как распространяется волна. Энтропия.');
    expect(matchesSearchTerms(index, createSearchTerms('электрических зарядов'))).toBe(true);
    expect(matchesSearchTerms(index, createSearchTerms('волною'))).toBe(true);
    expect(matchesSearchTerms(index, createSearchTerms('энтропией'))).toBe(true);
  });

  it('keeps English substring matching and exact-title ranking intact', () => {
    const exactTitle = createSearchTextIndex('Wave propagation');
    const body = createSearchTextIndex('Wave propagation and interference');
    const terms = createSearchTerms('wave prop');
    expect(matchesSearchTerms(body, terms)).toBe(true);
    expect(scoreSearchTerms(exactTitle, body, terms)).toBe(12);
    expect(matchesSearchTerms(createSearchTextIndex('Particle mechanics'), createSearchTerms('waves'))).toBe(false);
  });

  it('keeps catalog phrase matching for English and uses morphology only for Russian', () => {
    expect(matchesCatalogQuery(createSearchTextIndex('Measurement Error and Uncertainty'), 'Measurement Error and Uncertainty')).toBe(true);
    expect(matchesCatalogQuery(createSearchTextIndex('Measurement uses error bars to quantify uncertainty'), 'Measurement Error and Uncertainty')).toBe(false);
    expect(matchesCatalogQuery(createSearchTextIndex('Как распространяется волна'), 'волною')).toBe(true);
  });

  it('ranks an exact title occurrence above a morphological title match and body-only match', () => {
    const terms = createSearchTerms('волны');
    const exact = scoreSearchTerms(
      createSearchTextIndex('Волны и звук'),
      createSearchTextIndex('Волны и звук'),
      terms,
    );
    const morphological = scoreSearchTerms(
      createSearchTextIndex('Как распространяется волна'),
      createSearchTextIndex('Как распространяется волна'),
      terms,
    );
    const bodyOnly = scoreSearchTerms(
      createSearchTextIndex('Колебания среды'),
      createSearchTextIndex('Колебания среды создают волну'),
      terms,
    );
    expect(exact).toBeGreaterThan(morphological);
    expect(morphological).toBeGreaterThan(bodyOnly);
  });
});
