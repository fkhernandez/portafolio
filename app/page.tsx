
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import { FaHome } from "react-icons/fa";

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen flex-col items-center justify-center overflow-x-clip bg-black-100">
      <FloatingNav navItems={[
        { name: "", link: "#home", icon: <FaHome /> },
        { name: "Projects", link: "#projects" },
        { name: "Testimonials", link: "#testimonials" },
        { name: "About", link: "#about" },
      ]} />
      <Hero />
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Grid />
        <Projects />
        <Clients />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
}
