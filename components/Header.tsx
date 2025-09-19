import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { isLoggedIn, user, login, logout, isAdmin } = useAuth();

  const handleNavigation = (path: string) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header className="bg-brand-dark/95 backdrop-blur-sm sticky top-0 z-50 border-b border-brand-highlight/10 shadow-lg">
      <div className="flex justify-between items-center py-4 px-6 max-w-7xl mx-auto">
        {/* Logo with P icon */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-highlight rounded-lg flex items-center justify-center">
            <span className="text-brand-dark text-xl font-bold">P</span>
          </div>
          <span className="text-xl font-bold uppercase tracking-wider text-brand-light">
            PORTER PLAYS
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <button 
            onClick={() => handleNavigation('/')}
            className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigation('/leaderboards')}
            className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300"
          >
            Leaderboards
          </button>
          <button 
            onClick={() => handleNavigation('/updates')}
            className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300"
          >
            Updates
          </button>
          <button 
            onClick={() => handleNavigation('/community')}
            className="font-semibold hover:text-brand-highlight transition-colors text-brand-light hover:-translate-y-0.5 transform duration-300"
          >
            Community
          </button>
        </nav>

        {/* Social Icons and Login */}
        <div className="flex items-center gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="https://discord.gg/porterplays" target="_blank" rel="noopener noreferrer" 
               className="text-slate-400 hover:text-brand-highlight transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"/>
              </svg>
            </a>
            <a href="https://t.me/porterplays" target="_blank" rel="noopener noreferrer"
               className="text-slate-400 hover:text-brand-highlight transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785L24 5.91c.276-1.108-.393-1.611-1.335-1.193z"/>
              </svg>
            </a>
            <a href="https://x.com/porterplays_" target="_blank" rel="noopener noreferrer"
               className="text-slate-400 hover:text-brand-highlight transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://kick.com/porterplays" target="_blank" rel="noopener noreferrer"
               className="text-slate-400 hover:text-brand-highlight transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </a>
          </div>

          {/* Login Button */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-brand-light text-sm">
                {user?.name || 'User'}
              </span>
              <button 
                onClick={logout}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-brand-light rounded-lg transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={login}
              className="px-6 py-2 bg-brand-highlight hover:bg-brand-highlight/90 text-brand-dark rounded-lg font-semibold transition-all hover:scale-105 transform"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};