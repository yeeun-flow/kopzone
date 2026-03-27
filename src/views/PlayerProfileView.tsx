import { motion } from 'motion/react';
import type { Player } from '@/src/types/player';
import { Star, Timer, TrendingUp } from 'lucide-react';

export function PlayerProfileView({ player }: { player: Player }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 pb-12">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative h-[751px] w-full flex items-end overflow-hidden bg-surface-lowest">
        <div className="absolute inset-0 z-0">
          {player.heroImage ? (
            <img
              src={player.heroImage}
              alt={player.name}
              className="w-full h-full object-cover opacity-60 grayscale scale-105"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-surface-low to-surface-lowest" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-lowest/80 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 w-full px-6 pb-20">
          <div className="space-y-0">
            {player.number && (
              <span className="font-headline text-8xl md:text-[12rem] font-black tracking-tighter leading-none block text-stroke">
                {player.number}
              </span>
            )}
            <h1 className={`text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase ${player.number ? '-mt-4' : ''}`}>
              {player.firstName}
              <br />
              <span className="text-primary-red">{player.lastName}</span>
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <span className="bg-primary-red text-white px-4 py-1 text-sm font-black tracking-widest uppercase">
                {player.position}
              </span>
              <span className="border border-white/30 px-4 py-1 text-sm font-medium tracking-widest uppercase">
                {player.nationality.toUpperCase()}
              </span>
              {player.age && (
                <span className="border border-white/10 px-4 py-1 text-sm font-medium tracking-widest text-text-muted uppercase">
                  {player.age} YRS
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights video ────────────────────────────────────────────────── */}
      {player.highlightVideoId && (
        <section className="px-6">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-3xl font-black italic tracking-tighter">PLAYER HIGHLIGHTS</h3>
            <div className="flex-grow h-px bg-white/10" />
          </div>
          <div className="aspect-video w-full bg-surface-low border border-white/5 overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${player.highlightVideoId}?autoplay=0&mute=0&controls=1`}
              title={`${player.name} Highlights`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </section>
      )}

      {/* ── Stats ───────────────────────────────────────────────────────────── */}
      {player.stats ? (
        <>
          <section className="px-6 -mt-10 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
              {[
                { label: 'Goals Scored', val: player.stats.goals, icon: TrendingUp, color: 'text-primary-red' },
                { label: 'Assists', val: player.stats.assists, icon: Star, color: 'text-gold' },
                { label: 'Minutes Played', val: player.stats.minutes, icon: Timer, color: 'text-text-muted' },
              ].map((s, i) => (
                <div key={i} className="bg-surface-high p-10 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300">
                  <span className="font-label text-xs font-bold tracking-[0.2em] text-text-muted uppercase">{s.label}</span>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="font-headline text-7xl font-black">{s.val}</span>
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="px-6 mt-px relative z-20">
            <div className="grid grid-cols-2 gap-px bg-white/10">
              <div className="bg-surface-high p-10 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300">
                <span className="font-label text-xs font-bold tracking-[0.2em] text-text-muted uppercase">Yellow Cards</span>
                <div className="flex items-baseline gap-4 mt-4">
                  <span className="font-headline text-7xl font-black">{player.stats.yellowCards}</span>
                  <div className="w-8 h-11 bg-gold rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
              <div className="bg-surface-high p-10 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300">
                <span className="font-label text-xs font-bold tracking-[0.2em] text-text-muted uppercase">Red Cards</span>
                <div className="flex items-baseline gap-4 mt-4">
                  <span className="font-headline text-7xl font-black">{player.stats.redCards}</span>
                  <div className="w-8 h-11 bg-primary-red rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="px-6">
          <div className="bg-surface-low border border-white/5 p-12 text-center">
            <p className="font-label text-xs uppercase tracking-[0.4em] text-text-muted">Season stats coming soon</p>
          </div>
        </section>
      )}

      {/* ── Radar + Tactical Analysis ───────────────────────────────────────── */}
      {player.radar && player.metrics && (
        <section className="px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="relative aspect-square bg-surface-low flex items-center justify-center p-12 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full border border-white/5 rounded-full scale-100" />
              <div className="absolute w-3/4 h-3/4 border border-white/5 rounded-full" />
              <div className="absolute w-1/2 h-1/2 border border-white/5 rounded-full" />
              <div className="absolute w-1/4 h-1/4 border border-white/5 rounded-full" />
            </div>
            <svg className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(200,16,46,0.4)]" viewBox="0 0 100 100">
              <polygon className="fill-primary-red/30 stroke-primary-red stroke-2" points="50,10 88,30 85,75 50,90 20,70 15,30" />
              {[[50,10],[88,30],[85,75],[50,90],[20,70],[15,30]].map(([cx,cy],i) => (
                <circle key={i} cx={cx} cy={cy} fill="#ffb3b1" r="1.5" />
              ))}
            </svg>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 font-label text-[10px] font-black tracking-widest uppercase">Pace ({player.radar.pace})</div>
            <div className="absolute top-1/4 right-4 font-label text-[10px] font-black tracking-widest uppercase">Shooting ({player.radar.shooting})</div>
            <div className="absolute bottom-1/4 right-4 font-label text-[10px] font-black tracking-widest uppercase">Passing ({player.radar.passing})</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-label text-[10px] font-black tracking-widest uppercase">Dribbling ({player.radar.dribbling})</div>
            <div className="absolute bottom-1/4 left-4 font-label text-[10px] font-black tracking-widest uppercase">Defending ({player.radar.defending})</div>
            <div className="absolute top-1/4 left-4 font-label text-[10px] font-black tracking-widest uppercase">Physical ({player.radar.physical})</div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-primary-red font-headline text-lg font-black tracking-widest mb-4">TACTICAL ANALYSIS</span>
            <h2 className="text-5xl font-black mb-8 leading-tight">
              {player.lastName.toUpperCase()}'S<br />TACTICAL PROFILE
            </h2>
            <p className="font-body text-text-muted text-xl leading-relaxed mb-12">
              {player.lastName}'s output remains world-class. His underlying metrics in Progressive Carries and Expected Goals (xG) place him in the top tier of European players. The evolution of his game sees him adapting to complex tactical setups while maintaining his signature explosive impact.
            </p>
            <div className="space-y-6">
              {player.metrics.map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-label text-sm font-bold uppercase tracking-widest">{m.label}</span>
                    <span className="font-headline text-2xl font-black text-gold">{m.val}</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-gold" style={{ width: m.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Recent Form ─────────────────────────────────────────────────────── */}
      {player.recentForm && player.recentForm.length > 0 && (
        <section className="bg-surface-low p-6 md:p-12">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h3 className="text-4xl font-black tracking-tight">RECENT FORM</h3>
              <p className="font-label text-xs text-text-muted tracking-[0.3em] uppercase mt-2">Last 3 Match Analysis</p>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 font-label text-[10px] tracking-[0.2em] text-text-muted uppercase">
                  <th className="py-6 px-4">Opponent</th>
                  <th className="py-6 px-4">Result</th>
                  <th className="py-6 px-4">G / A</th>
                  <th className="py-6 px-4">xG</th>
                  <th className="py-6 px-4 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {player.recentForm.map((match, i) => (
                  <tr key={i} className="group hover:bg-surface-high transition-colors">
                    <td className="py-8 px-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 ${match.color}`} />
                        <span className="font-bold text-lg uppercase">{match.opp}</span>
                      </div>
                    </td>
                    <td className="py-8 px-4 font-medium">{match.res}</td>
                    <td className="py-8 px-4 font-bold text-primary-red">{match.ga}</td>
                    <td className="py-8 px-4 text-text-muted">{match.xg}</td>
                    <td className="py-8 px-4 text-right">
                      <span className={`font-headline text-3xl font-black ${parseFloat(match.rat) >= 8.5 ? 'text-gold' : ''}`}>
                        {match.rat}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Bottom banner ───────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="relative w-full aspect-[21/9] bg-surface-low overflow-hidden group">
          {player.heroImage && (
            <img
              src={player.heroImage}
              alt={player.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2000ms]"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-red/40 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 flex flex-col justify-center px-12">
            <span className="font-label text-xs font-black tracking-[0.5em] text-white/70 uppercase mb-4">Legend Status</span>
            <h4 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white">
              CHASING<br />RECORDS
            </h4>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
