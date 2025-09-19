import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { isLoggedIn, user, login, logout, isAdmin } = useAuth();

  return (
    <header className="bg-brand-dark/95 backdrop-blur-sm sticky top-0 z-50 border-b border-brand-highlight/10 shadow-lg">
      <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <a href="/" className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-brand-highlight to-brand-primary p-2 rounded-lg">
            <span className="text-brand-dark font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-extrabold uppercase tracking-wider text-brand-light">
            Porter Plays
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300">Home</a>
          <a href="/leaderboards" className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300">Leaderboards</a>
          <a href="/updates" className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300">Updates</a>
          <a href="/community" className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300">Community</a>
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-brand-light font-medium">Welcome, {user?.name}</span>
              {isAdmin && (
                <a href="/admin" className="text-brand-highlight hover:text-brand-light transition-colors">
                  Admin
                </a>
              )}
              <button
                onClick={logout}
                className="bg-brand-primary hover:bg-brand-primary/80 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="bg-gradient-to-r from-brand-highlight to-brand-primary text-brand-dark px-6 py-2.5 rounded-lg font-semibold hover:scale-105 transition transform"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};