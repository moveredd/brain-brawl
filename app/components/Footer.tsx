import React from 'react';
import Link from 'next/link';
import Points from '@/app/components/PointsCount';
import Github from '@/app/assets/Github.tsx';
import { Bebas_Neue } from 'next/font/google';


const BFont = Bebas_Neue({ subsets: ['latin'], weight: '400' });

const CurrentDate = () => {
  return <span className='text-xl'>{new Date().getFullYear()}</span>;
}

const Footer = () => {
  return (
    <>
    <footer className="relative z-50 ">
      <nav className="bg-black h-[10rem] flex items-center justify-between px-10 bg-linear-to-t from-sky-500 to-indigo-500">
                
        <h1 className={`text-white text-xl ${BFont.className}`}>
          &copy; <CurrentDate /> BrainBrawl
        </h1>

        <Link href={'https://github.com/moveredd/brain-brawl'}>
          <div className={`text-white px-6 py-3 rounded-lg bg-linear-to-r border to-cyan-500 from-blue-500 shadow-md  text-3xl ${BFont.className}`}>
            Support us on Github
            &nbsp;
            <Github />
          </div>
        </Link>
      </nav>
      <hr />
    </footer> 
    </>
  );
};

export default Footer;
