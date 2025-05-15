"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faUser } from "@fortawesome/free-solid-svg-icons";

// キラキラコンポーネント（中央から外へ飛び出す）
const Sparkle = ({ id }: { id: number }) => {
  const angle = Math.random() * 2 * Math.PI;
  const distance = 150 + Math.random() * 100; // 飛び出す距離
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  const size = Math.random() * 6 + 4;

  return (
    <motion.div
      key={id}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0.5 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute bg-white rounded-full pointer-events-none z-50"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        filter: "blur(1px)",
      }}
    />
  );
};

const AboutMeCard: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [rotation, setRotation] = useState(0);
  const [sparkles, setSparkles] = useState<number[]>([]);

  const handleRotateAndSparkle = () => {
    setRotation((prev) => {
      const next = prev + 360;
      triggerSparkle();
      return next;
    });
  };

  const triggerSparkle = () => {
    const ids = Array.from({ length: 20 }, (_, i) => i + Date.now());
    setSparkles(ids);
    setTimeout(() => setSparkles([]), 1200);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.5, opacity: 0, rotate: -15, rotateY: 0 }}
      animate={
        isInView
          ? { scale: 1, opacity: 1, rotate: 0, rotateY: rotation }
          : { scale: 0.5, opacity: 0, rotate: -15, rotateY: rotation }
      }
      transition={{
        duration: 1,
        ease: "easeOut",
        rotateY: { duration: 1, ease: "easeInOut" },
      }}
      onMouseEnter={handleRotateAndSparkle}
      onClick={handleRotateAndSparkle}
      className="relative w-72 h-auto p-1 rounded-2xl bg-gradient-to-tr from-slate-500 via-lime-100 to-slate-500 shadow-2xl overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* キラキラ */}
      {sparkles.map((id) => (
        <Sparkle key={id} id={id} />
      ))}

      {/* カード本体 */}
      <div
        className="w-full h-full bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700
        rounded-2xl text-white flex flex-col p-6"
      >
        {/* 上部タイトル */}
        <div className="flex items-center space-x-2 mb-4 justify-center">
          <FontAwesomeIcon icon={faUser} className="text-xl " />
          <h1 className="text-xl font-semibold tracking-wide">Profile</h1>
        </div>

        {/* 画像 */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
            <img
              src="/NekosanQ.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* テキスト */}
        <div className="space-y-3 flex-grow text-center">
          <h2 className="text-3xl font-bold tracking-wide">NekosanQ</h2>
          <p className="text-lg font-semibold text-gray-300">
            Fullstack Developer
          </p>
          <p className="text-gray-300 leading-relaxed text-sm">
            多趣味な学生です。<br />
            様々なことに興味を持っています。<br />
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

export default AboutMeCard;
