import React from "react";

const Header = () => {
  return (
    <header className="relative z-40 w-full border-b border-purple-500/15">
      <nav className="mx-auto flex min-h-20 max-w-6xl items-center justify-between px-4 py-3 md:min-h-24 md:px-6 lg:px-8">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-700 shadow-[0_0_40px_rgba(147,51,234,0.6)] md:h-12 md:w-12">
            <span className="text-2xl md:text-3xl" aria-hidden>
              🧠
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200 bg-clip-text text-xl font-semibold tracking-tight text-transparent sm:text-2xl md:text-3xl">
              Brain Brawl
            </h1>
            <p className="text-[11px] text-slate-400/80 sm:text-xs md:text-[13px]">
              Real-time trivia. Sharpen your mind in minutes.
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 text-[11px] text-slate-400/80 sm:flex sm:text-xs">
          <span className="pill-badge bg-purple-500/10 text-purple-200/90 ring-1 ring-purple-500/40">
            Live
          </span>
          <span className="pill-badge bg-slate-800/60 text-slate-200/90 ring-1 ring-slate-600/70">
            No signup
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
