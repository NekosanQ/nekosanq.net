'use client';

import React, { useState } from 'react';
import { ReactTyped } from 'react-typed';
import SocialLink from './SocialMediaLink';

const BigText: React.FC = () => {
  const [isTypedDone, setIsTypedDone] = useState(false);

  return (
    <div className="text-center md:text-left mt-40 md:mt-80 ml-0 md:ml-80 font-bold relative">
      <h1 className="text-5xl md:text-7xl bg-gradient-to-t from-slate-200 via-lime-100 to-slate-200 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]">
        <ReactTyped strings={["I'm NekosanQ"]} typeSpeed={50} showCursor={false} contentType="html" />
      </h1>

      <p className={'text-base md:text-2xl text-gray-400 mt-4'}>
        <ReactTyped
          strings={['A developer and a student with many hobbies...']}
          typeSpeed={30}
          startDelay={1000}
          showCursor={false}
          onComplete={() => setIsTypedDone(true)}
        />
      </p>

      {isTypedDone && (
        <div className="mt-6 transition-opacity duration-1000 ease-out opacity-100">
          <SocialLink />
        </div>
      )}
    </div>
  );
};

export default BigText;
