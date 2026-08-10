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
    <AnimatePresence mode="wait">
      {isVisible && (
        isMobile ? (
          <motion.img
            key="img"
            src={BG_BLACK_HOLE}
            className="fixed rotate-180 top-0 left-0 w-full h-full object-cover z-[-1] translate-y-[-28.7vh] sm:translate-y-[-29vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        ) : (
          <motion.video
            key="video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="fixed rotate-180 top-0 left-0 w-full h-full object-cover z-[-1] translate-y-[-43vh] lg:translate-y-[-40vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <source src="/videos/blackhole.webm" type="video/webm" />
            Seu navegador não suporta vídeos em background.
          </motion.video>
        )
      )}
    </AnimatePresence>
  );
}
