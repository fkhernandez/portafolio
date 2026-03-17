"use client"

import Image from "next/image";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./BackgroundGradientAnimation";
import { GlobeDemo } from "./GridGlobe";
import BorderButton from "./BorderButton";
import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import {WavyBackground} from "./Lamp";
//import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-5 md:auto-rows-[19rem] md:grid-cols-3 lg:auto-rows-[20rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {

  //const [copied, setCopied] = useState(false)

  // const handleCopy = () => {
  //   navigator.clipboard.writeText("frankjaim@icloud.com")
  //   setCopied(true)
  //   setTimeout(() => {
  //     setCopied(false)
  //   }, 1000)
  // }

  return (
    <div
      className={cn(
        "surface-panel group/bento relative row-span-1 flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/[0.1] transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_30px_80px_-45px_rgba(76,92,163,0.8)]",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(4,7,29,0.96) 0%, rgba(12,14,35,0.98) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(203,172,249,0.16),transparent_32%)] opacity-70" />

      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <Image
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
              width={500}
              height={500}
            />
          )}
        </div>
        <div className={`absolute right-0 -bottom-5 ${id === 5 ? 'w-full opacity-80' : ''}`}>
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              className={cn("object-cover object-center w-full h-full")}
              width={500}
              height={500}
            />
          )}
        </div>
        {id === 6 && (
         <BackgroundGradientAnimation>
          <div className="absolute z-50 flex items-center justify-center text-white font-bold"></div>
         </BackgroundGradientAnimation> 
        )}

        <div
          className={cn(
            titleClassName,
            "relative flex min-h-40 flex-col px-5 py-6 transition duration-200 group-hover/bento:translate-x-1 md:h-full lg:p-8"
          )}
        >
          <div 
            className="z-10 max-w-40 text-xs font-medium uppercase tracking-[0.24em] text-white-200 md:text-[0.7rem]"
          >
            {description}
          </div>
          <div
            className="z-10 mt-3 max-w-[22rem] text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl lg:text-3xl"
          >
            {title}
          </div>
        

        {id === 2 && <GlobeDemo />}

        {id === 1 && (
          <div className="absolute w-full h-full translate-x-[-5.5%] lg:translate-y-[-15%] md:translate-y-[-60%] sm:translate-y-[-50%] ">
            < WavyBackground />

          </div>
        )}

        {id === 3 && (

          <div className="absolute right-2 top-8 flex w-fit gap-2 lg:right-6 lg:gap-4">
            <div className="flex flex-col gap-3 lg:gap-5">
              {['React.JS', 'Next.JS', 'TypeScript'].map
              ((item) => (
                <span key={item} className="rounded-full border border-white/5 bg-[#10132E]/90 px-3 py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/65 lg:px-4">
                  {item}
                </span>
              ))}
              <span className="rounded-full bg-[#10132E]/80 px-4 py-4"/>
            </div>
            <div className="flex flex-col gap-3 lg:gap-5">
              <span className="rounded-full bg-[#10132E]/80 px-4 py-4"/>
              {['PostgreSQL', 'Tailwind', 'MongoDB'].map
              ((item) => (
                <span key={item} className="rounded-full border border-white/5 bg-[#10132E]/90 px-3 py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/65 lg:px-4">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {id === 6 && (
          <div className="relative mt-6">
            <a href={`mailto:${process.env.MY_EMAIL ?? "frankjaim@icloud.com"}`}>
              <BorderButton
                  title="Let's get in touch&nbsp;"
                  icon={<FaLocationArrow />}
                  position="right"
                  otherClases="gap-2 bg-slate-950/90 text-sm font-semibold text-white"
              />
            </a>
          </div>
        )}
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
      </div>
    </div>
    </div>
  );
};

