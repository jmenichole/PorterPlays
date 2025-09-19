import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatBubble } from '../components/ChatBubble';

const StreamPage: React.FC = () => {
  const [suggestion, setSuggestion] = useState('');
  const [yourName, setYourName] = useState('');

  const handleSuggestionSubmit = () => {
    if (suggestion.trim()) {
      // Handle suggestion submission logic here
      console.log('Suggestion submitted:', { suggestion, yourName });
      setSuggestion('');
      setYourName('');
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen text-brand-light font-oxanium">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            STREAM WITH{' '}
            <span className="bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent">
              PORTER
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Join Porter's live streams and watch the action unfold in real-time
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Live Schedule Section */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-brand-light">Live Schedule</h2>
            </div>

            {/* Coming Soon Card */}
            <div className="bg-slate-700/50 rounded-xl p-6 mb-6 border border-slate-600/50">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-brand-light mb-2">COMING SOON</h3>
                <h4 className="text-xl font-bold text-brand-highlight mb-3">Regular Streaming Schedule</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Follow our social channels for live stream announcements and schedule updates
                </p>
              </div>
            </div>

            {/* Stream Alerts Card */}
            <div className="bg-gradient-to-r from-brand-primary/20 to-brand-highlight/20 rounded-xl p-6 border border-brand-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-brand-highlight rounded-full"></div>
                <h3 className="text-lg font-semibold text-brand-highlight">STREAM ALERTS</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Get notified when Porter goes live! Join our Discord and Telegram for instant stream notifications.
              </p>
              
              {/* Mock audio controls */}
              <div className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-4">
                <button className="text-slate-400 hover:text-brand-light">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                <div className="flex-1 bg-slate-700 rounded-full h-2 relative">
                  <div className="bg-brand-primary h-2 rounded-full w-1/3"></div>
                </div>
                
                {/* Media Controls */}
                <div className="flex items-center gap-2">
                  <button className="text-slate-400 hover:text-brand-light">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.333 4z" />
                    </svg>
                  </button>
                  <button className="text-brand-light bg-brand-primary/20 rounded-full p-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button className="text-slate-400 hover:text-brand-light">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3 text-sm text-slate-400">
                <span>00:27</span>
                <span>02:22</span>
              </div>
            </div>
          </div>

          {/* Slot Call Suggestions Section */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
            <h2 className="text-2xl font-bold text-brand-light mb-6">Slot Call Suggestions</h2>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Suggest slots for Porter to play on stream! Popular suggestions may be featured.
            </p>

            <div className="space-y-4">
              {/* Slot Name Input */}
              <div>
                <label className="block text-sm font-medium text-brand-light mb-2">
                  Slot Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="e.g., Gates of Olympus, Sweet Bonanza..."
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-brand-light placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                />
              </div>

              {/* Your Name Input */}
              <div>
                <label className="block text-sm font-medium text-brand-light mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="Anonymous"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-brand-light placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-brand-light py-3 px-4 rounded-lg font-medium transition-colors">
                  Clear
                </button>
                <button 
                  onClick={handleSuggestionSubmit}
                  className="flex-1 bg-gradient-to-r from-brand-highlight to-brand-primary hover:from-brand-highlight/90 hover:to-brand-primary/90 text-brand-dark py-3 px-6 rounded-lg font-bold transition-all hover:scale-105 transform"
                >
                  Suggestion
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatBubble />
    </div>
  );
};

export default StreamPage;