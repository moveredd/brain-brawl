import React from 'react'
import { Bebas_Neue } from 'next/font/google';
const BFont = Bebas_Neue({ subsets: ['latin'], weight: '400' });

const NewGame = ({ onStartNewGame }) => {
  return (
    <div>
        <button
          className={`bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition text-3xl absolute right-10 top-15 z-50 ${BFont.className}`}
          onClick={onStartNewGame}
        >
          Start New Game
        </button>
    </div>
  )
}

export default NewGame
