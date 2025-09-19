import React from 'react';
import { ThrillLogo, ExternalLinkIcon } from './icons';

export const VipTransferSection: React.FC = () => {
    return (
        <section className="py-20 md:py-24 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider">
                        VIP <span className="text-brand-highlight">Transfer Highlight</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                        Exclusive VIP transfer opportunities and premium benefits for our elite players.
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-brand-primary/10 p-8 rounded-2xl border border-cyan-400/30 shadow-2xl hover:shadow-cyan-400/20 transition-all duration-300">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <ThrillLogo className="h-16 w-auto" />
                            </div>
                            
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-3xl font-bold uppercase tracking-wide text-brand-light mb-4">
                                    Thrill VIP Transfer Program
                                </h3>
                                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                                    Experience exclusive VIP treatment with instant rakeback, priority support, and seamless account transfers. 
                                    Join Thrill's elite community and unlock premium benefits designed for high-value players.
                                </p>
                                
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                        <span className="text-slate-300">Instant rakeback rewards</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                        <span className="text-slate-300">Priority VIP support</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                        <span className="text-slate-300">Seamless account migration</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                        <span className="text-slate-300">Exclusive VIP tournaments</span>
                                    </div>
                                </div>
                                
                                <a
                                    href="https://thrill.com/?r=porterplays"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-brand-primary hover:from-cyan-600 hover:to-brand-primary/80 transition-all duration-300 text-white font-bold py-4 px-8 rounded-xl text-lg uppercase shadow-lg hover:shadow-2xl hover:shadow-cyan-400/30 transform hover:-translate-y-1"
                                >
                                    <span className="mr-3">Start VIP Transfer</span>
                                    <ExternalLinkIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};