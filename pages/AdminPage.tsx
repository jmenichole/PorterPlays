import React, { useState, useMemo } from 'react';
import { LogoIcon, DashboardIcon, UsersIcon, ChartBarIcon, WrenchIcon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';
import { kpiData, referralData, wagerAnalyticsData, mockUsers } from '../data/adminData';
import { AdminKpi, ReferralStat, AnalyticsDataPoint, MockUser } from '../types';

type AdminView = 'overview' | 'referrals' | 'analytics' | 'tools';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const KpiCard: React.FC<{ item: AdminKpi }> = ({ item }) => (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:border-brand-primary/30 hover:shadow-xl group"
         style={{boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'}}>
        <p className="text-sm text-slate-400 uppercase tracking-wide font-semibold">{item.label}</p>
        <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent group-hover:from-brand-primary group-hover:to-brand-highlight transition-all duration-300">{item.value}</p>
        <p className={`text-sm mt-1 font-medium ${item.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
            {item.change} vs last month
        </p>
    </div>
);

const DashboardOverview: React.FC = () => (
    <div>
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent"
            style={{textShadow: '0 0 20px rgba(92,255,193,0.3)'}}>
            Dashboard Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map(item => <KpiCard key={item.label} item={item} />)}
        </div>
    </div>
);

const ReferralStats: React.FC = () => (
    <div>
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent"
            style={{textShadow: '0 0 20px rgba(92,255,193,0.3)'}}>
            Referral Sign-up Stats
        </h2>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-xl border border-slate-700/50 overflow-hidden backdrop-blur-sm"
             style={{boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'}}>
            <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-slate-900/80 to-slate-800/60"
                       style={{borderBottom: '1px solid rgba(71, 85, 105, 0.3)'}}>
                    <tr>
                        <th className="p-4 uppercase text-sm font-semibold text-slate-300 tracking-wide">Site</th>
                        <th className="p-4 uppercase text-sm font-semibold text-slate-300 tracking-wide">Signups</th>
                        <th className="p-4 uppercase text-sm font-semibold text-slate-300 tracking-wide">Conversion Rate</th>
                        <th className="p-4 uppercase text-sm font-semibold text-slate-300 tracking-wide text-right">Total Wagered</th>
                    </tr>
                </thead>
                <tbody>
                    {referralData.map((stat, index) => (
                        <tr key={stat.site} className="border-t border-slate-700/30 hover:bg-gradient-to-r hover:from-slate-700/30 hover:to-slate-600/20 transition-all duration-200 group">
                            <td className="p-4 font-bold text-brand-highlight group-hover:text-brand-primary transition-colors">{stat.site}</td>
                            <td className="p-4 font-medium">{stat.signups.toLocaleString()}</td>
                            <td className="p-4 font-medium">{stat.conversionRate}</td>
                            <td className="p-4 text-right font-bold text-brand-highlight">{formatCurrency(stat.totalWagered)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const AnalyticsView: React.FC = () => {
    const maxWagered = Math.max(...wagerAnalyticsData.map(d => d.wagered));
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent"
                style={{textShadow: '0 0 20px rgba(92,255,193,0.3)'}}>
                Wager Analytics
            </h2>
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm"
                 style={{boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'}}>
                <h3 className="font-semibold mb-1 text-slate-300 uppercase tracking-wide">Total Wagered - Last 30 Days</h3>
                <p className="text-3xl font-bold mb-4 bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent"
                   style={{textShadow: '0 0 10px rgba(92,255,193,0.3)'}}>
                    {formatCurrency(wagerAnalyticsData.reduce((acc, curr) => acc + curr.wagered, 0))}
                </p>
                <div className="w-full h-64 flex items-end gap-1 p-2 bg-slate-900/30 rounded-lg backdrop-blur-sm"
                     style={{border: '1px solid rgba(71, 85, 105, 0.3)'}}>
                    {wagerAnalyticsData.map(data => (
                        <div key={data.day} 
                             className="flex-1 bg-gradient-to-t from-brand-primary to-brand-highlight hover:from-brand-highlight hover:to-brand-primary transition-all duration-300 rounded-t-sm"
                             style={{ 
                                height: `${(data.wagered / maxWagered) * 100}%`,
                                boxShadow: '0 0 10px rgba(89,86,255,0.4)'
                             }} 
                             title={`Day ${data.day}: ${formatCurrency(data.wagered)}`}>
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-slate-400 mt-2 font-medium tracking-wide">Day 1 &rarr; Day 30</p>
            </div>
        </div>
    )
};

const AdminTools: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

    const filteredUsers = useMemo(() =>
        searchTerm
            ? mockUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : [],
        [searchTerm]
    );
    
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-brand-highlight to-brand-primary bg-clip-text text-transparent"
                style={{textShadow: '0 0 20px rgba(92,255,193,0.3)'}}>
                User Tools
            </h2>
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm"
                 style={{boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'}}>
                <h3 className="font-semibold text-slate-300 mb-4 uppercase tracking-wide">User Lookup</h3>
                <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSelectedUser(null);
                    }}
                    className="w-full bg-gradient-to-r from-slate-900/80 to-slate-800/60 border border-slate-600/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary/50 transition-all duration-200 backdrop-blur-sm"
                    style={{boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'}}
                />
                 {searchTerm && (
                    <div className="mt-3 bg-gradient-to-r from-slate-900/90 to-slate-800/70 border border-slate-700/50 rounded-lg max-h-48 overflow-y-auto backdrop-blur-sm"
                         style={{boxShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>
                        {filteredUsers.map(user => (
                            <div key={user.id} 
                                 onClick={() => { setSelectedUser(user); setSearchTerm(user.name); }} 
                                 className="p-3 hover:bg-gradient-to-r hover:from-brand-primary/20 hover:to-brand-highlight/10 cursor-pointer transition-all duration-200 border-b border-slate-700/30 last:border-b-0 font-medium hover:text-brand-highlight">
                                {user.name}
                            </div>
                        ))}
                    </div>
                )}
                {selectedUser && (
                    <div className="mt-6 p-4 bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-lg border border-slate-700/50 backdrop-blur-sm"
                         style={{boxShadow: '0 4px 15px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'}}>
                        <h4 className="text-xl font-bold text-brand-highlight mb-2">{selectedUser.name}</h4>
                        <p className="text-sm text-slate-400 mb-1">User ID: <span className="text-slate-300 font-medium">{selectedUser.id}</span></p>
                        <p className="text-sm text-slate-400 mb-4">Signed Up: <span className="text-slate-300 font-medium">{selectedUser.signupDate}</span></p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-600/30">
                                <span className="font-semibold text-slate-300 block">Wagered (Today):</span> 
                                <span className="text-brand-highlight font-bold">{formatCurrency(selectedUser.wagered.today)}</span>
                            </div>
                            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-600/30">
                                <span className="font-semibold text-slate-300 block">Wagered (Week):</span> 
                                <span className="text-brand-highlight font-bold">{formatCurrency(selectedUser.wagered.this_week)}</span>
                            </div>
                            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-600/30">
                                <span className="font-semibold text-slate-300 block">Wagered (Month):</span> 
                                <span className="text-brand-highlight font-bold">{formatCurrency(selectedUser.wagered.this_month)}</span>
                            </div>
                            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-600/30">
                                <span className="font-semibold text-slate-300 block">Wagered (All Time):</span> 
                                <span className="text-brand-primary font-bold">{formatCurrency(selectedUser.wagered.all_time)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};


const AdminPage: React.FC = () => {
    const [view, setView] = useState<AdminView>('overview');
    const { user, logout } = useAuth();

    const renderView = () => {
        switch (view) {
            case 'overview': return <DashboardOverview />;
            case 'referrals': return <ReferralStats />;
            case 'analytics': return <AnalyticsView />;
            case 'tools': return <AdminTools />;
            default: return <DashboardOverview />;
        }
    };
    
    const NavItem: React.FC<{ currentView: AdminView, targetView: AdminView, setView: (view: AdminView) => void, children: React.ReactNode }> = ({ currentView, targetView, setView, children }) => (
        <button
            onClick={() => setView(targetView)}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-300 ${
                currentView === targetView
                    ? 'bg-gradient-to-r from-brand-primary/80 to-brand-primary text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/30 hover:text-white hover:shadow-md'
            }`}
            style={{
                boxShadow: currentView === targetView 
                    ? '0 4px 15px rgba(89,86,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
                    : undefined
            }}
        >
            {children}
        </button>
    );

    return (
        <div className="bg-brand-dark min-h-screen text-brand-light font-oxanium" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '25px 25px'}}>
            <div className="flex">
                <aside className="w-64 bg-gradient-to-b from-slate-900/90 to-slate-900/70 backdrop-blur-sm h-screen sticky top-0 flex flex-col p-4 border-r border-slate-700/50 shadow-2xl"
                       style={{boxShadow: '2px 0 20px rgba(0,0,0,0.3), inset 0 0 20px rgba(89,86,255,0.05)'}}>
                    <a href="/" className="flex items-center gap-2 text-xl font-bold uppercase tracking-widest px-3 mb-6 text-brand-highlight" 
                       style={{textShadow: '0 0 10px rgba(92,255,193,0.3)'}}>
                        <LogoIcon />
                        <span>Porter Plays</span>
                    </a>
                    <nav className="flex flex-col gap-2">
                        <NavItem currentView={view} targetView="overview" setView={setView}>
                            <DashboardIcon className="w-5 h-5"/> Overview
                        </NavItem>
                         <NavItem currentView={view} targetView="referrals" setView={setView}>
                            <UsersIcon className="w-5 h-5"/> Referral Stats
                        </NavItem>
                         <NavItem currentView={view} targetView="analytics" setView={setView}>
                            <ChartBarIcon className="w-5 h-5"/> Analytics
                        </NavItem>
                         <NavItem currentView={view} targetView="tools" setView={setView}>
                            <WrenchIcon className="w-5 h-5"/> User Tools
                        </NavItem>
                    </nav>
                     <div className="mt-auto">
                         <div className="border-t border-slate-700/50 pt-4 text-center bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-lg p-3 backdrop-blur-sm"
                              style={{boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.05)'}}>
                            <p className="text-sm font-semibold text-brand-highlight">{user?.name}</p>
                            <button onClick={logout} className="text-xs text-slate-400 hover:text-brand-highlight transition-all duration-200 hover:shadow-sm">Logout</button>
                         </div>
                    </div>
                </aside>

                <main className="flex-1 p-8 relative">
                    <div className="relative z-10">
                        {renderView()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
