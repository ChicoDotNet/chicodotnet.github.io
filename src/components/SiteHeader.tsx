import { Button, Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-components';
import { useState } from 'react';

const links = [
  ['#projects', 'Proyectos'],
  ['#writing', 'Artículos'],
  ['#diagrams', 'Diagramas'],
  ['#videos', 'Videos']
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="site-header sticky-top">
        <div className="container py-3 d-flex align-items-center justify-content-between gap-3">
          <a className="brand text-decoration-none" href="#top">&lt;ChicoDotNet/&gt;</a>
          <nav className="d-none d-md-flex align-items-center gap-4" aria-label="Principal">
            {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="d-flex gap-2">
            <Button className="d-md-none mobile-menu-button" appearance="subtle" aria-label="Abrir navegación" onClick={() => setOpen(true)}>☰</Button>
            <Button appearance="primary" as="a" href="#contact">Contacto</Button>
          </div>
        </div>
      </header>
      <Drawer open={open} onOpenChange={(_, data) => setOpen(data.open)} position="end" size="small">
        <DrawerHeader><DrawerHeaderTitle action={<Button appearance="subtle" onClick={() => setOpen(false)} aria-label="Cerrar">×</Button>}>ChicoDotNet</DrawerHeaderTitle></DrawerHeader>
        <DrawerBody><nav className="d-grid gap-3">{links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav></DrawerBody>
      </Drawer>
    </>
  );
}
