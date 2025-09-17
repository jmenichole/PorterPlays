import React from 'react';
import { ExternalLinkIcon, GoatedLogo, ThrillLogo, ShuffleLogo } from './icons';

const sites = [
    { 
        name: 'Thrill', 
        code: 'porterplays', 
        url: 'https://thrill.com/?r=porterplays', 
        logo: <ThrillLogo className="h-16 w-auto mb-4" />, 
        accentColor: 'border-cyan-400',
        bgColor: 'bg-cyan-400/10',
        textColor: 'text-cyan-400',
        glowColor: 'hover:shadow-cyan-400/30',
        prizePool: '$5,000',
        subtitle: 'Premium Gaming Experience',
        features: [
            'Welcome Bonus Package',
            'VIP Transfer Program', 
            'Regular Cash Drops',
            'Exclusive Slot Challenges'
        ]
    },
    { 
        name: 'Goated', 
        code: 'PLAYGOATED', 
        url: 'https://www.goated.com/r/PLAYGOATED', 
        logo: <GoatedLogo className="h-16 w-auto mb-4" />, 
        accentColor: 'border-yellow-400',
        bgColor: 'bg-yellow-400/10',
        textColor: 'text-yellow-400',
        glowColor: 'hover:shadow-yellow-400/30',
        prizePool: '$2,500',
        subtitle: 'VIP Transfer Specialists',
        features: [
            '30-Day Completion Bonus',
            'Same Games & Providers',
            'Transfer from Any Casino',
            'Must use PLAYGOATED code'
        ]
    },
    { 
        name: 'Shuffle', 
        code: 'playShuffle', 
        url: 'https://shuffle.com/?r=playShuffle', 
        logo: <ShuffleLogo className="h-16 w-auto mb-4" />,
        accentColor: 'border-purple-400',
        bgColor: 'bg-purple-400/10',
        textColor: 'text-purple-400',
        glowColor: 'hover:shadow-purple-400/30',
        prizePool: '$3,000',
        subtitle: 'Crypto Gaming Platform',
        features: [
            'Instant Crypto Withdrawals',
            'Provably Fair Games',
            'VIP Rakeback Program',
            'Weekly Tournaments'
        ]
    }
];

export const CallToActionSection: React.FC = () => {
    return (
        <section id="cta" className="py-20 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-primary">
                        New to Porter Plays?
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider mt-2">
                        Claim Your Exclusive <span className="text-brand-highlight">Sign-Up Bonuses</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                        Get started on our partner sites with special welcome offers. Using our codes is the best way to get extra value on your first deposit and directly support the Porter Plays community.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {sites.map(site => (
                        <div key={site.name} className={`bg-slate-900/50 rounded-2xl border-2 ${site.accentColor} transition-all duration-300 flex flex-col shadow-2xl ${site.glowColor} transform hover:-translate-y-2 hover:scale-105`}>
                            {/* Header */}
                            <div className={`text-center py-8 px-6 ${site.bgColor} rounded-t-xl border-b border-slate-700`}>
                                {site.logo}
                                <h3 className={`text-2xl font-extrabold uppercase tracking-wider ${site.textColor} mb-2`}>
                                    {site.name}
                                </h3>
                                <p className="text-slate-300 font-semibold">{site.subtitle}</p>
                            </div>
                            
                            {/* Prize Pool */}
                            <div className={`${site.bgColor} mx-6 mt-6 rounded-lg p-4 border border-slate-700`}>
                                <div className={`${site.textColor} font-bold text-sm uppercase mb-2`}>💰 Monthly Prize Pool</div>
                                <div className="text-brand-highlight font-extrabold text-2xl">{site.prizePool}</div>
                            </div>
                            
                            {/* Features */}
                            <div className="p-6 flex-grow">
                                <ul className="space-y-3">
                                    {site.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-slate-300 font-medium">
                                            <span className={`${site.textColor} mr-3 font-bold`}>✓</span>
                                            <span className={idx === site.features.length - 1 && site.name === 'Goated' ? 'text-brand-highlight font-bold' : ''}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            {/* CTA Button */}
                            <div className="p-6 pt-0">
                                <div className="mb-4 text-center">
                                    <span className="text-slate-400 mr-2 uppercase text-sm font-medium">Use code:</span>
                                    <span className={`${site.textColor} font-bold text-xl tracking-widest`}>{site.code}</span>
                                </div>
                                <a
                                    href={site.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block w-full bg-gradient-to-r from-brand-primary to-brand-highlight hover:from-brand-highlight hover:to-brand-primary transition-all duration-300 text-white font-bold py-4 px-6 rounded-lg text-lg uppercase flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl`}
                                >
                                    🚀 Play Now <ExternalLinkIcon />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};