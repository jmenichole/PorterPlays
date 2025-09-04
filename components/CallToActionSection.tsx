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
        <section id="cta" className="py-20 md:py-24">
            <div className="container mx-auto px-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 md:p-12 text-center shadow-[0_0_30px_rgba(92,255,193,0.1)]">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-primary">
                        New to Porter Plays?
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider mt-2">
                        Claim Your Exclusive <span className="text-brand-highlight">Sign-Up Bonuses</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                        Get started on our partner sites with special welcome offers. Using our codes is the best way to get extra value on your first deposit and directly support the Porter Plays community.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                        {sites.map(site => (
                             <div key={site.name} className={`bg-slate-900/50 p-6 rounded-xl border-2 border-slate-700 transition-all duration-300 flex flex-col items-center text-center shadow-lg ${site.glowColor} transform hover:-translate-y-2`}>
                                {site.logo}
                                <div className="my-4">
                                    <span className="text-slate-400 mr-2 uppercase text-sm">Use code:</span>
                                    <span className={`${site.accentColor.replace('border-','text-')} font-bold text-xl tracking-widest`}>{site.code}</span>
                                </div>
                                <a
                                    href={site.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto w-full bg-brand-primary hover:bg-opacity-80 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg text-lg uppercase flex items-center justify-center"
                                >
                                    Play Now <ExternalLinkIcon />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};