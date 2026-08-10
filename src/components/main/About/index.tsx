'use client';

import { Images } from '@/constants';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="sobre" className="relative h-full text-white py-40 text-center">
      
      {/* Imagens animadas de fundo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
            className="absolute w-52"
            style={{
              top: img.top,
              left: img.left,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl title mb-6"
        >
          Sobre o projeto
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-[120vw] px-6 sm:px-8 lg:max-w-[89vw] mx-auto text-gray-300"
        >
          <p className="text-base md:text-xl leading-relaxed md:px-11 lg:px-80">
            <span className="font-bold italic">Viagem ao Céu Noturno </span>
            é um projeto educacional que une ciência, arte, cultura alternativa e o olhar ancestral para o céu, oferecendo vivências astronômicas por meio de observações com telescópios e apresentações sobre temas como buracos negros, ciclo de vida das estrelas e curiosidades do Universo!✨
          </p>

          <p className="text-base md:text-xl leading-relaxed md:px-11 lg:px-80 pt-10">
            O projeto nasceu em 2019, ainda no início da graduação de seu idealizador, Vinicius Carvalho Rosa, como uma pesquisa educacional. Desde então, foram realizadas diversas atividades de observação do céu e apresentações sobre astronomia para estudantes de escolas públicas do litoral norte de São Paulo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
