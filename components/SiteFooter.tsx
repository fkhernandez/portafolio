import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] px-5 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 text-sm text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>Frank Hernandez. Full-stack development and premium web systems.</p>
        <Link href="/#home" className="transition hover:text-[var(--color-ivory)]">
          Back to top
        </Link>
      </div>
    </footer>
  );
}
