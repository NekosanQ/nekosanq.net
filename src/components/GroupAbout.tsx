import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsHelping, faUsers } from "@fortawesome/free-solid-svg-icons";

const GroupCard: React.FC = () => {
  return (
    <div className="relative mt-10 md:mt-0 md:ml-5 w-72 h-96 p-px rounded-2xl bg-gradient-to-br from-slate-400 via-emerald-100 to-slate-400 shadow-2xl overflow-hidden">
      <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl text-slate-100 flex flex-col p-6">
        {/* 上部タイトル */}
        <div className="flex space-x-2 items-center mb-3 justify-center">
          <FontAwesomeIcon icon={faUsers} className="text-xl" />
          <h1 className="text-xl font-bold tracking-wide">My Group</h1>
        </div>

        {/* 画像 */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/20">
            <Image src="/Nekonection.png" alt="Nekonection" width={64} height={64} sizes="64px" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* テキスト */}
        <div className="space-y-3 flex-grow text-center">
          <h2 className="text-3xl font-bold tracking-wide">Nekonection</h2>
          <p className="text-lg font-semibold text-emerald-200">皆と繋がる、サービスを。</p>
          <p className="text-xs 2xl:text-sm text-slate-300 leading-relaxed">
            様々なサービスを提供するグループ。
            <br />
            現在、ほぼ私一人で運営しています。
            <br />
            Discordメインで活動中。
          </p>
          <div className="flex items-center justify-center space-x-2 text-slate-300 mt-2">
            <FontAwesomeIcon icon={faHandsHelping} className="text-lg" />
            <span>開発者募集中</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
