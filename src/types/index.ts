import { 
  RUPESTRE_SOL, ARTIGO_REVISTA_RBECM, ARTIGO_REVISTA_EXITUS, 
  APRES_ESCOLA_CARLOTA, CONST_SARG, OBSERVACAO, 
  BURACOS_NEGROS, CERT_MCTI_IMG, MINICURSO_ASTRO, 
  CERT_NOITE_ESTRELAS_IMG, GLOBO_PLASMA, TELESCOPIO, LUA, SOL
} from '@/assets/img';
import { CERT_MCTI, CERT_NOITE_ESTRELAS } from '@/assets/file';
import {
  Sparkles,
  Telescope,
  Zap,
  Camera,
  Music,
  Flame,
  type LucideIcon,
} from 'lucide-react';

// ==========================================
// 1. DEFINIÇÃO DAS TIPAGENS
// ==========================================

export interface NavBarItem {
  name: string;
  id: string;
}

export interface VivenciasItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: LucideIcon;
  tag: string;
}

export interface AboutImage {
  src: string;
  name: string;
  top: string;
  left: string;
}

export interface CardItem {
  image: string;
  title: string;
  description: string;
}

export interface KnowledgeCardItem {
  type: string;
  image: string;
  title: string;
  description: string;
  articleLink?: string;
  institutionalLink?: string;
  certificateLink?: string;
}

// ==========================================
// 2. DADOS DO PROJETO (CONTEÚDO ORIGINAL)
// ==========================================

export const NavBarItens: NavBarItem[] = [
  { name: "Início", id: "home" },
  { name: "Sobre o Projeto", id: "sobre" },
  { name: "Vivências", id: "vivencias" },
  { name: "Saberes", id: "saberes" },
  { name: "Contato", id: "contato" }
];

export const Images: AboutImage[] = [
  { src: RUPESTRE_SOL, name: "pedra rupestre", top: "40%", left: "10%" },
  { src: CONST_SARG, name: "Constelacao Sagittarius", top: "15%", left: "85%" }
];

export const Cards: CardItem[] = [
  {
    image: OBSERVACAO,
    title: 'Observação astronômica: Uma viagem ao céu noturno',
    description: 'Com um telescópio, iremos observar de perto a Lua, Saturno com seus anéis, Júpiter com suas luas e outros astros visíveis. Uma viagem mágica sob o céu noturno!',
  },
  {
    image: BURACOS_NEGROS,
    title: 'Apresentação: O Mistério dos Buracos Negros',
    description: 'Você sabia que as estrelas também nascem, vivem e morrem? Nessa vivência, vamos descobrir como elas se formam, o que acontece quando explodem, e como surgem os fascinantes buracos negros.',
  },
];


export const astroPhotos = [
    {
      url: "/assets/img/astrofotografia.jpg", // Imagem padrão que já estava no card
      exif: "ISO 1600 • 30s • f/2.8 • 18mm"
    },
    {
      url: SOL, // Substitua por outra foto de astrofotografia do projeto
      exif: "ISO 3200 • 60s • f/4.0 • 50mm"
    },
    {
      url: LUA, // Substitua por outra foto de astrofotografia do projeto
      exif: "ISO 800 • 15s • f/2.0 • 24mm"
    }
  ];


  // Dados atualizados de vivências e intervenções
  export const VivenciasCards: VivenciasItem[] = [
    {
      title: "Observação Astronômica",
      subtitle: "Telescópio de Alta Precisão",
      description: "O núcleo da experiência. Aparelhos apontados para os astros onde cada participante tem a oportunidade de contemplar crateras lunares, anéis de Saturno, nebulosas e estrelas distantes com os próprios olhos.",
      image: TELESCOPIO,
      icon: Telescope,
      tag: "Ciência & Visão"
    },
    {
      title: "Intervenção na Pista",
      subtitle: "Psicodelia Astronômica • Pulsar Festival",
      description: "Uma experiência pioneira onde levamos a observação astronômica direto para a pista de dança em festivais. A fusão perfeita entre a energia do som psicodélico, a imersão visual e a contemplação do Cosmos sem precisar sair de cena.",
      image: "/assets/img/intervencao-pista.jpg",
      icon: Flame,
      tag: "Destaque •  Alternativa"
    },
    {
      title: "Globo de Plasma",
      subtitle: "Energia e Eletricidade em Suas Mãos",
      description: "Uma instalação interativa e sensorial que atrai curiosos de todas as idades. O globo de plasma demonstra fenômenos físicos fascinantes através de filamentos luminosos que reagem ao toque humano.",
      image: GLOBO_PLASMA,
      icon: Zap,
      tag: "Interativo & Científico"
    },
    {
      title: "Astrofotografias Autorais",
      subtitle: "Registros do Céu Profundo",
      description: "Exposição de imagens capturadas pelas lentes do próprio projeto, revelando nebulosas, galáxias e rastros estelares com seus respectivos dados técnicos (EXIF), unindo rigor fotográfico e arte estelar.",
      image: "/assets/img/astrofotografia.jpg",
      icon: Camera,
      tag: "Galeria de Arte"
    },
    {
      title: "Playlist Oficial do Projeto",
      subtitle: "Trilha Sonora Imersiva & Contemplativa",
      description: "Para além do visual, preparamos uma experiência auditiva completa. Uma seleção musical pensada para acompanhar momentos de expansão da consciência, relaxamento e conexão profunda com o Universo.",
      image: OBSERVACAO,
      icon: Music,
      tag: "Experiência Sonora"
    }
  ];

export const KnowledgesCard: KnowledgeCardItem[] = [
  {
    type: 'article',
    image: ARTIGO_REVISTA_EXITUS,
    title: 'Artigo científico publicado na Revista Exitus',
    description: 'O Artigo intitulado "Possibilidades educacionais de uma atividade de divulgação científica sobre buracos negros", discute como a educação científica pode tornar o conhecimento astrofísico mais acessível e significativo para estudantes e público em geral.',
    articleLink: 'https://portaldeperiodicos.ufopa.edu.br/index.php/revistaexitus/article/view/1647',
    institutionalLink: "https://www.ifspcaraguatatuba.edu.br/noticias/revista-publica-artigo-de-graduado-pelo-ifsp-caraguatatuba-sobre-buracos-negros"
  },
  {
    type: 'presentation',
    image: MINICURSO_ASTRO,
    title: '5º Minicurso de Astronomia: Buracos Negros',
    description: 'Participou da organização do 5º Minicurso de Astronomia do IFSP-Caraguatatuba, em maio de 2019, e apresentou uma palestra sobre a primeira imagem registrada de um buraco negro, contribuindo para a divulgação científica junto à comunidade local.',
    institutionalLink: 'https://www.ifspcaraguatatuba.edu.br/noticias/5-minicurso-de-astronomia-do-ifsp-caraguatatuba-contou-com-ampla-participacao',
  },
  {
    type: 'course',
    image: CERT_MCTI_IMG,
    title: '1º Seminário Internacional: Astronomia e Astronáutica - MCTI',
    description: 'Participação em evento do MCTI voltado à divulgação científica em astronomia, astronáutica e educação, com especialistas de instituições nacionais e internacionais.',
    institutionalLink: 'https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/noticias/2021/06/1o-seminario-internacional-de-astronomia-e-astronautica-mcti-comeca-nesta-terca-feira-8',
    certificateLink: CERT_MCTI,
  },
  {
    type: 'presentation',
    image: CERT_NOITE_ESTRELAS_IMG,
    title: 'VI Noite com as Estrelas: Buracos Negros',
    description: 'Ministrou a palestra “Buracos Negros” durante a VI Noite com as Estrelas, evento promovida pela EE Alcides de Castro Galvão, em 11 de novembro de 2020.',
    institutionalLink: 'https://youtu.be/TqaeQxkWr50?si=XhpXHh4BGeBag2RS',
    certificateLink: CERT_NOITE_ESTRELAS,
  },
  {
    type: 'presentation',
    image: APRES_ESCOLA_CARLOTA,
    title: 'Apresentação sobre Buracos Negros na Escola Benedito Miguel Carlota',
    description: 'Apresentação para estudantes do ensino médio, em Caraguatatuba, com uma atividade educativa sobre buracos negros. A abordagem acessível buscou despertar o interesse dos alunos por temas científicos e pelo universo.',
    institutionalLink: 'https://www.ifspcaraguatatuba.edu.br/noticias/apresentacoes-cientificas-foram-feitas-em-escola-de-massaguacu',
  },
  {
    type: 'article',
    image: ARTIGO_REVISTA_RBECM,
    title: 'Artigo científico publicado na Revista Brasileira de Ensino de Ciências e Matemática',
    description: 'O artigo intitulado "BURACOS NEGROS, HISTÓRIA DA CIÊNCIA E ENSINO DE FÍSICA" analisa o uso dos buracos negros como tema interdisciplinar no ensino de física, com base em sua evolução histórica e potencial educativo.',
    articleLink: 'https://seer.upf.br/index.php/rbecm/article/view/12927',
  },
];