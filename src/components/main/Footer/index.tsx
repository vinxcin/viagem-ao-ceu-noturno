import { Instagram, Mail, Phone, Rocket, Sparkles } from 'lucide-react';
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contato" className="bg-[#050111] text-white pt-8 mt-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* PROJETO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="title text-xl mb-4 text-amber-50">Projeto</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong>Viagem ao Céu Noturno</strong><br />
            Educação, arte e cultura alternativa<br />
            Desde 2019 🌌
          </p>
        </motion.div>

        {/* REDES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="title text-xl mb-4 text-amber-50">Redes e Contato</h3>
          <ul className="text-sm text-gray-300 leading-relaxed space-y-2">
            <li className="flex items-center justify-center md:justify-start gap-2 hover:text-cyan-300 transition">
              <Instagram size={20} />
              <a
                href="https://instagram.com/viagemaoceunoturno"
                target="_blank"
                rel="noopener noreferrer"
              >
                @viagemaoceunoturno
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2 hover:text-cyan-300 transition">
              <Mail size={20} />
              <a href="mailto:contato@ceunoturno.com">contato@ceunoturno.com</a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2 hover:text-cyan-300 transition">
              <Phone size={20} />
              <a
                href="https://wa.me/5519996392885"
                target="_blank"
                rel="noopener noreferrer"
              >
                (19) 99639-2885
              </a>
            </li>
          </ul>
        </motion.div>

        {/* CRÉDITOS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="title text-xl mb-4 text-amber-50">Créditos</h3>
          <ul className="text-sm text-gray-300 leading-relaxed space-y-2">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Sparkles size={20} />
              Equipe: <strong>Vinicius Rosa e Leticia Holanda</strong>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Rocket size={20} />
              Dev interestelar: <strong>Vini</strong>
            </li>
            <li className="text-center md:text-left italic">
              🌠 Colabore com a jornada!
            </li>
          </ul>
        </motion.div>
      </div>

      {/* LINHA + COPYRIGHT */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-4 pb-2 text-center text-[12px] md:text-sm text-gray-400"
      >
        <div className="relative mb-2 top-0 left-0 w-full h-[0.8px] bg-gray-700" />
        ©2026 Viagem ao Céu Noturno • Feito com 💜 sob as estrelas
      </motion.footer>
    </footer>
  );
}
