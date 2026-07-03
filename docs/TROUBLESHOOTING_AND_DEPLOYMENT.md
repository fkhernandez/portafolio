# Troubleshooting and Deployment Guide

## Local Development

Recommended local flow:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

If the dev server fails:

- Confirm Node.js is 20.9 or newer.
- Delete `.next` and restart: `rm -rf .next && npm run dev`.
- Reinstall dependencies from the lockfile if package versions changed: `npm ci`.
- Check for TypeScript errors with `npm run typecheck`.
- Check lint with `npm run lint`.

## Verification Commands

Run before deployment:

```bash
npm run lint
npm run typecheck
npm run build
```

If `next build` fails:

- Read the first error, not the last cascade.
- Check imports for deleted components or paths.
- Check Client Component boundaries for event handlers or hooks in Server Components.
- Check Tailwind migration issues in `app/globals.css` and `postcss.config.mjs`.
- Check Sentry upload behavior if CI variables are missing.

## Audit Notes

Current `npm audit --omit=dev` reports a moderate advisory through Next.js bundled PostCSS. As of this implementation, the safe fix is not available through npm audit because `npm audit fix --force` attempts to downgrade Next.js to `9.3.3`, which would break the project. Keep Next.js on the latest stable 16.x line and recheck after new Next.js patches are released.

## Browser Verification

After starting `npm run dev`, verify:

- Home page loads with meaningful content.
- No Next.js error overlay is present.
- Header links navigate to sections.
- Primary contact CTA is visible and usable.
- Desktop and mobile widths do not show text overlap.
- Console does not contain app-breaking errors.

## Deployment Notes

Vercel should auto-detect Next.js. Recommended build settings:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: Next.js default
- Node version: 20.9 or newer

## Sentry Notes

The project already has Sentry files. For local development:

- Builds should not require source map upload credentials.
- Source map upload should run only in CI or when required environment variables are present.
- If deployment fails during Sentry upload, check `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT`.

## Rollback Strategy

- Keep changes in git so the previous deployed commit can be restored.
- If deployment fails after dependency upgrades, first try reverting only dependency/config changes.
- If UI has a layout regression, inspect the responsible section component before broad refactors.

## Known Risk Areas

- Tailwind 4 is a major migration from the current Tailwind 3 setup.
- Existing files include previous uncommitted edits, so avoid destructive git commands.
- Existing placeholder project/testimonial content may undermine trust if not replaced.
- Large visual effects can hurt performance; the redesign should use simpler, controlled visuals.
