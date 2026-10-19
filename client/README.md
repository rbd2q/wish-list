# Wish List client

The client uses Next.js 16 (App Router), React 19, and Tailwind CSS 4.
Run workspace commands from the repository root with Node.js 22.13 or newer and pnpm 8.15.9.

```bash
pnpm install --frozen-lockfile
pnpm --filter client dev
pnpm --filter client typecheck
pnpm --filter client lint
pnpm --filter client build
pnpm --filter client start
```

The API runs separately with `pnpm run server` on port 8000 and requires access to the configured MongoDB instance.

## TypeScript 7 and tooling compatibility

`@typescript/native` aliases TypeScript 7.0.2 and provides the `tsc` executable.
`pnpm --filter client exec tsc --version` verifies the compiler version.
The build script runs TypeScript 7 before building Next.js, including generated route types.

The `typescript` dependency aliases `@typescript/typescript6` to provide the compiler API still required by typescript-eslint and Next.js tooling. This compatibility package provides `tsc6`, so it does not replace TypeScript 7's `tsc` executable. Next.js also runs its own type check using this API.

This setup follows [Microsoft's side-by-side migration guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).

ESLint uses `eslint.config.mjs`; `next lint` was removed in Next.js 16. The legacy Airbnb configuration was removed because it requires ESLint 7 or 8. Import sorting uses simple-import-sort because eslint-plugin-import's ordering rule still uses an API removed in ESLint 10.

Screen components live in `src/_pages` so Next.js does not interpret them as Pages Router routes.

## Remaining dependency limitations

The latest react-laag release still declares React 16–18 support. Some plugins bundled with eslint-config-next still declare ESLint 9 as their maximum supported version. These cause peer dependency warnings during installation.
