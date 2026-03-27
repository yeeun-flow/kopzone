import { type TouchEvent, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Player, ApiSquadPlayer } from '@/src/types/player';
import type { View } from '@/src/types/view';
import { players } from '@/src/data/players';
import { useSquad } from '@/src/hooks/useSquad';
import { UserRound } from 'lucide-react';

// ─── Featured 로테이션 선수 목록 (MVP 기준 정렬) ──────────────────────────────
const FEATURED_PLAYERS: Array<{ player: Player; label: string; accent: string }> = [
  {
    player: players.find((p) => p.id === 'salah')!,
    label: 'TOP SCORER',
    accent: 'text-gold',
  },
  {
    player: players.find((p) => p.id === 'wirtz')!,
    label: 'MOST CREATIVE',
    accent: 'text-blue-400',
  },
  {
    player: players.find((p) => p.id === 'isak')!,
    label: 'NEW SIGNING',
    accent: 'text-emerald-400',
  },
  {
    player: players.find((p) => p.id === 'van-dijk')!,
    label: 'CAPTAIN',
    accent: 'text-primary-red',
  },
  {
    player: players.find((p) => p.id === 'mac-allister')!,
    label: 'MIDFIELD ENGINE',
    accent: 'text-gold',
  },
  {
    player: players.find((p) => p.id === 'frimpong')!,
    label: 'NEW SIGNING',
    accent: 'text-emerald-400',
  },
  {
    player: players.find((p) => p.id === 'gravenberch')!,
    label: 'SEASON STANDOUT',
    accent: 'text-blue-400',
  },
  {
    player: players.find((p) => p.id === 'konate')!,
    label: 'DEFENSIVE ROCK',
    accent: 'text-primary-red',
  },
].filter((f) => !!f.player);

// football-data.org ID → 상세 Player 매핑
const detailedById = new Map<number, Player>(
  players.filter((p) => p.footballDataId).map((p) => [p.footballDataId!, p]),
);

const GROUP_LABELS: Record<string, string> = {
  GK: 'GOALKEEPERS',
  DEF: 'DEFENDERS',
  MID: 'MIDFIELDERS',
  FWD: 'FORWARDS',
};

// ─── 선수 카드 ────────────────────────────────────────────────────────────────
function PlayerCard({
  player,
  onClick,
}: {
  player: ApiSquadPlayer;
  onClick?: () => void;
}) {
  const detailed = detailedById.get(player.id);
  const image = detailed?.image ?? player.image;
  const isClickable = !!detailed || !!onClick;

  return (
    <div
      className={`bg-surface-low group transition-all ${isClickable ? 'cursor-pointer hover:bg-surface-high' : ''}`}
      onClick={isClickable ? onClick : undefined}
    >
      {/* 사진 or 번호 플레이스홀더 */}
      <div className="aspect-[3/4] overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={player.name}
            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-surface-high flex flex-col items-center justify-center relative overflow-hidden">
            {/* 배경 장식 숫자 */}
            {player.number && (
              <span className="absolute font-headline font-black text-[8rem] italic leading-none text-white/5 select-none pointer-events-none">
                {player.number}
              </span>
            )}
            <UserRound className="w-12 h-12 text-white/20 relative z-10" />
            <span className="font-label text-[10px] uppercase tracking-widest text-text-muted mt-2 relative z-10">
              {player.nationality}
            </span>
          </div>
        )}

        {/* 등번호 배지 */}
        {player.number && (
          <div className="absolute top-2 left-2 bg-primary-red text-white font-headline font-black italic text-xs px-2 py-0.5">
            #{player.number}
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className={`p-4 border-b-4 border-transparent transition-all ${isClickable ? 'group-hover:border-primary-red' : ''}`}>
        <span className="block font-label text-[10px] font-bold text-primary-red italic uppercase mb-1">
          {player.position} · {player.nationality}
        </span>
        <span className="text-lg font-headline font-black italic uppercase leading-tight block">
          {player.name}
        </span>
        <span className="font-label text-[10px] text-text-muted mt-1 block">
          {player.age} yrs old
        </span>
      </div>
    </div>
  );
}

// ─── 스켈레톤 ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-surface-low animate-pulse">
      <div className="aspect-[3/4] bg-surface-high" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-20 bg-surface-high rounded" />
        <div className="h-5 w-32 bg-surface-high rounded" />
        <div className="h-3 w-16 bg-surface-high rounded" />
      </div>
    </div>
  );
}

// ─── SquadView ────────────────────────────────────────────────────────────────
export function SquadView({
  setView,
  onSelectPlayer,
}: {
  setView: (v: View) => void;
  onSelectPlayer: (p: Player) => void;
}) {
  const { grouped, loading, error } = useSquad();
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  // 6초마다 자동 전환
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setFeaturedIdx((i) => (i + 1) % FEATURED_PLAYERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const { player: featuredPlayer, label: featuredLabel, accent: featuredAccent } =
    FEATURED_PLAYERS[featuredIdx];

  const goTo = (idx: number) => {
    setDirection(idx > featuredIdx ? 1 : -1);
    setFeaturedIdx(idx);
  };

  const goNext = () => {
    setDirection(1);
    setFeaturedIdx((i) => (i + 1) % FEATURED_PLAYERS.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setFeaturedIdx((i) => (i - 1 + FEATURED_PLAYERS.length) % FEATURED_PLAYERS.length);
  };

  // 스와이프 제스처
  const touchStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    didSwipe.current = false;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) {
      didSwipe.current = true;
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 pb-12">

      {/* ── Featured Player 히어로 ─────────────────────────────────────────── */}
      <section
        className="relative h-[600px] bg-surface-low overflow-hidden cursor-pointer group select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          if (didSwipe.current) { didSwipe.current = false; return; }
          onSelectPlayer(featuredPlayer); setView('player');
        }}
      >
        {/* 배경 이미지 — 선수 전환 시 crossfade */}
        <AnimatePresence mode="sync">
          <motion.div
            key={featuredPlayer.id + '-bg'}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 grayscale group-hover:grayscale-0 transition-[filter] duration-700"
          >
            {featuredPlayer.image ? (
              <img
                src={featuredPlayer.image}
                alt={featuredPlayer.name}
                className="w-full h-full object-cover object-top opacity-50"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-surface-high" />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/60 via-transparent to-transparent" />

        {/* 텍스트 콘텐츠 — 슬라이드 인 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredPlayer.id + '-text'}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 p-8 flex flex-col justify-end"
          >
            {/* 배경 등번호 */}
            {featuredPlayer.number && (
              <span className="absolute right-6 bottom-16 font-headline text-[10rem] font-black italic opacity-[0.07] select-none leading-none">
                {featuredPlayer.number}
              </span>
            )}

            {/* 라벨 */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-[2px] bg-primary-red" />
              <span className={`font-label uppercase tracking-[0.3em] text-xs font-black ${featuredAccent}`}>
                {featuredLabel}
              </span>
            </div>

            {/* 이름 */}
            <h2 className="text-5xl md:text-8xl font-black leading-[0.85] mb-4 uppercase">
              {featuredPlayer.firstName}
              <br />
              <span className="text-primary-red">{featuredPlayer.lastName}</span>
            </h2>

            {/* 포지션 정보 */}
            <p className="font-body text-text-muted tracking-widest uppercase text-sm font-semibold mb-6">
              {featuredPlayer.position} · {featuredPlayer.nationality} · {featuredPlayer.age} YRS
            </p>

            {/* 스탯 미리보기 (있는 경우) */}
            {featuredPlayer.stats && (
              <div className="flex gap-6 mb-6">
                <div>
                  <span className="block font-headline text-3xl font-black text-primary-red">{featuredPlayer.stats.goals}</span>
                  <span className="font-label text-[10px] uppercase tracking-widest text-text-muted">Goals</span>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <span className="block font-headline text-3xl font-black text-gold">{featuredPlayer.stats.assists}</span>
                  <span className="font-label text-[10px] uppercase tracking-widest text-text-muted">Assists</span>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <span className="block font-headline text-3xl font-black">{featuredPlayer.stats.minutes}'</span>
                  <span className="font-label text-[10px] uppercase tracking-widest text-text-muted">Minutes</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* 인디케이터 도트 */}
        <div className="absolute bottom-4 right-6 flex gap-2 z-10" onClick={(e) => e.stopPropagation()}>
          {FEATURED_PLAYERS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === featuredIdx
                  ? 'w-6 h-2 bg-primary-red'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── 에러 ─────────────────────────────────────────────────────────────── */}
      {error && (
        <p className="font-label text-xs uppercase tracking-widest text-center text-text-muted py-8">
          Squad data unavailable
        </p>
      )}

      {/* ── 포지션별 섹션 ─────────────────────────────────────────────────────── */}
      {loading ? (
        // 스켈레톤
        <section>
          <div className="flex items-center gap-6 mb-8">
            <div className="h-8 w-40 bg-surface-high rounded animate-pulse" />
            <div className="flex-grow h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </section>
      ) : (
        (['GK', 'DEF', 'MID', 'FWD'] as const).map((group) => {
          const groupPlayers = grouped[group];
          if (!groupPlayers?.length) return null;

          return (
            <section key={group}>
              <div className="flex items-center gap-6 mb-8">
                <h4 className="text-4xl font-black italic uppercase tracking-tighter">
                  {GROUP_LABELS[group]}
                </h4>
                <div className="flex-grow h-px bg-white/10" />
                <span className="font-label text-[10px] uppercase tracking-widest text-text-muted">
                  {groupPlayers.length}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(groupPlayers as ApiSquadPlayer[]).map((p: ApiSquadPlayer) => {
                  const detailed = detailedById.get(p.id);
                  const handleClick = detailed
                    ? () => { onSelectPlayer(detailed); setView('player'); }
                    : undefined;
                  return (
                    <div key={p.id} className="contents">
                      <PlayerCard player={p} onClick={handleClick} />
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })
      )}
    </motion.div>
  );
}
