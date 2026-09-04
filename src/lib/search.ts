const RUSSIAN_TOKEN = /^[а-я]+$/u;

// A deliberately small inflectional stemmer for search, not a linguistic
// analyser. It only touches Cyrillic words and removes one common ending, so
// English queries and useful substring searches keep their previous behavior.
const RUSSIAN_INFLECTIONS = [
  'иями', 'ией', 'иям', 'ием', 'иях',
  'ого', 'его', 'ому', 'ему', 'ями', 'ами', 'ими', 'ыми',
  'ую', 'юю', 'ая', 'яя', 'ою', 'ею',
  'ия', 'ья', 'ие', 'ье', 'ии', 'еи', 'ию', 'ью',
  'ов', 'ев', 'ей', 'ий', 'ый', 'ой', 'ем', 'им', 'ым', 'ом',
  'их', 'ых', 'ам', 'ям', 'ах', 'ях',
  'ы', 'и', 'а', 'я', 'у', 'ю', 'е', 'о', 'й', 'ь',
] as const;

export interface SearchTextIndex {
  normalized: string;
  stems: ReadonlySet<string>;
}

export interface SearchTerm {
  text: string;
  stem?: string;
}

export function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase()
    .replaceAll('ё', 'е')
    .replace(/[^\p{L}\p{N}.]+/gu, ' ')
    .trim();
}

export function stemRussianToken(token: string) {
  const normalized = normalizeSearchText(token);
  if (normalized.length < 4 || !RUSSIAN_TOKEN.test(normalized)) return normalized;

  const suffix = RUSSIAN_INFLECTIONS.find((ending) => (
    normalized.endsWith(ending) && normalized.length - ending.length >= 3
  ));
  return suffix ? normalized.slice(0, -suffix.length) : normalized;
}

export function createSearchTextIndex(value: string): SearchTextIndex {
  const normalized = normalizeSearchText(value);
  const tokens = normalized.match(/\p{L}+|\p{N}+(?:\.\p{N}+)*/gu) ?? [];
  return {
    normalized,
    stems: new Set(tokens.map(stemRussianToken)),
  };
}

export function createSearchTerms(value: string): SearchTerm[] {
  const normalized = normalizeSearchText(value);
  if (!normalized) return [];
  const tokens = normalized.match(/\p{L}+|\p{N}+(?:\.\p{N}+)*/gu) ?? [];
  return tokens.map((text) => {
    const stem = stemRussianToken(text);
    return stem !== text ? { text, stem } : { text };
  });
}

function hasTerm(index: SearchTextIndex, term: SearchTerm) {
  return index.normalized.includes(term.text) || Boolean(term.stem && index.stems.has(term.stem));
}

export function matchesSearchTerms(index: SearchTextIndex, terms: readonly SearchTerm[]) {
  return terms.every((term) => hasTerm(index, term));
}

/** Keeps the catalog's phrase-substring behavior, with morphology only as a Russian fallback. */
export function matchesCatalogQuery(index: SearchTextIndex, value: string) {
  const terms = createSearchTerms(value);
  if (!terms.length) return true;
  const normalized = normalizeSearchText(value);
  return index.normalized.includes(normalized)
    || (terms.some((term) => Boolean(term.stem)) && matchesSearchTerms(index, terms));
}

export function scoreSearchTerms(
  title: SearchTextIndex,
  haystack: SearchTextIndex,
  terms: readonly SearchTerm[],
) {
  return terms.reduce((score, term) => {
    if (title.normalized.startsWith(term.text)) return score + 8;
    if (title.normalized.includes(term.text)) return score + 4;
    if (term.stem && title.stems.has(term.stem)) return score + 3;
    return score + (hasTerm(haystack, term) ? 1 : 0);
  }, 0);
}
