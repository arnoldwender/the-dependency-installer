export interface LifePackage {
  name: string;
  version: string;
  size: string;
  deps: number;
  vulnerabilities: number;
  /* Whether this package "failed" to install */
  failed?: boolean;
  failReason?: string;
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
  { name: "self-confidence", version: "0.1.0-beta", size: "2KB", deps: 156, vulnerabilities: 8 },
  { name: "patience", version: "999.0.0", size: "∞MB", deps: 1, vulnerabilities: 0 },
  { name: "social-skills", version: "2.3.1", size: "45MB", deps: 89, vulnerabilities: 5 },
  { name: "procrastination", version: "∞.∞.∞", size: "0KB", deps: 0, vulnerabilities: 47 },
  { name: "coping-mechanisms", version: "3.1.4", size: "78MB", deps: 234, vulnerabilities: 19 },
  { name: "relationship-stability", version: "0.0.1-rc", size: "∞GB", deps: 567, vulnerabilities: 34 },
  { name: "financial-literacy", version: "1.0.0", size: "404KB", deps: 12, vulnerabilities: 7 },
  { name: "inner-peace", version: "0.0.0-alpha", size: "1B", deps: 9999, vulnerabilities: 0 },
  { name: "attention-span", version: "0.0.1", size: "3KB", deps: 2, vulnerabilities: 15 },
  { name: "feelings", version: "1.0.0", size: "∞GB", deps: 847, vulnerabilities: 99 },
  { name: "therapy", version: "2.0.0", size: "200MB", deps: 45, vulnerabilities: 0 },
  { name: "free-time", version: "0.2.0", size: "0KB", deps: 0, vulnerabilities: 3 },
  { name: "savings-account", version: "0.0.1", size: "404B", deps: 999, vulnerabilities: 88 },
  { name: "gym-membership", version: "1.0.0-unused", size: "50MB", deps: 12, vulnerabilities: 1 },
  { name: "cooking-skills", version: "0.3.0", size: "25MB", deps: 67, vulnerabilities: 4 },
];

export const SUGGESTIONS = [
  "monday morning",
  "motivation",
  "adulting",
  "happiness",
  "sleep",
  "work life balance",
  "feelings",
  "self confidence",
  "technical debt",
  "impostor syndrome",
];

/* Vulnerability scan entries — shown after install completes */
export interface VulnEntry {
  package: string;
  severity: "low" | "moderate" | "high" | "critical";
  description: string;
}

export const VULNERABILITY_SCAN: VulnEntry[] = [
  { package: "self-esteem", severity: "critical", description: "has known vulnerability to social-media@latest" },
  { package: "sleep-schedule", severity: "critical", description: "affected by netflix@latest binge-watching exploit" },
  { package: "motivation", severity: "high", description: "regularly crashes on Monday mornings without coffee@^6.0" },
  { package: "attention-span", severity: "critical", description: "compromised by tiktok@∞ — no patch available" },
  { package: "savings-account", severity: "high", description: "drained by food-delivery-apps@daily" },
  { package: "posture", severity: "moderate", description: "degraded by desk-job@9to5 — ergonomic patch pending" },
  { package: "patience", severity: "high", description: "exhausted by slow-wifi@0.5mbps" },
  { package: "productivity", severity: "critical", description: "hijacked by youtube-recommendations@∞" },
  { package: "work-life-balance", severity: "high", description: "overwritten by slack-notifications@always-on" },
  { package: "fitness-goals", severity: "moderate", description: "conflicting peer dependency: couch@comfortable vs gym@membership" },
  { package: "cooking-ambition", severity: "low", description: "replaced by uber-eats@convenient in dependency resolution" },
  { package: "social-battery", severity: "critical", description: "fully depleted — requires isolation@48h to recharge" },
  { package: "impulse-control", severity: "high", description: "bypassed by amazon-one-click@enabled" },
  { package: "morning-routine", severity: "moderate", description: "snooze-button@9x causes cascading failure in schedule@daily" },
  { package: "hydration", severity: "low", description: "replaced by coffee@iv-drip in most configurations" },
  { package: "boundaries", severity: "critical", description: "misconfigured — allows all incoming requests from everyone@*" },
  { package: "inbox-zero", severity: "high", description: "unreachable — 14,847 unread messages in queue" },
  { package: "weekend-plans", severity: "moderate", description: "overwritten by laundry@overdue and errands@accumulated" },
];

/* Dependency tree data — shows how packages depend on each other */
export interface DepTreeNode {
  name: string;
  version: string;
  children?: DepTreeNode[];
}

export const DEPENDENCY_TREES: Record<string, DepTreeNode> = {
  "self-confidence": {
    name: "self-confidence",
    version: "0.1.0-beta",
    children: [
      {
        name: "therapy",
        version: "2.0.0",
        children: [
          {
            name: "money",
            version: "999.99",
            children: [
              {
                name: "job",
                version: "stable",
                children: [
                  { name: "experience", version: "5y-minimum", children: [
                    { name: "entry-level-job", version: "0.0.0", children: [
                      { name: "experience", version: "5y-minimum" }
                    ]}
                  ]},
                ],
              },
            ],
          },
          { name: "vulnerability", version: "∞.0.0" },
          { name: "time", version: "0.0.0-unavailable" },
        ],
      },
      { name: "positive-self-talk", version: "0.0.1-beta", children: [
        { name: "silencing-inner-critic", version: "0.0.0-impossible" }
      ]},
      { name: "past-achievements", version: "forgotten" },
    ],
  },
  "happiness": {
    name: "happiness",
    version: "1.2.3",
    children: [
      {
        name: "free-time",
        version: "8.0.0-required",
        children: [
          { name: "saying-no", version: "0.0.1", children: [
            { name: "guilt-management", version: "∞.0.0" }
          ]},
          { name: "less-overtime", version: "404-not-found" },
        ],
      },
      {
        name: "financial-stability",
        version: "unreachable",
        children: [
          { name: "budgeting", version: "0.0.0-skipped" },
          { name: "no-impulse-buying", version: "impossible" },
        ],
      },
      { name: "meaningful-relationships", version: "2.0.0", children: [
        { name: "social-skills", version: "loading..." },
        { name: "emotional-availability", version: "0.1.0" }
      ]},
    ],
  },
  "motivation": {
    name: "motivation",
    version: "0.0.1-alpha",
    children: [
      {
        name: "clear-goals",
        version: "undefined",
        children: [
          { name: "self-awareness", version: "0.0.0" },
          { name: "purpose", version: "existential-crisis" },
        ],
      },
      {
        name: "discipline",
        version: "1.0.0",
        children: [
          { name: "routine", version: "0.0.1-broken", children: [
            { name: "alarm-clock", version: "snoozed" },
          ]},
          { name: "accountability", version: "none" },
        ],
      },
      { name: "caffeine", version: "∞.0.0" },
    ],
  },
  default: {
    name: "life",
    version: "∞.0.0",
    children: [
      {
        name: "responsibilities",
        version: "too-many",
        children: [
          { name: "adulting", version: "3.2.1" },
          { name: "taxes", version: "annual-pain" },
          { name: "laundry", version: "overdue" },
        ],
      },
      {
        name: "coping-mechanisms",
        version: "3.1.4",
        children: [
          { name: "coffee", version: "6.6.6" },
          { name: "memes", version: "∞.0.0" },
          { name: "retail-therapy", version: "broke" },
        ],
      },
      { name: "existential-questions", version: "unanswered" },
    ],
  },
};

/* Package.json of Life template */
export const LIFE_PACKAGE_JSON = {
  name: "my-life",
  version: "0.0.1-beta",
  description: "A chaotic monorepo with no tests and zero documentation",
  main: "brain.js",
  scripts: {
    start: "wake-up --snooze=5",
    dev: "coffee && pretend-to-be-productive",
    build: "accumulate-stress --mode=production",
    test: "existential-crisis --watch",
    lint: "judge-own-life-choices",
    deploy: "leave-house --force --no-motivation",
    clean: "rm -rf node_modules && cry",
    audit: "npm audit fix --force && make-things-worse",
    prepublish: "anxiety-attack",
    postinstall: "regret",
  },
  dependencies: {
    "coffee": "^6.6.6",
    "anxiety": "∞.0.0",
    "impostor-syndrome": "^1.0.0",
    "procrastination": "latest",
    "existential-dread": "~∞.0.0",
    "sleep": "0.0.0",
  },
  devDependencies: {
    "motivation": "0.0.1-alpha",
    "patience": "^999.0.0",
    "free-time": "0.0.0",
    "will-to-live": "fluctuating",
  },
  peerDependencies: {
    "therapy": ">=2.0.0",
    "support-system": ">=1.0.0",
  },
  engines: {
    node: ">=consciousness",
    npm: ">=caffeine",
  },
  keywords: ["chaos", "barely-functional", "no-tests", "works-on-my-machine"],
  author: "You (probably)",
  license: "UNLICENSED — just like your car",
  bugs: {
    url: "https://github.com/your-life/issues (backlog: ∞)",
  },
  repository: {
    type: "git",
    url: "git+https://github.com/universe/simulation.git",
  },
};

/* NPX quick-run commands */
export interface NpxCommand {
  command: string;
  description: string;
  output: string[];
}

export const NPX_COMMANDS: NpxCommand[] = [
  {
    command: "npx create-new-hobby",
    description: "Start a new hobby you'll abandon in 2 weeks",
    output: [
      "Creating new hobby...",
      "Downloading: enthusiasm@temporary",
      "Installing: expensive-equipment@never-used",
      "Setting up: youtube-tutorials@watched-once",
      "warning: hobby requires free-time@8h but you have free-time@0.2h",
      "Hobby created! Estimated abandonment: 13 days",
      "added 1 hobby, removed 0 previous hobbies (they're still in the closet)",
    ],
  },
  {
    command: "npx migrate-to-new-city --force",
    description: "Relocate with zero planning",
    output: [
      "Migrating life to new-city...",
      "npm WARN: breaking change — all social connections will be dropped",
      "Backing up: comfort-zone@familiar... failed (cannot serialize nostalgia)",
      "Deleting: local-restaurants@favorite...",
      "Installing: loneliness@initial, apartment-hunting@nightmare",
      "npm ERR! rent@new-city exceeds budget@current by 340%",
      "Migration complete with 847 warnings. Welcome to your expensive studio apartment.",
    ],
  },
  {
    command: "npx audit-relationships",
    description: "Scan your relationships for vulnerabilities",
    output: [
      "Auditing relationship tree...",
      "found 23 relationships (4 genuine, 7 acquaintances, 12 mutual-follows-only)",
      "critical: best-friend@childhood — last contacted 8 months ago",
      "warning: family-group-chat has 47 unread messages",
      "high: ex@blocked — still checking their instagram through friend's account",
      "info: pet@unconditional-love — only stable dependency found",
      "12 relationships need attention. 3 should probably be deprecated.",
    ],
  },
  {
    command: "npx create-morning-routine",
    description: "Build the perfect morning routine",
    output: [
      "Scaffolding morning-routine@productive...",
      "Step 1: wake-up@5am... npm ERR! ESNOOZE — alarm dismissed 9 times",
      "Step 2: meditation@10min... replaced by doomscrolling@45min",
      "Step 3: healthy-breakfast... resolved to coffee@black + anxiety@freeform",
      "Step 4: exercise... skipped (peer dep conflict with bed@comfortable)",
      "Step 5: journaling... ENOTIME — all time consumed by steps 1-2",
      "Morning routine created! Actual adherence rate: 3%",
    ],
  },
  {
    command: "npx debug-sleep --verbose",
    description: "Diagnose your sleep issues",
    output: [
      "Analyzing sleep@current...",
      "Sleep process started at 23:00... intercepted by phone@bright-screen",
      "23:15 — brain.exe started processing: embarrassing-memory@2009",
      "00:30 — dependency conflict: melatonin vs caffeine@6pm",
      "01:45 — unhandled promise: tomorrow-will-be-different",
      "02:30 — sleep.lock acquired (finally)",
      "05:30 — alarm@first: ignored. alarm@second: ignored. alarm@panic: acknowledged",
      "Total sleep: 3h. Quality: segfault. Recommendation: nap@lunch (will be ignored)",
    ],
  },
  {
    command: "npx generate-excuse --creative",
    description: "Generate a creative excuse",
    output: [
      "Generating excuse from excuse-factory@premium...",
      "Analyzing context: work-meeting@missed",
      "Candidate 1: 'My npm install is still running' — plausibility: 94%",
      "Candidate 2: 'I was debugging a production issue' — plausibility: 87%",
      "Candidate 3: 'My Docker container ate my homework' — plausibility: 23%",
      "Selected: 'I was in a merge conflict with reality' — delivering via slack...",
      "Excuse deployed. Estimated belief rate: 61%. Good luck.",
    ],
  },
];

/* Easter egg definitions */
export interface EasterEgg {
  trigger: string;
  type: "deprecation" | "long-fail" | "uninstall-warning";
  messages: string[];
}

export const EASTER_EGGS: EasterEgg[] = [
  {
    trigger: "feelings",
    type: "deprecation",
    messages: [
      "> npm install feelings",
      "npm WARN deprecated feelings@1.0.0: use therapy instead",
      "npm WARN deprecated feelings@1.0.0: this package has known memory leaks",
      "npm WARN deprecated feelings@1.0.0: causes unexpected crashes in production",
      "npm WARN peer dep: feelings requires vulnerability@>=1.0.0",
      "npm WARN optional: installing feelings-suppression@2.0 as fallback",
      "Installing feelings anyway... this might hurt.",
      "added 1 package with 847 unprocessed emotions",
    ],
  },
  {
    trigger: "motivation",
    type: "long-fail",
    messages: [
      "> npm install motivation",
      "Resolving motivation... (this may take a while)",
      "Fetching motivation from registry... connection timeout",
      "Retrying... fetching from mirror...",
      "Downloading: willpower@0.0.1 (1 of 9,847)",
      "Downloading: discipline@0.0.0 (2 of 9,847)",
      "Downloading: get-out-of-bed@impossible (3 of 9,847)",
      "Downloading: stop-procrastinating@ironic (4 of 9,847)",
      "Still downloading... 0.04% complete",
      "npm WARN: motivation requires energy@>=50 but you have energy@3",
      "npm WARN: motivation requires sleep@>=8h but you have sleep@4h",
      "npm ERR! network timeout: motivation is too heavy for your bandwidth",
      "npm ERR! Suggestions: try installing coffee first",
      "npm ERR! Or try: npx create-new-hobby (it's lighter)",
      "npm ERR! INSTALL FAILED — motivation@0.0.1-alpha could not be resolved",
      "npm ERR! Some things just can't be installed. Maybe try again tomorrow.",
    ],
  },
];

/* Achievement definitions */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-install", title: "Hello World", description: "Installed your first life package", icon: "+" },
  { id: "five-installs", title: "Getting Started", description: "Installed 5 packages", icon: "*" },
  { id: "dependency-hell", title: "Dependency Hell", description: "Installed 10+ packages total", icon: "!" },
  { id: "vulnerability-survivor", title: "npm audit Survivor", description: "Survived 100+ vulnerabilities", icon: "#" },
  { id: "easter-egg-hunter", title: "Easter Egg Hunter", description: "Triggered a hidden easter egg", icon: "?" },
  { id: "feelings-installed", title: "Emotionally Available", description: "Tried to install feelings", icon: "~" },
  { id: "tree-viewer", title: "Root Cause Analysis", description: "Explored a dependency tree", icon: ">" },
  { id: "npx-runner", title: "Quick Fix", description: "Ran an npx command", icon: "$" },
  { id: "share-card", title: "Oversharing", description: "Generated a share card", icon: "@" },
  { id: "json-editor", title: "Config Tweaker", description: "Edited your life's package.json", icon: "{" },
  { id: "speed-runner", title: "Speed Runner", description: "Completed an install in under 5 seconds", icon: "%" },
  { id: "collector", title: "Package Hoarder", description: "Installed 20+ unique packages", icon: "&" },
];

/* Install failure messages — random chance during install */
export interface InstallFailure {
  package: string;
  error: string;
}

export const INSTALL_FAILURES: InstallFailure[] = [
  { package: "happiness", error: "ERR! peer dep conflict: happiness requires free-time@^8.0 but you have free-time@0.2" },
  { package: "work-life-balance", error: "ERR! ENOENT: no such file or directory, open '/life/balance'" },
  { package: "sleep", error: "ERR! ETIMEOUT: sleep@8h timed out — brain won't shut down" },
  { package: "patience", error: "ERR! EAGAIN: resource temporarily unavailable (try again... ironically)" },
  { package: "self-care", error: "ERR! EACCES: permission denied — you keep prioritizing everyone else" },
  { package: "savings", error: "ERR! ENOSPC: no space left on account" },
  { package: "diet", error: "ERR! ECONNREFUSED: connection refused by willpower@0.0.1" },
  { package: "exercise", error: "ERR! ENOMEM: cannot allocate energy — all resources consumed by anxiety" },
  { package: "early-bird", error: "ERR! SIGKILL: process killed by snooze-button@9x" },
  { package: "minimalism", error: "ERR! EEXIST: /closet/stuff already contains 9,847 items" },
];
