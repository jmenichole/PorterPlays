import React from 'react';
import { DiscordIcon, LogoIcon, HeaderTelegramIcon, TwitterIcon, KickIcon } from './icons';

export const Footer: React.FC = () => {
  // Create base-path-aware navigation handler
  const navigate = (path: string) => {
    const basePath = window.location.pathname.startsWith('/PorterPlays/') ? '/PorterPlays' : '';
    const fullPath = basePath + path;
    window.history.pushState(null, '', fullPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <footer className="bg-slate-900/50 border-t border-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-2xl font-bold uppercase tracking-widest cursor-pointer border-none bg-transparent text-inherit">
                <LogoIcon />
                <span>Porter Plays</span>
            </button>
          <nav className="flex items-center gap-6">
            <button onClick={() => navigate('/leaderboards')} className="font-semibold hover:text-brand-highlight transition-colors cursor-pointer border-none bg-transparent text-inherit">Leaderboards</button>
            <button onClick={() => navigate('/updates')} className="font-semibold hover:text-brand-highlight transition-colors cursor-pointer border-none bg-transparent text-inherit">Updates</button>
            <button onClick={() => navigate('/community')} className="font-semibold hover:text-brand-highlight transition-colors cursor-pointer border-none bg-transparent text-inherit">Community</button>
          </nav>
          <div className="flex items-center gap-4">
             <a href="https://discord.gg/porterplays" target="_blank" rel="noopener noreferrer" title="Discord" aria-label="Join our Discord server" className="text-slate-400 hover:text-brand-light transition-colors"><DiscordIcon /></a>
             <a href="https://t.me/porterplays" target="_blank" rel="noopener noreferrer" title="Telegram" aria-label="Join our Telegram channel" className="text-slate-400 hover:text-brand-light transition-colors"><HeaderTelegramIcon /></a>
             <a href="https://x.com/porterplays_" target="_blank" rel="noopener noreferrer" title="X (Twitter)" aria-label="Follow us on X (formerly Twitter)" className="text-slate-400 hover:text-brand-light transition-colors"><TwitterIcon /></a>
             <a href="https://kick.com/porterplays" target="_blank" rel="noopener noreferrer" title="Kick" aria-label="Follow us on Kick" className="text-slate-400 hover:text-brand-light transition-colors"><KickIcon /></a>
          </div>
        </div>
        <div className="text-center text-slate-500 text-sm mt-8 border-t border-slate-800 pt-6">
          <p>
            Porter Plays is an affiliate marketing website and is not a casino. All competitions are for individuals aged 18 and over.
            Please gamble responsibly, as it can be addictive. For support, please visit <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-highlight transition-colors">BeGambleAware.org</a>.
          </p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Porter Plays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};