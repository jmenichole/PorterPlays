import React from 'react';
import { ExternalLinkIcon, GoatedLogo, ThrillLogo, ShuffleLogo } from './icons';

const sites = [
    { 
        name: 'Thrill', 
        code: 'porterplays', 
        url: 'https://thrill.com/?r=porterplays', 
        logo: <ThrillLogo className="h-10 w-auto" />, 
        accentColor: 'border-cyan-400',
        glowColor: 'hover:shadow-cyan-400/30'
    },
    { 
        name: 'Goated', 
        code: 'PLAYGOATED', 
        url: 'https://www.goated.com/r/PLAYGOATED', 
        logo: <GoatedLogo className="h-10 w-auto" />, 
        accentColor: 'border-brand-highlight',
        glowColor: 'hover:shadow-brand-highlight/30'
    },
    { 
        name: 'Shuffle', 
        code: 'playShuffle', 
        url: 'https://shuffle.com/?r=playShuffle', 
        logo: <ShuffleLogo className="h-10 w-auto" />,
        accentColor: 'border-green-400',
        glowColor: 'hover:shadow-green-400/30'
    }
];

export const CallToActionSection: React.FC = () => {
    return (
        <section id="cta" className="py-24 md:py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-brand-highlight/5 blur-3xl"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-600/50 rounded-3xl p-10 md:p-16 text-center shadow-2xl shadow-brand-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-brand-primary/20 to-brand-highlight/20 rounded-full blur-3xl opacity-50"></div>
                    
                    <div className="relative z-10">
                        <div className="inline-block bg-gradient-to-r from-brand-primary/20 to-brand-highlight/20 rounded-full px-6 py-2 border border-brand-primary/30 mb-6">
                            <span className="text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-brand-primary to-brand-highlight bg-clip-text text-transparent">
                                New to Porter Plays?
                            </span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wider mb-8">
                            Claim Your Exclusive <span className="bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent">Sign-Up Bonuses</span>
                        </h2>
                        
                        <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-16 leading-relaxed">
                            Get started on our partner sites with special welcome offers. Using our codes is the best way to get <span className="text-brand-highlight font-semibold">extra value</span> on your first deposit and directly support the Porter Plays community.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {sites.map(site => (
                                <div key={site.name} className={`bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-8 rounded-2xl border-2 ${site.accentColor}/50 transition-all duration-500 flex flex-col items-center text-center shadow-2xl ${site.glowColor} hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden group`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="relative z-10 w-full">
                                        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                            {site.logo}
                                        </div>
                                        
                                        <div className="mb-8">
                                            <span className="block text-slate-400 uppercase text-sm font-medium mb-2 tracking-wider">Use code:</span>
                                            <div className={`inline-block bg-gradient-to-r ${site.accentColor.replace('border-','from-')}/20 ${site.accentColor.replace('border-','to-')}/10 rounded-lg px-4 py-2 border ${site.accentColor}/30`}>
                                                <span className={`${site.accentColor.replace('border-','text-')} font-bold text-xl tracking-widest`}>{site.code}</span>
                                            </div>
                                        </div>
                                        
                                        <a
                                            href={site.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-gradient-to-r from-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:to-brand-primary/70 transition-all duration-300 text-brand-dark font-bold py-4 px-6 rounded-xl text-lg uppercase flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 group"
                                        >
                                            <span>Play Now</span>
                                            <ExternalLinkIcon />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};