"use client"

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./BackgroundGradientAnimation";
import { GlobeDemo } from "./GridGlobe";
import BorderButton from "./BorderButton";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import {BackgroundBeamsWithCollision, LampContainer, LampDemo, WavyBackground} from "./Lamp";
import { motion } from "framer-motion";

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
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
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

  const [copied, setCopied] = useState(false)

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
        "row-span-1 overflow-hidden rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none relative justify-between flex flex-col space-y-4 border border-white/[0.1]",
        className
      )}
      style={{
        //   I can generate the color from here https://cssgradient.io/
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >

      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
        </div>
        <div className={`absolute right-0 -bottom-5 ${id === 5 ? 'w-full opacity-80' : ''}`}>
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className={cn("object-cover object-center w-full h-full")}
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
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div 
            className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10"
          >
            {description}
          </div>
          <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
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

          <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
            <div className="flex flex-col gap-3 lg:gap-7">
              {/* Here I have the items i want to map and then render each one of them as item */}
              {['React.JS', 'Next.JS', 'TypeScript'].map
              ((item) => (
                <span key={item} className="lg:py-2 lg:px-1 py-2 px-3 text-xs opacity-50 rounded-lg text-center bg-[#10132E]">
                  {item}
                </span>
              ))}
              <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"/>
            </div>
            <div className="flex flex-col gap-3 lg:gap-7">
              <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"/>
              {/* Here I have the items i want to map and then render each one of them as item */}
              {['PostgreSQL', 'Tailwind', 'MongoDB'].map
              ((item) => (
                <span key={item} className="lg:py-2 lg:px-1 py-2 px-3 text-xs opacity-50 rounded-lg text-center bg-[#10132E]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {id === 6 && (
          <div className="mt-5 relative">
            {/* button border magic from tailwind css buttons  */}
              {/* add rounded-md h-8 md:h-8, remove rounded-full */}
              {/* remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 */}
              {/* add handleCopy() for the copy the text */}


            <a href="mailto:easy-wolf.9t@icloud.com">
              <BorderButton
                  title="Let's get in touch&nbsp;"
                  icon={<FaLocationArrow />}
                  position="right"
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

