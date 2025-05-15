'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const ProfileCard: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-72 h-96 p-1 rounded-2xl bg-gradient-to-tr from-slate-500 via-lime-100 to-slate-500 shadow-2xl overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div className="w-full h-full bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 rounded-2xl text-white flex flex-col p-6">
        {/* 上部タイトル */}
        <div className="flex items-center mb-3 justify-center">
        <FontAwesomeIcon icon={faUser} className="text-xl " />
        <h1 className="text-xl font-semibold tracking-wide">Profile</h1>
        </div>

        {/* 画像 */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/20">
            <img src="/NekosanQ.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* テキスト */}
        <div className="space-y-3 flex-grow text-center">
          <h2 className="text-3xl font-bold tracking-wide">NekosanQ</h2>
          <p className="text-lg font-semibold text-gray-300">Fullstack Developer</p>
          <p className="text-gray-300 leading-relaxed text-sm">
            多趣味な学生です。
            <br />
            様々なことに興味を持っています。
            <br />
            彼女ができなくて悲しいです...
          </p>
          <div className="flex items-center justify-center space-x-2 text-gray-300 mt-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lg" />
            <span>Oita Japan</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
