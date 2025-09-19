import React from 'react';
import { ThrillLogo, GoatedLogo, ExternalLinkIcon } from './icons';

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
                
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Goated VIP Transfer - Primary */}
                    <div className="bg-gradient-to-r from-brand-highlight/10 to-brand-primary/10 p-8 rounded-2xl border border-brand-highlight/30 shadow-2xl hover:shadow-brand-highlight/20 transition-all duration-300">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <GoatedLogo className="h-16 w-auto" />
                            </div>
                            
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-3xl font-bold uppercase tracking-wide text-brand-light mb-4">
                                    Goated VIP Transfer Program
                                </h3>
                                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                                    Transfer your VIP level from competing platforms and receive VIP status + cash rewards at Goated. 
                                    Join using referral code "DISCORD" and experience premium gaming benefits.
                                </p>
                                
                                <div className="bg-slate-800/40 p-6 rounded-xl mb-6">
                                    <h4 className="text-xl font-bold text-brand-highlight mb-4">How It Works</h4>
                                    <div className="space-y-3 text-slate-300">
                                        <div className="flex items-start gap-3">
                                            <span className="text-brand-highlight font-bold">1.</span>
                                            <span>Create your account on Goated.com using referral code: <strong className="text-brand-highlight">"DISCORD"</strong></span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-brand-highlight font-bold">2.</span>
                                            <span>Transfer your VIP level from competing platforms and get rewarded with VIP status + cash reward</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-brand-highlight font-bold">3.</span>
                                            <span>Wager the corresponding amount in your first 30 days at Goated to qualify</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-brand-highlight font-bold">4.</span>
                                            <span>Contact live support → initiate VIP Transfer (ensure your stats are public)</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-brand-highlight font-bold">5.</span>
                                            <span>Submit bet link when prompted and check settings to confirm transfer</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <a
                                    href="https://www.goated.com/r/PLAYGOATED"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center bg-gradient-to-r from-brand-highlight to-brand-primary hover:from-brand-highlight/80 hover:to-brand-primary/80 transition-all duration-300 text-brand-dark font-bold py-4 px-8 rounded-xl text-lg uppercase shadow-lg hover:shadow-2xl hover:shadow-brand-highlight/30 transform hover:-translate-y-1"
                                >
                                    <span className="mr-3">Start VIP Transfer</span>
                                    <ExternalLinkIcon />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Thrill VIP Transfer - Secondary */}
                    <div className="bg-gradient-to-r from-cyan-500/10 to-slate-800/20 p-6 rounded-2xl border border-cyan-400/20 shadow-xl hover:shadow-cyan-400/10 transition-all duration-300">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-shrink-0">
                                <ThrillLogo className="h-12 w-auto" />
                            </div>
                            
                            <div className="flex-grow text-center md:text-left">
                                <h4 className="text-xl font-bold text-cyan-400 mb-3">Thrill VIP Benefits</h4>
                                <p className="text-slate-400 mb-4">
                                    Experience instant rakeback, priority support, and exclusive tournaments.
                                </p>
                                
                                <a
                                    href="https://thrill.com/?r=porterplays"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white font-semibold py-3 px-6 rounded-lg text-sm uppercase shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    <span className="mr-2">Join Thrill</span>
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