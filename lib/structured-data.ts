import { contact, projects, services, type Project } from "@/data/portfolio";
import { absoluteUrl, siteConfig } from "@/lib/seo";

const knowsAbout = [
  "Full-stack web development",
  "Next.js",
  "React",
  "TypeScript",
  "Business websites",
  "Admin dashboards",
  "Client portals",
  "Workflow systems",
  "Cloudflare deployments",
];

function breadcrumb(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function serviceOffers() {
  return services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      serviceType: service.title,
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
    },
  }));
}

export function rootJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: siteConfig.name,
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.image),
        jobTitle: "Full-Stack Developer",
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        sameAs: siteConfig.sameAs,
        knowsAbout,
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": absoluteUrl("/#business"),
        name: "Frank Hernandez Full-Stack Development",
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.image),
        description: siteConfig.shortDescription,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        founder: {
          "@id": absoluteUrl("/#person"),
        },
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        priceRange: "Custom project pricing",
        makesOffer: serviceOffers(),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: "Frank Hernandez Portfolio",
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: {
          "@id": absoluteUrl("/#person"),
        },
      },
    ],
  };
}

export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl("/#webpage"),
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        about: {
          "@id": absoluteUrl("/#person"),
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.image),
        },
        inLanguage: siteConfig.language,
      },
      {
        "@type": "ItemList",
        "@id": absoluteUrl("/#selected-projects"),
        name: "Selected full-stack development projects",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/projects/${project.slug}`),
          name: project.title,
          description: project.description,
        })),
      },
    ],
  };
}

export function servicesPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl("/services#webpage"),
        url: absoluteUrl("/services"),
        name: "Full-Stack Web Development Services | Frank Hernandez",
        description:
          "Premium full-stack development services for business websites, dashboards, portals, workflow systems, and ongoing technical support.",
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        inLanguage: siteConfig.language,
      },
      {
        "@type": "ItemList",
        "@id": absoluteUrl("/services#services"),
        name: "Full-stack development services",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: {
              "@id": absoluteUrl("/#person"),
            },
          },
        })),
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
    ],
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": absoluteUrl("/inquiry#webpage"),
        url: absoluteUrl("/inquiry"),
        name: "Project Inquiry | Frank Hernandez",
        description:
          "Contact Frank Hernandez about a business website, full-stack platform, dashboard, portal, invoicing system, or ongoing technical support.",
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        mainEntity: {
          "@id": absoluteUrl("/#person"),
        },
        inLanguage: siteConfig.language,
      },
      {
        "@type": "ContactPoint",
        contactType: "Project inquiries",
        email: contact.email,
        telephone: contact.phone,
        url: absoluteUrl("/inquiry"),
        availableLanguage: ["English", "Spanish"],
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Project Inquiry", path: "/inquiry" },
      ]),
    ],
  };
}

export function projectPageJsonLd(project: Project) {
  const projectPath = `/projects/${project.slug}`;
  const image = project.previewImages[0]?.src ?? siteConfig.image;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": absoluteUrl(`${projectPath}#creative-work`),
        url: absoluteUrl(projectPath),
        name: `${project.title} case study`,
        headline: `${project.title} full-stack development case study`,
        description: project.description,
        image: absoluteUrl(image),
        creator: {
          "@id": absoluteUrl("/#person"),
        },
        about: project.scope,
        keywords: project.techStack.join(", "),
        inLanguage: siteConfig.language,
      },
      {
        "@type": "WebPage",
        "@id": absoluteUrl(`${projectPath}#webpage`),
        url: absoluteUrl(projectPath),
        name: `${project.title} | Frank Hernandez`,
        description: project.description,
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(image),
        },
        inLanguage: siteConfig.language,
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/#projects" },
        { name: project.title, path: projectPath },
      ]),
    ],
  };
}
