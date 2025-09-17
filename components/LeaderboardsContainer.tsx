import React, { useState } from 'react';
import { Leaderboard } from './Leaderboard';
import { Countdown } from './Countdown';
import { leaderboardData } from '../data/leaderboardData';
import { goatedLeaderboardData } from '../data/goatedLeaderboardData';
import { GoatedLogo, ThrillLogo, ShuffleLogo, ExternalLinkIcon } from './icons';
import { LeaderboardEntry } from '../types';

type LeaderboardTabId = 'thrill' | 'goated' | 'shuffle';

interface LeaderboardTab {
    id: LeaderboardTabId;
    label: string;
    // FIX: Updated logo prop type to be more specific, allowing `className` to be passed via React.cloneElement.
    logo: React.ReactElement<{ className?: string }>;
    prizePool: string;
    description: string;
    playUrl: string;
    leaderboardData?: LeaderboardEntry[];
    topPrizes: { 1: number; 2: number; 3: number };
    otherPrizes: number[];
    endDate?: Date;
    accentBgClass: string;
    accentTextClass: string;
    shadowClass: string;
}

const thrillPrizes = {
    top: { 1: 1800, 2: 1000, 3: 500 },
    other: [300, 200, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120]
};

const goatedPrizes = {
    top: { 1: 400, 2: 200, 3: 100 },
    other: [75, 50, 20, 20, 20, 20, 20, 15, 15, 15, 15, 15]
};

const shufflePrizes = {
    top: { 1: 0, 2: 0, 3: 0 },
    other: Array(12).fill(0)
};

const leaderboardTabs: LeaderboardTab[] = [
    {
        id: 'thrill',
        label: 'Thrill',
        logo: <ThrillLogo />,
        prizePool: '$5,000',
        description: 'Engage in our premier competition, featuring the largest prize pool. Every wager is a step towards victory.',
        playUrl: 'https://thrill.com/?r=porterplays',
        leaderboardData: leaderboardData,
        topPrizes: thrillPrizes.top,
        otherPrizes: thrillPrizes.other,
        endDate: new Date('2024-09-10T23:59:59'),
        accentBgClass: 'bg-cyan-400',
        accentTextClass: 'text-cyan-400',
        shadowClass: 'hover:shadow-cyan-400/40',
    },
    {
        id: 'goated',
        label: 'Goated',
        logo: <GoatedLogo />,
        prizePool: '$1,000',
        description: 'Rise to the challenge in a fresh arena. A new leaderboard offers another chance to claim victory and prove your skill.',
        playUrl: 'https://www.goated.com/r/PLAYGOATED',
        leaderboardData: goatedLeaderboardData,
        topPrizes: goatedPrizes.top,
        otherPrizes: goatedPrizes.other,
        accentBgClass: 'bg-brand-highlight',
        accentTextClass: 'text-brand-highlight',
        shadowClass: 'hover:shadow-brand-highlight/40',
    },
    {
        id: 'shuffle',
        label: 'Shuffle',
        logo: <ShuffleLogo />,
        prizePool: 'Leaderboard',
        description: 'Anticipation is building for the next Shuffle leaderboard. Follow our socials for exclusive announcements.',
        playUrl: 'https://shuffle.com/?r=playShuffle',
        topPrizes: shufflePrizes.top,
        otherPrizes: shufflePrizes.other,
        accentBgClass: 'bg-green-400',
        accentTextClass: 'text-green-400',
        shadowClass: 'hover:shadow-green-400/40',
    }
];

const TabButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
    accentBgClass: string;
}> = ({ label, isActive, onClick, accentBgClass }) => (
    <button
        onClick={onClick}
        className={`px-4 md:px-6 py-3 font-bold text-lg transition-all duration-300 focus:outline-none relative ${
            isActive
                ? 'text-white'
                : 'text-slate-400 hover:text-white'
        }`}
    >
        {label}
        {isActive && (
            <span className={`absolute bottom-0 left-0 right-0 h-1 ${accentBgClass} rounded-t-full`}></span>
        )}
    </button>
);

export const LeaderboardsContainer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<LeaderboardTabId>('thrill');
    const activeTabData = leaderboardTabs.find(tab => tab.id === activeTab);

    return (
        <section className="py-24 md:py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-5xl mx-auto mb-16">
                    <h2 className="text-5xl md:text-6xl font-extrabold uppercase tracking-wider mb-6">
                       Climb The <span className="bg-gradient-to-r from-brand-primary to-brand-highlight bg-clip-text text-transparent">Ranks</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Compete on our partner sites for <span className="text-brand-highlight font-semibold">cash prizes</span> and bragging rights. Select a leaderboard to view your standing.
                    </p>
                </div>
                
                <div className="flex justify-center mb-16">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50">
                        <div className="flex space-x-1">
                            {leaderboardTabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 md:px-8 py-4 font-bold text-lg transition-all duration-300 rounded-xl relative overflow-hidden ${
                                        activeTab === tab.id
                                            ? `${tab.accentTextClass} shadow-lg bg-slate-700/50`
                                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                    }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <div className={`absolute bottom-0 left-0 right-0 h-1 ${tab.accentBgClass} rounded-t-full`}></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {activeTabData && (
                    <div key={activeTabData.id} className="animate-fade-in">
                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-16">
                            <div className="lg:col-span-1 flex justify-center">
                                <div className={`p-8 rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-600/50 shadow-2xl backdrop-blur-sm`}>
                                    {React.cloneElement(activeTabData.logo, { className: 'h-20 w-auto' })}
                                </div>
                            </div>
                            <div className="lg:col-span-2 text-center lg:text-left">
                                <div className="mb-6">
                                    <div className="inline-block bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-full px-4 py-2 border border-slate-600/50 mb-4">
                                        <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">Prize Pool</span>
                                    </div>
                                    <h3 className={`text-5xl md:text-6xl font-extrabold ${activeTabData.accentTextClass} mb-4`}>
                                        {activeTabData.prizePool}
                                    </h3>
                                </div>
                                <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                                    {activeTabData.description}
                                </p>
                                <a
                                    href={activeTabData.playUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center justify-center bg-gradient-to-r from-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:to-brand-primary/70 transition-all duration-300 text-brand-dark font-bold py-4 px-10 rounded-xl text-lg uppercase transform hover:-translate-y-2 hover:scale-105 shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 gap-3`}
                                >
                                    <span>Play Now</span>
                                    <ExternalLinkIcon />
                                </a>
                            </div>
                        </div>

                        {activeTabData.endDate && (
                            <div className="mb-12">
                                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 text-center shadow-lg">
                                    <h4 className="text-2xl font-bold uppercase text-slate-300 mb-6 tracking-wider">Competition Ends In</h4>
                                    <Countdown targetDate={activeTabData.endDate} />
                                </div>
                            </div>
                        )}
                        
                        {activeTabData.leaderboardData ? (
                            <Leaderboard data={activeTabData.leaderboardData} topPrizes={activeTabData.topPrizes} otherPrizes={activeTabData.otherPrizes} />
                        ) : (
                            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-12 md:p-16 rounded-3xl border border-slate-600/50 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-brand-primary/20 to-brand-highlight/20 rounded-full blur-3xl opacity-50"></div>
                                <div className="relative z-10">
                                    <div className="w-24 h-24 bg-gradient-to-br from-brand-primary/20 to-brand-highlight/20 rounded-3xl flex items-center justify-center border border-brand-primary/30 shadow-lg shadow-brand-primary/25 mb-6">
                                        <svg className="w-12 h-12 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-bold mb-4 text-slate-200">Leaderboard Coming Soon!</h3>
                                    <p className="text-xl text-slate-300 leading-relaxed">Check back later for updates on the next competition.</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};