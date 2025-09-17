import React from 'react';
import { LogoIcon, DiscordIcon, HeaderTelegramIcon, TwitterIcon, KickIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { isLoggedIn, user, login, logout, isAdmin } = useAuth();

  // Create base-path-aware navigation handler
  const navigate = (path: string) => {
    const basePath = window.location.pathname.startsWith('/PorterPlays/') ? '/PorterPlays' : '';
    const fullPath = basePath + path;
    window.history.pushState(null, '', fullPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header className="bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-2xl font-bold uppercase tracking-widest cursor-pointer border-none bg-transparent text-inherit">
            <LogoIcon />
            <span>Porter Plays</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/leaderboards')} className="font-semibold hover:text-brand-highlight transition-colors cursor-pointer border-none bg-transparent text-inherit">Leaderboards</button>
            <button onClick={() => navigate('/updates')} className="font-semibold hover:text-brand-highlight transition-colors cursor-pointer border-none bg-transparent text-inherit">Updates</button>
            <button onClick={() => navigate('/community')} className="font-semibold hover:text-brand-highlight transition-colors cursor-pointer border-none bg-transparent text-inherit">Community</button>
          </nav>

          <div className="flex items-center gap-4">
            <a href="https://discord.gg/porterplays" target="_blank" rel="noopener noreferrer" title="Discord" aria-label="Join our Discord server" className="text-slate-400 hover:text-brand-light transition-colors"><DiscordIcon /></a>
            <a href="https://t.me/porterplays" target="_blank" rel="noopener noreferrer" title="Telegram" aria-label="Join our Telegram channel" className="text-slate-400 hover:text-brand-light transition-colors"><HeaderTelegramIcon /></a>
            <a href="https://x.com/porterplays_" target="_blank" rel="noopener noreferrer" title="X (Twitter)" aria-label="Follow us on X (formerly Twitter)" className="text-slate-400 hover:text-brand-light transition-colors"><TwitterIcon /></a>
            <a href="https://kick.com/porterplays" target="_blank" rel="noopener noreferrer" title="Kick" aria-label="Follow us on Kick" className="text-slate-400 hover:text-brand-light transition-colors"><KickIcon /></a>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:block font-semibold">Welcome, {user?.name}</span>
                {isAdmin && (
                   <button
                    onClick={() => navigate('/admin')}
                    className="bg-brand-primary hover:bg-opacity-80 transition-colors text-white font-bold py-2 px-4 rounded-lg cursor-pointer border-none"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={logout}
                  className="bg-slate-700 hover:bg-slate-600 transition-colors text-white font-bold py-2 px-4 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="hidden sm:flex items-center gap-2 bg-[#5865F2] hover:bg-opacity-80 transition-all duration-300 text-white font-bold py-2 px-4 rounded-lg"
              >
                <DiscordIcon />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};