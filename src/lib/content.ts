import type { ContentItem, ContentKind, ContentMeta } from '../types';

const rawFiles = import.meta.glob('../../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

function parseArray(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) return [];
  return trimmed
    .slice(1, -1)
    .split(',')
    .map((part) => part.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

function parseBoolean(value: string): boolean | undefined {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

function parseFrontMatter(raw: string, sourcePath: string): ContentItem {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing front matter: ${sourcePath}`);

  const values = new Map<string, string>();
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    values.set(line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, ''));
  }

  const required = (key: string): string => {
    const value = values.get(key);
    if (!value) throw new Error(`Missing '${key}' in ${sourcePath}`);
    return value;
  };

  const kind = required('kind') as ContentKind;
  const meta: ContentMeta = {
    kind,
    title: required('title'),
    slug: required('slug'),
    summary: required('summary'),
    published: required('published'),
    updated: values.get('updated'),
    tags: parseArray(values.get('tags') ?? '[]'),
    featured: parseBoolean(values.get('featured') ?? ''),
    externalUrl: values.get('externalUrl'),
    image: values.get('image')
  };

  return { meta, body: match[2].trim(), sourcePath };
}

export const contentItems: ContentItem[] = Object.entries(rawFiles)
  .map(([path, raw]) => parseFrontMatter(raw, path))
  .sort((a, b) => b.meta.published.localeCompare(a.meta.published));

export const contentByKind = (kind: ContentKind): ContentItem[] =>
  contentItems.filter((item) => item.meta.kind === kind);
