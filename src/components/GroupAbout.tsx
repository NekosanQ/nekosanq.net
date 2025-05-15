'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping, faUsers } from '@fortawesome/free-solid-svg-icons';

const GroupCard: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mt-10 md:mt-0 md:ml-5 w-72 h-96 p-1 rounded-2xl bg-gradient-to-tr from-slate-500 via-lime-100 to-slate-500 shadow-2xl overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div className="w-full h-full bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 rounded-2xl text-white flex flex-col p-6">
        {/* 上部タイトル */}
        <div className="flex space-x-2 items-center mb-3 justify-center">
          <FontAwesomeIcon icon={faUsers} className="text-xl" />
          <h1 className="text-xl font-semibold tracking-wide">My Group</h1>
        </div>

        {/* 画像 */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/20">
            <img
              src="/Nekonnection.png"
              alt="My Group"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* テキスト */}
        <div className="space-y-3 flex-grow text-center">
          <h2 className="text-3xl font-bold tracking-wide">Nekonnection</h2>
          <p className="text-lg font-semibold text-gray-300">皆と繋がる、サービスを。</p>
          <p className="text-gray-300 leading-relaxed text-sm">
            様々なサービスを提供するグループ。
            <br />
            現在、ほぼ私一人で運営しています。
            <br />
            Discordメインで活動中。
          </p>
          <div className="flex items-center justify-center space-x-2 text-gray-300 mt-2">
            <FontAwesomeIcon icon={faHandsHelping} className="text-lg" />
            <span>開発者募集中</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GroupCard;
