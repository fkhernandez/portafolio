"use client";

import React from "react";
import { FaLocationArrow } from "react-icons/fa";

const liveProjects = [
  {
    title: "InvoiceMaster",
    description:
      "A streamlined invoicing platform that helps freelancers and small businesses create, send, and track invoices effortlessly.",
    link: "https://invoicemaster.app",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
  },
  {
    title: "Rainforest 21 Automotive",
    description:
      "Service pages, trust cues, and contact paths are organized around the way local automotive customers compare shops.",
    link: "https://rainforest21automotive.com",
    tags: ["Automotive", "Website", "Responsive"],
  },
  {
    title: "East Coast Collision",
    description:
      "Collision repair details are surfaced quickly, with a straightforward layout for estimates, services, and shop information.",
    link: "https://east-coast-collision.frank-account-5ee.workers.dev",
    tags: ["Collision Repair", "Website", "Cloudflare"],
  },
  {
    title: "Mares Flowers",
    description:
      "Fresh floral arrangements and event services get a warm storefront that makes browsing and reaching out feel simple.",
    link: "https://maresflowers.com",
    tags: ["Florist", "Website", "Local Business"],
  },
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
        {liveProjects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-[1px] transition-all duration-500 hover:border-purple/40 hover:shadow-[0_0_40px_-12px_rgba(203,172,249,0.35)]"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#04071d] via-[#0c0e23] to-[#04071d]" />

            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purple/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex flex-1 flex-col p-6 md:p-8">
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-purple/20 bg-purple/[0.06] px-3 py-1 text-xs font-medium text-purple"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-white-100 md:text-base">
                {project.description}
              </p>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-purple transition-transform duration-300 group-hover:translate-x-1">
                Visit Live Site
                <FaLocationArrow className="text-xs" />
              </div>
            </div>
          </a>
        ))}

      </div>
    </section>
  );
};

export default Projects;
