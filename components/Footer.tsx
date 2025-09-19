import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-highlight/10 text-brand-light">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-brand-highlight">PorterPlays</p>
            <p className="text-sm text-slate-400 mt-2">© {new Date().getFullYear()} PorterPlays. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/jmenichole/PorterPlays"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-brand-highlight transition-colors hover:-translate-y-0.5 transform duration-300"
            >
              GitHub
            </a>
            <a
              href="https://discord.gg/porterplays"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-brand-highlight transition-colors hover:-translate-y-0.5 transform duration-300"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};