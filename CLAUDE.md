# CLAUDE.md — Instructions for Claude Code

## Project Overview

**The Dependency Installer** is a satirical React web app simulating `npm install` with humorous "life packages." It uses a retro terminal aesthetic with glitch effects.

## Tech Stack

- React 18 + TypeScript
- Vite 5 (dev server and bundler)
- Tailwind CSS 3 with custom terminal theme
- Lucide React for icons

## Key Commands

```bash
npm run dev        # Start dev server (localhost:5173)
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check (tsconfig.app.json)
```

## Architecture

- **State management**: `useInstaller` hook manages install phases (idle → installing → done)
- **Data layer**: Static data in `src/data/` — packages.ts defines parody packages, messages.ts defines log output
- **Components**: All in `src/components/`, each is a single-responsibility presentational component
- **Styling**: Tailwind utilities + custom CSS in `index.css` for scanline/glitch animations. Terminal green is `#00ff41`

## Development Guidelines

- Use TypeScript strict mode — no `any` types
- Keep components small and focused
- Use Tailwind classes; avoid inline styles
- The app is client-side only — no backend, no API calls
- `@supabase/supabase-js` is an unused dependency from the original template — it is not used anywhere in the codebase
- Custom font stack: SF Mono, Fira Code, Cascadia Code, JetBrains Mono, monospace

## File Conventions

- Components: PascalCase `.tsx` files in `src/components/`
- Hooks: camelCase with `use` prefix in `src/hooks/`
- Data/utils: camelCase `.ts` files in `src/data/` and `src/utils/`
- All exports use named exports except `App.tsx` which uses default export
