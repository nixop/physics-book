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
await catalogSwitch.locator('.catalog-search input').fill('Measurement Error and Uncertainty');
if ((await catalogSwitch.locator('.catalog-result-count').textContent())?.trim() !== '1 card') throw new Error('English catalog uses the wrong singular form for one card');
await catalogSwitch.close();

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, colorScheme: 'light' });
await mobile.goto(`${baseUrl}#/ru/topic/3.3`, { waitUntil: 'networkidle' });
if (!(await mobile.locator('.book-sidebar').evaluate((element) => element.inert))) throw new Error('Скрытое мобильное оглавление не inert');
await mobile.locator('.sidebar-search').evaluate((element) => element.focus());
if (await mobile.locator('.sidebar-search').evaluate((element) => element === document.activeElement)) throw new Error('Фокус попал в скрытое оглавление');
await mobile.locator('.mobile-sidebar-trigger').click();
if (!(await mobile.locator('.book-sidebar').getAttribute('class'))?.includes('is-open')) throw new Error('Мобильное оглавление не открылось');
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

const lessonA11y = await browser.newPage({ viewport: { width: 1100, height: 850 }, colorScheme: 'light' });
await lessonA11y.goto(`${baseUrl}#/en/topic/2.5`, { waitUntil: 'networkidle' });
const predictionRadios = lessonA11y.locator('.prediction-options [role="radio"]');
await predictionRadios.first().focus();
await predictionRadios.first().press('ArrowRight');
if ((await predictionRadios.nth(1).getAttribute('aria-checked')) !== 'true') throw new Error('Arrow keys do not select the next prediction option');
if (!(await predictionRadios.nth(1).evaluate((element) => element === document.activeElement))) throw new Error('Prediction radio focus did not follow the arrow-key selection');
const quickCheckButton = lessonA11y.locator('.quick-check > button');
const quickCheckTarget = await quickCheckButton.getAttribute('aria-controls');
if ((await quickCheckButton.getAttribute('aria-expanded')) !== 'false' || !quickCheckTarget || !(await lessonA11y.locator(`#${quickCheckTarget}`).getAttribute('hidden') !== null)) throw new Error('Quick-check disclosure has an invalid collapsed state');
await quickCheckButton.click();
if ((await quickCheckButton.getAttribute('aria-expanded')) !== 'true' || !(await lessonA11y.locator(`#${quickCheckTarget}`).isVisible())) throw new Error('Quick-check disclosure does not expose its answer');
await lessonA11y.goto(`${baseUrl}#/en/topic/3.3`, { waitUntil: 'networkidle' });
if (await lessonA11y.locator('.prediction-card').count()) throw new Error('A prediction control is shown for a card without a working interactive model');
await lessonA11y.close();

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

const labPhysics = await browser.newPage({ viewport: { width: 1100, height: 850 } });
await labPhysics.goto(`${baseUrl}#/ru/labs`, { waitUntil: 'networkidle' });

const selectLab = async (mode) => {
  await labPhysics.locator(`#lab-tab-${mode}`).click();
  const lab = labPhysics.locator(`.physics-lab[data-lab-mode="${mode}"]`);
  await lab.waitFor();
  return lab;
};

const measureLab = await selectLab('measure');
await measureLab.locator('[data-lab-control]').fill('0');
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="measure"] [data-lab-control]')?.value === '0');
const noiselessPoints = await measureLab.locator('[data-model][data-observed]').evaluateAll((points) => points.map((point) => ({
  model: Number(point.getAttribute('data-model')),
  observed: Number(point.getAttribute('data-observed')),
})));
if (noiselessPoints.length !== 16 || noiselessPoints.some(({ model, observed }) => !Number.isFinite(model) || Math.abs(model - observed) > 1e-8)) {
  throw new Error('При σ = 0 измеренные точки не совпадают с общей моделью сигнала');
}

const motionLab = await selectLab('motion');
const motionControl = motionLab.locator('[data-lab-control]');
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
await motionLab.locator('[data-lab-action="reset"]').click();
await labPhysics.waitForFunction(() => Number(document.querySelector('.physics-lab[data-lab-mode="motion"] [data-lab-part="projectile"]')?.getAttribute('data-time-s')) > 0.12);
await motionLab.locator('[data-lab-action="toggle"]').click();
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="motion"]')?.getAttribute('data-running') === 'false');
await labPhysics.waitForTimeout(60);
const pausedMotionTime = Number(await motionLab.locator('[data-lab-part="projectile"]').getAttribute('data-time-s'));
await labPhysics.waitForTimeout(220);
const stillPausedMotionTime = Number(await motionLab.locator('[data-lab-part="projectile"]').getAttribute('data-time-s'));
if (Math.abs(stillPausedMotionTime - pausedMotionTime) > 1e-6) throw new Error('Пауза сбрасывает или продолжает движение снаряда');
await motionLab.locator('[data-lab-action="toggle"]').click();
await labPhysics.waitForFunction((pausedAt) => Number(document.querySelector('.physics-lab[data-lab-mode="motion"] [data-lab-part="projectile"]')?.getAttribute('data-time-s')) > pausedAt + 0.06, pausedMotionTime);

const waveLab = await selectLab('wave');
const wave = waveLab.locator('[data-lab-part="wave"]');
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
await labPhysics.waitForFunction((points) => document.querySelector('.physics-lab[data-lab-mode="wave"] [data-lab-part="wave"]')?.getAttribute('points') !== points, initialWavePoints);
await waveLab.locator('[data-lab-action="toggle"]').click();
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="wave"]')?.getAttribute('data-running') === 'false');
await labPhysics.waitForTimeout(60);
const pausedWavePoints = await wave.getAttribute('points');
await labPhysics.waitForTimeout(220);
if (await wave.getAttribute('points') !== pausedWavePoints) throw new Error('Волна продолжает эволюцию на паузе');
await waveLab.locator('[data-lab-action="toggle"]').click();
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
await quantumLab.locator('[data-lab-action="toggle"]').click();
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="quantum"]')?.getAttribute('data-running') === 'false');
await labPhysics.waitForTimeout(60);
const pausedQuantumCount = Number(await quantumGroup.getAttribute('data-event-count'));
await labPhysics.waitForTimeout(220);
if (Number(await quantumGroup.getAttribute('data-event-count')) !== pausedQuantumCount) throw new Error('Квантовые события продолжают накапливаться на паузе');
await quantumLab.locator('[data-lab-action="toggle"]').click();
await labPhysics.waitForFunction((count) => Number(document.querySelector('.physics-lab[data-lab-mode="quantum"] .lab-detections')?.getAttribute('data-event-count')) > count, pausedQuantumCount);
await labPhysics.waitForFunction(() => Number(document.querySelector('.physics-lab[data-lab-mode="quantum"] .lab-detections')?.getAttribute('data-event-count')) >= 14);
const quantumGeneration = Number(await quantumLab.getAttribute('data-reset-generation'));
await quantumLab.locator('[data-lab-action="reset"]').click();
await labPhysics.waitForFunction(({ generation }) => {
  const lab = document.querySelector('.physics-lab[data-lab-mode="quantum"]');
  return Number(lab?.getAttribute('data-reset-generation')) > generation
    && Number(lab?.querySelector('.lab-detections')?.getAttribute('data-event-count')) < 4;
}, { generation: quantumGeneration });
if (Number(await quantumGroup.getAttribute('data-event-count')) >= 6) throw new Error('Сброс не очищает накопленные квантовые события');

const cosmosLab = await selectLab('cosmos');
const planet = cosmosLab.locator('[data-lab-part="planet"]');
await labPhysics.waitForFunction(() => Number(document.querySelector('.physics-lab[data-lab-mode="cosmos"] [data-lab-part="planet"]')?.getAttribute('data-mean-anomaly')) > 0.35);
await cosmosLab.locator('[data-lab-action="toggle"]').click();
await labPhysics.waitForFunction(() => document.querySelector('.physics-lab[data-lab-mode="cosmos"]')?.getAttribute('data-running') === 'false');
await labPhysics.waitForTimeout(60);
const pausedMeanAnomaly = Number(await planet.getAttribute('data-mean-anomaly'));
await labPhysics.waitForTimeout(220);
if (Math.abs(Number(await planet.getAttribute('data-mean-anomaly')) - pausedMeanAnomaly) > 1e-6) throw new Error('Орбита продолжает движение на паузе');
await cosmosLab.locator('[data-lab-action="toggle"]').click();
await labPhysics.waitForFunction((pausedAt) => Number(document.querySelector('.physics-lab[data-lab-mode="cosmos"] [data-lab-part="planet"]')?.getAttribute('data-mean-anomaly')) > pausedAt + 0.05, pausedMeanAnomaly);
const cosmosGeneration = Number(await cosmosLab.getAttribute('data-reset-generation'));
await cosmosLab.locator('[data-lab-action="reset"]').click();
await labPhysics.waitForFunction(({ generation }) => {
  const lab = document.querySelector('.physics-lab[data-lab-mode="cosmos"]');
  return Number(lab?.getAttribute('data-reset-generation')) > generation
    && Number(lab?.querySelector('[data-lab-part="planet"]')?.getAttribute('data-mean-anomaly')) < 0.08;
}, { generation: cosmosGeneration });
if (Number(await planet.getAttribute('data-mean-anomaly')) >= 0.12) throw new Error('Сброс не возвращает орбиту к начальной фазе');

await labPhysics.locator('#lab-tab-field').click();
await labPhysics.locator('.physics-lab[data-lab-mode="field"] [data-lab-control]').fill('-100');
await labPhysics.locator('#lab-tab-relativity').click();
const relativityReadout = await labPhysics.locator('.physics-lab[data-lab-mode="relativity"] .lab-readout strong').textContent();
if (relativityReadout?.includes('Infinity') || relativityReadout?.includes('-1.00')) throw new Error(`Состояние лаборатории протекло между вкладками: ${relativityReadout}`);
await labPhysics.close();

await browser.close();
console.log(`Визуальные проверки готовы: ${checks.length} RU/EN экранов; UI, доступность и семь физических моделей работают.`);
