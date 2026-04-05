/* Fake changelog and pro tier data */

export interface ChangelogEntry {
  version: string;
  date: string;
  type: "feature" | "fix" | "breaking" | "deprecated";
  message: string;
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v6.6.6",
    date: "2026-04-05",
    type: "feature",
    message: "Added support for circular dependencies (life IS circular)",
  },
  {
    version: "v6.6.5",
    date: "2026-04-01",
    type: "fix",
    message: "Fixed: motivation no longer silently fails on Mondays (now fails loudly with stack trace)",
  },
  {
    version: "v6.6.4",
    date: "2026-03-28",
    type: "feature",
    message: "New: npm install regret --save — automatically added to every project after 6 months",
  },
  {
    version: "v6.6.3",
    date: "2026-03-15",
    type: "breaking",
    message: "BREAKING: sleep@8h now requires discipline@^1.0.0 as peer dependency. npm WARN optional dep: dreams@lucid failed to install",
  },
  {
    version: "v6.6.2",
    date: "2026-03-01",
    type: "fix",
    message: "Fixed memory leak in overthinking module — thoughts now garbage collected after 3am",
  },
  {
    version: "v6.6.1",
    date: "2026-02-14",
    type: "deprecated",
    message: "Deprecated: valentines-day@single — use self-love@latest instead (breaking: removes crying-in-shower peer dep)",
  },
  {
    version: "v6.6.0",
    date: "2026-02-01",
    type: "feature",
    message: "New: procrastination now supports --later flag (does nothing, as expected). Also added --much-later and --never",
  },
  {
    version: "v6.5.9",
    date: "2026-01-15",
    type: "breaking",
    message: "BREAKING: new-year-resolutions@2026 dropped after 15 days (expected lifecycle). Use gym-membership@unused as fallback",
  },
  {
    version: "v6.5.8",
    date: "2025-12-31",
    type: "feature",
    message: "Added: existential-crisis now runs automatically at end of year via cron job",
  },
  {
    version: "v6.5.7",
    date: "2025-12-25",
    type: "fix",
    message: "Fixed: git blame no longer triggers imposter syndrome (who approved this code? ...oh. it was me)",
  },
  {
    version: "v6.5.6",
    date: "2025-12-01",
    type: "deprecated",
    message: "Deprecated: productivity@december — replaced by holiday-mode@cozy. All sprint points set to 0",
  },
  {
    version: "v6.5.5",
    date: "2025-11-15",
    type: "fix",
    message: "Fixed: attention-span no longer crashes when TikTok is in node_modules. Buffer overflow in dopamine subsystem patched",
  },
  {
    version: "v6.5.4",
    date: "2025-11-01",
    type: "feature",
    message: "New: npm audit fix --therapy now accepts insurance provider as argument. Copay not included",
  },
  {
    version: "v6.5.3",
    date: "2025-10-15",
    type: "fix",
    message: "Fixed: deploy-on-friday no longer triggers automatic resume update on LinkedIn",
  },
  {
    version: "v6.5.2",
    date: "2025-10-01",
    type: "breaking",
    message: "BREAKING: removed leftpad dependency. The entire internet held its breath. Nothing happened. We got lucky",
  },
  {
    version: "v6.5.1",
    date: "2025-09-15",
    type: "feature",
    message: "New: --dry-run flag now applies to coffee (simulates caffeine without the jitters). Side effects: sadness",
  },
];

/* Pro tier / enterprise pricing data */
export interface ProTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export const PRO_TIERS: ProTier[] = [
  {
    name: "Free Tier",
    price: "$0",
    period: "forever",
    features: [
      "Unlimited existential dread",
      "Basic procrastination engine",
      "npm install --save-dev anxiety",
      "Community support (Stack Overflow)",
      "1 mass of coffee dependency",
      "847 unresolved TODO comments",
    ],
    cta: "Current Plan",
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/mass",
    features: [
      "Everything in Free, plus:",
      "npm install will-to-live@pro",
      "Priority therapy scheduling",
      "Advanced coping mechanisms",
      "Reduced Monday morning latency (-200ms)",
      "Custom vulnerability suppressions",
      "npm audit fix --actually-fix",
      "git push --force without consequences",
    ],
    cta: "Upgrade (card declined)",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$∞",
    period: "/lifetime",
    features: [
      "Everything in Pro, plus:",
      "npm install will-to-live@enterprise",
      "24/7 emotional support API (429 Too Happy)",
      "Zero-downtime work-life-balance",
      "Dedicated accountability partner (bot)",
      "Automatic motivation injection at CI/CD",
      "node_modules < 1GB (mathematically impossible)",
      "Delete all technical debt (requires sudo)",
      "Merge conflicts resolve themselves",
      "Imposter syndrome firewall",
    ],
    cta: "Contact Sales (good luck)",
  },
];
