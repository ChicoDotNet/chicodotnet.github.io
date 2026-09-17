import { useEffect, useState, type ReactNode } from 'react';

type RuntimeVersion = {
  version: string;
  baseVersion: string;
  releaseDateUtc: string;
  build: number;
  channel: string;
  commitSha?: string;
  generatedUtc: string;
};

type SocialLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

function SocialLink({ href, label, children }: SocialLinkProps) {
  const external = href.startsWith('http');
  return (
    <a
      className="social-link"
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

const iconProps = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true } as const;

export function SiteFooter() {
  const [runtime, setRuntime] = useState<RuntimeVersion | null>(null);

  useEffect(() => {
    fetch('/version.json', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() as Promise<RuntimeVersion> : Promise.reject(new Error('version unavailable')))
      .then(setRuntime)
      .catch(() => setRuntime(null));
  }, []);

  const label = runtime ? `v${runtime.version}` : 'vdev';
  const title = runtime
    ? `Base ${runtime.baseVersion} · UTC ${runtime.releaseDateUtc} · build ${String(runtime.build).padStart(3, '0')}${runtime.commitSha ? ` · ${runtime.commitSha.slice(0, 7)}` : ''}`
    : 'Development build';

  return (
    <footer className="site-footer py-4">
      <div className="container d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center">
        <div>
          <div className="footer-brand">ChicoDotNet</div>
          <div className="small footer-tagline">Arquitectura. Código. Comunidad. Impacto.</div>
        </div>
        <div className="d-flex align-items-center gap-2" aria-label="Enlaces sociales">
          <SocialLink href="https://github.com/ChicoDotNet" label="GitHub">
            <svg {...iconProps}><path d="M12 .7a11.3 11.3 0 0 0-3.57 22c.57.1.78-.25.78-.55v-2.14c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.54-.29-5.21-1.27-5.21-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.17A10.9 10.9 0 0 1 12 5.95c.97 0 1.94.13 2.85.38 2.17-1.48 3.13-1.17 3.13-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.39-2.68 5.35-5.22 5.64.41.35.77 1.04.77 2.1v3.16c0 .3.21.66.79.55A11.3 11.3 0 0 0 12 .7Z"/></svg>
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/alfonsolara/" label="LinkedIn">
            <svg {...iconProps}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.8 9.8h4.36V22H2.8V9.8Zm6.93 0h4.18v1.67h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.21 2.9 5.21 6.66V22h-4.35v-5.43c0-1.3-.02-2.96-1.8-2.96-1.81 0-2.09 1.41-2.09 2.86V22H9.73V9.8Z"/></svg>
          </SocialLink>
          <SocialLink href="mailto:chicodotnet@outlook.com" label="Email">
            <svg {...iconProps} fill="none"><path d="M3 5.5h18v13H3v-13Z" stroke="currentColor" strokeWidth="1.8"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </SocialLink>
          <SocialLink href="/rss.xml" label="RSS">
            <svg {...iconProps}><circle cx="5" cy="19" r="2"/><path d="M3 11a10 10 0 0 1 10 10h3A13 13 0 0 0 3 8v3Z"/><path d="M3 5a16 16 0 0 1 16 16h3A19 19 0 0 0 3 2v3Z"/></svg>
          </SocialLink>
        </div>
        <a className="version-badge text-decoration-none" href="/version.json" title={title}>{label}</a>
      </div>
    </footer>
  );
}
