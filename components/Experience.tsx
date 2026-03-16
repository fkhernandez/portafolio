import React from "react";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";
import Image from "next/image";

const Experience = () => {
  return (
    <section className="section-shell w-full">
      <p className="text-center text-sm font-medium uppercase tracking-[0.28em] text-purple/80">
        Experience
      </p>
      <h1 className="heading">
        My <span className="text-purple">work experience</span>
      </h1>
      <p className="section-copy">
        A mix of full-stack implementation, UI delivery, and product-focused frontend work shaped around maintainability and performance.
      </p>

      <div className="mt-12 grid w-full grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-7">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={9000 + card.id * 1500}
            borderRadius="1.75rem"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(4,7,29,0.94) 0%, rgba(12,14,35,0.98) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="flex-1 border-white/10 text-white"
          >
            <div className="flex flex-col gap-4 p-5 md:p-6 lg:flex-row lg:items-center lg:gap-5 lg:p-8">
              <Image
                src={card.thumbnail}
                alt={card.thumbnail}
                className="h-auto w-16 md:w-20 lg:w-24"
                width={200}
                height={200}
              />
              <div className="lg:ms-2">
                <h2 className="text-start text-xl font-semibold tracking-tight md:text-2xl">
                  {card.title}
                </h2>
                <p className="mt-3 text-start text-sm leading-7 text-white-100 md:text-base">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Experience;