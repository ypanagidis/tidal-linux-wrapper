# AGENTS

## High-value commands
- Install: `pnpm install` (Node >=22, pnpm >=9; pinned at `pnpm@9.12.3`).
- Default dev loop (desktop product): `pnpm dev` (runs `@repo/core-app` + `@repo/desktop`).
- Web-only apps: `pnpm dev:marketing`, `pnpm dev:docs`.
- Canonical verification: `pnpm check` (runs `lint -> typecheck -> format:check` in that order).

## Workspace boundaries (do not blur)
- `apps/desktop`: Electron main/preload only; owns native access + IPC.
- `apps/core`: product renderer loaded by Electron (TanStack Start).
- `apps/marketing`: deployable marketing site.
- `apps/docs`: deployable docs site (Fumadocs on TanStack Start).
- Shared runtime contracts/types live in `packages/*` (`@repo/desktop-bridge`, `@repo/api`, `@repo/core`, `@repo/validators`, `@repo/ui`, `@repo/tooling`).

## Critical wiring facts
- Desktop loads renderer via URL from `APP_URL` (default `APP_DEV_URL` from `packages/tooling/src/index.ts`, currently port 3000).
- Renderer must not import Electron directly; use `window.desktop` via `apps/core/src/lib/desktop.ts` + `@repo/desktop-bridge`.
- IPC handlers are in `apps/desktop/src/main.ts`; preload exposure is in `apps/desktop/src/preload.ts`.
- Smoke-test route for bridge wiring: `apps/core/src/routes/electron.tsx` (`/electron`).

## Build/codegen quirks that are easy to miss
- TanStack route trees are generated; do not hand-edit `apps/*/src/routeTree.gen.ts`.
- `@repo/core-app` and `@repo/marketing` require `routes:generate` before build/typecheck (already scripted).
- `@repo/docs` requires `fumadocs-mdx` codegen (`docs:source`) before routes/typecheck/build (already scripted).
- Docs build uses Nitro Vercel preset (`apps/docs/vite.config.ts`) and emits `.vercel/output`.

## Electron packaging/dev quirk
- `apps/desktop` uses `tsup` with `noExternal` for `@repo/desktop-bridge` and `@repo/tooling` (`apps/desktop/tsup.config.ts`).
- Keep that bundling behavior; removing it causes Electron runtime to try loading raw workspace TypeScript and fail.

## Lint/format/typecheck conventions
- Lint is root-wide `oxlint .` (`pnpm lint` delegates to `pnpm lint:repo`), not per-package turbo lint.
- Formatter is `oxfmt`; run `pnpm format` / `pnpm format:check`.
- Typecheck uses `tsgo` in packages/apps; prefer scoped checks while iterating, e.g.:
  - `pnpm --filter @repo/desktop typecheck`
  - `pnpm --filter @repo/core-app typecheck`
  - `pnpm --filter @repo/docs typecheck`

## React data-fetching rule
- Do not use `useEffect` for data fetching in renderer apps.
- Use TanStack Query `useQuery` / `useMutation` for server state and async data flows.
- Never introduce `useEffect`-based data fetching unless the user explicitly asks for it in the current thread.

## Generated/ignored artifacts
- Generated: `apps/*/src/routeTree.gen.ts`, `apps/docs/.source`.
- Build artifacts: `dist`, `.output`, `.turbo`, `.vercel/output`.

<!-- effect-solutions:start -->
## Effect Best Practices

**IMPORTANT:** Always consult effect-solutions before writing Effect code.

1. Run `effect-solutions list` to see available guides
2. Run `effect-solutions show <topic>...` for relevant patterns (supports multiple topics)
3. Search `~/.local/share/effect-solutions/effect` for real implementations

Topics: quick-start, project-setup, tsconfig, basics, services-and-layers, data-modeling, error-handling, config, testing, cli.

Never guess at Effect patterns - check the guide first.
<!-- effect-solutions:end -->

<!-- intent-skills:start -->
# Skill mappings - when working in these areas, load the linked skill file into context.
skills:
  - task: "building or refactoring TanStack Start routes in core/marketing"
    load: "apps/core/node_modules/@tanstack/react-start/skills/react-start/SKILL.md"
  - task: "adding or changing tRPC routers, procedures, and context"
    load: "apps/core/node_modules/@trpc/server/skills/server-setup/SKILL.md"
  - task: "implementing TanStack Start server route handlers for APIs"
    load: "apps/core/node_modules/@trpc/server/skills/adapter-fetch/SKILL.md"
  - task: "wiring tRPC client with TanStack Query in renderer apps"
    load: "apps/core/node_modules/@trpc/tanstack-react-query/skills/react-query-setup/SKILL.md"
  - task: "working on docs deployment/runtime behavior with Nitro"
    load: "apps/docs/node_modules/nitro/skills/nitro/SKILL.md"
<!-- intent-skills:end -->
