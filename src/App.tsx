import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BottomNavBar } from '@/src/components/layout/BottomNavBar';
import { TopAppBar } from '@/src/components/layout/TopAppBar';
import { players } from '@/src/data/players';
import type { Player } from '@/src/types/player';
import type { View } from '@/src/types/view';
import { AlertsView } from '@/src/views/AlertsView';
import { FixturesView } from '@/src/views/FixturesView';
import { HomeView } from '@/src/views/HomeView';
import { NewsDetailView } from '@/src/views/NewsDetailView';
import { PlayerProfileView } from '@/src/views/PlayerProfileView';
import { SquadView } from '@/src/views/SquadView';
import { StandingsView } from '@/src/views/StandingsView';

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(players[0]);

  // ─── Navigation history (ref to avoid stale closures in touch handlers) ───
  const historyRef = useRef<View[]>([]);

  /** In-app navigation: pushes current view to history */
  const navigate = (newView: View) => {
    if (newView === view) return;
    historyRef.current = [...historyRef.current, view];
    setView(newView);
  };

  /** Tab-bar / logo navigation: clears history (root-level action) */
  const navigateRoot = (newView: View) => {
    historyRef.current = [];
    setView(newView);
  };

  // ─── Swipe-back gesture (iOS style: left edge → drag right) ──────────────
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      // Only track touches that begin near the left edge
      if (t.clientX < 40) {
        touchStartRef.current = { x: t.clientX, y: t.clientY };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartRef.current.x;
      const dy = Math.abs(t.clientY - touchStartRef.current.y);
      touchStartRef.current = null;
      // Right swipe ≥ 80px, more horizontal than vertical, history exists
      if (dx >= 80 && dy < dx && historyRef.current.length > 0) {
        const prev = historyRef.current[historyRef.current.length - 1];
        historyRef.current = historyRef.current.slice(0, -1);
        setView(prev);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-surface text-text-primary font-body selection:bg-primary-red selection:text-white overflow-x-hidden">
      <TopAppBar currentView={view} setView={navigateRoot} />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <HomeView setView={navigate} />
            </motion.div>
          )}
          {view === 'fixtures' && (
            <motion.div key="fixtures" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <FixturesView />
            </motion.div>
          )}
          {view === 'standings' && (
            <motion.div key="standings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <StandingsView />
            </motion.div>
          )}
          {view === 'squad' && (
            <motion.div key="squad" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SquadView setView={navigate} onSelectPlayer={setSelectedPlayer} />
            </motion.div>
          )}
          {view === 'player' && (
            <motion.div key="player" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <PlayerProfileView player={selectedPlayer} />
            </motion.div>
          )}
          {view === 'news' && (
            <motion.div key="news" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <NewsDetailView />
            </motion.div>
          )}
          {view === 'alerts' && (
            <AlertsView />
          )}
        </AnimatePresence>
      </main>

      <BottomNavBar currentView={view} setView={navigateRoot} />
    </div>
  );
}
