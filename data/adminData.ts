import { AdminKpi, ReferralStat, AnalyticsDataPoint, MockUser } from '../types';
import { leaderboardData } from './leaderboardData';

export const kpiData: AdminKpi[] = [
  { label: 'Total Signups', value: '1,482', change: '+12.5%', changeType: 'increase' },
  { label: 'Total Wagered (All Time)', value: '$12,458,921', change: '+8.2%', changeType: 'increase' },
  { label: 'Active Players (This Week)', value: '312', change: '-2.1%', changeType: 'decrease' },
  { label: 'New Players (This Month)', value: '98', change: '+5.4%', changeType: 'increase' },
];

export const referralData: ReferralStat[] = [
  { site: 'Thrill', signups: 759, conversionRate: '68%', totalWagered: 8932401 },
  { site: 'Goated', signups: 412, conversionRate: '75%', totalWagered: 2101520 },
  { site: 'Shuffle', signups: 311, conversionRate: '61%', totalWagered: 1425000 },
];

export const wagerAnalyticsData: AnalyticsDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  wagered: 150000 + Math.random() * 100000 + i * 2000,
}));

export const mockUsers: MockUser[] = leaderboardData.slice(0, 20).map(entry => ({
    id: entry.uid,
    name: entry.name,
    signupDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    wagered: entry.wagered,
}));
