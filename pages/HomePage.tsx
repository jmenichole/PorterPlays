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
        <section className="text-center max-w-5xl mx-auto pt-24 md:pt-32 pb-12 md:pb-16 px-4 relative">
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-brand-primary/10 to-brand-highlight/10 rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-wider !leading-tight mb-6">
              Your Arena for <span className="bg-gradient-to-r from-brand-highlight via-brand-highlight to-brand-primary bg-clip-text text-transparent animate-pulse-glow">Competitive Play.</span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
              Welcome to the official hub for Porter Plays leaderboards. Track your performance, compete for <span className="text-brand-highlight font-semibold">exclusive prize pools</span>, and secure your place at the top.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/leaderboards" className="bg-gradient-to-r from-brand-highlight to-brand-primary hover:from-brand-highlight/90 hover:to-brand-primary/90 text-brand-dark font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-brand-highlight/25 hover:shadow-brand-highlight/40 hover:scale-105 uppercase tracking-wider">
                View Leaderboards
              </a>
              <a href="#preview" className="border-2 border-slate-600 hover:border-brand-highlight text-brand-light hover:text-brand-highlight font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-brand-highlight/10 uppercase tracking-wider">
                Learn More
              </a>
            </div>
          </div>
        </section>
        
        <div id="preview">
          <LeaderboardPreview />
        </div>
        
        <CallToActionSection />
        
        <DiscordSection />

      </main>
      <Footer />
      <Feedback />
    </div>
  );
};

export default HomePage;