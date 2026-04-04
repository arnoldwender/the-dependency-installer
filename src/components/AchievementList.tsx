/* Achievement list panel — shows all achievements and which ones are unlocked */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";
import type { Achievement } from "../data/packages";

interface AchievementListProps {
  allAchievements: Achievement[];
  unlocked: string[];
}

export function AchievementList({ allAchievements, unlocked }: AchievementListProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[0.62rem] tracking-[3px] text-terminal/45
                   hover:text-terminal/70 transition-colors mb-2"
      >
        <Award className="w-3 h-3" />
        ACHIEVEMENTS ({unlocked.length}/{allAchievements.length})
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border border-terminal/10 bg-terminal/[0.02] p-3">
              <div className="grid grid-cols-2 gap-2">
                {allAchievements.map((ach) => {
                  const isUnlocked = unlocked.includes(ach.id);
                  return (
                    <motion.div
                      key={ach.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`border p-2 transition-colors ${
                        isUnlocked
                          ? "border-terminal/30 bg-terminal/[0.05]"
                          : "border-terminal/8 bg-transparent opacity-40"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`w-5 h-5 flex items-center justify-center text-[0.7rem]
                                       border ${isUnlocked ? "border-terminal/40 text-terminal" : "border-terminal/15 text-terminal/20"}`}
                        >
                          {ach.icon}
                        </span>
                        <span className={`text-[0.6rem] font-bold ${isUnlocked ? "text-terminal/80" : "text-terminal/25"}`}>
                          {ach.title}
                        </span>
                      </div>
                      <div className={`text-[0.5rem] ${isUnlocked ? "text-terminal/40" : "text-terminal/15"}`}>
                        {isUnlocked ? ach.description : "???"}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
