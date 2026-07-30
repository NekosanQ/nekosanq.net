import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsHelping, faUsers } from "@fortawesome/free-solid-svg-icons";

const GroupCard: React.FC = () => {
  return (
    <div className="cosmic-card about-card relative h-96 w-72 overflow-hidden">
      <div className="cosmic-card__inner flex h-full w-full flex-col p-7 text-slate-100">
        {/* 上部タイトル */}
        <div className="mb-5 flex min-h-7 items-center justify-between">
          <span className="text-[10px] font-medium tracking-[0.32em] text-emerald-300/70">03 / COLLECTIVE</span>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-200/10 bg-black/30 text-[0.72rem] leading-none text-emerald-200">
            <FontAwesomeIcon icon={faUsers} />
          </span>
        </div>

        {/* 画像 */}
        <div className="mb-4 flex min-h-20 items-center justify-start">
          <div className="isolate h-20 w-20 overflow-hidden rounded-full border border-emerald-200/20 bg-black/30">
            <Image
              src="/Nekonection.png"
              alt="Nekonection"
              width={320}
              height={320}
              sizes="80px"
              unoptimized
              className="block h-full w-full max-w-none scale-[1.12] object-cover object-center"
            />
          </div>
        </div>

        {/* テキスト */}
        <div className="grid min-h-0 flex-1 grid-rows-[1rem_2.25rem_1.25rem_minmax(0,1fr)_2.25rem] gap-[0.65rem] text-left">
          <h3 className="text-xs font-light uppercase tracking-[0.24em] text-slate-400">My Group</h3>
          <h4 className="text-2xl font-light tracking-[-0.04em]">Nekonection</h4>
          <p className="text-sm font-light tracking-wide text-emerald-200">みんなと繋がる、サービスを。</p>
          <p className="text-xs 2xl:text-sm text-slate-300 leading-relaxed">
            様々なサービスを提供するグループ。
            <br />
            現在、ほぼ私一人で運営しています。
            <br />
            Discordメインで活動中。
          </p>
          <div className="flex items-center justify-start gap-2 border-t border-white/10 pt-3.5 text-xs tracking-[0.14em] text-slate-400">
            <FontAwesomeIcon icon={faHandsHelping} className="text-xs text-emerald-300" />
            <span>開発者・運営募集中</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
