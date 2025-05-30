import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import BorderButton from "./ui/BorderButton";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 mb-20 md:mb-10" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href={`mailto:${process.env.MY_EMAIL}`}>
          <BorderButton
            title="Let's get in touch&nbsp;"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light sm: pb-3">
          Copyright © {new Date().getFullYear()} Frank
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map(({id, img, link}) => (
            <a 
              href={link}
              key={id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
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