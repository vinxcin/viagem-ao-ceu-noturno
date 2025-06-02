import { useState } from 'react';
import { Socials, NavBarItens } from "@/constants"
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LOGO_NAV_BAR } from "@/assets/images";

export default function NavBar() {
    const [menuOpened, setMenuOpened] = useState(false);
    const toggleMenu = () => setMenuOpened(!menuOpened);
    const closeMenu = () => setMenuOpened(false);

    return (
            <nav className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 ">
                <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[25px]">
                    <a
                        href=""
                        className="h-auto w-auto flex flex-row items-center"
                    >
                        <img
                            src={LOGO_NAV_BAR}
                            alt="LOGO_NAV_BAR"
                            width={40}
                            height={40}
                            className="cursor-pointer hover:animate-pulseGlow transition-transform"
                        />

                    </a>

                    <div className="hidden md:flex w-[600px] h-full  flex-row items-center justify-between ">
                        <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#03001490] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
                            {NavBarItens.map((item) => (
                                <a href={item.id} className="cursor-pointer hover:text-[#fd9a0c]">
                                    {item.name}
                                </a>
                            ))}

                        </div>
                    </div>

                    <div className="hidden md:flex flex-row gap-5">
                        {Socials.map(({ name, Icon, src }, index) => (
                            <a key={index} href={src} target="_blank" rel="noreferrer">
                                <Icon className="cursor-pointer text-white hover:text-[#7042f8f4] h-10" aria-label={name} />
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-300 z-50"
                        aria-label="Menu"
                    >
                        {menuOpened ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Menu Mobile com framer-motion */}
                <AnimatePresence>
                    {menuOpened && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden flex flex-col items-center gap-16 h-[100vh] pt-20 bg-[#09031d] shadow-inner shadow-[#4d1dab]/50"
                        >
                            {NavBarItens.map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.id}`}
                                    onClick={closeMenu}
                                    className="text-gray-200 hover:text-purple-400 transition-all duration-300"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
        </nav>
    );
}
