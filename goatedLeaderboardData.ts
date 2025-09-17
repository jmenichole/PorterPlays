import { LeaderboardEntry } from '../types';
import { leaderboardData as baseData } from './leaderboardData';

export const goatedLeaderboardData: LeaderboardEntry[] = baseData.map(entry => ({
  ...entry,
  wagered: {
    today: entry.wagered.today * 0.2,
    this_week: entry.wagered.this_week * 0.2,
    this_month: entry.wagered.this_month * 0.2,
    all_time: entry.wagered.all_time * 0.2,
  },
})).sort((a, b) => b.wagered.all_time - a.wagered.all_time);
