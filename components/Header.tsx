import React from 'react';
import { LogoIcon, DiscordIcon, HeaderTelegramIcon, TwitterIcon, KickIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { isLoggedIn, user, login, logout, isAdmin } = useAuth();

  return (
    <header className="bg-brand-dark/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700/50 shadow-lg shadow-brand-dark/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3 text-2xl font-bold uppercase tracking-wider hover:text-brand-highlight transition-colors duration-200">
            <div className="p-1 rounded-lg bg-gradient-to-br from-brand-highlight/20 to-brand-primary/20 border border-brand-highlight/30">
              <LogoIcon />
            </div>
            <span className="bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent">Porter Plays</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/leaderboards" className="font-semibold hover:text-brand-highlight transition-all duration-200 relative py-2 px-1 group">
              <span>Leaderboards</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-highlight to-brand-primary transition-all duration-200 group-hover:w-full"></div>
            </a>
            <a href="/updates" className="font-semibold hover:text-brand-highlight transition-all duration-200 relative py-2 px-1 group">
              <span>Updates</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-highlight to-brand-primary transition-all duration-200 group-hover:w-full"></div>
            </a>
            <a href="/community" className="font-semibold hover:text-brand-highlight transition-all duration-200 relative py-2 px-1 group">
              <span>Community</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-highlight to-brand-primary transition-all duration-200 group-hover:w-full"></div>
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 border-r border-slate-700 pr-4 mr-1">
              <a href="https://discord.gg/porterplays" target="_blank" rel="noopener noreferrer" title="Discord" aria-label="Join our Discord server" className="text-slate-400 hover:text-[#5865F2] transition-all duration-200 hover:scale-110 p-1 rounded"><DiscordIcon /></a>
              <a href="https://t.me/porterplays" target="_blank" rel="noopener noreferrer" title="Telegram" aria-label="Join our Telegram channel" className="text-slate-400 hover:text-[#0088CC] transition-all duration-200 hover:scale-110 p-1 rounded"><HeaderTelegramIcon /></a>
              <a href="https://x.com/porterplays_" target="_blank" rel="noopener noreferrer" title="X (Twitter)" aria-label="Follow us on X (formerly Twitter)" className="text-slate-400 hover:text-white transition-all duration-200 hover:scale-110 p-1 rounded"><TwitterIcon /></a>
              <a href="https://kick.com/porterplays" target="_blank" rel="noopener noreferrer" title="Kick" aria-label="Follow us on Kick" className="text-slate-400 hover:text-[#53FC18] transition-all duration-200 hover:scale-110 p-1 rounded"><KickIcon /></a>
            </div>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:block font-semibold text-slate-300">Welcome, <span className="text-brand-highlight">{user?.name}</span></span>
                {isAdmin && (
                   <a
                    href="/admin"
                    className="bg-gradient-to-r from-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:to-brand-primary/70 transition-all duration-200 text-white font-bold py-2.5 px-4 rounded-lg shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:scale-105"
                  >
                    Admin
                  </a>
                )}
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 transition-all duration-200 text-white font-bold py-2.5 px-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3C4142] transition-all duration-300 text-white font-bold py-2.5 px-5 rounded-lg shadow-lg shadow-[#5865F2]/25 hover:shadow-[#5865F2]/40 hover:scale-105"
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