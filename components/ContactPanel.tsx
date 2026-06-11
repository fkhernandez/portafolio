"use client";

import {
  FaArrowLeft,
  FaEnvelope,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

const socials = [
  { name: "Email", icon: FaEnvelope, href: "mailto:frankjaim@icloud.com", color: "#EA4335" },
  { name: "X", icon: FaXTwitter, href: "https://x.com/07Balmy", color: "#E2E8F0" },
  ...(whatsappNumber
    ? [{ name: "WhatsApp", icon: FaWhatsapp, href: `https://wa.me/${whatsappNumber}`, color: "#25D366" }]
    : []),
];

export default function ContactPanel({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white-100 backdrop-blur-sm transition hover:bg-white/10"
      >
        <FaArrowLeft className="text-xs" />
        Back
      </button>

      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
        Let&apos;s <span className="text-purple">Connect</span>
      </h2>

      <p className="mt-3 text-center text-base leading-relaxed text-white-100 md:text-lg">
        Pick your platform — I&apos;ll get back to you fast.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
        {socials.map(({ name, icon: Icon, href, color }) => {
          const isMailto = href.startsWith("mailto:");
          return (
            <a
              key={name}
              href={href}
              target={isMailto ? undefined : "_blank"}
              rel={isMailto ? undefined : "noopener noreferrer"}
              className="group flex w-20 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-black-200/60 py-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-purple/50 hover:bg-black-200 sm:w-24 sm:py-5"
            >
              <Icon
                className="text-xl transition duration-300 group-hover:scale-110 sm:text-2xl"
                style={{ color }}
              />
              <span className="text-[0.65rem] font-medium text-white-200 sm:text-xs">
                {name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
