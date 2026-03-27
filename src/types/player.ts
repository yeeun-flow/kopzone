export type PlayerMetric = { label: string; val: string; width: string };

export type PlayerRecentForm = {
  opp: string;
  res: string;
  ga: string;
  xg: string;
  rat: string;
  color: string;
};

/** football-data.org 스쿼드 API 에서 가져오는 가벼운 선수 타입 */
export type ApiSquadPlayer = {
  id: number;                               // football-data.org player ID
  name: string;
  firstName: string;
  lastName: string;
  position: string;                         // API 원본 포지션 문자열
  positionGroup: 'GK' | 'DEF' | 'MID' | 'FWD';
  nationality: string;
  age: number;
  number?: string;                          // 등번호 (API 미제공 → 수동 매핑)
  image?: string;                           // 선수 사진 URL (수집 필요)
};

/** 선수 상세 프로필 타입 (players.ts 에 정의된 주요 선수) */
export type Player = {
  id: string;
  footballDataId?: number;                  // ApiSquadPlayer 와의 연결 키
  name: string;
  firstName: string;
  lastName: string;
  number?: string;
  position: string;
  positionGroup?: 'GK' | 'DEF' | 'MID' | 'FWD';
  nationality: string;
  age: number;
  image?: string;
  heroImage?: string;
  highlightVideoId?: string;
  stats?: {
    goals: number;
    assists: number;
    minutes: number;
    yellowCards: number;
    redCards: number;
  };
  radar?: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  metrics?: PlayerMetric[];
  recentForm?: PlayerRecentForm[];
};
