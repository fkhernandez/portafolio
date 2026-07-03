import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.frank-hernandez.com",
          },
        ],
        destination: "https://frank-hernandez.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || "miheemin",
  project: process.env.SENTRY_PROJECT || "javascript-nextjs",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: Boolean(process.env.CI && process.env.SENTRY_AUTH_TOKEN),
  hideSourceMaps: true,
});
