

import React from 'react';
import { ExternalLinkIcon, GoatedLogo, ThrillLogo, ShuffleLogo } from './icons';

interface Site {
  name: string;
  description: string;
  url: string;
  glowColor: string;
  logo: React.ReactNode;
}

const sites: Site[] = [
  {
    name: 'Goated',
    logo: <GoatedLogo />,
    description: "Use code 'PORTER' for an exclusive deposit bonus on our main partner site.",
    url: 'https://www.goated.com/r/PLAYGOATED',
    glowColor: 'shadow-brand-highlight/30',
  },
  {
    name: 'Thrill',
    logo: <ThrillLogo />,
    description: 'Experience the thrill of the win with instant rakeback and a user-friendly platform.',
    url: 'https://thrill.com/?r=porterplays',
    glowColor: 'shadow-cyan-400/30',
  },
  {
    name: 'Shuffle',
    logo: <ShuffleLogo />,
    description: 'Join one of the fastest-growing crypto casinos with a huge variety of games.',
    url: 'https://shuffle.com/?r=playShuffle',
    glowColor: 'shadow-purple-400/30',
  },
];

const SiteCard: React.FC<{ site: Site }> = ({ site }) => {
  return (
    <div className={`bg-slate-800/60 p-6 rounded-xl border border-slate-700 hover:border-brand-highlight transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:${site.glowColor}`}>
      {site.logo}
      <p className="text-slate-300 mt-2 flex-grow">{site.description}</p>
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 w-full bg-brand-primary hover:bg-opacity-80 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg text-lg uppercase flex items-center justify-center transform hover:-translate-y-1 hover:shadow-lg hover:${site.glowColor}`}
      >
        Play Now <ExternalLinkIcon />
      </a>
    </div>
  );
};

export const AffiliateSites: React.FC = () => {
  return (
    <div className="mt-20">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider">
          More Ways to <span className="text-brand-primary">Play & Win</span>
        </h2>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
          Support the community by playing on our partner sites. Use our links for exclusive bonuses.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {sites.map(site => <SiteCard key={site.name} site={site} />)}
      </div>
    </div>
  );
};