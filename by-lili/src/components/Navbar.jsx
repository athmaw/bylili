import React from 'react';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';

export default function Navbar({ toggleMenu }) {
  return (
    <header className="sticky top-0 z-20 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-8">
        <div className="text-2xl md:text-3xl font-logo text-black">
          By Lili
        </div>
        <div className="flex items-center space-x-4 md:space-x-6 text-[#d4a3b3]">
          <Search className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-black transition-colors" />
          <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-black transition-colors" />
          <User className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-black transition-colors" />
          <button onClick={toggleMenu} className="ml-2 focus:outline-none hover:text-black transition-colors">
            <Menu className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>
    </header>
  );
}