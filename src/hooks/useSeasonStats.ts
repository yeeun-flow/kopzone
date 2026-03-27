import { useEffect, useState } from 'react';
import { fetchLiverpoolSeasonStats } from '@/src/services/footballData';

type SeasonStats = { goalsScored: number; cleanSheets: number };

export function useSeasonStats() {
  const [stats, setStats] = useState<SeasonStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiverpoolSeasonStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}
