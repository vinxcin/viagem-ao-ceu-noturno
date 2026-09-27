import type { KnowledgeCardItem } from '@/types';

interface KnowledgeCardProps {
  data: KnowledgeCardItem;
}

export default function KnowledgeCard({ data }: KnowledgeCardProps) {
  return (
    <a 
      href={data.articleLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
    >
      <div className="w-full h-48 rounded-lg overflow-hidden relative">
        <img 
          src={data.image} 
          alt={data.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-2 right-2 px-3 py-1 bg-black/70 backdrop-blur-sm text-xs font-semibold text-white rounded-full uppercase tracking-wider">
          {data.description}
        </span>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
          {data.title}
        </h4>
      </div>
    </a>
  );
}