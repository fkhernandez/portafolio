import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import BorderButton from "./ui/BorderButton";
import Image from "next/image";

const Footer = () => {
  const email = process.env.MY_EMAIL ?? "frankjaim@icloud.com";
  const activeSocialMedia = socialMedia.filter(({ link }) => Boolean(link));

  return (
    <footer className="mb-10 w-full pb-10 pt-8 md:mb-0" id="contact">
      <div className="surface-panel flex flex-col items-center rounded-[2rem] px-6 py-12 text-center md:px-10 md:py-14">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-purple/80">
          Contact
        </p>
        <h1 className="heading mt-4 lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="my-5 max-w-2xl text-center text-sm leading-7 text-white-200 md:mt-8 md:text-base">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href={`mailto:${email}`}>
          <BorderButton
            title="Let's get in touch&nbsp;"
            icon={<FaLocationArrow />}
            position="right"
            otherClases="gap-2 bg-slate-950/90 text-sm font-semibold text-white"
          />
        </a>
      </div>
      <div className="mt-8 flex flex-col items-center justify-between gap-5 md:flex-row">
        <p className="text-sm font-light text-white-100 md:text-base md:font-normal">
          Copyright © {new Date().getFullYear()} Frank
        </p>

        <div className="flex items-center gap-4">
          {activeSocialMedia.map(({id, img, link}) => (
            <a 
              href={link}
              key={id}
              target="_blank"
              rel="noreferrer"
              aria-label="Social profile"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-black-200/70 backdrop-blur-lg transition duration-300 hover:-translate-y-0.5 hover:border-purple/60 hover:bg-black-200"
            >
              <Image src={img} alt="icons" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;