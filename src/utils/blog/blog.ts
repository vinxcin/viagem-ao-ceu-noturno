// src/utils/blog.ts

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
  tags: string[];
  content: string;
}

// O Vite usa o import.meta.glob para carregar arquivos estáticos em lote na build
const postFiles = import.meta.glob('/content/blog/*.md', { eager: true, query: '?raw' });

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in postFiles) {
    const fileModule = postFiles[path] as { default?: string };
    const rawContent = fileModule.default;

    if (rawContent && typeof rawContent === 'string') {
      const parsed = parseMarkdown(rawContent);
      if (parsed) {
        posts.push(parsed);
      }
    }
  }

  // Ordena os posts por data (mais recente primeiro)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

// Parser simples de Frontmatter para evitar dependências pesadas
function parseMarkdown(fileContent: string): BlogPost | null {
  const match = fileContent.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!match) return null;

  const headerBlock = match[1];
  const content = match[2].trim();
  const metadata: Record<string, unknown> = {};

  headerBlock.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      
      // Remove aspas duplas ou simples se houver
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Trata arrays simples (como tags: ["Tag1", "Tag2"])
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          metadata[key.trim()] = JSON.parse(value);
        } catch {
          metadata[key.trim()] = value;
        }
      } else {
        metadata[key.trim()] = value;
      }
    }
  });

  return {
    slug: (metadata.slug as string) || '',
    title: (metadata.title as string) || '',
    date: (metadata.date as string) || '',
    author: (metadata.author as string) || 'Viagem ao Céu Noturno',
    description: (metadata.description as string) || '',
    image: (metadata.image as string) || '',
    tags: (metadata.tags as string[]) || [],
    content: content,
  };
}