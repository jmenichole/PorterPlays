import React from 'react';
import { DiscordIcon, LogoIcon, HeaderTelegramIcon, TwitterIcon, KickIcon } from './icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/70 border-t border-slate-700/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="flex flex-col items-start gap-4">
            <a href="/" className="flex items-center gap-3 text-2xl font-bold uppercase tracking-wider hover:text-brand-highlight transition-colors duration-200">
              <div className="p-1 rounded-lg bg-gradient-to-br from-brand-highlight/20 to-brand-primary/20 border border-brand-highlight/30">
                <LogoIcon />
              </div>
              <span className="bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent">Porter Plays</span>
            </a>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Your premium destination for competitive gaming leaderboards and exclusive rewards.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <nav className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <a href="/leaderboards" className="font-semibold hover:text-brand-highlight transition-colors duration-200 relative group">
                <span>Leaderboards</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-highlight to-brand-primary transition-all duration-200 group-hover:w-full"></div>
              </a>
              <a href="/updates" className="font-semibold hover:text-brand-highlight transition-colors duration-200 relative group">
                <span>Updates</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-highlight to-brand-primary transition-all duration-200 group-hover:w-full"></div>
              </a>
              <a href="/community" className="font-semibold hover:text-brand-highlight transition-colors duration-200 relative group">
                <span>Community</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-highlight to-brand-primary transition-all duration-200 group-hover:w-full"></div>
              </a>
            </nav>
            
            <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
              <span className="text-sm font-medium text-slate-300 mr-2">Connect:</span>
              <a href="https://discord.gg/porterplays" target="_blank" rel="noopener noreferrer" title="Discord" aria-label="Join our Discord server" className="text-slate-400 hover:text-[#5865F2] transition-all duration-200 hover:scale-110 p-2 rounded-lg hover:bg-slate-700/50"><DiscordIcon /></a>
              <a href="https://t.me/porterplays" target="_blank" rel="noopener noreferrer" title="Telegram" aria-label="Join our Telegram channel" className="text-slate-400 hover:text-[#0088CC] transition-all duration-200 hover:scale-110 p-2 rounded-lg hover:bg-slate-700/50"><HeaderTelegramIcon /></a>
              <a href="https://x.com/porterplays_" target="_blank" rel="noopener noreferrer" title="X (Twitter)" aria-label="Follow us on X (formerly Twitter)" className="text-slate-400 hover:text-white transition-all duration-200 hover:scale-110 p-2 rounded-lg hover:bg-slate-700/50"><TwitterIcon /></a>
              <a href="https://kick.com/porterplays" target="_blank" rel="noopener noreferrer" title="Kick" aria-label="Follow us on Kick" className="text-slate-400 hover:text-[#53FC18] transition-all duration-200 hover:scale-110 p-2 rounded-lg hover:bg-slate-700/50"><KickIcon /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700/50 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
              Porter Plays is an affiliate marketing website and is not a casino. All competitions are for individuals aged 18 and over.
              Please gamble responsibly, as it can be addictive. For support, please visit <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-highlight transition-colors font-medium">BeGambleAware.org</a>.
            </p>
            <p className="text-slate-500 text-sm font-medium whitespace-nowrap">&copy; {new Date().getFullYear()} Porter Plays. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};