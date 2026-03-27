import type { StandingsRow } from '@/src/types/standings';

export const plStandings: StandingsRow[] = [
  { pos: '01', club: 'Manchester City', pl: 28, w: 20, d: 4, l: 4, gd: '+45', pts: 64, zone: 'gold', form: ['W', 'W', 'W', 'D', 'W'] },
  { pos: '02', club: 'LIVERPOOL', pl: 28, w: 19, d: 7, l: 2, gd: '+39', pts: 64, zone: 'red', highlight: true, form: ['W', 'W', 'D', 'W', 'W'] },
  { pos: '03', club: 'Arsenal', pl: 28, w: 20, d: 4, l: 4, gd: '+46', pts: 64, zone: 'gold', form: ['W', 'W', 'W', 'W', 'W'] },
  { pos: '04', club: 'Aston Villa', pl: 28, w: 17, d: 4, l: 7, gd: '+18', pts: 55, zone: 'gold', form: ['L', 'W', 'W', 'W', 'L'] },
  { pos: '05', club: 'Tottenham', pl: 27, w: 16, d: 5, l: 6, gd: '+16', pts: 53, zone: 'blue', form: ['W', 'L', 'W', 'W', 'L'] },
];

export const uclStandings: StandingsRow[] = [
  { pos: '01', club: 'Real Madrid', pl: 6, w: 6, d: 0, l: 0, gd: '+12', pts: 18, zone: 'gold', form: ['W', 'W', 'W', 'W', 'W'] },
  { pos: '02', club: 'LIVERPOOL', pl: 6, w: 5, d: 0, l: 1, gd: '+10', pts: 15, zone: 'red', highlight: true, form: ['W', 'W', 'W', 'W', 'L'] },
  { pos: '03', club: 'Bayern Munich', pl: 6, w: 5, d: 1, l: 0, gd: '+11', pts: 16, zone: 'gold', form: ['W', 'W', 'D', 'W', 'W'] },
  { pos: '04', club: 'Inter Milan', pl: 6, w: 3, d: 3, l: 0, gd: '+3', pts: 12, zone: 'gold', form: ['D', 'W', 'D', 'W', 'D'] },
];

export const facStandings: StandingsRow[] = [
  { pos: 'QF', club: 'LIVERPOOL', pl: 4, w: 4, d: 0, l: 0, gd: '+10', pts: '-', zone: 'red', highlight: true, form: ['W', 'W', 'W', 'W'] },
  { pos: 'QF', club: 'Man Utd', pl: 4, w: 4, d: 0, l: 0, gd: '+6', pts: '-', zone: 'gold', form: ['W', 'W', 'W', 'W'] },
  { pos: 'QF', club: 'Chelsea', pl: 4, w: 3, d: 1, l: 0, gd: '+5', pts: '-', zone: 'gold', form: ['W', 'D', 'W', 'W'] },
];

