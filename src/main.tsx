import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './pages/LandingPage/index.tsx'
import BlogPage from './pages/Blog/BlogPage.tsx' // Vamos criar este componente

function AppRouter() {
  const path = window.location.pathname;

  // Se a rota for /blog, renderiza a página do blog
  if (path === '/blog' || path === '/blog/') {
    return <BlogPage />;
  }

  // Caso contrário, exibe a Landing Page padrão
  return <LandingPage />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)