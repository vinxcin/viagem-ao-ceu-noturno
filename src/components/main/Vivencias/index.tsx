'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VivenciasCards, astroPhotos } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';


import { 
 INTERVENSAO_ASTRO
} from '@/assets/img';

export default function Vivencias() {
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Estado para controlar o índice atual do carrossel de Astrofotografias
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev + 1) % astroPhotos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev === 0 ? astroPhotos.length - 1 : prev - 1));
  };

  return (
    <section
      id="vivencias"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 pt-28 pb-32 bg-[#030014] text-[#E2D9C8] overflow-hidden"
    >
      {/* Linha de topo com brilho cósmico */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-400 animate-glow" />

      {/* Orbes de fundo complementares (mesma identidade da Hero) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-[40vw] h-[40vw] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute bottom-1/4 -right-10 w-[45vw] h-[45vw] rounded-full bg-[#7a3bfc]/15 blur-[140px]" />
      </div>

      {/* Cabeçalho da Seção */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-16 space-y-4">
        <motion.h1
          className="title text-3xl sm:text-5xl md:text-6xl tracking-wide bg-gradient-to-r from-cyan-300 via-sky-100 to-purple-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Vivências Cósmicas
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Em constante expansão, o projeto ultrapassa as paredes da educação formal. Levamos a <span className="italic text-cyan-300 font-normal">Astronomia</span> para festivais, eventos e centros culturais, entrelaçando o <span className="font-semibold text-cyan-400">saber científico</span>, a <span className="font-semibold text-pink-400">expressão artística</span> e a energia da <span className="font-semibold text-amber-300">cultura alternativa</span> em uma vivência sensorial inesquecível sob o céu.
        </motion.p>
      </div>

      {/* Grid de Cards Estilizados */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {VivenciasCards.map((card, index) => {
          const Wrapper = isDesktop ? motion.div : 'div';
          const isFeatured = index === 1; // Intervenção na Pista ocupa 2 colunas no desktop

          return (
            <Wrapper
              key={index}
              className={`relative rounded-3xl p-[1px] overflow-hidden group ${
                isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
              {...(isDesktop && {
                variants: cardVariants,
                initial: 'hidden',
                whileInView: 'visible',
                transition: {
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: index * 0.1,
                },
                viewport: { once: true },
              })}
            >
              {/* Borda holográfica com gradiente dinâmico */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 via-purple-600/40 to-amber-500/40 rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-[#07040d]/80 backdrop-blur-xl rounded-3xl p-6 flex flex-col h-full z-10 border border-white/10 group-hover:border-cyan-500/40 transition-all duration-300 shadow-xl">
                
                {/* =========================================================
                    CARD 2: INTERVENÇÃO NA PISTA (VÍDEO EM LOOP)
                   ========================================================= */}
                {card.title.includes("Intervenção na Pista") ? (
                  <div className="relative overflow-hidden rounded-2xl mb-5 h-64 sm:h-72">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07040d] via-transparent to-transparent z-10 opacity-40 pointer-events-none" />
                    
                    <video
                      src={INTERVENSAO_ASTRO}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    />

                    {/* Badge superior no card */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider uppercase text-slate-200">
                      <card.icon className="w-4 h-4 text-amber-400" />
                      <span>{card.tag}</span>
                    </div>
                  </div>
                ) : 
                
                /* =========================================================
                    CARD 4: ASTROFOTOGRAFIAS (CARROSSEL DE IMAGENS + EXIF)
                   ========================================================= */
                card.title.includes("Astrofotografias") ? (
                  <div className="relative overflow-hidden rounded-2xl mb-5 h-64 sm:h-72 bg-black/40">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07040d] via-transparent to-transparent z-10 opacity-50 pointer-events-none" />
                    
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentPhotoIndex}
                        src={astroPhotos[currentPhotoIndex].url}
                        alt={`${card.title} - Foto ${currentPhotoIndex + 1}`}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover rounded-2xl filter brightness-90"
                      />
                    </AnimatePresence>

                    {/* Badge superior no card */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider uppercase text-slate-200">
                      <card.icon className="w-4 h-4 text-pink-400" />
                      <span>{card.tag}</span>
                    </div>

                    {/* Tag de EXIF / Dados Técnicos flutuante */}
                    <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300">
                      EXIF: {astroPhotos[currentPhotoIndex].exif}
                    </div>

                    {/* Botões de navegação do carrossel */}
                    <button
                      onClick={prevPhoto}
                      aria-label="Foto anterior"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-cyan-500/80 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={nextPhoto}
                      aria-label="Próxima foto"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-cyan-500/80 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Indicadores de pontos (dots) */}
                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded-full backdrop-blur-md">
                      {astroPhotos.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentPhotoIndex(i);
                          }}
                          aria-label={`Ir para foto ${i + 1}`}
                          className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                            currentPhotoIndex === i ? 'bg-cyan-400 w-3' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (

                /* =========================================================
                    DEMAIS CARDS (IMAGEM ESTÁTICA COMUM)
                   ========================================================= */
                  <div className="relative overflow-hidden rounded-2xl mb-5 h-64 sm:h-72">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07040d] via-transparent to-transparent z-10 opacity-60 pointer-events-none" />
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    />
                    
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider uppercase text-slate-200">
                      <card.icon className="w-4 h-4 text-cyan-400" />
                      <span>{card.tag}</span>
                    </div>
                  </div>
                )}

                {/* Conteúdo do Card (Texto) */}
                <div className="flex flex-col flex-grow space-y-2">
                  <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                    {card.subtitle}
                  </span>

                  <h3 className="text-xl title md:text-2xl text-white font-semibold tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light pt-1">
                    {card.description}
                  </p>
                </div>

              </div>
            </Wrapper>
          );
        })}
      </div>

      {/* Linha de base */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500 via-cyan-400 to-green-500 animate-glow" />
    </section>
  );
}