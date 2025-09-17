import React from 'react';
import { DiscordIcon, HeaderTelegramIcon, TwitterIcon, KickIcon, ExternalLinkIcon, ThrillIcon, GoatedIcon, ShuffleIcon } from './icons';

export const CommunitySection: React.FC = () => {
    return (
        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider">
                        Join The <span className="text-brand-highlight">Community</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                        Connect with the heart of our community. The official Discord is your go-to for support, strategy discussions, and celebrating wins.
                    </p>
                    
                    <a
                        href="https://discord.gg/porterplays"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center justify-center bg-[#5865F2] hover:bg-opacity-80 transition-all duration-300 text-white font-bold py-4 px-10 rounded-lg text-xl uppercase shadow-lg hover:shadow-2xl hover:shadow-[#5865F2]/30 transform hover:-translate-y-1"
                    >
                        <DiscordIcon />
                        <span className="ml-3">Join Discord</span>
                        <ExternalLinkIcon />
                    </a>

                    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center max-w-4xl mx-auto">
                        <a href="https://t.me/porterplays" target="_blank" rel="noopener noreferrer" title="Telegram" aria-label="Join our Telegram channel" className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                            <HeaderTelegramIcon />
                            <span className="mt-2 text-xs font-medium">Telegram</span>
                        </a>
                        <a href="https://x.com/porterplays_" target="_blank" rel="noopener noreferrer" title="X (Twitter)" aria-label="Follow us on X (formerly Twitter)" className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                            <TwitterIcon />
                            <span className="mt-2 text-xs font-medium">X (Twitter)</span>
                        </a>
                        <a href="https://kick.com/porterplays" target="_blank" rel="noopener noreferrer" title="Kick" aria-label="Follow us on Kick" className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-slate-400 hover:text-green-400 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                            <KickIcon />
                            <span className="mt-2 text-xs font-medium">Kick</span>
                        </a>
                        <a href="https://thrill.com/?r=porterplays" target="_blank" rel="noopener noreferrer" title="Thrill Casino" aria-label="Play on Thrill Casino" className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                            <ThrillIcon />
                            <span className="mt-2 text-xs font-medium">Thrill</span>
                        </a>
                        <a href="https://www.goated.com/r/PLAYGOATED" target="_blank" rel="noopener noreferrer" title="Goated Casino" aria-label="Play on Goated Casino" className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-slate-400 hover:text-yellow-400 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                            <GoatedIcon />
                            <span className="mt-2 text-xs font-medium">Goated</span>
                        </a>
                        <a href="https://shuffle.com/?r=playShuffle" target="_blank" rel="noopener noreferrer" title="Shuffle Casino" aria-label="Play on Shuffle Casino" className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-slate-400 hover:text-purple-400 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                            <ShuffleIcon />
                            <span className="mt-2 text-xs font-medium">Shuffle</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};