/* Global install counter — seeded by date, incremented by installs */

const SEED_DATE = new Date("2024-01-01").getTime();
const PACKAGES_PER_DAY = 4_271;

export function getGlobalCount(): number {
  const now = Date.now();
  const daysSinceSeed = Math.floor((now - SEED_DATE) / (1000 * 60 * 60 * 24));
  const baseCount = daysSinceSeed * PACKAGES_PER_DAY;

  /* Add time-of-day variance so the number ticks up throughout the day */
  const todayMs = now % (1000 * 60 * 60 * 24);
  const todayFraction = todayMs / (1000 * 60 * 60 * 24);
  const todayPackages = Math.floor(todayFraction * PACKAGES_PER_DAY);

  /* Add local installs from storage */
  const localInstalls = parseInt(localStorage.getItem("tdi-local-installs") || "0", 10);

  return baseCount + todayPackages + localInstalls;
}

export function incrementLocalCount(amount: number): void {
  const current = parseInt(localStorage.getItem("tdi-local-installs") || "0", 10);
  localStorage.setItem("tdi-local-installs", String(current + amount));
}
