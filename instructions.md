# instructions.md — Development Instructions

## Overview

**The Dependency Installer** (aka "NPM Install Life") is a satirical React web app that simulates running `npm install` with humorous life-themed packages. It's built with React 18, TypeScript, Vite, and Tailwind CSS.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Development

### Scripts

- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Serve production build locally
- `npm run lint` — Run ESLint
- `npm run typecheck` — Run TypeScript compiler checks

### Project Structure

```
src/
├── components/     # React components (one per file)
├── data/           # Static data (packages, messages)
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── App.tsx         # Root component
├── index.css       # Global styles + animations
└── main.tsx        # Entry point
```

### How the App Works

1. **Idle state**: User sees a welcome message and input bar with suggestion buttons
2. **Installing state**: User types or selects a package name and hits install. The `useInstaller` hook:
   - Selects random packages from `LIFE_PACKAGES`
   - Plays through log messages from `messages.ts` with timed delays
   - Shows a progress bar advancing to 100%
3. **Done state**: Displays installed packages, total counts, vulnerability summary, and a reset button

### Styling

- Tailwind CSS for layout and utilities
- Custom theme in `tailwind.config.js`: terminal green (`#00ff41`), mono font stack
- Custom CSS animations in `index.css`: scanlines, vignette overlay, glitch text effect
- All styling follows a retro terminal / cyberpunk aesthetic

### Adding Content

**New packages**: Add to `LIFE_PACKAGES` array in `src/data/packages.ts`  
**New suggestions**: Add to `SUGGESTIONS` array in `src/data/packages.ts`  
**New log messages**: Add to arrays in `src/data/messages.ts`

### Code Style

- TypeScript strict mode — no implicit `any`
- Named exports for components, hooks, and utilities
- Default export only for `App.tsx`
- Functional components with hooks
- Tailwind classes preferred over custom CSS
