import React, { useState, useMemo, useEffect } from 'react';
import { LeaderboardEntry, Timeframe } from '../types';
import { GoldMedal, SilverMedal, BronzeMedal } from './icons';
import { useAuth } from '../contexts/AuthContext';

interface LeaderboardProps {
  data: LeaderboardEntry[];
  topPrizes: { 1: number; 2: number; 3: number };
  otherPrizes: number[];
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

const TimeframeButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg font-bold transition-all text-sm md:text-base ${
            isActive
                ? 'bg-brand-primary text-white shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }`}
    >
        {label}
    </button>
);

const SkeletonRow: React.FC = () => (
     <div className="grid grid-cols-12 gap-4 items-center rounded-lg px-4 py-3 my-1 bg-slate-900/60">
        <div className="col-span-2 h-6 bg-slate-700/50 rounded-md animate-pulse"></div>
        <div className="col-span-5 h-6 bg-slate-700/50 rounded-md animate-pulse"></div>
        <div className="col-span-3 h-6 bg-slate-700/50 rounded-md animate-pulse"></div>
        <div className="col-span-2 h-6 bg-slate-700/50 rounded-md animate-pulse"></div>
    </div>
);

const LeaderboardSkeleton: React.FC = () => (
    <div className="p-1">
        <div className="bg-slate-800/50 rounded-xl p-2 md:p-4">
            <div className="grid grid-cols-12 gap-4 text-slate-400 uppercase text-xs md:text-sm font-bold px-4 py-2 border-b-2 border-slate-700/50 mb-2">
                <div className="col-span-2">Rank</div>
                <div className="col-span-5">Username</div>
                <div className="col-span-3 text-right">Wagered</div>
                <div className="col-span-2 text-right">Prize</div>
            </div>
            {Array.from({ length: 15 }).map((_, i) => <SkeletonRow key={i} />)}
        </div>
    </div>
);


export const Leaderboard: React.FC<LeaderboardProps> = ({ data, topPrizes, otherPrizes }) => {
    const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>(Timeframe.ALL_TIME);
    const [loading, setLoading] = useState(true);
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [activeTimeframe, data]);


    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => b.wagered[activeTimeframe] - a.wagered[activeTimeframe]);
    }, [data, activeTimeframe]);

    const leaderboardToDisplay = sortedData.slice(0, 15);

    // Helper to mask the middle of a username with asterisks
    function maskUsername(name: string): string {
        if (name.length <= 2) return name;
        // Show less than 1/3 of the username (approximately 25-30%)
        const visibleChars = Math.floor(name.length * 0.3);
        const startChars = Math.ceil(visibleChars / 2);
        const endChars = Math.floor(visibleChars / 2);
        const maskLength = name.length - visibleChars;
        return name.substring(0, startChars) + '*'.repeat(maskLength) + name.substring(name.length - endChars);
    }

    return (
        <div>
            <div className="flex justify-center gap-2 md:gap-4 mb-8">
                <TimeframeButton label="Today" isActive={activeTimeframe === Timeframe.TODAY} onClick={() => setActiveTimeframe(Timeframe.TODAY)} />
                <TimeframeButton label="This Week" isActive={activeTimeframe === Timeframe.WEEK} onClick={() => setActiveTimeframe(Timeframe.WEEK)} />
                <TimeframeButton label="This Month" isActive={activeTimeframe === Timeframe.MONTH} onClick={() => setActiveTimeframe(Timeframe.MONTH)} />
                <TimeframeButton label="All Time" isActive={activeTimeframe === Timeframe.ALL_TIME} onClick={() => setActiveTimeframe(Timeframe.ALL_TIME)} />
            </div>

            {loading ? <LeaderboardSkeleton /> : (
                <div className="p-1 rounded-xl border border-brand-primary/20 shadow-[0_0_40px_rgba(89,86,255,0.3)] animate-pulse-glow" style={{animationIterationCount: 1, animationDuration: '3s'}}>
                    <div className="bg-slate-800/50 rounded-xl p-2 md:p-4">
                        <div className="grid grid-cols-12 gap-4 text-slate-400 uppercase text-xs md:text-sm font-bold px-4 py-2 border-b-2 border-slate-700/50 mb-2">
                            <div className="col-span-2">Rank</div>
                            <div className="col-span-5">Username</div>
                            <div className="col-span-3 text-right">Wagered</div>
                            <div className="col-span-2 text-right">Prize</div>
                        </div>
                        {leaderboardToDisplay.map((player, index) => {
                            const rank = index + 1;
                            const isCurrentUser = isLoggedIn && user?.name === player.name;
                            
                            const prize = rank <= 3
                                ? topPrizes[rank as keyof typeof topPrizes]
                                : otherPrizes[index - 3];

                            let rowClasses = 'grid grid-cols-12 gap-4 items-center hover:bg-slate-700/80 transition-all duration-200 rounded-lg px-4 py-3 my-1 transform hover:scale-[1.02]';

                            if (isCurrentUser) {
                                rowClasses += ' bg-brand-highlight/10 ring-2 ring-brand-highlight/80 animate-pulse-glow';
                            } else {
                                rowClasses += index % 2 === 0 ? ' bg-slate-900/60' : ' bg-slate-900/30';
                                if (rank === 1) rowClasses += ' shadow-[0_0_25px_rgba(251,191,36,0.6)] ring-1 ring-amber-400/50';
                                if (rank === 2) rowClasses += ' shadow-[0_0_20px_rgba(148,163,184,0.5)] ring-1 ring-slate-400/50';
                                if (rank === 3) rowClasses += ' shadow-[0_0_20px_rgba(205,127,50,0.5)] ring-1 ring-amber-700/50';
                            }
                            
                            const rankDisplay = (
                                <div className="flex items-center gap-2">
                                    {rank === 1 && <GoldMedal className="w-6 h-6" />}
                                    {rank === 2 && <SilverMedal className="w-6 h-6" />}
                                    {rank === 3 && <BronzeMedal className="w-6 h-6" />}
                                    <span className="font-bold text-lg text-slate-300">#{rank}</span>
                                </div>
                            );

                            return (
                                <div key={player.uid} className={rowClasses}>
                                    <div className="col-span-2">{rankDisplay}</div>
                                    <div className="col-span-5 font-semibold text-base truncate">{maskUsername(player.name)}</div>
                                    <div className="col-span-3 text-right font-bold text-lg text-brand-highlight">{formatCurrency(player.wagered[activeTimeframe])}</div>
                                    <div className="col-span-2 text-right font-bold text-slate-300">{prize ? `$${prize.toLocaleString()}` : '-'}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};