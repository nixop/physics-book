export function pluralRu(value: number, forms: [string, string, string]) {
  const absolute = Math.abs(value) % 100;
  const last = absolute % 10;
  if (absolute > 10 && absolute < 20) return forms[2];
  if (last === 1) return forms[0];
  if (last >= 2 && last <= 4) return forms[1];
  return forms[2];
}

export function pluralEn(value: number, singular: string, plural = `${singular}s`) {
  return Math.abs(value) === 1 ? singular : plural;
}
