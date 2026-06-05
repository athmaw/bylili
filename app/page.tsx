'use client';

import { useState } from 'react';
import Link from 'next/link'; // Imported for App Router navigation
import { 
  MagnifyingGlassIcon, 
  ShoppingBagIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface Product {
  id: string;
  name: string;
  price: number;
  thumbnail: string; 
  images: string[]; 
}

const products: Product[] = [
  {
    id: '1',
    name: 'Emma Top',
    price: 900, 
    thumbnail: '/images/emmapink.jpg', 
    images: ['/images/emmapink.jpg', '/images/emmayellow.jpg'], 
  }
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="w-full min-h-screen bg-[#FFF5F5] text-[#5A2B2B] font-sans flex flex-col relative">
      
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-[#FFF5F5] px-4 md:px-12 py-4 flex items-center justify-between border-b border-[#F5E1E1]">
        <span className={`${greatVibes.className} text-4xl tracking-wide cursor-pointer`}>
          By Lili
        </span>
        
        <div className="flex items-center space-x-4 md:space-x-6">
          <MagnifyingGlassIcon className="w-5 h-5 text-[#5A2B2B] cursor-pointer hover:opacity-70 transition-opacity" />
          <ShoppingBagIcon className="w-5 h-5 text-[#5A2B2B] cursor-pointer hover:opacity-70 transition-opacity" />
          <UserIcon className="w-5 h-5 text-[#5A2B2B] cursor-pointer hover:opacity-70 transition-opacity" />
          
          <button 
            onClick={() => setIsMenuOpen(true)} 
            aria-label="Open Menu"
            className="focus:outline-none hover:opacity-70 transition-opacity"
          >
            <Bars3Icon className="w-6 h-6 text-[#5A2B2B] cursor-pointer" />
          </button>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="relative w-full h-48 md:h-[400px] bg-[#E5D1D1] overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-[url('/images/shopnow.jpg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-white/90 text-[#5A2B2B] px-8 py-3 md:px-10 md:py-4 tracking-wider text-sm md:text-base font-medium hover:bg-white transition-all shadow-sm">
            Shop Now
          </button>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <main className="flex-grow p-4 md:px-12 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            /* Wrapped the card inside a Link component pointing to /product */
            <Link 
              href="/product" 
              key={product.id} 
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[3/4] w-full bg-[#EAEAEA] overflow-hidden mb-3 rounded-sm">
                <div className="absolute inset-0 bg-[#E5C3C8]/10 group-hover:bg-transparent transition-colors duration-500 ease-out z-10" />
                
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  style={{ backgroundImage: `url('${product.thumbnail}')` }}
                />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-[#5A2B2B]">{product.name}</h3>
              <p className="text-xs md:text-sm text-[#7A4B4B] mt-1">₱{product.price}</p>
            </Link>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#CBA3B0] py-6 mt-auto text-center text-xs md:text-sm text-white tracking-wide">
        By Lili, 2026.
      </footer>

      {/* --- SLIDE-OUT SIDEBAR MENU --- */}
      <div 
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-[75%] md:w-[400px] bg-[#FFF5F5] z-50 p-6 md:p-10 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex justify-between items-center mb-10">
            <span className={`${greatVibes.className} text-3xl text-[#5A2B2B]`}>
              By Lili
            </span>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              aria-label="Close Menu"
              className="focus:outline-none hover:opacity-70 transition-opacity"
            >
              <XMarkIcon className="w-8 h-8 text-[#5A2B2B]" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-8 text-right font-medium text-lg md:text-xl tracking-wide">
            <a href="#" className="hover:opacity-70 transition-opacity">About Us</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Size Guide</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Contact Us</a>
          </nav>
        </div>
        
        <div className="text-right text-xs text-[#A67C89]">
          By Lili, 2026.
        </div>
      </div>

    </div>
  );
}