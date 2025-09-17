import React, { useMemo } from 'react';
import { leaderboardData } from '../data/leaderboardData';
import { Timeframe } from '../types';
import { GoldMedal, SilverMedal, BronzeMedal } from './icons';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

export const LeaderboardPreview: React.FC = () => {
    const topPlayers = useMemo(() => {
        return [...leaderboardData]
            .sort((a, b) => b.wagered[Timeframe.ALL_TIME] - a.wagered[Timeframe.ALL_TIME])
            .slice(0, 3);
    }, []);

    const getRankDisplay = (rank: number) => {
        if (rank === 1) return <GoldMedal className="w-10 h-10" />;
        if (rank === 2) return <SilverMedal className="w-10 h-10" />;
        if (rank === 3) return <BronzeMedal className="w-10 h-10" />;
        return null;
    };

    return (
        <section className="py-20 md:py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider mb-6">
                        Leaderboard <span className="bg-gradient-to-r from-brand-primary to-brand-highlight bg-clip-text text-transparent">Snapshot</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                        Here's a look at the current top contenders. Think you can <span className="text-brand-highlight font-semibold">beat them?</span>
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid gap-6 md:gap-8">
                        {topPlayers.map((player, index) => {
                            const rank = index + 1;
                            let cardClasses = 'relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-500 hover:scale-105 backdrop-blur-sm border-2';
                            let glowClasses = '';
                            
                            if (rank === 1) {
                                cardClasses += ' bg-gradient-to-br from-amber-400/20 via-yellow-500/10 to-amber-600/20 border-amber-400/50 shadow-2xl shadow-amber-400/25';
                                glowClasses = 'absolute inset-0 bg-gradient-to-r from-amber-400/10 to-yellow-500/10 blur-xl';
                            } else if (rank === 2) {
                                cardClasses += ' bg-gradient-to-br from-slate-400/20 via-gray-300/10 to-slate-500/20 border-slate-400/50 shadow-2xl shadow-slate-400/25';
                                glowClasses = 'absolute inset-0 bg-gradient-to-r from-slate-400/10 to-gray-300/10 blur-xl';
                            } else {
                                cardClasses += ' bg-gradient-to-br from-amber-700/20 via-orange-600/10 to-amber-800/20 border-amber-700/50 shadow-2xl shadow-amber-700/25';
                                glowClasses = 'absolute inset-0 bg-gradient-to-r from-amber-700/10 to-orange-600/10 blur-xl';
                            }

                            return (
                                <div key={player.uid} className={cardClasses}>
                                    <div className={glowClasses}></div>
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-4">
                                                {getRankDisplay(rank)}
                                                <div className="hidden sm:flex flex-col">
                                                    <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Rank</span>
                                                    <span className="text-2xl font-bold">{rank}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Player</span>
                                                <span className="text-2xl md:text-3xl font-bold">{player.name}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Total Wagered</span>
                                            <span className="text-2xl md:text-3xl font-bold text-brand-highlight">
                                                {formatCurrency(player.wagered[Timeframe.ALL_TIME])}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center mt-16">
                    <a 
                        href="/leaderboards" 
                        className="inline-flex items-center justify-center bg-gradient-to-r from-brand-primary to-brand-highlight hover:from-brand-primary/90 hover:to-brand-highlight/90 text-brand-dark font-bold py-4 px-10 rounded-xl text-lg uppercase tracking-wider transition-all duration-300 shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:scale-105"
                    >
                        View Full Leaderboards
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};