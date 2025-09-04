import React from 'react';
import { DiamondIcon, CashIcon, UsersIcon, WrenchIcon } from './icons';

interface VisionPointProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const VisionPoint: React.FC<VisionPointProps> = ({ icon, title, description }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-brand-primary/20 h-full">
    <div className="text-brand-primary bg-slate-900 p-4 rounded-full mb-4">
      <div className="w-8 h-8">
        {icon}
      </div>
    </div>
    <h3 className="text-2xl font-bold uppercase tracking-wider text-brand-highlight">{title}</h3>
    <p className="mt-2 text-slate-300 flex-grow">{description}</p>
  </div>
);

export const VisionSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider">
            The Porter Plays <span className="text-brand-primary">Vision</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
            This isn't just another affiliate group. We're building a premium, grassroots community where players are valued above all else. This is the dream.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <VisionPoint
            icon={<DiamondIcon />}
            title="A Premium Experience"
            description="We're creating an exclusive 'country club' atmosphere. Porter Plays is synonymous with a high-quality experience for every member."
          />
          <VisionPoint
            icon={<CashIcon />}
            title="Platform-Agnostic Rewards"
            description="Our benefits and bonuses are independent of any single casino. Get rewarded for being part of the community, no matter where you play."
          />
          <VisionPoint
            icon={<UsersIcon className="w-full h-full" />}
            title="Community First"
            description="This is a grassroots movement. We're building a space where players feel they belong, driving true growth from the ground up."
          />
          <VisionPoint
            icon={<WrenchIcon className="w-full h-full" />}
            title="Innovative Engagement"
            description="We're developing unique milestones and non-standard bonus types to continuously engage, retain, and reward our dedicated players."
          />
        </div>
      </div>
    </section>
  );
};
