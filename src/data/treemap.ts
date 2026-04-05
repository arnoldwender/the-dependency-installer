/* node_modules treemap data — absurd dependency sizes for visualization */

export interface TreemapItem {
  name: string;
  size: string;
  sizeBytes: number;
  color: string;
  description: string;
}

/* Color palette for treemap blocks — severity-coded by absurdity */
const COLORS = {
  critical: "#ef4444",
  high: "#f97316",
  moderate: "#eab308",
  low: "#22c55e",
  terminal: "#00ff41",
  purple: "#a855f7",
  cyan: "#06b6d4",
  pink: "#ec4899",
};

export const TREEMAP_ITEMS: TreemapItem[] = [
  {
    name: "node_modules/node_modules/node_modules",
    size: "recursion error",
    sizeBytes: 999999,
    color: COLORS.critical,
    description: "Error: Maximum call stack size exceeded. node_modules contains node_modules which contains node_modules which contains... (Ctrl+C does not work. Nothing works.)",
  },
  {
    name: "Stack Overflow",
    size: "12GB",
    sizeBytes: 12000,
    color: COLORS.high,
    description: "12GB — mostly ads, cookie banners, and 'this question was marked as duplicate' messages. 40% of size is jQuery answers from 2012 that still get upvotes.",
  },
  {
    name: "Existential Dread",
    size: "2.1GB",
    sizeBytes: 2100,
    color: COLORS.purple,
    description: "2.1GB — Cannot be tree-shaken. Has circular dependency with meaning-of-life@undefined. npm WARN: this package has no exports field.",
  },
  {
    name: "Morning Coffee",
    size: "847MB",
    sizeBytes: 847,
    color: COLORS.terminal,
    description: "847MB — Critical runtime dependency. Removing causes system crash every morning at 06:00. Peer dependency of productivity@any. Cannot be made optional.",
  },
  {
    name: "Unused CSS",
    size: "1.8GB",
    sizeBytes: 1800,
    color: COLORS.cyan,
    description: "1.8GB — 99.7% of these selectors are from that one Bootstrap import you never removed. The other 0.3% is !important declarations fighting each other.",
  },
  {
    name: "Zoom Backgrounds",
    size: "3.4GB",
    sizeBytes: 3400,
    color: COLORS.pink,
    description: "3.4GB — 847 virtual backgrounds for that one meeting where your camera was off. Includes 'beach.jpg' you've never used and 'office.jpg' to pretend you're at work.",
  },
  {
    name: "TODO Comments",
    size: "945MB",
    sizeBytes: 945,
    color: COLORS.moderate,
    description: "945MB — 12,847 TODO comments from 2019. Carbon-dated. Archaeologists study them. None will ever be addressed.",
  },
  {
    name: "Procrastination Engine",
    size: "4.7GB",
    sizeBytes: 4700,
    color: COLORS.critical,
    description: "4.7GB — Includes YouTube, Reddit, Twitter, HackerNews, and a 'just 5 more minutes' scheduler that runs recursively. Priority: highest.",
  },
  {
    name: "Imposter Syndrome",
    size: "1.2GB",
    sizeBytes: 1200,
    color: COLORS.high,
    description: "1.2GB — Grows 50MB every time you attend a tech conference, read HackerNews, or see a 14-year-old's GitHub profile.",
  },
  {
    name: ".env.local.backup.old.final.FINAL2",
    size: "0.3KB",
    sizeBytes: 50,
    color: COLORS.low,
    description: "0.3KB — Tiny file, but contains every secret you've ever committed by accident. git-secrets found 847 violations. You ignored all of them.",
  },
  {
    name: "Deprecated Dependencies",
    size: "6.2GB",
    sizeBytes: 6200,
    color: COLORS.critical,
    description: "6.2GB — 847 packages marked deprecated since 2017. Still in production. Still working. The intern who added them has left. Don't. Touch. Them.",
  },
  {
    name: "Left-pad",
    size: "11 bytes",
    sizeBytes: 30,
    color: COLORS.terminal,
    description: "11 bytes — The package that once broke the internet. We keep it here as a memorial. A tiny monument to chaos theory.",
  },
  {
    name: "Meeting Notes",
    size: "2.8GB",
    sizeBytes: 2800,
    color: COLORS.moderate,
    description: "2.8GB — 'This meeting could have been an email' x 9,847 occurrences. Each meeting spawned 3 follow-up meetings.",
  },
  {
    name: "Draft Emails Never Sent",
    size: "1.5GB",
    sizeBytes: 1500,
    color: COLORS.pink,
    description: "1.5GB — Passive-aggressive masterpieces wisely never deployed to production. Includes 'per my last email' used 2,847 times unironically.",
  },
  {
    name: "Console.log Statements",
    size: "780MB",
    sizeBytes: 780,
    color: COLORS.cyan,
    description: "780MB — 'TODO: remove before push' — committed 2,847 times. Also includes: console.log('here'), console.log('WHY'), console.log('asdfasdf').",
  },
  {
    name: "Webpack Config",
    size: "∞",
    sizeBytes: 8000,
    color: COLORS.high,
    description: "∞ — Nobody understands it. Nobody can modify it. It was written by a developer who ascended to a higher plane. It just... works. Sometimes.",
  },
  {
    name: "Git Stash",
    size: "3.1GB",
    sizeBytes: 3100,
    color: COLORS.purple,
    description: "3.1GB — 847 stashed changes from 2020. You told yourself you'd pop them later. You won't. They know it. You know it.",
  },
  {
    name: "node_modules/.cache",
    size: "5.8GB",
    sizeBytes: 5800,
    color: COLORS.critical,
    description: "5.8GB — Caching things nobody asked to cache. Faster rebuilds they said. 5.8GB of 'optimization' that makes your SSD weep.",
  },
];

/* Total disk summary shown below the treemap */
export const DISK_SUMMARY = {
  total: "847TB",
  used: "847TB",
  remaining: "none",
  inodes: "exhausted",
  recommendation: "Buy more SSDs or delete node_modules (just kidding, it'll come back)",
};
