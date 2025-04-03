import React from 'react';
import Link from 'next/link';
import Points from '@/app/components/PointsCount';

import { Bebas_Neue } from 'next/font/google';
const BFont = Bebas_Neue({ subsets: ['latin'], weight: '400' });

const Header = () => {
  return (
    <header className="relative z-50">
      <nav className="bg-black h-[10rem] flex items-center justify-between px-10">
        {/* Game Name on the Left */}
        <h1 className={`text-white text-4xl ${BFont.className}`}>BrainBrawl</h1>


        <Points />


        <Link href="#">
          <button className={`bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition text-3xl ${BFont.className}`}>
            Start New Game
          </button>
        </Link>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
