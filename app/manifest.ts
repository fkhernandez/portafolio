import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Frank Hernandez Full-Stack Development",
    short_name: "Frank Hernandez",
    description: siteConfig.shortDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050605",
    theme_color: "#9eb28e",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
