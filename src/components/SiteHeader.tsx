import { Button } from '@fluentui/react-components';
import { useState } from 'react';
import { localeNames, supportedLocales, type Locale } from '../i18n';

type Props = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  labels: {
    language: string;
    projects: string;
    articles: string;
    diagrams: string;
    videos: string;
    contact: string;
  };
};

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
} as const;

function HeaderSocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a className="header-social-link" href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
      {children}
    </a>
  );
}

export function SiteHeader({ locale, onLocaleChange, labels }: Props) {
  const [open, setOpen] = useState(false);
  const links = [
    ['#projects', labels.projects],
    ['#writing', labels.articles],
    ['#diagrams', labels.diagrams],
    ['#videos', labels.videos],
  ] as const;

  return (
    <header className="site-header sticky-top">
      <div className="container py-3 d-flex align-items-center justify-content-between gap-3">
        <a className="brand text-decoration-none" href="#top" aria-label="ChicoDotNet home">ChicoDotNet</a>

        <nav className="d-none d-xl-flex align-items-center gap-4" aria-label="Principal">
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <div className="d-flex align-items-center gap-2">
          <div className="d-none d-md-flex align-items-center gap-1 header-social" aria-label="Social links">
            <HeaderSocialLink href="https://github.com/ChicoDotNet" label="GitHub">
              <svg {...iconProps}><path d="M12 .7a11.3 11.3 0 0 0-3.57 22c.57.1.78-.25.78-.55v-2.14c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.54-.29-5.21-1.27-5.21-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.17A10.9 10.9 0 0 1 12 5.95c.97 0 1.94.13 2.85.38 2.17-1.48 3.13-1.17 3.13-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.39-2.68 5.35-5.22 5.64.41.35.77 1.04.77 2.1v3.16c0 .3.21.66.79.55A11.3 11.3 0 0 0 12 .7Z"/></svg>
            </HeaderSocialLink>
            <HeaderSocialLink href="https://www.linkedin.com/in/alfonsolara/" label="LinkedIn">
              <svg {...iconProps}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.8 9.8h4.36V22H2.8V9.8Zm6.93 0h4.18v1.67h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.21 2.9 5.21 6.66V22h-4.35v-5.43c0-1.3-.02-2.96-1.8-2.96-1.81 0-2.09 1.41-2.09 2.86V22H9.73V9.8Z"/></svg>
            </HeaderSocialLink>
            <HeaderSocialLink href="https://www.youtube.com/@arquitectodesoluciones" label="YouTube">
              <svg {...iconProps}><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>
            </HeaderSocialLink>
          </div>

          <label className="visually-hidden" htmlFor="language-select">{labels.language}</label>
          <select
            id="language-select"
            className="language-select"
            value={locale}
            onChange={(event) => onLocaleChange(event.target.value as Locale)}
            aria-label={labels.language}
          >
            {supportedLocales.map((code) => <option value={code} key={code}>{localeNames[code]}</option>)}
          </select>

          <Button
            className="d-xl-none mobile-menu-button"
            appearance="subtle"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? '×' : '☰'}
          </Button>
          <Button className="d-none d-sm-inline-flex" appearance="primary" as="a" href="#contact">{labels.contact}</Button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="mobile-nav d-xl-none">
          <nav className="container d-grid gap-1 py-2" aria-label="Mobile navigation">
            {links.map(([href, label]) => (
              <a className="mobile-nav-link" key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <a className="mobile-nav-link" href="#contact" onClick={() => setOpen(false)}>{labels.contact}</a>
          </nav>
        </div>
      )}
    </header>
  );
}
