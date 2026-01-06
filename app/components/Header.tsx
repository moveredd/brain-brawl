import React from 'react';

const Header = () => {
  return (
    <header className="relative w-full z-50 border-b border-purple-500/20">
      <nav className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 backdrop-blur-lg min-h-20 md:min-h-24 flex items-center justify-center px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center space-x-2 md:space-x-3">
          <span className="text-4xl md:text-5xl lg:text-6xl animate-pulse">🧠</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Brain Brawl
          </h1>
        </div>
      </nav>
    </header>
  );
};

export default Header;
