import type { Chapter, Topic } from '../types';
import type { LabMode } from '../components/PhysicsLab';
import type { Locale } from '../i18n/types';
import englishContent from '../../content/en/chapter-guides.json';

interface ChapterGuide {
  eyebrow: string;
  lead: string;
  question: string;
  boundary: string;
}

const guides: Record<number, ChapterGuide> = {
  0: { eyebrow: 'Как мы узнаём', lead: 'Физика начинается не с формулы, а с решения: что считать существенным и как проверить предсказание.', question: 'Как отличить удачную модель от красивого совпадения?', boundary: 'Любая модель отвечает на ограниченный класс вопросов и работает в указанном диапазоне условий.' },
  1: { eyebrow: 'Язык измерений', lead: 'Число становится физическим результатом только вместе с единицей, неопределённостью и способом измерения.', question: 'Что на самом деле говорит измерение и насколько ему можно доверять?', boundary: 'Точность результата не может быть выше точности исходных данных и принятой модели.' },
  2: { eyebrow: 'Геометрия движения', lead: 'Кинематика описывает, где находится тело и как меняется его движение, пока не спрашивая о причинах.', question: 'Как восстановить движение по координатам, векторам и графикам?', boundary: 'Описание зависит от системы отсчёта; материальная точка уместна, только если размер и вращение тела несущественны.' },
  3: { eyebrow: 'Причина изменения', lead: 'Динамика связывает изменение движения с взаимодействиями и учит видеть силы как элементы модели.', question: 'Какие взаимодействия действительно меняют движение системы?', boundary: 'Законы Ньютона применяются в инерциальных системах и требуют отдельно определить тело и действующие на него силы.' },
  4: { eyebrow: 'Инварианты движения', lead: 'Энергия и импульс позволяют рассуждать о процессе, не восстанавливая каждую деталь траектории.', question: 'Что сохраняется, когда подробности движения слишком сложны?', boundary: 'Сначала задайте границу системы: обмен с окружением меняет баланс сохраняющейся величины.' },
  5: { eyebrow: 'Тяготение', lead: 'Один закон связывает падение у поверхности Земли, движение спутника и архитектуру планетных систем.', question: 'Почему свободное падение и орбита — два режима одного движения?', boundary: 'Точечные массы и ньютоновское поле — приближения; сильные поля и релятивистские скорости требуют другой модели.' },
  6: { eyebrow: 'Вещество как среда', lead: 'Макроскопические свойства возникают из микроструктуры, но часто описываются полями давления, плотности и деформации.', question: 'Когда вещество можно считать сплошным и как оно отвечает на нагрузку?', boundary: 'Приближение сплошной среды ломается на масштабах, сравнимых с длиной свободного пробега или размером структуры.' },
  7: { eyebrow: 'Ритм и перенос', lead: 'Колебание локализует повторение, волна переносит возмущение и энергию через пространство.', question: 'Как из локального колебания рождается распространяющаяся волна?', boundary: 'Линейная суперпозиция справедлива при достаточно малых возмущениях; дисперсия и нелинейность меняют картину.' },
  8: { eyebrow: 'От частиц к теплу', lead: 'Термодинамика связывает микроскопическое беспорядочное движение с измеряемыми давлением, температурой и работой.', question: 'Как необратимость возникает из обратимых законов движения частиц?', boundary: 'Равновесные величины определены для достаточно больших систем и времён наблюдения.' },
  9: { eyebrow: 'Заряд и потенциал', lead: 'Электрическое поле превращает распределение зарядов в локальное правило действия на пробную частицу.', question: 'Как читать электрическую схему одновременно как движение зарядов и передачу энергии?', boundary: 'Сосредоточенные элементы цепи работают, когда размеры схемы малы по сравнению с длиной волны сигнала.' },
  10: { eyebrow: 'Единое поле', lead: 'Магнетизм проявляет зависимость электрических явлений от движения и приводит к единой электромагнитной картине.', question: 'Как меняющиеся поля создают друг друга и переносят энергию?', boundary: 'Квазистатические модели перестают быть достаточными, когда задержкой распространения поля нельзя пренебречь.' },
  11: { eyebrow: 'Свет', lead: 'Луч, волна и фотон — разные модели света, каждая отвечает на свой масштаб вопросов.', question: 'Как выбрать между геометрической, волновой и квантовой моделью света?', boundary: 'Лучевая оптика требует размеров объектов намного больше длины волны; при малых апертурах важна дифракция.' },
  12: { eyebrow: 'Пространство-время', lead: 'Постоянство скорости света меняет привычные представления об одновременности, длине, времени и энергии.', question: 'Что должны согласовать наблюдатели, движущиеся относительно друг друга?', boundary: 'Ньютоновское приближение возвращается при скоростях намного меньше скорости света и слабой гравитации.' },
  13: { eyebrow: 'Квантовый мир', lead: 'Квантовая теория предсказывает вероятности результатов и связывает частицы с волновыми свойствами.', question: 'Что именно эволюционирует между приготовлением состояния и измерением?', boundary: 'Классическая траектория не является универсальным описанием; измерительная схема входит в постановку задачи.' },
  14: { eyebrow: 'Ядро и частицы', lead: 'Энергия связи, симметрии и вероятности распада объясняют устойчивость ядер и превращения частиц.', question: 'Какие сохранения разрешают процесс, а какие делают его невозможным?', boundary: 'Законы распада статистические: период полураспада характеризует ансамбль, а не момент распада отдельного ядра.' },
  15: { eyebrow: 'Физика Вселенной', lead: 'Свет далёких объектов становится измерительным прибором для звёзд, галактик и истории расширения.', question: 'Как по спектру и движению восстановить недоступный объект?', boundary: 'Космологические выводы зависят от модели, калибровки расстояний и наблюдательных систематик.' },
  16: { eyebrow: 'Сложность', lead: 'Простые детерминированные правила способны порождать бифуркации, структуры и непредсказуемость на длинных временах.', question: 'Почему знание закона не всегда означает возможность далёкого прогноза?', boundary: 'Хаос ограничивает горизонт прогноза, но не отменяет детерминированность и статистические закономерности.' },
};

const englishGuides = englishContent.guides as unknown as Record<number, ChapterGuide>;

export const chapterGuide = (chapter: Chapter, locale: Locale = 'ru') => locale === 'en' ? englishGuides[chapter.number] : guides[chapter.number];

export const topicLead = (topic: Topic, locale: Locale = 'ru') => {
  return locale === 'en'
    ? `${topic.summary} This card connects the observable phenomenon to a working model and identifies the quantities that must be compared before using an equation.`
    : `${topic.summary} Карточка связывает наблюдаемое явление с рабочей моделью и показывает, какие величины нужно сопоставить, прежде чем использовать формулу.`;
};

export const topicQuestion = (topic: Topic, locale: Locale = 'ru') => {
  return locale === 'en'
    ? `Which observations, quantities, and assumptions distinguish the model used for “${topic.title}”?`
    : `Какие наблюдения, величины и допущения определяют модель для темы «${topic.title}»?`;
};

const boundaryOverrides: Record<string, Record<Locale, string>> = {
  '1.2': {
    ru: 'Погрешность и неопределённость — разные понятия: первую определяют относительно опорного значения, вторую оценивают по данным, калибровке и модели измерения.',
    en: 'Error and uncertainty are different concepts: error is defined relative to a reference value, while uncertainty is evaluated from data, calibration, and the measurement model.',
  },
  '2.5': {
    ru: 'Параболическая траектория и независимость компонент справедливы в однородном поле без сопротивления воздуха и при пренебрежимо малой кривизне Земли.',
    en: 'A parabolic trajectory and independent components require a uniform field, negligible air resistance, and negligible curvature of Earth over the flight.',
  },
  '3.3': {
    ru: 'Форма ΣF = dp/dt относится к материальной системе фиксированного состава; для открытой системы нужен отдельный учёт потока импульса.',
    en: 'The form ΣF = dp/dt applies to a material system of fixed composition; an open system requires a separate momentum-flux term.',
  },
  '3.6': {
    ru: 'Коэффициентное сухое трение — эмпирическая модель: оно зависит от материалов, состояния поверхности, скорости и режима контакта.',
    en: 'Coefficient-based dry friction is an empirical model; it depends on materials, surface condition, speed, and contact regime.',
  },
  '4.3': {
    ru: 'Связь F = −∇U существует только для консервативной части взаимодействия; диссипативные силы одной потенциальной энергией не описываются.',
    en: 'The relation F = −∇U applies only to the conservative part of an interaction; dissipative forces cannot be described by one potential energy.',
  },
  '4.6': {
    ru: 'Полный импульс системы сохраняется, когда внешний импульс равен нулю; для ракеты граница сохраняющейся системы должна включать и ракету, и её выхлоп.',
    en: 'A system’s total momentum is conserved when the external impulse is zero; for a rocket, the conserved system boundary must include both the rocket and its exhaust.',
  },
  '4.8': {
    ru: 'Угловой момент и момент силы зависят от выбранного начала; формула L = r × p описывает одну точку, а для системы вклады суммируются.',
    en: 'Angular momentum and torque depend on the chosen origin; L = r × p describes one point particle, while a system requires a sum over its constituents.',
  },
  '5.2': {
    ru: 'Законы Кеплера в этой форме предполагают изолированную ньютоновскую задачу двух тел; a в третьем законе — полуось относительной орбиты.',
    en: 'Kepler’s laws in this form assume an isolated Newtonian two-body problem; a in the third law is the semimajor axis of the relative orbit.',
  },
  '7.1': {
    ru: 'Гармоничность требует линейной возвращающей силы; для математического маятника это малоугловое приближение sin θ ≈ θ при θ в радианах.',
    en: 'Harmonic motion requires a linear restoring force; for a simple pendulum this is the small-angle approximation sin θ ≈ θ with θ in radians.',
  },
  '7.4': {
    ru: 'Соотношение v = fλ относится к монохроматической бегущей волне; в диспергирующей среде фазовая и групповая скорости различаются.',
    en: 'The relation v = fλ describes a monochromatic traveling wave; phase and group velocities differ in a dispersive medium.',
  },
  '8.2': {
    ru: 'Связь ⟨K_пост⟩ = 3k_B T/2 относится к классическому идеальному газу; внутренние степени свободы многоатомных молекул учитываются отдельно.',
    en: 'The relation ⟨K_trans⟩ = 3k_B T/2 applies to a classical ideal gas; internal degrees of freedom of polyatomic molecules are counted separately.',
  },
  '8.4': {
    ru: 'Знак работы зависит от соглашения; интеграл ∫p_ext dV описывает только граничную pV-работу и не включает другие каналы передачи энергии.',
    en: 'The sign of work depends on convention; ∫p_ext dV describes boundary pV work only and excludes other energy-transfer channels.',
  },
  '8.7': {
    ru: 'Формула S = k_B ln Ω требует равновероятных микросостояний; сумма −k_B Σp_i ln p_i здесь относится к дискретному классическому ансамблю, а второй закон — к полной энтропии изолированной системы.',
    en: 'The formula S = k_B ln Ω requires equiprobable microstates; −k_B Σp_i ln p_i here describes a discrete classical ensemble, while the second law concerns the total entropy of an isolated system.',
  },
  '8.8': {
    ru: 'Для замкнутой системы без необъёмной работы критерий F применяют при фиксированных T,V, а критерий G — при фиксированных T,p; соответствующая свободная энергия не возрастает.',
    en: 'For a closed system with no non-pV work, the F criterion applies at fixed T,V and the G criterion at fixed T,p; the corresponding free energy does not increase.',
  },
  '9.1': {
    ru: 'Сохранение заряда относится к замкнутой системе; макроскопическая плотность заряда усредняет дискретную микроскопическую структуру вещества.',
    en: 'Charge conservation applies to a closed system; macroscopic charge density averages over matter’s discrete microscopic structure.',
  },
  '9.2': {
    ru: 'Закон Кулона в указанной форме описывает неподвижные точечные заряды в вакууме; для протяжённых распределений поле интегрируют, а в среде учитывают поляризацию.',
    en: 'Coulomb’s law in this form describes stationary point charges in vacuum; extended distributions require integration, and matter introduces polarization.',
  },
  '9.3': {
    ru: 'Закон Гаусса точен всегда, но позволяет легко найти поле только при достаточной симметрии распределения заряда.',
    en: 'Gauss’s law is exact, but it determines the field easily only when the charge distribution has sufficient symmetry.',
  },
  '9.4': {
    ru: 'Скалярный электростатический потенциал применим к безвихревому электрическому полю; при меняющемся магнитном потоке одного потенциала φ недостаточно.',
    en: 'A scalar electrostatic potential applies to a curl-free electric field; when magnetic flux changes, φ alone is insufficient.',
  },
  '9.5': {
    ru: 'Идеальный проводник предполагает электростатическое равновесие, а формулы простого конденсатора пренебрегают краевыми полями, потерями и нелинейностью диэлектрика.',
    en: 'An ideal conductor assumes electrostatic equilibrium, while elementary capacitor formulas neglect fringing, losses, and dielectric nonlinearity.',
  },
  '9.6': {
    ru: 'Закон Ома V = IR — линейная модель при почти постоянной температуре; многие материалы и устройства не являются омическими.',
    en: 'Ohm’s law V = IR is a linear model at nearly constant temperature; many materials and devices are non-ohmic.',
  },
  '9.7': {
    ru: 'Модель идеального источника пренебрегает внутренним сопротивлением, пределами мощности, нагревом и динамикой преобразования энергии.',
    en: 'An ideal-source model neglects internal resistance, power limits, heating, and the dynamics of energy conversion.',
  },
  '9.8': {
    ru: 'Законы сосредоточенной цепи предполагают квазистационарный режим; приборы меняют цепь своим конечным входным сопротивлением и полосой пропускания.',
    en: 'Lumped-circuit laws assume a quasistatic regime; real meters load the circuit through finite input impedance and bandwidth.',
  },
  '9.9': {
    ru: 'Простая RC-модель требует линейных сосредоточенных R и C; паразитные параметры и задержка распространения важны на высоких частотах.',
    en: 'The elementary RC model requires linear lumped R and C; parasitic elements and propagation delay matter at high frequencies.',
  },
  '11.1': {
    ru: 'Лучевая модель требует масштаба объектов намного больше длины волны; принцип Ферма задаёт стационарное, не обязательно минимальное оптическое время.',
    en: 'The ray model requires object scales much larger than the wavelength; Fermat’s principle gives stationary, not necessarily minimal, optical travel time.',
  },
  '11.5': {
    ru: 'Интерференция требует когерентности, а геометрическая оптика теряет точность, когда размеры апертуры сравнимы с длиной волны.',
    en: 'Interference requires coherence, and geometric optics loses accuracy when an aperture is comparable to the wavelength.',
  },
  '12.4': {
    ru: 'Диаграмма Минковского здесь описывает плоское пространство-время и инерциальные участки движения; ускорение и гравитация требуют дополнительного анализа.',
    en: 'The Minkowski diagram here describes flat spacetime and inertial segments of motion; acceleration and gravity require additional analysis.',
  },
  '12.5': {
    ru: 'Формула E₀ = mc² задаёт энергию покоя; полная энергия движущейся свободной частицы дополнительно зависит от импульса.',
    en: 'The equation E₀ = mc² gives rest energy; the total energy of a moving free particle also depends on momentum.',
  },
  '13.2': {
    ru: 'Формула двух щелей предполагает когерентные неразличимые пути и дальнюю зону; конечная ширина щели задаёт дополнительную дифракционную оболочку.',
    en: 'The double-slit formula assumes coherent indistinguishable paths and the far field; finite slit width adds a diffraction envelope.',
  },
};

export const topicBoundary = (topic: Topic, locale: Locale = 'ru') => {
  const override = boundaryOverrides[topic.id]?.[locale];
  if (override) return override;
  const chapterBoundary = (locale === 'en' ? englishGuides : guides)[topic.chapter].boundary;
  return locale === 'en'
    ? `For “${topic.title},” state the model and its scale explicitly. ${chapterBoundary}`
    : `Для темы «${topic.title}» явно укажите модель и её масштаб. ${chapterBoundary}`;
};

const implementedLabs: Record<string, { mode: LabMode; title: string }> = {
  '1.3': { mode: 'measure', title: 'Данные и шум' },
  '2.5': { mode: 'motion', title: 'Баллистическая песочница' },
  '5.2': { mode: 'cosmos', title: 'Законы Кеплера' },
  '7.4': { mode: 'wave', title: 'Волна на струне' },
  '9.2': { mode: 'field', title: 'Поле системы зарядов' },
  '12.4': { mode: 'relativity', title: 'Диаграмма пространства-времени' },
  '13.2': { mode: 'quantum', title: 'Опыт с двумя щелями' },
};

export const implementedLabForTopic = (topicId: string, locale: Locale = 'ru') => {
  const lab = implementedLabs[topicId];
  return lab ? { ...lab, title: locale === 'en' ? englishContent.labs[topicId as keyof typeof englishContent.labs] : lab.title } : undefined;
};
export const implementedLabForChapter = (chapter: number, locale: Locale = 'ru') => {
  const entry = Object.entries(implementedLabs).find(([topicId]) => Number(topicId.split('.')[0]) === chapter);
  return entry ? implementedLabForTopic(entry[0], locale) : undefined;
};
