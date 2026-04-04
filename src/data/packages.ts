export interface LifePackage {
  name: string;
  version: string;
  size: string;
  deps: number;
  vulnerabilities: number;
}

export const LIFE_PACKAGES: LifePackage[] = [
  { name: "monday-morning", version: "1.0.0", size: "847MB", deps: 234, vulnerabilities: 12 },
  { name: "motivation", version: "0.0.1-alpha", size: "0KB", deps: 0, vulnerabilities: 0 },
  { name: "adulting", version: "3.2.1", size: "∞GB", deps: 847, vulnerabilities: 99 },
  { name: "work-life-balance", version: "2.0.0-deprecated", size: "404KB", deps: 12, vulnerabilities: 3 },
  { name: "happiness", version: "1.2.3", size: "12MB", deps: 42, vulnerabilities: 0 },
  { name: "sleep", version: "8.0.0", size: "∞MB", deps: 3, vulnerabilities: 1 },
  { name: "coffee-dependency", version: "6.6.6", size: "250ML", deps: 1, vulnerabilities: 0 },
  { name: "existential-dread", version: "∞.0.0", size: "∞GB", deps: 999, vulnerabilities: 999 },
  { name: "impostor-syndrome", version: "1.0.0", size: "100GB", deps: 47, vulnerabilities: 23 },
  { name: "technical-debt", version: "legacy", size: "∞TB", deps: 9999, vulnerabilities: 418 },
  { name: "vim-exit-strategy", version: "0.0.0", size: "1B", deps: 0, vulnerabilities: 0 },
  { name: "rubber-duck", version: "2.4.1", size: "1KB", deps: 0, vulnerabilities: 0 },
  { name: "stack-overflow", version: "404.0.0", size: "∞GB", deps: 12847, vulnerabilities: 0 },
  { name: "git-blame", version: "3.0.0", size: "5MB", deps: 8, vulnerabilities: 2 },
  { name: "documentation", version: "0.0.0-never", size: "0KB", deps: 0, vulnerabilities: 0 },
];

export const SUGGESTIONS = [
  "monday morning",
  "motivation",
  "adulting",
  "happiness",
  "sleep",
  "work life balance",
  "technical debt",
  "impostor syndrome",
];
