import React from 'react';
import { DiscordIcon, HeaderTelegramIcon, TwitterIcon, KickIcon, ExternalLinkIcon } from './icons';

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

                    <div className="mt-10 flex justify-center items-center gap-6">
                        <a href="https://t.me/porterplays" target="_blank" rel="noopener noreferrer" title="Telegram" aria-label="Join our Telegram channel" className="text-slate-400 hover:text-brand-light transition-colors"><HeaderTelegramIcon /></a>
                        <a href="https://x.com/porterplays_" target="_blank" rel="noopener noreferrer" title="X (Twitter)" aria-label="Follow us on X (formerly Twitter)" className="text-slate-400 hover:text-brand-light transition-colors"><TwitterIcon /></a>
                        <a href="https://kick.com/porterplays" target="_blank" rel="noopener noreferrer" title="Kick" aria-label="Follow us on Kick" className="text-slate-400 hover:text-brand-light transition-colors"><KickIcon /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};