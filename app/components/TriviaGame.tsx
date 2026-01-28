'use client';

import React, { useEffect, useMemo, useState, useCallback, startTransition } from "react";
import NewGame from "@/app/components/NewGame";

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
};

type GameState = {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  showResult: boolean;
  isCorrect: boolean | null;
  isLoading: boolean;
  error: string | null;
};

type GameOptions = {
  amount?: number;
  difficulty?: string;
  category?: string;
};

type GameControlsProps = {
  onApply: (options: GameOptions) => void;
};

const decodeHtml = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.documentElement.textContent ?? html;
};

const INITIAL_STATE: GameState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  selectedAnswer: null,
  showResult: false,
  isCorrect: null,
  isLoading: false,
  error: null,
};

const GameControls: React.FC<GameControlsProps> = ({ onApply }) => {
  const [amount, setAmount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [category, setCategory] = useState<string>("9");

  const handleApply = () => {
    onApply({ amount, difficulty, category });
  };

  return (
    <div className="glass-panel flex flex-col gap-3 px-5 py-5 text-xs text-slate-200/90 sm:text-[13px]">
      <h3 className="text-sm font-semibold tracking-tight text-slate-100">
        Game controls
      </h3>

      <p className="text-[11px] text-slate-400 sm:text-xs">
        Tune your brawl before you start: change difficulty, topic, and number
        of questions, then launch a fresh game.
      </p>

      <div className="mt-1 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Difficulty
          </span>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="focus-ring rounded-xl border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Questions
          </span>
          <select
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="focus-ring rounded-xl border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>

        <label className="col-span-2 flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Category
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="focus-ring rounded-xl border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100"
          >
            <option value="9">General Knowledge</option>
            <option value="18">Science: Computers</option>
            <option value="23">History</option>
            <option value="21">Sports</option>
            <option value="17">Science & Nature</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={handleApply}
        className="focus-ring mt-1 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2.5 text-xs font-semibold text-white cursor-pointer transition-transform hover:-translate-y-0.5"
      >
        🔁 New game with these settings
      </button>
    </div>
  );
};

export default function TriviaGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  const currentQuestion =
    gameState.questions[gameState.currentQuestionIndex] ?? null;

  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    const answers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    return answers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => item.value);
  }, [currentQuestion]);

  const fetchQuestions = useCallback(async (options?: GameOptions) => {
    const amount = options?.amount ?? 10;
    const difficulty = options?.difficulty ?? "medium";
    const category = options?.category ?? "9";

    setGameState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const params = new URLSearchParams({
        amount: String(amount),
        difficulty,
        category,
        type: "multiple",
      });

      const response = await fetch(`/api/questions?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();

      if (data.response_code !== 0 || !data.results) {
        throw new Error("No questions available");
      }

      startTransition(() => {
        setGameState({
          ...INITIAL_STATE,
          questions: data.results,
          isLoading: false,
        });
      });
    } catch (err) {
      setGameState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to load questions",
      }));
    }
  }, []);

  useEffect(() => {
    void fetchQuestions();
  }, [fetchQuestions]);

  const handleAnswerSelect = (answer: string) => {
    if (!currentQuestion || gameState.showResult) return;

    const isCorrect = answer === currentQuestion.correct_answer;

    setGameState((prev) => ({
      ...prev,
      selectedAnswer: answer,
      showResult: true,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const handleNextQuestion = () => {
    setGameState((prev) => {
      const atLastQuestion =
        prev.currentQuestionIndex >= prev.questions.length - 1;

      if (atLastQuestion) {
        return {
          ...prev,
          currentQuestionIndex: prev.questions.length,
          selectedAnswer: null,
          showResult: false,
          isCorrect: null,
        };
      }

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        showResult: false,
        isCorrect: null,
      };
    });
  };

  const handleNewGame = () => {
    void fetchQuestions();
  };

  if (gameState.isLoading) {
    return (
      <section
        aria-label="Loading questions"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <div className="glass-panel flex flex-col items-center gap-4 px-10 py-8 text-center sm:px-12">
          <div className="relative">
            <div className="h-14 w-14 animate-spin rounded-full border-2 border-purple-500/60 border-t-transparent sm:h-16 sm:w-16" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-md" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-100 sm:text-base">
              Fetching fresh questions…
            </p>
            <p className="mt-1 text-xs text-slate-400 sm:text-[13px]">
              Talking to the trivia oracle. This usually takes just a second.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (gameState.error) {
    return (
      <section
        aria-label="Question load error"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <div className="glass-panel mx-4 max-w-md space-y-4 px-8 py-7 text-center sm:px-10">
          <p className="text-sm font-semibold text-red-300 sm:text-base">
            {gameState.error}
          </p>
          <p className="text-xs text-slate-400 sm:text-[13px]">
            The trivia API is having a moment. Try again in a second.
          </p>
          <button
            type="button"
            onClick={handleNewGame}
            className="focus-ring mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold text-white transition-transform hover:translate-y-0.5 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (gameState.questions.length === 0) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="glass-panel mx-4 flex max-w-md flex-col items-center gap-5 px-8 py-8 text-center sm:px-10">
          <p className="pill-badge bg-purple-500/10 text-purple-200/90 ring-1 ring-purple-500/40">
            New session
          </p>
          <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
            Ready to brawl with your brain?
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">
            You’ll get a quick set of questions. Answer as fast and accurately
            as you can. Your score and accuracy are tracked for this run.
          </p>
          <button
            type="button"
            onClick={handleNewGame}
            className="focus-ring mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Start game
          </button>
        </div>
      </section>
    );
  }

  if (gameState.currentQuestionIndex >= gameState.questions.length) {
    const percentage = Math.round(
      (gameState.score / gameState.questions.length) * 100
    );

    return (
      <section className="flex min-h-[60vh] items-center justify-center py-8">
        <div className="glass-panel mx-4 flex max-w-lg flex-col items-center gap-5 px-8 py-9 text-center sm:px-10">
          <div className="text-5xl sm:text-6xl" aria-hidden>
            🎉
          </div>
          <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
            Game complete!
          </h2>
          <div className="space-y-2">
            <p className="text-sm text-slate-300 sm:text-base">
              Score:{" "}
              <span className="font-semibold text-purple-300">
                {gameState.score}
              </span>{" "}
              / {gameState.questions.length}
            </p>
            <p className="text-sm text-slate-400 sm:text-base">
              Accuracy:{" "}
              <span className="font-semibold text-pink-300">
                {percentage}%
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleNewGame}
            className="focus-ring mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(236,72,153,0.7)] transition-transform hover:-translate-y-0.5"
          >
            Play again
          </button>
        </div>
      </section>
    );
  }

  const progress =
    ((gameState.currentQuestionIndex + 1) / gameState.questions.length) * 100;

  return (
    <section className="flex w-full items-start justify-center py-4 md:py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 md:px-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 sm:text-sm">
            <span>
              Question {gameState.currentQuestionIndex + 1} of{" "}
              {gameState.questions.length}
            </span>
            <span className="font-medium text-purple-300">
              Score: {gameState.score}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 transition-all duration-400 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-3">
          <div className="glass-panel flex flex-col px-6 py-6 sm:px-8 sm:py-7">
            <div className="mb-5 flex items-center justify-between">
              <span className="pill-badge bg-purple-500/10 text-purple-200/90 ring-1 ring-purple-500/40">
                {currentQuestion?.category}
              </span>
              <span className="pill-badge bg-slate-800/80 text-slate-200/90 ring-1 ring-slate-600/80">
                {currentQuestion?.difficulty}
              </span>
            </div>

            <h2 className="mb-5 text-lg font-semibold leading-relaxed text-slate-50 sm:text-xl">
              {currentQuestion ? decodeHtml(currentQuestion.question) : ""}
            </h2>

            <div className="grid flex-shrink-0 grid-cols-1 gap-3 sm:grid-cols-2">
              {shuffledAnswers.map((answer, index) => {
                const isSelected = gameState.selectedAnswer === answer;
                const isCorrect = answer === currentQuestion?.correct_answer;
                const showCorrect = gameState.showResult && isCorrect;
                const showIncorrect =
                  gameState.showResult && isSelected && !isCorrect;

                let buttonClass =
                  "focus-ring p-4 rounded-2xl text-left text-sm sm:text-[15px] font-medium transition-transform";

                if (gameState.showResult) {
                  if (showCorrect) {
                    buttonClass +=
                      " bg-emerald-500/20 border border-emerald-400/80 text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.4)]";
                  } else if (showIncorrect) {
                    buttonClass +=
                      " bg-red-500/15 border border-red-400/80 text-red-100 shadow-[0_0_30px_rgba(248,113,113,0.35)]";
                  } else {
                    buttonClass +=
                      " bg-slate-900/70 border border-slate-700/80 text-slate-400/90 opacity-70";
                  }
                } else {
                  buttonClass +=
                    " bg-slate-900/80 border border-slate-700/80 text-slate-100 hover:-translate-y-0.5 hover:border-purple-400/70 hover:bg-slate-900";
                }

                return (
                  <button
                    key={answer}
                    type="button"
                    onClick={() => handleAnswerSelect(answer)}
                    disabled={gameState.showResult}
                    className={buttonClass}
                  >
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-800/90 text-xs font-semibold text-slate-200">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="break-words">
                        {decodeHtml(answer)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-4">
              {gameState.showResult && (
                <div className="space-y-4">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm sm:text-[15px] ${
                      gameState.isCorrect
                        ? "bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-400/70"
                        : "bg-red-500/15 text-red-100 ring-1 ring-red-400/70"
                    }`}
                  >
                    {gameState.isCorrect ? (
                      <span>✓ Correct!</span>
                    ) : (
                      <span>
                        ✗ Incorrect. The correct answer was{" "}
                        <span className="font-semibold">
                          {currentQuestion
                            ? decodeHtml(currentQuestion.correct_answer)
                            : null}
                        </span>
                        .
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white cursor-pointer transition-transform hover:-translate-y-0.5"
                  >
                    {gameState.currentQuestionIndex <
                    gameState.questions.length - 1
                      ? "Next question"
                      : "Finish game"}
                  </button>
                </div>
              )}

              <GameControls onApply={fetchQuestions} />
              <NewGame onStartNewGame={handleNewGame} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


