'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon, 
  ShoppingBagIcon, 
  UserIcon, 
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { StarIcon, UserIcon as UserIconSolid } from '@heroicons/react/24/solid';
import { Great_Vibes } from 'next/font/google';

import AuthModal from '@/components/AuthModal';
// 1. IMPORT THE NEW PROFILE DRAWER
import ProfileDrawer from '@/components/ProfileDrawer'; 

const greatVibes = Great_Vibes({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface CartItem {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

export default function ProductPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const [selectedColor, setSelectedColor] = useState<'Pink' | 'Yellow'>('Pink');
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'Description' | 'Sizing' | 'Shipping' | 'Returns'>('Description');

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  // 2. ADD STATE FOR THE PROFILE DRAWER
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false); 
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const currentImage = selectedColor === 'Pink' ? '/images/emmapink.jpg' : '/images/emmayellow.jpg';

  const handleQuantity = (type: 'increase' | 'decrease') => {
    if (type === 'decrease' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'increase') setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return; 
    }

    const newItemId = `emma-${selectedColor.toLowerCase()}-${selectedSize.toLowerCase()}`;
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItemId);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === newItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, {
          id: newItemId, name: 'Emma Top', price: 900, color: selectedColor, size: selectedSize, quantity: quantity, image: currentImage
        }];
      }
    });

    setQuantity(1);
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (id: string, delta: number) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => setCartItems(prevItems => prevItems.filter(item => item.id !== id));

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCartItems([]); 
    setIsCartOpen(false);
    setIsProfileOpen(false); // Close profile drawer on logout
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white px-6 md:px-12 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-gray-500">Shop ▾</a>
          <a href="#" className="hover:text-gray-500">New</a>
          <a href="#" className="hover:text-gray-500">Best Sellers</a>
        </div>

        <Link href="/">
          <span className={`${greatVibes.className} text-4xl tracking-wide cursor-pointer text-[#5A2B2B]`}>
            By Lili
          </span>
        </Link>
        
        <div className="flex items-center space-x-4 md:space-x-6">
          <MagnifyingGlassIcon className="w-5 h-5 cursor-pointer hover:text-gray-500" />
          
          {/* 3. UPDATE THE USER ICON CLICK HANDLER */}
          {isLoggedIn ? (
            <button onClick={() => setIsProfileOpen(true)} title="My Profile" className="focus:outline-none hidden md:block">
              <UserIconSolid className="w-5 h-5 text-green-700 cursor-pointer" />
            </button>
          ) : (
            <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} title="Log In" className="focus:outline-none hidden md:block">
              <UserIcon className="w-5 h-5 cursor-pointer hover:text-gray-500" />
            </button>
          )}

          <button 
            className="relative focus:outline-none" 
            onClick={() => {
              if (!isLoggedIn) { setAuthMode('login'); setIsAuthModalOpen(true); } 
              else { setIsCartOpen(true); }
            }}
          >
            <ShoppingBagIcon className="w-5 h-5 cursor-pointer hover:text-gray-500" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          
          <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(true)}>
            <Bars3Icon className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
      </header>

      {/* BREADCRUMBS */}
      <div className="px-6 md:px-12 py-4 text-xs text-gray-500 uppercase tracking-wider">
        <Link href="/" className="hover:underline">Home</Link> {'>'} Tops {'>'} Emma Top
      </div>

      <main className="flex-grow px-6 md:px-12 pb-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start">
          
          {/* LEFT: IMAGE CAROUSEL */}
          <div className="w-full md:w-1/2 relative bg-[#F5F5F5] aspect-square md:aspect-[4/5] rounded-sm overflow-hidden flex items-center justify-center group md:sticky md:top-24">
            <button className="absolute left-4 p-2 bg-white/50 rounded-full hover:bg-white transition-colors z-10 hidden group-hover:block">
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-300" style={{ backgroundImage: `url('${currentImage}')` }} />
            <button className="absolute right-4 p-2 bg-white/50 rounded-full hover:bg-white transition-colors z-10 hidden group-hover:block">
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* RIGHT: PRODUCT DETAILS */}
          <div className="w-full md:w-1/2 flex flex-col">
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold mb-2">Emma Top</h1>
                <div className="flex items-center space-x-2 text-sm mb-4">
                  <div className="flex text-black">
                    <StarIcon className="w-4 h-4" /><StarIcon className="w-4 h-4" /><StarIcon className="w-4 h-4" /><StarIcon className="w-4 h-4" /><StarIcon className="w-4 h-4" />
                  </div>
                  <span className="text-gray-500">5 (8 reviews)</span>
                </div>
                <span className="inline-block text-xs font-bold px-2 py-1 bg-gray-100 mb-6">Final Restock</span>
              </div>
              <span className="text-xl font-semibold">₱900</span>
            </div>

            {/* COLOR SELECTION */}
            <div className="mb-6">
              <p className="text-sm mb-3">Select Color: <span className="font-medium">{selectedColor}</span></p>
              <div className="flex space-x-3">
                <button onClick={() => setSelectedColor('Pink')} className={`w-14 h-14 border-2 p-0.5 ${selectedColor === 'Pink' ? 'border-black' : 'border-transparent'}`}>
                  <div className="w-full h-full bg-[#FFD1DC] bg-cover bg-center" style={{ backgroundImage: `url('/images/emmapink.jpg')` }} />
                </button>
                <button onClick={() => setSelectedColor('Yellow')} className={`w-14 h-14 border-2 p-0.5 ${selectedColor === 'Yellow' ? 'border-black' : 'border-transparent'}`}>
                  <div className="w-full h-full bg-[#FFFACD] bg-cover bg-center" style={{ backgroundImage: `url('/images/emmayellow.jpg')` }} />
                </button>
              </div>
            </div>

            {/* SIZE SELECTION */}
            <div className="mb-6">
              <p className="text-sm mb-3">Size: <span className="font-medium">{selectedSize}</span></p>
              <div className="flex space-x-2 mb-4">
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)} className={`w-12 h-10 border text-sm font-medium transition-colors ${selectedSize === s ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="bg-gray-50 p-3 rounded-sm border border-gray-100 max-w-sm">
                <table className="w-full text-[10px] text-gray-600 text-center">
                  <thead><tr className="border-b border-gray-200"><th className="pb-1 text-left">Size</th><th className="pb-1">Bust (in)</th><th className="pb-1">Waist (in)</th></tr></thead>
                  <tbody>
                    <tr><td className="py-1 text-left font-medium text-gray-800">S</td><td className="py-1">32 - 34</td><td className="py-1">24 - 26</td></tr>
                    <tr><td className="py-1 text-left font-medium text-gray-800">M</td><td className="py-1">34 - 36</td><td className="py-1">26 - 28</td></tr>
                    <tr><td className="py-1 text-left font-medium text-gray-800">L</td><td className="py-1">36 - 38</td><td className="py-1">28 - 30</td></tr>
                    <tr><td className="py-1 text-left font-medium text-gray-800">XL</td><td className="py-1">38 - 40</td><td className="py-1">30 - 32</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mb-6">
              <p className="text-sm mb-3">Quantity:</p>
              <div className="flex items-center border border-gray-300 w-32 h-10">
                <button onClick={() => handleQuantity('decrease')} className="w-10 h-full flex justify-center items-center hover:bg-gray-50"><MinusIcon className="w-4 h-4" /></button>
                <div className="flex-1 text-center text-sm font-medium">{quantity}</div>
                <button onClick={() => handleQuantity('increase')} className="w-10 h-full flex justify-center items-center hover:bg-gray-50"><PlusIcon className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex items-center text-red-600 text-sm mb-6 font-medium">
              <span className="w-4 h-4 rounded-full border border-red-600 flex items-center justify-center text-[10px] mr-2">!</span>
              Limited pieces
            </div>

            <button onClick={handleAddToCart} className="w-full bg-[#1A1A1A] text-white py-4 text-sm font-bold tracking-widest hover:bg-black transition-colors mb-8">
              {isLoggedIn ? 'ADD TO CART' : 'LOG IN TO ADD TO CART'}
            </button>

            {/* ACCORDION / TABS */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex space-x-6 border-b border-gray-200 mb-4 overflow-x-auto">
                {['Description', 'Sizing', 'Shipping', 'Returns'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab as any)} className={`pb-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-600 leading-relaxed min-h-[150px]">
                {activeTab === 'Description' && (<p>The Emma Top is very unique... <br/><br/>Fabric: Premium Silk Blend</p>)}
                {/* ... other tabs ... */}
              </div>
            </div>

          </div>
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
        }} 
      />

      {/* 4. MOUNT THE PROFILE DRAWER HERE */}
      <ProfileDrawer 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        onLogout={handleLogout} 
      />

      {/* --- CART DRAWER OVERLAY --- */}
      <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsCartOpen(false)} />

      {/* --- CART DRAWER PANEL --- */}
      <div className={`fixed top-0 right-0 h-full w-[85%] md:w-[450px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-white">
          <h2 className="text-xl font-semibold tracking-wide">Your Cart ({cartItemCount})</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"><XMarkIcon className="w-6 h-6 text-gray-500" /></button>
        </div>

        <div className="flex-grow overflow-y-auto px-6 py-6 bg-gray-50">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBagIcon className="w-16 h-16 text-gray-300" />
              <p>Your cart is currently empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-sm border border-gray-100 shadow-sm">
                  <div className="w-20 h-24 bg-cover bg-center rounded-sm flex-shrink-0 bg-gray-100" style={{ backgroundImage: `url('${item.image}')` }} />
                  <div className="flex flex-col flex-grow justify-between">
                    <div className="flex justify-between items-start">
                      <div><h3 className="font-semibold text-sm">{item.name}</h3><p className="text-xs text-gray-500 mt-1">Color: {item.color} | Size: {item.size}</p></div>
                      <p className="font-semibold text-sm">₱{item.price * item.quantity}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-gray-300 w-24 h-8 rounded-sm overflow-hidden">
                        <button onClick={() => updateCartItemQuantity(item.id, -1)} className="w-8 h-full flex justify-center items-center hover:bg-gray-100 bg-white"><MinusIcon className="w-3 h-3" /></button>
                        <div className="flex-1 text-center text-xs font-medium bg-white">{item.quantity}</div>
                        <button onClick={() => updateCartItemQuantity(item.id, 1)} className="w-8 h-full flex justify-center items-center hover:bg-gray-100 bg-white"><PlusIcon className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><TrashIcon className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="px-6 py-6 border-t border-gray-200 bg-white">
            <div className="flex justify-between items-center mb-6"><span className="text-gray-600">Subtotal</span><span className="text-xl font-semibold">₱{cartTotal}</span></div>
            <button className="w-full bg-[#1A1A1A] text-white py-4 text-sm font-bold tracking-widest hover:bg-black transition-colors">CHECKOUT</button>
          </div>
        )}
      </div>

    </div>
  );
}