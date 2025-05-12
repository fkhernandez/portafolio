"use client";

import React from "react";

import { companies, testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";


const Clients = () => {
  return (
    <section id="testimonials" className="py-20 pt-44">
      <h1 className="heading">
        Kind words from
        <span className="text-purple"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={false}
          />
        
        
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map(({id, name, img, nameImg}) => (
            <React.Fragment key={id}>
              <div className="flex md:max-w-60 max-w-32 gap-2">
                <img
                  src={img}
                  alt={name}
                  className="w-10"
                />
                {/*<img*/}
                {/*  src={nameImg}*/}
                {/*  alt={name}*/}
                {/*  width={id === 1 ? 200 : 100}*/}
                {/*  className="w-30 h=30 overflow-hidden md:block"*/}
                {/*/>*/}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;