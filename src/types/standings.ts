export type StandingsLeague = 'PL' | 'UCL' | 'FAC';

export type StandingsRow = {
  pos: string;
  club: string;
  pl: number;
  w: number;
  d: number;
  l: number;
  gd: string;
  pts: number | '-';
  zone: 'gold' | 'blue' | 'red';
  highlight?: boolean;
  form: Array<'W' | 'D' | 'L'>;
  crest?: string;
};

