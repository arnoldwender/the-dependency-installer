/* Achievement tracking system — persists to localStorage */
import { useState, useCallback } from "react";
import { ACHIEVEMENTS, type Achievement } from "../data/packages";
import { playAchievementSound } from "../utils/sounds";

const STORAGE_KEY = "tdi-achievements";

export function useAchievements() {
  const [unlocked, setUnlocked] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  /* Queue of achievements to display as toasts */
  const [pending, setPending] = useState<Achievement[]>([]);

  /* Persist only when an achievement is unlocked — an effect on `unlocked` would write on page load (§ 25 TDDDG) */
  const unlock = useCallback(
    (id: string) => {
      if (unlocked.includes(id)) return;
      const achievement = ACHIEVEMENTS.find((a) => a.id === id);
      if (!achievement) return;

      setUnlocked((prev) => {
        const next = [...prev, id];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* localStorage unavailable */
        }
        return next;
      });
      setPending((prev) => [...prev, achievement]);
      playAchievementSound();
    },
    [unlocked]
  );

  const dismissPending = useCallback(() => {
    setPending((prev) => prev.slice(1));
  }, []);

  return {
    unlocked,
    pending,
    unlock,
    dismissPending,
    allAchievements: ACHIEVEMENTS,
  };
}
