import type { Metadata } from "next";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconChartBar,
  IconCode,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react";
import { StructuredData } from "@/components/StructuredData";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { carePlans, services } from "@/data/portfolio";
import { servicesPageJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Full-Stack Web Development Services",
  description:
    "Premium full-stack development services for business websites, platforms, dashboards, portals, workflow systems, and ongoing technical support.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Full-Stack Web Development Services | Frank Hernandez",
    description:
      "Premium full-stack development services for business websites, platforms, dashboards, portals, workflow systems, and ongoing technical support.",
    url: "/services",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Frank Hernandez full-stack development services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Web Development Services | Frank Hernandez",
    description:
      "Premium full-stack development services for business websites, platforms, dashboards, portals, workflow systems, and ongoing technical support.",
    images: [siteConfig.ogImage],
  },
};

const serviceIcons = {
  spark: IconSparkles,
  code: IconCode,
  chart: IconChartBar,
  shield: IconShieldCheck,
} as const;

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={servicesPageJsonLd()} />
      <main className="min-h-screen overflow-x-clip bg-[var(--color-bg)] text-[var(--color-ivory)]">
        <SiteHeader />

        <section className="section-block pt-32">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="detail-label">Services</p>
            <h1 className="font-display mt-5 max-w-4xl text-5xl font-medium leading-[1.02] tracking-normal text-[var(--color-ivory)] sm:text-6xl lg:text-7xl">
              Digital systems for serious business needs.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[var(--color-muted)]">
              Websites, platforms, portals, dashboards, and customer paths shaped around the
              business outcome first.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];

              return (
                <article key={service.title} className="service-card">
                  <div className="icon-box">
                    <Icon size={22} stroke={1.6} aria-hidden="true" />
                  </div>
                  <h2 className="font-display mt-7 text-2xl font-medium text-[var(--color-ivory)]">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                    {service.description}
                  </p>
                  <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
                    {service.fit}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
        </section>

        <section className="section-block border-y border-white/[0.06] bg-white/[0.018]">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="detail-label">Ongoing support</p>
            <h2 className="section-title mt-5">A steady path after launch.</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
              Monthly support is discussed after the project shape is clear, so the plan matches
              the actual business need.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {carePlans.map((plan) => (
              <article key={plan.title} className="care-plan-card">
                <div>
                  <p className="detail-label">{plan.availability}</p>
                  <h3 className="font-display mt-4 text-3xl font-medium text-[var(--color-ivory)]">
                    {plan.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                    {plan.description}
                  </p>
                </div>

                <Link href="/inquiry" className="secondary-button mt-8 w-full">
                  {plan.cta}
                  <IconArrowUpRight size={17} stroke={1.8} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
        </section>

        <section className="section-block">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="detail-label">Project inquiry</p>
            <h2 className="section-title mt-5">Bring the business goal first.</h2>
          </div>
          <Link href="/inquiry" className="primary-button w-fit">
            Start the inquiry
            <IconArrowUpRight size={17} stroke={1.8} aria-hidden="true" />
          </Link>
        </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
