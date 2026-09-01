import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const output = resolve(import.meta.dirname, '..', '.screenshots');
const baseUrl = process.env.VISUAL_BASE_URL ?? 'http://127.0.0.1:4173/';
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
  { name: 'lesson-experiment', url: '#/ru/topic/2.5', viewport: { width: 1440, height: 1050 }, selector: '#experiment' },
  { name: 'lesson-formula', url: '#/ru/topic/9.8', viewport: { width: 1440, height: 1050 }, selector: '#math' },
  { name: 'lesson-mobile', url: '#/ru/topic/9.8', viewport: { width: 390, height: 844 } },
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
  if (runtimeErrors.length) throw new Error(`${check.name}: ошибки в браузере: ${runtimeErrors.join(' | ')}`);
  await page.close();
}

const interaction = await browser.newPage({ viewport: { width: 1100, height: 850 }, colorScheme: 'light' });
await interaction.goto(`${baseUrl}#/ru/`, { waitUntil: 'networkidle' });
await interaction.keyboard.press('Control+K');
await interaction.locator('.search-dialog__input input').fill('энтропия');
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
await interaction.waitForFunction(() => localStorage.getItem('pole:locale') === 'en');
const retained = await interaction.evaluate(() => JSON.parse(localStorage.getItem('pole:completed') ?? '[]'));
if (!retained.includes('8.7')) throw new Error('Progress was lost while switching locale');
await interaction.locator('.header-tools .header-icon').first().click();
if (await interaction.locator('html').getAttribute('data-theme') !== 'dark') throw new Error('Тема не переключилась');
await interaction.close();

const catalogSwitch = await browser.newPage({ viewport: { width: 900, height: 800 }, colorScheme: 'light' });
await catalogSwitch.goto(`${baseUrl}#/ru/catalog`, { waitUntil: 'networkidle' });
await catalogSwitch.locator('.locale-switch button', { hasText: 'EN' }).click();
await catalogSwitch.waitForURL(/#\/en\/catalog$/u);
if ((await catalogSwitch.locator('.catalog-topic h3').first().textContent()) !== 'Physics as Model Building') throw new Error('Catalog cards stayed in Russian after in-place locale switch');
const catalogCyrillic = await catalogSwitch.locator('body').evaluate((body) => body.innerText.match(/[А-Яа-яЁё]+/gu) ?? []);
if (catalogCyrillic.length) throw new Error(`Catalog contains Cyrillic after locale switch: ${catalogCyrillic.slice(0, 5).join(', ')}`);
await catalogSwitch.close();

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, colorScheme: 'light' });
await mobile.goto(`${baseUrl}#/ru/topic/3.3`, { waitUntil: 'networkidle' });
if (!(await mobile.locator('.book-sidebar').evaluate((element) => element.inert))) throw new Error('Скрытое мобильное оглавление не inert');
await mobile.locator('.sidebar-search').evaluate((element) => element.focus());
if (await mobile.locator('.sidebar-search').evaluate((element) => element === document.activeElement)) throw new Error('Фокус попал в скрытое оглавление');
await mobile.locator('.mobile-sidebar-trigger').click();
if (!(await mobile.locator('.book-sidebar').getAttribute('class'))?.includes('is-open')) throw new Error('Мобильное оглавление не открылось');
await mobile.close();

const malformed = await browser.newPage({ viewport: { width: 900, height: 700 } });
await malformed.goto(`${baseUrl}#/%E0%A4%A`, { waitUntil: 'networkidle' });
if (!(await malformed.locator('.home-page').count())) throw new Error('Повреждённый hash сломал приложение');
await malformed.close();

const firstEnglishVisit = await browser.newPage({ viewport: { width: 900, height: 700 }, locale: 'en-US' });
await firstEnglishVisit.goto(baseUrl, { waitUntil: 'networkidle' });
if (await firstEnglishVisit.locator('html').getAttribute('lang') !== 'en' || !/#\/en\/$/u.test(firstEnglishVisit.url())) throw new Error('Browser locale did not select and canonicalize English on first visit');
await firstEnglishVisit.keyboard.press('Control+K');
await firstEnglishVisit.locator('.search-dialog__input input').fill('entropy');
await firstEnglishVisit.locator('.search-dialog__input input').press('Enter');
await firstEnglishVisit.waitForURL(/#\/en\/topic\/8\.7$/u);
await firstEnglishVisit.close();

const blockedStorage = await browser.newPage({ viewport: { width: 900, height: 700 } });
await blockedStorage.addInitScript(() => {
  Storage.prototype.getItem = () => { throw new DOMException('blocked', 'SecurityError'); };
  Storage.prototype.setItem = () => { throw new DOMException('blocked', 'SecurityError'); };
});
await blockedStorage.goto(`${baseUrl}#/ru/`, { waitUntil: 'networkidle' });
if (!(await blockedStorage.locator('.home-page').count())) throw new Error('Недоступный localStorage сломал приложение');
await blockedStorage.close();

const labReset = await browser.newPage({ viewport: { width: 1100, height: 850 } });
await labReset.goto(`${baseUrl}#/ru/labs`, { waitUntil: 'networkidle' });
await labReset.locator('#lab-tab-field').click();
await labReset.locator('.lab-control input').fill('-100');
await labReset.locator('#lab-tab-relativity').click();
const relativityReadout = await labReset.locator('.lab-readout strong').textContent();
if (relativityReadout?.includes('Infinity') || relativityReadout?.includes('-1.00')) throw new Error(`Состояние лаборатории протекло между вкладками: ${relativityReadout}`);
await labReset.close();

await browser.close();
console.log(`Визуальные проверки готовы: ${checks.length} RU/EN экранов; локаль, поиск, состояние, маршрутизация, blocked storage и мобильная доступность работают.`);
