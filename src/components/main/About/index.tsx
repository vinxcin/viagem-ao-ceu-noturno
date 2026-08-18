'use client';

import { Images } from '@/types';
import { motion } from 'framer-motion';

type Props = {
  onVisibilityChange?: (isVisible: boolean) => void;
};

export default function About({ onVisibilityChange }: Props) {
  return (
    <section 
      id="sobre" 
      className="relative h-full text-white py-32 md:py-40 text-center overflow-hidden"
    >
      
      {/* Imagens animadas de fundo (Constelações e Rupestre) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Images.map((img, i) => (
          <motion.img
            key={i}
            src={img.src}
            alt={img.name}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.35, y: 0 }}
            transition={{ delay: i * 0.2, duration: 1 }}
            className="absolute w-40 sm:w-52"
            style={{
              top: img.top,
              left: img.left,
            }}
          />
        ))}
      </div>

      {/* Container principal com trigger de visibilidade para o Buraco Negro */}
      <motion.div 
        className="relative z-10"
        onViewportEnter={() => onVisibilityChange && onVisibilityChange(true)}
        onViewportLeave={() => onVisibilityChange && onVisibilityChange(false)}
        viewport={{ amount: 0.3 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl title mb-8 bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300 bg-clip-text text-transparent"
        >
          Sobre o Projeto
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-full px-6 sm:px-8 lg:max-w-[85vw] mx-auto text-gray-300 space-y-8 md:space-y-10"
        >
          <p className="text-sm sm:text-base md:text-lg leading-relaxed md:px-11 lg:px-64 font-light">
            <span className="font-bold italic text-cyan-300">Viagem ao Céu Noturno </span> 
            é projeto educacional itinerante que une ciência, arte e cultura alternativa, sob uma perspectiva ancestral do cosmos. Através de observações astronômicas com telescópio, exibições de astrofotografias autorais e materiais interativos como o globo de plasma, criamos um espaço onde o saber científico e a sensibilidade do ser se encontram!
          </p>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed md:px-11 lg:px-64 font-light">
            Nosso propósito é <strong className="text-amber-300 font-normal underline decoration-amber-400/50 underline-offset-4">plantar a semente do senso de pertencimento ao Cosmos</strong>. Buscamos proporcionar uma experiência sensorial única, com uma ambientação intimista que convida cada participante a desacelerar, contemplar e refletir sobre o nosso lugar entre as estrelas.
          </p>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed md:px-11 lg:px-64 font-light">
            O projeto nasceu em 2019, no início da graduação de seu idealizador, Vinicius Carvalho Rosa, como uma pesquisa educacional. Desde então, tem levado essa jornada para alunos de escolas públicas, eventos e espaços culturais ao redor do Brasil.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}