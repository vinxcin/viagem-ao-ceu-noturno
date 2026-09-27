import { useState } from "react";
import { getAllPosts } from "@/utils/blog/blog";
import type { BlogPost } from "@/types";
import BackgroundStars from "@/components/main/BackgroundStars";
import { LOGO_NAV_BAR } from "@/assets/img";
import { Instagram, ArrowLeft } from "lucide-react";

export default function BlogPage() {
  const posts = getAllPosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-[#030014] text-gray-100 overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-0 pointer-events-none" />
      <BackgroundStars />

      {/* Navbar específica do Blog */}
      <nav className="w-full h-[70px] fixed top-0 shadow-lg shadow-[#2A0E61]/40 bg-[#03001420] backdrop-blur-md z-50 transition-all duration-300">
        <div className="w-full h-full flex flex-row items-center justify-between px-6 md:px-10 lg:px-16 2xl:px-24">
          <div className="flex-1 flex justify-start">
            <a href="/" className="group h-auto w-auto flex flex-row items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <img
                src={LOGO_NAV_BAR}
                alt="Logo NavBar"
                width={36}
                height={36}
                className="cursor-pointer transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-sm font-medium hidden sm:inline">Voltar ao Início</span>
            </a>
          </div>

          <div className="flex-none flex items-center">
            <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Diário do Cosmos
            </h1>
          </div>

          <div className="flex-1 flex justify-end items-center">
            <a 
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#7042f861] bg-[#03001490] text-white hover:text-pink-400 hover:border-pink-400 transition-all duration-300 shadow-[0_0_10px_rgba(112,66,248,0.2)]" 
              href="https://www.instagram.com/viagemaoceunoturno/" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Conteúdo do Blog */}
      <main className="relative z-10 pt-[120px] pb-20 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        
        <div className="mb-12">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:underline mb-4">
            <ArrowLeft size={16} /> Voltar para a página principal
          </a>
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Explorações e Saberes Cósmicos
          </h2>
          <p className="text-gray-400 mt-2 text-base md:text-lg">
            Artigos gerados cientificamente para expandir o senso de pertencimento ao universo.
          </p>
        </div>

        {/* Grid de Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-[#7042f830] rounded-xl bg-[#03001460] backdrop-blur-md">
            <p className="text-gray-400">O observatório está calibrando as lentes. O primeiro artigo gerado pelo agente aparecerá em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div 
                key={post.slug}
                className="border border-[#7042f861] bg-[#03001490] rounded-xl overflow-hidden shadow-lg shadow-[#7042f810] hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {post.image && (
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover opacity-85" />
                  )}
                  <div className="p-6">
                    <span className="text-xs text-cyan-400 font-semibold">{post.date}</span>
                    <h3 className="text-xl font-bold text-gray-200 mt-2 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{post.description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Ler matéria completa →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Leitura do Artigo */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#030014] border border-[#7042f861] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 shadow-2xl relative">
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold bg-[#7042f820] w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                ✕
              </button>

              <span className="text-xs text-cyan-400 font-semibold">{selectedPost.date} • {selectedPost.author}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mt-2 mb-6">{selectedPost.title}</h2>
              
              <div className="text-gray-300 space-y-4 leading-relaxed text-sm md:text-base whitespace-pre-line border-t border-[#7042f830] pt-6">
                {selectedPost.content}
              </div>

              {/* Call to Action (CTA) do Projeto */}
              <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-[#7042f850] text-center">
                <h4 className="text-lg font-semibold text-gray-100 mb-2">Gostou da jornada?</h4>
                <p className="text-gray-300 text-sm mb-4">Conecte-se com o cosmos ao vivo através das nossas observações astronômicas itinerantes.</p>
                <a 
                  href="/#vivencias" 
                  onClick={() => setSelectedPost(null)}
                  className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Conhecer Experiências
                </a>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}