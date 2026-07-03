import type { Metadata } from "next";
import {
  IconArrowUpRight,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconMessage,
  IconPhone,
  IconPhoneCall,
} from "@tabler/icons-react";
import { ProjectInquiryForm } from "@/components/ProjectInquiryForm";
import { StructuredData } from "@/components/StructuredData";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { contact } from "@/data/portfolio";
import { contactPageJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Project Inquiry",
  description:
    "Contact Frank Hernandez about a business website, platform, dashboard, portal, invoicing system, or ongoing technical support.",
  alternates: {
    canonical: "/inquiry",
  },
  openGraph: {
    title: "Project Inquiry | Frank Hernandez",
    description:
      "Contact Frank Hernandez about a business website, platform, dashboard, portal, invoicing system, or ongoing technical support.",
    url: "/inquiry",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Contact Frank Hernandez for full-stack development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Inquiry | Frank Hernandez",
    description:
      "Contact Frank Hernandez about a business website, platform, dashboard, portal, invoicing system, or ongoing technical support.",
    images: [siteConfig.ogImage],
  },
};

export default function InquiryPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const directPhoneActions = [
    {
      label: "Message Frank",
      href: contact.smsHref,
      Icon: IconMessage,
    },
    {
      label: "Call Frank",
      href: contact.phoneHref,
      Icon: IconPhoneCall,
    },
  ];
  const contactMethods = [
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      Icon: IconMail,
    },
    {
      label: "LinkedIn",
      value: "Frank Hernandez",
      href: contact.linkedin,
      Icon: IconBrandLinkedin,
    },
    {
      label: "X",
      value: "@07Balmy",
      href: contact.x,
      Icon: IconBrandX,
    },
    ...(whatsappNumber
      ? [
          {
            label: "Phone",
            value: "WhatsApp",
            href: `https://wa.me/${whatsappNumber}`,
            Icon: IconPhone,
          },
        ]
      : []),
  ];

  return (
    <>
      <StructuredData data={contactPageJsonLd()} />
      <main className="min-h-screen overflow-x-clip bg-[var(--color-bg)] text-[var(--color-ivory)]">
        <SiteHeader />

        <section className="section-block pt-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="contact-panel inquiry-panel">
            <div>
              <p className="detail-label">Project inquiry</p>
              <h1 className="font-display mt-5 text-5xl font-medium leading-[1.02] tracking-normal text-[var(--color-ivory)] sm:text-6xl">
                Tell me what needs to work better.
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
                Share the project type, budget, phone number, and the business outcome you want the
                work to support.
              </p>

              <div className="contact-quick-actions" aria-label="Direct phone actions">
                {directPhoneActions.map(({ label, href, Icon }) => (
                  <a key={label} href={href} className="contact-action-button" aria-label={label}>
                    <Icon size={19} stroke={1.75} aria-hidden="true" />
                  </a>
                ))}
              </div>

              <div className="contact-methods-list">
                {contactMethods.map(({ label, value, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="contact-link"
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <span className="icon-box">
                      <Icon size={20} stroke={1.7} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                        {label}
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-[var(--color-ivory)]">
                        {value}
                      </span>
                    </span>
                    <IconArrowUpRight
                      className="ml-auto text-[var(--color-sage)]"
                      size={17}
                      stroke={1.8}
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>

            <ProjectInquiryForm />
          </div>
        </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
