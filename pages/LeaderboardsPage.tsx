import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LeaderboardsContainer } from '../components/LeaderboardsContainer';
import { Feedback } from '../components/Feedback';

const LeaderboardsPage: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-brand-light font-modern overflow-hidden">
      <Header />
      <main>
        <LeaderboardsContainer />
      </main>
      <Footer />
      <Feedback />
    </div>
  );
};

export default LeaderboardsPage;