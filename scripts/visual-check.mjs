import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const output = resolve(import.meta.dirname, '..', '.screenshots');
const baseUrl = process.env.VISUAL_BASE_URL ?? 'http://127.0.0.1:4397/';
await mkdir(output, { recursive: true });

const browserExecutable = process.env.BROWSER_EXECUTABLE ?? [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].find(existsSync);
if (!browserExecutable) throw new Error('Не найден Edge/Chrome. Укажите BROWSER_EXECUTABLE.');

const browser = await chromium.launch({
  executablePath: browserExecutable,
  headless: true,
});

const checks = [
  { name: 'home-desktop', url: '#/ru/', viewport: { width: 1440, height: 1000 } },
  { name: 'home-mobile', url: '#/ru/', viewport: { width: 390, height: 844 } },
  { name: 'home-dark', url: '#/ru/', viewport: { width: 1440, height: 1000 }, colorScheme: 'dark' },
  { name: 'catalog-tablet', url: '#/ru/catalog', viewport: { width: 820, height: 1050 } },
  { name: 'lesson-desktop', url: '#/ru/topic/2.5', viewport: { width: 1440, height: 1050 } },
  { name: 'lesson-dark', url: '#/ru/topic/8.7', viewport: { width: 1440, height: 1050 }, colorScheme: 'dark' },
  { name: 'lesson-experiment', url: '#/ru/topic/2.5', viewport: { width: 1440, height: 1050 }, selector: '#experiment' },
  { name: 'lesson-brief', url: '#/ru/topic/3.3', viewport: { width: 1280, height: 900 }, selector: '.experiment-blueprint' },
  { name: 'lesson-model-mobile', url: '#/ru/topic/2.5', viewport: { width: 390, height: 844 }, selector: '.physics-lab' },
  { name: 'lesson-concepts', url: '#/ru/topic/1.5', viewport: { width: 1440, height: 1050 }, selector: '.concept-explanations' },
  { name: 'lesson-example', url: '#/ru/topic/1.5', viewport: { width: 1280, height: 900 }, selector: '.worked-example' },
  { name: 'lesson-example-mobile', url: '#/ru/topic/1.5', viewport: { width: 390, height: 844 }, selector: '.worked-example' },
  { name: 'lesson-formula', url: '#/ru/topic/9.8', viewport: { width: 1440, height: 1050 }, selector: '#math' },
  { name: 'lesson-mobile', url: '#/ru/topic/9.8', viewport: { width: 390, height: 844 } },
  { name: 'lesson-practice-mobile', url: '#/ru/topic/1.5', viewport: { width: 390, height: 844 }, selector: '.practice-grid' },
  { name: 'lesson-formula-320-en', url: '#/en/topic/13.4', viewport: { width: 320, height: 760 }, selector: '.lesson-formulas' },
  { name: 'labs-desktop', url: '#/ru/labs', viewport: { width: 1280, height: 900 } },
  { name: 'formulas-mobile', url: '#/ru/formulas', viewport: { width: 390, height: 844 } },
  { name: 'formulas-list', url: '#/ru/formulas', viewport: { width: 1280, height: 900 }, selector: '.formula-entry' },
  { name: 'home-en-desktop', url: '#/en/', viewport: { width: 1440, height: 1000 } },
  { name: 'catalog-en-tablet', url: '#/en/catalog', viewport: { width: 820, height: 1050 } },
  { name: 'lesson-en-desktop', url: '#/en/topic/8.7', viewport: { width: 1440, height: 1050 } },
  { name: 'formulas-en-mobile', url: '#/en/formulas', viewport: { width: 390, height: 844 } },
];

for (const check of checks) {
  const page = await browser.newPage({ viewport: check.viewport, colorScheme: check.colorScheme ?? 'light' });
  const runtimeErrors = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') runtimeErrors.push(message.text()); });
  await page.goto(`${baseUrl}${check.url}`, { waitUntil: 'networkidle' });
  await page.locator('.app-shell').waitFor();
  const expectedLocale = check.url.startsWith('#/en/') ? 'en' : 'ru';
  if (await page.locator('html').getAttribute('lang') !== expectedLocale) throw new Error(`${check.name}: неверный lang документа`);
  if (expectedLocale === 'en') {
    const cyrillic = await page.locator('body').evaluate((body) => body.innerText.match(/[А-Яа-яЁё]+/gu)?.slice(0, 5) ?? []);
    if (cyrillic.length) throw new Error(`${check.name}: в английском UI осталась кириллица: ${cyrillic.join(', ')}`);
  }
  if (check.selector) await page.locator(check.selector).first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: resolve(output, `${check.name}.png`), fullPage: false });
  const metrics = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  if (metrics.scrollWidth > metrics.width) throw new Error(`${check.name}: горизонтальное переполнение ${metrics.scrollWidth - metrics.width}px`);
  if (check.name === 'lesson-dark' && await page.locator('html').getAttribute('data-theme') !== 'dark') {
    throw new Error(`${check.name}: карточка не применила тёмную тему`);
  }
  if (check.name.startsWith('catalog-')) {
    const rawInlineMath = await page.locator('body').evaluate((body) => body.innerText.match(/\$[^$\n]+\$/u)?.[0] ?? '');
    if (rawInlineMath) throw new Error(`${check.name}: inline-формула показана как сырой Markdown: ${rawInlineMath}`);
  }
  if (check.name === 'lesson-model-mobile') {
    const modelMetrics = await page.locator('.physics-lab').evaluate((model) => {
      const modelBox = model.getBoundingClientRect();
      const stage = model.querySelector('.lab-stage');
      const stageBox = stage?.getBoundingClientRect();
      const readout = model.querySelector('.lab-readout');
      const readoutBox = readout?.getBoundingClientRect();
      return {
        modelLeft: modelBox.left,
        modelRight: modelBox.right,
        stageLeft: stageBox?.left ?? -1,
        stageRight: stageBox?.right ?? Infinity,
        stageBottom: stageBox?.bottom ?? Infinity,
        readoutTop: readoutBox?.top ?? -Infinity,
        readoutInsideStage: Boolean(stage && readout && stage.contains(readout)),
        viewportWidth: document.documentElement.clientWidth,
      };
    });
    if (modelMetrics.modelLeft < -0.5 || modelMetrics.modelRight > modelMetrics.viewportWidth + 0.5
      || modelMetrics.stageLeft < modelMetrics.modelLeft - 0.5 || modelMetrics.stageRight > modelMetrics.modelRight + 0.5) {
      throw new Error(`${check.name}: мобильная физическая модель обрезана по горизонтали (${JSON.stringify(modelMetrics)})`);
    }
    if (modelMetrics.readoutInsideStage || modelMetrics.readoutTop < modelMetrics.stageBottom - 1) {
      throw new Error(`${check.name}: строка результата перекрывает SVG (${JSON.stringify(modelMetrics)})`);
    }
    if (await page.locator('.physics-lab [data-lab-control]').count() !== 1
      || await page.locator('.physics-lab [data-lab-action="toggle"]').count() !== 1
      || await page.locator('.physics-lab [data-lab-action="reset"]').count() !== 1) {
      throw new Error(`${check.name}: на мобильной модели недоступны основные органы управления`);
    }
    const svgLabels = await page.locator('.physics-lab .lab-label, .physics-lab .lab-tick').evaluateAll((labels) => labels.map((label) => {
      const matrix = label.getScreenCTM();
      const scale = matrix ? Math.hypot(matrix.a, matrix.b) : 0;
      return {
        text: label.textContent?.trim() ?? '',
        screenFontSize: parseFloat(getComputedStyle(label).fontSize) * scale,
      };
    }));
    const smallestSvgLabel = Math.min(...svgLabels.map(({ screenFontSize }) => screenFontSize));
    if (!svgLabels.length || !Number.isFinite(smallestSvgLabel) || smallestSvgLabel < 10) {
      throw new Error(`${check.name}: SVG-подписи всё ещё мельче 10 экранных px (${JSON.stringify(svgLabels)})`);
    }
    const projectile = page.locator('.physics-lab [data-lab-part="projectile"]');
    const initialProjectileTime = Number(await projectile.getAttribute('data-time-s'));
    await page.waitForTimeout(220);
    if (await page.locator('.physics-lab').getAttribute('data-running') !== 'false'
      || Math.abs(Number(await projectile.getAttribute('data-time-s')) - initialProjectileTime) > 1e-6) {
      throw new Error(`${check.name}: модель карточки запустилась без команды читателя`);
    }
  }
  if (check.name === 'lesson-formula-320-en') {
    const clippedCards = await page.locator('.lesson-formula').evaluateAll((cards) => cards.filter((card) => {
      const cardBox = card.getBoundingClientRect();
      return [...card.children].some((child) => {
        const childBox = child.getBoundingClientRect();
        return childBox.left < cardBox.left - 0.5 || childBox.right > cardBox.right + 0.5;
      });
    }).length);
    if (clippedCards) throw new Error(`${check.name}: formula card grid children are clipped outside their card`);
    const inaccessibleOverflow = await page.locator('.lesson-formula .math--display').evaluateAll((items) => items.filter((item) => item.scrollWidth > item.clientWidth + 1 && (item.tabIndex !== 0 || getComputedStyle(item).overflowX !== 'auto' || !item.getAttribute('aria-label'))).length);
    if (inaccessibleOverflow) throw new Error(`${check.name}: overflowing equation is not keyboard-scrollable or labeled`);
  }
  if (check.name === 'lesson-desktop' || check.name === 'lesson-mobile') {
    const calmMetrics = await page.evaluate(() => {
      const h1 = document.querySelector('.lesson-header h1');
      const h2 = document.querySelector('.lesson-section h2');
      const roadmap = document.querySelector('.lesson-roadmap');
      const firstParagraph = document.querySelector('#phenomenon .lesson-prose p');
      const conceptText = document.querySelector('.concept-explanation p');
      return {
        h1: h1 ? parseFloat(getComputedStyle(h1).fontSize) : Infinity,
        h2: h2 ? parseFloat(getComputedStyle(h2).fontSize) : Infinity,
        roadmapHeight: roadmap?.getBoundingClientRect().height ?? Infinity,
        firstParagraphTop: firstParagraph?.getBoundingClientRect().top ?? Infinity,
        conceptText: conceptText ? parseFloat(getComputedStyle(conceptText).fontSize) : 0,
        viewportHeight: window.innerHeight,
      };
    });
    const mobileLesson = check.name === 'lesson-mobile';
    if (calmMetrics.h1 > (mobileLesson ? 44 : 68) || calmMetrics.h2 > (mobileLesson ? 32 : 44)) throw new Error(`${check.name}: lesson headings are still presentation-sized (${JSON.stringify(calmMetrics)})`);
    if (calmMetrics.roadmapHeight > (mobileLesson ? 320 : 230) || calmMetrics.firstParagraphTop > calmMetrics.viewportHeight * 1.1) throw new Error(`${check.name}: roadmap/header still delay the actual lesson content (${JSON.stringify(calmMetrics)})`);
    if (calmMetrics.conceptText < 14) throw new Error(`${check.name}: calmer chrome made explanatory text too small`);
  }
  if (check.name === 'lesson-example-mobile') {
    const exampleMetrics = await page.locator('.worked-example').evaluate((example) => ({ height: example.getBoundingClientRect().height, shadow: getComputedStyle(example).boxShadow, radius: parseFloat(getComputedStyle(example).borderRadius) }));
    if (exampleMetrics.height > 420 || exampleMetrics.shadow !== 'none' || exampleMetrics.radius > 16) throw new Error(`${check.name}: unopened worked example remains visually oversized`);
  }
  if (runtimeErrors.length) throw new Error(`${check.name}: ошибки в браузере: ${runtimeErrors.join(' | ')}`);
  await page.close();
}

const interaction = await browser.newPage({ viewport: { width: 1100, height: 850 }, colorScheme: 'light' });
await interaction.goto(`${baseUrl}#/ru/`, { waitUntil: 'networkidle' });
await interaction.keyboard.press('Control+K');
await interaction.locator('.search-dialog__input input').fill('энтропией');
if (!/#\/ru\/topic\/8\.7$/u.test(await interaction.locator('.search-results a').first().getAttribute('href') ?? '')) {
  throw new Error('Морфологический поиск не связал «энтропией» с карточкой «Энтропия»');
}
await interaction.locator('.search-dialog__input input').press('Enter');
await interaction.waitForURL(/#\/ru\/topic\/8\.7$/u);
await interaction.locator('.completion-card button').click();
const completed = await interaction.evaluate(() => JSON.parse(localStorage.getItem('pole:completed') ?? '[]'));
if (!completed.includes('8.7')) throw new Error('Прогресс карточки не сохранился');
await interaction.locator('.lesson-actions button').first().click();
const bookmarks = await interaction.evaluate(() => JSON.parse(localStorage.getItem('pole:bookmarks') ?? '[]'));
if (!bookmarks.includes('8.7')) throw new Error('Закладка не сохранилась');
await interaction.locator('.locale-switch button', { hasText: 'EN' }).click();
await interaction.waitForURL(/#\/en\/topic\/8\.7$/u);
if ((await interaction.locator('.lesson-header h1').textContent()) !== 'Entropy and the Second Law') throw new Error('English card content did not load after locale switch');
await interaction.waitForFunction(() => document.activeElement?.getAttribute('data-locale-option') === 'en');
await interaction.waitForFunction(() => localStorage.getItem('pole:locale') === 'en');
const retained = await interaction.evaluate(() => JSON.parse(localStorage.getItem('pole:completed') ?? '[]'));
if (!retained.includes('8.7')) throw new Error('Progress was lost while switching locale');
await interaction.locator('.header-tools .header-icon').first().click();
if (await interaction.locator('html').getAttribute('data-theme') !== 'dark') throw new Error('Тема не переключилась');
await interaction.close();

const catalogSwitch = await browser.newPage({ viewport: { width: 900, height: 800 }, colorScheme: 'light' });
await catalogSwitch.goto(`${baseUrl}#/ru/catalog`, { waitUntil: 'networkidle' });
await catalogSwitch.locator('.catalog-search input').fill('волною');
if (await catalogSwitch.locator('.catalog-topic[href$="/topic/7.4"]').count() !== 1) throw new Error('Морфологический поиск каталога не нашёл «волна» по запросу «волною»');
await catalogSwitch.locator('.locale-switch button', { hasText: 'EN' }).click();
await catalogSwitch.waitForURL(/#\/en\/catalog$/u);
if ((await catalogSwitch.locator('.catalog-topic h3').first().textContent()) !== 'Physics as Model Building') throw new Error('Catalog cards stayed in Russian after in-place locale switch');
const catalogCyrillic = await catalogSwitch.locator('body').evaluate((body) => body.innerText.match(/[А-Яа-яЁё]+/gu) ?? []);
if (catalogCyrillic.length) throw new Error(`Catalog contains Cyrillic after locale switch: ${catalogCyrillic.slice(0, 5).join(', ')}`);
await catalogSwitch.locator('.catalog-search input').fill('Measurement Error and Uncertainty');
await catalogSwitch.waitForFunction(() => document.querySelector('.catalog-result-count')?.textContent?.trim() === '1 card');
await catalogSwitch.close();

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, colorScheme: 'light' });
await mobile.goto(`${baseUrl}#/ru/topic/3.3`, { waitUntil: 'networkidle' });
if (!(await mobile.locator('.book-sidebar').evaluate((element) => element.inert))) throw new Error('Скрытое мобильное оглавление не inert');
await mobile.locator('.sidebar-search').evaluate((element) => element.focus());
if (await mobile.locator('.sidebar-search').evaluate((element) => element === document.activeElement)) throw new Error('Фокус попал в скрытое оглавление');
await mobile.locator('.mobile-sidebar-trigger').click();
if (!(await mobile.locator('.book-sidebar').getAttribute('class'))?.includes('is-open')) throw new Error('Мобильное оглавление не открылось');
if ((await mobile.locator('.mobile-sidebar-trigger').getAttribute('aria-expanded')) !== 'true' || (await mobile.locator('.mobile-sidebar-trigger').getAttribute('aria-controls')) !== 'book-sidebar') throw new Error('Кнопка мобильного оглавления не сообщает его состояние');
await mobile.keyboard.press('Escape');
if ((await mobile.locator('.book-sidebar').getAttribute('class'))?.includes('is-open')) throw new Error('Escape не закрыл мобильное оглавление');
if (!(await mobile.locator('.mobile-sidebar-trigger').evaluate((element) => element === document.activeElement))) throw new Error('После закрытия оглавления фокус не вернулся на кнопку открытия');
await mobile.locator('.mobile-sidebar-trigger').click();
await mobile.locator('.sidebar-search').click();
await mobile.locator('.search-dialog__input input').waitFor();
if (!(await mobile.locator('.search-dialog__input input').evaluate((element) => element === document.activeElement))) throw new Error('Поиск не получил фокус после открытия из мобильного оглавления');
await mobile.keyboard.press('Escape');
if (!(await mobile.locator('.mobile-sidebar-trigger').evaluate((element) => element === document.activeElement))) throw new Error('Поиск не вернул фокус на кнопку мобильного оглавления');
await mobile.locator('.mobile-menu-button').click();
await mobile.keyboard.press('Escape');
if ((await mobile.locator('.mobile-menu-button').getAttribute('aria-expanded')) !== 'false') throw new Error('Escape не закрыл мобильное меню');
if (!(await mobile.locator('.mobile-menu-button').evaluate((element) => element === document.activeElement))) throw new Error('После закрытия меню фокус не вернулся на его кнопку');
await mobile.close();

const lessonA11y = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
await lessonA11y.goto(`${baseUrl}#/en/topic/2.5`, { waitUntil: 'networkidle' });
await lessonA11y.keyboard.press('Tab');
const skipLink = lessonA11y.locator('[data-skip-link]');
if (!(await skipLink.evaluate((element) => element === document.activeElement))) throw new Error('Skip link is not the first focusable application element');
if (await skipLink.getAttribute('href') !== '#phenomenon') throw new Error('Lesson skip link does not identify the lesson content target');
const focusedSkipLinkBox = await skipLink.boundingBox();
if (!focusedSkipLinkBox || focusedSkipLinkBox.width <= 1 || focusedSkipLinkBox.height <= 1) throw new Error('Focused skip link remains visually hidden');
const routeBeforeSkip = lessonA11y.url();
await skipLink.press('Enter');
await lessonA11y.waitForFunction(() => document.activeElement?.id === 'phenomenon');
if (lessonA11y.url() !== routeBeforeSkip) throw new Error('Skip link broke the hash-based book route');
const outlineLinks = lessonA11y.locator('.lesson-outline > a');
if (await outlineLinks.count() !== 8) throw new Error('On-page outline is not a complete set of semantic links');
const modelOutlineLink = outlineLinks.filter({ hasText: 'Explanation' });
if (!/#\/en\/topic\/2\.5\/model$/u.test(await modelOutlineLink.getAttribute('href') ?? '')) throw new Error('Outline link has no shareable section URL');
await modelOutlineLink.click();
await lessonA11y.waitForURL(/#\/en\/topic\/2\.5\/model$/u);
await lessonA11y.waitForFunction(() => {
  const element = document.getElementById('model');
  const top = element?.getBoundingClientRect().top ?? Infinity;
  return document.activeElement === element && top >= 55 && top <= 180;
});
if (await modelOutlineLink.getAttribute('aria-current') !== 'location') throw new Error('Active outline link does not expose aria-current');
const roadmapButtons = lessonA11y.locator('.lesson-roadmap button');
const conceptSections = lessonA11y.locator('.concept-explanation');
if (await roadmapButtons.count() !== await conceptSections.count() || await roadmapButtons.count() < 4) throw new Error('Card roadmap does not cover every explained concept');
const firstConceptTarget = await roadmapButtons.first().getAttribute('aria-controls');
if (!firstConceptTarget || !(await lessonA11y.locator(`#${firstConceptTarget} p`).textContent())?.trim()) throw new Error('Roadmap points to a concept without an explanation');
const routeBeforeRoadmapClick = lessonA11y.url();
await roadmapButtons.first().click();
if (lessonA11y.url() !== routeBeforeRoadmapClick) throw new Error('Local concept navigation broke the hash-based book route');
await lessonA11y.waitForFunction((target) => {
  const element = document.getElementById(target);
  if (!element) return false;
  const top = element.getBoundingClientRect().top;
  return document.activeElement === element && top >= 55 && top <= 180;
}, firstConceptTarget);
const exampleButton = lessonA11y.locator('.worked-example > button');
const exampleSteps = lessonA11y.locator('.worked-example__steps li');
const totalExampleSteps = Number(await lessonA11y.locator('.worked-example__steps').getAttribute('data-total-steps'));
if (await lessonA11y.locator('#example > h2').count() !== 1) throw new Error('Worked-example section has no level-two heading');
if (totalExampleSteps < 3 || await exampleSteps.count() !== 1 || await lessonA11y.locator('.worked-example__result').count()) throw new Error('Worked example does not start as a compact step-by-step exercise');
for (let index = 0; index < totalExampleSteps; index += 1) await exampleButton.click();
if (!(await lessonA11y.locator('.worked-example__result').isVisible()) || await lessonA11y.locator('.worked-example__steps li.is-visible').count() !== totalExampleSteps) throw new Error('Worked example cannot reveal its complete solution');
const practiceReveal = lessonA11y.locator('.practice-card').first().locator('.lesson-reveal').first();
const practiceButton = practiceReveal.locator('button');
if ((await practiceButton.getAttribute('aria-expanded')) !== 'false') throw new Error('Practice hint starts with invalid disclosure state');
await practiceButton.click();
if ((await practiceButton.getAttribute('aria-expanded')) !== 'true' || !(await practiceReveal.locator('div').isVisible())) throw new Error('Practice hint is not revealed accessibly');
await lessonA11y.goto(`${baseUrl}#/en/topic/3.3`, { waitUntil: 'networkidle' });
if (await lessonA11y.locator('.physics-lab').count() || await lessonA11y.locator('.lab-status--ready').count()) throw new Error('A card without a working model still renders fake interactive scaffolding');
if (await lessonA11y.locator('.experiment-blueprint').count() !== 1 || await lessonA11y.locator('.concept-explanation p').count() < 4) throw new Error('A non-lab card lacks a clear experiment brief or full concept explanations');
if (await lessonA11y.locator('.related-topic-grid a').count() < 2) throw new Error('Full lesson does not provide clickable related-card navigation');
await lessonA11y.goto(`${baseUrl}#/en/topic/3.3/limits`, { waitUntil: 'networkidle' });
await lessonA11y.waitForFunction(() => {
  const top = document.getElementById('limits')?.getBoundingClientRect().top ?? Infinity;
  return top >= 55 && top <= 180;
});
if (await lessonA11y.locator('.lesson-outline > a[aria-current="location"]').getAttribute('href') !== '#/en/topic/3.3/limits') throw new Error('A directly opened section URL is not reflected in the outline');
const routeBeforeRelated = lessonA11y.url();
await lessonA11y.locator('.related-topic-grid a').first().focus();
await lessonA11y.locator('.related-topic-grid a').first().press('Enter');
await lessonA11y.waitForFunction((previousUrl) => window.location.href !== previousUrl && document.activeElement?.matches('.book-main h1') && window.scrollY <= 1, routeBeforeRelated);
await lessonA11y.close();

const malformed = await browser.newPage({ viewport: { width: 900, height: 700 } });
await malformed.goto(`${baseUrl}#/%E0%A4%A`, { waitUntil: 'networkidle' });
if (!(await malformed.locator('.home-page').count())) throw new Error('Повреждённый hash сломал приложение');
await malformed.close();

const firstEnglishVisit = await browser.newPage({ viewport: { width: 900, height: 700 }, locale: 'en-US' });
await firstEnglishVisit.goto(baseUrl, { waitUntil: 'networkidle' });
if (await firstEnglishVisit.locator('html').getAttribute('lang') !== 'en' || !/#\/en\/$/u.test(firstEnglishVisit.url())) throw new Error('Browser locale did not select and canonicalize English on first visit');
await firstEnglishVisit.keyboard.press('Control+K');
await firstEnglishVisit.locator('.search-dialog__input input').fill('triangle inequality');
await firstEnglishVisit.locator('.search-dialog__input input').press('Enter');
await firstEnglishVisit.waitForURL(/#\/en\/topic\/1\.5$/u);
await firstEnglishVisit.close();

const blockedStorage = await browser.newPage({ viewport: { width: 900, height: 700 } });
await blockedStorage.addInitScript(() => {
  Storage.prototype.getItem = () => { throw new DOMException('blocked', 'SecurityError'); };
  Storage.prototype.setItem = () => { throw new DOMException('blocked', 'SecurityError'); };
});
await blockedStorage.goto(`${baseUrl}#/ru/`, { waitUntil: 'networkidle' });
if (!(await blockedStorage.locator('.home-page').count())) throw new Error('Недоступный localStorage сломал приложение');
await blockedStorage.close();

const labPhysics = await browser.newPage({ viewport: { width: 1100, height: 850 } });
await labPhysics.goto(`${baseUrl}#/ru/labs`, { waitUntil: 'networkidle' });

const animatedLabModes = new Set(['motion', 'wave', 'quantum', 'cosmos']);
const selectLab = async (mode) => {
  await labPhysics.locator(`#lab-tab-${mode}`).click();
  const lab = labPhysics.locator(`.physics-lab[data-lab-mode="${mode}"]`);
  await lab.waitFor();
  const readoutGeometry = await lab.evaluate((element) => {
    const stage = element.querySelector('.lab-stage');
    const readout = element.querySelector('.lab-readout');
    const stageBox = stage?.getBoundingClientRect();
    const readoutBox = readout?.getBoundingClientRect();
    return {
      directSibling: stage?.nextElementSibling === readout,
      nested: Boolean(stage && readout && stage.contains(readout)),
      stageBottom: stageBox?.bottom ?? Infinity,
      readoutTop: readoutBox?.top ?? -Infinity,
    };
  });
  if (!readoutGeometry.directSibling || readoutGeometry.nested || readoutGeometry.readoutTop < readoutGeometry.stageBottom - 1) {
    throw new Error(`${mode}: строка результата не вынесена под SVG (${JSON.stringify(readoutGeometry)})`);
  }
  if (animatedLabModes.has(mode)) {
    const toggle = lab.locator('[data-lab-action="toggle"]');
    if (await lab.getAttribute('data-running') !== 'false' || await toggle.getAttribute('aria-pressed') !== 'false') {
      throw new Error(`${mode}: анимация стартовала без команды читателя`);
    }
  }
  return lab;
};

const measureLab = await selectLab('measure');
const measureControl = measureLab.locator('[data-lab-control]');
const sampleCountControl = measureLab.locator('[data-lab-control-secondary="sample-count"]');
const readMeasurementSample = () => measureLab.locator('[data-model][data-observed]').evaluateAll((points) => {
  const residuals = points.map((point) => Number(point.getAttribute('data-observed')) - Number(point.getAttribute('data-model')));
  const mean = residuals.reduce((sum, value) => sum + value, 0) / residuals.length;
  const sampleVariance = residuals.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (residuals.length - 1);
  return {
    count: points.length,
    seed: Number(points[0]?.getAttribute('data-sample-seed')),
    sampleDeviation: Math.sqrt(sampleVariance),
    observed: points.map((point) => Number(point.getAttribute('data-observed'))),
  };
});

if (await sampleCountControl.count() !== 1 || await measureLab.locator('[data-lab-action="resample"]').count() !== 1) {
  throw new Error('Лаборатория измерений не даёт менять n или создавать новую выборку');
}
await measureControl.fill('0');
await labPhysics.waitForFunction(() => {
  const lab = document.querySelector('.physics-lab[data-lab-mode="measure"]');
  const points = [...(lab?.querySelectorAll('[data-model][data-observed]') ?? [])];
  return lab?.querySelector('[data-lab-control]')?.value === '0'
    && points.length === 16
    && points.every((point) => Math.abs(Number(point.getAttribute('data-model')) - Number(point.getAttribute('data-observed'))) < 1e-8);
});
const noiselessPoints = await measureLab.locator('[data-model][data-observed]').evaluateAll((points) => points.map((point) => ({
  model: Number(point.getAttribute('data-model')),
  observed: Number(point.getAttribute('data-observed')),
})));
if (noiselessPoints.length !== 16 || noiselessPoints.some(({ model, observed }) => !Number.isFinite(model) || Math.abs(model - observed) > 1e-8)) {
  throw new Error('При σ = 0 измеренные точки не совпадают с общей моделью сигнала');
}
await measureControl.fill('50');
await labPhysics.waitForFunction(() => {
  const lab = document.querySelector('.physics-lab[data-lab-mode="measure"]');
  const points = [...(lab?.querySelectorAll('[data-model][data-observed]') ?? [])];
  return lab?.querySelector('[data-lab-control]')?.value === '50'
    && lab?.querySelector('.lab-readout strong')?.textContent?.includes('σ = 1.00')
    && points.some((point) => Math.abs(Number(point.getAttribute('data-model')) - Number(point.getAttribute('data-observed'))) > 1e-4);
});
const defaultMeasurementSample = await readMeasurementSample();
const measurementReadout = (await measureLab.locator('.lab-readout strong').textContent()) ?? '';
const displayedStatistics = measurementReadout.match(/σ = ([\d.]+).*s = ([\d.]+).*n = (\d+)/u);
if (defaultMeasurementSample.count !== 16 || !displayedStatistics
  || Math.abs(defaultMeasurementSample.sampleDeviation - Number(displayedStatistics[2])) > 0.011
  || Math.abs(defaultMeasurementSample.sampleDeviation - Number(displayedStatistics[1])) < 0.02) {
  throw new Error(`Выборочное s по-прежнему принудительно равно σ или неверно показано: ${JSON.stringify({ defaultMeasurementSample, measurementReadout })}`);
}
await sampleCountControl.fill('32');
await labPhysics.waitForFunction(() => document.querySelectorAll('.physics-lab[data-lab-mode="measure"] [data-model][data-observed]').length === 32);
const largerMeasurementSample = await readMeasurementSample();
if (largerMeasurementSample.count !== 32 || await sampleCountControl.getAttribute('aria-valuetext') !== 'n = 32') {
  throw new Error('Ползунок n не меняет фактический объём выборки');
}
await measureLab.locator('[data-lab-action="resample"]').click();
await labPhysics.waitForFunction((seed) => Number(document.querySelector('.physics-lab[data-lab-mode="measure"] [data-sample-seed]')?.getAttribute('data-sample-seed')) !== seed, largerMeasurementSample.seed);
const resampledMeasurement = await readMeasurementSample();
if (resampledMeasurement.seed === largerMeasurementSample.seed
  || resampledMeasurement.observed.every((value, index) => Math.abs(value - largerMeasurementSample.observed[index]) < 1e-8)
  || Math.abs(resampledMeasurement.sampleDeviation - largerMeasurementSample.sampleDeviation) < 1e-4) {
  throw new Error('Новая выборка не меняет реализацию шума и выборочное s');
}

const motionLab = await selectLab('motion');
const motionControl = motionLab.locator('[data-lab-control]');
const motionToggle = motionLab.locator('[data-lab-action="toggle"]');
const initialMotionTime = Number(await motionLab.locator('[data-lab-part="projectile"]').getAttribute('data-time-s'));
await labPhysics.waitForTimeout(220);
if (Math.abs(Number(await motionLab.locator('[data-lab-part="projectile"]').getAttribute('data-time-s')) - initialMotionTime) > 1e-6) {
  throw new Error('Баллистика движется до нажатия Play');
}
const motionSamples = [];
for (const angle of [15, 45, 75]) {
  const expectedRange = 24 ** 2 * Math.sin(2 * angle * Math.PI / 180) / 9.81;
  await motionControl.fill(String(angle));
  await labPhysics.waitForFunction(({ expected }) => {
    const trajectory = document.querySelector('.physics-lab[data-lab-mode="motion"] [data-lab-part="trajectory"]');
    return trajectory && Math.abs(Number(trajectory.getAttribute('data-range-m')) - expected) < 1e-5;
  }, { expected: expectedRange });
  const sample = await motionLab.evaluate((lab) => {
    const trajectory = lab.querySelector('[data-lab-part="trajectory"]');
    const axis = lab.querySelector('[data-lab-part="motion-x-axis"]');
    if (!trajectory || !axis) throw new Error('Нет геометрии траектории или оси');
    const points = (trajectory.getAttribute('points') ?? '').trim().split(/\s+/u).map((point) => point.split(',').map(Number));
    return {
      range: Number(trajectory.getAttribute('data-range-m')),
      flightTime: Number(trajectory.getAttribute('data-flight-time-s')),
      declaredEndX: Number(trajectory.getAttribute('data-end-x')),
      first: points.at(0),
      last: points.at(-1),
      axisX1: Number(axis.getAttribute('x1')),
      axisX2: Number(axis.getAttribute('x2')),
      physicalMin: Number(axis.getAttribute('data-physical-min-m')),
      physicalMax: Number(axis.getAttribute('data-physical-max-m')),
    };
  });
  if (!sample.first || !sample.last || Math.abs(sample.range - expectedRange) > 1e-5 || Math.abs(sample.last[0] - sample.declaredEndX) > 0.02 || Math.abs(sample.last[1] - sample.first[1]) > 0.02) {
    throw new Error(`Траектория при ${angle}° не согласована с формулой дальности`);
  }
  const pixelsPerMetre = (sample.last[0] - sample.first[0]) / sample.range;
  const axisPixelsPerMetre = (sample.axisX2 - sample.axisX1) / (sample.physicalMax - sample.physicalMin);
  if (Math.abs(pixelsPerMetre - axisPixelsPerMetre) / axisPixelsPerMetre > 0.03) throw new Error(`Масштаб траектории при ${angle}° не согласован с осью x`);
  motionSamples.push({ ...sample, pixelsPerMetre });
}
if (Math.max(...motionSamples.map(({ pixelsPerMetre }) => pixelsPerMetre)) - Math.min(...motionSamples.map(({ pixelsPerMetre }) => pixelsPerMetre)) > 0.01
  || Math.abs(motionSamples[0].range - motionSamples[2].range) > 1e-5
  || motionSamples[1].last[0] - motionSamples[0].last[0] < 150) {
  throw new Error('Экранный масштаб траекторий зависит от угла или скрывает различие дальностей');
}
await motionToggle.click();
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="motion"]')?.getAttribute('data-running') === 'true'
  && Number(document.querySelector('.physics-lab[data-lab-mode="motion"] [data-lab-part="projectile"]')?.getAttribute('data-time-s')) > 0.15);
const motionTimeBeforeParameterChange = Number(await motionLab.locator('[data-lab-part="projectile"]').getAttribute('data-time-s'));
const motionGenerationBeforeParameterChange = Number(await motionLab.getAttribute('data-reset-generation'));
await motionControl.fill('74');
await labPhysics.waitForFunction((time) => Number(document.querySelector('.physics-lab[data-lab-mode="motion"] [data-lab-part="projectile"]')?.getAttribute('data-time-s')) > time + 0.03, motionTimeBeforeParameterChange);
if (Number(await motionLab.getAttribute('data-reset-generation')) !== motionGenerationBeforeParameterChange) {
  throw new Error('Изменение угла сбрасывает часы баллистики');
}
await motionToggle.click();
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="motion"]')?.getAttribute('data-running') === 'false');
await labPhysics.waitForTimeout(60);
const pausedMotionTime = Number(await motionLab.locator('[data-lab-part="projectile"]').getAttribute('data-time-s'));
await labPhysics.waitForTimeout(220);
const stillPausedMotionTime = Number(await motionLab.locator('[data-lab-part="projectile"]').getAttribute('data-time-s'));
if (Math.abs(stillPausedMotionTime - pausedMotionTime) > 1e-6) throw new Error('Пауза сбрасывает или продолжает движение снаряда');
await motionToggle.click();
await labPhysics.waitForFunction((pausedAt) => Number(document.querySelector('.physics-lab[data-lab-mode="motion"] [data-lab-part="projectile"]')?.getAttribute('data-time-s')) > pausedAt + 0.06, pausedMotionTime);
const motionGenerationBeforeReset = Number(await motionLab.getAttribute('data-reset-generation'));
await motionLab.locator('[data-lab-action="reset"]').click();
await labPhysics.waitForFunction((generation) => {
  const lab = document.querySelector('.physics-lab[data-lab-mode="motion"]');
  return Number(lab?.getAttribute('data-reset-generation')) > generation
    && lab?.getAttribute('data-running') === 'false'
    && Number(lab?.querySelector('[data-lab-part="projectile"]')?.getAttribute('data-time-s')) < 0.01;
}, motionGenerationBeforeReset);

const waveLab = await selectLab('wave');
const wave = waveLab.locator('[data-lab-part="wave"]');
const waveControl = waveLab.locator('[data-lab-control]');
const waveToggle = waveLab.locator('[data-lab-action="toggle"]');
const wavePhysics = await wave.evaluate((element) => ({
  frequency: Number(element.getAttribute('data-frequency-hz')),
  wavelength: Number(element.getAttribute('data-wavelength-m')),
  length: Number(element.getAttribute('data-window-m')),
  speed: Number(element.getAttribute('data-speed-mps')),
  cycles: Number(element.getAttribute('data-cycles')),
}));
if (Math.abs(wavePhysics.frequency * wavePhysics.wavelength - wavePhysics.speed) > 1e-6
  || Math.abs(wavePhysics.length - 10) > 1e-9
  || Math.abs(wavePhysics.cycles - wavePhysics.length / wavePhysics.wavelength) > 1e-6) {
  throw new Error('Волновая модель нарушает v = fλ или меняет физическую длину окна');
}
const initialWavePoints = await wave.getAttribute('points');
const initialWaveTime = Number(await wave.getAttribute('data-time-s'));
await labPhysics.waitForTimeout(220);
if (await wave.getAttribute('points') !== initialWavePoints || Math.abs(Number(await wave.getAttribute('data-time-s')) - initialWaveTime) > 1e-6) {
  throw new Error('Волна движется до нажатия Play');
}
await waveToggle.click();
await labPhysics.waitForFunction(() => Number(document.querySelector('.physics-lab[data-lab-mode="wave"] [data-lab-part="wave"]')?.getAttribute('data-time-s')) > 0.15);
const waveTimeBeforeParameterChange = Number(await wave.getAttribute('data-time-s'));
const waveGenerationBeforeParameterChange = Number(await waveLab.getAttribute('data-reset-generation'));
await waveControl.fill('60');
await labPhysics.waitForFunction((time) => {
  const waveElement = document.querySelector('.physics-lab[data-lab-mode="wave"] [data-lab-part="wave"]');
  return Math.abs(Number(waveElement?.getAttribute('data-frequency-hz')) - (0.6 + 60 / 28)) < 1e-6
    && Number(waveElement?.getAttribute('data-time-s')) > time + 0.03;
}, waveTimeBeforeParameterChange);
if (Number(await waveLab.getAttribute('data-reset-generation')) !== waveGenerationBeforeParameterChange) {
  throw new Error('Изменение частоты сбрасывает часы волны');
}
await waveToggle.click();
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="wave"]')?.getAttribute('data-running') === 'false');
await labPhysics.waitForTimeout(60);
const pausedWavePoints = await wave.getAttribute('points');
await labPhysics.waitForTimeout(220);
if (await wave.getAttribute('points') !== pausedWavePoints) throw new Error('Волна продолжает эволюцию на паузе');
await waveToggle.click();
await labPhysics.waitForFunction((points) => document.querySelector('.physics-lab[data-lab-mode="wave"] [data-lab-part="wave"]')?.getAttribute('points') !== points, pausedWavePoints);

const fieldLab = await selectLab('field');
await fieldLab.locator('[data-lab-control]').fill('0');
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="field"] [data-lab-part="charge"][data-charge-index="1"]')?.getAttribute('data-charge') === '0.00');
const fieldVectors = await fieldLab.locator('[data-lab-part="field-vector"]').evaluateAll((vectors) => vectors.map((vector) => {
  const dx = Number(vector.getAttribute('x2')) - Number(vector.getAttribute('x1'));
  const dy = Number(vector.getAttribute('y2')) - Number(vector.getAttribute('y1'));
  return {
    length: Math.hypot(dx, dy),
    x: Number(vector.getAttribute('data-field-x')),
    y: Number(vector.getAttribute('data-field-y')),
  };
}));
const fieldLengths = fieldVectors.map(({ length }) => length);
const neutralNeighbourCount = fieldVectors.filter(({ x, y }) => Math.hypot(x - 1, y) < 0.34).length;
if (fieldVectors.length < 40 || Math.max(...fieldLengths) - Math.min(...fieldLengths) < 8) throw new Error('Длины стрелок поля не передают изменение |E|');
if (neutralNeighbourCount < 2) throw new Error('Нулевой второй заряд искусственно вырезает векторное поле вокруг нейтрального маркера');
if (!((await fieldLab.locator('.lab-field-legend').textContent()) ?? '').includes('относительно этого кадра')) {
  throw new Error('Легенда поля не предупреждает о покадровой относительной нормировке |E|');
}

const relativityLab = await selectLab('relativity');
await relativityLab.locator('[data-lab-control]').fill('65');
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="relativity"] [data-lab-part="worldline"]')?.getAttribute('data-beta') === '0.650000');
const spacetimeGeometry = await relativityLab.evaluate((lab) => {
  const coordinates = (line) => ({
    dx: Number(line.getAttribute('x2')) - Number(line.getAttribute('x1')),
    dy: Number(line.getAttribute('y2')) - Number(line.getAttribute('y1')),
  });
  const rightLight = lab.querySelector('[data-lab-part="light-line"][data-direction="right"]');
  const leftLight = lab.querySelector('[data-lab-part="light-line"][data-direction="left"]');
  const worldline = lab.querySelector('[data-lab-part="worldline"]');
  const simultaneity = [...lab.querySelectorAll('[data-lab-part="simultaneity-line"]')];
  if (!rightLight || !leftLight || !worldline || !simultaneity.length) throw new Error('Нет геометрии диаграммы пространства-времени');
  return {
    rightLight: coordinates(rightLight),
    leftLight: coordinates(leftLight),
    worldline: coordinates(worldline),
    beta: Number(worldline.getAttribute('data-beta')),
    simultaneity: simultaneity.map(coordinates),
  };
});
const rightLightSlope = spacetimeGeometry.rightLight.dx / -spacetimeGeometry.rightLight.dy;
const leftLightSlope = spacetimeGeometry.leftLight.dx / -spacetimeGeometry.leftLight.dy;
const worldlineSlope = spacetimeGeometry.worldline.dx / -spacetimeGeometry.worldline.dy;
const simultaneitySlopes = spacetimeGeometry.simultaneity.map(({ dx, dy }) => -dy / dx);
if (Math.abs(rightLightSlope - 1) > 1e-6 || Math.abs(leftLightSlope + 1) > 1e-6
  || Math.abs(worldlineSlope - spacetimeGeometry.beta) > 1e-6
  || simultaneitySlopes.some((slope) => Math.abs(slope - spacetimeGeometry.beta) > 1e-6)) {
  throw new Error('Фактические SVG-наклоны световых, мировой или линий одновременности не согласованы с β');
}

const quantumLab = await selectLab('quantum');
const quantumGroup = quantumLab.locator('.lab-detections');
const quantumCurve = quantumLab.locator('[data-lab-part="quantum-curve"]');
const quantumControl = quantumLab.locator('[data-lab-control]');
const slitWidthControl = quantumLab.locator('[data-lab-control-secondary="slit-width"]');
const quantumToggle = quantumLab.locator('[data-lab-action="toggle"]');
const readQuantumGeometry = () => quantumLab.evaluate((lab) => {
  const curve = lab.querySelector('[data-lab-part="quantum-curve"]');
  const slits = [...lab.querySelectorAll('.lab-slit')].map((slit) => ({
    y: Number(slit.getAttribute('y')),
    height: Number(slit.getAttribute('height')),
  }));
  return {
    dOverLambda: Number(curve?.getAttribute('data-d-over-lambda')),
    aOverLambda: Number(curve?.getAttribute('data-a-over-lambda')),
    pixelsPerLambda: Number(curve?.getAttribute('data-pixels-per-lambda')),
    declaredSeparation: Number(curve?.getAttribute('data-slit-separation')),
    declaredHeight: Number(curve?.getAttribute('data-slit-height')),
    points: curve?.getAttribute('points') ?? '',
    slits,
    readout: lab.querySelector('.lab-readout strong')?.textContent ?? '',
  };
});
const assertQuantumGeometry = (geometry, label) => {
  const centers = geometry.slits.map(({ y, height }) => y + height / 2);
  const renderedSeparation = centers.length === 2 ? Math.abs(centers[1] - centers[0]) : NaN;
  if (!(geometry.pixelsPerLambda > 0) || geometry.slits.length !== 2
    || geometry.slits.some(({ height }) => Math.abs(height - geometry.aOverLambda * geometry.pixelsPerLambda) > 1e-3)
    || Math.abs(renderedSeparation - geometry.dOverLambda * geometry.pixelsPerLambda) > 1e-3
    || Math.abs(geometry.declaredSeparation - renderedSeparation) > 1e-3
    || Math.abs(geometry.declaredHeight - geometry.slits[0].height) > 1e-3
    || !geometry.readout.includes(`d/λ = ${geometry.dOverLambda.toFixed(2)}`)
    || !geometry.readout.includes(`a/λ = ${geometry.aOverLambda.toFixed(2)}`)) {
    throw new Error(`${label}: геометрия щелей не согласована с d/λ и a/λ (${JSON.stringify(geometry)})`);
  }
};
if (await slitWidthControl.count() !== 1) throw new Error('Квантовая лаборатория не даёт менять ширину щели a/λ');
const initialQuantumCount = Number(await quantumGroup.getAttribute('data-event-count'));
await labPhysics.waitForTimeout(220);
if (initialQuantumCount !== 0 || Number(await quantumGroup.getAttribute('data-event-count')) !== 0) {
  throw new Error('Квантовые события накапливаются до нажатия Play');
}
const defaultQuantumGeometry = await readQuantumGeometry();
assertQuantumGeometry(defaultQuantumGeometry, 'Начальная конфигурация двух щелей');
const quantumGenerationBeforeSeparation = Number(await quantumLab.getAttribute('data-reset-generation'));
await quantumControl.fill('70');
await labPhysics.waitForFunction(() => Math.abs(Number(document.querySelector('.physics-lab[data-lab-mode="quantum"] [data-lab-part="quantum-curve"]')?.getAttribute('data-d-over-lambda')) - (0.7 + 70 / 24)) < 1e-6);
if (Number(await quantumLab.getAttribute('data-reset-generation')) <= quantumGenerationBeforeSeparation) throw new Error('Изменение d/λ не очищает накопление квантовых событий');
const separatedQuantumGeometry = await readQuantumGeometry();
assertQuantumGeometry(separatedQuantumGeometry, 'Изменённое расстояние между щелями');
if (separatedQuantumGeometry.declaredSeparation <= defaultQuantumGeometry.declaredSeparation || separatedQuantumGeometry.points === defaultQuantumGeometry.points) {
  throw new Error('Изменение d/λ не перестраивает геометрию и распределение');
}
const quantumGenerationBeforeWidth = Number(await quantumLab.getAttribute('data-reset-generation'));
await slitWidthControl.fill('0.8');
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="quantum"] [data-lab-part="quantum-curve"]')?.getAttribute('data-a-over-lambda') === '0.80000000');
if (Number(await quantumLab.getAttribute('data-reset-generation')) <= quantumGenerationBeforeWidth) throw new Error('Изменение a/λ не очищает накопление квантовых событий');
const wideSlitQuantumGeometry = await readQuantumGeometry();
assertQuantumGeometry(wideSlitQuantumGeometry, 'Изменённая ширина щелей');
if (wideSlitQuantumGeometry.declaredHeight <= separatedQuantumGeometry.declaredHeight || wideSlitQuantumGeometry.points === separatedQuantumGeometry.points) {
  throw new Error('Изменение a/λ не перестраивает геометрию и дифракционную огибающую');
}
await quantumToggle.click();
await labPhysics.waitForFunction(() => Number(document.querySelector('.physics-lab[data-lab-mode="quantum"] .lab-detections')?.getAttribute('data-event-count')) >= 10);
const quantumSampleCount = Number(await quantumLab.locator('[data-lab-part="quantum-curve"]').getAttribute('data-sample-count'));
const quantumCurvePointCount = ((await quantumLab.locator('[data-lab-part="quantum-curve"]').getAttribute('points')) ?? '').trim().split(/\s+/u).length;
const quantumDetections = await quantumLab.locator('[data-lab-part="quantum-detection"]').evaluateAll((detections) => detections.map((detection) => ({
  index: Number(detection.getAttribute('data-curve-index')),
  u: Number(detection.getAttribute('data-u')),
})));
if (quantumSampleCount !== quantumCurvePointCount || quantumDetections.length < 10 || quantumDetections.some(({ index, u }) => {
  const expectedU = -0.9 + 1.8 * index / (quantumSampleCount - 1);
  return !Number.isInteger(index) || index < 0 || index >= quantumSampleCount || Math.abs(u - expectedU) > 2e-6;
})) throw new Error('Квантовые события ссылаются на несуществующие или неверные точки распределения');
await quantumToggle.click();
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="quantum"]')?.getAttribute('data-running') === 'false');
await labPhysics.waitForTimeout(60);
const pausedQuantumCount = Number(await quantumGroup.getAttribute('data-event-count'));
await labPhysics.waitForTimeout(220);
if (Number(await quantumGroup.getAttribute('data-event-count')) !== pausedQuantumCount) throw new Error('Квантовые события продолжают накапливаться на паузе');
await quantumToggle.click();
await labPhysics.waitForFunction((count) => Number(document.querySelector('.physics-lab[data-lab-mode="quantum"] .lab-detections')?.getAttribute('data-event-count')) > count, pausedQuantumCount);
await labPhysics.waitForFunction(() => Number(document.querySelector('.physics-lab[data-lab-mode="quantum"] .lab-detections')?.getAttribute('data-event-count')) >= 14);
const quantumGeneration = Number(await quantumLab.getAttribute('data-reset-generation'));
await quantumLab.locator('[data-lab-action="reset"]').click();
await labPhysics.waitForFunction(({ generation }) => {
  const lab = document.querySelector('.physics-lab[data-lab-mode="quantum"]');
  return Number(lab?.getAttribute('data-reset-generation')) > generation
    && lab?.getAttribute('data-running') === 'false'
    && Number(lab?.querySelector('.lab-detections')?.getAttribute('data-event-count')) === 0;
}, { generation: quantumGeneration });
if (Number(await quantumGroup.getAttribute('data-event-count')) !== 0
  || await quantumControl.inputValue() !== '52' || await slitWidthControl.inputValue() !== '0.5') {
  throw new Error('Сброс не очищает квантовые события или не возвращает геометрию по умолчанию');
}

const cosmosLab = await selectLab('cosmos');
const planet = cosmosLab.locator('[data-lab-part="planet"]');
const cosmosToggle = cosmosLab.locator('[data-lab-action="toggle"]');
const cosmosControl = cosmosLab.locator('[data-lab-control]');
const initialMeanAnomaly = Number(await planet.getAttribute('data-mean-anomaly'));
await labPhysics.waitForTimeout(220);
if (Math.abs(Number(await planet.getAttribute('data-mean-anomaly')) - initialMeanAnomaly) > 1e-6) throw new Error('Орбита движется до нажатия Play');
await cosmosToggle.click();
await labPhysics.waitForFunction(() => Number(document.querySelector('.physics-lab[data-lab-mode="cosmos"] [data-lab-part="planet"]')?.getAttribute('data-mean-anomaly')) > 0.35);
const cosmosTimeBeforeParameterChange = Number(await planet.getAttribute('data-mean-anomaly'));
const cosmosGenerationBeforeParameterChange = Number(await cosmosLab.getAttribute('data-reset-generation'));
const orbitBeforeParameterChange = await cosmosLab.locator('[data-lab-part="orbit"]').getAttribute('ry');
await cosmosControl.fill('70');
await labPhysics.waitForFunction((time) => Number(document.querySelector('.physics-lab[data-lab-mode="cosmos"] [data-lab-part="planet"]')?.getAttribute('data-mean-anomaly')) > time + 0.03, cosmosTimeBeforeParameterChange);
if (Number(await cosmosLab.getAttribute('data-reset-generation')) !== cosmosGenerationBeforeParameterChange
  || await cosmosLab.locator('[data-lab-part="orbit"]').getAttribute('ry') === orbitBeforeParameterChange) {
  throw new Error('Изменение эксцентриситета сбрасывает время или не перестраивает орбиту');
}
await cosmosToggle.click();
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="cosmos"]')?.getAttribute('data-running') === 'false');
await labPhysics.waitForTimeout(60);
const pausedMeanAnomaly = Number(await planet.getAttribute('data-mean-anomaly'));
await labPhysics.waitForTimeout(220);
if (Math.abs(Number(await planet.getAttribute('data-mean-anomaly')) - pausedMeanAnomaly) > 1e-6) throw new Error('Орбита продолжает движение на паузе');
await cosmosToggle.click();
await labPhysics.waitForFunction((pausedAt) => Number(document.querySelector('.physics-lab[data-lab-mode="cosmos"] [data-lab-part="planet"]')?.getAttribute('data-mean-anomaly')) > pausedAt + 0.05, pausedMeanAnomaly);
const cosmosGeneration = Number(await cosmosLab.getAttribute('data-reset-generation'));
await cosmosLab.locator('[data-lab-action="reset"]').click();
await labPhysics.waitForFunction(({ generation }) => {
  const lab = document.querySelector('.physics-lab[data-lab-mode="cosmos"]');
  return Number(lab?.getAttribute('data-reset-generation')) > generation
    && lab?.getAttribute('data-running') === 'false'
    && Number(lab?.querySelector('[data-lab-part="planet"]')?.getAttribute('data-mean-anomaly')) < 0.01;
}, { generation: cosmosGeneration });
if (Number(await planet.getAttribute('data-mean-anomaly')) >= 0.01) throw new Error('Сброс не возвращает орбиту к начальной фазе');

await labPhysics.locator('#lab-tab-field').click();
await labPhysics.locator('.physics-lab[data-lab-mode="field"] [data-lab-control]').fill('-100');
await labPhysics.locator('#lab-tab-relativity').click();
const relativityReadout = await labPhysics.locator('.physics-lab[data-lab-mode="relativity"] .lab-readout strong').textContent();
if (relativityReadout?.includes('Infinity') || relativityReadout?.includes('-1.00')) throw new Error(`Состояние лаборатории протекло между вкладками: ${relativityReadout}`);
await labPhysics.close();

const reducedMotion = await browser.newPage({ viewport: { width: 900, height: 700 }, reducedMotion: 'reduce' });
await reducedMotion.goto(`${baseUrl}#/ru/`, { waitUntil: 'networkidle' });
if (!await reducedMotion.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)) throw new Error('Тестовая страница не включила prefers-reduced-motion');
const heroLab = reducedMotion.locator('.hero-lab-wrap .physics-lab');
const heroPlanet = heroLab.locator('[data-lab-part="planet"]');
const reducedInitialAnomaly = Number(await heroPlanet.getAttribute('data-mean-anomaly'));
await reducedMotion.waitForTimeout(250);
if (await heroLab.getAttribute('data-running') !== 'false'
  || Math.abs(Number(await heroPlanet.getAttribute('data-mean-anomaly')) - reducedInitialAnomaly) > 1e-6) {
  throw new Error('Hero-анимация движется при prefers-reduced-motion до явного запуска');
}
await reducedMotion.close();

await browser.close();
console.log(`Визуальные проверки готовы: ${checks.length} RU/EN экранов; UI, доступность и семь физических моделей работают.`);
