import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { isLoggedIn, user, login, logout, isAdmin } = useAuth();

  return (
    <header className="bg-brand-dark/95 backdrop-blur-sm sticky top-0 z-50 border-b border-brand-highlight/10 shadow-lg">
      <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <a href="/" className="text-xl font-extrabold uppercase tracking-widest text-brand-highlight drop-shadow-lg">
          PorterPlays
        </a>

        <nav className="flex items-center gap-8">
          <a href="/" className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300">Home</a>
          <a href="/about" className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300">About</a>
          <a href="/thrill" className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300">Thrill</a>
          <a href="/contact" className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300">Contact</a>
        </nav>
      </div>
    </header>
  );
};