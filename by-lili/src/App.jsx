import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';

const productsData = [
  {
    id: 1,
    name: 'Shasha Top',
    price: 'P900',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Lorraine Top',
    price: 'P900',
    image: 'https://images.unsplash.com/photo-1434389678232-076cb7301c34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Elara Dress',
    price: 'P1200',
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Celine Skirt',
    price: 'P850',
    image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative overflow-x-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
          .font-logo { font-family: 'Dancing Script', cursive; }
        `}
      </style>

      <Navbar toggleMenu={toggleMenu} />
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      <main className="flex-grow flex flex-col w-full">
        <Hero />
        <ProductGrid products={productsData} />
      </main>

      <Footer />
    </div>
  );
}