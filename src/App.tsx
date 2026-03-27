import { useEffect, useState } from 'react';
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

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-surface text-text-primary font-body selection:bg-primary-red selection:text-white overflow-x-hidden">
      <TopAppBar currentView={view} setView={setView} />
      
      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <HomeView setView={setView} />
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
              <SquadView setView={setView} onSelectPlayer={setSelectedPlayer} />
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

      <BottomNavBar currentView={view} setView={setView} />
    </div>
  );
}
