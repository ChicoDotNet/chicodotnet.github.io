export type ProjectAssetAccess = 'public' | 'private';
export type ProjectCoverKind = 'readme' | 'hero';

export type ProjectBrandAssets = {
  access: ProjectAssetAccess;
  branch: string;
  readmeCoverPath: string;
  heroCoverPath: string;
  cardCover: ProjectCoverKind;
};

export type ProjectDefinition = {
  name: string;
  repository: string;
  repositoryUrl: string;
  publicSiteUrl?: string;
  assets: ProjectBrandAssets;
};

export const projectCatalog = {
  ferrumweave: {
    name: 'FerrumWeave',
    repository: 'ChicoDotNet/FerrumWeave',
    repositoryUrl: 'https://github.com/ChicoDotNet/FerrumWeave',
    publicSiteUrl: '/FerrumWeave/',
    assets: {
      access: 'public',
      branch: 'main',
      readmeCoverPath: 'assets/brand/hero/ferrumweave-readme-cover.png',
      // The hero-only cover will replace the README cover here once it is published in FerrumWeave.
      heroCoverPath: 'assets/brand/hero/ferrumweave-hero-cover.png',
      cardCover: 'readme',
    },
  },
  sifras: {
    name: 'SIFRAS',
    repository: 'ChicoDotNet/Sifras',
    repositoryUrl: 'https://github.com/ChicoDotNet/Sifras',
    assets: {
      // SIFRAS already owns both covers on dev, but the repository is private today.
      // A public page must not depend on an authenticated raw.githubusercontent.com request.
      access: 'private',
      branch: 'dev',
      readmeCoverPath: 'assets/brand/hero/sifras-readme-cover.png',
      heroCoverPath: 'assets/brand/hero/sifras-hero-cover.png',
      cardCover: 'hero',
    },
  },
} satisfies Record<string, ProjectDefinition>;

export function projectAssetUrl(project: ProjectDefinition, kind: ProjectCoverKind): string | undefined {
  if (project.assets.access !== 'public') return undefined;

  const path = kind === 'hero'
    ? project.assets.heroCoverPath
    : project.assets.readmeCoverPath;

  return `https://raw.githubusercontent.com/${project.repository}/${project.assets.branch}/${path}`;
}

export function projectCardCoverUrl(project: ProjectDefinition): string | undefined {
  return projectAssetUrl(project, project.assets.cardCover);
}
