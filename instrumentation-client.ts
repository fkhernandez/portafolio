import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://5f31b9ea3bd00e3d9e29995a692fbd46@o4507810386083840.ingest.us.sentry.io/4507829086912512",
  tracesSampleRate: 1,
  debug: false,
  replaysOnErrorSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.feedbackIntegration({
      colorScheme: "system",
    }),
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;