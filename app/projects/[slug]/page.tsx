import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowUpRight, IconCheck } from "@tabler/icons-react";
import { StructuredData } from "@/components/StructuredData";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ProjectPreview } from "@/components/ProjectPreview";
import { getProjectBySlug, projects } from "@/data/portfolio";
import { projectPageJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const projectPath = `/projects/${project.slug}`;
  const previewImage = project.previewImages[0];

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: projectPath,
    },
    keywords: [
      project.title,
      project.projectType,
      project.category,
      ...project.scope,
      ...project.techStack,
    ],
    openGraph: {
      title: `${project.title} Case Study | Frank Hernandez`,
      description: project.description,
      url: projectPath,
      type: "article",
      images: [
        {
          url: previewImage?.src ?? siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: previewImage?.alt ?? `${project.title} case study by Frank Hernandez`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} Case Study | Frank Hernandez`,
      description: project.description,
      images: [previewImage?.src ?? siteConfig.ogImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <StructuredData data={projectPageJsonLd(project)} />
      <main className="min-h-screen overflow-x-clip bg-[var(--color-bg)] text-[var(--color-ivory)]">
        <SiteHeader />

        <section className="section-block pt-32">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <ProjectKicker>{project.category}</ProjectKicker>
            <h1 className="font-display mt-6 max-w-4xl text-5xl font-medium leading-[1.02] tracking-normal text-[var(--color-ivory)] sm:text-6xl lg:text-7xl">
              {project.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              {project.description}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="primary-button"
                aria-label={`Visit ${project.title} live site, opens in a new tab`}
              >
                Live site
                <IconArrowUpRight size={17} stroke={1.8} aria-hidden="true" />
              </a>
              <Link href="/inquiry" className="secondary-button">
                Discuss a similar project
                <IconArrowUpRight size={17} stroke={1.8} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="project-detail-card">
            <ProjectPreview project={project} sizes="(min-width: 1024px) 36rem, 90vw" />
            <dl className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {project.facts.map((fact) => (
                <ProjectFact key={fact.label} label={fact.label} value={fact.value} />
              ))}
            </dl>
          </aside>
        </div>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.018] py-14">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-3">
          <DetailBlock title="Overview" body={project.overview} />
          <DetailBlock title="Problem" body={project.problem} />
          <DetailBlock title="Solution" body={project.solution} />
        </div>
        </section>

        <section className="section-block">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <ProjectKicker>Main features</ProjectKicker>
            <h2 className="section-title mt-5">Structured around the work clients need done.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {project.features.map((feature) => (
              <article key={feature} className="detail-panel">
                <span className="proof-check">
                  <IconCheck size={17} stroke={2} aria-hidden="true" />
                </span>
                <h3 className="font-display mt-5 text-2xl font-medium text-[var(--color-ivory)]">
                  {feature}
                </h3>
              </article>
            ))}
            <article className="detail-panel md:col-span-2">
              <p className="detail-label">Business value</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {project.businessValue}
              </p>
            </article>
          </div>
        </div>
        </section>

        <section className="section-block border-t border-white/[0.06] bg-white/[0.018]">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-3">
          <DetailBlock title="Tech stack" body={project.techStack.join(", ")} />
          <DetailBlock title="Design/development notes" body={project.designNotes} />
          <DetailBlock title="Final outcome" body={project.outcome} />
        </div>
        </section>

        <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-white/[0.08] pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
            Need a website, platform, dashboard, booking system, invoice/payment system,
            or ongoing technical care plan with this level of structure?
          </p>
          <Link href="/inquiry" className="primary-button">
            Start the conversation
            <IconArrowUpRight size={17} stroke={1.8} aria-hidden="true" />
          </Link>
        </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}

function ProjectFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="detail-label">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-[var(--color-ivory)]">{value}</dd>
    </div>
  );
}

function DetailBlock({ title, body }: { title: string; body: string }) {
  return (
    <article className="detail-panel">
      <p className="detail-label">{title}</p>
      <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{body}</p>
    </article>
  );
}

function ProjectKicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-sage)]">
      <span className="h-2 w-2 rounded-full bg-[var(--color-sage)]/30" aria-hidden="true" />
      {children}
    </p>
  );
}
