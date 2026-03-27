# 기능 명세 (현행 UI 기준)

이 문서는 **현재 코드(`src/views/*`, `src/components/*`, `src/data/*`)에 구현된 동작**을 기반으로 작성된 “현행 기능 명세”입니다.  
API 연동 단계에서 `src/data/*`의 목데이터는 서버 데이터로 대체될 것을 전제로 합니다.

## 공통

- **앱 진입점**: `index.html` → `src/main.tsx` → `src/App.tsx`
- **화면 전환 방식**: 라우터 없이 `view` state로 전환 (`src/App.tsx`)
- **전환 애니메이션**: `motion/react`의 `AnimatePresence` + `motion.div`
- **상단/하단 네비**:
  - 상단: `src/components/layout/TopAppBar.tsx`
  - 하단: `src/components/layout/BottomNavBar.tsx`

## 내비게이션/상태

### View 상태
- **정의**: `src/types/view.ts`
- **가능한 값**: `home | fixtures | squad | standings | player | news | alerts`
- **동작**:
  - 하단 네비 버튼 클릭 시 해당 view로 전환
  - 선수 카드/Featured 클릭 시 `selectedPlayer` 설정 후 `player`로 전환
  - Home의 “Full Schedule” 클릭 시 `fixtures`로 전환
  - Home의 뉴스 카드 클릭 시 `news`로 전환

### 스크롤 정책
- **동작**: view가 바뀔 때마다 `window.scrollTo(0, 0)`
- **위치**: `src/App.tsx`

---

## 화면 명세

### 1) Matchday / Home (`src/views/HomeView.tsx`)
- **목표**: 홈에서 다음 경기/하이라이트/뉴스/지난 경기 요약 제공
- **데이터 소스(현행)**:
  - 하이라이트: `src/data/matchHighlights.ts`
  - 뉴스 카드: `src/data/news.ts`
- **섹션**
  - **Next Fixture**
    - “Full Schedule” 버튼 클릭 시 `fixtures`로 이동
    - 카운트다운 값은 하드코딩 UI(실제 시간 계산 없음)
  - **Match Highlights**
    - 카드 클릭 시 유튜브 영상 모달 오픈
  - **Video Modal**
    - 오버레이 클릭 또는 “CLOSE” 클릭 시 닫힘
    - 유튜브 `iframe` autoplay=1
  - **Latest News**
    - 카드 클릭 시 `news`로 이동(목록 화면은 아직 없음, 상세 뷰만 존재)
  - **Last Match**
    - 스코어/득점 시간 라인은 하드코딩 UI
- **상태**
  - `selectedVideo: string | null`
- **예외/제약**
  - 외부 이미지/유튜브 임베드에 의존(네트워크 환경 필요)

### 2) Fixtures / Schedule (`src/views/FixturesView.tsx`)
- **목표**: 경기 일정/결과를 리그별로 필터링하여 제공
- **데이터 소스(현행)**: `src/data/fixtures.ts`
- **기능**
  - **리그 필터 탭**: `ALL | PL | UCL | FAC`
  - **Next Match Spotlight**
    - `activeLeague === 'ALL'`일 때만 노출
    - `allFixtures`에서 `upcoming === true` 첫 항목을 사용
  - **월 탭(MAR/APR/MAY/JUN)**: UI만 존재(필터 동작 없음)
  - **경기 리스트**
    - `upcoming`이면 “TBC/UPCOMING” 표시
    - 결과 경기면 스코어/승리 뱃지 표시(`win`)
- **상태**
  - `activeLeague`

### 3) Squad (`src/views/SquadView.tsx`)
- **목표**: 선수 목록 탐색 및 선수 상세로 진입
- **데이터 소스(현행)**: `src/data/players.ts`
- **기능**
  - Featured Player 클릭 시:
    - `onSelectPlayer(players[0])`
    - `setView('player')`
  - 선수 카드 클릭 시:
    - `onSelectPlayer(p)`
    - `setView('player')`
- **제약**
  - 현재는 “FORWARDS” 섹션 하나로만 렌더(데이터는 players 전부)

### 4) Player Profile (`src/views/PlayerProfileView.tsx`)
- **목표**: 선수 상세(프로필/스탯/폼/영상) 제공
- **입력**
  - `player: Player` (부모에서 선택된 선수)
- **기능/섹션**
  - Hero(이미지/등번호/이름/포지션/국적)
  - Highlights: 유튜브 `iframe`
  - Stats Grid: Goals/Assists/Minutes
  - Discipline: Yellow/Red
  - Radar(시각 요소) + Tactical Analysis 텍스트
  - Recent Form 테이블
  - Signature Card + CTA 버튼(동작 없음)
- **제약**
  - 레이더는 실제 수치로 폴리곤을 그리지 않고 “장식용 고정 도형” + 라벨만 표시

### 5) Standings / Stats (`src/views/StandingsView.tsx`)
- **목표**: 리그별 순위표 + 인사이트 카드 제공
- **데이터 소스(현행)**: `src/data/standings.ts`
- **기능**
  - 리그 탭: `PL | UCL | FAC`
  - 테이블 표시:
    - `highlight` 팀 행 강조 스타일
    - FORM은 `W/D/L`을 배지로 표시
  - Statistical Insights: 하드코딩 카드 3개(퍼센트 바 1개)
- **상태**
  - `activeLeague`

### 6) News Detail (`src/views/NewsDetailView.tsx`)
- **목표**: 뉴스 상세 화면(단일 기사) 제공
- **현황**
  - 목록/라우팅/기사 선택 없이 고정 콘텐츠 1개만 존재
- **추후 필요**
  - News 목록 화면 + `id` 기반 상세 진입(라우팅 또는 view+selectedNews 방식)

### 7) Alerts (`src/views/AlertsView.tsx`)
- **목표**: 알림 화면 진입점 제공
- **현황**
  - “No new alerts” 빈 상태만 존재

---

## 데이터/타입 명세(현행)

- **Player**: `src/types/player.ts` / 데이터 `src/data/players.ts`
- **Fixture**: `src/types/fixture.ts` / 데이터 `src/data/fixtures.ts`
- **StandingsRow**: `src/types/standings.ts` / 데이터 `src/data/standings.ts`
- **MatchHighlight**: `src/types/highlight.ts` / 데이터 `src/data/matchHighlights.ts`
- **NewsCard**: `src/types/news.ts` / 데이터 `src/data/news.ts`

---

## API 연동 시 체크리스트 (권장)

- **목데이터 대체 우선순위**
  - Fixtures/Standings는 “리스트+필터”라 API 연동 효과가 큼
  - Players는 목록 + 상세(프로필)로 분리 필요
  - News는 목록/상세 모델링이 먼저 필요
- **에러/로딩/빈 상태**
  - 각 View별로 Loading Skeleton/Empty/Error 상태 정의 필요

