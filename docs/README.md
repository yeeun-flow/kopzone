# Kopzone — Liverpool FC Dashboard

> Liverpool FC 팬을 위한 실시간 대시보드. 경기 일정, 순위, 스쿼드, 뉴스를 한눈에.

---

## 문서 목차

| 파일 | 내용 |
|------|------|
| [`api.md`](./api.md) | 사용 중인 API 목록, 용도, 데이터 포맷 |
| [`screens.md`](./screens.md) | 화면 구성 및 기능 명세 |
| [`roadmap.md`](./roadmap.md) | 앞으로 구현할 기능 목록 |

---

## 프로젝트 개요

```
Kopzone
├── 실시간 API 데이터  (football-data.org)
├── 서버리스 CORS 프록시  (Vercel Function)
├── 5분 인메모리 캐시
└── 목데이터 폴백  (뉴스 · 하이라이트)
```

### 기술 스택

| 영역 | 기술 |
|------|------|
| UI Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion (motion/react) |
| Icons | Lucide React |
| Hosting | Vercel |
| API | football-data.org (free tier) |

### 환경변수

```env
# 로컬 개발 — .env 파일에 저장 (Git 미포함)
VITE_FOOTBALL_DATA_API_KEY=...

# Vercel 프로덕션 — Vercel Dashboard > Environment Variables
FOOTBALL_DATA_API_KEY=...       # VITE_ 접두어 없음 (서버사이드)
```

### 실행 방법

```bash
# 개발 서버 (포트 3000)
npm run dev

# 프로덕션 빌드
npm run build

# 타입 검사
npm run lint
```

---

## 아키텍처 흐름

```
Browser
  │
  ├─ [Dev]  /api/football-data/*
  │          └─→ Vite proxy → football-data.org (+ X-Auth-Token)
  │
  └─ [Prod] /api/football-data/*
             └─→ vercel.json rewrite → api/proxy.js (serverless)
                  └─→ football-data.org (+ process.env.FOOTBALL_DATA_API_KEY)
```

### 캐시 전략

- `footballData.ts` 내 `Map<string, { data, ts }>` 인메모리 캐시
- TTL: **5분**
- 같은 URL 재요청 시 캐시 응답 반환 → API Rate Limit(10 req/min) 보호

---

## 디렉토리 구조

```
the-anfield-edit/
├── api/
│   └── proxy.js                 # Vercel serverless CORS proxy
├── src/
│   ├── App.tsx                  # 라우터 + 레이아웃 쉘
│   ├── main.tsx
│   ├── index.css                # Tailwind theme + 커스텀 컴포넌트
│   ├── components/layout/
│   │   ├── TopAppBar.tsx
│   │   └── BottomNavBar.tsx
│   ├── views/                   # 7개 페이지 뷰
│   ├── hooks/                   # 데이터 페칭 훅
│   ├── services/
│   │   └── footballData.ts      # API 클라이언트
│   ├── types/                   # TypeScript 타입 정의
│   └── data/                    # 목데이터 (뉴스·하이라이트)
├── docs/                        # 이 문서들
├── index.html
├── vite.config.ts
├── vercel.json
└── package.json
```
