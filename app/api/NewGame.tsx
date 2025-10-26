
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Bebas_Neue } from 'next/font/google';
import Questions from './Questions'; // Assicurati che il path sia corretto

const BFont = Bebas_Neue({ subsets: ['latin'], weight: '400' });

const NewGame = forwardRef((props, ref) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0);

  const handleStartNewGame = () => {
    setGameStarted(true);
    setReloadFlag((prev) => prev + 1);
  };

  const handleRestart = () => {
    setGameStarted(false);
  };

  return (
    <div className="relative p-4">
      {!gameStarted ? (
        <button
          className={`bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition text-3xl ${BFont.className}`}
          onClick={handleStartNewGame}
        >
          Start New Game
        </button>
      ) : (
        <div>
          <Questions reloadFlag={reloadFlag} />
          <div className="mt-6 text-center">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded mt-4"
              onClick={handleRestart}
            >
              return to the main menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default NewGame;
