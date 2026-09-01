import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(scriptDir, '..');
const forceVault = process.argv.includes('--force-vault');
const vaultOnly = process.argv.includes('--vault-only');

const configuredSource = process.env.BOOK_SOURCE_PATH?.trim();
const privateSourcePath = configuredSource ? resolve(rootDir, configuredSource) : null;
if (privateSourcePath && !existsSync(privateSourcePath)) throw new Error('BOOK_SOURCE_PATH points to a missing file');
let privateSourceHash = null;

const accents = ['amber', 'teal', 'blue', 'coral', 'violet', 'green'];
const groupFor = (chapter) => {
  if (chapter <= 1) return 'foundations';
  if (chapter <= 6) return 'motion-matter';
  if (chapter <= 8) return 'waves-heat';
  if (chapter <= 11) return 'fields-light';
  if (chapter <= 14) return 'modern-physics';
  return 'universe-complexity';
};
const levelFor = (chapter) => chapter <= 4 ? 'foundation' : chapter <= 11 ? 'in-depth' : 'advanced';
const russianGroupLabels = {
  foundations: 'Фундамент',
  'motion-matter': 'Движение и материя',
  'waves-heat': 'Волны и тепло',
  'fields-light': 'Поля и свет',
  'modern-physics': 'Современная физика',
  'universe-complexity': 'Вселенная и сложность',
};
const russianLevelLabels = { foundation: 'основа', 'in-depth': 'углубление', advanced: 'продвинутый' };
const pluralRu = (value, forms) => {
  const absolute = Math.abs(value) % 100;
  const last = absolute % 10;
  if (absolute > 10 && absolute < 20) return forms[2];
  if (last === 1) return forms[0];
  if (last >= 2 && last <= 4) return forms[1];
  return forms[2];
};

const loadCommittedBook = () => {
  const generatedPath = join(rootDir, 'src', 'data', 'book.generated.ts');
  if (!existsSync(generatedPath)) throw new Error('Normalized book data is missing; provide BOOK_SOURCE_PATH');
  const generated = readFileSync(generatedPath, 'utf8');
  const match = generated.match(/export const book:\s*Chapter\[\]\s*=\s*([\s\S]+);\s*$/u);
  if (!match) throw new Error('Could not read normalized book data');
  return JSON.parse(match[1]);
};

let chapters;
if (privateSourcePath) {
  const source = readFileSync(privateSourcePath, 'utf8');
  privateSourceHash = createHash('sha256').update(source).digest('hex').toUpperCase();
  const lines = source.split(/\r?\n/u);
  chapters = [];
  let currentChapter = null;
  let currentTopic = null;

  for (const [lineIndex, rawLine] of lines.entries()) {
  const line = rawLine.trim();
  const chapterMatch = line.match(/^##\s+(\d+)\.\s+(.+?)\s+—\s+(\d+)\s+страниц/iu);
  if (chapterMatch) {
    currentChapter = {
      number: Number(chapterMatch[1]),
      slug: `chapter-${chapterMatch[1]}`,
      title: chapterMatch[2],
      pages: Number(chapterMatch[3]),
      accent: accents[Number(chapterMatch[1]) % accents.length],
      group: groupFor(Number(chapterMatch[1])),
      topics: [],
    };
    chapters.push(currentChapter);
    currentTopic = null;
    continue;
  }

  const topicMatch = line.match(/^###\s+(\d+\.\d+)\.\s+(.+?)\s+—\s+(\d+)\s+страниц/iu);
  if (topicMatch && currentChapter) {
    currentTopic = {
      id: topicMatch[1],
      uid: `phy-${topicMatch[1].split('.').map((part) => part.padStart(2, '0')).join('-')}`,
      slug: topicMatch[1].replace('.', '-'),
      chapter: currentChapter.number,
      order: currentChapter.topics.length + 1,
      title: topicMatch[2],
      pages: Number(topicMatch[3]),
      minutes: Number(topicMatch[3]) * 7,
      level: levelFor(currentChapter.number),
      concepts: [],
      summary: '',
      labKind: 'interactive',
      interactive: '',
      sourceLine: lineIndex + 1,
    };
    currentChapter.topics.push(currentTopic);
    continue;
  }

  if (/^#{1,6}\s/u.test(line)) {
    currentTopic = null;
    if (/^#{1,2}\s/u.test(line)) currentChapter = null;
    continue;
  }

  if (!currentTopic || !line.startsWith('- ')) continue;
  const bullet = line.slice(2).trim();
  const interactiveMatch = bullet.match(/^\*\*(Интерактив|Мини-лаборатория|Проект):\*\*\s*(.+)$/iu);
  if (interactiveMatch) {
    const label = interactiveMatch[1].toLocaleLowerCase('ru-RU');
    currentTopic.labKind = label.startsWith('мини') ? 'mini-lab' : label === 'проект' ? 'project' : 'interactive';
    currentTopic.interactive = interactiveMatch[2].replace(/\.$/u, '');
  } else {
    currentTopic.concepts.push(bullet);
    if (!currentTopic.summary) currentTopic.summary = bullet;
  }
  }
} else {
  chapters = loadCommittedBook();
}

const topicCount = chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0);
if (chapters.length !== 17 || topicCount !== 108) {
  throw new Error(`Нарушена структура источника: ожидалось 17 глав и 108 карточек, получено ${chapters.length} и ${topicCount}`);
}
const parsedTopics = chapters.flatMap((chapter) => chapter.topics);
const parsedIds = new Set();
const parsedUids = new Set();
for (const topic of parsedTopics) {
  const location = topic.sourceLine ? ` возле строки ${topic.sourceLine}` : '';
  if (parsedIds.has(topic.id) || parsedUids.has(topic.uid)) throw new Error(`Повторный ID карточки ${topic.id}${location}`);
  parsedIds.add(topic.id);
  parsedUids.add(topic.uid);
  if (topic.concepts.length < 4 || topic.concepts.length > 6) throw new Error(`Карточка ${topic.id} содержит ${topic.concepts.length} тезисов вместо 4–6${location}`);
  if (!topic.interactive) throw new Error(`У карточки ${topic.id} отсутствует экспериментальный бриф${location}`);
  delete topic.sourceLine;
}

const readJson = (name) => {
  const file = join(rootDir, 'content', name);
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : [];
};
const formulas = readJson('formulas.json');
const constants = readJson('constants.json');
if (new Set(formulas.map((formula) => formula.id)).size !== formulas.length) throw new Error('В content/formulas.json есть повторные ID');
if (new Set(constants.map((constant) => constant.id)).size !== constants.length) throw new Error('В content/constants.json есть повторные ID');
for (const formula of formulas) {
  for (const topicId of formula.relatedTopics ?? []) {
    if (!parsedIds.has(topicId)) throw new Error(`Формула ${formula.id} ссылается на отсутствующую карточку ${topicId}`);
  }
}
for (const chapter of chapters) {
  if (!formulas.some((formula) => formula.chapter === chapter.number)) throw new Error(`Для главы ${chapter.number} нет ни одной проверенной формулы`);
}

const englishPartNames = ['part-0-5.json', 'part-6-11.json', 'part-12-16.json'];
const englishParts = englishPartNames.map((name) => {
  const file = join(rootDir, 'content', 'en', name);
  if (!existsSync(file)) throw new Error(`Не найден английский перевод content/en/${name}`);
  return JSON.parse(readFileSync(file, 'utf8'));
});
const englishTranslations = englishParts.reduce((merged, part) => ({
  chapters: { ...merged.chapters, ...part.chapters },
  topics: { ...merged.topics, ...part.topics },
  formulas: { ...merged.formulas, ...part.formulas },
  constants: { ...merged.constants, ...(part.constants ?? {}) },
}), { chapters: {}, topics: {}, formulas: {}, constants: {} });

if (Object.keys(englishTranslations.chapters).length !== chapters.length) throw new Error('Английский перевод должен покрывать 17 глав');
if (Object.keys(englishTranslations.topics).length !== topicCount) throw new Error('Английский перевод должен покрывать 108 карточек');
if (Object.keys(englishTranslations.formulas).length !== formulas.length) throw new Error(`Английский перевод должен покрывать ${formulas.length} формул`);
if (Object.keys(englishTranslations.constants).length !== constants.length) throw new Error(`Английский перевод должен покрывать ${constants.length} констант`);
for (const chapter of chapters) {
  if (!englishTranslations.chapters[chapter.number]?.title) throw new Error(`Нет английского названия главы ${chapter.number}`);
}
for (const formula of formulas) {
  if (!englishTranslations.formulas[formula.id]) throw new Error(`Нет английского перевода формулы ${formula.id}`);
}
for (const constant of constants) {
  if (!englishTranslations.constants[constant.id]) throw new Error(`Нет английского перевода константы ${constant.id}`);
}

const englishChapters = chapters.map((chapter) => ({
  ...chapter,
  title: englishTranslations.chapters[chapter.number]?.title ?? chapter.title,
  topics: chapter.topics.map((topic) => {
    const translation = englishTranslations.topics[topic.id];
    if (!translation || translation.concepts.length !== topic.concepts.length) throw new Error(`Неполный английский перевод карточки ${topic.id}`);
    return { ...topic, title: translation.title, concepts: translation.concepts, summary: translation.concepts[0], interactive: translation.interactive };
  }),
}));
const englishFormulas = formulas.map((formula) => ({ ...formula, ...englishTranslations.formulas[formula.id] }));
const englishConstants = constants.map((constant) => ({ ...constant, ...englishTranslations.constants[constant.id] }));
const englishText = [
  ...englishChapters.flatMap((chapter) => [chapter.title, ...chapter.topics.flatMap((topic) => [topic.title, topic.interactive, ...topic.concepts])]),
  ...englishFormulas.flatMap((formula) => [formula.title, formula.plain, formula.meaning, formula.conditions, formula.units]),
  ...englishConstants.flatMap((constant) => [constant.name, constant.unit, constant.note]),
].join(' ');
if (/[А-Яа-яЁё]/u.test(englishText)) throw new Error('В английском контенте обнаружена кириллица');

const meta = {
  title: 'Поле',
  subtitle: 'Интерактивная физика от наблюдения до модели',
  edition: 'Рабочая версия 2.0',
  pages: 450,
  chapterCount: chapters.length,
  topicCount,
};

const writeGeneratedTs = (name, typeName, exportName, data) => {
  const target = join(rootDir, 'src', 'data', name);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(
    target,
    `// Сгенерировано scripts/build-content.mjs. Не редактировать вручную.\nimport type { ${typeName} } from '../types';\n\nexport const ${exportName}: ${typeName}${Array.isArray(data) ? '[]' : ''} = ${JSON.stringify(data, null, 2)};\n`,
    'utf8',
  );
};

if (!vaultOnly) {
  writeGeneratedTs('book.generated.ts', 'Chapter', 'book', chapters);
  writeGeneratedTs('book.en.generated.ts', 'Chapter', 'book', englishChapters);
  writeGeneratedTs('meta.generated.ts', 'BookMeta', 'bookMeta', meta);
  writeGeneratedTs('formulas.generated.ts', 'FormulaEntry', 'formulas', formulas);
  writeGeneratedTs('formulas.en.generated.ts', 'FormulaEntry', 'formulas', englishFormulas);
  writeGeneratedTs('constants.generated.ts', 'ConstantEntry', 'constants', constants);
  writeGeneratedTs('constants.en.generated.ts', 'ConstantEntry', 'constants', englishConstants);
}

const safeName = (value) => value.replace(/[<>:"/\\|?*]/gu, '—').replace(/\s+/gu, ' ').trim();
const yamlText = (value) => `"${String(value).replaceAll('"', '\\"')}"`;
const vaultDir = join(rootDir, 'vault');
const vaultManifest = new Set();

const writeVault = (relativePath, contents) => {
  const target = join(vaultDir, relativePath);
  vaultManifest.add(relativePath.replaceAll('\\', '/'));
  const normalizedContents = contents.replace(/\n{3,}/gu, '\n\n').trimEnd() + '\n';
  if (existsSync(target) && !forceVault && readFileSync(target, 'utf8') === normalizedContents) return false;
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, normalizedContents, 'utf8');
  return true;
};

const noteName = (topic) => `${topic.id} · ${safeName(topic.title)}`;
const chapterNoteName = (chapter) => `Глава ${chapter.number} · ${safeName(chapter.title)}`;
const allTopics = chapters.flatMap((chapter) => chapter.topics);
let written = 0;

const mapLines = chapters.map((chapter) => {
  const directory = `${String(chapter.number).padStart(2, '0')} · ${safeName(chapter.title)}`;
  return `- [[${directory}/${chapterNoteName(chapter)}|${chapter.number}. ${chapter.title}]] — ${chapter.topics.length} ${pluralRu(chapter.topics.length, ['карточка', 'карточки', 'карточек'])}`;
});

written += Number(writeVault('00 · Карта физики.md', `---
type: map
aliases:
  - Карта физики
  - Главная
tags:
  - физика
  - moc
cssclasses:
  - pole-map
---

# Карта физики

> [!abstract] Маршрут
> **Наблюдение → измерение → движение → взаимодействие → сохранение → поля и волны → вещество → пространство-время → квантовый мир → Вселенная.**

Эта база — компактный спутник онлайн-справочника «Поле». Здесь ${topicCount} коротких карточек без интерактивов: определения, модели, ограничения и связи.

## Разделы

${mapLines.join('\n')}

## Справочные узлы

- [[Указатель формул]]
- [[Физические константы]]
- [[Как работать с базой]]

## Учебный цикл

1. Сформулируйте явление или вопрос.
2. Выберите существенные объекты и взаимодействия.
3. Запишите модель словами, схемой и формулой.
4. Проверьте размерность и предельные случаи.
5. Назовите границы применимости.
`));

written += Number(writeVault('Как работать с базой.md', `---
type: guide
tags:
  - физика
  - навигация
---

# Как работать с базой

Начните с [[00 · Карта физики|карты физики]] или откройте нужный раздел. Каждая карточка отвечает на четыре вопроса: что наблюдаем, какой моделью описываем, что важно помнить и с какими темами это связано.

> [!tip] Не заучивайте формулу отдельно
> Сначала назовите величины и допущения, затем проверьте единицы и только после этого подставляйте числа.

## Условные элементы

- **Коротко** — идея карточки в одном тезисе.
- **Главное** — минимальный набор понятий.
- **Границы модели** — напоминание о допущениях.
- **Связи** — переходы к соседним знаниям.
- \`#основа\`, \`#углубление\`, \`#продвинутый\` — уровень маршрута.

Личные заметки безопаснее хранить в отдельной папке: файлы этой базы можно пересоздать командой \`npm run vault\`.
`));

for (const chapter of chapters) {
  const directory = `${String(chapter.number).padStart(2, '0')} · ${safeName(chapter.title)}`;
  const chapterLinks = chapter.topics.map((topic) => `- [[${noteName(topic)}|${topic.id}. ${topic.title}]] — ${topic.summary}`).join('\n');
  const previousChapter = chapters[chapter.number - 1];
  const nextChapter = chapters[chapter.number + 1];
  const chapterNav = [
    previousChapter ? `← [[../${String(previousChapter.number).padStart(2, '0')} · ${safeName(previousChapter.title)}/${chapterNoteName(previousChapter)}|${previousChapter.title}]]` : '',
    '[[../00 · Карта физики|Карта физики]]',
    nextChapter ? `[[../${String(nextChapter.number).padStart(2, '0')} · ${safeName(nextChapter.title)}/${chapterNoteName(nextChapter)}|${nextChapter.title}]] →` : '',
  ].filter(Boolean).join(' · ');

  written += Number(writeVault(join(directory, `${chapterNoteName(chapter)}.md`), `---
type: chapter
chapter: ${chapter.number}
title: ${yamlText(chapter.title)}
pages: ${chapter.pages}
tags:
  - физика
  - глава
  - ${russianGroupLabels[chapter.group].toLocaleLowerCase('ru-RU').replaceAll(' ', '-')}
---

# ${chapter.number}. ${chapter.title}

> [!info] Раздел
> ${chapter.topics.length} ${pluralRu(chapter.topics.length, ['карточка', 'карточки', 'карточек'])} · около ${chapter.pages} ${pluralRu(chapter.pages, ['страницы', 'страниц', 'страниц'])} полного маршрута · уровень: ${russianLevelLabels[chapter.topics[0]?.level ?? 'foundation']}

## Карточки

${chapterLinks}

## Навигация

${chapterNav}
`));
}

for (let index = 0; index < allTopics.length; index += 1) {
  const topic = allTopics[index];
  const chapter = chapters[topic.chapter];
  const directory = `${String(chapter.number).padStart(2, '0')} · ${safeName(chapter.title)}`;
  const previous = allTopics[index - 1];
  const next = allTopics[index + 1];
  const tags = ['физика', russianLevelLabels[topic.level], russianGroupLabels[chapter.group].toLocaleLowerCase('ru-RU').replaceAll(' ', '-')];
  const relatedFormulas = formulas.filter((formula) => formula.relatedTopics?.includes(topic.id));
  const formulaLinks = relatedFormulas.length
    ? `\n## Формулы\n\n${relatedFormulas.map((formula) => `- [[../Указатель формул#${formula.title}|${formula.title}]] — ${formula.plain}`).join('\n')}\n`
    : '';
  const navigation = [
    previous ? `← [[../${String(previous.chapter).padStart(2, '0')} · ${safeName(chapters[previous.chapter].title)}/${noteName(previous)}|${previous.id}]]` : '',
    `[[${chapterNoteName(chapter)}|Глава ${chapter.number}]]`,
    next ? `[[../${String(next.chapter).padStart(2, '0')} · ${safeName(chapters[next.chapter].title)}/${noteName(next)}|${next.id}]] →` : '',
  ].filter(Boolean).join(' · ');

  written += Number(writeVault(join(directory, `${noteName(topic)}.md`), `---
uid: ${yamlText(topic.uid)}
id: ${yamlText(topic.id)}
source_id: ${yamlText(topic.id)}
type: card
title: ${yamlText(topic.title)}
aliases:
  - ${yamlText(`${topic.id}. ${topic.title}`)}
chapter: ${topic.chapter}
chapter_title: ${yamlText(chapter.title)}
order: ${topic.order}
target_pages: ${topic.pages}
level: ${yamlText(russianLevelLabels[topic.level])}
status: outline
previous_id: ${previous ? yamlText(previous.uid) : 'null'}
next_id: ${next ? yamlText(next.uid) : 'null'}
formula_ids:
${relatedFormulas.length ? relatedFormulas.map((formula) => `  - ${formula.id}`).join('\n') : '  []'}
tags:
${tags.map((tag) => `  - ${tag}`).join('\n')}
---

# ${topic.id}. ${topic.title}

> [!abstract] Коротко
> ${topic.summary}

## Главное

${topic.concepts.map((concept) => `- ${concept}`).join('\n')}

## Рабочая модель

Выделите систему, назовите измеряемые величины и проверьте, какие допущения позволяют применить идеи этой карточки. Связывайте словесное описание со схемой, графиком и размерностью величин.

> [!warning] Границы модели
> Результат имеет смысл только пока выполнены принятые допущения. Проверьте предельный случай и сравните масштаб эффекта с погрешностью измерения.
${formulaLinks}
## Проверь себя

- Как своими словами объяснить «${topic.title.toLocaleLowerCase('ru-RU')}» без подстановки чисел?
- Какие величины нужно измерить и когда выбранная модель перестанет работать?

## Связи

${navigation}
`));
}

const formulaSections = formulas.length
  ? formulas.map((formula) => `## ${formula.title}\n\n$$${formula.latex}$$\n\n- **Смысл:** ${formula.meaning}\n- **Условия:** ${formula.conditions}\n- **Единицы:** ${formula.units}\n- **Связанные карточки:** ${formula.relatedTopics.map((id) => {
      const topic = allTopics.find((item) => item.id === id);
      if (!topic) return id;
      const chapter = chapters[topic.chapter];
      return `[[${String(chapter.number).padStart(2, '0')} · ${safeName(chapter.title)}/${noteName(topic)}|${id}]]`;
    }).join(', ')}`).join('\n\n')
  : '> Формулы будут добавлены после редакторской проверки.';

written += Number(writeVault('Указатель формул.md', `---
type: reference
tags:
  - физика
  - формулы
---

# Указатель формул

Формула полезна вместе с физическим смыслом и границами применимости.

${formulaSections}
`));

const constantTable = constants.length
  ? ['| Символ | Величина | Значение | Примечание |', '|---|---|---:|---|', ...constants.map((item) => `| $${item.symbol}$ | ${item.name} | ${item.value} ${item.unit} | ${item.note} |`)].join('\n')
  : '> Константы будут добавлены после редакторской проверки.';

written += Number(writeVault('Физические константы.md', `---
type: reference
tags:
  - физика
  - константы
---

# Физические константы

${constantTable}

Перед расчётом приведите все величины к согласованной системе единиц.
`));

written += Number(writeVault('.obsidian/app.json', JSON.stringify({ alwaysUpdateLinks: true, newLinkFormat: 'relative', showUnsupportedFiles: true }, null, 2)));
written += Number(writeVault('.obsidian/appearance.json', JSON.stringify({ accentColor: '#2f6fed', enabledCssSnippets: ['pole'] }, null, 2)));
written += Number(writeVault('.obsidian/graph.json', JSON.stringify({ collapseFilter: false, showTags: true, showAttachments: false, showOrphans: false, colorGroups: [] }, null, 2)));
written += Number(writeVault('.obsidian/snippets/pole.css', `body { --font-text-theme: Inter, system-ui, sans-serif; --link-color: #2f6fed; --interactive-accent: #2f6fed; }
.pole-map.markdown-preview-view h1 { font-size: 2.4em; }
.callout[data-callout="abstract"] { --callout-color: 47, 111, 237; }
.callout[data-callout="warning"] { --callout-color: 217, 138, 52; }
`));

const zipEntries = {};
for (const controlledPath of vaultManifest) {
  const bytes = readFileSync(join(vaultDir, controlledPath));
  zipEntries[`pole-physics-vault/${controlledPath}`] = new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}
mkdirSync(join(rootDir, 'public'), { recursive: true });
writeFileSync(join(rootDir, 'public', 'pole-physics-vault.zip'), zipSync(zipEntries, { level: 9 }));

// English Obsidian vault is generated from the same stable IDs and translated data.
const englishVaultDir = join(rootDir, 'vault-en');
const englishVaultManifest = new Set();
const writeEnglishVault = (relativePath, contents) => {
  const target = join(englishVaultDir, relativePath);
  englishVaultManifest.add(relativePath.replaceAll('\\', '/'));
  const normalizedContents = contents.replace(/\n{3,}/gu, '\n\n').trimEnd() + '\n';
  if (existsSync(target) && !forceVault && readFileSync(target, 'utf8') === normalizedContents) return false;
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, normalizedContents, 'utf8');
  return true;
};
const englishGroupLabels = {
  foundations: 'Foundations',
  'motion-matter': 'Motion and matter',
  'waves-heat': 'Waves and heat',
  'fields-light': 'Fields and light',
  'modern-physics': 'Modern physics',
  'universe-complexity': 'Universe and complexity',
};
const englishLevelLabels = { foundation: 'foundation', 'in-depth': 'in-depth', advanced: 'advanced' };
const englishNoteName = (topic) => `${topic.id} · ${safeName(topic.title)}`;
const englishChapterNoteName = (chapter) => `Chapter ${chapter.number} · ${safeName(chapter.title)}`;
const englishTopics = englishChapters.flatMap((chapter) => chapter.topics);
let englishWritten = 0;

const englishMapLines = englishChapters.map((chapter) => {
  const directory = `${String(chapter.number).padStart(2, '0')} · ${safeName(chapter.title)}`;
  return `- [[${directory}/${englishChapterNoteName(chapter)}|${chapter.number}. ${chapter.title}]] — ${chapter.topics.length} ${chapter.topics.length === 1 ? 'card' : 'cards'}`;
});
englishWritten += Number(writeEnglishVault('00 · Physics Map.md', `---
type: map
language: en
aliases:
  - Physics Map
  - Home
tags:
  - physics
  - moc
cssclasses:
  - pole-map
---

# Physics Map

> [!abstract] Route
> **Observation → measurement → motion → interaction → conservation → fields and waves → matter → spacetime → quantum world → Universe.**

This vault is the concise offline companion to the FIELD interactive guide. It contains ${topicCount} cards without widgets: definitions, working models, limits, and links.

## Sections

${englishMapLines.join('\n')}

## Reference

- [[Formula Index]]
- [[Physical Constants]]
- [[How to Use This Vault]]

## Learning cycle

1. State the phenomenon or question.
2. Choose the essential objects and interactions.
3. Express the model in words, a diagram, and an equation.
4. Check dimensions and limiting cases.
5. State the range of validity.
`));

englishWritten += Number(writeEnglishVault('How to Use This Vault.md', `---
type: guide
language: en
tags:
  - physics
  - navigation
---

# How to Use This Vault

Begin with the [[00 · Physics Map|physics map]] or open the section you need. Every card answers four questions: what is observed, which model describes it, what matters most, and how it connects to other topics.

> [!tip] Do not memorize an equation in isolation
> Name the quantities and assumptions first, check units, and only then substitute numbers.

## Card elements

- **In brief** — the idea in one statement.
- **Key ideas** — the minimum conceptual set.
- **Limits of the model** — assumptions to keep visible.
- **Connections** — transitions to neighboring knowledge.

Keep personal notes in a separate folder: generated cards are synchronized by \`npm run content\`.
`));

for (const chapter of englishChapters) {
  const directory = `${String(chapter.number).padStart(2, '0')} · ${safeName(chapter.title)}`;
  const links = chapter.topics.map((topic) => `- [[${englishNoteName(topic)}|${topic.id}. ${topic.title}]] — ${topic.summary}`).join('\n');
  const previous = englishChapters[chapter.number - 1];
  const next = englishChapters[chapter.number + 1];
  const nav = [
    previous ? `← [[../${String(previous.number).padStart(2, '0')} · ${safeName(previous.title)}/${englishChapterNoteName(previous)}|${previous.title}]]` : '',
    '[[../00 · Physics Map|Physics Map]]',
    next ? `[[../${String(next.number).padStart(2, '0')} · ${safeName(next.title)}/${englishChapterNoteName(next)}|${next.title}]] →` : '',
  ].filter(Boolean).join(' · ');
  englishWritten += Number(writeEnglishVault(join(directory, `${englishChapterNoteName(chapter)}.md`), `---
type: chapter
language: en
chapter: ${chapter.number}
title: ${yamlText(chapter.title)}
pages: ${chapter.pages}
tags:
  - physics
  - chapter
  - ${englishGroupLabels[chapter.group].toLocaleLowerCase('en-US').replaceAll(' ', '-')}
---

# ${chapter.number}. ${chapter.title}

> [!info] Section
> ${chapter.topics.length} ${chapter.topics.length === 1 ? 'card' : 'cards'} · about ${chapter.pages} planned pages · level: ${englishLevelLabels[chapter.topics[0]?.level ?? 'foundation']}

## Cards

${links}

## Navigation

${nav}
`));
}

for (let index = 0; index < englishTopics.length; index += 1) {
  const topic = englishTopics[index];
  const chapter = englishChapters[topic.chapter];
  const directory = `${String(chapter.number).padStart(2, '0')} · ${safeName(chapter.title)}`;
  const previous = englishTopics[index - 1];
  const next = englishTopics[index + 1];
  const relatedFormulas = englishFormulas.filter((formula) => formula.relatedTopics.includes(topic.id));
  const formulaLinks = relatedFormulas.length
    ? `\n## Formulas\n\n${relatedFormulas.map((formula) => `- [[../Formula Index#${formula.title}|${formula.title}]] — ${formula.plain}`).join('\n')}\n`
    : '';
  const navigation = [
    previous ? `← [[../${String(previous.chapter).padStart(2, '0')} · ${safeName(englishChapters[previous.chapter].title)}/${englishNoteName(previous)}|${previous.id}]]` : '',
    `[[${englishChapterNoteName(chapter)}|Chapter ${chapter.number}]]`,
    next ? `[[../${String(next.chapter).padStart(2, '0')} · ${safeName(englishChapters[next.chapter].title)}/${englishNoteName(next)}|${next.id}]] →` : '',
  ].filter(Boolean).join(' · ');
  const tags = ['physics', englishLevelLabels[topic.level], englishGroupLabels[chapter.group].toLocaleLowerCase('en-US').replaceAll(' ', '-')];
  englishWritten += Number(writeEnglishVault(join(directory, `${englishNoteName(topic)}.md`), `---
uid: ${yamlText(topic.uid)}
id: ${yamlText(topic.id)}
source_id: ${yamlText(topic.id)}
type: card
language: en
title: ${yamlText(topic.title)}
aliases:
  - ${yamlText(`${topic.id}. ${topic.title}`)}
chapter: ${topic.chapter}
chapter_title: ${yamlText(chapter.title)}
order: ${topic.order}
target_pages: ${topic.pages}
level: ${yamlText(englishLevelLabels[topic.level])}
status: outline
previous_id: ${previous ? yamlText(previous.uid) : 'null'}
next_id: ${next ? yamlText(next.uid) : 'null'}
formula_ids:
${relatedFormulas.length ? relatedFormulas.map((formula) => `  - ${formula.id}`).join('\n') : '  []'}
tags:
${tags.map((tag) => `  - ${tag}`).join('\n')}
---

# ${topic.id}. ${topic.title}

> [!abstract] In brief
> ${topic.summary}

## Key ideas

${topic.concepts.map((concept) => `- ${concept}`).join('\n')}

## Working model

Define the system, name the measurable quantities, and check which assumptions allow these ideas to be applied. Connect the verbal description to a diagram, graph, and dimensional analysis.

> [!warning] Limits of the model
> The result is meaningful only while the assumptions hold. Test a limiting case and compare the scale of the effect with measurement uncertainty.
${formulaLinks}
## Self-check

- How would you explain “${topic.title.toLocaleLowerCase('en-US')}” without substituting numbers?
- Which quantities must be measured, and when does the chosen model stop working?

## Connections

${navigation}
`));
}

const englishFormulaSections = englishFormulas.map((formula) => `## ${formula.title}\n\n$$${formula.latex}$$\n\n- **Meaning:** ${formula.meaning}\n- **Conditions:** ${formula.conditions}\n- **Units:** ${formula.units}\n- **Related cards:** ${formula.relatedTopics.map((id) => {
  const topic = englishTopics.find((item) => item.id === id);
  if (!topic) return id;
  const chapter = englishChapters[topic.chapter];
  return `[[${String(chapter.number).padStart(2, '0')} · ${safeName(chapter.title)}/${englishNoteName(topic)}|${id}]]`;
}).join(', ')}`).join('\n\n');
englishWritten += Number(writeEnglishVault('Formula Index.md', `---
type: reference
language: en
tags:
  - physics
  - formulas
---

# Formula Index

An equation is useful together with its physical meaning and range of validity.

${englishFormulaSections}
`));

const englishConstantTable = ['| Symbol | Quantity | Value | Note |', '|---|---|---:|---|', ...englishConstants.map((item) => `| $${item.symbol}$ | ${item.name} | ${item.value} ${item.unit} | ${item.note} |`)].join('\n');
englishWritten += Number(writeEnglishVault('Physical Constants.md', `---
type: reference
language: en
tags:
  - physics
  - constants
---

# Physical Constants

${englishConstantTable}

Convert all quantities to a consistent system of units before calculating.
`));
englishWritten += Number(writeEnglishVault('.obsidian/app.json', JSON.stringify({ alwaysUpdateLinks: true, newLinkFormat: 'relative', showUnsupportedFiles: true }, null, 2)));
englishWritten += Number(writeEnglishVault('.obsidian/appearance.json', JSON.stringify({ accentColor: '#245fc9', enabledCssSnippets: ['field'] }, null, 2)));
englishWritten += Number(writeEnglishVault('.obsidian/graph.json', JSON.stringify({ collapseFilter: false, showTags: true, showAttachments: false, showOrphans: false, colorGroups: [] }, null, 2)));
englishWritten += Number(writeEnglishVault('.obsidian/snippets/field.css', `body { --font-text-theme: Inter, system-ui, sans-serif; --link-color: #245fc9; --interactive-accent: #245fc9; }
.pole-map.markdown-preview-view h1 { font-size: 2.4em; }
.callout[data-callout="abstract"] { --callout-color: 36, 95, 201; }
.callout[data-callout="warning"] { --callout-color: 155, 92, 12; }
`));

const englishZipEntries = {};
for (const controlledPath of englishVaultManifest) {
  const bytes = readFileSync(join(englishVaultDir, controlledPath));
  englishZipEntries[`field-physics-vault/${controlledPath}`] = new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}
writeFileSync(join(rootDir, 'public', 'pole-physics-vault-en.zip'), zipSync(englishZipEntries, { level: 9 }));

console.log(`Контент: ${chapters.length} глав, ${topicCount} карточек, ${formulas.length} формул, ${constants.length} констант.`);
console.log(privateSourcePath
  ? `Private source validated: ${relative(rootDir, privateSourcePath)} · SHA-256 ${privateSourceHash}`
  : 'Private source not provided; using committed normalized content.');
console.log(`Obsidian: создано/обновлено ${written} файлов${forceVault ? ' (принудительное обновление)' : ''}.`);
console.log(`Obsidian EN: создано/обновлено ${englishWritten} файлов${forceVault ? ' (принудительное обновление)' : ''}.`);
