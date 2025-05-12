import { icons } from "@tabler/icons-react";
import React from "react";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import  Approach  from "@/components/Approach";
import Image from "next/image";
import { use } from "react";
import Footer from "@/components/Footer";
import { FaHome } from "react-icons/fa";

// export const navItems = [
//     { name: "Home", link: "#home", icon: <FaHome/>},
//     { name: "About", link: "#about" },
//     { name: "Testimonials", link: "#testimonials" },
//     { name: "Contact", link: "#contact" },
//   ];
  
  export const gridItems = [
    {
      id: 1,
      title: "I prioritize client collaboration, fostering open communication ",
      description: "",
      className: "lg:col-span-2 lg:row-span-2 md:col-span-6 md:row-span-1",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "",
      spareImg: "",
    },
    {
      id: 2,
      title: "I'm very flexible with time zone communications",
      description: "",
      className: "lg:col-span-1 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: "My tech stack",
      description: "I constantly try to improve",
      className: "lg:col-span-1 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Tech enthusiast with a passion for development.",
      description: "",
      className: "lg:col-span-1 md:col-span-3 md:row-span-1 ",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/grid.svg",
      spareImg: "/b4.svg",
    },
  
    {
      id: 5,
      title: "Currently building a JS Animation library",
      description: "The Inside Scoop",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/b5.svg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Do you want to start a project together?",
      description: "",
      className: "lg:col-span-1 lg:row-span-1 md:col-span-3 md:row-span-1",// lg:max-h-[20vh]",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];
  
  export const projects = [
    {
      id: 1,
      title: "3D Solar System Planets to Explore",
      des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
      img: "/p1.svg",
      iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
      link: "https://github.com/adrianhajdin?tab=repositories",
    },
    {
      id: 2,
      title: "Yoom - Video Conferencing App",
      des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
      img: "/p2.svg",
      iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
      link: "https://github.com/adrianhajdin/zoom-clone",
    },
    {
      id: 3,
      title: "AI Image SaaS - Canva Application",
      des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
      img: "/p3.svg",
      iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
      link: "https://github.com/adrianhajdin/ai_saas_app",
    },
    {
      id: 4,
      title: "Animated Apple Iphone 3D Website",
      des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
      img: "/p4.svg",
      iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
      link: "https://github.com/adrianhajdin/iphone",
    },
  ];
  
  export const testimonials = [
    {
      quote:
        "Frank’s technical skills and innovative solutions were exactly what we needed. His work helped us streamline our processes and improve overall efficiency. Frank’s ability to solve complex problems quickly and efficiently was a major asset. We’re already seeing the positive impact his work has had on our operations.",
      name: "Francisco H.",
      title: "CTO at QuantumSoft Solutions",
      img: "/visionary4.jpg",
    },
    {
      quote:
        "Frank’s attention to detail and creative approach exceeded our expectations. The website he developed for us has received rave reviews from both clients and industry peers. His ability to incorporate the latest design trends while maintaining our brand identity was impressive. We saw an immediate boost in our online traffic and conversion rates after the launch.",
      name: "Emma Collins",
      title: "Marketing Director at Apex Digital",
      img: "/visionary7.jpg",
    },
    {
      quote:
        "We struck gold with Frank. He crafted a sleek interface that users love, and he even shared tips to keep our system humming. His quick fixes saved us a ton of headaches later. The way he collaborated made him feel like part of the crew.",
      name: "Daniel L.",
      title: "Director of VividPulse Media",
      img: "/visionary1.jpg",
    },
    {
      quote:
        "The platform we got is incredible, thanks to Frank. It launched ahead of schedule, and his code’s so clean it’s a breeze to update. He even caught subtle bugs we didn’t realize were lurking, saving us from potential disasters down the road. His ability to break down the most convoluted technical challenges into manageable steps was nothing short of a lifesaver for our overstretched team. We’re already discussing how to get him back for our next project, because his contribution elevated everything we were trying to achieve.",
      name: "Sarah T.",
      title: "Paralegal",
      img: "/visionary2.jpg"
    },
    {
      quote:
        "Hiring Frank was a no-brainer. The app he built is solid, and he tackled some tough backend problems like it was nothing. Plus, he consistently met every deadline without a single complaint, which is rare in a field where delays are practically expected. His updates were so thorough and crystal-clear that even our non-technical stakeholders could follow along and feel confident in the progress. Honestly, he’s the kind of dependable talent you wish you’d discovered years earlier, because he makes everything run so much smoother.",
      name: "Michael R.",
      title: "Director of AlphaStream Technologies",
      img: "/visionary3.jpg",
    },
    {
      quote:
        "Our project was a mess until Frank stepped in. He turned it around fast, and the client’s thrilled with how smooth everything runs now. His calm under pressure was a godsend, keeping the entire team focused when we were on the verge of falling apart. He even took the time to suggest creative features we hadn’t even dreamed of, which ended up impressing everyone from our designers to the client’s executives. By the end, the polished final product exceeded our wildest expectations, and we owe that leap in quality entirely to his expertise.",
      name: "Priya K.",
      title: "BaseFase Web Developer",
      img: "/visionary.png",
    },
  ];
  
  export const companies = [
    {
      id: 1,
      name: "nextjs",
      img: "/next.svg",
      nameImg: "/nextjsText.svg",
    },
    {
      id: 2,
      name: "appwrite",
      img: "/app.svg",
      nameImg: "/appName.svg",
    },
    {
      id: 3,
      name: "HOSTINGER",
      img: "/host.svg",
      nameImg: "/hostName.svg",
    },
    {
      id: 4,
      name: "stream",
      img: "/s.svg",
      nameImg: "/streamName.svg",
    },
    {
      id: 5,
      name: "docker.",
      img: "/dock.svg",
      nameImg: "/dockerName.svg",
    },
    {
      id: 6,
      name: "tailwind.",
      img: "/tail.svg",
      nameImg: "/dockerName.svg",
    },
  ];
  
  export const workExperience = [
    {
      id: 1,
      title: "Full Stack Development",
      desc: "Expertise in building robust full-stack applications using Next.js, including server-side rendering (SSR), static site generation (SSG), and API routes.",
      className: "md:col-span-2",
      thumbnail: "/exp1.svg",
    },
    {
      id: 2,
      title: "Optimized Build Processes",
      desc: "Led the migration of legacy React projects to Next.js, reducing load times by 30% and improving SEO performance through server-side rendering.",
      className: "md:col-span-2", // change to md:col-span-2
      thumbnail: "/exp2.svg",
    },
    {
      id: 3,
      title: "Team Work",
      desc: "Collaborated closely with UX/UI designers to implement responsive and accessible user interfaces. Integrated Tailwind CSS and Styled Components for clean, maintainable styling that adheres to best practices.",
      className: "md:col-span-2", // change to md:col-span-2
      thumbnail: "/exp3.svg",
    },
    {
      id: 4,
      title: "Lead Frontend Developer",
      desc: "Developed and maintained multiple Next.js web applications, ensuring optimal performance and seamless user experiences.",
      className: "md:col-span-2",
      thumbnail: "/exp4.svg",
    },
  ];
  
  export const socialMedia = [
    {
      id: 1,
      img: "/git.svg",
      link: "https://github.com/fkhernandez?tab=repositories"
    },
    {
      id: 2,
      img: "/twit.svg",
      link: ""
    },
    {
      id: 3,
      img: "/link.svg",
      link: ""
    },
  ];