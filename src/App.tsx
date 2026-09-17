import { useEffect, useState, type ReactNode } from 'react';
import { Badge, Button, Card, CardFooter, CardHeader, FluentProvider, webLightTheme } from '@fluentui/react-components';
import heroCover from '../assets/brand/hero/chicodotnet-hero-cover.png';
import { contentByKind } from './lib/content';
import { getCopy, isLocale, type Locale } from './i18n';
import { projectCardCoverUrl, projectCatalog } from './projectCatalog';
import { uiLabels } from './uiLabels';
import { MarkdownContent } from './components/MarkdownContent';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import './styles.css';

const articles = contentByKind('article');
const diagrams = contentByKind('diagram');
const videos = contentByKind('video');
const localeStorageKey = 'chicodotnet.locale';
const ferrumweave = projectCatalog.ferrumweave;
const sifras = projectCatalog.sifras;
const ferrumweaveCardCover = projectCardCoverUrl(ferrumweave);
const sifrasCardCover = projectCardCoverUrl(sifras);

function projectCoverStyle(url?: string) {
  return url ? { backgroundImage: `url("${url}")` } : undefined;
}

function initialLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(localeStorageKey);
    if (isLocale(stored)) return stored;
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }

  return 'es';
}

function FactIcon({ index }: { index: number }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  const icons = [
    <svg {...common} key="projects"><path d="M9 3H5a2 2 0 0 0-2 2v4m12-6h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4m12 6h4a2 2 0 0 0 2-2v-4"/><path d="M8 8h8v8H8z"/></svg>,
    <svg {...common} key="technology"><path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z"/><path d="m4.4 6.7 7.6 4.4 7.6-4.4M12 11v9"/></svg>,
    <svg {...common} key="articles"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z"/></svg>,
    <svg {...common} key="videos"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/></svg>,
    <svg {...common} key="community"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  ];

  return <span className="fact-icon">{icons[index] ?? icons[0]}</span>;
}

function ContentCard({ item, openLabel, videoLabel }: { item: ReturnType<typeof contentByKind>[number]; openLabel: string; videoLabel: string }) {
  return (
    <Card className="content-card h-100">
      <CardHeader header={<strong>{item.meta.title}</strong>} description={<span>{item.meta.summary}</span>} />
      <div className="content-card-body">
        {item.meta.kind === 'video' && <div className="ratio ratio-16x9 video-placeholder mb-3" aria-label={videoLabel}><span>▶ {videoLabel}</span></div>}
        <MarkdownContent markdown={item.body} />
      </div>
      <CardFooter>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 w-100">
          <div className="d-flex flex-wrap gap-2 small text-secondary">{item.meta.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
          <Button appearance="subtle" as="a" href={`/content/${item.meta.slug}/`}>{openLabel}</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div className="section-heading-row d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4">
      <div className="section-heading">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="display-6 fw-bold mb-0">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="section-space anchor-section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} />
        {children}
      </div>
    </section>
  );
}

export function App() {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const t = getCopy(locale);
  const u = uiLabels[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(localeStorageKey, locale);
    } catch {
      // The page stays functional without persistent storage.
    }
  }, [locale]);

  return (
    <FluentProvider theme={webLightTheme}>
      <div id="top" className="app-shell">
        <SiteHeader locale={locale} onLocaleChange={setLocale} labels={{
          language: t.language,
          projects: t.projects,
          articles: t.articles,
          diagrams: t.diagrams,
          videos: t.videos,
          contact: t.contact,
        }} />

        <main>
          <section className="hero" aria-labelledby="hero-title">
            <img
              className="hero-backdrop"
              src={heroCover}
              width="1672"
              height="941"
              alt=""
              aria-hidden="true"
              fetchPriority="high"
            />
            <div className="hero-shade" aria-hidden="true" />
            <div className="container hero-inner py-5">
              <div className="row align-items-center min-vh-lg-hero py-lg-5">
                <div className="col-12 col-lg-7 col-xl-6 hero-copy-column">
                  <div className="eyebrow hero-eyebrow">{t.heroEyebrow}</div>
                  <h1 id="hero-title" className="hero-title mt-3 mb-3">{t.heroTitle}</h1>
                  <p className="hero-copy mb-0">{t.heroBody}</p>
                  <div className="d-flex flex-wrap gap-3 mt-4">
                    <Button appearance="primary" size="large" as="a" href="#projects">{t.explore}</Button>
                    <Button className="hero-secondary-button" appearance="outline" size="large" as="a" href="#writing">{t.read}</Button>
                  </div>
                </div>
                <div className="d-none d-lg-flex col-lg-5 col-xl-6 justify-content-end align-self-start pt-4">
                  <div className="hero-aside">{u.heroAside}</div>
                </div>
              </div>
              <div className="hero-corner-quote d-none d-lg-block">“{u.heroCorner}”</div>
            </div>
          </section>

          <section className="facts-strip" aria-label="ChicoDotNet facts">
            <div className="container">
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-0">
                {t.facts.map((fact, index) => (
                  <div className="col" key={fact.title}>
                    <div className="fact-item">
                      <FactIcon index={index} />
                      <div className="fact-copy">
                        <strong>{fact.title}</strong>
                        <span>{fact.body}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="section-space anchor-section">
            <div className="container">
              <SectionHeading
                eyebrow={t.projectsEyebrow}
                title={t.projectsTitle}
                action={<Button appearance="subtle" as="a" href="https://github.com/ChicoDotNet" target="_blank" rel="noreferrer">{u.allProjects} →</Button>}
              />
              <div className="row g-4">
                <div className="col-12 col-lg-6">
                  <Card
                    className="project-card project-card-ferrum h-100"
                    style={projectCoverStyle(ferrumweaveCardCover)}
                    data-asset-access={ferrumweave.assets.access}
                  >
                    <div className="project-card-overlay" />
                    <div className="project-card-content">
                      <Badge appearance="filled" color="brand">{u.openSource}</Badge>
                      <CardHeader header={<h3 className="project-title">{ferrumweave.name}</h3>} description={<span className="project-kicker">{t.ferrumDescription}</span>} />
                      <p>{t.ferrumBody}</p>
                      <CardFooter><Button appearance="primary" as="a" href={ferrumweave.publicSiteUrl}>{t.ferrumCta}</Button></CardFooter>
                    </div>
                  </Card>
                </div>
                <div className="col-12 col-lg-6">
                  <Card
                    className="project-card project-card-sifras h-100"
                    style={projectCoverStyle(sifrasCardCover)}
                    data-asset-access={sifras.assets.access}
                  >
                    <div className="project-card-overlay" />
                    <div className="project-card-content">
                      <Badge appearance="filled" color="success">{u.building}</Badge>
                      <CardHeader header={<h3 className="project-title">{sifras.name}</h3>} description={<span className="project-kicker">{t.sifrasDescription}</span>} />
                      <p>{t.sifrasBody}</p>
                      <CardFooter>
                        {sifras.publicSiteUrl
                          ? <Button appearance="outline" as="a" href={sifras.publicSiteUrl}>{t.sifrasCta}</Button>
                          : <Button appearance="outline" disabled>{t.sifrasCta}</Button>}
                      </CardFooter>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section className="quote-section" aria-label="ChicoDotNet quote">
            <div className="container">
              <figure className="quote-card mb-0">
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>— ChicoDotNet</figcaption>
              </figure>
            </div>
          </section>

          <section className="section-space anchor-section" aria-label="Articles and diagrams">
            <div className="container">
              <div className="row g-5">
                <section id="writing" className="col-12 col-lg-6 anchor-section">
                  <SectionHeading eyebrow={t.articleEyebrow} title={t.articleTitle} />
                  <div className="d-grid gap-4">{articles.map((item) => <ContentCard item={item} openLabel={u.open} videoLabel={u.video} key={item.meta.slug} />)}</div>
                </section>
                <section id="diagrams" className="col-12 col-lg-6 anchor-section">
                  <SectionHeading eyebrow={t.diagramEyebrow} title={t.diagramTitle} />
                  <div className="d-grid gap-4">{diagrams.map((item) => <ContentCard item={item} openLabel={u.open} videoLabel={u.video} key={item.meta.slug} />)}</div>
                </section>
              </div>
            </div>
          </section>

          <Section id="videos" eyebrow={t.videoEyebrow} title={t.videoTitle}>
            <div className="row g-4">{videos.map((item) => <div className="col-12 col-lg-6" key={item.meta.slug}><ContentCard item={item} openLabel={u.open} videoLabel={u.video} /></div>)}</div>
          </Section>

          <section id="contact" className="contact-section anchor-section py-5">
            <div className="container py-4 text-center">
              <div className="eyebrow">{t.connectEyebrow}</div>
              <h2 className="display-5 fw-bold mt-2">{t.connectTitle}</h2>
              <p className="mx-auto col-lg-7 lead text-secondary">{t.connectBody}</p>
              <Button appearance="primary" size="large" as="a" href="mailto:chicodotnet@outlook.com">{t.emailCta}</Button>
              <div className="contact-email mt-3"><a href="mailto:chicodotnet@outlook.com">chicodotnet@outlook.com</a></div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </FluentProvider>
  );
}
