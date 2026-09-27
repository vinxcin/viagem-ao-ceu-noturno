import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogPost } from "@/types";
import { getAllPosts } from "@/types";
import BackgroundStars from "@/pages/LandingPage/BackgroundStars";
import { LOGO_NAV_BAR } from "@/assets/img";
import { ArrowLeft, ArrowRight, Instagram, X } from "lucide-react";

export default function BlogPage() {
  const posts = getAllPosts();
  const postPathPrefix = "/blog-astral-";
  const pathname = window.location.pathname.replace(/\/+$/, "");
  const requestedSlug = pathname.startsWith(postPathPrefix)
    ? decodeURIComponent(pathname.slice(postPathPrefix.length))
    : null;
  const initialPost = posts.find((post) => post.slug === requestedSlug) ?? null;
  const [selectedPost] = useState<BlogPost | null>(initialPost);

  const returnToBlog = () => {
    window.history.pushState({}, "", "/blog-astral");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#05030f] text-slate-100 selection:bg-cyan-300/30">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(91,33,182,0.24),transparent_55%),radial-gradient(ellipse_at_100%_60%,rgba(8,145,178,0.1),transparent_40%)]" />
      <BackgroundStars />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.08] bg-[#070513]/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
          <a href="/" className="group inline-flex min-w-0 items-center gap-2 text-sm text-slate-300 transition hover:text-white">
            <img src={LOGO_NAV_BAR} alt="" width={34} height={34} className="shrink-0 transition-transform group-hover:scale-105" />
            <span className="hidden sm:inline">Voltar ao início</span>
            <span className="sm:hidden">Início</span>
          </a>
          <span className="min-w-0 truncate text-center text-sm font-bold tracking-wide text-transparent bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text sm:text-base">
            Blog Astral
          </span>
          <a className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-pink-300/50 hover:bg-pink-400/10 hover:text-pink-300" href="https://www.instagram.com/viagemaoceunoturno/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={18} />
          </a>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-10">
        <section className="mb-10 max-w-3xl sm:mb-14">
          <a href="/" className="mb-5 inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-100">
            <ArrowLeft size={16} /> Voltar para a página principal
          </a>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-violet-300/80">Caderno de observação</p>
          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Explorações e saberes <span className="text-transparent bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text">cósmicos</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Um espaço dedicado para à disseminação do conhecimento, expandir o olhar e despertar nossa conexão com o universo.
          </p>
        </section>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-6 py-16 text-center shadow-2xl shadow-black/20 sm:py-20">
            <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl border border-violet-300/20 bg-violet-300/[0.08] text-2xl text-violet-200" aria-hidden="true">✦</div>
            <h2 className="text-lg font-semibold text-slate-100">Novas descobertas a caminho</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">O observatório está calibrando as lentes. Em breve, você encontrará o primeiro artigo por aqui.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {posts.map((post) => (
              <article key={post.slug} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0918]/85 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:shadow-cyan-950/20">
                {post.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0918]/60 to-transparent" />
                  </div>
                ) : (
                  <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-gradient-to-br from-violet-950/70 via-[#111027] to-cyan-950/50">
                    <div className="absolute size-40 rounded-full bg-violet-500/10 blur-3xl" />
                    <span className="relative text-4xl text-cyan-100/60" aria-hidden="true">✦</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <time className="text-xs font-medium text-cyan-300/90">{post.date}</time>
                  <h2 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-slate-100 sm:text-xl">{post.title}</h2>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">{post.description}</p>
                  <a href={`/blog-astral-${encodeURIComponent(post.slug)}`} onClick={(event) => { event.preventDefault(); window.history.pushState({}, "", event.currentTarget.href); window.dispatchEvent(new PopStateEvent("popstate")); }} className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/[0.06] px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-200/35 hover:bg-cyan-200/[0.12]">
                    Ler matéria <ArrowRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) returnToBlog(); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="article-title" className="relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-white/10 bg-[#090714] p-5 shadow-2xl shadow-black/60 sm:max-h-[88vh] sm:max-w-3xl sm:rounded-3xl sm:p-8 md:p-10">
            <a href="/blog-astral" onClick={(event) => { event.preventDefault(); returnToBlog(); }} className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-slate-300 transition hover:bg-white/10 hover:text-white sm:right-6 sm:top-6" aria-label="Fechar artigo">
              <X size={18} />
            </a>
            <div className="pr-10 sm:pr-12">
              <p className="text-xs font-medium text-cyan-300">{selectedPost.date} <span className="px-1 text-slate-600">·</span> {selectedPost.author}</p>
              <h2 id="article-title" className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">{selectedPost.title}</h2>
            </div>
            {selectedPost.image && <img src={selectedPost.image} alt={selectedPost.title} className="mt-6 max-h-72 w-full rounded-2xl object-cover" />}
            <article className="mt-6 max-w-none break-words border-t border-white/[0.08] pt-6 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => <h2 className="mb-3 mt-8 text-xl font-semibold text-white sm:text-2xl">{children}</h2>,
                  h3: ({ children }) => <h3 className="mb-2 mt-6 text-lg font-semibold text-white">{children}</h3>,
                  p: ({ children }) => <p className="mb-5">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                  ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6">{children}</ol>,
                  blockquote: ({ children }) => <blockquote className="mb-5 border-l-2 border-violet-300/50 pl-4 italic text-slate-300">{children}</blockquote>,
                  a: ({ href, children, ...props }) => (
                    <a className="text-cyan-300 underline underline-offset-4 hover:text-cyan-100" href={href} target="_blank" rel="noopener noreferrer" {...props}>
                      {children}
                    </a>
                  ),
                  img: ({ src, alt, ...props }) => src ? (
                    <img className="mx-auto my-6 max-h-[32rem] rounded-2xl object-contain" src={src} alt={alt ?? "Imagem do artigo"} loading="lazy" {...props} />
                  ) : null,
                }}
              >
                {selectedPost.content.replace(/\\n/g, "\n")}
              </ReactMarkdown>
            </article>
            <div className="mt-9 rounded-2xl border border-violet-200/10 bg-gradient-to-br from-violet-500/[0.12] to-cyan-500/[0.08] p-5 text-center sm:p-7">
              <h3 className="text-lg font-semibold text-white">Gostou da conteúdo?</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-300">Venha vivenciar nossas observações astronômicas itinerantes.</p>
              <a href="/#vivencias" className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110">Conhecer o projeto</a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
