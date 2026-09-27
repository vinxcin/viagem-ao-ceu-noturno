import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./pages/LandingPage/index.tsx";
import BlogPage from "./pages/Blog/BlogPage.tsx";

function AppRouter() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/+$/, "") || "/");

  useEffect(() => {
    const updatePath = () => setPath(window.location.pathname.replace(/\/+$/, "") || "/");
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  const isBlogIndex = path === "/blog-astral";
  const isBlogArticle = /^\/blog-astral-[^/]+$/.test(path);

  if (isBlogIndex || isBlogArticle) {
    return <BlogPage key={path} />;
  }

  return <LandingPage />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
