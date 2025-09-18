import React from 'react';

export const VipTransferSection: React.FC = () => {
    const handleVipTransferClick = () => {
        // Track VIP transfer interest
        window.open('https://thrill.com/en/register?c=porterplays', '_blank');
    };

    return (
        <section className="py-16 mx-auto max-w-7xl px-4">
            <div className="relative bg-gradient-to-br from-cyan-900/20 via-cyan-800/10 to-teal-900/20 border-2 border-cyan-400/30 rounded-2xl p-8 text-center overflow-hidden">
                
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-cyan-400/10 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-radial from-teal-400/8 to-transparent rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                
                {/* Content */}
                <div className="relative z-10">
                    <div className="inline-block bg-cyan-400/20 border border-cyan-400/40 text-cyan-400 px-4 py-2 rounded-full font-semibold text-sm uppercase tracking-wide mb-4">
                        💎 VIP Exclusive
                    </div>
                    
                    <h3 className="text-cyan-400 text-4xl font-black mb-4 leading-tight">
                        Thrill VIP Transfer
                    </h3>
                    
                    <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                        Exclusive welcome offer for VIPs transferring their play from another platform. Get started with immediate VIP benefits and exclusive perks!
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                        <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-xl p-6">
                            <div className="text-cyan-400 text-2xl mb-2">🎯</div>
                            <h4 className="text-brand-highlight font-bold mb-2">Easy Process</h4>
                            <p className="text-slate-300 text-sm">Submit a ticket with screenshot or username from your previous platform</p>
                        </div>
                        
                        <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-xl p-6">
                            <div className="text-cyan-400 text-2xl mb-2">⚡</div>
                            <h4 className="text-brand-highlight font-bold mb-2">Instant Benefits</h4>
                            <p className="text-slate-300 text-sm">Get VIP status and exclusive perks from day one</p>
                        </div>
                        
                        <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-xl p-6">
                            <div className="text-cyan-400 text-2xl mb-2">🎁</div>
                            <h4 className="text-brand-highlight font-bold mb-2">Exclusive Rewards</h4>
                            <p className="text-slate-300 text-sm">Special welcome bonuses only available for VIP transfers</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button 
                            onClick={handleVipTransferClick}
                            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
                        >
                            🚀 Start VIP Transfer
                        </button>
                        <button 
                            onClick={() => {
                                // Scroll to or show more info about VIP transfer process
                                const element = document.getElementById('vip-info');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="bg-transparent border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300"
                        >
                            📖 Learn More
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Additional VIP Info Section */}
            <div id="vip-info" className="mt-12 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h4 className="text-xl font-bold text-brand-highlight mb-4">How Thrill VIP Transfer Works</h4>
                <div className="grid md:grid-cols-2 gap-6 text-slate-300">
                    <div>
                        <h5 className="font-semibold text-cyan-400 mb-2">Step 1: Submit Transfer Request</h5>
                        <p className="text-sm mb-4">Provide proof of your VIP status from your current platform (screenshot, username, or account details).</p>
                        
                        <h5 className="font-semibold text-cyan-400 mb-2">Step 2: Account Verification</h5>
                        <p className="text-sm">Our team will verify your VIP status and set up your new account with equivalent benefits.</p>
                    </div>
                    <div>
                        <h5 className="font-semibold text-cyan-400 mb-2">Step 3: Welcome Bonus</h5>
                        <p className="text-sm mb-4">Receive exclusive welcome bonuses and immediate access to VIP perks.</p>
                        
                        <h5 className="font-semibold text-cyan-400 mb-2">Step 4: Enjoy VIP Benefits</h5>
                        <p className="text-sm">Start playing with enhanced bonuses, personal account management, and exclusive events.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};