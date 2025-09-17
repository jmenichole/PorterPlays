import React, { useState, FormEvent } from 'react';
import { FeedbackIcon, CloseIcon } from './icons';

const DISCORD_USER_ID = '1153034319271559328';
// IMPORTANT: This URL must be set in your environment variables for Discord integration to work.
// For example, in a Vercel/Netlify environment, you would set a variable named DISCORD_WEBHOOK_URL.
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL; 

export const Feedback: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (feedback.trim().length < 10) {
            setError('Please provide at least 10 characters of feedback.');
            return;
        }
        setError('');
        setIsSubmitting(true);

        // 1. Store in localStorage as a backup
        try {
            const storedFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
            storedFeedback.push({ text: feedback, timestamp: new Date().toISOString() });
            localStorage.setItem('userFeedback', JSON.stringify(storedFeedback));
        } catch (err) {
            console.error('Failed to save feedback to localStorage:', err);
        }
        
        // 2. Send to Discord Webhook
        if (DISCORD_WEBHOOK_URL) {
            try {
                const response = await fetch(DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: `New feedback received for Porter Plays! <@${DISCORD_USER_ID}>`,
                        embeds: [{
                            description: feedback,
                            color: 5814783, // Purple
                            timestamp: new Date().toISOString(),
                        }],
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to send feedback to Discord.');
                }
            } catch (err) {
                console.error(err);
                // Non-critical error, we still have the feedback in localStorage
            }
        } else {
            console.warn('DISCORD_WEBHOOK_URL is not set. Skipping sending feedback to Discord.');
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFeedback('');

        setTimeout(() => {
            setIsOpen(false);
            // Reset submitted state after the modal is closed and faded out
            setTimeout(() => setIsSubmitted(false), 500);
        }, 2000);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:to-brand-primary/70 text-brand-dark rounded-full p-4 shadow-xl shadow-brand-primary/25 hover:shadow-brand-primary/40 z-50 transition-all duration-300 transform hover:scale-110 border-2 border-brand-primary/30"
                aria-label="Provide Feedback"
            >
                <FeedbackIcon />
            </button>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    <div 
                        className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-sm border border-slate-600/50 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-float-in"
                        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-200 p-2 hover:bg-slate-700/50 rounded-lg"
                            aria-label="Close feedback form"
                        >
                            <CloseIcon />
                        </button>
                        
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit}>
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-highlight/20 rounded-2xl flex items-center justify-center border border-brand-primary/30 mx-auto mb-4">
                                        <FeedbackIcon />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2">Share Your Feedback</h2>
                                    <p className="text-slate-300">Have an idea or found a bug? We'd love to hear from you!</p>
                                </div>
                                
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Your feedback is valuable to us..."
                                    className="w-full h-36 bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none text-slate-200 placeholder-slate-400 backdrop-blur-sm"
                                    required
                                    minLength={10}
                                    aria-label="Feedback input"
                                />
                                {error && <p className="text-red-400 text-sm mt-3 px-1">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-6 bg-gradient-to-r from-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:to-brand-primary/70 disabled:from-slate-600 disabled:to-slate-500 text-brand-dark disabled:text-slate-400 font-bold py-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:scale-105"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin"></div>
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Feedback'
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gradient-to-br from-brand-highlight/20 to-green-400/20 rounded-2xl flex items-center justify-center border border-brand-highlight/30 mx-auto mb-6">
                                    <svg className="w-8 h-8 text-brand-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-brand-highlight mb-2">Thank You!</h2>
                                <p className="text-xl text-slate-300">Your feedback has been received and will help us improve.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
