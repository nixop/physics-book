import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join, normalize, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { unzipSync } from 'fflate';

const root = resolve(import.meta.dirname, '..');
const vault = join(root, 'vault');
const vaultEn = join(root, 'vault-en');

function filesBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  });
}

const markdown = filesBelow(vault).filter((file) => file.endsWith('.md'));
const markdownEn = filesBelow(vaultEn).filter((file) => file.endsWith('.md'));
const normalized = (path: string) => normalize(path).toLocaleLowerCase('ru-RU');
const pathsWithoutExtension = new Set(markdown.map((file) => normalized(file.slice(0, -3))));
const byBasename = new Map<string, string[]>();
for (const file of markdown) {
  const key = basename(file, '.md').toLocaleLowerCase('ru-RU');
  byBasename.set(key, [...(byBasename.get(key) ?? []), file]);
}

describe('Obsidian vault', () => {
  it('содержит ровно 108 карточек и 17 карт разделов', () => {
    const bodies = markdown.map((file) => readFileSync(file, 'utf8'));
    expect(bodies.filter((body) => /^type: card$/mu.test(body))).toHaveLength(108);
    expect(bodies.filter((body) => /^type: chapter$/mu.test(body))).toHaveLength(17);
    expect(bodies.filter((body) => /^type: map$/mu.test(body))).toHaveLength(1);
    expect(bodies.join('\n')).not.toMatch(/^source(?:_hash|_line)?:/mu);
  });

  it('не переносит интерактивные брифы в короткие карточки', () => {
    const cardBodies = markdown.map((file) => readFileSync(file, 'utf8')).filter((body) => /^type: card$/mu.test(body));
    expect(cardBodies.every((body) => !body.includes('**Интерактив:**'))).toBe(true);
    expect(cardBodies.every((body) => !body.includes('Мини-лаборатория:'))).toBe(true);
    expect(cardBodies.every((body) => !body.includes('Проект: восстановить'))).toBe(true);
  });

  it('не содержит битых wiki-ссылок', () => {
    const broken: string[] = [];
    for (const file of markdown) {
      const body = readFileSync(file, 'utf8');
      for (const match of body.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/gu)) {
        const target = match[1].trim();
        let found = false;
        if (target.startsWith('.')) {
          found = pathsWithoutExtension.has(normalized(resolve(dirname(file), target)));
        } else if (target.includes('/') || target.includes('\\')) {
          found = pathsWithoutExtension.has(normalized(resolve(vault, target)));
        } else {
          found = (byBasename.get(target.toLocaleLowerCase('ru-RU'))?.length ?? 0) > 0;
        }
        if (!found) broken.push(`${relative(vault, file)} -> ${target}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('упакован для скачивания с сайта', () => {
    const archive = join(root, 'public', 'pole-physics-vault.zip');
    expect(existsSync(archive)).toBe(true);
    expect(statSync(archive).size).toBeGreaterThan(25_000);
    const entries = Object.keys(unzipSync(new Uint8Array(readFileSync(archive))));
    expect(entries).toHaveLength(133);
    expect(entries.every((entry) => entry.startsWith('pole-physics-vault/'))).toBe(true);
    expect(entries.some((entry) => /workspace|private|secret/iu.test(entry))).toBe(false);
  });

  it('создаёт полную английскую базу без русских фрагментов', () => {
    const bodies = markdownEn.map((file) => readFileSync(file, 'utf8'));
    const cards = bodies.filter((body) => /^type: card$/mu.test(body));
    expect(cards).toHaveLength(108);
    expect(bodies.filter((body) => /^type: chapter$/mu.test(body))).toHaveLength(17);
    expect(cards.every((body) => /^language: en$/mu.test(body))).toBe(true);
    expect(cards.every((body) => !/[А-Яа-яЁё]/u.test(body))).toBe(true);
    expect(bodies.join('\n')).not.toMatch(/^source(?:_hash|_line)?:/mu);
    expect(brokenLinks(markdownEn, vaultEn)).toEqual([]);
  });

  it('упаковывает английскую базу отдельно', () => {
    const archive = join(root, 'public', 'pole-physics-vault-en.zip');
    expect(existsSync(archive)).toBe(true);
    expect(statSync(archive).size).toBeGreaterThan(25_000);
    const entries = Object.keys(unzipSync(new Uint8Array(readFileSync(archive))));
    expect(entries).toHaveLength(133);
    expect(entries.every((entry) => entry.startsWith('field-physics-vault/'))).toBe(true);
  });

  it('не публикует provenance приватного источника в vault-артефактах', () => {
    for (const archiveName of ['pole-physics-vault.zip', 'pole-physics-vault-en.zip']) {
      const archive = unzipSync(new Uint8Array(readFileSync(join(root, 'public', archiveName))));
      const text = Object.values(archive).map((bytes) => new TextDecoder().decode(bytes)).join('\n');
      expect(text).not.toMatch(/interactive_physics|source_hash|source_line/iu);
    }
  });
});

function brokenLinks(files: string[], vaultRoot: string) {
  const paths = new Set(files.map((file) => normalized(file.slice(0, -3))));
  const names = new Map<string, string[]>();
  for (const file of files) {
    const key = basename(file, '.md').toLocaleLowerCase('en-US');
    names.set(key, [...(names.get(key) ?? []), file]);
  }
  const broken: string[] = [];
  for (const file of files) {
    const body = readFileSync(file, 'utf8');
    for (const match of body.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/gu)) {
      const target = match[1].trim();
      const found = target.startsWith('.')
        ? paths.has(normalized(resolve(dirname(file), target)))
        : target.includes('/') || target.includes('\\')
          ? paths.has(normalized(resolve(vaultRoot, target)))
          : (names.get(target.toLocaleLowerCase('en-US'))?.length ?? 0) > 0;
      if (!found) broken.push(`${relative(vaultRoot, file)} -> ${target}`);
    }
  }
  return broken;
}
