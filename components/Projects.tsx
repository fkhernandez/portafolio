"use client";

import React from "react";
import { FaLocationArrow } from "react-icons/fa";

const featuredProject = {
  title: "InvoiceMaster",
  description:
    "A streamlined invoicing platform that helps freelancers and small businesses create, send, and track invoices effortlessly.",
  link: "https://invoicemaster.app",
  tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
};

const placeholders = [
  { id: 2, title: "Coming Soon", description: "A new project is on the way. Stay tuned for updates." },
  { id: 3, title: "Coming Soon", description: "Something exciting is in the works." },
  { id: 4, title: "Coming Soon", description: "More projects dropping soon." },
];

const Projects = () => {
  return (
    <section id="projects" className="section-shell pt-24 md:pt-28">
      <p className="text-center text-sm font-medium uppercase tracking-[0.28em] text-purple/80">
        Projects
      </p>
      <h1 className="heading">
        A selection of <span className="text-purple">my work</span>
      </h1>
      <p className="section-copy">
        Products I&apos;ve built from the ground up — focused on clean
        interfaces, reliable performance, and real-world utility.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 lg:gap-8">
        {/* ── Featured: InvoiceMaster ─────────────────────── */}
        <a
          href={featuredProject.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-[1px] transition-all duration-500 hover:border-purple/40 hover:shadow-[0_0_40px_-12px_rgba(203,172,249,0.35)]"
        >
          {/* gradient bg */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#04071d] via-[#0c0e23] to-[#04071d]" />

          {/* shimmer strip on hover */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purple/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative flex flex-1 flex-col p-6 md:p-8">
            {/* tag row */}
            <div className="mb-5 flex flex-wrap gap-2">
              {featuredProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-purple/20 bg-purple/[0.06] px-3 py-1 text-xs font-medium text-purple"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {featuredProject.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-white-100 md:text-base">
              {featuredProject.description}
            </p>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-purple transition-transform duration-300 group-hover:translate-x-1">
              Visit Live Site
              <FaLocationArrow className="text-xs" />
            </div>
          </div>
        </a>

        {/* ── Placeholder cards ───────────────────────────── */}
        {placeholders.map((p) => (
          <div
            key={p.id}
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] p-[1px]"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#04071d] via-[#0c0e23] to-[#04071d] opacity-60" />

            <div className="relative flex flex-1 flex-col items-center justify-center p-6 py-16 text-center md:p-8 md:py-20">
              {/* dashed ring icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-white/10">
                <span className="text-2xl text-white/20">+</span>
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-white/30">
                {p.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-white/20">
                {p.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
