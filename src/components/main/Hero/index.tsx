import { ChevronDown, ArrowRight, Telescope, Sparkles } from "lucide-react";

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
      className="relative flex flex-col min-h-screen w-full px-6 lg:px-20 justify-between items-center overflow-hidden text-[#E2D9C8] pt-24 pb-10 bg-[#07040d]"
    >
      {/* 1. Vídeo de Fundo com Ajuste Imersivo e Elegante */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 mix-blend-screen scale-105 filter brightness-90"
        >
          <source src="/assets/video/blackhole.mp4" type="video/mp4" />
        </video>
        {/* Gradiente refinado para garantir legibilidade e profundidade cósmica */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07040d]/90 via-[#07040d]/50 to-[#07040d]" />
      </div>

      {/* 2. Elementos Geométricos Sutis (Constelações / Órbitas Minimalistas) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20 flex justify-between items-center px-10 md:px-32">
        <div className="hidden md:block w-40 h-40 border border-[#d4af37]/20 rounded-full animate-spin-slow relative">
          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-[#d4af37] rounded-full blur-[1px]" />
        </div>
        <div className="hidden md:block w-48 h-48 border border-indigo-400/20 rotate-45 relative">
          <div className="absolute inset-3 border border-purple-400/20 rounded-full" />
        </div>
      </div>

      {/* 3. Metadados do Canto Superior (Estilo Observatório / Profissional) */}
      <div className="relative z-10 w-full max-w-7xl flex justify-between items-start text-xs font-mono tracking-[0.25em] text-[#d4af37]/70 uppercase pt-2 border-t border-[#d4af37]/15">
        <div className="flex items-center gap-2">
          <Telescope className="w-4 h-4 text-amber-300/80" />
          <div>
            <span className="block font-semibold text-amber-200/90">VIVÊNCIA ITINERANTE</span>
            <span className="text-slate-400 text-[10px]">CIÊNCIA • ARTE • CULTURA</span>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="block text-slate-300">OBSERVAÇÃO ASTRONÔMICA</span>
          <span className="text-slate-500 text-[10px]">EXPOSIÇÕES SENSORIAIS</span>
        </div>
      </div>

      {/* 4. Conteúdo Central de Impacto Contemplativo */}
      <div className="relative z-10 flex flex-col text-center justify-center items-center max-w-4xl mx-auto my-auto space-y-6 py-12">
        
        {/* Subtítulo / Badge Acadêmico-Cultural */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/20 backdrop-blur-md text-purple-200 text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Projeto Educacional e Cultural • Desde 2019</span>
        </div>

        {/* Título Principal */}
        <div className="space-y-3">
          <h1 className="font-zen text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight bg-gradient-to-r from-amber-100 via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            Viagem ao Céu Noturno
          </h1>
        </div>

        {/* Texto Poético / Missão */}
        <p className="font-quicksand text-base md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed px-4">
          Unindo ciência, arte e cultura alternativa através do telescópio, globo de plasma e astrofotografia. Nossa missão é{" "}
          <em className="text-amber-300 font-normal italic decoration-amber-400/40 underline underline-offset-4">
            plantar a semente do pertencimento
          </em>{" "}
          ao Cosmos em uma experiência sensorial de contemplação.
        </p>

        {/* Botões de Ação Refinados */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto font-quicksand">
          <button
            onClick={() => scrollToSection("contato")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e6ca65] hover:from-[#e6ca65] hover:to-[#f0d475] text-[#07040d] font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>CONECTAR COM O PROJETO</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => scrollToSection("sobre")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-amber-300/50 text-amber-100/90 font-medium text-sm tracking-wide transition-all duration-300 backdrop-blur-md flex items-center justify-center cursor-pointer"
          >
            ADENTRAR A VIVÊNCIA
          </button>
        </div>
      </div>

      {/* 5. Rodapé da Hero com Scroll Minimalista */}
      <div className="relative z-10 w-full max-w-7xl flex justify-between items-end border-b border-[#d4af37]/15 pb-3">
        <div className="text-[11px] font-mono text-slate-500 hidden md:block tracking-widest">
          [ CONTEMPLAÇÃO & REFLEXÃO ]
        </div>

        <div 
          className="flex flex-col items-center mx-auto md:mx-0 cursor-pointer group py-1" 
          onClick={() => scrollToSection("sobre")}
        >
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-amber-200/50 group-hover:text-amber-200 transition-colors mb-1">
            EXPLORAR
          </span>
          <ChevronDown className="animate-bounce text-amber-300/70 group-hover:text-amber-300 transition-colors" size={20} />
        </div>

        <div className="text-[11px] font-mono text-slate-500 hidden md:block text-right tracking-widest">
          UNIVERSO & PERTENCIMENTO
        </div>
      </div>
    </section>
  );
}