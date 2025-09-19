import React, { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { Countdown } from './Countdown';
import { Leaderboard } from './Leaderboard';
import { ExternalLinkIcon, NewsIcon, ThrillLogo, GoatedLogo, ShuffleLogo } from './icons';

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

  // Force updates page to use original layout instead of the new tabbed layout
  const useOriginalLayout = isLeaderboardSection || id === 'updates';

  // New layout for non-leaderboard sections like Announcements (except updates page)
  if (!useOriginalLayout) {
    return (
      <section id={id} className="py-20 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider">
                    Official <span className="text-brand-primary">Updates & News</span>
                </h2>
                <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">{description}</p>
            </div>
            <div className="flex justify-center border-b border-slate-800 mb-8">
                <UpdatesTabButton
                    label="Porter Plays Announcements"
                    isActive={activeTab === 'announcements'}
                    onClick={() => setActiveTab('announcements')}
                />
                <UpdatesTabButton
                    label="Latest Casino News"
                    isActive={activeTab === 'news'}
                    onClick={() => setActiveTab('news')}
                />
            </div>
            
            {activeTab === 'announcements' && (
                <div className="bg-slate-800/60 p-8 rounded-xl border border-slate-700">
                    <div className="flex flex-col items-center text-center mb-8">
                        {React.cloneElement(logo, { className: 'h-16 w-auto' })}
                        <h2 className={`text-3xl font-extrabold uppercase tracking-wider mt-6`}>
                            <span className={accentTextColor}>{prizePool}</span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-md mx-auto">Stay up to date with the latest Porter Plays community announcements and exclusive opportunities.</p>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-brand-highlight/10 to-brand-primary/10 p-6 rounded-lg border border-brand-highlight/20">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-brand-highlight mt-2 flex-shrink-0 animate-pulse"></div>
                                <div>
                                    <h4 className="text-xl font-bold text-brand-highlight mb-2">New VIP Transfer Program Launched!</h4>
                                    <p className="text-slate-300 mb-3">We've partnered with Thrill to offer exclusive VIP transfer benefits for our community members. Experience instant rakeback and premium support.</p>
                                    <span className="text-sm text-brand-primary font-semibold">Posted: January 2025</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-slate-700/20 to-slate-600/20 p-6 rounded-lg border border-slate-600/30">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                                <div>
                                    <h4 className="text-xl font-bold text-brand-light mb-2">Community Growth Milestone Reached</h4>
                                    <p className="text-slate-300 mb-3">Porter Plays community has reached over 10,000 active members across Discord and social platforms! Thank you for being part of our journey.</p>
                                    <span className="text-sm text-brand-primary font-semibold">Posted: January 2025</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-slate-700/20 to-slate-600/20 p-6 rounded-lg border border-slate-600/30">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                                <div>
                                    <h4 className="text-xl font-bold text-brand-light mb-2">Enhanced Leaderboard System</h4>
                                    <p className="text-slate-300 mb-3">Our leaderboard tracking system has been upgraded with real-time updates and improved accuracy across all partner casinos.</p>
                                    <span className="text-sm text-brand-primary font-semibold">Posted: December 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'news' && (
                <div className="bg-slate-800/60 p-8 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-6">
                        <NewsIcon className="w-8 h-8 text-brand-primary" />
                        <h3 className="text-2xl font-bold uppercase">Latest Casino News</h3>
                    </div>
                    <p className="text-slate-400 mb-8">
                        Stay informed with the latest updates from our partner casinos. Each platform offers unique opportunities and exciting developments.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-cyan-500/10 to-slate-700/20 p-6 rounded-lg border border-cyan-400/20">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <ThrillLogo className="h-8 w-auto" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-lg font-bold text-cyan-400 mb-2">Thrill VIP Program Expansion</h4>
                                    <p className="text-slate-300 mb-3">Thrill announces enhanced VIP transfer benefits including instant rakeback, priority support, and exclusive tournament access for high-value players.</p>
                                    <span className="text-sm text-cyan-300 font-semibold">Updated: January 2025</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-brand-highlight/10 to-slate-700/20 p-6 rounded-lg border border-brand-highlight/20">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <GoatedLogo className="h-8 w-auto" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-lg font-bold text-brand-highlight mb-2">Goated Loyalty Rewards Update</h4>
                                    <p className="text-slate-300 mb-3">New tiered loyalty program launched with enhanced rewards, weekly bonuses, and exclusive perks for Porter Plays community members using code 'PORTER'.</p>
                                    <span className="text-sm text-brand-highlight font-semibold">Updated: January 2025</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-green-500/10 to-slate-700/20 p-6 rounded-lg border border-green-400/20">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <ShuffleLogo className="h-8 w-auto" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-lg font-bold text-green-400 mb-2">Shuffle Platform Expansion</h4>
                                    <p className="text-slate-300 mb-3">Three new exclusive slot providers added to the platform, featuring innovative gameplay mechanics and competitive RTP rates for all skill levels.</p>
                                    <span className="text-sm text-green-300 font-semibold">Updated: December 2024</span>
                                </div>
                            </div>
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