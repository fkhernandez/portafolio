import { contact } from "@/data/portfolio";

export const siteConfig = {
  name: "Frank Hernandez",
  domain: "frank-hernandez.com",
  url: "https://frank-hernandez.com",
  title: "Frank Hernandez | Full-Stack Developer for Business Websites & Digital Systems",
  description:
    "Frank Hernandez is a full-stack developer building premium business websites, dashboards, portals, workflow systems, invoicing tools, and production-ready digital platforms.",
  shortDescription:
    "Full-stack development for business websites, dashboards, portals, workflow systems, and premium digital platforms.",
  locale: "en_US",
  language: "en-US",
  image: "/frank-hero-sharp.png",
  ogImage: "/og-frank-hernandez.png",
  email: contact.email,
  phone: contact.phone,
  sameAs: [contact.github, contact.linkedin, contact.x],
} as const;

export const siteKeywords = [
  "Frank Hernandez",
  "Frank Hernandez portfolio",
  "full-stack developer",
  "full-stack web developer",
  "business website developer",
  "Next.js developer",
  "React developer",
  "TypeScript developer",
  "custom dashboard developer",
  "client portal developer",
  "business platform developer",
  "web app developer",
  "Cloudflare developer",
  "premium business websites",
  "workflow systems",
] as const;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
