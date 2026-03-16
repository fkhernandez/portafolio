"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    img?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    containerRef.current.style.setProperty(
      "--animation-duration",
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
    );
  }, [direction, speed]);

  const duplicatedItems = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className
      )}
    >
      <ul
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          items.length > 0 && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {duplicatedItems.map((item, idx) => (
          <li
            className="relative w-[min(88vw,34rem)] max-w-full flex-shrink-0 rounded-[1.75rem] border border-white/10 p-6 md:w-[min(40rem,calc(100vw-8rem))] md:p-8"
            style={{
                backgroundImage:
                "linear-gradient(180deg, rgba(4,7,29,0.96) 0%, rgba(12,14,35,0.98) 100%)",
            }}
            key={`${item.name}-${idx}`}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-sm leading-7 text-white md:text-base md:leading-8">
                {item.quote}
              </span>
              <div className="relative z-20 mt-8 flex items-center gap-4">
                {item.img ? (
                  <Image
                    src={item.img}
                    alt={`${item.name} profile`}
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
                    width={48}
                    height={48}
                  />
                ) : null}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-white md:text-base">
                      {item.name}
                  </span>
                  <span className="text-sm leading-6 text-white-100">
                      {item.title}
                  </span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
