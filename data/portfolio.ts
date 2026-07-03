export const navigationItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/inquiry" },
] as const;

export const trustMarks = [
  "InvoiceAI",
  "Rainforest 21",
  "East Coast Collision",
  "Mares Flowers",
] as const;

export const heroStats = [
  { value: "12+", label: "years building" },
  { value: "37", label: "live client projects" },
  { value: "100%", label: "custom delivery" },
] as const;

export const projects = [
  {
    slug: "invoice-ai",
    title: "InvoiceAI",
    category: "Financial operations platform",
    projectType: "Full-stack invoicing system",
    description:
      "A focused invoicing platform for creating, sending, and tracking client invoices with less operational drag.",
    href: "https://invoicemaster.app",
    previewImages: [
      {
        src: "/projects/invoiceai-dashboard.jpg",
        alt: "InvoiceAI cash flow dashboard with paid and pending invoice charting",
      },
    ],
    scope: ["Invoice creation", "Payment tracking", "Client records"],
    facts: [
      { label: "Type", value: "Full-stack invoicing system" },
      { label: "Build", value: "Invoice/payment workflow" },
      { label: "Value", value: "Billing clarity" },
    ],
    features: [
      "Invoice drafting and organization",
      "Client and billing workflow structure",
      "Payment status tracking",
    ],
    buildNotes: "Structured for invoices, routing, account workflows, and a clean operational dashboard.",
    result:
      "Gives service providers a more reliable way to manage billing without losing context across clients and payments.",
    overview:
      "InvoiceAI is designed as a business operations product, not just a billing page. The structure supports invoices, clients, payment states, and workflow clarity from one place.",
    problem:
      "Small teams often manage billing across spreadsheets, email threads, and disconnected payment notes, which makes follow-up and organization harder than it needs to be.",
    solution:
      "The platform organizes invoice creation, payment tracking, and client billing details into a focused full-stack system that can grow with more account and payment features.",
    businessValue:
      "The business value is operational clarity: faster invoice handling, clearer payment status, and less time spent reconstructing client billing history.",
    techStack: ["Next.js", "React", "TypeScript", "Full-stack routing", "Operational UI"],
    designNotes:
      "The interface direction favors clear tables, focused actions, and dashboard-style hierarchy so billing work feels direct and accountable.",
    outcome:
      "A structured invoicing product foundation ready for deeper payment, client, and reporting workflows.",
    variant: "ledger",
  },
  {
    slug: "rainforest-21",
    title: "Rainforest 21 Automotive",
    category: "Local service website",
    projectType: "Automotive business website",
    description:
      "A service-first web presence designed around trust, clear shop information, and fast contact paths.",
    href: "https://rainforest21automotive.com",
    previewImages: [
      {
        src: "/projects/rainforest21-dark.jpg",
        alt: "Rainforest 21 Automotive dark hero page for mechanic services in Las Vegas",
      },
      {
        src: "/projects/rainforest21-light.jpg",
        alt: "Rainforest 21 Automotive light hero page for mechanic services in Las Vegas",
      },
    ],
    scope: ["Service clarity", "Trust signals", "Contact paths"],
    facts: [
      { label: "Type", value: "Automotive business website" },
      { label: "Build", value: "Service-led web presence" },
      { label: "Value", value: "Faster customer contact" },
    ],
    features: [
      "Mobile-first service presentation",
      "Clear contact and location flow",
      "Credibility-focused page structure",
    ],
    buildNotes: "Built around a fast local-service journey from service research to contact.",
    result:
      "Helps visitors understand the shop quickly and move toward a call, visit, or service conversation.",
    overview:
      "Rainforest 21 Automotive presents the business in a direct, credible way for local drivers comparing service options.",
    problem:
      "Automotive customers need to know what a shop does, whether it feels trustworthy, and how to contact it without digging through clutter.",
    solution:
      "The website keeps the service offer, contact information, and business credibility easy to scan across desktop and mobile.",
    businessValue:
      "A clearer first impression reduces friction for new customers and supports more confident calls or visits.",
    techStack: ["Responsive frontend", "Service pages", "SEO-ready structure", "Mobile polish"],
    designNotes:
      "The layout uses practical hierarchy, plain service language, and direct calls to action for a local automotive audience.",
    outcome:
      "A stronger local web presence built around trust, clarity, and simple conversion paths.",
    variant: "service",
  },
  {
    slug: "east-coast-collision",
    title: "East Coast Collision",
    category: "Repair business site",
    projectType: "Collision repair lead-flow site",
    description:
      "A streamlined collision repair site that makes estimates, services, and shop credibility easier to evaluate.",
    href: "https://east-coast-collision.frank-account-5ee.workers.dev",
    previewImages: [
      {
        src: "/projects/east-coast-collision-home.jpg",
        alt: "East Coast Collision homepage with repair estimate call to action",
      },
    ],
    scope: ["Estimate flow", "Repair services", "Cloudflare deploy"],
    facts: [
      { label: "Type", value: "Collision repair lead-flow site" },
      { label: "Build", value: "Estimate request structure" },
      { label: "Value", value: "Mobile-first lead flow" },
    ],
    features: [
      "Estimate-oriented visitor path",
      "Repair service organization",
      "Mobile-ready credibility sections",
    ],
    buildNotes: "Structured and deployed for fast access, clear services, and simple lead capture paths.",
    result:
      "Makes it easier for repair customers to understand the shop and start an estimate conversation.",
    overview:
      "East Coast Collision focuses on the decision points a repair customer cares about before requesting help.",
    problem:
      "Collision repair customers are often stressed and need service confidence, estimate clarity, and a simple way to take the next step.",
    solution:
      "The site organizes services, credibility details, and lead paths so visitors can quickly move from evaluation to inquiry.",
    businessValue:
      "The site supports higher-quality estimate requests and reduces confusion for mobile visitors.",
    techStack: ["Cloudflare Workers", "Responsive frontend", "Lead-flow structure", "Performance-minded deploy"],
    designNotes:
      "The page structure is practical and service-forward, with room for before-and-after proof as assets become available.",
    outcome:
      "A deployment-ready repair business site shaped around trust, mobile usability, and estimate conversion.",
    variant: "dashboard",
  },
  {
    slug: "mares-flowers",
    title: "Mares Flowers",
    category: "Boutique commerce",
    projectType: "Floral business presence",
    description:
      "A warm, direct storefront for floral arrangements and event services, built to make inquiry friction low.",
    href: "https://maresflowers.com",
    previewImages: [
      {
        src: "/projects/mares-flowers-home.jpg",
        alt: "Mares Flowers storefront page with floral category cards for roses, carnations, daisies, tulips, hydrangeas, and lilies",
      },
    ],
    scope: ["Product presentation", "Event inquiries", "Mobile polish"],
    facts: [
      { label: "Type", value: "Floral business presence" },
      { label: "Build", value: "Boutique inquiry path" },
      { label: "Value", value: "Warmer customer conversion" },
    ],
    features: [
      "Warm product and service positioning",
      "Inquiry-friendly content structure",
      "Mobile-first presentation",
    ],
    buildNotes: "Designed to balance boutique warmth with a simple path toward customer inquiry.",
    result:
      "Gives the business a more polished presence for everyday orders, events, and customer trust.",
    overview:
      "Mares Flowers is shaped around a boutique customer experience where visual warmth and easy inquiry matter.",
    problem:
      "Floral customers need to quickly understand style, occasion fit, and how to ask about arrangements or events.",
    solution:
      "The site keeps the business presentation warm, simple, and conversion-focused while leaving room for richer product photography.",
    businessValue:
      "A clearer web presence helps the business look current and makes event or arrangement inquiries easier to start.",
    techStack: ["Responsive frontend", "Brand presence", "Catalog-ready structure", "Mobile polish"],
    designNotes:
      "The visual structure keeps attention on products, occasions, and inquiry paths without making the experience feel generic.",
    outcome:
      "A boutique business presence ready to support flowers, events, and customer conversion.",
    variant: "boutique",
  },
] as const;

export const services = [
  {
    title: "Premium Web Presence",
    description:
      "High-trust websites for businesses that need to look serious, current, and ready for better clients.",
    fit: "For brand credibility, service clarity, and stronger first impressions.",
    icon: "spark",
  },
  {
    title: "Business Platforms",
    description:
      "Custom portals, dashboards, invoicing tools, booking flows, and internal systems for real operations.",
    fit: "For teams ready to replace scattered manual work with a focused system.",
    icon: "code",
  },
  {
    title: "Conversion Systems",
    description:
      "Clear inquiry, quote, booking, and service flows that help serious visitors take the next step.",
    fit: "For businesses that want fewer dead ends and better customer paths.",
    icon: "chart",
  },
  {
    title: "Technical Stewardship",
    description:
      "Ongoing technical support for launched sites and systems that need steady ownership after delivery.",
    fit: "For clients who want the work kept current without turning it into a public checklist.",
    icon: "shield",
  },
] as const;

export const carePlans = [
  {
    title: "Launch Care",
    description: "A calm support path for small business sites after launch.",
    availability: "Available after project launch",
    cta: "Ask about care plans",
  },
  {
    title: "Growth Support",
    description: "Monthly support for businesses that expect regular improvements.",
    availability: "Custom monthly support based on scope",
    cta: "Discuss monthly support",
  },
  {
    title: "Technical Partner",
    description: "Longer-term support for businesses with active systems and ongoing needs.",
    availability: "Custom monthly support based on scope",
    cta: "Discuss monthly support",
  },
] as const;

export const aboutHighlights = [
  "Full-stack web systems for businesses.",
  "Polished interfaces with practical workflow thinking.",
  "Clear scope, mobile polish, and production-ready delivery.",
] as const;

export const processSteps = [
  {
    phase: "01",
    title: "Clarify the outcome",
    description:
      "Define the audience, offer, project shape, and what the business needs the work to accomplish.",
  },
  {
    phase: "02",
    title: "Shape the experience",
    description:
      "Create a clear interface direction around trust, speed, and the actions that matter.",
  },
  {
    phase: "03",
    title: "Build and launch",
    description:
      "Ship a responsive, production-ready site or system with a clean path for future improvements.",
  },
] as const;

export const contact = {
  email: "frankjaim@icloud.com",
  phone: "+1-305-587-5283",
  phoneHref: "tel:+13055875283",
  smsHref: "sms:+13055875283",
  github: "https://github.com/fkhernandez?tab=repositories",
  linkedin: "https://www.linkedin.com/in/frank-hernandez-3564a7365/",
  x: "https://x.com/07Balmy",
} as const;

export const projectTypeOptions = [
  "New business website",
  "Website redesign",
  "Full-stack web app",
  "iOS App",
  "Android App",
  "Admin dashboard",
  "Client portal",
  "Booking system",
  "Invoice/payment system",
  "Maintenance/support",
  "Other",
] as const;

export const budgetOptions = ["Under $1k", "$1k - $5k", "$5k - $15k", "$15k+"] as const;

export type Project = (typeof projects)[number];
export type ProjectSlug = Project["slug"];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
