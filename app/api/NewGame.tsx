'use client';
<<<<<<< HEAD

import React from 'react';

const NewGame = ({ onStartNewGame }: { onStartNewGame: () => void }) => {
  return (
    <button
      className="w-full px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg lg:text-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl backdrop-blur-sm border-2 border-purple-400/50 hover:border-purple-300/70"
      onClick={onStartNewGame}
    >
      🎮 New Game
    </button>
=======

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
>>>>>>> 453272f01425b8e529ce34c03512fd4bad61b1e3
  );
};

export default NewGame;
