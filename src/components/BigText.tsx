'use client';

import React from 'react';
import { ReactTyped } from 'react-typed';

const BigText: React.FC = () => {
  return (
    <div className="text-center md:text-left mt-40 ml-0 md:ml-96 font-bold relative">
      <h1
        className="text-5xl bg-gradient-to-t from-slate-200 via-green-200 to-slate-200 bg-clip-text text-transparent
                   drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]">
        <ReactTyped
          strings={["I'm NekosanQ"]}
          typeSpeed={50}
          showCursor={false}
          contentType="html"
        />
      </h1>

      <p className="text-lg bg-gradient-to-t from-gray-300 via-gray-500 to-gray-300 bg-clip-text text-transparent mt-4 ">
        <ReactTyped
          strings={["A developer and a student with many hobbies..."]}
          typeSpeed={50}
          startDelay={1000}
          showCursor={false}
        />
      </p>
    </div>
  );
};

export default BigText;
