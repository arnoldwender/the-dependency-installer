# agents.md — AI Agent Instructions

## Project Context

This is **The Dependency Installer**, a humorous React + TypeScript web app that simulates running `npm install` with satirical "life packages." It is a client-side-only application with no backend.

## For AI Agents Working on This Codebase

### Quick Start

```bash
npm install
npm run dev        # Dev server on localhost:5173
npm run build      # Verify production build
npm run lint       # Check linting
npm run typecheck  # Check types
```

### Before Making Changes

1. Run `npm run typecheck` and `npm run lint` to establish baseline
2. Understand the install flow: idle → installing → done (managed by `useInstaller` hook)
3. All visual theming uses Tailwind + custom CSS in `src/index.css`

### Key Files to Understand

| File | Role |
|------|------|
| `src/hooks/useInstaller.ts` | Core logic — install phases, animation timing, package selection |
| `src/data/packages.ts` | Package definitions (`LifePackage` interface) and suggestion list |
| `src/data/messages.ts` | Terminal log messages displayed during installation |
| `src/App.tsx` | Root component composing all UI sections |
| `src/index.css` | Custom animations: scanlines, vignette, glitch effects |
| `tailwind.config.js` | Custom theme: terminal green `#00ff41`, mono font stack |

### Adding New Packages

To add a new parody package, add an entry to `LIFE_PACKAGES` in `src/data/packages.ts`:

```ts
{ name: "package-name", version: "1.0.0", size: "42MB", deps: 10, vulnerabilities: 5 }
```

Optionally add to `SUGGESTIONS` array to show it as a quick-select button.

### Adding New Log Messages

Add entries to the arrays in `src/data/messages.ts`. Messages appear sequentially during the install simulation.

### Common Pitfalls

- The `@supabase/supabase-js` dependency is unused — do not attempt to integrate it
- The `package.json` name field is `the-dependency-installer` — keep it consistent
- No testing framework is configured — if adding tests, use Vitest (already compatible with Vite)
- All animations are CSS-based in `index.css` — no JS animation libraries needed

### Validation Checklist

After changes, verify:
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] App renders correctly at `localhost:5173`
- [ ] Install flow works: type a package → watch logs → see summary → reset
