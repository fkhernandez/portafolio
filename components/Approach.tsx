"use client";
import React from "react";

import { motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/CanvasRevealEffect";

const Approach = () => {
  return (
    <section className="section-shell w-full">
        <p className="text-center text-sm font-medium uppercase tracking-[0.28em] text-purple/80">
            Process
        </p>
        <h1 className="heading">
            My <span className="text-purple">approach</span>
        </h1>
        <p className="section-copy">
            A simple delivery process that keeps scope clear, progress visible, and the final build aligned with the product goal.
        </p>
      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
        <Card 
            title="Planning & Strategy" 
            icon={<AceternityIcon 
            order="Phase 1" />}
            description="We'll collaborate to map out your website's goals, target audience, 
          and key functionalities. We'll discuss things like site structure, 
          navigation, and content requirements."
        >
          <CanvasRevealEffect
            animationSpeed={10}
            containerClassName="bg-purple-700"
            dotSize={2}
          />
        </Card>
        <Card 
            title="Development & Progress Update" 
            icon={<AceternityIcon order="Phase 2" />}
            description="Once we agree on the plan, I cue my playlist and dive into
          coding. From initial sketches to polished code, I keep you updated
          every step of the way."
        >
          <CanvasRevealEffect
            animationSpeed={10}
            containerClassName="bg-black"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
          
        </Card>
        <Card 
            title="Development & Launch" 
            icon={<AceternityIcon order="Phase 3"/>}
            description="This is where the magic happens! Based on the approved design, 
          I'll translate everything into functional code, building your website
          from the ground up."
        >
          <CanvasRevealEffect
            animationSpeed={10}
            containerClassName="bg-fuchsia-500"
            colors={[[125, 211, 252]]}
            dotSize={2}
          />
        </Card>
      </div>
    </section>
  );
}

const Card = ({
  title,
  icon,
  children,
  description
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  description: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card surface-panel relative mx-auto flex h-full min-h-[24rem] w-full max-w-sm flex-col overflow-hidden rounded-3xl p-6 md:min-h-[28rem] md:p-7 lg:min-h-[32rem]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(4,7,29,0.95) 0%, rgba(12,14,35,0.98) 100%)",
      }}
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
      >
        {children}
      </motion.div>

      <div className="relative z-20 flex h-full flex-col">
        <div className="flex justify-start">
          {icon}
        </div>
        <h2
          className="mt-8 text-2xl font-semibold tracking-tight text-white md:text-3xl"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-7 text-blue-100 md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order} : { order:string }) => {
  return (
    <div>  
        <button className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold uppercase tracking-[0.22em] text-blue-100 backdrop-blur-sm transition-colors">
          {order}
        </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: React.ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};


export default Approach;