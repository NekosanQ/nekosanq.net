'use client';

import React from 'react';
import { ReactTyped } from 'react-typed';

const BigText: React.FC = () => {
  return (
    <div className="text-center md:text-left text-white text-5xl mt-40 ml-0 md:ml-96 font-bold">
      <ReactTyped
        strings={["I'm NekosanQ"]}
        typeSpeed={50}
        showCursor={false}
        contentType="html"
      />
    </div>
  );
};

export default BigText;
