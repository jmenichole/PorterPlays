import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CommunitySection } from '../components/CommunitySection';
import { Feedback } from '../components/Feedback';
import { VisionSection } from '../components/VisionSection';

const CommunityPage: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-brand-light font-oxanium overflow-hidden">
      <Header />
      <main>
        <VisionSection />
        <CommunitySection />
      </main>
      <Footer />
      <Feedback />
    </div>
  );
};

export default CommunityPage;
