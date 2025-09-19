import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LeaderboardPreview } from '../components/LeaderboardPreview';
import { AffiliateSites } from '../components/AffiliateSites';
import { DiscordSection } from '../components/DiscordSection';
import { ChatBubble } from '../components/ChatBubble';

const HomePage: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-brand-light font-oxanium">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="text-center max-w-6xl mx-auto pt-20 md:pt-32 pb-16 md:pb-20 px-6">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-brand-highlight/10 to-brand-primary/20 blur-3xl -z-10"></div>
            
            <h1 className="text-4xl md:text-7xl font-extrabold uppercase tracking-wider leading-tight mb-8">
              YOUR ARENA FOR{' '}
              <span className="bg-gradient-to-r from-brand-highlight via-brand-primary to-brand-highlight bg-clip-text text-transparent">
                COMPETITIVE PLAY.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Welcome to the official hub for Porter Plays leaderboards. Track your performance, 
              compete for exclusive prize pools, and secure your place at the top.
            </p>
          </div>
        </section>

        {/* NEW TO PORTER PLAYS Section */}
        <section className="max-w-6xl mx-auto py-16 px-6">
          <div className="bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-800/50 rounded-2xl border border-brand-highlight/20 p-8 md:p-12 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-brand-highlight/5 opacity-50"></div>
            
            <div className="relative z-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-brand-primary/20 border border-brand-primary/40 rounded-full px-4 py-2 mb-6">
                <span className="text-brand-primary text-sm font-semibold uppercase tracking-wider">
                  NEW TO PORTER PLAYS?
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Claim Your Exclusive{' '}
                <span className="bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent">
                  Elite Bonuses
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                Unlock massive welcome packages and ongoing exclusive promotions that regular players 
                can't access. Join the Porter supporter community and dominate with special challenges, 
                premium rakeback rates, and VIP treatment that puts you ahead of the competition.
              </p>

              {/* Feature highlights */}
              <div className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
                <div className="bg-brand-dark/50 rounded-xl p-6 border border-brand-highlight/10">
                  <div className="text-brand-highlight text-3xl mb-4">💰</div>
                  <h3 className="text-lg font-semibold mb-2 text-brand-light">Exclusive Welcome Packages</h3>
                  <p className="text-slate-400 text-sm">Get access to bonuses unavailable to regular players</p>
                </div>
                <div className="bg-brand-dark/50 rounded-xl p-6 border border-brand-highlight/10">
                  <div className="text-brand-highlight text-3xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold mb-2 text-brand-light">VIP Treatment</h3>
                  <p className="text-slate-400 text-sm">Premium support and exclusive tournament access</p>
                </div>
                <div className="bg-brand-dark/50 rounded-xl p-6 border border-brand-highlight/10">
                  <div className="text-brand-highlight text-3xl mb-4">🏆</div>
                  <h3 className="text-lg font-semibold mb-2 text-brand-light">Special Challenges</h3>
                  <p className="text-slate-400 text-sm">Compete in Porter-exclusive events with bigger prizes</p>
                </div>
              </div>

              <button className="px-8 py-4 bg-gradient-to-r from-brand-highlight to-brand-primary hover:from-brand-highlight/90 hover:to-brand-primary/90 text-brand-dark font-bold rounded-xl text-lg transition-all hover:scale-105 transform shadow-lg">
                Get Started Now
              </button>
            </div>
          </div>
        </section>

        <LeaderboardPreview />
        <AffiliateSites />
        <DiscordSection />
      </main>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default HomePage;