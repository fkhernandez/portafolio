

import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import  Approach  from "@/components/Approach";
import Footer from "@/components/Footer";
import { FaHome } from "react-icons/fa";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={[
          { name: "", link: "#home", icon: <FaHome/>},
          { name: "About", link: "#about" },
          { name: "Testimonials", link: "#testimonials" },
          { name: "Contact", link: "#contact" },
        ]} />
        <Hero />
        <Grid />
        {/* <RecentProjects /> */}
        <Clients />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
}
