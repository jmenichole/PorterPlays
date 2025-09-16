import React, { useState, useMemo } from 'react';
import { LogoIcon, DashboardIcon, UsersIcon, ChartBarIcon, WrenchIcon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';
import { kpiData, referralData, wagerAnalyticsData, mockUsers } from '../data/adminData';
import { AdminKpi, ReferralStat, AnalyticsDataPoint, MockUser } from '../types';
import { createPath, navigateTo } from '../utils/navigation';

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
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <p className="text-sm text-slate-400">{item.label}</p>
        <p className="text-3xl font-bold mt-2">{item.value}</p>
        <p className={`text-sm mt-1 ${item.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
            {item.change} vs last month
        </p>
    </div>
);

const DashboardOverview: React.FC = () => (
    <div>
        <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map(item => <KpiCard key={item.label} item={item} />)}
        </div>
    </div>
);

const ReferralStats: React.FC = () => (
    <div>
        <h2 className="text-3xl font-bold mb-6">Referral Sign-up Stats</h2>
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-900/50">
                    <tr>
                        <th className="p-4 uppercase text-sm font-semibold text-slate-400">Site</th>
                        <th className="p-4 uppercase text-sm font-semibold text-slate-400">Signups</th>
                        <th className="p-4 uppercase text-sm font-semibold text-slate-400">Conversion Rate</th>
                        <th className="p-4 uppercase text-sm font-semibold text-slate-400 text-right">Total Wagered</th>
                    </tr>
                </thead>
                <tbody>
                    {referralData.map((stat, index) => (
                        <tr key={stat.site} className="border-t border-slate-700 hover:bg-slate-700/50">
                            <td className="p-4 font-bold text-brand-highlight">{stat.site}</td>
                            <td className="p-4">{stat.signups.toLocaleString()}</td>
                            <td className="p-4">{stat.conversionRate}</td>
                            <td className="p-4 text-right font-semibold">{formatCurrency(stat.totalWagered)}</td>
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
            <h2 className="text-3xl font-bold mb-6">Wager Analytics</h2>
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h3 className="font-semibold mb-1 text-slate-300">Total Wagered - Last 30 Days</h3>
                <p className="text-3xl font-bold mb-4 text-brand-highlight">{formatCurrency(wagerAnalyticsData.reduce((acc, curr) => acc + curr.wagered, 0))}</p>
                <div className="w-full h-64 flex items-end gap-1">
                    {wagerAnalyticsData.map(data => (
                        <div key={data.day} className="flex-1 bg-brand-primary hover:bg-opacity-80 transition-all" style={{ height: `${(data.wagered / maxWagered) * 100}%` }} title={`Day ${data.day}: ${formatCurrency(data.wagered)}`}></div>
                    ))}
                </div>
                <p className="text-center text-xs text-slate-500 mt-2">Day 1 &rarr; Day 30</p>
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
            <h2 className="text-3xl font-bold mb-6">User Tools</h2>
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h3 className="font-semibold text-slate-300 mb-2">User Lookup</h3>
                <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSelectedUser(null);
                    }}
                    className="w-full bg-slate-900 border border-slate-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                 {searchTerm && (
                    <div className="mt-2 bg-slate-900 border border-slate-700 rounded-md max-h-48 overflow-y-auto">
                        {filteredUsers.map(user => (
                            <div key={user.id} onClick={() => { setSelectedUser(user); setSearchTerm(user.name); }} className="p-2 hover:bg-brand-primary cursor-pointer">{user.name}</div>
                        ))}
                    </div>
                )}
                {selectedUser && (
                    <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                        <h4 className="text-xl font-bold">{selectedUser.name}</h4>
                        <p className="text-sm text-slate-400">User ID: {selectedUser.id}</p>
                        <p className="text-sm text-slate-400">Signed Up: {selectedUser.signupDate}</p>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                            <div><span className="font-semibold text-slate-300">Wagered (Today):</span> {formatCurrency(selectedUser.wagered.today)}</div>
                            <div><span className="font-semibold text-slate-300">Wagered (Week):</span> {formatCurrency(selectedUser.wagered.this_week)}</div>
                            <div><span className="font-semibold text-slate-300">Wagered (Month):</span> {formatCurrency(selectedUser.wagered.this_month)}</div>
                            <div><span className="font-semibold text-slate-300">Wagered (All Time):</span> {formatCurrency(selectedUser.wagered.all_time)}</div>
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

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigateTo('/');
    };

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
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full text-left transition-colors ${
                currentView === targetView
                    ? 'bg-brand-primary text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="bg-brand-dark min-h-screen text-brand-light font-oxanium" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '25px 25px'}}>
            <div className="flex">
                <aside className="w-64 bg-slate-900/80 backdrop-blur-sm h-screen sticky top-0 flex flex-col p-4 border-r border-slate-800">
                    <a href={createPath('/')} onClick={handleNavClick} className="flex items-center gap-2 text-xl font-bold uppercase tracking-widest px-3 mb-6">
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
                         <div className="border-t border-slate-700 pt-4 text-center">
                            <p className="text-sm font-semibold">{user?.name}</p>
                            <button onClick={logout} className="text-xs text-slate-400 hover:text-brand-highlight">Logout</button>
                         </div>
                    </div>
                </aside>

                <main className="flex-1 p-8">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
