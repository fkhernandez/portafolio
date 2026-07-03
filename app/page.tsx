import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredData";
import { PortfolioPage } from "@/components/PortfolioPage";
import { homePageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData data={homePageJsonLd()} />
      <PortfolioPage />
    </>
  );
}
