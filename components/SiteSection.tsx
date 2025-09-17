import React, { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { Countdown } from './Countdown';
import { Leaderboard } from './Leaderboard';
import { ExternalLinkIcon, NewsIcon } from './icons';

interface SiteSectionProps {
  id: string;
  logo: React.ReactElement<{ className?: string }>;
  description: string;
  prizePool: string;
  playUrl?: string;
  leaderboardData?: LeaderboardEntry[];
  topPrizes?: { 1: number; 2: number; 3: number };
  otherPrizes?: number[];
  endDate?: Date;
  accentTextColor: string; 
}

const NewsItemPlaceholder: React.FC<{ text: string }> = ({ text }) => (
    <li className="flex items-start gap-3">
        <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
        <span className="text-slate-400">{text}</span>
    </li>
);

const UpdatesTabButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
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
            <span className={`absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-t-full`}></span>
        )}
    </button>
);


export const SiteSection: React.FC<SiteSectionProps> = ({
  id,
  logo,
  description,
  prizePool,
  playUrl,
  leaderboardData,
  topPrizes,
  otherPrizes,
  endDate,
  accentTextColor
}) => {
  // A section is considered a leaderboard section if it has data or is in a "coming soon" state (indicated by having topPrizes)
  const isLeaderboardSection = !!(leaderboardData || topPrizes);
  const [activeTab, setActiveTab] = useState('announcements');

  // New layout for non-leaderboard sections like Announcements
  if (!isLeaderboardSection) {
    return (
      <section id={id} className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-5xl mx-auto mb-16">
                <h2 className="text-5xl md:text-6xl font-extrabold uppercase tracking-wider mb-6">
                    Official <span className="bg-gradient-to-r from-brand-primary to-brand-highlight bg-clip-text text-transparent">Updates & News</span>
                </h2>
                <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">{description}</p>
            </div>
            
            <div className="flex justify-center mb-16">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setActiveTab('announcements')}
                            className={`px-6 md:px-8 py-4 font-bold text-lg transition-all duration-300 rounded-xl relative overflow-hidden ${
                                activeTab === 'announcements'
                                    ? 'text-brand-primary shadow-lg bg-slate-700/50'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                        >
                            Porter Plays Announcements
                            {activeTab === 'announcements' && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-t-full"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('news')}
                            className={`px-6 md:px-8 py-4 font-bold text-lg transition-all duration-300 rounded-xl relative overflow-hidden ${
                                activeTab === 'news'
                                    ? 'text-brand-highlight shadow-lg bg-slate-700/50'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                        >
                            Latest Casino News
                            {activeTab === 'news' && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-highlight rounded-t-full"></div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            
            {activeTab === 'announcements' && (
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-12 md:p-16 rounded-3xl border border-slate-600/50 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-brand-primary/20 to-brand-highlight/20 rounded-full blur-3xl opacity-50"></div>
                    <div className="relative z-10">
                        <div className="w-32 h-32 bg-gradient-to-br from-brand-primary/20 to-brand-highlight/20 rounded-3xl flex items-center justify-center border border-brand-primary/30 shadow-lg shadow-brand-primary/25 mb-8">
                            {React.cloneElement(logo, { className: 'h-20 w-auto' })}
                        </div>
                        <h3 className={`text-4xl md:text-5xl font-extrabold uppercase tracking-wider mb-6 ${accentTextColor}`}>
                            {prizePool}
                        </h3>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            This tab is for <span className="text-brand-highlight font-semibold">official news, updates, and giveaways</span> directly from the Porter Plays team.
                        </p>
                        
                        <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                            <div className="flex items-center justify-center gap-2 text-slate-400">
                                <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
                                <span className="font-medium">Follow our social channels for the latest updates</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'news' && (
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-10 md:p-12 rounded-3xl border border-slate-600/50 shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand-highlight/20 to-brand-primary/20 rounded-xl flex items-center justify-center border border-brand-highlight/30">
                            <NewsIcon className="w-6 h-6 text-brand-highlight" />
                        </div>
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">Latest Casino News</h3>
                            <p className="text-slate-400 mt-1">
                                Updates from our partner casinos and the gaming industry
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid gap-6">
                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-brand-primary/50 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-3 h-3 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-lg text-cyan-400 mb-2">Thrill Casino</h4>
                                    <p className="text-slate-300">New high-stakes tournament series launching this month with enhanced prize pools and exclusive VIP rewards.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-brand-highlight/50 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-3 h-3 rounded-full bg-brand-highlight mt-2 flex-shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-lg text-brand-highlight mb-2">Goated Casino</h4>
                                    <p className="text-slate-300">Revolutionary loyalty program rollout featuring tiered benefits and platform-exclusive bonuses for active players.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-green-400/50 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-3 h-3 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-lg text-green-400 mb-2">Shuffle Casino</h4>
                                    <p className="text-slate-300">Platform expansion includes three premium slot providers and innovative gameplay mechanics for enhanced user experience.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-2 bg-slate-700/50 rounded-full px-4 py-2 border border-slate-600/50">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm text-slate-300 font-medium">Updated regularly with fresh casino insights</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </section>
    );
  }

  // Original layout for leaderboard sections, with Telegram embed removed
  return (
    <section id={id} className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
                <div className={`text-4xl font-bold ${accentTextColor}`}>{prizePool}</div>
                <p className="mt-4 text-slate-300">{description}</p>
                {playUrl && (
                  <a
                      href={playUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full sm:w-auto bg-brand-primary hover:bg-opacity-80 transition-all duration-300 text-white font-bold py-3 px-8 rounded-lg text-lg uppercase flex items-center justify-center"
                  >
                      Play Now <ExternalLinkIcon />
                  </a>
                )}
            </div>
            <div className="md:col-span-2">
                <div className="flex justify-center mb-8">
                  {React.cloneElement(logo, { className: 'h-16 w-auto' })}
                </div>

                {endDate && <div className="mb-8"><Countdown targetDate={endDate} /></div>}
                
                {leaderboardData && topPrizes && otherPrizes ? (
                    <Leaderboard data={leaderboardData} topPrizes={topPrizes} otherPrizes={otherPrizes} />
                ) : topPrizes ? (
                    <div className="bg-slate-800/60 p-8 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-center h-96">
                        <h3 className="text-3xl font-bold">Leaderboard Coming Soon!</h3>
                        <p className="text-slate-300 mt-2">Check back later for updates on the next competition.</p>
                    </div>
                ): null}
            </div>
        </div>
      </div>
    </section>
  );
};