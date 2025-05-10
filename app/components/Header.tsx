import React from 'react';
import Link from 'next/link';

import { Bebas_Neue } from 'next/font/google';
const BFont = Bebas_Neue({ subsets: ['latin'], weight: '400' });

const Header = () => {
  return (
    <>
    <header className="relative w-full z-50 ">
      <nav className="bg-black h-[10rem] flex items-center justify-between px-10 bg-linear-to-t from-sky-500 to-indigo-500">
                
        <h1 className={`text-white text-4xl ${BFont.className}`}>
          Brain
          <span className='inline-block text-4xl'>🧠</span>
          Brawl
        </h1>


      </nav>
      <hr />
    </header> 
    </>
  );
};

export default Header;
