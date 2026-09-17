import type { Locale } from './i18n';

type UiLabels = {
  open: string;
  openSource: string;
  building: string;
  allProjects: string;
  video: string;
  heroAside: string;
  heroCorner: string;
};

export const uiLabels: Record<Locale, UiLabels> = {
  es: {
    open: 'Abrir',
    openSource: 'Open source',
    building: 'En construcción',
    allProjects: 'Ver todos los proyectos',
    video: 'Vídeo',
    heroAside: 'Ecosistemas distintos. Un mañana más fuerte.',
    heroCorner: 'La tecnología es más poderosa cuando conecta mundos.',
  },
  en: {
    open: 'Open',
    openSource: 'Open source',
    building: 'In progress',
    allProjects: 'View all projects',
    video: 'Video',
    heroAside: 'Different ecosystems. A stronger tomorrow.',
    heroCorner: 'Technology is more powerful when it connects worlds.',
  },
  de: {
    open: 'Öffnen',
    openSource: 'Open Source',
    building: 'In Entwicklung',
    allProjects: 'Alle Projekte ansehen',
    video: 'Video',
    heroAside: 'Unterschiedliche Ökosysteme. Eine stärkere Zukunft.',
    heroCorner: 'Technologie ist stärker, wenn sie Welten verbindet.',
  },
  fr: {
    open: 'Ouvrir',
    openSource: 'Open source',
    building: 'En construction',
    allProjects: 'Voir tous les projets',
    video: 'Vidéo',
    heroAside: 'Des écosystèmes différents. Un avenir plus fort.',
    heroCorner: 'La technologie est plus puissante lorsqu’elle relie les mondes.',
  },
  it: {
    open: 'Apri',
    openSource: 'Open source',
    building: 'In costruzione',
    allProjects: 'Vedi tutti i progetti',
    video: 'Video',
    heroAside: 'Ecosistemi diversi. Un domani più forte.',
    heroCorner: 'La tecnologia è più potente quando collega mondi.',
  },
  'pt-BR': {
    open: 'Abrir',
    openSource: 'Open source',
    building: 'Em construção',
    allProjects: 'Ver todos os projetos',
    video: 'Vídeo',
    heroAside: 'Ecossistemas diferentes. Um amanhã mais forte.',
    heroCorner: 'A tecnologia é mais poderosa quando conecta mundos.',
  },
  ru: {
    open: 'Открыть',
    openSource: 'Open source',
    building: 'В разработке',
    allProjects: 'Все проекты',
    video: 'Видео',
    heroAside: 'Разные экосистемы. Более сильное завтра.',
    heroCorner: 'Технологии сильнее, когда соединяют миры.',
  },
  'zh-Hans': {
    open: '打开',
    openSource: '开源',
    building: '开发中',
    allProjects: '查看全部项目',
    video: '视频',
    heroAside: '不同的生态，更强的明天。',
    heroCorner: '当技术连接不同世界时，它更有力量。',
  },
  ja: {
    open: '開く',
    openSource: 'オープンソース',
    building: '開発中',
    allProjects: 'すべてのプロジェクトを見る',
    video: '動画',
    heroAside: '異なるエコシステム。より強い明日へ。',
    heroCorner: 'テクノロジーは世界をつなぐとき、より強くなる。',
  },
};
