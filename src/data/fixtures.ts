import type { Fixture } from '@/src/types/fixture';

export const allFixtures: Fixture[] = [
  { date: 'Sunday 29 Mar | Premier League', team1: 'LIVERPOOL', score1: null, team2: 'Man City', score2: null, upcoming: true, league: 'PL' },
  { date: 'Thursday 02 Apr | Premier League', team1: 'Chelsea', score1: null, team2: 'LIVERPOOL', score2: null, upcoming: true, league: 'PL' },
  { date: 'Wednesday 08 Apr | Champions League', team1: 'Real Madrid', score1: null, team2: 'LIVERPOOL', score2: null, upcoming: true, league: 'UCL' },
  { date: 'Saturday 11 Apr | FA Cup', team1: 'LIVERPOOL', score1: null, team2: 'Man Utd', score2: null, upcoming: true, league: 'FAC' },
  { date: 'Sunday 27 Aug | Premier League', team1: 'Newcastle', score1: 1, team2: 'Liverpool', score2: 2, win: true, league: 'PL', goalScorers: [{ player: 'M. SALAH', type: 'PENALTY', minute: 34 }, { player: 'D. NUÑEZ', type: 'GOAL', minute: 88, assist: 'SALAH' }] },
  { date: "Saturday 19 Aug | Premier League", team1: 'Liverpool', score1: 3, team2: "B'mouth", score2: 1, win: true, league: 'PL', goalScorers: [{ player: 'L. DÍAZ', type: 'GOAL', minute: 12 }, { player: 'M. SALAH', type: 'GOAL', minute: 45 }, { player: 'D. NUÑEZ', type: 'PENALTY', minute: 78 }] },
];

