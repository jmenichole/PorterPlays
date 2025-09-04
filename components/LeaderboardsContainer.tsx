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
        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider">
                       Climb The <span className="text-brand-primary">Ranks</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                        Compete on our partner sites for cash prizes and bragging rights. Select a leaderboard to view your standing.
                    </p>
                </div>
                
                <div className="flex justify-center border-b border-slate-800 my-12">
                    {leaderboardTabs.map(tab => (
                        <TabButton
                            key={tab.id}
                            label={tab.label}
                            isActive={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            accentBgClass={tab.accentBgClass}
                        />
                    ))}
                </div>

                {activeTabData && (
                    <div key={activeTabData.id}>
                        <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center mb-12">
                            <div className="md:col-span-1 flex justify-center">
                                {React.cloneElement(activeTabData.logo, { className: 'h-16 w-auto' })}
                            </div>
                            <div className="md:col-span-2 text-center md:text-left">
                                <h3 className={`text-4xl font-bold ${activeTabData.accentTextClass}`}>{activeTabData.prizePool}</h3>
                                <p className="mt-2 text-slate-300">{activeTabData.description}</p>
                                 <a
                                    href={activeTabData.playUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`mt-4 inline-flex items-center justify-center bg-brand-primary hover:bg-opacity-80 transition-all duration-300 text-white font-bold py-3 px-8 rounded-lg text-lg uppercase transform hover:-translate-y-1 hover:shadow-lg ${activeTabData.shadowClass}`}
                                >
                                    Play Now <ExternalLinkIcon />
                                </a>
                            </div>
                        </div>

                        {activeTabData.endDate && (
                            <div className="mb-8">
                                <h4 className="text-center text-xl font-bold uppercase text-slate-400 mb-4">Competition Ends In</h4>
                                <Countdown targetDate={activeTabData.endDate} />
                            </div>
                        )}
                        
                        {activeTabData.leaderboardData ? (
                            <Leaderboard data={activeTabData.leaderboardData} topPrizes={activeTabData.topPrizes} otherPrizes={activeTabData.otherPrizes} />
                        ) : (
                            <div className="bg-slate-800/60 p-8 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-center h-96">
                                <h3 className="text-3xl font-bold">Leaderboard Coming Soon!</h3>
                                <p className="text-slate-300 mt-2">Check back later for updates on the next competition.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};