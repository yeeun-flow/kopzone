export type FixtureLeague = 'ALL' | 'PL' | 'UCL' | 'FAC';

export type Fixture = {
  date: string;
  utcDate?: string;       // ISO 8601 — 카운트다운/정렬용 raw 날짜 (목데이터는 선택)
  team1: string;
  score1: number | null;
  team2: string;
  score2: number | null;
  upcoming?: boolean;
  win?: boolean;
  league: Exclude<FixtureLeague, 'ALL'>;
  team1Crest?: string;
  team2Crest?: string;
  venue?: string;
};

