import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050605] px-6 text-[#f4f0e7]">
      <section className="max-w-lg border border-white/10 bg-white/[0.035] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9eb28e]">
          404
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium">Page not found.</h1>
        <p className="mt-4 text-sm leading-7 text-[#b8b3aa]">
          The page you requested does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full border border-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em]"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
