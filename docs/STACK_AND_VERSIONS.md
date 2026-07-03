# Stack and Version Plan

Version check source: `npm view` on June 25, 2026.

## Target Stack

| Area | Target | Reason |
| --- | --- | --- |
| Framework | Next.js 16.2.9 | Current stable App Router release with modern Turbopack and React 19 support. |
| UI runtime | React 19.2.7 / React DOM 19.2.7 | Current stable React patch line. |
| Language | TypeScript 6.0.3 | Current stable TypeScript release. |
| Styling | Tailwind CSS 4.3.1 with `@tailwindcss/postcss` 4.3.1 | Current Tailwind major with CSS-first theming and modern PostCSS integration. |
| Linting | ESLint 9.39.4 with `eslint-config-next` 16.2.9 | Latest compatible ESLint major for Next's current nested lint plugins. |
| Icons | `@tabler/icons-react` | Already installed, lightweight enough for refined UI controls. |
| Monitoring | `@sentry/nextjs` 10.61.0 | Keep existing monitoring integration on the latest patch. |
| Rendering | Next.js App Router, mostly static Server Components | Best fit for a portfolio: fast, secure, low runtime complexity. |
| Deployment | Vercel | Native Next.js deployment path with image/font optimization. |

## Implementation Principles

- Prefer static content and Server Components for performance and a small client bundle.
- Use `next/font` for zero-layout-shift typography.
- Use `next/image` for every raster/SVG visual used in the UI.
- Keep the homepage as the primary experience instead of a landing-page shell.
- Use CSS variables for the premium palette and Tailwind utilities for layout.
- Keep motion subtle and avoid large animation dependencies unless needed.

## Tailwind 4 Migration Notes

- Replace the old `tailwindcss` PostCSS plugin with `@tailwindcss/postcss`.
- Move design tokens into CSS using `@theme` where practical.
- Avoid relying on Tailwind 3 internal utilities such as `tailwindcss/lib/util/flattenColorPalette`.
- Remove custom utility plugins if the redesigned site no longer needs grid/dot generated backgrounds.
- Use explicit CSS for custom backgrounds that must be stable across Tailwind major versions.

## Next.js 16 Notes

- Keep App Router conventions under `app/`.
- Keep Client Components limited to places with state, browser APIs, or event handlers.
- Do not initialize service clients at module scope if future APIs are added.
- Keep `next.config.mjs` small and avoid deprecated experimental configuration where possible.
- Use `next build` as the deployment gate.

## Dependency Policy

- Use stable `latest` releases from npm, not canary releases.
- Avoid adding design-system libraries unless they solve an immediate problem.
- Remove unused heavy UI components only when they are no longer imported.
- Keep Sentry config, but make uploads CI-aware so local builds do not fail because of missing auth.
