import type { View } from '@/src/types/view';
import { Menu, Search } from 'lucide-react';

export function TopAppBar({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/80 backdrop-blur-md shadow-[0_4px_20px_rgba(200,16,46,0.1)]">
      <div className="flex items-center gap-4">
        <Menu className="text-primary-red cursor-pointer w-6 h-6" />
        <h1
          className="text-2xl font-black italic tracking-tighter text-text-primary uppercase cursor-pointer"
          onClick={() => setView('home')}
        >
          THE ANFIELD EDIT
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {currentView === 'fixtures' && (
          <div className="hidden md:flex items-center gap-3 bg-surface-high px-4 py-1 border-l-2 border-gold">
            <span className="text-[10px] font-label uppercase tracking-widest text-text-muted">Next:</span>
            <span className="text-xs font-headline font-black italic uppercase tracking-tighter">MCFC (H)</span>
            <span className="text-xs font-label text-primary-red font-bold">2D 14H</span>
          </div>
        )}
        <div className="bg-primary-red px-3 py-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span className="text-white font-bold text-xs tracking-tighter italic">LIVE</span>
        </div>
        <Search className="text-text-primary cursor-pointer w-5 h-5" />
      </div>
    </header>
  );
}

