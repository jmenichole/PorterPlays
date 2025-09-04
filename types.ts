
export interface Wagered {
  today: number;
  this_week: number;
  this_month: number;
  all_time: number;
}

export interface LeaderboardEntry {
  uid: string;
  name: string;
  wagered: Wagered;
}

export enum Timeframe {
  TODAY = 'today',
  WEEK = 'this_week',
  MONTH = 'this_month',
  ALL_TIME = 'all_time',
}

// Admin Dashboard Types
export interface AdminKpi {
  label: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

export interface ReferralStat {
  site: string;
  signups: number;
  conversionRate: string;
  totalWagered: number;
}

export interface AnalyticsDataPoint {
  day: number;
  wagered: number;
}

export interface MockUser {
  id: string;
  name: string;
  signupDate: string;
  wagered: Wagered;
}
