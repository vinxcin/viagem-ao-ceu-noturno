import { lazy, Suspense } from "react";
// import { useInView } from "react-intersection-observer";
import NavBar from "./NavBar";
import Hero from "./Hero";
// import BackgroundMedia from "./BackgroundMedia";
import BackgroundStars from "./BackgroundStars";

// Componentes abaixo da dobra carregados sob demanda (Lazy Loading)
const About = lazy(() => import("./About"));
const Experiences = lazy(() => import("./Vivencias"));
const Knowledges = lazy(() => import("./Knowledges"));
const Contact = lazy(() => import("./Footer"));

export default function LandingPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-0" />
      
      <BackgroundStars />

      <NavBar />

      <main className="relative z-10 pt-[65px]">
        <section>
          <Hero />
        </section>

        <Suspense 
          fallback={
            <div className="w-full py-20 flex items-center justify-center text-white/50 text-sm tracking-widest animate-pulse">
              CARREGANDO...
            </div>
          }
        >
          <About />
          <Experiences />
          <Knowledges />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}