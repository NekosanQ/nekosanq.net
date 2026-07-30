import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCode, faGears, faMicrochip, faTools } from "@fortawesome/free-solid-svg-icons";

const capabilities = [
  { label: "Web Development", description: "体験を設計し、形にする", icon: faCode },
  { label: "Backend & Automation", description: "モダンで堅牢なシステムを構築する", icon: faGears },
  { label: "Infrastructure", description: "ユーザー体験を支えるインフラを構築する", icon: faCloud }
];

const SkillsCard: React.FC = () => {
  return (
    <div className="cosmic-card about-card relative h-96 w-72 overflow-hidden">
      <div className="cosmic-card__inner flex h-full w-full flex-col p-7 text-slate-100">
        <div className="mb-5 flex min-h-7 items-center justify-between">
          <span className="text-[10px] font-medium tracking-[0.32em] text-emerald-300/70">TECH STACK</span>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-200/10 bg-black/30 text-[0.72rem] leading-none text-emerald-200">
            <FontAwesomeIcon icon={faTools} />
          </span>
        </div>

        <div className="mb-4 flex min-h-20 items-center justify-start">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200/15 bg-[radial-gradient(circle,rgba(16,185,129,0.12),rgba(0,0,0,0.3)_68%)] text-2xl text-emerald-200/90">
            <FontAwesomeIcon icon={faMicrochip} />
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-rows-[1rem_2.25rem_1.25rem_minmax(0,1fr)_2.25rem] gap-[0.65rem] text-left">
          <h3 className="text-xs font-light uppercase tracking-[0.24em] text-slate-400">Tech Stack</h3>
          <h4 className="text-3xl font-light tracking-[-0.04em]">アイデアを技術に</h4>
          <p className="text-sm font-light tracking-wide text-emerald-200">From idea to implementation.</p>

          <div className="row-span-2 grid overflow-hidden border-y border-emerald-200/10" aria-label="Three capability fields">
            {capabilities.map((capability, index) => (
              <div
                className="grid min-h-9 grid-cols-[1.25rem_1rem_minmax(0,1fr)] items-center gap-2 border-b border-white/[0.055] last:border-b-0"
                key={capability.label}
              >
                <span className="font-mono text-[8px] tracking-[0.08em] text-emerald-300/45">0{index + 1}</span>
                <FontAwesomeIcon icon={capability.icon} className="w-2.5 text-[10px] text-emerald-200/75" />
                <span className="min-w-0">
                  <strong className="block truncate text-[9px] font-normal tracking-[0.06em] text-slate-200/85">{capability.label}</strong>
                  <small className="block truncate text-[7px] tracking-[0.035em] text-slate-400/65">{capability.description}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
