import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import { motion } from 'framer-motion';

import { KnowledgesCard } from '@/types';
import { Award, Atom, ArrowRight, BookOpen } from 'lucide-react';


export default function Knowledges() {
  return (
    <section
      id="saberes"
      className="w-full  px-3 md:px-6 py-32 flex flex-col items-center gap-12"
    >
      <div className="w-full max-w-6xl text-center px-4 py-12 relative bg-[#35385252] rounded-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white title text-2xl md:text-4xl font-bold mb-4"
        >
          Saberes Estelares
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 max-w-3xl mx-auto mb-10 text-base md:text-lg"
        >
          Nesta seção, reunimos experiências vividas, artigos publicados e
          formações que fortalecem nossa trajetória com a Astronomia e a
          Educação.
        </motion.p>

        <p className="flex items-center justify-center mb-4 gap-2 text-sm text-cyan-600 italic">
          Deslize para o lado <ArrowRight className="w-4 h-4  animate-bounce-x" /> ou aguarde o próximo card
        </p>

        {/* Swiper Carrossel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {KnowledgesCard.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-xl p-[2px] overflow-hidden group h-full hover:cursor-pointer"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0" />

                <div className="relative z-10 bg-[#0e0a1e]/90 backdrop-blur-md rounded-xl p-4 shadow-md shadow-purple-500/25 border border-purple-900/40 flex flex-col items-start h-full min-h-[414px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-40 object-contain rounded-xl bg-[#1a1127] mb-3"
                  />

                  <h4 className="text-purple-100 title text-sm mb-1 leading-tight font-semibold">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-auto flex gap-6 md:gap-10 text-left w-full">
                    {item.articleLink && (
                      <a
                        href={item.articleLink}
                        className="flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-100 transition"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <BookOpen size={16} /> Ler artigo
                      </a>
                    )}
                    {item.institutionalLink && (
                      <a
                        href={item.institutionalLink}
                        className="flex items-center gap-2 text-sm text-yellow-300 hover:text-yellow-100 transition"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Atom size={16} /> Saiba mais
                      </a>
                    )}
                    {item.certificateLink && (
                      <a
                        href={item.certificateLink}
                        className="flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-100 transition"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Award size={16} /> Ver certificado
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
}
