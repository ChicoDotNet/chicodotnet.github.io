import version from '../../version.json';

export function SiteFooter() {
  return (
    <footer className="site-footer py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-2 align-items-md-center">
        <span>Arquitectura. Código. Comunidad. Impacto.</span>
        <a className="version-badge text-decoration-none" href="/version.json" title={`Release ${version.releaseDate}`}>v{version.version}</a>
      </div>
    </footer>
  );
}
