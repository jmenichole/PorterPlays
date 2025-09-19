import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { isLoggedIn, user, login, logout, isAdmin } = useAuth();

  return (
    <header className="bg-black/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex justify-between items-center p-6">
        <a href="/" className="text-2xl font-bold uppercase tracking-widest">
          PorterPlays
        </a>

        <nav className="flex items-center gap-8">
          <a href="/" className="font-semibold hover:text-teal-300 transition-colors">Home</a>
          <a href="/about" className="font-semibold hover:text-teal-300 transition-colors">About</a>
          <a href="/thrill" className="font-semibold hover:text-teal-300 transition-colors">Thrill</a>
          <a href="/contact" className="font-semibold hover:text-teal-300 transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
};