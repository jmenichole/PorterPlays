import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CallToActionSection } from '../components/CallToActionSection';
import { LeaderboardPreview } from '../components/LeaderboardPreview';
import { DiscordSection } from '../components/DiscordSection';
import { Feedback } from '../components/Feedback';

const HomePage: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-brand-light font-oxanium overflow-hidden">
      <Header />
      <main>
        <section className="text-center max-w-4xl mx-auto pt-20 md:pt-28 pb-10 md:pb-12 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-wider !leading-tight">
            Your Arena for <span className="text-brand-highlight">Competitive Play.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Welcome to the official hub for Porter Plays leaderboards. Track your performance, compete for exclusive prize pools, and secure your place at the top.
          </p>
        </section>
        
        <LeaderboardPreview />
        
        <CallToActionSection />
        
        <DiscordSection />

      </main>
      <Footer />
      <Feedback />
    </div>
  );
};

export default HomePage;