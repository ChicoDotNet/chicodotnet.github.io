import { useEffect, useId, useState } from 'react';

let mermaidInitialized = false;

async function renderMermaid(id: string, chart: string) {
  const { default: mermaid } = await import('mermaid');
  if (!mermaidInitialized) {
    mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict' });
    mermaidInitialized = true;
  }
  return mermaid.render(id, chart);
}

export function MermaidBlock({ chart }: { chart: string }) {
  const reactId = useId();
  const [svg, setSvg] = useState('');
  const safeId = `mermaid-${reactId.replace(/:/g, '-')}`;

  useEffect(() => {
    let active = true;
    renderMermaid(safeId, chart)
      .then(({ svg: rendered }) => {
        if (active) setSvg(rendered);
      })
      .catch(() => {
        if (active) setSvg('<p role="alert">No fue posible renderizar este diagrama.</p>');
      });

    return () => { active = false; };
  }, [chart, safeId]);

  return <div className="diagram-surface" aria-label="Diagrama Mermaid" dangerouslySetInnerHTML={{ __html: svg }} />;
}
