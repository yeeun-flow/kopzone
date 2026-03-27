import { useEffect, useState } from 'react';
import type { StandingsRow, StandingsLeague } from '@/src/types/standings';
import { fetchStandings } from '@/src/services/footballData';

const COMPETITION_IDS: Record<StandingsLeague, number> = {
  PL: 2021,
  UCL: 2001,
  FAC: 2055,
};

// Simple in-memory cache to avoid redundant API calls (free tier: 10 req/min)
const cache: Partial<Record<StandingsLeague, StandingsRow[]>> = {};

export function useStandings(league: StandingsLeague) {
  const [standings, setStandings] = useState<StandingsRow[]>(cache[league] ?? []);
  const [loading, setLoading] = useState(!cache[league]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache[league]) {
      setStandings(cache[league]!);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchStandings(COMPETITION_IDS[league], league)
      .then((data) => {
        cache[league] = data;
        setStandings(data);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [league]);

  return { standings, loading, error };
}
