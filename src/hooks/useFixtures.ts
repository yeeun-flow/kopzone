import { useEffect, useState } from 'react';
import type { Fixture } from '@/src/types/fixture';
import { fetchLiverpoolFixtures } from '@/src/services/footballData';

export function useFixtures() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLiverpoolFixtures()
      .then(setFixtures)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { fixtures, loading, error };
}
