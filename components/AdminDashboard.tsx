import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons';

interface SocialChannelData {
    platform: string;
    thrill: string;
    goated: string;
    shuffle: string;
}

interface AnalyticsData {
    dailyUsers: number;
    weeklySignups: number;
    monthlyRevenue: number;
    conversionRate: number;
    topCasino: string;
    totalFeedback: number;
}

const SOCIAL_CHANNELS: SocialChannelData[] = [
    {
        platform: 'Discord',
        thrill: 'https://discord.gg/thrill-channel',
        goated: 'https://discord.gg/goated-channel', 
        shuffle: 'https://discord.gg/shuffle-channel'
    },
    {
        platform: 'Telegram',
        thrill: 'https://t.me/thrill_official',
        goated: 'https://t.me/goated_official',
        shuffle: 'https://t.me/shuffle_official'
    },
    {
        platform: 'Twitter',
        thrill: 'https://x.com/thrill_casino',
        goated: 'https://x.com/goated_casino',
        shuffle: 'https://x.com/shuffle_casino'
    }
];

export const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<'analytics' | 'social' | 'feedback'>('analytics');
    const [postMessage, setPostMessage] = useState('');
    const [selectedCasinos, setSelectedCasinos] = useState<string[]>(['thrill']);
    const [isPosting, setIsPosting] = useState(false);
    const [analytics, setAnalytics] = useState<AnalyticsData>({
        dailyUsers: 0,
        weeklySignups: 0,
        monthlyRevenue: 0,
        conversionRate: 0,
        topCasino: 'thrill',
        totalFeedback: 0
    });
    const [feedbackList, setFeedbackList] = useState<Array<{text: string, timestamp: string}>>([]);

    useEffect(() => {
        // Load analytics data (simulate API call)
        const loadAnalytics = () => {
            // In real implementation, this would fetch from your analytics API
            setAnalytics({
                dailyUsers: Math.floor(Math.random() * 1000) + 500,
                weeklySignups: Math.floor(Math.random() * 200) + 100,
                monthlyRevenue: Math.floor(Math.random() * 50000) + 25000,
                conversionRate: Math.random() * 5 + 2,
                topCasino: 'thrill',
                totalFeedback: Math.floor(Math.random() * 50) + 25
            });
        };

        // Load feedback from localStorage
        const loadFeedback = () => {
            try {
                const stored = localStorage.getItem('userFeedback');
                if (stored) {
                    setFeedbackList(JSON.parse(stored));
                }
            } catch (err) {
                console.error('Failed to load feedback:', err);
            }
        };

        loadAnalytics();
        loadFeedback();
    }, []);

    const handlePostToChannels = async () => {
        if (!postMessage.trim()) return;
        
        setIsPosting(true);
        
        // Simulate posting to social channels
        try {
            for (const casino of selectedCasinos) {
                for (const channel of SOCIAL_CHANNELS) {
                    // In real implementation, this would use respective APIs
                    console.log(`Posting to ${channel.platform} for ${casino}: ${postMessage}`);
                    
                    // Simulate API delay
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
            
            alert(`Successfully posted to ${selectedCasinos.length} casino channels across ${SOCIAL_CHANNELS.length} platforms!`);
            setPostMessage('');
        } catch (error) {
            console.error('Failed to post to channels:', error);
            alert('Failed to post to some channels. Please try again.');
        } finally {
            setIsPosting(false);
        }
    };

    const handleCasinoToggle = (casino: string) => {
        setSelectedCasinos(prev => 
            prev.includes(casino) 
                ? prev.filter(c => c !== casino)
                : [...prev, casino]
        );
    };

    const clearFeedback = () => {
        if (confirm('Are you sure you want to clear all feedback?')) {
            localStorage.removeItem('userFeedback');
            setFeedbackList([]);
        }
    };

    const AnalyticsTab = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-brand-highlight">Analytics & Trends</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-brand-primary">{analytics.dailyUsers}</div>
                    <div className="text-slate-400 text-sm">Daily Active Users</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{analytics.weeklySignups}</div>
                    <div className="text-slate-400 text-sm">Weekly Signups</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">${analytics.monthlyRevenue.toLocaleString()}</div>
                    <div className="text-slate-400 text-sm">Monthly Revenue</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-400">{analytics.conversionRate.toFixed(1)}%</div>
                    <div className="text-slate-400 text-sm">Conversion Rate</div>
                </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-4">Top Performing Casino</h4>
                <div className="flex items-center space-x-4">
                    <div className="text-3xl">🏆</div>
                    <div>
                        <div className="text-xl font-bold text-brand-highlight capitalize">{analytics.topCasino}</div>
                        <div className="text-slate-400">Leading in user engagement and signups</div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-4">Recent Trends</h4>
                <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center space-x-2">
                        <span className="text-green-400">↗</span>
                        <span>VIP transfer requests increased by 23%</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="text-green-400">↗</span>
                        <span>Discord engagement up 18% this week</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="text-red-400">↘</span>
                        <span>Bounce rate decreased by 12%</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="text-green-400">↗</span>
                        <span>Mobile traffic increased 35%</span>
                    </li>
                </ul>
            </div>
        </div>
    );

    const SocialTab = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-brand-highlight">Social Media Management</h3>
            
            <div className="bg-slate-700/50 p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-4">Post to All Channels</h4>
                
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Select Casinos:</label>
                    <div className="flex space-x-4">
                        {['thrill', 'goated', 'shuffle'].map(casino => (
                            <label key={casino} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCasinos.includes(casino)}
                                    onChange={() => handleCasinoToggle(casino)}
                                    className="rounded border-slate-600 bg-slate-700 text-brand-primary focus:ring-brand-primary focus:ring-2"
                                />
                                <span className="capitalize">{casino}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <textarea
                    value={postMessage}
                    onChange={(e) => setPostMessage(e.target.value)}
                    placeholder="Enter your message to post across all selected casino channels..."
                    className="w-full h-32 bg-slate-800 border border-slate-600 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                
                <button
                    onClick={handlePostToChannels}
                    disabled={!postMessage.trim() || selectedCasinos.length === 0 || isPosting}
                    className="mt-4 bg-brand-primary hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                >
                    {isPosting ? 'Posting...' : `Post to ${selectedCasinos.length} Casino(s)`}
                </button>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-4">Channel Overview</h4>
                <div className="space-y-4">
                    {SOCIAL_CHANNELS.map(channel => (
                        <div key={channel.platform} className="border border-slate-600 rounded-lg p-4">
                            <h5 className="font-bold text-brand-highlight mb-2">{channel.platform}</h5>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                    <div className="font-semibold">Thrill</div>
                                    <a href={channel.thrill} target="_blank" rel="noopener noreferrer" 
                                       className="text-cyan-400 hover:underline truncate block">
                                        {channel.thrill}
                                    </a>
                                </div>
                                <div>
                                    <div className="font-semibold">Goated</div>
                                    <a href={channel.goated} target="_blank" rel="noopener noreferrer" 
                                       className="text-yellow-400 hover:underline truncate block">
                                        {channel.goated}
                                    </a>
                                </div>
                                <div>
                                    <div className="font-semibold">Shuffle</div>
                                    <a href={channel.shuffle} target="_blank" rel="noopener noreferrer" 
                                       className="text-green-400 hover:underline truncate block">
                                        {channel.shuffle}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const FeedbackTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-brand-highlight">User Feedback</h3>
                <button
                    onClick={clearFeedback}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    Clear All
                </button>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-xl font-bold text-brand-primary">{feedbackList.length}</div>
                <div className="text-slate-400">Total Feedback Items</div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
                {feedbackList.length === 0 ? (
                    <div className="text-center text-slate-400 py-8">
                        No feedback received yet.
                    </div>
                ) : (
                    feedbackList.map((feedback, index) => (
                        <div key={index} className="bg-slate-700/50 p-4 rounded-lg border-l-4 border-brand-primary">
                            <div className="text-slate-300 mb-2">{feedback.text}</div>
                            <div className="text-slate-500 text-sm">
                                {new Date(feedback.timestamp).toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-slate-700">
                    {[
                        { id: 'analytics', label: '📊 Analytics', value: 'analytics' },
                        { id: 'social', label: '📱 Social Media', value: 'social' },
                        { id: 'feedback', label: '💬 Feedback', value: 'feedback' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.value as any)}
                            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                                activeTab === tab.value 
                                    ? 'text-brand-primary border-brand-primary' 
                                    : 'text-slate-400 border-transparent hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {activeTab === 'analytics' && <AnalyticsTab />}
                    {activeTab === 'social' && <SocialTab />}
                    {activeTab === 'feedback' && <FeedbackTab />}
                </div>
            </div>
        </div>
    );
};