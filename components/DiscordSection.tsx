import React from 'react';
import { DiscordIcon, ExternalLinkIcon } from './icons';

export const DiscordSection: React.FC = () => {
    return (
        <section id="community" className="container mx-auto px-4 py-16 md:py-24">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-10 md:p-16 rounded-3xl border border-slate-600/50 flex flex-col lg:flex-row items-center text-center lg:text-left gap-10 shadow-2xl max-w-6xl mx-auto relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-[#5865F2]/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-brand-highlight/20 to-transparent rounded-full blur-3xl"></div>
                
                <div className="relative z-10 flex-shrink-0 mb-6 lg:mb-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#5865F2]/20 to-[#4752C4]/20 rounded-3xl flex items-center justify-center border border-[#5865F2]/30 shadow-lg shadow-[#5865F2]/25">
                        <DiscordIcon />
                    </div>
                </div>
                
                <div className="flex-grow relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider mb-6">
                        Join the <span className="bg-gradient-to-r from-brand-highlight to-[#5865F2] bg-clip-text text-transparent">Porter Plays Community Hub</span>
                    </h2>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                        Connect with the heart of our community. The official Discord is your go-to for <span className="text-brand-highlight font-semibold">support, strategy discussions, and celebrating wins</span>.
                    </p>
                    
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
                        <a
                            href="https://discord.gg/porterplays"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3C4142] transition-all duration-300 text-white font-bold py-4 px-10 rounded-xl text-lg uppercase flex items-center justify-center gap-3 shadow-lg shadow-[#5865F2]/25 hover:shadow-[#5865F2]/40 hover:scale-105"
                        >
                            <DiscordIcon />
                            <span>Join Discord</span>
                            <ExternalLinkIcon />
                        </a>
                        
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-400 font-medium">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>500+ Active Members</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};