'use client';

import React, { useState } from 'react';
import { Bebas_Neue } from 'next/font/google';

const BFont = Bebas_Neue({ subsets: ['latin'], weight: '400' });

interface NewGameProps {
  onStartNewGame?: () => void;
}

const NewGame = ({ onStartNewGame }: NewGameProps) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0);

  const handleStartNewGame = () => {
    setReloadFlag(prev => prev + 1);
    setGameStarted(true);
    onStartNewGame?.(); // Optional callback to parent component
  };

  const handleRestart = () => {
    setReloadFlag(0);
    setGameStarted(false);
    onStartNewGame?.(); // Trigger parent restart if provided
  };

  const buttonStyle = "px-10 py-6 rounded-full shadow-lg text-4xl transition-all duration-200 font-bold uppercase tracking-wide";

  return (
    <div className="relative p-8 flex flex-col items-center gap-6 w-full">
      {!gameStarted ? (
        <button
          className={`${buttonStyle} bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 border-2 border-green-400/50 hover:border-green-300/70 transform hover:scale-105 active:scale-95 ${BFont.className}`}
          onClick={handleStartNewGame}
        >
          🎮 Start New Game
        </button>
      ) : (
        <>
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <div className="w-full h-px bg-gradient-to-r from-purple-500/50 to-pink-500/50" />
            <p className="text-lg font-semibold text-gray-300 text-center">
              Ready for another round?
            </p>
          </div>
          
          <button
            className={`${buttonStyle} bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 border-2 border-red-400/50 hover:border-red-300/70 transform hover:scale-105 active:scale-95 ${BFont.className}`}
            onClick={handleRestart}
          >
            🔄 Restart Game
          </button>
        </>
      )}
    </div>
  );
};

export default NewGame;
