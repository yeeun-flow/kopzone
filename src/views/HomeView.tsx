import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { View } from '@/src/types/view';
import type { Fixture } from '@/src/types/fixture';
import { useFixtures } from '@/src/hooks/useFixtures';
import { ArrowRight, ChevronLeft, ChevronRight, Trophy, X } from 'lucide-react';

// ─── 이미지 상수 ──────────────────────────────────────────────────────────────
const ANFIELD_BG =
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1280&q=80';

const FEATURED_NEWS_IMG =
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80';

const TACTICAL_IMG =
  'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80';

const KOP_IMG =
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80';

const VVD_IMG =
  'https://www.thesportsdb.com/images/media/player/thumb/v6ky431661865327.jpg';

// ─── 카운트다운 훅 ────────────────────────────────────────────────────────────
function useCountdown(utcDate?: string) {
  const calc = () => {
    if (!utcDate) return { days: 0, hours: 0, mins: 0, secs: 0 };
    const diff = new Date(utcDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      mins: Math.floor((diff % 3_600_000) / 60_000),
      secs: Math.floor((diff % 60_000) / 1_000),
    };
  };

  const [time, setTime] = useState(calc);
  useEffect(() => {
    if (!utcDate) return;
    const id = setInterval(() => setTime(calc()), 1_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utcDate]);

  return time;
}

// ─── 팀 크레스트 ──────────────────────────────────────────────────────────────
function Crest({
  src,
  alt,
  size = 'md',
}: {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const s = { sm: 'w-10 h-10', md: 'w-14 h-14', lg: 'w-16 h-16' }[size];
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${s} object-contain`}
        referrerPolicy="no-referrer"
      />
    );
  }
  return <Trophy className={`${size === 'lg' ? 'w-10 h-10' : 'w-7 h-7'} opacity-30`} />;
}

// ─── 리그 이름 변환 ───────────────────────────────────────────────────────────
function leagueName(code: string) {
  if (code === 'UCL') return 'CHAMPIONS LEAGUE';
  if (code === 'FAC') return 'FA CUP';
  return 'PREMIER LEAGUE';
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ match }: { match: Fixture }) {
  const { days, hours, mins, secs } = useCountdown(match.utcDate);
  const pad = (n: number) => String(n).padStart(2, '0');

  const livIsHome =
    match.team1.toUpperCase().includes('LIVERPOOL') || match.team1.toUpperCase() === 'LIV';
  // LFC는 항상 상단에 표시 (홈/어웨이 무관)
  const livCrest = livIsHome ? match.team1Crest : match.team2Crest;
  const oppCrest = livIsHome ? match.team2Crest : match.team1Crest;
  const oppName = livIsHome ? match.team2 : match.team1;
  const oppAbbr = oppName.slice(0, 3).toUpperCase();

  const countdownItems = [
    { label: 'DAYS', val: pad(days), barClass: 'opacity-100' },
    { label: 'HRS', val: pad(hours), barClass: 'opacity-50' },
    { label: 'MINS', val: pad(mins), barClass: 'opacity-20' },
    { label: 'SECS', val: pad(secs), barClass: null },
  ];

  return (
    <section className="relative min-h-[680px] flex flex-col items-center justify-center pt-12 px-6 overflow-hidden -mx-4">
      {/* 배경 이미지 + 그라디언트 */}
      <div className="absolute inset-0">
        <img
          src={ANFIELD_BG}
          alt="Anfield Stadium"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/0 to-[#0e0e0e]/80" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm">

        {/* LFC 크레스트 (항상 위) */}
        <div className="flex flex-col items-center mb-2">
          <div className="w-24 h-24 bg-[#201f1f] border-4 border-primary-red shadow-[0_0_20px_rgba(200,16,46,0.3)] flex items-center justify-center p-2 mb-4">
            <Crest src={livCrest} alt="Liverpool FC" size="lg" />
          </div>
          <span className="font-headline font-black text-3xl italic tracking-[-1.5px] uppercase text-text-primary">
            LFC
          </span>
        </div>

        {/* VS + 리그 배지 */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <span className="font-headline font-black text-[36px] italic text-primary-red leading-none">
            VS
          </span>
          <div className="bg-surface-high px-4 py-1">
            <span className="font-label text-[12px] uppercase tracking-[2.4px] text-text-muted">
              {leagueName(match.league)}
            </span>
          </div>
        </div>

        {/* 어웨이팀 크레스트 (항상 아래) */}
        <div className="flex flex-col items-center mt-2 mb-10">
          <div className="w-24 h-24 bg-[#201f1f] border-4 border-[#4a4949] flex items-center justify-center p-2 mb-4">
            <Crest src={oppCrest} alt={oppAbbr} size="lg" />
          </div>
          <span className="font-headline font-black text-3xl italic tracking-[-1.5px] uppercase text-text-primary">
            {oppAbbr}
          </span>
        </div>

        {/* 카운트다운 */}
        <div className="grid grid-cols-4 gap-2 w-full mb-10">
          {countdownItems.map(({ label, val, barClass }) => (
            <div key={label} className="relative bg-surface-low overflow-hidden flex flex-col items-center py-4">
              {barClass && (
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-primary-red ${barClass}`} />
              )}
              <span
                className={`font-headline font-black text-4xl italic leading-none tracking-[-1.8px] ${
                  label === 'SECS' ? 'text-primary-red' : 'text-text-primary'
                }`}
              >
                {val}
              </span>
              <span className="font-label text-[10px] uppercase tracking-[1px] text-text-muted mt-1">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* TICKET HUB CTA */}
        <button className="flex items-center gap-6 px-12 py-5 bg-gradient-to-br from-primary-red to-[#bf0229] shadow-[0_20px_40px_rgba(200,16,46,0.3)] active:scale-95 transition-transform">
          <span className="font-headline font-black text-xl italic uppercase tracking-[-0.5px] text-white">
            TICKET HUB
          </span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </section>
  );
}

// ─── Hero 스켈레톤 ────────────────────────────────────────────────────────────
function HeroSkeleton() {
  return (
    <section className="relative min-h-[680px] flex flex-col items-center justify-center px-6 -mx-4 animate-pulse">
      <div className="absolute inset-0 bg-surface-lowest" />
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm">
        <div className="w-24 h-24 bg-surface-high" />
        <div className="h-9 w-16 bg-surface-high" />
        <div className="h-6 w-32 bg-surface-high" />
        <div className="w-24 h-24 bg-surface-high" />
        <div className="h-9 w-16 bg-surface-high" />
        <div className="grid grid-cols-4 gap-2 w-full mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-surface-high" />
          ))}
        </div>
        <div className="h-16 w-52 bg-surface-high" />
      </div>
    </section>
  );
}

// ─── Featured News Card ───────────────────────────────────────────────────────
function FeaturedNewsCard({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      className="relative h-[500px] overflow-hidden cursor-pointer group"
      onClick={onNavigate}
    >
      <img
        src={FEATURED_NEWS_IMG}
        alt="Featured news"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        {/* 태그 */}
        <div className="inline-block bg-primary-red px-3 py-1 mb-4">
          <span className="font-label text-[10px] uppercase tracking-[2px] text-white">EXCLUSIVE</span>
        </div>

        {/* 제목 */}
        <h2 className="font-headline font-black text-[28px] italic uppercase leading-tight tracking-tight text-text-primary mb-4">
          SQUAD DEPTH TESTED AHEAD OF CITY CLASH
        </h2>

        {/* 메타 */}
        <div className="flex items-center gap-4">
          <span className="font-label text-[10px] uppercase tracking-[1px] text-text-muted">2 HOURS AGO</span>
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-label text-[10px] uppercase tracking-[1px] text-text-muted">BY JAMES PEARCE</span>
        </div>
      </div>
    </div>
  );
}

// ─── Last Match Card ──────────────────────────────────────────────────────────
function LastMatchCard({ match }: { match: Fixture }) {
  const livIsHome =
    match.team1.toUpperCase().includes('LIVERPOOL') || match.team1.toUpperCase() === 'LIV';
  const livScore = livIsHome ? match.score1 : match.score2;
  const oppScore = livIsHome ? match.score2 : match.score1;
  const oppName = livIsHome ? match.team2 : match.team1;
  const oppCrest = livIsHome ? match.team2Crest : match.team1Crest;
  const livCrest = livIsHome ? match.team1Crest : match.team2Crest;

  return (
    <div className="relative bg-surface-lowest border border-white/5 p-8">
      {/* 상단 어웨이 크레스트 아이콘 (우상단) */}
      {oppCrest && (
        <div className="absolute top-0 right-0 w-16 h-16 opacity-10 overflow-hidden">
          <img src={oppCrest} alt={oppName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
        </div>
      )}

      {/* 헤더 */}
      <div className="border-b border-white/10 pb-4 mb-6">
        <span className="font-headline font-black text-[28px] italic uppercase text-text-primary">LAST MATCH</span>
      </div>

      {/* 날짜 */}
      <div className="font-label text-[10px] uppercase tracking-[2px] text-gold mb-6">
        {match.date.split('|')[0]?.trim()}
      </div>

      {/* 스코어 */}
      <div className="flex items-start justify-between mb-8">
        {/* LIV */}
        <div className="flex flex-col items-start gap-1">
          <span className="font-headline font-black text-[72px] italic leading-none tracking-[-3px] text-primary-red">
            {livScore ?? '-'}
          </span>
          <div className="flex items-center gap-2">
            {livCrest && <img src={livCrest} alt="Liverpool" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />}
            <span className="font-label text-[10px] uppercase tracking-widest text-text-muted">LIVERPOOL</span>
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-px h-20 bg-white/10 self-center" />

        {/* OPP */}
        <div className="flex flex-col items-end gap-1">
          <span className="font-headline font-black text-[72px] italic leading-none tracking-[-3px] text-text-muted/50">
            {oppScore ?? '-'}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-label text-[10px] uppercase tracking-widest text-text-muted">{oppName.toUpperCase()}</span>
            {oppCrest && <img src={oppCrest} alt={oppName} className="w-5 h-5 object-contain opacity-60" referrerPolicy="no-referrer" />}
          </div>
        </div>
      </div>

      {/* 골 스코어러 */}
      {match.goalScorers && match.goalScorers.length > 0 && (
        <div className="space-y-2 mb-8">
          {match.goalScorers.map((g, i) => (
            <div key={i} className="bg-surface-high flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="font-body font-bold text-sm text-text-primary">{g.player}</span>
                <span className="font-label text-[9px] uppercase tracking-widest text-gold">
                  {g.type === 'PENALTY' ? 'PENALTY' : g.type === 'OWN_GOAL' ? 'OG' : g.assist ? `ASSIST: ${g.assist}` : ''}
                </span>
              </div>
              <span className="font-headline font-black text-sm italic text-primary-red">{g.minute}'</span>
            </div>
          ))}
        </div>
      )}

      {/* FULL MATCH REPORT 버튼 */}
      <button className="w-full py-4 border border-white/10 font-label text-[12px] uppercase tracking-[2px] text-text-muted hover:text-text-primary hover:border-white/30 transition-colors">
        FULL MATCH REPORT
      </button>
    </div>
  );
}

// ─── 이미지 뉴스 카드 ─────────────────────────────────────────────────────────
function ImageNewsCard({
  img,
  category,
  title,
  cta,
  grayscale = false,
}: {
  img: string;
  category: string;
  title: string;
  cta: string;
  grayscale?: boolean;
}) {
  return (
    <div className="relative h-[400px] overflow-hidden cursor-pointer group">
      <img
        src={img}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
          grayscale ? 'grayscale' : ''
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/90 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="font-label text-[10px] uppercase tracking-[2px] text-text-muted mb-3">{category}</div>
        <h3 className="font-headline font-black text-[24px] italic uppercase leading-tight tracking-tight text-text-primary mb-4">
          {title}
        </h3>
        <span className="font-label text-[10px] uppercase tracking-[2px] text-primary-red border-b border-primary-red/40 pb-0.5">
          {cta}
        </span>
      </div>
    </div>
  );
}

// ─── Captain's Quote ──────────────────────────────────────────────────────────
function CaptainQuoteCard() {
  return (
    <div className="relative bg-surface-low border-l-4 border-primary-red p-9">
      <blockquote className="font-headline font-black text-[22px] italic uppercase leading-tight tracking-tight text-text-primary mb-6">
        "WE GO AGAIN. THE ENERGY AT ANFIELD IS SOMETHING YOU CANNOT DESCRIBE."
      </blockquote>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-high">
          <img
            src={VVD_IMG}
            alt="Virgil van Dijk"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <div className="font-body font-bold text-sm text-text-primary">Virgil van Dijk</div>
          <div className="font-label text-[10px] uppercase tracking-widest text-text-muted">Captain</div>
        </div>
      </div>
    </div>
  );
}

// ─── Bento Section ────────────────────────────────────────────────────────────
function BentoSection({
  lastMatch,
  onNewsNavigate,
}: {
  lastMatch: Fixture | undefined;
  onNewsNavigate: () => void;
}) {
  return (
    <section className="space-y-4 -mx-4">
      <FeaturedNewsCard onNavigate={onNewsNavigate} />

      {lastMatch && (
        <div className="mx-4">
          <LastMatchCard match={lastMatch} />
        </div>
      )}

      <ImageNewsCard
        img={TACTICAL_IMG}
        category="TACTICAL ANALYSIS"
        title="HOW SLOT IS EVOLVING THE MIDFIELD BOX"
        cta="READ ANALYSIS"
        grayscale
      />

      <ImageNewsCard
        img={KOP_IMG}
        category="FAN CULTURE"
        title="THE KOP AT ITS NOISIEST: A SEASON PREVIEW"
        cta="VIEW GALLERY"
      />

      <div className="mx-4">
        <CaptainQuoteCard />
      </div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────
const STATS = [
  { value: '1st', label: ['POSSESSION', '%'], color: 'text-gold' },
  { value: '24', label: ['GOALS', 'SCORED'], color: 'text-text-primary' },
  { value: '0.8', label: ['XG', 'CONCEDED'], color: 'text-text-primary' },
  { value: '12', label: ['CLEAN', 'SHEETS'], color: 'text-primary-red' },
] as const;

function StatsSection() {
  return (
    <section className="py-16 -mx-4 px-6 bg-surface-lowest">
      <div className="mb-10">
        {/* 헤더 + 화살표 */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-headline font-black text-[56px] italic uppercase leading-none tracking-[-3px] text-text-primary">
              DOMINANCE
            </h2>
            <h2 className="font-headline font-black text-[56px] italic uppercase leading-none tracking-[-3px] text-primary-red">
              IN NUMBERS
            </h2>
          </div>
          <div className="flex gap-2 mb-2">
            <button className="w-11 h-11 bg-surface-high flex items-center justify-center hover:bg-surface-bright transition-colors">
              <ChevronLeft className="w-4 h-4 text-text-primary" />
            </button>
            <button className="w-11 h-11 bg-surface-high flex items-center justify-center hover:bg-surface-bright transition-colors">
              <ChevronRight className="w-4 h-4 text-text-primary" />
            </button>
          </div>
        </div>

        <p className="font-body text-[16px] text-text-muted leading-relaxed">
          Detailed statistical breakdown of Liverpool's current season run under the lights.
        </p>
      </div>

      {/* 2×2 스탯 그리드 */}
      <div className="grid grid-cols-2 gap-px bg-[rgba(92,64,63,0.2)]">
        {STATS.map(({ value, label, color }) => (
          <div key={value + label[0]} className="bg-surface flex flex-col items-center justify-center py-12 px-4">
            <span className={`font-headline font-black text-[64px] italic leading-none tracking-[-2px] ${color} mb-3`}>
              {value}
            </span>
            <div className="font-label text-[10px] uppercase tracking-[3.6px] text-text-muted text-center leading-relaxed">
              {label.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── HomeView ─────────────────────────────────────────────────────────────────
export function HomeView({ setView }: { setView: (v: View) => void }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { fixtures, loading: fixturesLoading } = useFixtures();

  const nextMatch = useMemo(() => fixtures.find((f) => f.upcoming), [fixtures]);
  const lastMatch = useMemo(() => fixtures.find((f) => !f.upcoming), [fixtures]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 pb-12">

      {/* ── 유튜브 모달 ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary-red transition-colors flex items-center gap-2 font-label text-xs uppercase tracking-widest"
              >
                CLOSE <X className="w-5 h-5" />
              </button>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Match Highlights"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      {fixturesLoading && <HeroSkeleton />}
      {!fixturesLoading && nextMatch && <HeroSection match={nextMatch} />}

      {/* ── Bento Grid ───────────────────────────────────────────────────────── */}
      <BentoSection lastMatch={lastMatch} onNewsNavigate={() => setView('news')} />

      {/* ── Stats Section ────────────────────────────────────────────────────── */}
      <StatsSection />
    </motion.div>
  );
}
