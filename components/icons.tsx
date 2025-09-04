import React from 'react';

export const LogoIcon: React.FC = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#5CFFC1" strokeWidth="2"/>
        <path d="M9.5 16V8h3c1.933 0 3.5 1.567 3.5 3.5S14.433 15 12.5 15h-3" stroke="#5CFFC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const DiscordIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.3698C18.7915 3.7313 17.1595 3.2515 15.454 2.9248C15.453 2.9258 15.453 2.9258 15.452 2.9268C15.334 3.1678 15.21 3.4148 15.084 3.6648C13.254 3.3348 11.424 3.3348 9.596 3.6648C9.47 3.4148 9.346 3.1678 9.228 2.9268C9.227 2.9258 9.227 2.9258 9.226 2.9248C7.5215 3.2515 5.8895 3.7313 4.364 4.3698C1.511 8.2438 0.885 12.1388 1.458 16.0008C3.27 17.0658 5.122 17.8208 7.001 18.2918C7.108 18.0188 7.208 17.7428 7.301 17.4628C6.5 17.1898 5.726 16.8528 4.984 16.4588C5.111 16.3278 5.235 16.1948 5.358 16.0588C7.452 17.2058 9.697 17.8208 12.002 17.8208C14.307 17.8208 16.552 17.2058 18.646 16.0588C18.769 16.1948 18.893 16.3278 19.02 16.4588C18.278 16.8528 17.504 17.1898 16.703 17.4628C16.796 17.7428 16.896 18.0188 17.003 18.2918C18.882 17.8208 20.734 17.0658 22.546 16.0008C23.181 11.4588 22.547 7.5218 20.317 4.3698ZM8.02 13.6268C7.031 13.6268 6.212 12.7818 6.212 11.7588C6.212 10.7358 7.017 9.8908 8.02 9.8908C9.023 9.8908 9.842 10.7358 9.828 11.7588C9.828 12.7818 9.023 13.6268 8.02 13.6268ZM16.002 13.6268C15.013 13.6268 14.194 12.7818 14.194 11.7588C14.194 10.7358 14.999 9.8908 16.002 9.8908C17.005 9.8908 17.824 10.7358 17.81 11.7588C17.81 12.7818 17.005 13.6268 16.002 13.6268Z" />
    </svg>
);

export const TwitterIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);


export const GoldMedal: React.FC<{className?: string}> = ({ className }) => (
     <svg className={className ?? "w-16 h-16"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FFD700', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#FFA500', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2v-4zm0 6h2v2h-2v-2z" fill="url(#gold)"/>
        <path d="M12 11l-3 6h6l-3-6z" fill="#FFF" />
    </svg>
);

export const SilverMedal: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className ?? "w-16 h-16"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="silver" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#C0C0C0', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#A9A9A9', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="url(#silver)"/>
        <path d="M11 15h2v-4h-2v4zm1-10C7.48 5 5 7.48 5 11h2c0-2.21 1.79-4 4-4s4 1.79 4 4h2c0-3.52-2.48-6-6-6z" fill="#FFF" />
    </svg>
);

export const BronzeMedal: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className ?? "w-16 h-16"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bronze" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#CD7F32', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#A0522D', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="url(#bronze)"/>
        <path d="M11 7h2v6h-2V7zm0 8h2v2h-2v-2z" fill="#FFF" />
    </svg>
);

export const DiamondIcon: React.FC = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 8.5l10 13.5L22 8.5L12 2zM6.35 9L12 3.5l5.65 5.5H6.35zM4 9.88l8 10.67 8-10.67V10H4v-.12z" />
    </svg>
);

export const CashIcon: React.FC = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zM4 18V6h16v12H4zm8-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        <circle cx="12" cy="14" r="1.5"/>
    </svg>
);

export const NewsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className ?? "w-8 h-8"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4 12H9m-3 0h3m5-12v.01M15 12v.01M15 16v.01M15 8v.01"></path>
    </svg>
);

export const ExternalLinkIcon: React.FC = () => (
    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
    </svg>
);

export const HeaderTelegramIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L23.43 3.447c.229-1.124-.5-1.646-1.34-1.29L2.034 8.724c-1.143.434-1.118 1.023-.2 1.31l4.74 1.47 11.35-7.112c.543-.318 1.023-.145.588.225L9.417 15.18z"/>
    </svg>
);

export const KickIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.81 3.528H15.698V5.33h2.647v3.966h-2.647v1.802h2.647v3.966h-2.647v1.802h4.112V3.528zM14.07 3.528H4.19v16.944h9.88V3.528zm-1.764 1.802v6.643l-4.2-6.643H5.908v13.34h1.764V8.63l4.236 6.642h.398V5.33h-1.764z"/>
    </svg>
);

export const CodeIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

export const GoatedLogo: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className ?? "h-12 w-auto"} viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" fontFamily="Oxanium, sans-serif" fontSize="30" fontWeight="bold" fill="#5CFFC1">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">GOATED</text>
    </svg>
);

export const ThrillLogo: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className ?? "h-12 w-auto"} viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" fontFamily="Oxanium, sans-serif" fontSize="30" fontWeight="bold" fill="#22d3ee">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">THRILL</text>
    </svg>
);

export const ShuffleLogo: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className ?? "h-12 w-auto"} viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" fontFamily="Oxanium, sans-serif" fontSize="30" fontWeight="bold" fill="#10B981">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">SHUFFLE</text>
    </svg>
);

export const AnnouncementsLogo: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className ?? "h-12 w-auto"} viewBox="0 0 400 40" xmlns="http://www.w3.org/2000/svg" fontFamily="Oxanium, sans-serif" fontSize="30" fontWeight="bold" fill="#5CFFC1">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">ANNOUNCEMENTS</text>
    </svg>
);

// Admin Dashboard Icons
export const DashboardIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className ?? "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export const UsersIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className ?? "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" />
    </svg>
);

export const ChartBarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className ?? "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

export const WrenchIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className ?? "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const FeedbackIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
    </svg>
);

export const CloseIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);