'use client';

import React from 'react';

const NewGame = ({ onStartNewGame }: { onStartNewGame: () => void }) => {
  return (
    <button
      className="w-full px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg lg:text-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl backdrop-blur-sm border-2 border-purple-400/50 hover:border-purple-300/70"
      onClick={onStartNewGame}
    >
      🎮 New Game
    </button>
  );
};

export default NewGame;
