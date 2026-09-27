import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './pages/LandingPage/index.tsx'
import BlogPage from './pages/Blog/BlogPage.tsx' 

function AppRouter() {
  const path = window.location.pathname;

  // Se a rota for /blog-astral, renderiza a página do blog
  if (path === '/blog-astral' || path === '/blog-astral/') {
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