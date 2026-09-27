import { useState } from "react";
import { getAllPosts } from "@/utils/blog/blog";
import type { BlogPost } from "@/utils/blog/blog";
import BackgroundStars from "@/components/main/BackgroundStars";
import { LOGO_NAV_BAR } from "@/assets/img";
import { Instagram, ArrowLeft, Calendar, User, Sparkles, BookOpen } from "lucide-react";

export default function BlogPage() {
  const posts = getAllPosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-[#030014] text-gray-100 overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Background sutil */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-0 pointer-events-none" />
      <BackgroundStars />

      {/* Navbar Responsiva do Blog */}
      <nav className="w-full h-[70px] fixed top-0 bg-[#030014/80] backdrop-blur-xl border-b border-[#7042f820] z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <a href="/" className="group flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors">
            <img
              src={LOGO_NAV_BAR}
              alt="Logo Viagem ao Céu Noturno"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xs sm:text-sm font-medium tracking-wide">Início</span>
          </a>

          <div className="flex items-center gap-2 text-center">
            <Sparkles className="w-4 h-4 text-cyan-400 hidden sm:block animate-pulse" />
            <h1 className="text-sm sm:text-base md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-cyan-400">
              Diário do Cosmos
            </h1>
          </div>

          <a 
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[#7042f840] bg-[#030014] text-gray-300 hover:text-pink-400 hover:border-pink-400/60 transition-all duration-300 shadow-[0_0_15px_rgba(112,66,248,0.15)]" 
            href="https://www.instagram.com/viagemaoceunoturno/" 
            target="_blank" 
            rel="noreferrer"
            aria-label="Instagram do Projeto"
          >
            <Instagram size={18} />
          </a>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="relative z-10 pt-[110px] sm:pt-[130px] pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Cabeçalho da Seção */}
        <div className="mb-10 sm:mb-14 text-center sm:text-left">
          <a href="/" className="inline-flex items-center gap-2 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-4 group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Voltar para a página principal
          </a>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-cyan-400 tracking-tight">
            Explorações e Saberes Cósmicos
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-2xl leading-relaxed">
            Artigos gerados na intersecção entre astrofísica de vanguarda, astrofotografia e a profunda sabedoria da etnoastronomia ancestral Tupi-Guarani.
          </p>
        </div>

        {/* Grid de Posts Responsivo */}
        {posts.length === 0 ? (
          <div className="text-center py-20 px-4 border border-[#7042f830] rounded-2xl bg-[#03001460] backdrop-blur-md">
            <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-60 animate-bounce" />
            <p className="text-gray-400 text-sm sm:text-base">O observatório está calibrando as lentes. Novos registros cósmicos surgirão em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <article 
                key={post.slug}
                className="group border border-[#7042f840] bg-[#03001480] hover:bg-[#030014] rounded-2xl overflow-hidden shadow-xl shadow-[#7042f810] hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
              >
                <div>
                  {/* Banner / Imagem do Card */}
                  <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-purple-950/50 via-[#030014] to-cyan-950/50 relative overflow-hidden flex items-center justify-center border-b border-[#7042f820]">
                    {post.image && post.image !== "/images/blog/default-cosmos.jpg" ? (
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="text-cyan-400/50 text-3xl font-serif">✦</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Registro Cósmico</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />
                  </div>
                  
                  {/* Informações do Card */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-cyan-400 mb-2 font-mono">
                      <Calendar size={13} /> 
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-100 group-hover:text-cyan-300 transition-colors mb-3 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Rodapé do Card */}
                <div className="p-5 sm:p-6 pt-0 flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group/btn"
                  >
                    <span>Ler matéria completa</span> 
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal de Leitura Responsivo */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#030014] border border-[#7042f861] rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 md:p-10 shadow-2xl relative scrollbar-thin scrollbar-thumb-purple-900">
              
              {/* Botão Fechar */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-white text-base bg-[#7042f820] hover:bg-[#7042f840] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fechar modal"
              >
                ✕
              </button>

              {/* Metadados do Artigo */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-cyan-400 mb-3 font-mono">
                <span className="flex items-center gap-1"><Calendar size={14} /> {selectedPost.date}</span>
                <span className="text-gray-600">•</span>
                <span className="flex items-center gap-1"><User size={14} /> {selectedPost.author}</span>
              </div>

              {/* Título */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 mb-6 leading-tight">
                {selectedPost.title}
              </h2>
              
              {/* Corpo do Texto */}
              <div className="text-gray-300 space-y-4 sm:space-y-6 leading-relaxed text-sm sm:text-base border-t border-[#7042f830] pt-6 whitespace-pre-line font-light">
                {selectedPost.content}
              </div>

              {/* Tags do Artigo */}
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="mt-8 pt-4 border-t border-[#7042f820] flex items-center flex-wrap gap-2">
                  {selectedPost.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-mono bg-[#7042f815] border border-[#7042f840] text-cyan-300 px-2.5 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Call to Action (CTA) Rodapé do Modal */}
              <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/50 via-[#030014] to-cyan-950/50 border border-[#7042f840] text-center">
                <h4 className="text-base sm:text-lg font-semibold text-gray-100 mb-2">Quer vivenciar isso na prática?</h4>
                <p className="text-gray-300 text-xs sm:text-sm mb-4 max-w-md mx-auto">
                  Conecte-se com o cosmos ao vivo através das nossas observações astronômicas itinerantes com telescópios.
                </p>
                <a 
                  href="/#vivencias" 
                  onClick={() => setSelectedPost(null)}
                  className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25 cursor-pointer"
                >
                  Conhecer Experiências Presenciais
                </a>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}