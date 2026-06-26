# template-electron-react

[![Version](https://img.shields.io/badge/version-0.16.0-blue)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A524-brightgreen)](package.json)

A template for building cross-platform desktop applications with **Electron**, **React 19**, and **TypeScript 6** — powered by Vite for fast HMR and electron-builder for packaging.

> **Template usage:** after creating your project from this template, search for `template-electron-react` and replace all occurrences with your application name.

## Tech Stack

| Layer             | Technology                                                                            |
| ----------------- | ------------------------------------------------------------------------------------- |
| Desktop framework | [Electron](https://www.electronjs.org/) 42                                            |
| UI library        | [React](https://react.dev/) 19                                                        |
| Language          | [TypeScript](https://www.typescriptlang.org/) 6                                       |
| Build tool        | [electron-vite](https://electron-vite.org/) 5 (Vite-based)                            |
| Packaging         | [electron-builder](https://www.electron.build/) 26                                    |
| Package manager   | [pnpm](https://pnpm.io/) 10                                                           |
| Testing           | [Jest](https://jestjs.io/) 30 + [Testing Library](https://testing-library.com/)       |
| Linting           | [ESLint](https://eslint.org/) 9 (flat config) + [Stylelint](https://stylelint.io/) 16 |
| Formatting        | [Prettier](https://prettier.io/) 3                                                    |

## Prerequisites

- **Node.js** ≥ 24
- **pnpm** — the exact version is pinned in the `packageManager` field of `package.json`

If you have [Corepack](https://nodejs.org/api/corepack.html) enabled, it will automatically use the correct pnpm version:

```sh
corepack enable pnpm
```

## Quick Start

```sh
# Clone (or use this template on GitHub)
git clone https://github.com/yifanwww/template-electron-react.git my-app
cd my-app

# Install dependencies
pnpm install

# Start development (with HMR)
pnpm run dev
```

## Project Structure

```
template-electron-react/
├── src/
│   ├── main/                  # Electron main process
│   │   ├── index.ts           #   App entry point & lifecycle
│   │   ├── window/            #   BrowserWindow management
│   │   ├── apis/              #   IPC handler implementations
│   │   ├── configuration/     #   App settings (electron-store)
│   │   ├── utils/             #   Main-process utilities
│   │   ├── logger.ts          #   Winston logger
│   │   └── appInfo.ts         #   App metadata
│   ├── preload/               # Preload scripts (context bridge)
│   │   ├── index.ts           #   Exposes __API_APP & __API_LOGGER
│   │   └── args.ts            #   CLI argument forwarding
│   ├── renderer/              # React UI (renderer process)
│   │   ├── index.html         #   HTML entry point
│   │   ├── index.tsx          #   React entry point
│   │   ├── app.tsx            #   Root component & routing
│   │   ├── MainWindow/        #   Main window UI
│   │   ├── apis/              #   Renderer-side API wrappers
│   │   ├── assets/            #   Static assets
│   │   ├── types/             #   Renderer-specific types
│   │   └── utils/             #   Renderer utilities
│   └── shared/                # Code shared across processes
│       ├── apis/              #   API interface contracts
│       ├── types/             #   Shared type definitions
│       └── utils/             #   Shared utility functions
├── configs/
│   ├── eslint/                # ESLint rule sets
│   ├── jest/                  # Jest configurations
│   └── tsconfigs/             # TypeScript base config
├── resources/                 # Static resources bundled with the app
├── scripts/                   # Build & utility scripts
├── build/                     # Compiled output (generated)
├── release/                   # Packaged installers (generated)
├── electron.vite.config.mts   # electron-vite configuration
├── electron-builder.json      # electron-builder configuration
├── eslint.config.mjs          # ESLint flat config
├── tsconfig.json              # TypeScript configuration
└── package.json
```

## Architecture

This template follows Electron's **secure multi-process architecture**:

```
┌───────────────────────────────────────────┐
│                Main Process               │
│  (Node.js — app lifecycle, window mgmt,   │
│   IPC handlers, file system, logging)     │
│                                           │
│  src/main/index.ts                        │
│         │                                 │
│         │  ipcMain.handle()               │
│         ▼                                 │
│  ┌───────────────┐                        │
│  │  Preload      │  contextBridge         │
│  │  Script       │  exposes:              │
│  │               │  • window.__API_APP    │
│  │  src/preload/ │  • window.__API_LOGGER │
│  └──────┬────────┘                        │
│         │                                 │
│         │  ipcRenderer.invoke()           │
│         ▼                                 │
│  ┌──────────────────────────────────┐     │
│  │        Renderer Process          │     │
│  │  (Chromium — React 19, React     │     │
│  │   Router, CSS Modules, SCSS)     │     │
│  │                                  │     │
│  │  src/renderer/                   │     │
│  └──────────────────────────────────┘     │
└───────────────────────────────────────────┘
```

- **Main process** — Node.js runtime; manages windows, handles IPC, accesses the file system, and runs background tasks.
- **Preload script** — a secure bridge that exposes a minimal, curated API to the renderer via `contextBridge`. The renderer has **no direct access** to Node.js or Electron APIs.
- **Renderer process** — a standard browser environment running React. Communicates with the main process through the preload-exposed APIs.

## Path Aliases

The following import aliases are configured in `tsconfig.json` and `electron.vite.config.mts`:

| Alias         | Maps to          |
| ------------- | ---------------- |
| `@main/*`     | `src/main/*`     |
| `@preload/*`  | `src/preload/*`  |
| `@renderer/*` | `src/renderer/*` |
| `@shared/*`   | `src/shared/*`   |

```ts
// Instead of:
import { MainWindow } from '../../../MainWindow';

// Use:
import { MainWindow } from '@renderer/MainWindow';
```

## Available Scripts

| Command                     | Description                                            |
| --------------------------- | ------------------------------------------------------ |
| `pnpm run dev`              | Start development mode with hot reload (HMR)           |
| `pnpm run build`            | Build production bundles for all processes             |
| `pnpm run preview`          | Preview the built app without rebuilding               |
| `pnpm run gen-installer`    | Generate Windows installer (.exe) via electron-builder |
| `pnpm run typecheck`        | Run TypeScript type checking on all sources            |
| `pnpm run typecheck:src`    | Type-check `src/` only                                 |
| `pnpm run typecheck:config` | Type-check config files only                           |
| `pnpm run lint`             | Lint without auto-fix (for CI/CD)                      |
| `pnpm run lint-fix`         | Lint and auto-fix (ESLint + Stylelint)                 |
| `pnpm run lint:eslint`      | Run ESLint only                                        |
| `pnpm run lint:stylelint`   | Run Stylelint only (CSS/SCSS)                          |
| `pnpm run format`           | Format all code with Prettier                          |
| `pnpm run test`             | Run all tests (jsdom + node)                           |
| `pnpm run test:jsdom`       | Run renderer tests (jsdom environment)                 |
| `pnpm run test:node`        | Run main & shared tests (node environment)             |
| `pnpm run clean`            | Remove all build artifacts and caches                  |
| `pnpm run clean:build`      | Remove `build/` and `release/`                         |
| `pnpm run clean:dev`        | Remove `coverage/` and Vite cache                      |
| `pnpm run run-bundled`      | Run the bundled Electron app directly with Node        |

## Testing

This project uses **Jest 30** with **@swc/jest** for fast TypeScript/JSX transformation. Tests are split into two environments:

### Renderer Tests (`pnpm run test:jsdom`)

- **Environment:** [`jsdom`](https://github.com/jsdom/jsdom) (browser simulation)
- **Location:** `src/renderer/**/*.{spec,test}.{ts,tsx}`
- **Libraries:** `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`
- CSS modules are mocked via `identity-obj-proxy`

### Main & Shared Tests (`pnpm run test:node`)

- **Environment:** Node.js
- **Location:** `src/main/**/*.{spec,test}.ts`, `src/shared/**/*.{spec,test}.ts`

> **Note:** Jest is imported from `@jest/globals` (not global). See the [jest-module-mocking skill](.agents/skills/jest-module-mocking/SKILL.md) for guidance on mocking modules.

## Linting & Formatting

| Tool             | Scope                 | Config                                              |
| ---------------- | --------------------- | --------------------------------------------------- |
| **ESLint 9**     | `.ts`, `.tsx`         | `eslint.config.mjs` (flat config)                   |
| **Stylelint 16** | `.css`, `.scss`       | Standard + SCSS + Sass guidelines + recess order    |
| **Prettier 3**   | All supported formats | Integrated with ESLint via `eslint-plugin-prettier` |

- **Pre-commit hooks:** [husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) run linters on staged files automatically.
- Use `pnpm run lint` in CI pipelines (report-only, no fix).
- Use `pnpm run lint-fix` for local development (auto-fixes where possible).

## Building & Packaging

```sh
# Production build
pnpm run build

# Generate Windows installer (NSIS .exe)
pnpm run gen-installer
```

- Build output: `build/` (three bundles: main, preload, renderer)
- Installer output: `release/` (`.exe`, `.blockmap`, `latest.yml`)
- **ASAR** packing is enabled; files in `resources/**/*` are unpacked.
- macOS DMG target is also configured in `electron-builder.json`.

See [`electron-builder.json`](electron-builder.json) for full packaging configuration.

## Using This Template

After creating your project from this template, follow this checklist:

1. **Rename the app** — search for `template-electron-react` across the entire project and replace with your app name. Key files to update:
   - `package.json` — `name`, `description`, `homepage`, `repository`, `bugs`, `author`
   - `electron-builder.json` — `appId`, `productName`
   - `README.md` — title and description
2. **Update the app icon** — replace the icon file referenced in `electron-builder.json` (currently commented out).
3. **Update the license** — modify `LICENSE` with your name and year.
4. **Review `src/main/appInfo.ts`** — update app metadata as needed.
5. **Start building!** — `pnpm install && pnpm run dev`

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md) for version history and release notes.

## License

This project is licensed under the [MIT License](LICENSE).
