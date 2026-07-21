import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faUser } from "@fortawesome/free-solid-svg-icons";

const ProfileCard: React.FC = () => {
  return (
    <div className="relative w-72 h-96 p-px rounded-2xl bg-gradient-to-br from-slate-400 via-white to-slate-400 shadow-2xl overflow-hidden">
      <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl text-slate-100 flex flex-col p-6">
        {/* 上部タイトル */}
        <div className="flex space-x-2 items-center mb-3 justify-center">
          <FontAwesomeIcon icon={faUser} className="text-xl " />
          <h1 className="text-xl font-bold tracking-wide">Profile</h1>
        </div>

        {/* 画像 */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/20">
            <Image src="/NekosanQ.png" alt="NekosanQ" width={64} height={64} sizes="64px" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* テキスト */}
        <div className="space-y-3 flex-grow text-center">
          <h2 className="text-3xl font-bold tracking-wide">NekosanQ</h2>
          <p className="text-lg font-semibold text-white">Fullstack Developer</p>
          <p className="text-xs 2xl:text-sm text-slate-300 leading-relaxed">
            多趣味な学生です。
            <br />
            様々なことに興味を持っています。
            <br />
            常に金欠です。
          </p>
          <div className="flex items-center justify-center space-x-2 text-slate-300 mt-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lg" />
            <span>Oita Japan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
