import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SiteSection } from '../components/SiteSection';
import { AnnouncementsLogo } from '../components/icons';
import { Feedback } from '../components/Feedback';

const UpdatesPage: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-brand-light font-oxanium overflow-hidden">
      <Header />
      <main>
        <SiteSection
            id="updates"
            logo={<AnnouncementsLogo />}
            prizePool="Official Updates"
            description="The latest news, updates, and giveaways from the Porter Plays team. Follow our official channels to stay informed."
            accentTextColor="text-brand-highlight"
        />
      </main>
      <Footer />
      <Feedback />
    </div>
  );
};

export default UpdatesPage;