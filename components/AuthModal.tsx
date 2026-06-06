'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Great_Vibes } from 'next/font/google';
import { supabase } from '@/lib/supabase';

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], display: 'swap' });

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  const [fullName, setFullName] = useState(''); 
  const [email, setEmail] = useState('');       
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setIsLoading(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    setIsLoading(true);

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please try again.');
        setIsLoading(false);
        return;
      }

      // Supabase Sign Up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName } 
        }
      });

      if (error) setError(error.message);
      else onSuccess();

    } else {
      // Supabase Log In
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) setError(error.message);
      else onSuccess();
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 relative shadow-2xl rounded-sm">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors focus:outline-none">
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <span className={`${greatVibes.className} text-4xl text-[#5A2B2B] block mb-2`}>By Lili</span>
          <h2 className="text-xl font-semibold tracking-wide">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 text-xs rounded-sm border border-red-100 text-center font-medium">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black" placeholder="Jane Doe" />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black" placeholder="you@example.com" />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 p-3 pr-10 text-sm focus:outline-none focus:border-black" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`w-full border p-3 pr-10 text-sm focus:outline-none ${error ? 'border-red-400 focus:border-red-600' : 'border-gray-300 focus:border-black'}`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                  {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full bg-[#1A1A1A] text-white py-4 text-sm font-bold tracking-widest hover:bg-black transition-colors mt-4 disabled:bg-gray-400">
            {isLoading ? 'PROCESSING...' : (mode === 'login' ? 'LOG IN' : 'REGISTER')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {mode === 'login' ? (
            <p>Don't have an account? <button onClick={() => setMode('register')} type="button" className="font-semibold underline hover:text-black">Sign up</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setMode('login')} type="button" className="font-semibold underline hover:text-black">Log in</button></p>
          )}
        </div>
      </div>
    </div>
  );
}