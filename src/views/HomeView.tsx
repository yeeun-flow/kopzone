import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { View } from '@/src/types/view';
import type { Fixture } from '@/src/types/fixture';
import { matchHighlights } from '@/src/data/matchHighlights';
import { latestNews } from '@/src/data/news';
import { useFixtures } from '@/src/hooks/useFixtures';
import { Trophy, X } from 'lucide-react';

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
  invert = false,
}: {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  invert?: boolean;
}) {
  const s = { sm: 'w-10 h-10', md: 'w-14 h-14', lg: 'w-16 h-16' }[size];
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${s} object-contain ${invert ? 'brightness-0 invert' : ''}`}
        referrerPolicy="no-referrer"
      />
    );
  }
  return <Trophy className={`${size === 'lg' ? 'w-10 h-10' : 'w-7 h-7'} opacity-30`} />;
}

// ─── Next Fixture 섹션 ────────────────────────────────────────────────────────
function NextFixtureSection({
  match,
  setView,
}: {
  match: Fixture;
  setView: (v: View) => void;
}) {
  const { days, hours, mins, secs } = useCountdown(match.utcDate);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="relative">
      <div className="mb-4 flex justify-between items-end">
        <h2 className="text-4xl font-black">NEXT FIXTURE</h2>
        <button
          onClick={() => setView('fixtures')}
          className="font-label text-xs uppercase tracking-widest text-primary-red mb-1 border-b border-primary-red/30"
        >
          Full Schedule
        </button>
      </div>

      <div className="bg-surface-high p-6 border-l-4 border-primary-red relative overflow-hidden">
        <div className="absolute -right-4 -bottom-8 opacity-5 font-headline font-black text-9xl italic pointer-events-none select-none">
          LFC
        </div>

        {/* 리그 배지 */}
        <div className="mb-4">
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            {match.league === 'PL' ? 'Premier League' : match.league === 'UCL' ? 'Champions League' : 'FA Cup'}
          </span>
          {match.venue && (
            <span className="ml-3 font-label text-[10px] uppercase tracking-widest text-text-muted">
              {match.venue}
            </span>
          )}
        </div>

        {/* 팀 vs 팀 */}
        <div className="flex justify-between items-center relative z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-surface-lowest flex items-center justify-center p-2">
              <Crest src={match.team1Crest} alt={match.team1} size="lg" />
            </div>
            <span className="font-headline font-black text-sm uppercase italic">{match.team1}</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="font-headline font-black text-5xl italic tracking-tighter text-primary-red mb-2">VS</div>
            <div className="text-text-muted font-label text-[10px] uppercase tracking-widest">{match.date.split('|')[0]?.trim()}</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-surface-lowest flex items-center justify-center p-2">
              <Crest src={match.team2Crest} alt={match.team2} size="lg" />
            </div>
            <span className="font-headline font-black text-sm uppercase italic">{match.team2}</span>
          </div>
        </div>

        {/* 실시간 카운트다운 */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            { val: pad(days), label: 'DAYS' },
            { val: pad(hours), label: 'HOURS' },
            { val: pad(mins), label: 'MINS' },
            { val: pad(secs), label: 'SECS' },
          ].map(({ val, label }) => (
            <div key={label} className="bg-surface-lowest py-3 flex flex-col items-center">
              <span className="font-headline font-black text-2xl leading-none">{val}</span>
              <span className="font-label text-[8px] uppercase text-text-muted mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Last Match 섹션 ──────────────────────────────────────────────────────────
function LastMatchSection({ match }: { match: Fixture }) {
  const livIsHome = match.team1.toUpperCase().includes('LIVERPOOL') || match.team1.toUpperCase() === 'LIV';
  const livScore = livIsHome ? match.score1 : match.score2;
  const oppScore = livIsHome ? match.score2 : match.score1;
  const oppName = livIsHome ? match.team2 : match.team1;
  const oppCrest = livIsHome ? match.team2Crest : match.team1Crest;

  return (
    <section>
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="text-3xl font-black">LAST MATCH</h2>
        <span className="font-label text-xs uppercase tracking-widest text-text-muted">Full Time</span>
      </div>
      <div className="bg-surface-lowest p-6 flex flex-col items-center justify-center relative border border-white/5">
        <div className="mb-2 font-label text-[10px] uppercase tracking-widest text-gold">
          {match.date}
        </div>
        <div className="flex justify-around items-center w-full mb-6 mt-4">
          {/* Liverpool */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center">
              <Crest src={livIsHome ? match.team1Crest : match.team2Crest} alt="Liverpool" size="md" />
            </div>
            <span className="font-headline font-black text-sm uppercase italic">LIVERPOOL</span>
          </div>

          {/* 스코어 */}
          <div className="flex items-center gap-4">
            <span className={`font-headline font-black text-6xl italic tracking-tighter ${(livScore ?? 0) > (oppScore ?? 0) ? 'text-primary-red' : ''}`}>
              {livScore ?? '-'}
            </span>
            <span className="w-1 h-8 bg-primary-red/30"></span>
            <span className={`font-headline font-black text-6xl italic tracking-tighter ${(oppScore ?? 0) > (livScore ?? 0) ? 'text-white' : 'text-text-muted/50'}`}>
              {oppScore ?? '-'}
            </span>
          </div>

          {/* 상대팀 */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center opacity-60">
              <Crest src={oppCrest} alt={oppName} size="md" />
            </div>
            <span className="font-headline font-black text-sm uppercase italic opacity-60">{oppName}</span>
          </div>
        </div>

        {/* 결과 배지 */}
        {match.win !== undefined && (
          <div className={`px-4 py-1 font-black text-[10px] uppercase tracking-[0.3em] ${match.win ? 'bg-primary-red text-white' : 'bg-surface-high text-text-muted'}`}>
            {match.win ? 'WIN' : (livScore === oppScore ? 'DRAW' : 'DEFEAT')}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 스켈레톤 ─────────────────────────────────────────────────────────────────
function FixtureSkeleton() {
  return (
    <div className="animate-pulse bg-surface-high p-6 border-l-4 border-surface-high">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-surface-low rounded" />
          <div className="h-3 w-12 bg-surface-low rounded" />
        </div>
        <div className="h-10 w-16 bg-surface-low rounded" />
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-surface-low rounded" />
          <div className="h-3 w-12 bg-surface-low rounded" />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-surface-low h-14 rounded" />
        ))}
      </div>
    </div>
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

      {/* ── Next Fixture ─────────────────────────────────────────────────────── */}
      {fixturesLoading && <FixtureSkeleton />}
      {!fixturesLoading && nextMatch && (
        <NextFixtureSection match={nextMatch} setView={setView} />
      )}

      {/* ── Match Highlights ──────────────────────────────────────────────────── */}
      <section>
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-3xl font-black">MATCH HIGHLIGHTS</h2>
          <span className="font-label text-xs uppercase tracking-widest text-text-muted">Latest Action</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matchHighlights.map((h) => (
            <div key={h.id} className="group cursor-pointer" onClick={() => setSelectedVideo(h.videoId)}>
              <div className="aspect-video bg-surface-low relative overflow-hidden">
                <img
                  src={h.thumbnail}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary-red/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
                  <span className="font-label text-[10px] uppercase tracking-widest text-gold">{h.date}</span>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-black uppercase leading-tight italic group-hover:text-primary-red transition-colors">
                {h.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ── Latest News ──────────────────────────────────────────────────────── */}
      <section>
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-3xl font-black">LATEST NEWS</h2>
          <button className="font-body font-bold text-xs uppercase text-primary-red tracking-widest border-b border-primary-red/30">
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto gap-6 hide-scrollbar -mx-4 px-4">
          {latestNews.map((news, i) => (
            <article
              key={i}
              className="min-w-[280px] w-[280px] bg-surface-low group cursor-pointer"
              onClick={() => setView('news')}
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={news.img}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-0 right-0 p-2">
                  <span className="bg-primary-red text-[10px] font-headline font-black px-2 py-1 uppercase italic text-white">
                    {news.tag}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <span className="font-label text-[10px] uppercase tracking-widest text-primary-red">{news.loc}</span>
                <h3 className="text-xl font-black uppercase leading-tight italic line-clamp-2">{news.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Last Match ───────────────────────────────────────────────────────── */}
      {!fixturesLoading && lastMatch && <LastMatchSection match={lastMatch} />}
    </motion.div>
  );
}
