"use client";

import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import SocialLink from "./SocialMediaLink";

const BigText: React.FC = () => {
  const [isTypedDone, setIsTypedDone] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div className="mt-40 md:mt-80 flex flex-col items-center lg:items-start text-center font-bold max-w-4xl mx-auto px-4">
      <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-slate-100 via-emerald-200 to-slate-100 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(52,211,153,0.2)]">
        {prefersReducedMotion ? "I'm NekosanQ" : <ReactTyped strings={["I'm NekosanQ"]} typeSpeed={50} showCursor={false} />}
      </h1>

      <p className="text-base md:text-2xl font-medium text-slate-400 mt-4">
        {prefersReducedMotion ? (
          "A developer and a student with many hobbies..."
        ) : (
          <ReactTyped
            strings={["A developer and a student with many hobbies..."]}
            typeSpeed={30}
            startDelay={1000}
            showCursor={false}
            onComplete={() => setIsTypedDone(true)}
          />
        )}
      </p>

      {(isTypedDone || prefersReducedMotion) && (
        <div className="mt-6 transition-opacity duration-1000 ease-out opacity-100">
          <SocialLink />
        </div>
      )}
    </div>
  );
};

export default BigText;
