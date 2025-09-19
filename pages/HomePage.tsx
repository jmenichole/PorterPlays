import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ThrillSection } from '../components/ThrillSection';
import { VipTransferSection } from '../components/VipTransferSection';
import { LeaderboardPreview } from '../components/LeaderboardPreview';
import { DiscordSection } from '../components/DiscordSection';
import { Feedback } from '../components/Feedback';

const HomePage: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-brand-light font-oxanium">
      <Header />
      <main>
        <section className="text-center max-w-4xl mx-auto pt-20 md:pt-28 pb-10 md:pb-12 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wider !leading-tight">
            Your Arena for <span className="text-brand-highlight">Competitive Play.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Welcome to the official hub for Porter Plays leaderboards. Track your performance, compete for exclusive prize pools, and secure your place at the top.
          </p>
          <div className="mt-8">
            <button className="px-6 py-3 bg-gradient-to-r from-brand-highlight to-brand-primary rounded-xl text-lg font-semibold hover:scale-105 transition transform text-brand-dark">
              Get Started
            </button>
          </div>
        </section>
        
        <ThrillSection />
        
        <VipTransferSection />
        
        <LeaderboardPreview />
        
        <DiscordSection />

      </main>
      <Footer />
      <Feedback />
    </div>
  );
};

export default HomePage;