import { useState } from 'react';
import { motion } from 'motion/react';
import { useStandings } from '@/src/hooks/useStandings';
import type { StandingsLeague } from '@/src/types/standings';
import { Trophy } from 'lucide-react';

function TeamCrest({ src, alt }: { src?: string; alt: string }) {
  if (src) return <img src={src} alt={alt} className="w-full h-full object-contain" />;
  return <Trophy className="w-4 h-4 opacity-40" />;
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="p-2 sm:p-4 sticky left-0 bg-surface-low z-10">
        <div className="h-4 w-6 bg-surface-high rounded" />
      </td>
      <td className="p-2 sm:p-4"><div className="h-4 w-28 bg-surface-high rounded" /></td>
      {[...Array(4)].map((_, i) => (
        <td key={i} className="p-2 sm:p-4"><div className="h-4 w-6 bg-surface-high rounded mx-auto" /></td>
      ))}
      <td className="p-2 sm:p-4 hidden sm:table-cell"><div className="h-4 w-8 bg-surface-high rounded mx-auto" /></td>
      <td className="p-2 sm:p-4"><div className="h-4 w-8 bg-surface-high rounded mx-auto" /></td>
      <td className="p-2 sm:p-4 hidden md:table-cell"><div className="h-4 w-16 bg-surface-high rounded mx-auto" /></td>
    </tr>
  );
}

const LEAGUES = [
  { id: 'PL',  label: 'Premier League' },
  { id: 'UCL', label: 'Champions League' },
  { id: 'FAC', label: 'FA Cup' },
] as const;

export function StandingsView() {
  const [activeLeague, setActiveLeague] = useState<StandingsLeague>('PL');
  const { standings, loading, error } = useStandings(activeLeague);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 pb-12">
      <section>
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none">STANDINGS</h2>
          <div className="text-right">
            <p className="font-label text-xs uppercase tracking-[0.3em] text-text-muted">2025/26 Season</p>
            <p className="font-label text-xs uppercase tracking-[0.3em] text-gold">Live Data</p>
          </div>
        </div>

        {/* 리그 탭 */}
        <div className="flex overflow-x-auto gap-4 mb-8 hide-scrollbar">
          {LEAGUES.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLeague(l.id)}
              className={`px-6 py-2 font-headline font-black italic uppercase tracking-widest text-sm transition-all border-b-2 whitespace-nowrap ${
                activeLeague === l.id
                  ? 'border-primary-red text-primary-red bg-surface-high'
                  : 'border-transparent text-text-muted hover:text-text-primary'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* 테이블 래퍼 — 스크롤 페이드 힌트 */}
        <div className="bg-surface-low overflow-hidden relative">
          {/* 오른쪽 페이드 — 스크롤 가능 암시 */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 z-20
                          bg-gradient-to-l from-surface-low to-transparent sm:hidden" />

          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-high border-b border-white/5">
                  {/* POS — sticky */}
                  <th className="p-2 sm:p-4 font-label text-[10px] uppercase tracking-widest text-text-muted
                                 sticky left-0 bg-surface-high z-10 w-10">
                    POS
                  </th>
                  {/* CLUB */}
                  <th className="p-2 sm:p-4 font-label text-[10px] uppercase tracking-widest text-text-muted">
                    CLUB
                  </th>
                  {/* PL W D L — 항상 표시 */}
                  {['PL', 'W', 'D', 'L'].map((h) => (
                    <th key={h} className="p-2 sm:p-4 font-label text-[10px] uppercase tracking-widest text-text-muted text-center">
                      {h}
                    </th>
                  ))}
                  {/* GD — sm 이상 */}
                  <th className="p-2 sm:p-4 font-label text-[10px] uppercase tracking-widest text-text-muted text-center hidden sm:table-cell">
                    GD
                  </th>
                  {/* PTS — 항상 표시 */}
                  <th className="p-2 sm:p-4 font-label text-[10px] uppercase tracking-widest text-text-muted text-center">
                    PTS
                  </th>
                  {/* FORM — md 이상 */}
                  <th className="p-2 sm:p-4 font-label text-[10px] uppercase tracking-widest text-text-muted text-center hidden md:table-cell">
                    FORM
                  </th>
                </tr>
              </thead>

              <tbody className="font-body">
                {loading && [...Array(8)].map((_, i) => <SkeletonRow key={i} />)}

                {/* FA Cup 탈락 or 일반 에러 */}
                {error && (
                  <tr>
                    <td colSpan={8} className="p-10 text-center">
                      {activeLeague === 'FAC' ? (
                        <div className="space-y-2">
                          <p className="font-headline font-black italic text-2xl text-text-muted">OUT</p>
                          <p className="font-label text-xs uppercase tracking-[0.3em] text-text-muted">
                            Liverpool have been eliminated from the FA Cup
                          </p>
                        </div>
                      ) : (
                        <p className="font-label text-xs uppercase tracking-widest text-text-muted">
                          Failed to load standings
                        </p>
                      )}
                    </td>
                  </tr>
                )}

                {!loading && !error && standings.map((row, i) => {
                  const isLiv = row.highlight;
                  const stickyBg = isLiv ? 'bg-primary-red' : 'bg-surface-low';
                  const zoneBorder =
                    row.zone === 'gold' ? 'border-gold'
                    : row.zone === 'blue' ? 'border-blue-500'
                    : 'border-white/30';

                  return (
                    <tr
                      key={i}
                      className={`${isLiv ? 'bg-primary-red text-white' : 'hover:bg-surface-high'} transition-colors`}
                    >
                      {/* POS — sticky, 배경 명시 */}
                      <td className={`p-2 sm:p-4 sticky left-0 z-10 border-l-4 ${zoneBorder} ${stickyBg}
                                      font-headline italic font-black text-lg sm:text-xl`}>
                        {row.pos}
                      </td>

                      {/* CLUB */}
                      <td className="p-2 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center p-0.5 shrink-0
                                          bg-surface-high">
                            <TeamCrest src={row.crest} alt={row.club} />
                          </div>
                          <span className="font-bold uppercase tracking-tight text-sm sm:text-base whitespace-nowrap">
                            {row.club}
                          </span>
                        </div>
                      </td>

                      {/* PL W D L */}
                      <td className="p-2 sm:p-4 text-center font-label text-sm">{row.pl}</td>
                      <td className="p-2 sm:p-4 text-center font-label text-sm">{row.w}</td>
                      <td className="p-2 sm:p-4 text-center font-label text-sm">{row.d}</td>
                      <td className="p-2 sm:p-4 text-center font-label text-sm">{row.l}</td>

                      {/* GD — sm 이상 */}
                      <td className="p-2 sm:p-4 text-center font-label text-sm hidden sm:table-cell">{row.gd}</td>

                      {/* PTS */}
                      <td className="p-2 sm:p-4 text-center font-headline italic font-black text-lg sm:text-xl">
                        {row.pts}
                      </td>

                      {/* FORM — md 이상 */}
                      <td className="p-2 sm:p-4 hidden md:table-cell">
                        <div className="flex gap-1 justify-center">
                          {row.form.map((f, idx) => (
                            <span
                              key={idx}
                              className={`w-5 h-5 flex items-center justify-center text-[8px] font-black italic rounded-sm ${
                                isLiv
                                  ? 'bg-white/20 text-white'
                                  : f === 'W'
                                    ? 'bg-green-500/20 text-green-500'
                                    : f === 'D'
                                      ? 'bg-gray-500/20 text-gray-500'
                                      : 'bg-primary-red/20 text-primary-red'
                              }`}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 모바일 컬럼 안내 */}
        <p className="mt-2 text-right font-label text-[10px] uppercase tracking-widest text-text-muted sm:hidden">
          scroll for GD · form on tablet+
        </p>
      </section>

      {/* Statistical Insights */}
      <section>
        <h3 className="text-3xl font-black italic tracking-tighter mb-8">STATISTICAL INSIGHTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { label: 'Home Dominance', title: 'WINS AT ANFIELD', val: '11', sub: '/ 14 Played', red: true },
            { label: 'Defensive Rigor', title: 'CLEAN SHEETS', val: '09', sub: 'Ranked 2nd in PL', red: false },
            { label: 'Attacking Output', title: 'GOALS PER GAME', val: '2.4', sub: 'AVG', red: false },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-high p-8 flex flex-col justify-between min-h-[240px]">
              <div>
                <p className="font-label text-[10px] uppercase tracking-[0.4em] text-gold mb-2">{stat.label}</p>
                <h4 className="text-5xl leading-none">{stat.title}</h4>
              </div>
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className={`text-7xl font-black italic tracking-tighter ${stat.red ? 'text-primary-red' : ''}`}>
                    {stat.val}
                  </span>
                  <span className="font-label text-xs uppercase text-text-muted">{stat.sub}</span>
                </div>
                {stat.red && (
                  <div className="h-2 bg-surface-lowest w-full">
                    <div className="h-full bg-primary-red w-[78%]" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
