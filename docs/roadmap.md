# 개발 로드맵

## 현재 완료된 기능

### ✅ Phase 0 — 기반 구축
- [x] React + TypeScript + Vite + Tailwind CSS v4 환경 설정
- [x] 디자인 시스템 (색상 토큰, 타이포그래피, 커스텀 컴포넌트)
- [x] 네비게이션 구조 (TopAppBar + BottomNavBar + 뷰 라우터)
- [x] AnimatePresence 페이지 전환

### ✅ Phase 1 — football-data.org 연동
- [x] Vite 프록시 설정 (로컬 개발 CORS 우회)
- [x] Vercel Serverless Function (`api/proxy.js`) 설정
- [x] `vercel.json` 리라이트 규칙
- [x] 5분 인메모리 캐시 (`cachedFetch`)
- [x] 경기 일정 실시간 연동 (`useFixtures`)
- [x] 리그 순위 실시간 연동 (`useStandings`)
- [x] 스쿼드 실시간 연동 (`useSquad`)
- [x] 팀 엠블럼 URL 자동 수집 (`team.crest`)

### ✅ Phase 2 — 스쿼드 상세
- [x] 38명 전체 선수 등록 (`src/data/players.ts`)
- [x] TheSportsDB 선수 사진 수집 (약 19명)
- [x] `footballDataId` 기반 API 데이터 ↔ 정적 데이터 병합
- [x] 포지션 그룹별 선수 카드 그리드
- [x] 피처드 플레이어 캐러셀 (6초 자동 전환, MVP 라벨)

### ✅ Phase 3 — PlayerProfile
- [x] 히어로 이미지 / 그라디언트 폴백
- [x] 시즌 스탯 (선택적 렌더링)
- [x] 레이더 차트 (SVG)
- [x] 전술 분석 메트릭 바
- [x] 최근 경기 폼 테이블
- [x] 5명 주요 선수 풀 스탯 등록 (Salah, Van Dijk, Mac Allister, Wirtz, Gravenberch)

### ✅ Phase 4 — 모바일 UX
- [x] StandingsView 반응형 컬럼 (GD: sm+, FORM: md+)
- [x] POS 컬럼 sticky 고정
- [x] 스크롤 페이드 힌트
- [x] FA Cup 탈락 메시지 처리
- [x] 앱 타이틀 "Kopzone — Liverpool FC" 변경

### ✅ 배포
- [x] Vercel 자동 배포 (main 브랜치 push → 빌드)
- [x] 프로덕션 환경변수 설정
- [x] 도메인: `kopzone.vercel.app`

---

## 앞으로 구현할 것들

---

### 🔴 Phase 5 — 나머지 선수 스탯 완성 (우선순위: 높음)

**문제**: 38명 중 5명만 풀 스탯 보유. 나머지는 "Season stats coming soon" 플레이스홀더.

**할 일:**
- [ ] 주요 선수 14명 추가 스탯 입력 (골/어시스트/출전시간)
  - Alisson, Alexander-Arnold, Robertson, Konaté, Gakpo, Núñez, Szoboszlai, Endo, Diaz, Jones, Bradley, Kerkez
- [ ] `recentForm` 3경기 데이터 추가 (주요 선수)
- [ ] 레이더 수치 추가 (주요 선수)
- [ ] 나머지 19명 TheSportsDB 사진 재시도 또는 직접 수집

**예상 공수**: 수동 데이터 입력 1-2시간

---

### 🔴 Phase 6 — YouTube API 연동 (우선순위: 높음)

**문제**: 하이라이트가 목데이터. 오래된 영상 고정 표시.

**할 일:**
- [ ] Google Cloud Console에서 YouTube Data API v3 키 발급
- [ ] `api/proxy.js`를 확장하거나 별도 `api/youtube.js` Vercel Function 생성
- [ ] `src/services/youtubeData.ts` 작성
  ```typescript
  fetchHighlights() → GET youtube/v3/search?channelId=UCNAf1k0yIjyGu3k9BwAg3lg&type=video&order=date
  ```
- [ ] `useHighlights` 훅 작성
- [ ] HomeView 하이라이트 섹션 실제 데이터로 교체
- [ ] 환경변수: `VITE_YOUTUBE_API_KEY` (로컬) + `YOUTUBE_API_KEY` (Vercel)

**고려사항:**
- 무료 할당량: 10,000 units/day, 검색 = 100 units
- 하루 100회 호출 가능 → 캐시 필수 (최소 1시간 TTL)
- LFC 공식 채널: `UCNAf1k0yIjyGu3k9BwAg3lg`

---

### 🔴 Phase 7 — NewsAPI 연동 (우선순위: 높음)

**문제**: 뉴스가 목데이터. 실제 최신 기사 미노출.

**할 일:**
- [ ] NewsAPI.org 계정 생성 + API 키 발급
- [ ] `api/news.js` Vercel Function 작성 (CORS 문제로 서버사이드 필수)
- [ ] `src/services/newsData.ts` 작성
- [ ] `useNews` 훅 작성
- [ ] HomeView 뉴스 섹션 실제 데이터로 교체
- [ ] `urlToImage` null 케이스 처리 (플레이스홀더 이미지)
- [ ] 환경변수: `NEWS_API_KEY` (Vercel)

**고려사항:**
- 무료 할당량: 100 req/day → 캐시 최소 30분
- 무료 플랜: 24시간 딜레이 (최신 기사 제한)
- 유료 전환 시 실시간 기사 접근 가능 ($449/month)
- 대안: The Guardian API (무료, 실시간) 검토

---

### 🟡 Phase 8 — 실시간 경기 라이브스코어 (우선순위: 중간)

**현재**: 경기 중 스코어 업데이트 없음.

**할 일:**
- [ ] 경기 중 감지: `status === 'IN_PLAY' || 'PAUSED'`
- [ ] 폴링 로직: 경기 중에만 30초마다 재요청
- [ ] HomeView에 라이브 스코어 배너 추가
- [ ] "LIVE" 인디케이터 + 현재 스코어 표시
- [ ] 경기 종료 시 폴링 중단

**구현 힌트:**
```typescript
// 경기 중이면 30초, 아니면 5분 캐시
const TTL = isLive ? 30_000 : 300_000;
```

---

### 🟡 Phase 9 — 통계 인사이트 실제 데이터화 (우선순위: 중간)

**문제**: StandingsView 하단 통계 카드가 하드코딩.

**할 일:**
- [ ] `GET /v4/competitions/2021/scorers?season=2025` → 득점 순위
- [ ] Liverpool 선수 골/어시스트 자동 계산
- [ ] Anfield 홈 경기 승리 수 자동 계산
- [ ] 클린시트 수 자동 계산 (Alisson 출전 경기 기준)
- [ ] 경기당 평균 골 계산

---

### 🟡 Phase 10 — AlertsView 구현 (우선순위: 중간)

**현재**: 빈 플레이스홀더.

**할 일:**
- [ ] 브라우저 Push Notification API 연동 (허가 요청)
- [ ] 알림 종류:
  - 경기 시작 1시간 전
  - 골 알림 (라이브스코어 기반)
  - 경기 결과 (종료 후)
- [ ] Service Worker 등록
- [ ] Vercel에서 Web Push 발송 가능한 구조 설계

---

### 🟢 Phase 11 — UX 개선 (우선순위: 낮음)

**할 일:**
- [ ] TopAppBar 햄버거 메뉴 사이드 드로어 구현
- [ ] FixturesView 월 필터 실제 동작 연결 (현재 UI만)
- [ ] 검색 기능 (선수/경기 검색)
- [ ] Dark/Light 테마 토글 (현재 다크 전용)
- [ ] PWA 설정 (manifest.json + Service Worker)
  - 홈 화면 추가
  - 오프라인 폴백

---

### 🟢 Phase 12 — 성능 최적화 (우선순위: 낮음)

**할 일:**
- [ ] 이미지 최적화: WebP 변환, lazy loading
- [ ] 코드 스플리팅: 각 View를 `React.lazy()` + `Suspense`로
- [ ] API 캐시 지속성: `localStorage` 폴백 (앱 재시작 후에도 유지)
- [ ] Lighthouse 점수 90+ 달성

---

## 우선순위 요약

| 순위 | Phase | 내용 | 예상 공수 |
|------|-------|------|----------|
| 1 | Phase 5 | 나머지 선수 스탯 입력 | 2-3시간 |
| 2 | Phase 6 | YouTube 하이라이트 실연동 | 3-4시간 |
| 3 | Phase 7 | NewsAPI 뉴스 실연동 | 2-3시간 |
| 4 | Phase 8 | 라이브스코어 폴링 | 3-4시간 |
| 5 | Phase 9 | 통계 인사이트 자동화 | 2시간 |
| 6 | Phase 10 | 푸시 알림 | 5-6시간 |
| 7 | Phase 11 | UX 개선 | 4-5시간 |
| 8 | Phase 12 | 성능 최적화 | 3-4시간 |

---

## 알려진 버그 / 개선 필요

| 이슈 | 심각도 | 설명 |
|------|--------|------|
| 선수 이미지 없음 | 중간 | 약 19명 사진 미수집. 플레이스홀더 표시 |
| FixturesView 월 필터 | 낮음 | 탭 UI는 있으나 실제 필터 동작 미구현 |
| 통계 카드 하드코딩 | 낮음 | StandingsView 하단 인사이트 정적 데이터 |
| FA Cup 데이터 | 낮음 | 탈락 시 에러로 처리 (설계된 동작) |
| TopAppBar 메뉴 | 낮음 | 햄버거 아이콘 클릭 시 동작 없음 |
| News 이미지 깨짐 | 낮음 | 목데이터 외부 이미지 URL 만료 가능성 |
