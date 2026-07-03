# Portfolio Redesign Implementation Plan

## Objective

Rebuild the local portfolio as a premium, trust-forward personal site for affluent clients and business owners. The visual target is the supplied dark editorial reference: black layered backgrounds, refined serif display type, muted sage accents, low-noise motion, strong whitespace, clear project proof, and direct contact paths.

## Design Direction

- Positioning: senior full-stack partner who builds polished business systems and high-converting digital experiences.
- Visual language: dark graphite, soft ivory, muted sage, fine borders, editorial typography, restrained glow, photographic/visual proof.
- Layout: first viewport must clearly show the FH brand, navigation, luxury-style hero message, proof metrics, and contact CTA.
- Content hierarchy: hero, trust strip, selected projects, services, process, testimonials, contact.
- Interaction model: smooth anchor navigation, hover states, accessible focus states, no distracting effects.
- Mobile behavior: compact header, stacked hero, horizontal proof density removed in favor of readable sections.

## Work Sequence

1. Planning and audit
   - Confirm current app stack and available package versions from npm.
   - Add planning docs before app code changes.
   - Use sub-agent audits for current structure and migration/deployment risks.

2. Dependency modernization
   - Move to current stable Next.js and React patch releases.
   - Migrate Tailwind to the current major release only if build and lint remain stable.
   - Keep production dependencies limited to what the site actually uses.

3. App architecture reset
   - Replace the existing scattered portfolio sections with a cohesive single-page App Router implementation.
   - Keep the page mostly static for fast SSG output.
   - Use Server Components by default; only add Client Components for required interactivity.
   - Consolidate portfolio content into typed data objects.

4. Visual build
   - Implement a fixed luxury header, editorial hero, trust band, selected project cards, service grid, operating process, testimonials, and contact close.
   - Use `next/image` for visual assets.
   - Avoid nested cards, marketing-heavy hero copy, large decorative blobs, and one-note purple/blue styling.

5. Error and deployment readiness
   - Keep `app/global-error.tsx` working.
   - Add a polished `app/not-found.tsx`.
   - Update metadata for SEO/social defaults.
   - Verify Vercel-friendly build settings and Sentry config behavior.

6. Verification
   - Run `npm install` after dependency edits.
   - Run `npm run lint`.
   - Run `npm run typecheck`.
   - Run `npm run build`.
   - Start `npm run dev` and verify in browser with screenshot, console/error overlay checks, and key element checks.

## Implementation Ownership

- Main agent: source rewrite, dependency updates, integration, and final verification.
- Explorer agent 1: app/content/assets audit only.
- Explorer agent 2: dependency and deployment risk audit only.

## Acceptance Criteria

- The site visually matches the supplied reference direction without copying the screenshot as a static page.
- The portfolio feels credible for high-budget clients: clear expertise, proof, process, and contact path.
- No placeholder tutorial/project content remains.
- Mobile and desktop layouts are polished and readable.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- Dev server browser verification confirms the page renders, has meaningful content, and has no framework error overlay.
