import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Atom, BookOpen, Copy, ExternalLink, Search, Sigma, Sparkles } from 'lucide-react';
import { Math } from '../components/Math';
import { routes } from '../routing';
import { useLocale } from '../i18n/LocaleContext';

const normalize = (value: string) => value.toLocaleLowerCase('ru-RU').replaceAll('ё', 'е');

export function FormulasPage() {
  const { locale, t, book, constants, findTopic, formulas } = useLocale();
  const [query, setQuery] = useState('');
  const [chapter, setChapter] = useState('all');
  const [copied, setCopied] = useState<string | null>(null);
  useEffect(() => { setQuery(''); setCopied(null); }, [locale]);

  const filtered = useMemo(() => {
    const needle = normalize(query.trim());
    return formulas.filter((formula) => {
      const matchesChapter = chapter === 'all' || formula.chapter === Number(chapter);
      const haystack = normalize(`${formula.title} ${formula.plain} ${formula.meaning} ${formula.conditions}`);
      return matchesChapter && (!needle || haystack.includes(needle));
    });
  }, [chapter, formulas, query]);

  const copyFormula = async (id: string, latex: string) => {
    try {
      await navigator.clipboard.writeText(`$${latex}$`);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  };

  return (
    <main className="formulas-page">
      <section className="formulas-hero page-width">
        <div><span className="eyebrow-pill"><Sigma size={15} /> {t('formulas.eyebrow')}</span><h1>{t('formulas.titleA')}<br /><em>{t('formulas.titleEm')}</em></h1><p>{t('formulas.subtitle')}</p></div>
        <div className="formula-hero-card"><span><Sparkles size={15} /> {t('formulas.dontSubstitute')}</span><Math display>{'F = \\frac{\\Delta p}{\\Delta t}'}</Math><p>{t('formulas.heroText')}</p></div>
      </section>

      <div className="formula-toolbar-wrap">
        <div className="formula-toolbar page-width">
          <label><Search size={18} aria-hidden="true" /><input aria-label={t('formulas.searchLabel')} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('formulas.search')} /></label>
          <select value={chapter} onChange={(event) => setChapter(event.target.value)} aria-label={t('formulas.filter')}><option value="all">{t('formulas.all')}</option>{book.map((item) => <option value={item.number} key={item.number}>{item.number}. {item.title}</option>)}</select>
          <span>{t('formulas.count', { shown: filtered.length, total: formulas.length })}</span>
        </div>
      </div>

      <section className="formula-content page-width">
        <div className="formula-list">
          {filtered.map((formula) => {
            const chapterInfo = book[formula.chapter];
            return <article className={`formula-entry accent-${chapterInfo.accent}`} key={formula.id}>
              <div className="formula-entry__head"><span>{formula.chapter} · {chapterInfo.title}</span><button type="button" onClick={() => copyFormula(formula.id, formula.latex)} aria-label={t('formulas.copy')}><Copy size={16} /> {copied === formula.id ? t('formulas.copied') : 'LaTeX'}</button></div>
              <div className="formula-entry__body">
                <div className="formula-entry__math"><Math display label={formula.plain}>{formula.latex}</Math></div>
                <div className="formula-entry__copy"><h2>{formula.title}</h2><p>{formula.meaning}</p><div><span><strong>{t('formulas.worksIf')}</strong>{formula.conditions}</span><span><strong>{t('formulas.units')}</strong>{formula.units}</span></div></div>
              </div>
              <div className="formula-entry__links"><BookOpen size={16} />{formula.relatedTopics.map((id) => { const topic = findTopic(id); return topic ? <a href={routes.topic(id, locale)} key={id}>{id} · {topic.title} <ArrowRight size={14} /></a> : null; })}</div>
            </article>;
          })}
          {filtered.length === 0 && <div className="formula-empty"><Search size={26} /><h2>{t('formulas.emptyTitle')}</h2><p>{t('formulas.emptyText')}</p></div>}
        </div>
      </section>

      <section className="constants-section" id="constants">
        <div className="page-width">
          <div className="section-heading section-heading--split"><div><span className="section-index">{t('formulas.appendix')}</span><h2><Lines text={t('formulas.constants')} /></h2></div><p>{t('formulas.constantsText')}</p></div>
          <div className="constants-grid">
            {constants.map((constant) => <article key={constant.id}><span className="constant-symbol"><Math>{constant.symbol}</Math></span><div><h3>{constant.name}</h3><strong>{constant.value} <small>{constant.unit}</small></strong><p>{constant.note}</p></div></article>)}
          </div>
          <div className="constants-note"><Atom size={20} /><span>{t('formulas.constantsNote')}</span><a href="https://physics.nist.gov/constants" target="_blank" rel="noreferrer">CODATA 2022 · NIST <ExternalLink size={14} /></a></div>
        </div>
      </section>
    </main>
  );
}

function Lines({ text }: { text: string }) {
  return <>{text.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</>;
}
