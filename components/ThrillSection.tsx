import React from 'react';

export const ThrillSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider mb-6 text-brand-light">
          Thrill
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
          Discover the excitement of Thrill — challenge your luck, track your progress, and join a growing community of players.
        </p>
        <div className="bg-gradient-to-r from-brand-dark/80 to-brand-dark/60 border border-brand-primary/30 rounded-xl p-8 shadow-xl backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-brand-highlight">Join the Thrill Community</h3>
            <p className="text-slate-300 mb-6">
              Experience competitive gaming like never before. Track your wins, climb the leaderboards, and unlock exclusive rewards.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-brand-highlight to-brand-primary rounded-xl text-lg font-semibold hover:scale-105 transition transform text-brand-dark">
              Start Playing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};