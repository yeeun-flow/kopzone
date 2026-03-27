import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';
import { useFixtures } from '@/src/hooks/useFixtures';
import type { FixtureLeague } from '@/src/types/fixture';

function TeamCrest({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  if (src) {
    return <img src={src} alt={alt} className={`w-full h-full object-contain ${className}`} />;
  }
  return <Trophy className="w-10 h-10 opacity-20" />;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-48 bg-surface-high rounded mb-4" />
      <div className="bg-surface-low h-28 rounded" />
    </div>
  );
}

export function FixturesView() {
  const [activeLeague, setActiveLeague] = useState<FixtureLeague>('ALL');
  const { fixtures, loading, error } = useFixtures();

  const filteredFixtures = useMemo(() => {
    if (activeLeague === 'ALL') return fixtures;
    return fixtures.filter((f) => f.league === activeLeague);
  }, [activeLeague, fixtures]);

  const nextMatch = useMemo(() => fixtures.find((f) => f.upcoming), [fixtures]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 pb-12">
      <section>
        <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none">SCHEDULE</h2>
        <div className="flex items-center gap-4 mt-4">
          <div className="h-1 w-24 bg-primary-red"></div>
          <span className="font-label font-bold uppercase tracking-[0.2em] text-text-muted text-xs">2025/26 Campaign</span>
        </div>
      </section>

      <div className="flex overflow-x-auto gap-4 hide-scrollbar">
        {[
          { id: 'ALL', label: 'All Competitions' },
          { id: 'PL', label: 'Premier League' },
          { id: 'UCL', label: 'Champions League' },
          { id: 'FAC', label: 'FA Cup' },
        ].map((l) => (
          <button
            key={l.id}
            onClick={() => setActiveLeague(l.id as FixtureLeague)}
            className={`px-6 py-2 font-headline font-black italic uppercase tracking-widest text-xs transition-all border-b-2 whitespace-nowrap ${
              activeLeague === l.id ? 'border-primary-red text-primary-red bg-surface-high' : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {nextMatch && activeLeague === 'ALL' && !loading && (
        <section className="bg-primary-red p-1 relative overflow-hidden">
          <div className="bg-surface p-6 md:p-10 relative z-10">
            <div className="flex justify-between items-center mb-8">
              <span className="bg-primary-red text-white px-3 py-1 font-headline font-black italic uppercase text-xs tracking-widest">NEXT MATCH</span>
              <span className="font-label font-bold text-xs uppercase tracking-widest text-text-muted">{nextMatch.date}</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 flex-1 justify-end">
                <span className="text-3xl md:text-5xl font-black uppercase italic">{nextMatch.team1}</span>
                <div className="w-16 h-16 bg-surface-high flex items-center justify-center border border-white/10 p-2">
                  <TeamCrest src={nextMatch.team1Crest} alt={nextMatch.team1} />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-headline font-black text-4xl italic text-primary-red">VS</div>
                <div className="mt-2 font-label text-[10px] uppercase tracking-[0.3em] text-text-muted">ANFIELD</div>
              </div>
              <div className="flex items-center gap-6 flex-1">
                <div className="w-16 h-16 bg-primary-red flex items-center justify-center p-2">
                  <TeamCrest src={nextMatch.team2Crest} alt={nextMatch.team2} className="brightness-0 invert" />
                </div>
                <span className="text-3xl md:text-5xl font-black uppercase italic">{nextMatch.team2}</span>
              </div>
            </div>
            <button className="w-full mt-10 kinetic-gradient py-4 font-headline font-black italic uppercase tracking-widest text-white active:scale-[0.98] transition-all">
              MATCH PREVIEW & TICKETS
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-red/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        </section>
      )}

      <section className="overflow-x-auto hide-scrollbar -mx-6 px-6">
        <div className="flex gap-2 min-w-max border-b border-white/10 pb-4">
          {['MAR', 'APR', 'MAY', 'JUN'].map((m, i) => (
            <button
              key={m}
              className={`px-6 py-3 uppercase text-sm tracking-widest transition-all font-black ${
                i === 0 ? 'bg-surface-high border-b-4 border-primary-red text-text-primary' : 'text-text-muted hover:bg-surface-low'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      {loading && (
        <div className="space-y-12">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="font-label text-xs uppercase tracking-widest text-text-muted">Failed to load fixtures</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-12">
          {filteredFixtures.map((f, i) => (
            <div key={i} className={`group ${f.upcoming ? 'opacity-100' : 'opacity-80'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-label font-bold text-xs uppercase tracking-widest text-text-muted">{f.date}</span>
                  {f.upcoming && <span className="w-2 h-2 rounded-full bg-primary-red animate-pulse"></span>}
                </div>
                <div className="h-[1px] flex-grow bg-white/10"></div>
              </div>
              <div
                className={`bg-surface-low p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:bg-surface-high border-l-4 ${
                  f.upcoming ? 'border-primary-red' : 'border-transparent'
                }`}
              >
                <div className="flex items-center gap-8 flex-1 justify-end">
                  <span className="text-2xl md:text-4xl uppercase">{f.team1}</span>
                  <div className="w-16 h-16 bg-surface-high flex items-center justify-center p-2">
                    <TeamCrest src={f.team1Crest} alt={f.team1} />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  {f.upcoming ? (
                    <div className="flex flex-col items-center">
                      <span className="font-headline font-black text-3xl italic tracking-tighter text-text-muted">TBC</span>
                      <span className="font-label text-[10px] uppercase tracking-widest text-primary-red mt-1">UPCOMING</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="flex items-baseline gap-4">
                        <span className={`text-5xl md:text-7xl font-black ${(f.score1 ?? 0) > (f.score2 ?? 0) ? 'text-primary-red' : ''}`}>{f.score1}</span>
                        <span className="text-3xl md:text-5xl text-text-muted">-</span>
                        <span className={`text-5xl md:text-7xl font-black ${(f.score2 ?? 0) > (f.score1 ?? 0) ? 'text-primary-red' : ''}`}>{f.score2}</span>
                      </div>
                      {f.win && <div className="mt-2 px-4 py-1 bg-primary-red text-white font-black text-[10px] uppercase tracking-[0.3em]">WIN</div>}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-8 flex-1">
                  <div className={`w-16 h-16 flex items-center justify-center p-2 ${f.upcoming ? 'bg-surface-high' : 'bg-primary-red'}`}>
                    <TeamCrest
                      src={f.team2Crest}
                      alt={f.team2}
                      className={!f.upcoming ? 'brightness-0 invert' : ''}
                    />
                  </div>
                  <span className="text-2xl md:text-4xl uppercase">{f.team2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
