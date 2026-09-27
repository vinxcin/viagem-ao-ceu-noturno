import { ChevronDown, Compass, Telescope } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id: string = "sobre") => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -1;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col justify-between sm:h-[95vh] md:min-h-screen w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-28 pb-8 sm:py-20 overflow-hidden bg-[#030014] text-[#E2D9C8]"
    >
      {/* 1. Nebula Background & Vídeo Cósmico (Cyan para Roxo) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {/* Orbe Ciano no canto superior esquerdo */}
        <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] md:w-[50vw] md:h-[50vw] rounded-full bg-cyan-500/15 blur-[120px] sm:blur-[140px] animate-pulse" />
        
        {/* Orbe Roxo Profundo no canto inferior direito */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[65vw] h-[65vw] md:w-[55vw] md:h-[55vw] rounded-full bg-[#7a3bfc]/20 blur-[130px] sm:blur-[150px]" />



        {/* Gradientes de escurecimento para leitura perfeita */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/60 to-[#030014]/80" />
      </div>

      {/* 2. Header Superior Flutuante (Otimizado para Mobile) */}
      <div className="hidden md:flex relative z-10 w-full max-w-7xl mx-auto items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md">
          <Telescope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-cyan-200 truncate">
            Projeto Educional Itinerante
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-950/20 backdrop-blur-md text-xs font-mono tracking-widest text-purple-200 uppercase">
          <Compass className="w-4 h-4 text-purple-400" />
          <span>Vivencias sensoriais</span>
        </div>
      </div>

      {/* 3. Conteúdo Central Cósmico (Espaçamento e Layout Responsivo) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto my-auto space-y-6 sm:space-y-8 py-6">
        
        <div className=" hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-amber-950/20 backdrop-blur-md text-amber-200 text-[11px] sm:text-xs font-mono tracking-widest uppercase shadow-lg">
          <span>Ciência • Arte • Cultura Alternativa</span>
        </div>

        {/* Título Hiper-Cósmico / Tecnológico Ajustado */}
        <div className="relative max-w-4xl mx-auto py-1">
          {/* Efeito de brilho holográfico de fundo */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-600/20 to-transparent blur-2xl -z-10 rounded-full" />
          
          <h1 className="title text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider leading-[1.1] uppercase bg-gradient-to-r from-cyan-400 via-sky-200 to-[#7a3bfc] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
            Viagem ao <br />
            <span className="text-white drop-shadow-[0_0_35px_rgba(122,59,252,0.8)]">
              Céu Noturno
            </span>
          </h1>
        </div>

        <p className="text text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl font-light leading-relaxed px-2 sm:px-4">
          Unindo ciência, arte e cultura alternativa através do telescópio, globo de plasma e astrofotografia. Nossa missão é{" "}
          <em className="text-cyan-300 font-normal italic underline decoration-cyan-400/40 underline-offset-4">
            plantar a semente do senso de pertencimento ao Cosmos
          </em>{" "}
          em uma experiência imersiva de contemplação!
        </p>

        {/* Botões de Ação 100% Responsivos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 pt-2 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={() => scrollToSection("vivencias")}
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-cyan-500 to-[#7a3bfc] hover:from-cyan-400 hover:to-[#8b5cf6] text-white font-medium text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(122,59,252,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explorar Vivências</span>
          </button>

          <button
            onClick={() => scrollToSection("sobre")}
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50 text-white font-medium text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            Conhecer o Projeto
          </button>
        </div>
      </div>

      {/* 4. Rodapé e Indicador de Scroll */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center pt-4 sm:pt-6 border-t border-white/10 text-xs text-slate-400">
        <div 
          className="flex flex-col items-center cursor-pointer group py-1" 
          onClick={() => scrollToSection("sobre")}
        >
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-cyan-300/70 group-hover:text-cyan-300 transition-colors mb-4 text-center">
            Deslize para viajar ao cosmos
          </span>
          <ChevronDown className="animate-bounce text-cyan-400 group-hover:text-cyan-300 transition-colors" size={20} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-700 via-cyan-600  to-purple-600 animate-glow" />
      
    </section>
  );
}