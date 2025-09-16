import React from 'react';
import { LogoIcon, DiscordIcon, HeaderTelegramIcon, TwitterIcon, KickIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';
import { createPath, navigateTo } from '../utils/navigation';

export const Header: React.FC = () => {
  const { isLoggedIn, user, login, logout, isAdmin } = useAuth();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigateTo(path);
  };

  return (
    <header className="bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href={createPath('/')} onClick={(e) => handleNavClick(e, '/')} className="flex items-center gap-2 text-2xl font-bold uppercase tracking-widest">
            <LogoIcon />
            <span>Porter Plays</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href={createPath('/leaderboards')} onClick={(e) => handleNavClick(e, '/leaderboards')} className="font-semibold hover:text-brand-highlight transition-colors">Leaderboards</a>
            <a href={createPath('/updates')} onClick={(e) => handleNavClick(e, '/updates')} className="font-semibold hover:text-brand-highlight transition-colors">Updates</a>
            <a href={createPath('/community')} onClick={(e) => handleNavClick(e, '/community')} className="font-semibold hover:text-brand-highlight transition-colors">Community</a>
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
                   <a
                    href={createPath('/admin')}
                    onClick={(e) => handleNavClick(e, '/admin')}
                    className="bg-brand-primary hover:bg-opacity-80 transition-colors text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Admin
                  </a>
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