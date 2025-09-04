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
                <div className="bg-slate-800/60 p-8 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-center">
                    {React.cloneElement(logo, { className: 'h-16 w-auto' })}
                    <h2 className={`text-3xl font-extrabold uppercase tracking-wider mt-6`}>
                        <span className={accentTextColor}>{prizePool}</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-md mx-auto">This tab is for official news, updates, and giveaways directly from the Porter Plays team.</p>
                </div>
            )}

            {activeTab === 'news' && (
                <div className="bg-slate-800/60 p-8 rounded-xl border border-slate-700 flex flex-col">
                    <div className="flex items-center gap-3">
                        <NewsIcon className="w-8 h-8 text-brand-primary" />
                        <h3 className="text-2xl font-bold uppercase">Latest Casino News</h3>
                    </div>
                    <p className="text-slate-400 mt-2 mb-6">
                        This section provides updates from our partner casinos. Check out the latest news from top sites like Thrill, Goated, and Shuffle to stay ahead of the game.
                    </p>
                    <ul className="space-y-4">
                        <NewsItemPlaceholder text="Thrill announces new high-stakes tournament series for September." />
                        <NewsItemPlaceholder text="Goated rolls out a new loyalty program with enhanced rewards." />
                        <NewsItemPlaceholder text="Shuffle adds three new exclusive slot providers to their platform." />
                    </ul>
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