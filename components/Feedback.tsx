import React, { useState, FormEvent } from 'react';
import { FeedbackIcon, CloseIcon } from './icons';

const DISCORD_USER_ID = '1153034319271559328';
// IMPORTANT: This URL must be set in your environment variables for Discord integration to work.
// For GitHub Pages deployment, you would set this as a repository secret named VITE_DISCORD_WEBHOOK_URL.
const DISCORD_WEBHOOK_URL = import.meta.env?.VITE_DISCORD_WEBHOOK_URL; 

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
                className="fixed bottom-5 right-5 bg-brand-primary hover:bg-opacity-80 text-white rounded-full p-4 shadow-lg z-50 transition-transform transform hover:scale-110"
                aria-label="Provide Feedback"
            >
                <FeedbackIcon />
            </button>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    <div 
                        className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-6 w-full max-w-md relative animate-float-in"
                        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-slate-400 hover:text-white"
                            aria-label="Close feedback form"
                        >
                            <CloseIcon />
                        </button>
                        
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit}>
                                <h2 className="text-2xl font-bold mb-4">Share Your Feedback</h2>
                                <p className="text-slate-400 mb-6">Have an idea or found a bug? Let us know!</p>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Your feedback is valuable to us..."
                                    className="w-full h-32 bg-slate-900 border border-slate-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                                    required
                                    minLength={10}
                                    aria-label="Feedback input"
                                />
                                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-4 bg-brand-primary hover:bg-opacity-80 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Feedback'}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <h2 className="text-2xl font-bold text-brand-highlight">Thank You!</h2>
                                <p className="text-slate-300 mt-2">Your feedback has been received.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
