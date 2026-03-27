import { useState } from 'react';
import { motion } from 'motion/react';
import { useStandings } from '@/src/hooks/useStandings';
import type { StandingsLeague } from '@/src/types/standings';
import { Trophy } from 'lucide-react';

function TeamCrest({ src, alt }: { src?: string; alt: string }) {
  if (src) {
    return <img src={src} alt={alt} className="w-full h-full object-contain" />;
  }
  return <Trophy className="w-4 h-4 opacity-40" />;
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="p-4"><div className="h-4 w-6 bg-surface-high rounded" /></td>
      <td className="p-4"><div className="h-4 w-32 bg-surface-high rounded" /></td>
      {[...Array(6)].map((_, i) => (
        <td key={i} className="p-4"><div className="h-4 w-8 bg-surface-high rounded mx-auto" /></td>
      ))}
      <td className="p-4"><div className="h-4 w-20 bg-surface-high rounded mx-auto" /></td>
    </tr>
  );
}

export function StandingsView() {
  const [activeLeague, setActiveLeague] = useState<StandingsLeague>('PL');
  const { standings, loading, error } = useStandings(activeLeague);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 pb-12">
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none">STANDINGS</h2>
          <div className="text-right">
            <p className="font-label text-xs uppercase tracking-[0.3em] text-text-muted">2025/26 Season</p>
            <p className="font-label text-xs uppercase tracking-[0.3em] text-gold">Live Data</p>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-4 mb-8 hide-scrollbar">
          {[
            { id: 'PL', label: 'Premier League' },
            { id: 'UCL', label: 'Champions League' },
            { id: 'FAC', label: 'FA Cup' },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLeague(l.id as StandingsLeague)}
              className={`px-6 py-2 font-headline font-black italic uppercase tracking-widest text-sm transition-all border-b-2 whitespace-nowrap ${
                activeLeague === l.id ? 'border-primary-red text-primary-red bg-surface-high' : 'border-transparent text-text-muted hover:text-text-primary'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="bg-surface-low overflow-hidden">
          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-high border-b border-white/5">
                  <th className="p-4 font-label text-[10px] uppercase tracking-widest text-text-muted">POS</th>
                  <th className="p-4 font-label text-[10px] uppercase tracking-widest text-text-muted">CLUB</th>
                  {['PL', 'W', 'D', 'L', 'GD', 'PTS'].map((h) => (
                    <th key={h} className="p-4 font-label text-[10px] uppercase tracking-widest text-text-muted text-center">
                      {h}
                    </th>
                  ))}
                  <th className="p-4 font-label text-[10px] uppercase tracking-widest text-text-muted text-center">FORM</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {loading && [...Array(6)].map((_, i) => <SkeletonRow key={i} />)}

                {error && (
                  <tr>
                    <td colSpan={9} className="p-8 text-center font-label text-xs uppercase tracking-widest text-text-muted">
                      Failed to load standings
                    </td>
                  </tr>
                )}

                {!loading && !error && standings.map((row, i) => (
                  <tr key={i} className={`${row.highlight ? 'bg-primary-red text-white' : 'hover:bg-surface-high'} transition-colors`}>
                    <td
                      className={`p-4 border-l-4 ${
                        row.zone === 'gold' ? 'border-gold' : row.zone === 'blue' ? 'border-blue-500' : 'border-white'
                      } font-headline italic font-black text-xl`}
                    >
                      {row.pos}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-surface-high flex items-center justify-center p-1 shrink-0">
                          <TeamCrest src={row.crest} alt={row.club} />
                        </div>
                        <span className="font-bold uppercase tracking-tight whitespace-nowrap">{row.club}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center font-label">{row.pl}</td>
                    <td className="p-4 text-center font-label">{row.w}</td>
                    <td className="p-4 text-center font-label">{row.d}</td>
                    <td className="p-4 text-center font-label">{row.l}</td>
                    <td className="p-4 text-center font-label">{row.gd}</td>
                    <td className="p-4 text-center font-headline italic font-black text-xl">{row.pts}</td>
                    <td className="p-4">
                      <div className="flex gap-1 justify-center">
                        {row.form.map((f, idx) => (
                          <span
                            key={idx}
                            className={`w-5 h-5 flex items-center justify-center text-[8px] font-black italic rounded-sm ${
                              row.highlight
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-3xl font-black italic tracking-tighter mb-8">STATISTICAL INSIGHTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { label: 'Home Dominance', title: 'WINS AT ANFIELD', val: '11', sub: '/ 14 Played', color: 'primary-red' },
            { label: 'Defensive Rigor', title: 'CLEAN SHEETS', val: '09', sub: 'Ranked 2nd in PL', color: 'text-primary' },
            { label: 'Attacking Output', title: 'GOALS PER GAME', val: '2.4', sub: 'AVG', color: 'text-primary' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-high p-8 flex flex-col justify-between min-h-[240px]">
              <div>
                <p className="font-label text-[10px] uppercase tracking-[0.4em] text-gold mb-2">{stat.label}</p>
                <h4 className="text-5xl leading-none">{stat.title}</h4>
              </div>
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className={`text-7xl font-black italic tracking-tighter ${stat.color === 'primary-red' ? 'text-primary-red' : ''}`}>
                    {stat.val}
                  </span>
                  <span className="font-label text-xs uppercase text-text-muted">{stat.sub}</span>
                </div>
                {stat.color === 'primary-red' && (
                  <div className="h-2 bg-surface-lowest w-full">
                    <div className="h-full bg-primary-red w-[78%]"></div>
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
