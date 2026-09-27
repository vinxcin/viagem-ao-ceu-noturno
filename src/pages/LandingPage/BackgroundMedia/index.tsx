import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BG_BLACK_HOLE } from "@/assets/img";

type Props = {
  isVisible: boolean;
};

export default function BackgroundMedia({ isVisible }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-[#030014]/70 backdrop-blur-[8px]">
          {isMobile ? (
            <motion.img
              key="img-bh"
              src={BG_BLACK_HOLE}
              className="w-full h-full object-cover opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          ) : (
            <motion.video
              key="video-bh"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-90 filter brightness-95"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              onError={(e) => console.error("Erro ao carregar o vídeo do buraco negro:", e)}
            >

              {/* Teste alterando para o caminho exato onde o arquivo está na sua pasta public */}
              <source src="/videos/blackhole.webm" type="video/webm" />
              Seu navegador não suporta vídeos em background.
            </motion.video>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}