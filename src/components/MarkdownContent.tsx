import type { ComponentPropsWithoutRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MermaidBlock } from './MermaidBlock';

function Code({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) {
  const language = className?.replace('language-', '');
  const source = String(children).replace(/\n$/, '');
  if (language === 'mermaid') return <MermaidBlock chart={source} />;
  return <code className={className} {...props}>{children}</code>;
}

export function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: Code }}>
      {markdown}
    </ReactMarkdown>
  );
}
