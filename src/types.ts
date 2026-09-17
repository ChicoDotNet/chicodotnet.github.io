export type ContentKind = 'article' | 'diagram' | 'video';

export interface ContentMeta {
  kind: ContentKind;
  title: string;
  slug: string;
  summary: string;
  published: string;
  updated?: string;
  tags: string[];
  featured?: boolean;
  externalUrl?: string;
  image?: string;
}

export interface ContentItem {
  meta: ContentMeta;
  body: string;
  sourcePath: string;
}
