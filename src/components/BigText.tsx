'use client';

import React from 'react';
import { ReactTyped } from 'react-typed';

const BigText: React.FC = () => {
  return (
    <div className="text-center text-white text-5xl mt-40 font-caveat">
      <ReactTyped strings={["I'm NekosanQ"]} typeSpeed={50} showCursor={false} contentType="html" />
    </div>
  );
};

export default BigText;
