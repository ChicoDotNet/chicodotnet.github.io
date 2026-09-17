export const supportedLocales = ['es', 'en', 'de', 'fr', 'it', 'pt-BR', 'ru', 'zh-Hans', 'ja'] as const;
export type Locale = (typeof supportedLocales)[number];

type Copy = {
  language: string;
  projects: string;
  articles: string;
  diagrams: string;
  videos: string;
  contact: string;
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  explore: string;
  read: string;
  facts: [string, string, string, string];
  projectsEyebrow: string;
  projectsTitle: string;
  ferrumDescription: string;
  ferrumBody: string;
  ferrumCta: string;
  sifrasDescription: string;
  sifrasBody: string;
  sifrasCta: string;
  articleEyebrow: string;
  articleTitle: string;
  diagramEyebrow: string;
  diagramTitle: string;
  videoEyebrow: string;
  videoTitle: string;
  quote: string;
  connectEyebrow: string;
  connectTitle: string;
  connectBody: string;
  emailCta: string;
};

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  'pt-BR': 'Português (Brasil)',
  ru: 'Русский',
  'zh-Hans': '简体中文',
  ja: '日本語',
};

const copy: Record<Locale, Copy> = {
  es: {
    language: 'Idioma', projects: 'Proyectos', articles: 'Artículos', diagrams: 'Diagramas', videos: 'Videos', contact: 'Contacto',
    heroEyebrow: 'Arquitectura de software · .NET · Rust · IA · Open Source',
    heroTitle: 'ChicoDotNet',
    heroBody: 'Construyo puentes entre tecnología, arquitectura y productos que tienen que funcionar de verdad. Aquí documento lo que construyo, lo que aprendo y lo que vale la pena compartir.',
    explore: 'Explorar proyectos', read: 'Leer artículos',
    facts: ['24+ años construyendo software', '.NET · Rust · IA', '120+ personas lideradas', 'Open source con evidencia'],
    projectsEyebrow: 'Trabajo destacado', projectsTitle: 'Proyectos que convierten ideas difíciles en sistemas verificables',
    ferrumDescription: 'Bringing Rust into the .NET ecosystem.', ferrumBody: 'Rust → CIL, interoperabilidad CTS, MSBuild y una experiencia .NET que no obligue a reescribir lo que ya funciona.', ferrumCta: 'Explorar FerrumWeave',
    sifrasDescription: 'Inteligencia fiscal con credenciales bajo control local.', sifrasBody: 'Descarga, organiza y resguarda evidencia fiscal sin entregar la e.firma a terceros. La página pública será la siguiente superficie del ecosistema.', sifrasCta: 'Explorar SIFRAS',
    articleEyebrow: 'Escritura', articleTitle: 'Artículos y notas técnicas', diagramEyebrow: 'Diagramas', diagramTitle: 'Arquitectura que se puede leer, versionar y discutir', videoEyebrow: 'Ver y aprender', videoTitle: 'Videos, demos y explicaciones visuales',
    quote: 'Las mejores soluciones nacen cuando conectamos personas, ideas y tecnología.',
    connectEyebrow: 'Conectemos', connectTitle: '¿Traes un problema difícil?', connectBody: 'Ideas, arquitectura, open source, .NET, Rust, IA o simplemente una conversación técnica que valga la pena. Escríbeme.', emailCta: 'Escribir a ChicoDotNet',
  },
  en: {
    language: 'Language', projects: 'Projects', articles: 'Writing', diagrams: 'Diagrams', videos: 'Videos', contact: 'Contact',
    heroEyebrow: 'Software architecture · .NET · Rust · AI · Open Source', heroTitle: 'ChicoDotNet', heroBody: 'I build bridges between technology, architecture, and products that have to work for real. This is where I document what I build, learn, and believe is worth sharing.', explore: 'Explore projects', read: 'Read writing',
    facts: ['24+ years building software', '.NET · Rust · AI', '120+ people led', 'Open source with evidence'], projectsEyebrow: 'Featured work', projectsTitle: 'Projects that turn difficult ideas into verifiable systems', ferrumDescription: 'Bringing Rust into the .NET ecosystem.', ferrumBody: 'Rust → CIL, CTS interoperability, MSBuild, and a .NET experience that does not require rewriting what already works.', ferrumCta: 'Explore FerrumWeave', sifrasDescription: 'Fiscal intelligence with local credential control.', sifrasBody: 'Download, organize, and preserve fiscal evidence without handing your e-signature to a third party. Its public page is the next surface in the ecosystem.', sifrasCta: 'Explore SIFRAS', articleEyebrow: 'Writing', articleTitle: 'Articles and technical notes', diagramEyebrow: 'Diagrams', diagramTitle: 'Architecture you can read, version, and discuss', videoEyebrow: 'Watch & learn', videoTitle: 'Videos, demos, and visual explanations', quote: 'The best solutions emerge when we connect people, ideas, and technology.', connectEyebrow: 'Let’s connect', connectTitle: 'Working on a hard problem?', connectBody: 'Ideas, architecture, open source, .NET, Rust, AI, or simply a technical conversation worth having. Write to me.', emailCta: 'Email ChicoDotNet',
  },
  de: {
    language: 'Sprache', projects: 'Projekte', articles: 'Artikel', diagrams: 'Diagramme', videos: 'Videos', contact: 'Kontakt', heroEyebrow: 'Softwarearchitektur · .NET · Rust · KI · Open Source', heroTitle: 'ChicoDotNet', heroBody: 'Ich baue Brücken zwischen Technologie, Architektur und Produkten, die in der Praxis funktionieren müssen. Hier dokumentiere ich, was ich baue, lerne und für teilenswert halte.', explore: 'Projekte entdecken', read: 'Artikel lesen', facts: ['24+ Jahre Softwareentwicklung', '.NET · Rust · KI', '120+ Menschen geführt', 'Open Source mit Evidenz'], projectsEyebrow: 'Ausgewählte Arbeit', projectsTitle: 'Projekte, die schwierige Ideen in überprüfbare Systeme verwandeln', ferrumDescription: 'Rust in das .NET-Ökosystem bringen.', ferrumBody: 'Rust → CIL, CTS-Interoperabilität, MSBuild und eine .NET-Erfahrung ohne unnötige Neuentwicklung.', ferrumCta: 'FerrumWeave entdecken', sifrasDescription: 'Steuerintelligenz mit lokaler Kontrolle der Zugangsdaten.', sifrasBody: 'Steuerliche Nachweise herunterladen, organisieren und sichern, ohne die elektronische Signatur an Dritte zu geben.', sifrasCta: 'SIFRAS entdecken', articleEyebrow: 'Artikel', articleTitle: 'Artikel und technische Notizen', diagramEyebrow: 'Diagramme', diagramTitle: 'Architektur, die man lesen, versionieren und diskutieren kann', videoEyebrow: 'Ansehen & lernen', videoTitle: 'Videos, Demos und visuelle Erklärungen', quote: 'Die besten Lösungen entstehen, wenn wir Menschen, Ideen und Technologie verbinden.', connectEyebrow: 'Kontakt', connectTitle: 'Arbeitest du an einem schwierigen Problem?', connectBody: 'Ideen, Architektur, Open Source, .NET, Rust, KI oder einfach ein technisches Gespräch, das sich lohnt.', emailCta: 'ChicoDotNet schreiben',
  },
  fr: {
    language: 'Langue', projects: 'Projets', articles: 'Articles', diagrams: 'Diagrammes', videos: 'Vidéos', contact: 'Contact', heroEyebrow: 'Architecture logicielle · .NET · Rust · IA · Open Source', heroTitle: 'ChicoDotNet', heroBody: 'Je construis des ponts entre technologie, architecture et produits qui doivent réellement fonctionner. Ici, je documente ce que je construis, apprends et juge utile de partager.', explore: 'Explorer les projets', read: 'Lire les articles', facts: ['24+ ans à construire du logiciel', '.NET · Rust · IA', '120+ personnes dirigées', 'Open source avec preuves'], projectsEyebrow: 'Travaux en vedette', projectsTitle: 'Des projets qui transforment des idées difficiles en systèmes vérifiables', ferrumDescription: 'Bringing Rust into the .NET ecosystem.', ferrumBody: 'Rust → CIL, interopérabilité CTS, MSBuild et une expérience .NET sans réécrire ce qui fonctionne déjà.', ferrumCta: 'Explorer FerrumWeave', sifrasDescription: 'Intelligence fiscale avec contrôle local des identifiants.', sifrasBody: 'Télécharger, organiser et conserver les preuves fiscales sans confier la signature électronique à un tiers.', sifrasCta: 'Explorer SIFRAS', articleEyebrow: 'Écriture', articleTitle: 'Articles et notes techniques', diagramEyebrow: 'Diagrammes', diagramTitle: 'Une architecture que l’on peut lire, versionner et discuter', videoEyebrow: 'Voir & apprendre', videoTitle: 'Vidéos, démos et explications visuelles', quote: 'Les meilleures solutions naissent lorsque nous relions les personnes, les idées et la technologie.', connectEyebrow: 'Connectons-nous', connectTitle: 'Un problème difficile à résoudre ?', connectBody: 'Idées, architecture, open source, .NET, Rust, IA ou simplement une conversation technique qui en vaut la peine.', emailCta: 'Écrire à ChicoDotNet',
  },
  it: {
    language: 'Lingua', projects: 'Progetti', articles: 'Articoli', diagrams: 'Diagrammi', videos: 'Video', contact: 'Contatto', heroEyebrow: 'Architettura software · .NET · Rust · IA · Open Source', heroTitle: 'ChicoDotNet', heroBody: 'Costruisco ponti tra tecnologia, architettura e prodotti che devono funzionare davvero. Qui documento ciò che costruisco, imparo e ritengo utile condividere.', explore: 'Esplora i progetti', read: 'Leggi gli articoli', facts: ['24+ anni di software', '.NET · Rust · IA', '120+ persone guidate', 'Open source con evidenze'], projectsEyebrow: 'Lavori in evidenza', projectsTitle: 'Progetti che trasformano idee difficili in sistemi verificabili', ferrumDescription: 'Portare Rust nell’ecosistema .NET.', ferrumBody: 'Rust → CIL, interoperabilità CTS, MSBuild e un’esperienza .NET senza riscrivere ciò che funziona già.', ferrumCta: 'Esplora FerrumWeave', sifrasDescription: 'Intelligenza fiscale con controllo locale delle credenziali.', sifrasBody: 'Scarica, organizza e conserva evidenze fiscali senza consegnare la firma elettronica a terzi.', sifrasCta: 'Esplora SIFRAS', articleEyebrow: 'Scrittura', articleTitle: 'Articoli e note tecniche', diagramEyebrow: 'Diagrammi', diagramTitle: 'Architettura da leggere, versionare e discutere', videoEyebrow: 'Guarda e impara', videoTitle: 'Video, demo e spiegazioni visive', quote: 'Le migliori soluzioni nascono quando colleghiamo persone, idee e tecnologia.', connectEyebrow: 'Connettiamoci', connectTitle: 'Hai un problema difficile?', connectBody: 'Idee, architettura, open source, .NET, Rust, IA o semplicemente una conversazione tecnica che vale la pena avere.', emailCta: 'Scrivi a ChicoDotNet',
  },
  'pt-BR': {
    language: 'Idioma', projects: 'Projetos', articles: 'Artigos', diagrams: 'Diagramas', videos: 'Vídeos', contact: 'Contato', heroEyebrow: 'Arquitetura de software · .NET · Rust · IA · Open Source', heroTitle: 'ChicoDotNet', heroBody: 'Construo pontes entre tecnologia, arquitetura e produtos que precisam funcionar de verdade. Aqui documento o que construo, aprendo e considero que vale a pena compartilhar.', explore: 'Explorar projetos', read: 'Ler artigos', facts: ['24+ anos construindo software', '.NET · Rust · IA', '120+ pessoas lideradas', 'Open source com evidência'], projectsEyebrow: 'Trabalho em destaque', projectsTitle: 'Projetos que transformam ideias difíceis em sistemas verificáveis', ferrumDescription: 'Bringing Rust into the .NET ecosystem.', ferrumBody: 'Rust → CIL, interoperabilidade CTS, MSBuild e uma experiência .NET sem reescrever o que já funciona.', ferrumCta: 'Explorar FerrumWeave', sifrasDescription: 'Inteligência fiscal com controle local das credenciais.', sifrasBody: 'Baixe, organize e preserve evidências fiscais sem entregar sua assinatura eletrônica a terceiros.', sifrasCta: 'Explorar SIFRAS', articleEyebrow: 'Artigos', articleTitle: 'Artigos e notas técnicas', diagramEyebrow: 'Diagramas', diagramTitle: 'Arquitetura que pode ser lida, versionada e discutida', videoEyebrow: 'Assista e aprenda', videoTitle: 'Vídeos, demos e explicações visuais', quote: 'As melhores soluções nascem quando conectamos pessoas, ideias e tecnologia.', connectEyebrow: 'Vamos conversar', connectTitle: 'Tem um problema difícil?', connectBody: 'Ideias, arquitetura, open source, .NET, Rust, IA ou simplesmente uma conversa técnica que valha a pena.', emailCta: 'Escrever para ChicoDotNet',
  },
  ru: {
    language: 'Язык', projects: 'Проекты', articles: 'Статьи', diagrams: 'Диаграммы', videos: 'Видео', contact: 'Контакты', heroEyebrow: 'Архитектура ПО · .NET · Rust · ИИ · Open Source', heroTitle: 'ChicoDotNet', heroBody: 'Я строю мосты между технологиями, архитектурой и продуктами, которые должны реально работать. Здесь я документирую то, что создаю, изучаю и считаю достойным публикации.', explore: 'Смотреть проекты', read: 'Читать статьи', facts: ['24+ года в разработке', '.NET · Rust · ИИ', '120+ человек в командах', 'Open source с доказательствами'], projectsEyebrow: 'Избранные проекты', projectsTitle: 'Проекты, превращающие сложные идеи в проверяемые системы', ferrumDescription: 'Rust в экосистеме .NET.', ferrumBody: 'Rust → CIL, совместимость CTS, MSBuild и .NET без ненужного переписывания работающих систем.', ferrumCta: 'Открыть FerrumWeave', sifrasDescription: 'Налоговая аналитика с локальным контролем учетных данных.', sifrasBody: 'Загрузка, организация и хранение налоговых доказательств без передачи электронной подписи третьим лицам.', sifrasCta: 'Открыть SIFRAS', articleEyebrow: 'Статьи', articleTitle: 'Статьи и технические заметки', diagramEyebrow: 'Диаграммы', diagramTitle: 'Архитектура, которую можно читать, версионировать и обсуждать', videoEyebrow: 'Смотреть и учиться', videoTitle: 'Видео, демо и визуальные объяснения', quote: 'Лучшие решения появляются, когда мы соединяем людей, идеи и технологии.', connectEyebrow: 'Связаться', connectTitle: 'Есть сложная задача?', connectBody: 'Идеи, архитектура, open source, .NET, Rust, ИИ или просто технический разговор, который стоит провести.', emailCta: 'Написать ChicoDotNet',
  },
  'zh-Hans': {
    language: '语言', projects: '项目', articles: '文章', diagrams: '图表', videos: '视频', contact: '联系', heroEyebrow: '软件架构 · .NET · Rust · AI · 开源', heroTitle: 'ChicoDotNet', heroBody: '我在技术、架构与真正需要可靠运行的产品之间搭建桥梁。这里记录我构建的东西、学到的经验，以及值得分享的思考。', explore: '浏览项目', read: '阅读文章', facts: ['24+ 年软件经验', '.NET · Rust · AI', '领导过 120+ 人', '以证据驱动开源'], projectsEyebrow: '精选工作', projectsTitle: '把困难想法变成可验证系统的项目', ferrumDescription: '把 Rust 带入 .NET 生态。', ferrumBody: 'Rust → CIL、CTS 互操作、MSBuild，以及无需重写现有系统的 .NET 开发体验。', ferrumCta: '浏览 FerrumWeave', sifrasDescription: '凭据本地控制的税务智能。', sifrasBody: '在不把电子签名交给第三方的情况下下载、整理并保存税务证据。', sifrasCta: '浏览 SIFRAS', articleEyebrow: '文章', articleTitle: '文章与技术笔记', diagramEyebrow: '图表', diagramTitle: '可阅读、可版本化、可讨论的架构', videoEyebrow: '观看与学习', videoTitle: '视频、演示与可视化讲解', quote: '最好的解决方案，诞生于我们把人、想法与技术连接起来的时候。', connectEyebrow: '联系我', connectTitle: '正在解决一个困难问题？', connectBody: '无论是想法、架构、开源、.NET、Rust、AI，还是一次值得进行的技术交流，都欢迎联系。', emailCta: '给 ChicoDotNet 发邮件',
  },
  ja: {
    language: '言語', projects: 'プロジェクト', articles: '記事', diagrams: '図', videos: '動画', contact: '連絡', heroEyebrow: 'ソフトウェアアーキテクチャ · .NET · Rust · AI · Open Source', heroTitle: 'ChicoDotNet', heroBody: 'テクノロジー、アーキテクチャ、そして本当に動く必要のあるプロダクトの間に橋を架けています。ここでは、作ったもの、学んだこと、共有する価値があると思うことを記録します。', explore: 'プロジェクトを見る', read: '記事を読む', facts: ['24年以上のソフトウェア経験', '.NET · Rust · AI', '120人以上をリード', '証拠を伴うオープンソース'], projectsEyebrow: '注目の仕事', projectsTitle: '難しいアイデアを検証可能なシステムに変えるプロジェクト', ferrumDescription: 'Rust を .NET エコシステムへ。', ferrumBody: 'Rust → CIL、CTS 相互運用、MSBuild、そして既存資産を書き直さずに済む .NET 体験。', ferrumCta: 'FerrumWeave を見る', sifrasDescription: '資格情報をローカルで管理する税務インテリジェンス。', sifrasBody: '電子署名を第三者へ渡すことなく、税務証跡を取得・整理・保全します。', sifrasCta: 'SIFRAS を見る', articleEyebrow: '記事', articleTitle: '記事と技術ノート', diagramEyebrow: '図', diagramTitle: '読めて、バージョン管理できて、議論できるアーキテクチャ', videoEyebrow: '見る・学ぶ', videoTitle: '動画、デモ、ビジュアル解説', quote: '最高の解決策は、人・アイデア・テクノロジーをつないだときに生まれる。', connectEyebrow: 'つながる', connectTitle: '難しい課題に取り組んでいますか？', connectBody: 'アイデア、アーキテクチャ、オープンソース、.NET、Rust、AI、あるいは価値のある技術的な会話でも。', emailCta: 'ChicoDotNet にメールする',
  },
};

export function isLocale(value: string | null): value is Locale {
  return value !== null && (supportedLocales as readonly string[]).includes(value);
}

export function getCopy(locale: Locale): Copy {
  return copy[locale];
}
