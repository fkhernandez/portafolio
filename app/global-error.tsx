"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-[#050605] px-6 text-[#f4f0e7]">
          <section className="max-w-lg border border-white/10 bg-white/[0.035] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9eb28e]">
              Application error
            </p>
            <h1 className="mt-4 text-3xl font-semibold">Something went wrong.</h1>
            <p className="mt-4 text-sm leading-7 text-[#b8b3aa]">
              The issue has been captured. Try loading the page again.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 rounded-full border border-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
