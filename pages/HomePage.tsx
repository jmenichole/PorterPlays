import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ThrillSection } from '../components/ThrillSection';
import { LeaderboardPreview } from '../components/LeaderboardPreview';
import { DiscordSection } from '../components/DiscordSection';
import { Feedback } from '../components/Feedback';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-purple-800 to-teal-500 min-h-screen text-white font-oxanium">
      <Header />
      <main>
        <section className="text-center max-w-4xl mx-auto pt-20 md:pt-28 pb-10 md:pb-12 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wider !leading-tight">
            Your Arena for <span className="text-teal-300">Competitive Play.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
            Welcome to the official hub for Porter Plays leaderboards. Track your performance, compete for exclusive prize pools, and secure your place at the top.
          </p>
          <div className="mt-8">
            <button className="px-6 py-3 bg-gradient-to-r from-teal-400 to-purple-600 rounded-xl text-lg font-semibold hover:scale-105 transition transform">
              Get Started
            </button>
          </div>
        </section>
        
        <ThrillSection />
        
        <LeaderboardPreview />
        
        <DiscordSection />

      </main>
      <Footer />
      <Feedback />
    </div>
  );
};

export default HomePage;