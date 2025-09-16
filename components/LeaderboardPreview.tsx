import React, { useMemo } from 'react';
import { leaderboardData } from '../data/leaderboardData';
import { Timeframe } from '../types';
import { GoldMedal, SilverMedal, BronzeMedal } from './icons';
import { createPath, navigateTo } from '../utils/navigation';

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
        if (rank === 1) return <GoldMedal className="w-8 h-8" />;
        if (rank === 2) return <SilverMedal className="w-8 h-8" />;
        if (rank === 3) return <BronzeMedal className="w-8 h-8" />;
        return null;
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigateTo('/leaderboards');
    };

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider">
                        Leaderboard <span className="text-brand-primary">Snapshot</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-300">
                        Here's a look at the current top contenders. Think you can beat them?
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mt-10">
                    <div className="space-y-3">
                        {topPlayers.map((player, index) => {
                            const rank = index + 1;
                            let rowClasses = 'grid grid-cols-12 gap-4 items-center transition-all duration-300 rounded-lg px-4 py-4';
                            
                            if (rank === 1) rowClasses += ' bg-amber-400/10 shadow-[0_0_25px_rgba(251,191,36,0.4)] ring-1 ring-amber-400/50';
                            if (rank === 2) rowClasses += ' bg-slate-400/10 shadow-[0_0_20px_rgba(148,163,184,0.4)] ring-1 ring-slate-400/50';
                            if (rank === 3) rowClasses += ' bg-amber-700/10 shadow-[0_0_20px_rgba(205,127,50,0.4)] ring-1 ring-amber-700/50';

                            return (
                                <div key={player.uid} className={rowClasses}>
                                    <div className="col-span-2 flex items-center gap-4">
                                        {getRankDisplay(rank)}
                                        <span className="font-bold text-xl text-slate-300 hidden sm:inline">#{rank}</span>
                                    </div>
                                    <div className="col-span-6 font-semibold text-lg truncate">{player.name}</div>
                                    <div className="col-span-4 text-right font-bold text-xl text-brand-highlight">{formatCurrency(player.wagered[Timeframe.ALL_TIME])}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center mt-10">
                    <a 
                        href={createPath('/leaderboards')}
                        onClick={handleNavClick}
                        className="inline-flex items-center justify-center bg-slate-700 hover:bg-slate-600 transition-colors text-white font-bold py-3 px-8 rounded-lg text-lg uppercase"
                    >
                        View Full Leaderboards
                    </a>
                </div>
            </div>
        </section>
    );
};