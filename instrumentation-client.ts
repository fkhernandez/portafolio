import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn:
    process.env.NEXT_PUBLIC_SENTRY_DSN ||
    "https://5f31b9ea3bd00e3d9e29995a692fbd46@o4507810386083840.ingest.us.sentry.io/4507829086912512",
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
