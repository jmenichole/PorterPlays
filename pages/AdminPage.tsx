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
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-xl border-2 border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-brand-primary/10">
        <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">{item.label}</p>
        <p className="text-3xl font-bold mt-3 text-brand-light drop-shadow-sm">{item.value}</p>
        <p className={`text-sm mt-2 font-medium ${item.changeType === 'increase' ? 'text-brand-highlight' : 'text-red-400'}`}>
            {item.change} vs last month
        </p>
    </div>
);

const DashboardOverview: React.FC = () => (
    <div>
        <div className="flex items-center gap-3 mb-8 p-6 bg-gradient-to-r from-brand-primary/20 to-brand-highlight/10 border border-brand-primary/30 rounded-xl backdrop-blur-sm">
            <div className="text-3xl">📊</div>
            <h2 className="text-3xl font-bold text-brand-light">Dashboard Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map(item => <KpiCard key={item.label} item={item} />)}
        </div>
    </div>
);

const ReferralStats: React.FC = () => (
    <div>
        <div className="flex items-center gap-3 mb-8 p-6 bg-gradient-to-r from-brand-primary/20 to-brand-highlight/10 border border-brand-primary/30 rounded-xl backdrop-blur-sm">
            <div className="text-3xl">👥</div>
            <h2 className="text-3xl font-bold text-brand-light">Referral Sign-up Stats</h2>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-xl border-2 border-brand-primary/20 overflow-hidden backdrop-blur-sm shadow-lg">
            <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-brand-primary/30 to-brand-highlight/20">
                    <tr>
                        <th className="p-4 uppercase text-sm font-bold text-brand-light tracking-wider">Site</th>
                        <th className="p-4 uppercase text-sm font-bold text-brand-light tracking-wider">Signups</th>
                        <th className="p-4 uppercase text-sm font-bold text-brand-light tracking-wider">Conversion Rate</th>
                        <th className="p-4 uppercase text-sm font-bold text-brand-light tracking-wider text-right">Total Wagered</th>
                    </tr>
                </thead>
                <tbody>
                    {referralData.map((stat, index) => (
                        <tr key={stat.site} className="border-t border-brand-primary/20 hover:bg-brand-primary/10 transition-colors duration-200">
                            <td className="p-4 font-bold text-brand-highlight text-lg">{stat.site}</td>
                            <td className="p-4 text-brand-light font-semibold">{stat.signups.toLocaleString()}</td>
                            <td className="p-4 text-brand-light font-semibold">{stat.conversionRate}</td>
                            <td className="p-4 text-right font-bold text-brand-highlight text-lg">{formatCurrency(stat.totalWagered)}</td>
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
            <div className="flex items-center gap-3 mb-8 p-6 bg-gradient-to-r from-brand-primary/20 to-brand-highlight/10 border border-brand-primary/30 rounded-xl backdrop-blur-sm">
                <div className="text-3xl">📈</div>
                <h2 className="text-3xl font-bold text-brand-light">Wager Analytics</h2>
            </div>
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-8 rounded-xl border-2 border-brand-primary/20 backdrop-blur-sm shadow-lg">
                <h3 className="font-bold mb-2 text-brand-highlight text-xl">Total Wagered - Last 30 Days</h3>
                <p className="text-4xl font-black mb-6 text-brand-light drop-shadow-lg">{formatCurrency(wagerAnalyticsData.reduce((acc, curr) => acc + curr.wagered, 0))}</p>
                <div className="w-full h-64 flex items-end gap-1 bg-slate-900/50 rounded-lg p-4">
                    {wagerAnalyticsData.map(data => (
                        <div 
                            key={data.day} 
                            className="flex-1 bg-gradient-to-t from-brand-primary to-brand-highlight hover:from-brand-highlight hover:to-brand-primary transition-all duration-300 rounded-t-sm shadow-lg hover:shadow-brand-primary/30" 
                            style={{ height: `${(data.wagered / maxWagered) * 100}%` }} 
                            title={`Day ${data.day}: ${formatCurrency(data.wagered)}`}
                        ></div>
                    ))}
                </div>
                <p className="text-center text-sm text-slate-400 mt-4 font-medium">Day 1 &rarr; Day 30</p>
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
            <div className="flex items-center gap-3 mb-8 p-6 bg-gradient-to-r from-brand-primary/20 to-brand-highlight/10 border border-brand-primary/30 rounded-xl backdrop-blur-sm">
                <div className="text-3xl">🔧</div>
                <h2 className="text-3xl font-bold text-brand-light">User Tools</h2>
            </div>
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-8 rounded-xl border-2 border-brand-primary/20 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                    <div className="text-2xl">👤</div>
                    <h3 className="font-bold text-brand-highlight text-xl">User Lookup</h3>
                </div>
                <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSelectedUser(null);
                    }}
                    className="w-full bg-slate-900/70 border-2 border-brand-primary/30 rounded-lg px-4 py-3 text-brand-light placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary/50 transition-all duration-200"
                />
                 {searchTerm && (
                    <div className="mt-3 bg-slate-900/80 border-2 border-brand-primary/20 rounded-lg max-h-48 overflow-y-auto">
                        {filteredUsers.map(user => (
                            <div key={user.id} onClick={() => { setSelectedUser(user); setSearchTerm(user.name); }} className="p-3 hover:bg-brand-primary/20 cursor-pointer text-brand-light font-medium border-b border-brand-primary/10 last:border-b-0 transition-colors duration-200">{user.name}</div>
                        ))}
                    </div>
                )}
                {selectedUser && (
                    <div className="mt-8 p-6 bg-gradient-to-br from-brand-primary/10 to-brand-highlight/5 rounded-xl border-2 border-brand-primary/20 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-2xl">👑</div>
                            <h4 className="text-2xl font-bold text-brand-light">{selectedUser.name}</h4>
                        </div>
                        <p className="text-sm text-slate-300 mb-1">User ID: <span className="text-brand-highlight font-mono">{selectedUser.id}</span></p>
                        <p className="text-sm text-slate-300 mb-6">Signed Up: <span className="text-brand-light font-semibold">{selectedUser.signupDate}</span></p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-slate-900/30 p-4 rounded-lg border border-brand-primary/20">
                                <span className="font-semibold text-slate-300 block mb-1">Wagered (Today):</span>
                                <span className="text-brand-highlight font-bold text-lg">{formatCurrency(selectedUser.wagered.today)}</span>
                            </div>
                            <div className="bg-slate-900/30 p-4 rounded-lg border border-brand-primary/20">
                                <span className="font-semibold text-slate-300 block mb-1">Wagered (Week):</span>
                                <span className="text-brand-highlight font-bold text-lg">{formatCurrency(selectedUser.wagered.this_week)}</span>
                            </div>
                            <div className="bg-slate-900/30 p-4 rounded-lg border border-brand-primary/20">
                                <span className="font-semibold text-slate-300 block mb-1">Wagered (Month):</span>
                                <span className="text-brand-highlight font-bold text-lg">{formatCurrency(selectedUser.wagered.this_month)}</span>
                            </div>
                            <div className="bg-slate-900/30 p-4 rounded-lg border border-brand-primary/20">
                                <span className="font-semibold text-slate-300 block mb-1">Wagered (All Time):</span>
                                <span className="text-brand-highlight font-bold text-lg">{formatCurrency(selectedUser.wagered.all_time)}</span>
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
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold w-full text-left transition-all duration-300 ${
                currentView === targetView
                    ? 'bg-gradient-to-r from-brand-primary to-brand-highlight text-white shadow-lg shadow-brand-primary/30'
                    : 'text-slate-300 hover:bg-gradient-to-r hover:from-brand-primary/20 hover:to-brand-highlight/10 hover:text-brand-light hover:shadow-md'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="bg-brand-dark min-h-screen text-brand-light font-oxanium" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '25px 25px'}}>
            <div className="flex">
                <aside className="w-72 bg-gradient-to-b from-slate-900/90 to-slate-800/80 backdrop-blur-sm h-screen sticky top-0 flex flex-col p-6 border-r-2 border-brand-primary/20 shadow-2xl">
                    <a href="/" className="flex items-center gap-3 text-xl font-black uppercase tracking-widest px-4 py-3 mb-8 bg-gradient-to-r from-brand-primary/20 to-brand-highlight/10 rounded-xl border border-brand-primary/30 hover:shadow-lg transition-all duration-300">
                        <LogoIcon />
                        <span className="text-brand-light">Porter Plays</span>
                    </a>
                    <nav className="flex flex-col gap-3">
                        <NavItem currentView={view} targetView="overview" setView={setView}>
                            <DashboardIcon className="w-6 h-6"/> Overview
                        </NavItem>
                         <NavItem currentView={view} targetView="referrals" setView={setView}>
                            <UsersIcon className="w-6 h-6"/> Referral Stats
                        </NavItem>
                         <NavItem currentView={view} targetView="analytics" setView={setView}>
                            <ChartBarIcon className="w-6 h-6"/> Analytics
                        </NavItem>
                         <NavItem currentView={view} targetView="tools" setView={setView}>
                            <WrenchIcon className="w-6 h-6"/> User Tools
                        </NavItem>
                    </nav>
                     <div className="mt-auto">
                         <div className="border-t-2 border-brand-primary/20 pt-6 text-center bg-gradient-to-r from-brand-primary/10 to-brand-highlight/5 rounded-t-xl p-4">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="text-lg">👤</div>
                                <p className="text-sm font-bold text-brand-light">{user?.name}</p>
                            </div>
                            <button 
                                onClick={logout} 
                                className="text-xs text-slate-400 hover:text-brand-highlight font-semibold px-3 py-1 rounded-full border border-slate-600 hover:border-brand-highlight/50 transition-all duration-200"
                            >
                                Logout
                            </button>
                         </div>
                    </div>
                </aside>

                <main className="flex-1 p-10 bg-gradient-to-br from-transparent to-brand-primary/5">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
