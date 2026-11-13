# the-dependency-installer — contributor notes

## Project

- Humour web app by Arnold Wender (React 18 + Vite + Tailwind + Framer Motion). Public repository; the licence in
  `LICENSE` is deliberate.
- Live: <https://the-dependency-installer.netlify.app>. The Netlify site builds from `main` on GitHub (`npm run build`
  → `dist/`): a merge deploys. Static files that must be served (legal pages, `llms.txt`) live in `public/`; Vite
  copies only that directory into `dist/`.

## Rules

- **No third-party requests.** Nothing is fetched from npm: the registry URLs in `src/data/` are display text. Only
  system fonts.
- **Legal pages** are static files: `public/impressum/index.html` and `public/datenschutz/index.html`, linked from
  `src/components/Footer.tsx` (readable on purpose). If you add a feature that stores data in the browser or contacts
  a third party, update the Datenschutzerklärung in the same change.
- `localStorage` (`tdi-local-installs`, `tdi-achievements`) is written only after a user action, never on page load —
  no `useEffect` that persists state on mount.
