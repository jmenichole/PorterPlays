import React, { useState } from 'react';

export const ChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-brand-primary hover:bg-brand-primary/90 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 transform"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 flex flex-col animate-float-in">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-highlight rounded-full flex items-center justify-center">
                <span className="text-brand-dark text-sm font-bold">P</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-brand-light">Porter Guide</div>
                <div className="text-xs text-brand-highlight">Ready to help you get started!</div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Welcome Message */}
              <div className="bg-slate-700/50 rounded-lg p-3 max-w-xs">
                <div className="text-sm text-brand-light mb-2">👋 Welcome to Porter Plays!</div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  I'm here to help you get the most out of your Porter Plays experience. I can guide you through:
                  <br />• 🎰 Setting up accounts on Thrill, Goated & Shuffle
                  <br />• 💬 Joining our Discord and Telegram communities  
                  <br />• 🏆 Understanding leaderboards and rewards
                  <br />• 🎁 Claiming exclusive bonuses and codes
                  <br /><br />What would you like to start with?
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-2">
                <button className="w-full text-left bg-brand-primary/20 hover:bg-brand-primary/30 border border-brand-primary/40 rounded-lg p-3 text-sm text-brand-light transition-colors">
                  🎰 Get Started with Casino Bonuses
                </button>
                <button className="w-full text-left bg-brand-highlight/20 hover:bg-brand-highlight/30 border border-brand-highlight/40 rounded-lg p-3 text-sm text-brand-light transition-colors">
                  🏆 Learn About Leaderboards
                </button>
                <button className="w-full text-left bg-slate-600/50 hover:bg-slate-600/70 border border-slate-500/50 rounded-lg p-3 text-sm text-brand-light transition-colors">
                  💬 Join Our Community
                </button>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type a message or question..."
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-brand-light placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />
              <button className="px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg text-sm font-medium transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};