/* Achievement unlock notification toast */
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";
import type { Achievement } from "../data/packages";

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  /* Auto-dismiss after 3.5 seconds */
  useEffect(() => {
    if (!achievement) return;
    const timer = setTimeout(onDismiss, 3500);
    return () => clearTimeout(timer);
  }, [achievement, onDismiss]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
        >
          <div
            className="border border-terminal/40 bg-black/95 px-5 py-3
                       flex items-center gap-3 shadow-[0_0_20px_rgba(0,255,65,0.15)]"
            onClick={onDismiss}
          >
            <div className="w-8 h-8 border border-terminal/30 flex items-center justify-center text-terminal">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[0.5rem] text-terminal/40 tracking-[3px] mb-0.5">
                ACHIEVEMENT UNLOCKED
              </div>
              <div className="text-[0.75rem] text-terminal font-bold">
                {achievement.title}
              </div>
              <div className="text-[0.55rem] text-terminal/50">
                {achievement.description}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
