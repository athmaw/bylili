import React from 'react';
import { X } from 'lucide-react';

export default function Sidebar({ isMenuOpen, toggleMenu }) {
  return (
    <div 
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={toggleMenu}
      ></div>
      
      <div 
        className={`absolute top-0 right-0 w-[70%] sm:w-[60%] md:w-96 h-full bg-[#fffafb] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4 md:p-6">
          <button onClick={toggleMenu} className="text-gray-400 hover:text-black transition-colors focus:outline-none">
            <X className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
        <nav className="flex flex-col px-8 md:px-10 space-y-6 text-black text-base md:text-lg">
          <a href="#" className="text-right hover:opacity-70 transition-opacity">About Us</a>
          <a href="#" className="text-right hover:opacity-70 transition-opacity">Size Guide</a>
          <a href="#" className="text-right hover:opacity-70 transition-opacity">Contact Us</a>
        </nav>
      </div>
    </div>
  );
}