# The Dependency Installer

A satirical web application that simulates the experience of running `npm install` — complete with absurd package sizes, fictional vulnerabilities, and the existential dread of managing JavaScript dependencies.

## What Is This?

**NPM Install Life** is an interactive, retro-terminal-themed simulator where users "install" parody npm packages representing life concepts like `monday-morning` (847MB, 12 vulnerabilities), `motivation` (0KB — can't find it), and `adulting` (infinite GB, 99 vulnerabilities).

Type a package name (or pick a suggestion), watch the realistic install logs scroll by, and receive a summary of just how many vulnerabilities your life has.

## Features

- Retro green-on-black terminal UI with scanline and glitch effects
- Simulated npm install output with progress bars and realistic log messages
- 15+ parody "life packages" with humorous metadata
- Suggestion buttons for quick installs
- Installation summary with vulnerability counts and audit messages

## Tech Stack

- **React 18** with TypeScript
- **Vite** for development and builds
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Available Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start development server             |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview production build locally     |
| `npm run lint`    | Run ESLint                           |
| `npm run typecheck` | Run TypeScript type checking       |

## Project Structure

```
src/
├── components/
│   ├── Footer.tsx          # Disclaimer footer
│   ├── Header.tsx          # Glitchy title with version info
│   ├── IdleState.tsx       # Welcome message when idle
│   ├── InputBar.tsx        # Package input + suggestion buttons
│   ├── InstallSummary.tsx  # Post-install stats and reset
│   ├── PackageList.tsx     # Installed packages display
│   └── TerminalLog.tsx     # Simulated terminal output
├── data/
│   ├── messages.ts         # npm install log messages
│   └── packages.ts         # Parody package definitions
├── hooks/
│   └── useInstaller.ts     # Core install simulation logic
├── utils/
│   └── glitch.ts           # Text corruption effect utility
├── App.tsx                 # Root component
├── index.css               # Tailwind + custom animations
└── main.tsx                # Entry point
```

## License

This project is for entertainment purposes only. No actual packages are installed, harmed, or deprecated in the making of this application.
