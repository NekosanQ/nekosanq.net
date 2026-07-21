import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";

const SocialLink: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const links = [
    { href: "https://x.com/nekosanq_ts", icon: faXTwitter, label: "Twitter" },
    { href: "https://github.com/NekosanQ", icon: faGithub, label: "GitHub" },
    { href: "https://discord.gg/8RAtEcwMBU", icon: faDiscord, label: "Discord" }
  ];

  return (
    <div
      className={`flex space-x-6 justify-center md:justify-start mr-auto text-2xl transition-all duration-700 ease-out
        ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {links.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-10 h-10
            rounded-lg
            border border-slate-600/70
            bg-slate-900/80
            text-slate-100
            shadow-md
            transition duration-300 ease-in-out
            flex items-center justify-center
            hover:-translate-y-0.5
            hover:border-emerald-400 hover:bg-emerald-500 hover:text-white
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
