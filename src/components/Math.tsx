import katex from 'katex';

interface MathProps {
  children: string;
  display?: boolean;
  label?: string;
}

export function Math({ children, display = false, label }: MathProps) {
  const html = katex.renderToString(children, {
    displayMode: display,
    throwOnError: false,
    strict: false,
    output: 'htmlAndMathml',
  });

  return (
    <span
      className={display ? 'math math--display' : 'math'}
      aria-label={label}
      tabIndex={display ? 0 : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
