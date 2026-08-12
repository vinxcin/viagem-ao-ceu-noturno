import type { CardItem } from '@/types';

interface ExperienceCardProps {
  data: CardItem;
}

export default function ExperienceCard({ data }: ExperienceCardProps) {
  return (
    <div className="relative flex flex-col w-full h-[400px] rounded-2xl overflow-hidden group border border-white/10 bg-black/50 backdrop-blur-md">
      <img 
        src={data.image} 
        alt={data.title} 
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      
      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-left">
        <h3 className="text-2xl font-bold text-white mb-2 shadow-black drop-shadow-md">
          {data.title}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-3">
          {data.description}
        </p>
      </div>
    </div>
  );
}