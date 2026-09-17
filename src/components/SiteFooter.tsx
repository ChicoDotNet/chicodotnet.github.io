import { useEffect, useState } from 'react';

type RuntimeVersion = {
  version: string;
  baseVersion: string;
  releaseDateUtc: string;
  build: number;
  channel: string;
  commitSha?: string;
  generatedUtc: string;
};

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
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-2 align-items-md-center">
        <span>Arquitectura. Código. Comunidad. Impacto.</span>
        <a className="version-badge text-decoration-none" href="/version.json" title={title}>{label}</a>
      </div>
    </footer>
  );
}
