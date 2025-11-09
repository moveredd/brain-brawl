'use client';

import React, { useState } from 'react';
import { Bebas_Neue } from 'next/font/google';
import Questions from './Questions';

const BFont = Bebas_Neue({ subsets: ['latin'], weight: '400' });

const NewGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0); // <-- serve per ri-render di Questions

  const handleStartNewGame = () => {
    setReloadFlag(prev => prev + 1); // forza il refresh
    setGameStarted(true);
  };

  const handleRestart = () => {
    setGameStarted(false);
  };

  const buttonStyle = "px-10 py-6 rounded-full shadow-lg text-4xl transition-all duration-200";

  return (
    <div className="relative p-8 flex flex-col items-center gap-6">
      {!gameStarted ? (
        <button
          className={`${buttonStyle} bg-green-600 text-white hover:bg-green-700 ${BFont.className}`}
          onClick={handleStartNewGame}
        >
          Start New Game
        </button>
      ) : (
        <>
          <Questions reloadFlag={reloadFlag} />
          <button
            className={`${buttonStyle} bg-red-600 text-white hover:bg-red-700 ${BFont.className}`}
            onClick={handleRestart}
          >
            Restart
          </button>
        </>
      )}
    </div>
  );
};

export default NewGame;
