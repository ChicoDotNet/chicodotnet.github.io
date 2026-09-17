import { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict' });

export function MermaidBlock({ chart }: { chart: string }) {
  const reactId = useId();
  const [svg, setSvg] = useState('');
  const safeId = `mermaid-${reactId.replace(/:/g, '-')}`;

  useEffect(() => {
    let active = true;
    mermaid.render(safeId, chart).then(({ svg: rendered }) => {
      if (active) setSvg(rendered);
    });
    return () => { active = false; };
  }, [chart, safeId]);

  return <div className="diagram-surface" aria-label="Diagrama Mermaid" dangerouslySetInnerHTML={{ __html: svg }} />;
}
