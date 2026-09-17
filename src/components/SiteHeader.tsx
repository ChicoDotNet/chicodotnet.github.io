import { Button, Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-components';
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

export function SiteHeader({ locale, onLocaleChange, labels }: Props) {
  const [open, setOpen] = useState(false);
  const links = [
    ['#projects', labels.projects],
    ['#writing', labels.articles],
    ['#diagrams', labels.diagrams],
    ['#videos', labels.videos],
  ] as const;

  return (
    <>
      <header className="site-header sticky-top">
        <div className="container py-3 d-flex align-items-center justify-content-between gap-3">
          <a className="brand text-decoration-none" href="#top" aria-label="ChicoDotNet home">ChicoDotNet</a>
          <nav className="d-none d-lg-flex align-items-center gap-4" aria-label="Principal">
            {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="d-flex align-items-center gap-2">
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
            <Button className="d-lg-none mobile-menu-button" appearance="subtle" aria-label="Abrir navegación" onClick={() => setOpen(true)}>☰</Button>
            <Button className="d-none d-sm-inline-flex" appearance="primary" as="a" href="#contact">{labels.contact}</Button>
          </div>
        </div>
      </header>
      <Drawer open={open} onOpenChange={(_, data) => setOpen(data.open)} position="end" size="small">
        <DrawerHeader>
          <DrawerHeaderTitle action={<Button appearance="subtle" onClick={() => setOpen(false)} aria-label="Cerrar">×</Button>}>ChicoDotNet</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <nav className="d-grid gap-3" aria-label="Navegación móvil">
            {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <a href="#contact" onClick={() => setOpen(false)}>{labels.contact}</a>
          </nav>
        </DrawerBody>
      </Drawer>
    </>
  );
}
