import React from 'react';
import { DiscordIcon, ExternalLinkIcon } from './icons';

export const DiscordSection: React.FC = () => {
    return (
        <section id="community" className="container mx-auto px-4 pt-10 pb-12 md:pb-20">
            <div className="bg-slate-800/60 p-8 rounded-xl border border-slate-700 flex flex-col md:flex-row items-center text-center md:text-left gap-8 shadow-lg max-w-4xl mx-auto">
                <DiscordIcon />
                <div className="flex-grow">
                    <h2 className="text-3xl font-bold">Join the <span className="text-brand-highlight">Porter Plays Community Hub</span></h2>
                    <p className="text-slate-300 mt-2">Connect with the heart of our community. The official Discord is your go-to for support, strategy discussions, and celebrating wins.</p>
                </div>
                 <a
                    href="https://discord.gg/porterplays"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#5865F2] hover:bg-opacity-80 transition-all duration-300 text-white font-bold py-3 px-8 rounded-lg text-lg uppercase flex items-center justify-center flex-shrink-0"
                >
                    Join Discord <ExternalLinkIcon />
                </a>
            </div>
        </section>
    );
};