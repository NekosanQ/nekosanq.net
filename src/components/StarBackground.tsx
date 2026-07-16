"use client";

import React, { useState, useEffect } from "react";

type Star = {
  id: number;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

const generateStars = (count: number, size: number, minDuration: number, maxDuration: number): Star[] => {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const duration = Math.random() * (maxDuration - minDuration) + minDuration;
    const delay = Math.random() * duration;
    stars.push({
      id: i,
      top: `${Math.random() * 100}%`,
      size,
      duration,
      delay: -delay,
      opacity: Math.random() * 0.5 + 0.3,
    });
  }
  return stars;
};

const StarGroup = ({ count, size, minDuration, maxDuration }: { count: number; size: number; minDuration: number; maxDuration: number }) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(generateStars(count, size, minDuration, maxDuration));
  }, [count, size, minDuration, maxDuration]);

  if (stars.length === 0) return null;

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: "100%",
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size + 2}px rgba(255, 255, 255, 0.4)`,
            animation: `starFlow ${star.duration}s linear infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </>
  );
};

const StarBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-b from-[#0d141c] to-[#050607]">
      <style>
        {`
          @keyframes starFlow {
            from { transform: translateX(0); }
            to { transform: translateX(-110vw); }
          }
        `}
      </style>
      <StarGroup count={100} size={1} minDuration={20} maxDuration={40} />
      <StarGroup count={50} size={2} minDuration={10} maxDuration={25} />
      <StarGroup count={20} size={3} minDuration={5} maxDuration={15} />
    </div>
  );
};

export default StarBackground;