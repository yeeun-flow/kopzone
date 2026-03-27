# 화면 구성 및 기능 명세

## 네비게이션 구조

```
앱 진입
  └── App.tsx (뷰 상태 관리)
        ├── TopAppBar (고정 헤더)
        ├── [뷰 영역] ← AnimatePresence 페이지 전환
        │    ├── HomeView         (MATCHDAY)
        │    ├── FixturesView     (MATCHDAY 탭)
        │    ├── StandingsView    (STATS)
        │    ├── SquadView        (SQUAD)
        │    ├── PlayerProfileView (SQUAD → 선수 클릭)
        │    ├── NewsDetailView   (NEWS → 뉴스 클릭)
        │    └── AlertsView       (ALERTS)
        └── BottomNavBar (고정 하단 탭)
```

### 하단 탭 바

| 탭 | 아이콘 | 이동 뷰 |
|---|---|---|
| MATCHDAY | `Calendar` | HomeView |
| NEWS | `Newspaper` | HomeView (뉴스 섹션으로) |
| SQUAD | `Users` | SquadView |
| STATS | `BarChart2` | StandingsView |
| ALERTS | `Bell` | AlertsView |

---

## 화면별 상세 명세

---

### 1. HomeView (홈 대시보드)

**진입**: 앱 최초 실행, MATCHDAY 탭

#### 섹션 구성

**[1] 다음 경기 (Next Fixture)**
- 홈/원정팀 이름 + 엠블럼
- 경기 날짜 · 시간 · 장소 · 대회명
- **실시간 카운트다운 타이머** (일/시/분/초, 1초 업데이트)
- 데이터 출처: `useFixtures` → API

**[2] 하이라이트 (Match Highlights)**
- YouTube 썸네일 카드 2열 그리드
- 카드 클릭 → 모달 팝업으로 YouTube iframe 재생
- 데이터 출처: `src/data/matchHighlights.ts` (목데이터)

**[3] 최신 뉴스 (Latest News)**
- 가로 스크롤 카드 목록
- 카드: 이미지 + 태그(출처) + 제목 + 날짜
- 카드 클릭 → NewsDetailView
- 데이터 출처: `src/data/news.ts` (목데이터)

**[4] 최근 경기 결과 (Last Match)**
- 홈/원정 팀명 + 점수
- WIN / DRAW / LOSS 뱃지
- 데이터 출처: `useFixtures` → API

#### 상태 처리
- 로딩: 스켈레톤 카드
- 에러: "Failed to load" 텍스트

---

### 2. FixturesView (경기 일정)

**진입**: TopAppBar의 경기 정보 클릭

#### 섹션 구성

**[1] 필터 탭 (리그)**
```
ALL | PL | UCL | FAC
```
- 선택된 탭: 빨간 하단 보더 + 배경 강조

**[2] 필터 버튼 (월)**
```
MAR | APR | MAY | JUN
```
- 해당 월 경기만 표시

**[3] 경기 카드 목록**

*예정 경기:*
- 날짜 + 시간 (상단)
- 홈팀 — TBC — 원정팀
- 팀 엠블럼 (없으면 이니셜)
- 대회 뱃지 (PL / UCL / FAC)
- 상단 빨간 보더 라인

*완료 경기:*
- 날짜 + 시간
- 홈팀 — 스코어 — 원정팀
- WIN 뱃지 (Liverpool 승리 시)

#### 데이터
- 출처: `useFixtures` → `fetchLiverpoolFixtures()`
- API: `GET /v4/teams/64/matches?status=SCHEDULED`
- API: `GET /v4/teams/64/matches?status=FINISHED`

---

### 3. StandingsView (순위표)

**진입**: STATS 탭

#### 섹션 구성

**[1] 리그 탭**
```
Premier League | Champions League | FA Cup
```

**[2] 순위 테이블**

| 컬럼 | 모바일 | 태블릿+ | 설명 |
|------|--------|---------|------|
| POS | ✅ sticky | ✅ sticky | 순위, 왼쪽 고정 |
| CLUB | ✅ | ✅ | 팀명 + 엠블럼 |
| PL | ✅ | ✅ | 경기 수 |
| W | ✅ | ✅ | 승 |
| D | ✅ | ✅ | 무 |
| L | ✅ | ✅ | 패 |
| GD | ❌ hidden | ✅ | 골 득실차 |
| PTS | ✅ | ✅ | 포인트 |
| FORM | ❌ hidden | ✅ md+ | 최근 5경기 |

**존 색상 (PL 기준):**
- 🟡 `gold` — 1~4위: UCL 진출
- 🔵 `blue` — 5~6위: UEL/UECL
- 🔴 `red` 강조 — Liverpool FC 행
- POS 셀 왼쪽에 존 색상 4px 보더

**모바일 UX:**
- POS 컬럼 `sticky left-0 z-10` (가로 스크롤 시 고정)
- 테이블 우측 페이드 오버레이 (`sm:hidden`)
- 하단 안내: "scroll for GD · form on tablet+"

**FA Cup 탈락 상태:**
- 에러 발생 시 "OUT — Liverpool have been eliminated from the FA Cup" 표시

**[3] 통계 인사이트 (Statistical Insights)**

3개 카드:
| 카드 | 레이블 | 값 |
|------|--------|-----|
| WINS AT ANFIELD | Home Dominance | 11 / 14 Played |
| CLEAN SHEETS | Defensive Rigor | 09 (Ranked 2nd) |
| GOALS PER GAME | Attacking Output | 2.4 AVG |

> ⚠️ 현재 하드코딩된 정적 데이터. 추후 API 연동 필요.

#### 데이터
- 출처: `useStandings` → `fetchStandings()`
- API: `GET /v4/competitions/{id}/standings`

---

### 4. SquadView (스쿼드)

**진입**: SQUAD 탭

#### 섹션 구성

**[1] 피처드 플레이어 히어로**

6초마다 자동 전환하는 8명 캐러셀:
| 선수 | 라벨 |
|------|------|
| Mohamed Salah | TOP SCORER |
| Virgil van Dijk | CAPTAIN |
| Florian Wirtz | NEW SIGNING |
| Alexis Mac Allister | MOST CREATIVE |
| Ryan Gravenberch | BEST FORM |
| Cody Gakpo | RISING |
| Alisson Becker | CLEAN SHEET KING |
| Trent Alexander-Arnold | ASSIST KING |

- 배경 이미지 크로스페이드 (AnimatePresence)
- 선수 이름/번호/포지션 슬라이드인 애니메이션
- 스탯 미리보기 (Goals / Assists / Minutes, `stats` 있을 때)
- 우측 하단 인디케이터 도트 (수동 이동 가능)
- 클릭 → PlayerProfileView

**[2] 포지션 그룹별 선수 목록**
```
GOALKEEPERS | DEFENDERS | MIDFIELDERS | FORWARDS
```
- 2열 그리드 (모바일) / 4열 (태블릿+)
- 각 카드:
  - 선수 사진 (없으면 등번호 플레이스홀더)
  - 등번호 뱃지 (우상단)
  - 이름 + 포지션
- 클릭 → PlayerProfileView

#### 데이터
- API 스쿼드: `useSquad` → `fetchSquad()` → `GET /v4/teams/64`
- 상세 데이터 (스탯/레이더): `src/data/players.ts` (반정적)
- 병합 기준: `footballDataId` (API ID) 매핑

---

### 5. PlayerProfileView (선수 프로필)

**진입**: SquadView 선수 카드 클릭

#### 섹션 구성

**[1] 히어로 배너**
- 대형 선수 사진 (heroImage) 또는 키네틱 그라디언트
- 등번호 (대형)
- 이름 + 포지션 + 국적
- 데뷔 시즌 뱃지

**[2] 하이라이트 영상** (highlightVideoId 있을 때)
- YouTube iframe 임베드

**[3] 시즌 스탯** (stats 있을 때)
```
Goals | Assists | Minutes | Yellow | Red
```
없을 때: "Season stats coming soon" 플레이스홀더

**[4] 레이더 차트** (radar 있을 때)
6축 육각형 SVG:
```
Pace | Shooting | Passing | Dribbling | Defending | Physical
```

**[5] 전술 분석** (metrics 있을 때)
- 텍스트 분석 문구
- 지표 바 (Progress Bar 형태)

**[6] 최근 경기 폼** (recentForm 있을 때)
테이블:
```
날짜 | 상대 | 결과 | G/A | xG | 평점
```

**[7] 하단 배너**
- "CHASING RECORDS" 섹션

#### 데이터 소스
- 기본 정보: `useSquad` API 데이터
- 스탯/레이더: `src/data/players.ts` 반정적 데이터
- 선수 없을 경우: "Player not found" 404 상태

---

### 6. NewsDetailView (뉴스 상세)

**진입**: HomeView 뉴스 카드 클릭

#### 섹션 구성
- 대형 히어로 이미지
- "EXCLUSIVE ACCESS" 뱃지
- 제목 (대형 헤드라인 서체)
- 작성자 + 날짜 메타
- 본문 텍스트
- 인용구 (blockquote)

#### 데이터
- 출처: `src/data/news.ts` (목데이터)

---

### 7. AlertsView (알림)

**진입**: ALERTS 탭

#### 현재 상태
- 빈 상태: Bell 아이콘 + "NO NEW ALERTS" 텍스트
- 기능 미구현 (Roadmap Phase 6)

---

## 공통 컴포넌트

### TopAppBar

| 위치 | 내용 |
|------|------|
| 좌측 | Menu 아이콘 (현재 미구현) |
| 중앙 | "THE ANFIELD EDIT" → 클릭 시 HomeView |
| 우측 | 다음 경기 정보 (Fixtures 뷰) / "LIVE" 뱃지 / Search 아이콘 |

### BottomNavBar
- 5개 탭 고정
- 활성 탭: 빨간 색상 + 위쪽 드롭섀도 + scale(1.1)
- 배경: backdrop-blur

---

## 디자인 시스템

### 색상

| 토큰 | 값 | 용도 |
|------|-----|------|
| `primary-red` | #C8102E | 강조, 활성 탭, Liverpool 하이라이트 |
| `gold` | #E9C349 | 레이블, UCL 존 |
| `surface` | #131313 | 앱 배경 |
| `surface-low` | #1C1B1B | 카드/테이블 배경 |
| `surface-high` | #2A2A2A | 헤더/강조 배경 |
| `surface-lowest` | #0E0E0E | 가장 어두운 배경 |
| `text-primary` | #E5E2E1 | 기본 텍스트 |
| `text-muted` | #E5BDBB | 보조 텍스트 |

### 타이포그래피

| 클래스 | 폰트 | 용도 |
|--------|------|------|
| `font-headline` | Epilogue Black Italic | 타이틀, 점수, 강조 수치 |
| `font-body` | Plus Jakarta Sans | 본문 |
| `font-label` | Inter | 레이블, 통계, 태그 |

### 애니메이션
- 페이지 전환: `opacity: 0 → 1` (motion/react AnimatePresence)
- 선수 캐러셀: crossfade 배경 + x: 20 → 0 슬라이드인
- 스켈레톤: `animate-pulse` (Tailwind)
