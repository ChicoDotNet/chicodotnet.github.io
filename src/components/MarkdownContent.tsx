import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MermaidBlock } from './MermaidBlock';

export function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children, ...props }) {
          const language = className?.replace('language-', '');
          const source = String(children).replace(/\n$/, '');
          if (language === 'mermaid') return <MermaidBlock chart={source} />;
          return <code className={className} {...props}>{children}</code>;
        }
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
