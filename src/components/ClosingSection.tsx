import { Button, Card } from '@fluentui/react-components';
import './ClosingSection.css';

type ClosingSectionProps = {
  videoEyebrow: string;
  videoTitle: string;
  quote: string;
  connectEyebrow: string;
  connectTitle: string;
  connectBody: string;
  emailCta: string;
};

const youtubeUrl = 'https://www.youtube.com/@arquitectodesoluciones';
const githubUrl = 'https://github.com/ChicoDotNet';
const linkedinUrl = 'https://www.linkedin.com/in/alfonsolara/';
const emailUrl = 'mailto:chicodotnet@outlook.com';

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4V8Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 8.5H3.4V19h3.1V8.5ZM4.95 3.5A1.8 1.8 0 1 0 5 7.1a1.8 1.8 0 0 0-.05-3.6ZM20.6 13c0-3.2-1.7-4.7-4-4.7a3.45 3.45 0 0 0-3.1 1.7V8.5h-3V19h3v-5.2c0-1.4.3-2.7 2-2.7 1.65 0 1.67 1.55 1.67 2.8V19h3.1l.33-6Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function ClosingSection({
  videoEyebrow,
  videoTitle,
  quote,
  connectEyebrow,
  connectTitle,
  connectBody,
  emailCta,
}: ClosingSectionProps) {
  return (
    <section className="closing-section section-space" aria-label="ChicoDotNet">
      <div className="container">
        <div className="row g-4 align-items-stretch">
          <section id="videos" className="col-12 col-lg-5 anchor-section">
            <Card className="closing-card youtube-card h-100">
              <div className="eyebrow">{videoEyebrow}</div>
              <div className="youtube-preview" aria-hidden="true">
                <span className="youtube-play"><PlayIcon /></span>
                <span className="youtube-handle">@arquitectodesoluciones</span>
              </div>
              <h2>{videoTitle}</h2>
              <Button appearance="primary" as="a" href={youtubeUrl} target="_blank" rel="noreferrer">YouTube ↗</Button>
            </Card>
          </section>

          <div className="col-12 col-lg-3">
            <figure className="closing-card closing-quote h-100 mb-0">
              <span className="closing-quote-mark" aria-hidden="true">“</span>
              <blockquote>“{quote}”</blockquote>
              <figcaption>— ChicoDotNet</figcaption>
            </figure>
          </div>

          <section id="contact" className="col-12 col-lg-4 anchor-section">
            <Card className="closing-card contact-card h-100">
              <div className="eyebrow">{connectEyebrow}</div>
              <h2>{connectTitle}</h2>
              <p className="closing-muted">{connectBody}</p>
              <nav className="contact-links" aria-label="ChicoDotNet">
                <a href={githubUrl} target="_blank" rel="noreferrer"><span className="contact-link-icon"><GitHubIcon /></span><span>GitHub</span></a>
                <a href={linkedinUrl} target="_blank" rel="noreferrer"><span className="contact-link-icon"><LinkedInIcon /></span><span>LinkedIn</span></a>
                <a href={emailUrl}><span className="contact-link-icon"><MailIcon /></span><span>chicodotnet@outlook.com</span></a>
              </nav>
              <Button appearance="outline" as="a" href={emailUrl}>{emailCta} →</Button>
            </Card>
          </section>
        </div>
      </div>
    </section>
  );
}
