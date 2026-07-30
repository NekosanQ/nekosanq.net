import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";

const SocialLink: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const links = [
    { href: "https://x.com/nekosanq_ts", icon: faXTwitter, label: "Twitter" },
    { href: "https://github.com/NekosanQ", icon: faGithub, label: "GitHub" },
    { href: "https://discord.gg/8RAtEcwMBU", icon: faDiscord, label: "Discord" }
  ];

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        container.children,
        { autoAlpha: 0, y: 7, scale: 0.97, filter: "blur(7px)" },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.45,
          stagger: 0,
          ease: "power2.out",
          clearProps: "transform,filter"
        }
      );
    }, container);

    return () => context.revert();
  }, []);

  return (
    <div ref={containerRef} className="mr-auto flex justify-center gap-2 text-base [perspective:700px] md:justify-start">
      {links.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="
            h-9 w-9
            rounded-lg
            social-glass
            text-slate-300
            backdrop-blur-xl
            transition-[border-color,background-color,color] duration-300 ease-in-out
            flex items-center justify-center
            hover:-translate-y-1
            hover:border-emerald-300/60 hover:bg-emerald-300/10 hover:text-emerald-200
          "
          aria-label={label}
        >
          <FontAwesomeIcon icon={icon} />
        </a>
      ))}
    </div>
  );
};

export default SocialLink;
