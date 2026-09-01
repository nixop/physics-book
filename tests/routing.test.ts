import { describe, expect, it } from 'vitest';
import { parseRoute, routeToHash } from '../src/routing';

describe('hash routing', () => {
  it('разбирает стабильные ссылки на главы и карточки', () => {
    expect(parseRoute('#/ru/chapter/12')).toEqual({ locale: 'ru', page: 'chapter', chapter: 12 });
    expect(parseRoute('#/en/topic/12.4')).toEqual({ locale: 'en', page: 'topic', topic: '12.4' });
    expect(parseRoute('#/topic/12.4')).toEqual({ locale: 'ru', page: 'topic', topic: '12.4' });
    expect(routeToHash(parseRoute('#/ru/topic/12.4'), 'en')).toBe('#/en/topic/12.4');
  });

  it('безопасно отклоняет повреждённый percent-encoding', () => {
    expect(() => parseRoute('#/%E0%A4%A')).not.toThrow();
    expect(parseRoute('#/%E0%A4%A')).toEqual({ locale: 'ru', page: 'home' });
  });
});
