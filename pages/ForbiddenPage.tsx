import React from 'react';

const ForbiddenPage: React.FC = () => {
    return (
        <div className="bg-brand-dark min-h-screen text-brand-light font-modern flex items-center justify-center text-center" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '25px 25px'}}>
            <div>
                <h1 className="text-6xl font-extrabold text-red-500">403</h1>
                <h2 className="text-4xl font-bold mt-2">Access Denied</h2>
                <p className="mt-4 text-slate-300">You do not have permission to view this page.</p>
                <a href="/" className="mt-8 inline-block bg-brand-primary hover:bg-opacity-80 transition-colors text-white font-bold py-3 px-6 rounded-lg">
                    Return to Home
                </a>
            </div>
        </div>
    );
};

export default ForbiddenPage;
