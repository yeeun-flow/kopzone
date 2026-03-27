import type { View } from '@/src/types/view';
import { BarChart3, Bell, Newspaper, Trophy, Users } from 'lucide-react';

export function BottomNavBar({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  const navItems = [
    { id: 'home', label: 'MATCHDAY', icon: Trophy },
    { id: 'news', label: 'NEWS', icon: Newspaper },
    { id: 'squad', label: 'SQUAD', icon: Users },
    { id: 'standings', label: 'STATS', icon: BarChart3 },
    { id: 'alerts', label: 'ALERTS', icon: Bell },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-lowest/80 glass-nav border-t border-white/5 shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center pt-3 pb-8 px-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={`flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
              currentView === item.id ? 'text-primary-red drop-shadow-[0_0_8px_rgba(200,16,46,0.4)] scale-110' : 'text-text-muted/60 hover:text-primary-red'
            }`}
          >
            <item.icon className={`w-6 h-6 mb-1 ${currentView === item.id ? 'fill-current' : ''}`} />
            <span className="font-label font-black text-[9px] uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

