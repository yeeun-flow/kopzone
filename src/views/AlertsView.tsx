import { motion } from 'motion/react';
import { Bell } from 'lucide-react';

export function AlertsView() {
  return (
    <motion.div
      key="alerts"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col items-center justify-center h-[60vh] text-center"
    >
      <Bell className="w-16 h-16 text-primary-red mb-4 opacity-20" />
      <h2 className="text-4xl font-black italic uppercase">NO NEW ALERTS</h2>
      <p className="text-text-muted mt-2 uppercase tracking-widest text-xs">You're all caught up with the reds</p>
    </motion.div>
  );
}

