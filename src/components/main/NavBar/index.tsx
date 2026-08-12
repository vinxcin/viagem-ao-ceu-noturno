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
      <div className="w-full h-full max-w-7xl flex flex-row items-center justify-between mx-auto px-4 md:px-12">
        
        {/* Logo */}
        <a href="#home" className="group h-auto w-auto flex flex-row items-center">
          <img
            src={LOGO_NAV_BAR}
            alt="Logo NavBar"
            width={42}
            height={42}
            className="cursor-pointer transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Menu Center */}
        <div className="hidden md:flex flex-row items-center justify-between">
          <div className="flex items-center justify-center gap-8 h-auto border border-[#7042f861] bg-[#03001490] px-8 py-2.5 rounded-full text-gray-200 shadow-inner shadow-[#7042f820]">
            {NavBarItens.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-medium text-sm lg:text-base cursor-pointer transition-colors duration-200 hover:text-[#fd9a0c]"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop Social Icon */}
        <div className="hidden md:flex flex-row items-center gap-5">
          <a 
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#7042f861] bg-[#03001490] text-white hover:text-[#fd9a0c] hover:border-[#fd9a0c] transition-all duration-300" 
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
                className="text-gray-200 text-2xl font-medium hover:text-[#fd9a0c] transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}

            <div className="w-12 h-[1px] bg-[#7042f861] my-2" />

            {/* Instagram Link no Mobile */}
            <a 
              className="flex items-center gap-3 text-gray-200 text-lg hover:text-[#fd9a0c] transition-colors duration-300" 
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