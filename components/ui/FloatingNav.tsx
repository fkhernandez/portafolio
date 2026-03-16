
"use client";
import React, { ReactNode, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() ?? 0);

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-4 z-[5000] mx-auto flex w-[calc(100vw-1.5rem)] max-w-max items-center justify-center gap-1 rounded-full border border-white/10 px-2 py-2 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.75)] sm:top-6 sm:w-auto sm:gap-2 sm:px-3",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            aria-label={navItem.name || "Home"}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-neutral-200 transition duration-200 hover:bg-white/8 hover:text-white sm:px-4 sm:text-sm"
            )}
          >
            <span className="block text-[0.9rem]">{navItem.icon}</span>
            
            <span className="!cursor-pointer">{navItem.name}</span>
          </Link>
        ))}
       
      </motion.div>
    </AnimatePresence>
  );
};
