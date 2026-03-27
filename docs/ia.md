# IA (Information Architecture) / 화면 구조

이 문서는 **현재 구현된 화면**을 기준으로 한 IA입니다.  
현재는 라우터가 없어서 URL 기반 IA가 아니라 **네비게이션/엔티티 중심 IA**로 정리합니다.

## 1) 글로벌 내비게이션

### Top App Bar (`src/components/layout/TopAppBar.tsx`)
- **홈 이동**: 타이틀 “KOPZONE” 클릭 → `home`
- **기타 아이콘(Menu/Search)**: 현행은 UI만 존재(동작 없음)

### Bottom Navigation (`src/components/layout/BottomNavBar.tsx`)
- **MATCHDAY** → `home`
- **NEWS** → `news`
- **SQUAD** → `squad`
- **STATS** → `standings`
- **ALERTS** → `alerts`

## 2) 화면(Screens) 맵

- **Home / Matchday** (`home`)
  - Next Fixture (요약)
  - Match Highlights (리스트 → 모달)
  - Latest News (리스트 → News 상세로 이동)
  - Last Match (요약)

- **Fixtures / Schedule** (`fixtures`)
  - 리그 필터(ALL/PL/UCL/FAC)
  - Next Match Spotlight
  - Fixtures 리스트(예정/결과)

- **Squad** (`squad`)
  - Featured Player
  - 선수 그리드
  - 선수 클릭 → Player Profile로 진입

- **Player Profile** (`player`)
  - 선수 상세: 히어로/영상/스탯/레이더/최근폼 등

- **Standings / Stats** (`standings`)
  - 리그 탭(PL/UCL/FAC)
  - 순위표
  - 인사이트 카드

- **News Detail** (`news`)
  - 기사 상세(현재는 고정 1개)

- **Alerts** (`alerts`)
  - 빈 상태(알림 없음)

## 3) 핵심 엔티티(도메인) & 관계

- **Fixture(경기)**  
  - Home: 다음 경기/지난 경기 요약(확장 가능)
  - Fixtures: 리스트/필터/상세(향후)

- **Player(선수)**  
  - Squad: 선수 목록
  - Player Profile: 선수 상세

- **Standings(순위)**  
  - Standings: 리그별 순위표

- **News(뉴스)**  
  - Home: 최신 뉴스 카드 일부
  - News: 상세(현재) / 목록(향후)

- **Alert(알림)**  
  - Alerts: 목록/설정(향후)

## 4) 향후 URL 기반 IA(권장안)

라우팅 도입 시(예: `react-router`) 아래처럼 매핑하는 것을 권장합니다.

- `/` → Home
- `/fixtures` → Fixtures
- `/squad` → Squad
- `/players/:id` → Player Profile
- `/standings` → Standings
- `/news` → News 목록
- `/news/:id` → News 상세
- `/alerts` → Alerts

