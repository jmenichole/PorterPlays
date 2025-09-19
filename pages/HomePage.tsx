import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ThrillSection } from '../components/ThrillSection';
import { VipTransferSection } from '../components/VipTransferSection';
import { AffiliateSites } from '../components/AffiliateSites';
import { LeaderboardPreview } from '../components/LeaderboardPreview';
import { DiscordSection } from '../components/DiscordSection';
import { Feedback } from '../components/Feedback';

const HomePage: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-brand-light font-oxanium">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative text-center max-w-6xl mx-auto pt-20 md:pt-32 pb-16 md:pb-24 px-4">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent pointer-events-none"></div>
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-brand-highlight/10 to-brand-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-wider !leading-tight mb-8">
              Your Arena For <br />
              <span className="bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent">
                Competitive Play.
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Welcome to the official hub for Porter Plays leaderboards. Track your performance, 
              compete for exclusive prize pools, and secure your place at the top.
            </p>
          </div>
        </section>

        {/* New Elite Bonuses Section */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-brand-dark/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-brand-highlight/20 shadow-2xl">
              <div className="inline-block bg-gradient-to-r from-brand-highlight/20 to-brand-primary/20 border border-brand-highlight/30 rounded-full px-6 py-2 mb-6">
                <span className="text-brand-highlight font-semibold text-sm uppercase tracking-wider">
                  New to Porter Plays?
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wider !leading-tight mb-8">
                Claim Your Exclusive <br />
                <span className="bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent">
                  Elite Bonuses
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-10">
                Unlock massive welcome packages and ongoing exclusive promotions that regular players 
                can't access. Join the Porter supporter community and dominate with special challenges, 
                premium rakeback rates, and VIP treatment that puts you ahead of the competition.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <button className="bg-gradient-to-r from-brand-highlight to-brand-primary text-brand-dark px-8 py-4 rounded-xl text-lg font-bold uppercase tracking-wider hover:scale-105 transition transform shadow-lg hover:shadow-brand-highlight/25">
                  Claim Elite Status
                </button>
                <button className="border-2 border-brand-highlight text-brand-highlight px-8 py-4 rounded-xl text-lg font-bold uppercase tracking-wider hover:bg-brand-highlight hover:text-brand-dark transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <ThrillSection />
        
        <VipTransferSection />
        
        <LeaderboardPreview />

        <AffiliateSites />
        
        <DiscordSection />

      </main>
      <Footer />
      <Feedback />
    </div>
  );
};

export default HomePage;