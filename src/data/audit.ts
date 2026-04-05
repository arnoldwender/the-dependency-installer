/* Realistic npm audit output data — styled exactly like real npm audit */

export interface AuditAdvisory {
  id: number;
  severity: "info" | "low" | "moderate" | "high" | "critical";
  title: string;
  package: string;
  dependencyOf: string;
  path: string;
  moreInfo: string;
  fix: string;
}

export const AUDIT_ADVISORIES: AuditAdvisory[] = [
  {
    id: 1847,
    severity: "critical",
    title: "Prototype Pollution in your-self-esteem",
    package: "your-self-esteem",
    dependencyOf: "social-media",
    path: "social-media > comparison-engine > your-self-esteem",
    moreInfo: "https://npmjs.com/advisories/1847",
    fix: "npm audit fix --therapy",
  },
  {
    id: 2093,
    severity: "critical",
    title: "Remote Code Execution in sleep-schedule",
    package: "sleep-schedule",
    dependencyOf: "netflix-binge",
    path: "netflix-binge > one-more-episode > sleep-schedule",
    moreInfo: "https://npmjs.com/advisories/2093",
    fix: "npm audit fix --melatonin",
  },
  {
    id: 847,
    severity: "critical",
    title: "Denial of Service in productivity",
    package: "productivity",
    dependencyOf: "youtube-algorithm",
    path: "youtube-algorithm > recommended-videos > productivity",
    moreInfo: "https://npmjs.com/advisories/847",
    fix: "npm uninstall youtube (impossible)",
  },
  {
    id: 3141,
    severity: "high",
    title: "Information Disclosure in drunk-texting",
    package: "drunk-texting",
    dependencyOf: "friday-night",
    path: "friday-night > alcohol > impulse-control > drunk-texting",
    moreInfo: "https://npmjs.com/advisories/3141",
    fix: "npm audit fix --delete-number",
  },
  {
    id: 666,
    severity: "high",
    title: "Cross-Site Scripting in overthinking",
    package: "overthinking",
    dependencyOf: "brain",
    path: "brain > anxiety > overthinking > 3am-thoughts",
    moreInfo: "https://npmjs.com/advisories/666",
    fix: "Patch not available. Affected since birth.",
  },
  {
    id: 1234,
    severity: "high",
    title: "Buffer Overflow in email-inbox",
    package: "email-inbox",
    dependencyOf: "work",
    path: "work > meetings > email-inbox (14,847 unread)",
    moreInfo: "https://npmjs.com/advisories/1234",
    fix: "npm audit fix --mark-all-read --pretend",
  },
  {
    id: 4200,
    severity: "moderate",
    title: "Regular Expression DoS in morning-routine",
    package: "morning-routine",
    dependencyOf: "alarm-clock",
    path: "alarm-clock > snooze-button > morning-routine",
    moreInfo: "https://npmjs.com/advisories/4200",
    fix: "npm audit fix --force-wake-up (always fails)",
  },
  {
    id: 9001,
    severity: "moderate",
    title: "Memory Leak in browser-tabs",
    package: "browser-tabs",
    dependencyOf: "chrome",
    path: "chrome > tab-hoarding > browser-tabs (847 open)",
    moreInfo: "https://npmjs.com/advisories/9001",
    fix: "Close tabs? No. Buy more RAM.",
  },
  {
    id: 5555,
    severity: "moderate",
    title: "Insecure Randomness in life-decisions",
    package: "life-decisions",
    dependencyOf: "impulse",
    path: "impulse > random() > life-decisions",
    moreInfo: "https://npmjs.com/advisories/5555",
    fix: "Use crypto.getRandomValues() for important decisions (nobody does this)",
  },
  {
    id: 7777,
    severity: "low",
    title: "Timing Attack in cooking-skills",
    package: "cooking-skills",
    dependencyOf: "adulting",
    path: "adulting > basic-survival > cooking-skills",
    moreInfo: "https://npmjs.com/advisories/7777",
    fix: "npm install uber-eats --save",
  },
  {
    id: 1111,
    severity: "low",
    title: "Path Traversal in career-path",
    package: "career-path",
    dependencyOf: "life",
    path: "life > expectations > career-path > ../../back-to-start",
    moreInfo: "https://npmjs.com/advisories/1111",
    fix: "No fix available. The path was never straight to begin with.",
  },
];

/* Summary counts matching the advisories above */
export const AUDIT_SUMMARY = {
  total: 2847,
  info: 0,
  low: 200,
  moderate: 507,
  high: 1293,
  critical: 847,
};
