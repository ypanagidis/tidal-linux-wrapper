# Tidal Wrapper Monorepo

Desktop-first TypeScript workspace with independent web surfaces:

- `apps/desktop`: Electron shell (main + preload)
- `apps/core`: core product app rendered inside Electron
- `apps/marketing`: deployable marketing website
- `apps/docs`: deployable docs website powered by Fumadocs on TanStack Start

Shared packages in `packages/*` keep contracts and logic centralized:

- `@repo/validators` for Zod schemas
- `@repo/core` for Effect domain services
- `@repo/api` for tRPC router/contracts
- `@repo/ui` for shared UI primitives
- `@repo/desktop-bridge` for preload API contracts

## Development

```bash
pnpm install
pnpm dev
```

Scoped workflows:

```bash
pnpm dev:core
pnpm dev:desktop
pnpm dev:marketing
pnpm dev:docs
```

## Quality checks

```bash
pnpm check
```

Includes:

- `oxlint`
- `tsgo` typecheck
- `oxfmt --check`

## Build targets

```bash
pnpm --filter @repo/core-app build
pnpm --filter @repo/desktop build
pnpm --filter @repo/marketing build
pnpm --filter @repo/docs build
```

## Security model

- Renderer never imports Node APIs directly.
- Electron preload exposes a typed bridge only.
- Electron main keeps privileged logic isolated.
