/* Lockfile conflict simulator data — fake merge conflict scenarios */

export interface LockfileConflict {
  branchA: string;
  branchB: string;
  filename: string;
  /* Lines before the conflict marker */
  contextBefore: string[];
  /* "Ours" side of the conflict */
  ours: string[];
  /* "Theirs" side of the conflict */
  theirs: string[];
  /* Lines after the conflict marker */
  contextAfter: string[];
}

export const LOCKFILE_CONFLICTS: LockfileConflict[] = [
  {
    branchA: "feature/add-meaning-to-life",
    branchB: "main",
    filename: "package-lock.json",
    contextBefore: [
      '    "node_modules/existential-dread": {',
      '      "version": "∞.0.0",',
      '      "resolved": "https://registry.npmjs.org/existential-dread/-/existential-dread-∞.0.0.tgz",',
      '      "integrity": "sha512-AAAA+meaningless/hash/that/goes/on/forever==",'
    ],
    ours: [
      '      "dependencies": {',
      '        "purpose": "^1.0.0",',
      '        "meaning": "^2.0.0",',
      '        "inner-peace": ">=0.0.1"',
      '      }',
    ],
    theirs: [
      '      "dependencies": {',
      '        "anxiety": "^∞.0.0",',
      '        "doom-scrolling": "latest",',
      '        "3am-thoughts": ">=666.0.0"',
      '      }',
    ],
    contextAfter: [
      '    },',
      '    "node_modules/coffee-dependency": {',
      '      "version": "6.6.6",',
      '      "resolved": "https://registry.npmjs.org/coffee/-/coffee-6.6.6.tgz",',
    ],
  },
  {
    branchA: "fix/stop-overthinking",
    branchB: "develop",
    filename: "package-lock.json",
    contextBefore: [
      '    "node_modules/self-confidence": {',
      '      "version": "0.1.0-beta",',
      '      "resolved": "https://registry.npmjs.org/self-confidence/-/self-confidence-0.1.0-beta.tgz",',
    ],
    ours: [
      '      "requires": {',
      '        "positive-self-talk": "^1.0.0",',
      '        "therapy": ">=2.0.0",',
      '        "touch-grass": "daily"',
      '      }',
    ],
    theirs: [
      '      "requires": {',
      '        "impostor-syndrome": "^∞.0.0",',
      '        "comparison-to-others": "constant",',
      '        "linkedin-stalking": ">=5x/day"',
      '      }',
    ],
    contextAfter: [
      '    },',
      '    "node_modules/procrastination": {',
      '      "version": "∞.∞.∞",',
    ],
  },
];

/* Resolve options shown to the user */
export interface ResolveOption {
  label: string;
  description: string;
  outcome: string;
}

export const RESOLVE_OPTIONS: ResolveOption[] = [
  {
    label: "Accept mine",
    description: "delete node_modules",
    outcome: "Accepted yours. rm -rf node_modules... 847GB freed. Reinstalling... 47 minutes remaining. Your mass of dependencies has been preserved. Disk space has not.",
  },
  {
    label: "Accept theirs",
    description: "probably fine",
    outcome: "Accepted theirs. Your ambitions have been replaced with anxiety@latest. 14 new vulnerabilities found. This is fine. Everything is fine. The CI pipeline disagrees.",
  },
  {
    label: "Become a farmer",
    description: "touch grass --literally",
    outcome: "Conflict abandoned. Generating resume for organic-farming@sustainable... Skills: npm install (transferable), git blame (useful for crop rotation). The chickens don't have merge conflicts.",
  },
];

/* Simulated lockfile lines for the scrolling background effect */
export function generateFakeLockfileLines(count: number): string[] {
  const packages = [
    "existential-dread", "motivation", "coffee-dependency", "sleep-schedule",
    "work-life-balance", "impostor-syndrome", "procrastination", "adulting",
    "happiness", "therapy", "patience", "self-care", "boundaries", "free-time",
    "savings-account", "gym-membership", "cooking-skills", "social-battery",
    "attention-span", "inner-peace", "rubber-duck", "documentation", "vim-exit",
  ];

  const lines: string[] = [];
  for (let i = 0; i < count; i++) {
    const pkg = packages[Math.floor(Math.random() * packages.length)];
    const version = `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 100)}`;
    const hash = Array.from({ length: 40 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");

    /* Alternate between different lockfile line patterns */
    const pattern = i % 6;
    switch (pattern) {
      case 0:
        lines.push(`    "node_modules/${pkg}": {`);
        break;
      case 1:
        lines.push(`      "version": "${version}",`);
        break;
      case 2:
        lines.push(`      "resolved": "https://registry.npmjs.org/${pkg}/-/${pkg}-${version}.tgz",`);
        break;
      case 3:
        lines.push(`      "integrity": "sha512-${hash.slice(0, 32)}==",`);
        break;
      case 4:
        lines.push(`      "requires": {`);
        break;
      case 5:
        lines.push(`    },`);
        break;
    }
  }
  return lines;
}
