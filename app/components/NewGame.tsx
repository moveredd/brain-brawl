`use client`;

import React from "react";

type NewGameProps = {
  onStartNewGame: () => void;
};

const NewGame = ({ onStartNewGame }: NewGameProps) => {
  return (
    <button
      type="button"
      onClick={onStartNewGame}
      className="focus-ring w-full rounded-2xl border border-purple-500/50 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white cursor-pointer transition-transform hover:-translate-y-0.5 md:px-8 md:py-4 lg:px-10 lg:py-5 lg:text-base"
    >
      🎮 New game
    </button>
  );
};

export default NewGame;


