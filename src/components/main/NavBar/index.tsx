import { useState } from "react";
import { NavBarItens } from "@/types";
import { Menu, X, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LOGO_NAV_BAR } from "@/assets/img";

export default function NavBar() {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const closeMenu = () => setMenuOpened(false);

  return (
    <nav className="w-full h-[70px] fixed top-0 shadow-lg shadow-[#2A0E61]/40 bg-[#03001420] backdrop-blur-md z-50 transition-all duration-300">
      {/* Container Full Width com padding responsivo para empurrar às bordas */}
      <div className="w-full h-full flex flex-row items-center justify-between px-6 md:px-10 lg:px-16 2xl:px-24">
        
        {/* ESQUERDA: Logo (flex-1 empurra o restante, justify-start alinha à esquerda) */}
        <div className="flex-1 flex justify-start">
          <a href="#home" className="group h-auto w-auto flex flex-row items-center">
            <img
              src={LOGO_NAV_BAR}
              alt="Logo NavBar"
              width={42}
              height={42}
              className="cursor-pointer transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </div>

        {/* CENTRO: Menu Desktop (flex-none mantém o tamanho exato e fica centralizado) */}
        <div className="hidden md:flex flex-none flex-row items-center justify-center">
          <div className="flex items-center justify-center gap-8 h-auto border border-[#7042f861] bg-[#03001490] px-8 py-2.5 rounded-full text-gray-200 shadow-inner shadow-[#7042f820]">
            {NavBarItens.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-medium text-sm lg:text-base cursor-pointer transition-colors duration-200 hover:text-cyan-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* DIREITA: Social Icon & Menu Mobile (flex-1 e justify-end jogam tudo para a ponta direita) */}
        <div className="flex-1 flex justify-end items-center">
          
          {/* Desktop Social Icon */}
          <div className="hidden md:flex flex-row items-center">
            <a 
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#7042f861] bg-[#03001490] text-white hover:text-pink-400 hover:border-pink-400 transition-all duration-300 shadow-[0_0_10px_rgba(112,66,248,0.2)] hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]" 
              href="https://www.instagram.com/viagemaoceunoturno/" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-white transition-colors z-50 p-1"
            aria-label="Menu"
            aria-expanded={menuOpened}
            aria-controls="mobile-menu"
          >
            {menuOpened ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpened && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 top-[70px] flex flex-col items-center justify-center gap-8 h-[calc(100vh-70px)] bg-[#030014f8] backdrop-blur-xl z-40 px-6 pb-12"
          >
            {NavBarItens.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                className="text-gray-200 text-2xl font-medium hover:text-cyan-400 transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}

            <div className="w-12 h-[1px] bg-[#7042f861] my-2" />

            {/* Instagram Link no Mobile */}
            <a 
              className="flex items-center gap-3 text-gray-200 text-lg hover:text-pink-400 transition-colors duration-300" 
              href="https://www.instagram.com/viagemaoceunoturno/" 
              target="_blank" 
              rel="noreferrer"
              onClick={closeMenu}
            >
              <Instagram size={22} />
              <span>Instagram</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}