import type { Fixture, FixtureLeague, GoalScorer } from '@/src/types/fixture';
import type { StandingsRow } from '@/src/types/standings';
import type { ApiSquadPlayer } from '@/src/types/player';

// Vite 프록시 경유 → CORS 우회 (헤더는 vite.config.ts 에서 서버 사이드로 추가)
const BASE_URL = '/api/football-data';
const LIVERPOOL_ID = 64;
const headers = {};

// ─── 인메모리 캐시 (새로고침 전까지 유지, API 호출 최소화) ──────────────────
const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5분

async function cachedFetch(url: string): Promise<unknown> {
  const hit = cache.get(url);
  if (hit && Date.now() - hit.ts < CACHE_TTL) return hit.data;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  const data = await res.json();
  cache.set(url, { data, ts: Date.now() });
  return data;
}

// ─── 유틸 ────────────────────────────────────────────────────────────────────

function formatDate(utcDate: string, competitionName: string): string {
  const date = new Date(utcDate);
  const formatted = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  }).format(date);
  return `${formatted} | ${competitionName}`;
}

function toLeagueCode(code: string): Exclude<FixtureLeague, 'ALL'> {
  const map: Record<string, Exclude<FixtureLeague, 'ALL'>> = {
    PL: 'PL',
    CL: 'UCL',
    FAC: 'FAC',
  };
  return map[code] ?? 'PL';
}

function toZone(position: number, totalTeams: number): 'gold' | 'blue' | 'red' {
  if (position <= 4) return 'gold';
  if (position === 5) return 'blue';
  if (position > totalTeams - 3) return 'red';
  return 'blue';
}

function toUCLZone(position: number): 'gold' | 'blue' | 'red' {
  if (position <= 8) return 'gold';
  if (position <= 24) return 'blue';
  return 'red';
}

function parseForm(form: string | null): Array<'W' | 'D' | 'L'> {
  if (!form) return [];
  return (form.split(',').filter(Boolean) as Array<'W' | 'D' | 'L'>).slice(-5);
}

function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

/**
 * API 포지션 문자열 → 포지션 그룹 변환
 * football-data.org 에서 반환하는 position 값 기준
 */
function toPositionGroup(position: string): 'GK' | 'DEF' | 'MID' | 'FWD' {
  if (position === 'Goalkeeper') return 'GK';
  if (
    ['Centre-Back', 'Left-Back', 'Right-Back', 'Defence'].includes(position)
  )
    return 'DEF';
  if (
    [
      'Attacking Midfield',
      'Central Midfield',
      'Defensive Midfield',
      'Right Midfield',
      'Left Midfield',
      'Midfield',
    ].includes(position)
  )
    return 'MID';
  // Offence, Left Winger, Right Winger, Centre-Forward, etc.
  return 'FWD';
}

// ─── Fixtures ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformMatch(m: any, upcoming: boolean): Fixture {
  const livIsHome = m.homeTeam.id === LIVERPOOL_ID;
  const livScore = livIsHome ? m.score?.fullTime?.home : m.score?.fullTime?.away;
  const oppScore = livIsHome ? m.score?.fullTime?.away : m.score?.fullTime?.home;
  return {
    id: m.id,
    date: formatDate(m.utcDate, m.competition.name),
    utcDate: m.utcDate,
    team1: m.homeTeam.shortName ?? m.homeTeam.name,
    score1: upcoming ? null : (m.score?.fullTime?.home ?? null),
    team2: m.awayTeam.shortName ?? m.awayTeam.name,
    score2: upcoming ? null : (m.score?.fullTime?.away ?? null),
    upcoming: upcoming || undefined,
    win: upcoming ? undefined : livScore != null && oppScore != null && livScore > oppScore,
    league: toLeagueCode(m.competition.code),
    team1Crest: m.homeTeam.crest,
    team2Crest: m.awayTeam.crest,
    venue: m.venue ?? undefined,
  };
}

export async function fetchLiverpoolFixtures(): Promise<Fixture[]> {
  const [scheduledData, finishedData] = await Promise.all([
    cachedFetch(`${BASE_URL}/teams/${LIVERPOOL_ID}/matches?status=SCHEDULED&limit=10`),
    cachedFetch(`${BASE_URL}/teams/${LIVERPOOL_ID}/matches?status=FINISHED&limit=5`),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scheduled = (scheduledData as any).matches ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finished = (finishedData as any).matches ?? [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortByDate = (a: any, b: any) =>
    new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();

  const upcomingFixtures: Fixture[] = [...scheduled]
    .sort(sortByDate)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((m: any) => transformMatch(m, true));

  const pastFixtures: Fixture[] = [...finished]
    .sort(sortByDate)
    .reverse()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((m: any) => transformMatch(m, false));

  return [...upcomingFixtures, ...pastFixtures];
}

// ─── Standings ────────────────────────────────────────────────────────────────

export async function fetchStandings(
  competitionId: number,
  competitionCode: 'PL' | 'UCL' | 'FAC',
): Promise<StandingsRow[]> {
  const data = await cachedFetch(`${BASE_URL}/competitions/${competitionId}/standings`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = data as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const table: any[] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    d.standings?.find((s: any) => s.type === 'TOTAL')?.table ??
    d.standings?.[0]?.table ??
    [];

  const totalTeams = table.length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return table.map((row: any): StandingsRow => {
    const isLiv = row.team.id === LIVERPOOL_ID;
    const position: number = row.position;

    let zone: 'gold' | 'blue' | 'red';
    if (isLiv) {
      zone = 'red';
    } else if (competitionCode === 'UCL') {
      zone = toUCLZone(position);
    } else {
      zone = toZone(position, totalTeams);
    }

    return {
      pos: String(position).padStart(2, '0'),
      club: isLiv ? 'LIVERPOOL' : (row.team.shortName ?? row.team.name),
      pl: row.playedGames,
      w: row.won,
      d: row.draw,
      l: row.lost,
      gd: row.goalDifference >= 0 ? `+${row.goalDifference}` : String(row.goalDifference),
      pts: row.points ?? '-',
      zone,
      highlight: isLiv,
      form: parseForm(row.form),
      crest: row.team.crest,
    };
  });
}

// ─── Squad ───────────────────────────────────────────────────────────────────

/**
 * 등번호 수동 매핑 (football-data.org 스쿼드 API 는 shirt number 미제공)
 * 2025/26 시즌 기준
 */
const SHIRT_NUMBERS: Record<number, string> = {
  // Goalkeepers
  1795:   '1',  // Alisson Becker
  84506:  '25', // Giorgi Mamardashvili
  11629:  '28', // Freddie Woodman
  182236: '41', // Armin Pecsi
  // Defenders
  7862:   '2',  // Joe Gomez
  7869:   '4',  // Virgil van Dijk
  9542:   '5',  // Ibrahima Konaté
  171141: '6',  // Milos Kerkez
  175865: '12', // Conor Bradley
  192563: '15', // Giovanni Leoni
  7868:   '26', // Andrew Robertson
  128954: '30', // Jeremie Frimpong
  186701: '43', // Stefan Bajcetic
  // Midfielders
  3269:   '3',  // Wataru Endō
  19334:  '7',  // Florian Wirtz
  16347:  '8',  // Dominik Szoboszlai
  45681:  '10', // Alexis Mac Allister
  7873:   '17', // Curtis Jones
  81793:  '38', // Ryan Gravenberch
  230517: '42', // Trey Nyoni
  // Forwards
  6486:   '9',  // Alexander Isak
  3754:   '11', // Mohamed Salah
  1780:   '14', // Federico Chiesa
  7459:   '18', // Cody Gakpo
  152454: '22', // Hugo Ekitike
  273453: '73', // Rio Ngumoha
};

// ─── Season Stats (Goals Scored, Clean Sheets) ────────────────────────────────

export async function fetchLiverpoolSeasonStats(): Promise<{ goalsScored: number; cleanSheets: number }> {
  const data = await cachedFetch(`${BASE_URL}/teams/${LIVERPOOL_ID}/matches?status=FINISHED&limit=50`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matches: any[] = (data as any).matches ?? [];

  let goalsScored = 0;
  let cleanSheets = 0;

  for (const m of matches) {
    if (m.score?.fullTime?.home == null) continue;
    const livIsHome = m.homeTeam.id === LIVERPOOL_ID;
    const livGoals: number = livIsHome ? m.score.fullTime.home : m.score.fullTime.away;
    const oppGoals: number = livIsHome ? m.score.fullTime.away : m.score.fullTime.home;
    goalsScored += livGoals;
    if (oppGoals === 0) cleanSheets++;
  }

  return { goalsScored, cleanSheets };
}

// ─── Match Goal Scorers ───────────────────────────────────────────────────────

function formatScorerName(fullName: string): string {
  const parts = fullName.trim().split(' ');
  if (parts.length <= 1) return fullName.toUpperCase();
  return `${parts[0][0]}. ${parts.slice(1).join(' ')}`.toUpperCase();
}

export async function fetchMatchGoalScorers(matchId: number): Promise<GoalScorer[]> {
  const data = await cachedFetch(`${BASE_URL}/matches/${matchId}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const goals: any[] = (data as any).goals ?? [];

  return goals
    .filter((g: any) => g.team?.id === LIVERPOOL_ID)
    .map((g: any): GoalScorer => ({
      player: formatScorerName(g.scorer?.name ?? ''),
      type: g.type === 'PENALTY' ? 'PENALTY' : g.type === 'OWN_GOAL' ? 'OWN_GOAL' : 'GOAL',
      minute: g.minute ?? 0,
      assist: g.assist?.name ? formatScorerName(g.assist.name) : undefined,
    }));
}

// ─── Squad ───────────────────────────────────────────────────────────────────

export async function fetchSquad(): Promise<ApiSquadPlayer[]> {
  const data = await cachedFetch(`${BASE_URL}/teams/${LIVERPOOL_ID}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const squad: any[] = (data as any).squad ?? [];

  return squad.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (p: any): ApiSquadPlayer => {
      const nameParts = (p.name as string).split(' ');
      return {
        id: p.id,
        name: p.name,
        firstName: nameParts[0] ?? p.name,
        lastName: nameParts.slice(1).join(' ') || p.name,
        position: p.position ?? '',
        positionGroup: toPositionGroup(p.position ?? ''),
        nationality: p.nationality ?? '',
        age: p.dateOfBirth ? calculateAge(p.dateOfBirth) : 0,
        number: SHIRT_NUMBERS[p.id as number],
      };
    },
  );
}
