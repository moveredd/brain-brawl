import Header from "./components/Header";
import Footer from "./components/Footer";
import TriviaGame from "./components/TriviaGame";
import { Bungee } from "next/font/google";

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
  display: "swap",
});

const TriviaPage = () => {
  return (
    <main className={`${bungee.variable} flex min-h-screen flex-col`}>
      <Header />

      <div className="flex flex-1 items-start justify-center px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-start">
          <section className="glass-panel order-2 flex flex-col px-6 py-5 sm:px-8 sm:py-6 lg:order-1 lg:max-w-md">
            <p className="pill-badge mb-3 bg-purple-500/10 text-purple-200/90 ring-1 ring-purple-500/40">
              Solo arena
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
              Welcome to{" "}
              <span
                className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-100 bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-bungee)" }}
              >
                Brain Brawl
              </span>

            </h1>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              A fast-paced trivia arena where you race through curated
              questions, tune the difficulty, and chase a higher score every
              run. No signups, no fluff—just you versus your brain.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-200/90 sm:text-sm">
              <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-slate-800/80">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Dynamic difficulty
                </p>
                <p className="mt-1 text-[13px] text-slate-300">
                  Swap between easy warmups and brutal brain-benders on the
                  fly, without leaving the game.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-slate-800/80">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Smart categories
                </p>
                <p className="mt-1 text-[13px] text-slate-300">
                  Lock in topics like computers, history, or sports to train
                  exactly the knowledge you care about.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-slate-800/80">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Session streak
                </p>
                <p className="mt-1 text-[13px] text-slate-300">
                  Play short bursts of 5–15 questions and try to beat your
                  accuracy every session.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-slate-800/80">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Built for focus
                </p>
                <p className="mt-1 text-[13px] text-slate-300">
                  Minimal chrome, high contrast, and just enough glow to feel
                  like a tiny game console in your browser.
                </p>
              </div>
            </div>
          </section>

          <section className="order-1 flex items-start lg:order-2 lg:flex-1">
            <TriviaGame />
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default TriviaPage;
