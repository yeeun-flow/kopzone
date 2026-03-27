import { useEffect, useState } from 'react';
import type { ApiSquadPlayer } from '@/src/types/player';
import { fetchSquad } from '@/src/services/footballData';

// 포지션 그룹 정렬 순서
const GROUP_ORDER: Record<string, number> = { GK: 0, DEF: 1, MID: 2, FWD: 3 };

let cache: ApiSquadPlayer[] | null = null;

export function useSquad() {
  const [squad, setSquad] = useState<ApiSquadPlayer[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) {
      setSquad(cache);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchSquad()
      .then((data) => {
        // 포지션 그룹 순서 → 나이 순으로 정렬
        const sorted = [...data].sort((a, b) => {
          const gDiff = GROUP_ORDER[a.positionGroup] - GROUP_ORDER[b.positionGroup];
          if (gDiff !== 0) return gDiff;
          return a.age - b.age;
        });
        cache = sorted;
        setSquad(sorted);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  /** positionGroup 별로 그룹화된 Map 반환 */
  const grouped = squad.reduce<Record<string, ApiSquadPlayer[]>>((acc, p) => {
    (acc[p.positionGroup] ??= []).push(p);
    return acc;
  }, {});

  return { squad, grouped, loading, error };
}
