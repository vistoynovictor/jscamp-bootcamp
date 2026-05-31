# JSCamp Bootcamp — Agent Guide

This repo is a collection of **independent bootcamp exercises** (11 numbered directories). Each is standalone — there is no root workspace, no root `package.json`, no CI.

**Currently working on: `11-ejercicio-sql`** (Express 4 + Zod 3 + SQLite + TypeScript).

## Setup

- Each subdirectory manages its own dependencies. Install per-directory.
- Most use `npm`. **`11-ejercicio-sql` uses `pnpm`** exclusively (`pnpm-lock.yaml`, `pnpm-workspace.yaml`).
- `11-ejercicio-sql` requires pnpm for native builds (`better-sqlite3`, `esbuild`).

## Key per-directory commands

| Directory | Tech | Relevant commands |
|---|---|---|
| `03-*`, `04-*` | React + Vite + SWC | `npm run dev`, `npm run build`, `npm run lint` |
| `05-*` | Node CLI | `node cli.js` |
| `06-*` | Node HTTP server | `npm start` (alias: `node server.js`) |
| `07-*`, `08-*` | Express 5 + Zod 4 | `node app.js` (no dev script) |
| `08-*` | also tests | Uses **`node:test`** / `node:assert` (not Jest) |
| `09-*` | Playwright E2E | `npx playwright test` |
| `10-*` | TypeScript (no tsconfig) | No scripts — run with `tsx` or `node` |
| `11-*` | Express 4 + Zod 3 + SQLite | `pnpm dev` (tsx watch), `pnpm start`, `pnpm typecheck`, `pnpm build` |

## Version quirks

- Express **5** in `07-*`, `08-*` — Express **4** in `11-*`
- Zod **4** in `07-*`, `08-*` — Zod **3** in `11-*`

## Testing

- `08-*`: `node:test` / `node:assert` — run with `node --test app.test.js`
- `09-*`: Playwright — config at `playwright.config.js`, tests in `tests/`

## Conventions

- Each exercise from `02-*` onward has `feedback.md` (instructor feedback) and `dudas.md` (student questions) — metadata, not code.
- No Prettier, no EditorConfig, no pre-commit hooks.
- `01-*` and `02-*` are static files (no `package.json`).
- `11-*` has a pre-existing `jobs.db` SQLite database.
