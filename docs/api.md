# API 명세

## 사용 중인 API

| # | API | 상태 | 용도 |
|---|-----|------|------|
| 1 | **football-data.org** | ✅ 연동 완료 | 경기 일정, 순위, 스쿼드 |
| 2 | **TheSportsDB** | ✅ 이미지 수집 완료 | 선수 사진 URL |
| 3 | **YouTube Data API v3** | ⚠️ 목데이터 | 하이라이트 영상 |
| 4 | **NewsAPI.org** | ⚠️ 목데이터 | 최신 뉴스 |

---

## 1. football-data.org

### 기본 정보

| 항목 | 값 |
|------|-----|
| Base URL | `https://api.football-data.org/v4` |
| 인증 | `X-Auth-Token: {API_KEY}` 헤더 |
| 무료 Rate Limit | 10 req / min |
| 캐시 TTL | 5분 (인메모리) |
| 실제 호출 경로 | `/api/football-data/*` (CORS 프록시 경유) |

### 사용 엔드포인트

#### 경기 일정 (Fixtures)

```
GET /v4/teams/64/matches?status=SCHEDULED    예정 경기
GET /v4/teams/64/matches?status=FINISHED     완료 경기
```

**응답 구조:**
```json
{
  "matches": [
    {
      "id": 123456,
      "utcDate": "2025-04-05T14:00:00Z",
      "status": "SCHEDULED",
      "competition": {
        "id": 2021,
        "name": "Premier League",
        "code": "PL"
      },
      "homeTeam": {
        "id": 64,
        "name": "Liverpool FC",
        "crest": "https://crests.football-data.org/64.png"
      },
      "awayTeam": {
        "id": 57,
        "name": "Arsenal FC",
        "crest": "https://crests.football-data.org/57.png"
      },
      "score": {
        "fullTime": { "home": null, "away": null },
        "halfTime": { "home": null, "away": null }
      },
      "venue": "Anfield"
    }
  ]
}
```

**앱 내 매핑 (`Fixture` 타입):**
```typescript
{
  date: string          // "Sat 05 Apr · 15:00"
  utcDate?: string      // ISO 원본
  team1: string         // 홈팀명
  score1: number | null // 홈팀 득점
  team2: string         // 원정팀명
  score2: number | null // 원정팀 득점
  upcoming?: boolean    // 예정 경기 여부
  win?: boolean         // Liverpool 승리 여부
  league: 'PL' | 'UCL' | 'FAC'
  team1Crest?: string   // 팀 엠블럼 URL
  team2Crest?: string
  venue?: string
}
```

---

#### 리그 순위 (Standings)

```
GET /v4/competitions/2021/standings    프리미어리그 (PL)
GET /v4/competitions/2001/standings    챔피언스리그 (UCL)
GET /v4/competitions/2055/standings    FA Cup
```

**Competition ID 매핑:**
| 대회 | ID | 코드 |
|------|-----|------|
| Premier League | 2021 | PL |
| Champions League | 2001 | UCL |
| FA Cup | 2055 | FAC |

**응답 구조:**
```json
{
  "standings": [
    {
      "stage": "REGULAR_SEASON",
      "table": [
        {
          "position": 1,
          "team": {
            "id": 64,
            "name": "Liverpool FC",
            "crest": "https://crests.football-data.org/64.png"
          },
          "playedGames": 30,
          "won": 22,
          "draw": 5,
          "lost": 3,
          "goalsFor": 68,
          "goalsAgainst": 28,
          "goalDifference": 40,
          "points": 71,
          "form": "WWWDW"
        }
      ]
    }
  ]
}
```

**앱 내 매핑 (`StandingsRow` 타입):**
```typescript
{
  pos: string             // "1"
  club: string            // "Liverpool FC"
  pl: number              // 경기 수
  w: number               // 승
  d: number               // 무
  l: number               // 패
  gd: string              // "+40"
  pts: number | '-'       // 71
  zone: 'gold' | 'blue' | 'red'  // 존 색상
  highlight?: boolean     // Liverpool 여부
  form: ('W' | 'D' | 'L')[]      // 최근 5경기
  crest?: string          // 팀 엠블럼 URL
}
```

**존 분류 기준 (PL):**
- `gold`: 1~4위 (UCL 진출)
- `blue`: 5~6위 (UEL/UECL)
- `red`: 18~20위 (강등권)

---

#### 스쿼드 (Squad)

```
GET /v4/teams/64    Liverpool FC 팀 정보 + 스쿼드
```

**응답 구조:**
```json
{
  "id": 64,
  "name": "Liverpool FC",
  "crest": "https://crests.football-data.org/64.png",
  "squad": [
    {
      "id": 44843,
      "name": "Mohamed Salah",
      "firstName": "Mohamed",
      "lastName": "Salah",
      "dateOfBirth": "1992-06-15",
      "nationality": "Egypt",
      "position": "Right Winger",
      "shirtNumber": 11,
      "marketValue": null,
      "contract": {
        "start": "2017-06-01",
        "until": "2027-06-30"
      }
    }
  ]
}
```

**앱 내 포지션 매핑:**
| API `position` | 앱 `positionGroup` |
|---|---|
| Goalkeeper | GK |
| Centre-Back, Left-Back, Right-Back | DEF |
| Central Midfield, Defensive Midfield, Attacking Midfield | MID |
| Centre-Forward, Left Winger, Right Winger | FWD |

**등번호 처리:**
- API에서 제공될 경우 `shirtNumber` 사용
- `null`인 경우 `src/services/footballData.ts`의 `SHIRT_NUMBERS` 맵에서 수동 매핑

---

## 2. TheSportsDB

### 기본 정보

| 항목 | 값 |
|------|-----|
| Base URL | `https://www.thesportsdb.com/api/v1/json/3` |
| 인증 | 없음 (무료 공개 key=3) |
| CDN | `https://r2.thesportsdb.com/...` |
| 용도 | 선수 사진 URL 수집 (일회성) |

### 사용 엔드포인트

```
GET /searchplayers.php?t=Liverpool    Liverpool 선수 검색
```

**응답의 이미지 필드:**
```json
{
  "player": [
    {
      "strPlayer": "Mohamed Salah",
      "strThumb": "https://r2.thesportsdb.com/.../Mohamed_Salah_Thumb.jpg",
      "strCutout": "https://r2.thesportsdb.com/.../Mohamed_Salah_Cutout.png",
      "strRender": "https://r2.thesportsdb.com/.../Mohamed_Salah_Render.png"
    }
  ]
}
```

**앱 내 사용:**
- `image` → `strCutout` (PNG 배경 없음, 선수 카드용)
- `heroImage` → `strThumb` (JPG, 프로필 히어로 배경용)
- URL은 `src/data/players.ts`에 하드코딩 (매번 API 호출 X)

**이미지 수집 현황:**
| 상태 | 선수 수 |
|------|---------|
| ✅ 이미지 있음 | 약 19명 |
| ❌ 이미지 없음 (플레이스홀더) | 약 19명 |

---

## 3. YouTube Data API v3 (목데이터)

> **현재 상태**: 실제 API 연동 미완료. `src/data/matchHighlights.ts`에 목데이터 하드코딩.

### 계획 엔드포인트

```
GET https://www.googleapis.com/youtube/v3/search
  ?part=snippet
  &channelId=UCNAf1k0yIjyGu3k9BwAg3lg   ← LFC 공식 채널
  &type=video
  &order=date
  &maxResults=6
  &key={YOUTUBE_API_KEY}
```

**예상 응답:**
```json
{
  "items": [
    {
      "id": { "videoId": "abc123xyz" },
      "snippet": {
        "title": "Liverpool 3-1 Arsenal | Highlights",
        "publishedAt": "2025-04-05T18:00:00Z",
        "thumbnails": {
          "high": { "url": "https://i.ytimg.com/vi/abc123xyz/hqdefault.jpg" }
        }
      }
    }
  ]
}
```

**앱 내 필요 타입 (`MatchHighlight`):**
```typescript
{
  id: string          // YouTube videoId
  title: string
  date: string        // "5 Apr 2025"
  thumbnail: string   // hqdefault.jpg URL
  videoId: string     // iframe embed용
}
```

**제약:**
- 무료 할당량: 10,000 units/day (검색 = 100 units/req)
- 환경변수: `VITE_YOUTUBE_API_KEY`

---

## 4. NewsAPI.org (목데이터)

> **현재 상태**: 실제 API 연동 미완료. `src/data/news.ts`에 목데이터 하드코딩.

### 계획 엔드포인트

```
GET https://newsapi.org/v2/everything
  ?q=Liverpool+FC
  &language=en
  &sortBy=publishedAt
  &pageSize=6
  &apiKey={NEWS_API_KEY}
```

**예상 응답:**
```json
{
  "articles": [
    {
      "title": "Liverpool extend lead at top of Premier League",
      "description": "Mohamed Salah's hat-trick...",
      "url": "https://bbc.co.uk/sport/...",
      "urlToImage": "https://ichef.bbci.co.uk/...",
      "publishedAt": "2025-04-05T20:30:00Z",
      "source": { "name": "BBC Sport" }
    }
  ]
}
```

**앱 내 필요 타입 (`NewsCard`):**
```typescript
{
  title: string
  tag: string         // source.name
  loc: string         // publishedAt → "2h ago"
  img: string         // urlToImage
}
```

**제약:**
- 무료 할당량: 100 req/day
- 무료 플랜은 24시간 이전 기사만 접근 가능
- `urlToImage` null 케이스 처리 필요
- **CORS 문제**: 서버사이드 프록시 필요 (NewsAPI는 브라우저 직접 호출 차단)
- 환경변수: `VITE_NEWS_API_KEY` (프록시 통해 전달)

---

## CORS 프록시 구조

로컬 개발과 프로덕션에서 각각 다른 프록시 사용:

### 로컬 (Vite Proxy)
`vite.config.ts`:
```typescript
server: {
  proxy: {
    '/api/football-data': {
      target: 'https://api.football-data.org/v4',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/football-data/, ''),
      headers: { 'X-Auth-Token': env.VITE_FOOTBALL_DATA_API_KEY }
    }
  }
}
```

### 프로덕션 (Vercel Serverless)
`vercel.json`:
```json
{
  "rewrites": [
    { "source": "/api/football-data/:path*", "destination": "/api/proxy?path=:path*" }
  ]
}
```

`api/proxy.js`:
```javascript
export default async function handler(req, res) {
  const path = req.query.path ?? '';
  const target = new URL(`https://api.football-data.org/v4/${path}`);
  // 쿼리스트링 전달
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  reqUrl.searchParams.forEach((value, key) => {
    if (key !== 'path') target.searchParams.set(key, value);
  });
  const response = await fetch(target.toString(), {
    headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY ?? '' }
  });
  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(response.status).json(data);
}
```
