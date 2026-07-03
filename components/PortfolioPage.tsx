import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconBrandCSharp,
  IconBrandCloudflare,
  IconBrandDocker,
  IconBrandGit,
  IconBrandJavascript,
  IconBrandKotlin,
  IconBrandLinkedin,
  IconBrandNextjs,
  IconBrandPython,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandThreejs,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandX,
  IconCheck,
  IconMessage,
  IconPhoneCall,
} from "@tabler/icons-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  aboutHighlights,
  contact,
  heroStats,
  processSteps,
  projects,
} from "@/data/portfolio";
import { ProjectPreview } from "@/components/ProjectPreview";

const techStackItems = [
  { name: "Next.js", Icon: IconBrandNextjs, color: "#f4f0e7" },
  { name: "React", Icon: IconBrandReact, color: "#61dafb" },
  { name: "Tailwind", Icon: IconBrandTailwind, color: "#38bdf8" },
  { name: "TypeScript", Icon: IconBrandTypescript, color: "#3178c6" },
  { name: "JavaScript", Icon: IconBrandJavascript, color: "#f7df1e" },
  { name: "Python", Icon: IconBrandPython, color: "#ffd43b" },
  { name: "C#", Icon: IconBrandCSharp, color: "#a179dc" },
  { name: "Kotlin", Icon: IconBrandKotlin, color: "#f18e33" },
  { name: "Docker", Icon: IconBrandDocker, color: "#2496ed" },
  { name: "Cloudflare", Icon: IconBrandCloudflare, color: "#f38020" },
  { name: "Vercel", Icon: IconBrandVercel, color: "#f4f0e7" },
  { name: "Git", Icon: IconBrandGit, color: "#f05032" },
  { name: "Three.js", Icon: IconBrandThreejs, color: "#f4f0e7" },
] as const;

export function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--color-bg)] text-[var(--color-ivory)]">
      <SiteHeader />
      <Hero />
      <TrustBand />
      <ProjectsSection />
      <ProcessSection />
      <HomeCtaSection />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden pt-20">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)]">
            <span>Hi, I&apos;m Frank</span>
            <span className="h-px w-16 bg-[var(--color-sage)]" aria-hidden="true" />
          </div>

          <h1 className="font-display mt-8 max-w-[12ch] text-5xl font-medium leading-[0.98] tracking-normal text-[var(--color-ivory)] sm:text-6xl lg:text-7xl xl:text-[5.8rem]">
            I build digital systems for{" "}
            <span className="text-[var(--color-sage)]">serious growth.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            Full-stack development for business owners who need polished web
            experiences, reliable workflows, and a calm technical partner from
            concept to launch.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#projects" className="primary-button">
              View my work
              <IconArrowUpRight size={17} stroke={1.8} aria-hidden="true" />
            </a>
            <a href="#about" className="text-link">
              About me
              <span aria-hidden="true">/</span>
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[31rem] lg:mr-0">
          <div className="portrait-frame">
            <Image
              src="/frank-hero-sharp.png"
              alt="Frank Hernandez in a dark suit"
              fill
              priority
              sizes="(min-width: 1024px) 31rem, 90vw"
              className="object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(5,6,5,0.84)_100%)]" />
          </div>

          <div className="metric-card absolute bottom-7 right-4 sm:right-7">
            <span className="font-display text-5xl leading-none text-[var(--color-sage)]">12+</span>
            <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-ivory)]">
              Years of experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  return (
    <section className="tech-band border-y border-white/[0.06]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Technologies I use
        </p>
        <div
          className="tech-marquee"
          aria-label="Next.js, React, Tailwind, TypeScript, JavaScript, Python, C sharp, Kotlin, Docker, Cloudflare, Vercel, Git, and Three.js"
        >
          <div className="tech-marquee-track" aria-hidden="true">
            {[...techStackItems, ...techStackItems].map(({ name, Icon, color }, index) => (
              <span
                key={`${name}-${index}`}
                className="tech-chip"
                style={{ "--tech-color": color } as CSSProperties}
              >
                <Icon size={22} stroke={1.85} aria-hidden="true" />
                <span>{name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section-block section-anchor">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.62fr_1.38fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionKicker>Selected projects</SectionKicker>
          <h2 className="section-title mt-5">Building solutions that make an impact.</h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[var(--color-muted)]">
            A focused sample of shipped work across product platforms, service
            businesses, and conversion-oriented sites.
          </p>
          <Link href="/inquiry" className="secondary-button mt-10">
            Discuss a project
            <IconArrowUpRight size={17} stroke={1.8} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <ProjectPreview project={project} />
              <div className="project-card-body">
                <p className="text-[0.67rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-sage)]">
                  {project.projectType}
                </p>
                <h3 className="font-display mt-3 text-3xl font-medium text-[var(--color-ivory)]">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.scope.map((item) => (
                    <span key={item} className="scope-pill">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="project-card-actions">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link"
                    aria-label={`Visit ${project.title} live site, opens in a new tab`}
                  >
                    Visit site
                    <IconArrowUpRight size={15} stroke={1.8} aria-hidden="true" />
                  </a>
                  <Link href={`/projects/${project.slug}`} className="card-link muted">
                    View case study
                    <IconArrowUpRight size={15} stroke={1.8} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="about" className="section-block section-anchor">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionKicker>About the approach</SectionKicker>
          <h2 className="section-title mt-5">Quiet process. Precise execution.</h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
            The work is intentionally structured before code begins. That keeps
            the final product aligned with the offer, the audience, and the
            deployment realities.
          </p>

          <div className="mt-8 grid gap-3">
            {aboutHighlights.map((item) => (
              <div key={item} className="proof-row compact">
                <span className="proof-check">
                  <IconCheck size={16} stroke={2} aria-hidden="true" />
                </span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="stat-tile">
                <span className="font-display text-4xl text-[var(--color-sage)]">{stat.value}</span>
                <span className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {processSteps.map((step) => (
            <article key={step.phase} className="grid gap-5 py-7 sm:grid-cols-[5rem_1fr]">
              <span className="font-display text-3xl text-[var(--color-sage)]">{step.phase}</span>
              <div>
                <h3 className="font-display text-2xl font-medium text-[var(--color-ivory)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCtaSection() {
  const socialLinks = [
    { label: "LinkedIn", href: contact.linkedin, Icon: IconBrandLinkedin, external: true },
    { label: "Message", href: contact.smsHref, Icon: IconMessage, external: false },
    { label: "Call", href: contact.phoneHref, Icon: IconPhoneCall, external: false },
    { label: "X", href: contact.x, Icon: IconBrandX, external: true },
  ];

  return (
    <section id="contact" className="section-block section-anchor border-t border-white/[0.06]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionKicker>Start a project</SectionKicker>
          <h2 className="section-title mt-5">Let&apos;s build the version clients expect to find.</h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
            Send the project type, phone number, and business goal through the inquiry page.
          </p>
        </div>

        <div className="home-cta-actions" style={{ flexWrap: "nowrap" }}>
          <div className="social-icon-row" aria-label="Social links">
            {socialLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                className="social-icon-button"
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                aria-label={external ? `${label}, opens in a new tab` : `${label} Frank`}
              >
                <Icon size={18} stroke={1.7} aria-hidden="true" />
              </a>
            ))}
          </div>

          <Link href="/inquiry" className="contact-cta-button">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-sage)]" aria-hidden="true" />
            Contact
            <IconArrowUpRight size={15} stroke={1.8} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-sage)]">
      <span className="h-2 w-2 rounded-full bg-[var(--color-sage)]/30" aria-hidden="true" />
      {children}
    </p>
  );
}
