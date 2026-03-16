import { FaLocationArrow } from "react-icons/fa"
import BorderButton from "./ui/BorderButton"
import { Spotlight } from "./ui/Spotlight"
import { TextGenerateEffect } from "./ui/TextGenerateEffect"


const Hero = () => {
  return (
        <section id="home" className="relative flex w-full min-h-[calc(100svh-2rem)] items-center justify-center overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32">
                <div aria-hidden="true">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center dark:bg-black-100 dark:bg-grid-white/[0.03]">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" 
            />
        </div>

        <div className="relative z-10 mx-auto flex w-full justify-center">
            <div className="flex max-w-[92vw] flex-col items-center justify-center md:max-w-3xl lg:max-w-4xl">
                <p className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-[0.68rem] uppercase tracking-[0.32em] text-blue-100 backdrop-blur-sm">
                    SOFTWARE ENGINEER
                </p>

                <TextGenerateEffect 
                    className="mt-5 text-center text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl"
                    words="Shipping fast, polished web products."
                />

                <p className="mt-4 text-center text-base leading-relaxed text-white-100 md:max-w-2xl md:text-lg">
                    Hi, I&apos;m Frank. I turn ideas into performant, production-ready interfaces.
                </p>

                <a href="#about" className="mt-5">
                    <BorderButton 
                        title="My Work"
                        icon={<FaLocationArrow />}
                        position="right"
                        otherClases="gap-2 bg-slate-950/90 text-sm font-semibold text-white"

                    />
                </a>

            </div>

        </div>
    </section>
  )
}

export default Hero