import React from 'react';
import Link from 'next/link';
import Github from '@/app/assets/Github';

const CurrentDate = () => {
  return <span>{new Date().getFullYear()}</span>;
};

const Footer = () => {
  return (
    <footer className="relative z-50 mt-auto border-t border-purple-500/20">
  <nav className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 backdrop-blur-lg min-h-24 flex items-center py-6">
    <div className="w-full mx-auto px-8 md:px-12 lg:px-24 flex items-center justify-between">
      <h2 className="text-base md:text-xl lg:text-2xl text-gray-300 font-medium">
        &copy; <CurrentDate /> Brain Brawl
      </h2>

      <Link
        href="https://github.com/moveredd/brain-brawl"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex-shrink-0"
      >
        <div className="flex items-center space-x-2 md:space-x-3 px-4 py-2 md:px-5 md:py-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white hover:from-purple-600/30 hover:to-pink-600/30 hover:border-purple-400/50 transition-all transform hover:scale-105 whitespace-nowrap">
          <span className="text-base md:text-lg font-semibold">Leave a star on GitHub</span>
          <Github />
        </div>
      </Link>
    </div>
  </nav>
</footer>

  );
};

export default Footer;
