import React from "react";
import Link from "next/link";
import Github from "@/app/assets/Github";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-slate-800/80 bg-slate-950/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 text-xs text-slate-500/80 sm:flex-row sm:items-center sm:justify-between sm:text-[13px] md:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-slate-400/90">
          <span className="mr-1 text-base text-purple-400/90">◎</span>
          <span>
            © {year} <span className="font-medium text-slate-100">Brain Brawl</span>.{" "}
            Intelligence, on demand.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-[11px] uppercase tracking-wide text-slate-500/90 sm:inline">
            Open Source
          </span>
          <Link
            href="https://github.com/moveredd/brain-brawl"
            target="_blank"
            rel="noopener noreferrer"
            className="group focus-ring inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-slate-900/70 px-4 py-2 text-[11px] font-medium text-slate-100 transition-all hover:-translate-y-0.5 hover:border-purple-400/70 hover:bg-slate-900/90 hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] sm:text-xs"
          >
            <Github />
            <span>Star on GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
