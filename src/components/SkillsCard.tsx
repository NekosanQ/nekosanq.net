import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "Git",
  "Docker",
  "JavaScript",
  "Discord.js",
  "Python",
  "C",
  "Java",
  "Kotlin",
  "MySQL",
  "Linux",
  "Prisma",
  "Bootstrap",
  "Cloudflare",
  "AWS",
  "Proxmox"
];

const skillIconsUrl =
  "https://skillicons.dev/icons?i=react,nextjs,typescript,nodejs,express,tailwind,git,docker,javascript,discordjs,python,c,java,kotlin,mysql,linux,prisma,bootstrap,cloudflare,aws&perline=5";

const SkillsCard: React.FC = () => {
  return (
    <div className="relative mt-10 md:mt-0 md:ml-5 w-72 h-96 p-px rounded-2xl bg-gradient-to-br from-slate-400 via-emerald-100 to-slate-400 shadow-2xl overflow-hidden">
      <div
        className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700
        rounded-2xl text-slate-100 flex flex-col p-6"
      >
        {/* 上部タイトル */}
        <div className="flex items-center space-x-2 mb-4 justify-center">
          <FontAwesomeIcon icon={faTools} className="text-xl" />
          <h1 className="text-xl font-bold tracking-wide">My Skills</h1>
        </div>

        {/* 技術アイコン横並び */}
        <div className="flex flex-col justify-center items-center gap-3 flex-grow mt-4">
          <img
            src={skillIconsUrl}
            alt={skills.slice(0, -1).join("、")}
            title={skills.slice(0, -1).join(" / ")}
            width={260}
            height={208}
            loading="lazy"
            draggable={false}
          />
          <img
            src="https://cdn.simpleicons.org/proxmox/E57000"
            alt="Proxmox"
            title="Proxmox"
            className="h-10 w-10 object-contain"
            width={40}
            height={40}
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
