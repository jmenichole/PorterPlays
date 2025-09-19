import React from 'react';
import { ThrillLogo, GoatedLogo, ExternalLinkIcon } from './icons';

export const VipTransferSection: React.FC = () => {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-highlight/5 via-transparent to-brand-primary/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-highlight via-brand-primary to-brand-highlight"></div>
            
            <div className="relative container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="relative inline-block mb-6">
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight bg-gradient-to-r from-brand-highlight via-white to-brand-primary bg-clip-text text-transparent">
                            VIP Transfer
                        </h2>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-brand-highlight to-brand-primary rounded-full"></div>
                    </div>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                        Unlock exclusive benefits and seamless VIP status transfers. Experience premium gaming with instant rewards and elite support across top platforms.
                    </p>
                </div>
                
                <div className="max-w-7xl mx-auto">
                    {/* Goated VIP Transfer - Primary Card */}
                    <div className="relative mb-12 group">
                        {/* Glowing Border Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-highlight via-brand-primary to-brand-highlight rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        
                        <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-xl border border-brand-highlight/20 rounded-3xl overflow-hidden">
                            {/* Header with Logo */}
                            <div className="relative p-8 pb-6">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-highlight/10 to-transparent rounded-bl-full"></div>
                                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                                    <div className="relative">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-brand-highlight to-brand-primary rounded-2xl blur opacity-50"></div>
                                        <div className="relative bg-slate-900 p-4 rounded-2xl">
                                            <GoatedLogo className="h-16 w-auto" />
                                        </div>
                                    </div>
                                    <div className="text-center md:text-left flex-grow">
                                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-wide text-white mb-2">
                                            Goated VIP Transfer
                                        </h3>
                                        <div className="inline-flex items-center bg-brand-highlight/10 border border-brand-highlight/30 rounded-full px-4 py-2">
                                            <div className="w-2 h-2 bg-brand-highlight rounded-full mr-2 animate-pulse"></div>
                                            <span className="text-brand-highlight font-bold text-sm uppercase tracking-wide">Premium Program</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="px-8 pb-8">
                                <div className="grid lg:grid-cols-2 gap-8 items-start">
                                    {/* Description */}
                                    <div>
                                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                            Transfer your VIP level from competing platforms and receive <span className="text-brand-highlight font-semibold">VIP status + cash rewards</span> at Goated. 
                                            Join using referral code <span className="bg-brand-highlight/20 text-brand-highlight px-2 py-1 rounded font-bold">"DISCORD"</span> and experience premium gaming benefits.
                                        </p>
                                        
                                        {/* Key Benefits */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-xl">
                                                <div className="w-8 h-8 bg-gradient-to-r from-brand-highlight to-brand-primary rounded-full flex items-center justify-center">
                                                    <span className="text-slate-900 font-bold text-sm">💰</span>
                                                </div>
                                                <span className="text-slate-300 text-sm font-medium">Cash Rewards</span>
                                            </div>
                                            <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-xl">
                                                <div className="w-8 h-8 bg-gradient-to-r from-brand-highlight to-brand-primary rounded-full flex items-center justify-center">
                                                    <span className="text-slate-900 font-bold text-sm">⚡</span>
                                                </div>
                                                <span className="text-slate-300 text-sm font-medium">Instant Transfer</span>
                                            </div>
                                            <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-xl">
                                                <div className="w-8 h-8 bg-gradient-to-r from-brand-highlight to-brand-primary rounded-full flex items-center justify-center">
                                                    <span className="text-slate-900 font-bold text-sm">👑</span>
                                                </div>
                                                <span className="text-slate-300 text-sm font-medium">VIP Status</span>
                                            </div>
                                            <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-xl">
                                                <div className="w-8 h-8 bg-gradient-to-r from-brand-highlight to-brand-primary rounded-full flex items-center justify-center">
                                                    <span className="text-slate-900 font-bold text-sm">🎯</span>
                                                </div>
                                                <span className="text-slate-300 text-sm font-medium">30 Day Qualifier</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* How It Works */}
                                    <div>
                                        <div className="bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-slate-800/60 p-6 rounded-2xl border border-brand-highlight/10">
                                            <h4 className="text-xl font-bold text-brand-highlight mb-6 flex items-center gap-2">
                                                <div className="w-6 h-6 bg-brand-highlight rounded-full flex items-center justify-center">
                                                    <span className="text-slate-900 text-xs font-bold">?</span>
                                                </div>
                                                How It Works
                                            </h4>
                                            <div className="space-y-4">
                                                {[
                                                    'Create your account on Goated.com using referral code "DISCORD"',
                                                    'Transfer your VIP level from competing platforms and get rewarded with VIP status + cash reward',
                                                    'Wager the corresponding amount in your first 30 days at Goated to qualify',
                                                    'Contact live support → initiate VIP Transfer (ensure your stats are public)',
                                                    'Submit bet link when prompted and check settings to confirm transfer'
                                                ].map((step, index) => (
                                                    <div key={index} className="flex items-start gap-3 group">
                                                        <div className="w-6 h-6 bg-gradient-to-r from-brand-highlight to-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                                            <span className="text-slate-900 text-xs font-bold">{index + 1}</span>
                                                        </div>
                                                        <span className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                                                            {step}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* CTA Button */}
                                <div className="mt-8 text-center">
                                    <a
                                        href="https://www.goated.com/r/PLAYGOATED"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative inline-flex items-center justify-center bg-gradient-to-r from-brand-highlight via-brand-primary to-brand-highlight bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 text-slate-900 font-black py-4 px-12 rounded-2xl text-xl uppercase tracking-wide shadow-2xl hover:shadow-brand-highlight/50 transform hover:scale-105"
                                    >
                                        <span className="relative z-10 mr-3">Start VIP Transfer</span>
                                        <div className="relative z-10 transform group-hover:translate-x-1 transition-transform">
                                            <ExternalLinkIcon />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-brand-highlight/20 to-brand-primary/20 rounded-2xl blur group-hover:blur-md transition-all"></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thrill VIP Transfer - Secondary Card */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        
                        <div className="relative bg-slate-800/80 backdrop-blur-lg border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-xl blur opacity-50"></div>
                                    <div className="relative bg-slate-900 p-3 rounded-xl">
                                        <ThrillLogo className="h-12 w-auto" />
                                    </div>
                                </div>
                                
                                <div className="flex-grow text-center md:text-left">
                                    <h4 className="text-2xl font-bold text-cyan-400 mb-2 flex items-center justify-center md:justify-start gap-2">
                                        Thrill VIP Benefits
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                    </h4>
                                    <p className="text-slate-400 mb-4 leading-relaxed">
                                        Experience instant rakeback, priority support, and exclusive tournaments with competitive edge gaming.
                                    </p>
                                    
                                    <a
                                        href="https://thrill.com/?r=porterplays"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 transition-all duration-300 text-white font-bold py-3 px-8 rounded-xl text-sm uppercase shadow-lg hover:shadow-cyan-400/30 transform hover:-translate-y-0.5 hover:scale-105"
                                    >
                                        <span className="mr-2">Join Thrill</span>
                                        <ExternalLinkIcon />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};