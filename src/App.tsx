import { Button, Card, CardFooter, CardHeader, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { contentByKind } from './lib/content';
import { MarkdownContent } from './components/MarkdownContent';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import './styles.css';

const articles = contentByKind('article');
const diagrams = contentByKind('diagram');
const videos = contentByKind('video');

function ContentCard({ item }: { item: ReturnType<typeof contentByKind>[number] }) {
  return (
    <Card className="content-card h-100">
      <CardHeader header={<strong>{item.meta.title}</strong>} description={<span>{item.meta.summary}</span>} />
      <div className="content-card-body">
        {item.meta.kind === 'video' && <div className="ratio ratio-16x9 video-placeholder mb-3"><span>Video placeholder</span></div>}
        <MarkdownContent markdown={item.body} />
      </div>
      <CardFooter>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 w-100">
          <div className="d-flex flex-wrap gap-2 small text-secondary">{item.meta.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
          <Button appearance="subtle" as="a" href={`/content/${item.meta.slug}/`}>Abrir</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section-space">
      <div className="container">
        <div className="mb-4"><div className="eyebrow">{eyebrow}</div><h2 className="display-6 fw-bold">{title}</h2></div>
        {children}
      </div>
    </section>
  );
}

export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div id="top" className="app-shell">
        <SiteHeader />
        <main>
          <section className="hero d-flex align-items-center">
            <div className="container py-5">
              <div className="row align-items-center g-5">
                <div className="col-12 col-lg-7">
                  <div className="eyebrow text-info">Software architecture · .NET · Rust · AI · Open Source</div>
                  <h1 className="display-2 fw-bold text-white mt-3">Construyendo puentes entre ideas, personas y tecnología.</h1>
                  <p className="lead text-white-50 col-lg-10">Soy Alfonso Lara Ramos. Diseño sistemas, escribo software y documento lo que aprendo al explorar runtimes, interoperabilidad y arquitectura empresarial.</p>
                  <div className="d-flex flex-wrap gap-3 mt-4">
                    <Button appearance="primary" size="large" as="a" href="#projects">Explorar proyectos</Button>
                    <Button appearance="outline" size="large" as="a" href="#writing">Leer artículos</Button>
                  </div>
                </div>
                <div className="col-12 col-lg-5"><img src="/media/hero-bridge.svg" className="img-fluid hero-art" alt="Puente conceptual entre .NET, Rust, nube e inteligencia artificial" /></div>
              </div>
            </div>
          </section>

          <Section id="projects" eyebrow="Featured work" title="Proyectos que convierten ideas difíciles en sistemas verificables">
            <div className="row g-4">
              <div className="col-12 col-lg-6"><Card className="project-card h-100"><CardHeader header={<h3>FerrumWeave</h3>} description="Bringing Rust into the .NET ecosystem." /><p>Rust → CIL, CTS interoperability, MSBuild y una experiencia .NET que no obligue a reescribir lo que ya funciona.</p><CardFooter><Button appearance="primary" as="a" href="/FerrumWeave/">Explorar FerrumWeave</Button></CardFooter></Card></div>
              <div className="col-12 col-lg-6"><Card className="project-card h-100"><CardHeader header={<h3>SIFRAS</h3>} description="Fiscal intelligence with local-first credential handling." /><p>Placeholder preparado para la próxima página pública: arquitectura, seguridad, delegación y automatización fiscal.</p><CardFooter><Button appearance="outline" disabled>Próximamente</Button></CardFooter></Card></div>
            </div>
          </Section>

          <Section id="writing" eyebrow="Writing" title="Artículos y notas técnicas">
            <div className="row g-4">{articles.map((item) => <div className="col-12 col-lg-6" key={item.meta.slug}><ContentCard item={item} /></div>)}</div>
          </Section>

          <Section id="diagrams" eyebrow="Diagrams" title="Arquitectura que se puede leer, versionar y discutir">
            <div className="row g-4">{diagrams.map((item) => <div className="col-12" key={item.meta.slug}><ContentCard item={item} /></div>)}</div>
          </Section>

          <Section id="videos" eyebrow="Watch & learn" title="Videos, demos y explicaciones visuales">
            <div className="row g-4">{videos.map((item) => <div className="col-12 col-lg-6" key={item.meta.slug}><ContentCard item={item} /></div>)}</div>
          </Section>

          <section id="contact" className="contact-section py-5">
            <div className="container py-4 text-center">
              <div className="eyebrow">Open-source contactor</div>
              <h2 className="display-6 fw-bold">¿Construimos algo que valga la pena?</h2>
              <p className="mx-auto col-lg-7">El formulario llegará en una siguiente iteración como mini proyecto reusable y multi-cloud. Por ahora esta superficie queda preparada sin acoplar el sitio a un backend.</p>
              <Button appearance="primary" as="a" href="https://github.com/ChicoDotNet">GitHub</Button>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </FluentProvider>
  );
}
