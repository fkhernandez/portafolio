"use client";

import React from "react";
import Image from "next/image";
import { companies, testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";


const Clients = () => {
  return (
    <section id="testimonials" className="section-shell pt-24 md:pt-28">
      <p className="text-center text-sm font-medium uppercase tracking-[0.28em] text-purple/80">
        Testimonials
      </p>
      <h1 className="heading">
        Kind words from
        <span className="text-purple"> satisfied clients</span>
      </h1>
      <p className="section-copy">
        Feedback from teams I&apos;ve helped with product delivery, frontend quality, and shipping polished user-facing work.
      </p>

      <div className="mt-12 flex flex-col items-center md:mt-14">
        
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover
            className="max-w-6xl"
          />
        
        
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {companies.map(({id, name, img}) => (
            <React.Fragment key={id}>
              <div className="flex max-w-32 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 opacity-70 transition duration-300 hover:opacity-100 md:max-w-40">
                <Image
                  src={img}
                  alt={name}
                  className="h-8 w-auto grayscale"
                  width={400}
                  height={400}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;