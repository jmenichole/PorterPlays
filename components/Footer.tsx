import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold">PorterPlays</p>
            <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} PorterPlays. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/jmenichole/PorterPlays"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://discord.gg/porterplays"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-300 transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};